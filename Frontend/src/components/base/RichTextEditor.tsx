import { useEffect, useRef, useState } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeNode } from '@lexical/code';
import { LinkNode } from '@lexical/link';
import { ImageNode } from '@lexical/image';
import {
  $getRoot,
  $getSelection,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
  $createParagraphNode,
  type EditorState,
  $insertNodes,
  $createTextNode,
} from 'lexical';
import { $setBlocksType } from '@lexical/selection';
import { $createHeadingNode, $createQuoteNode } from '@lexical/rich-text';
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND } from '@lexical/list';
import { $createCodeNode } from '@lexical/code';
import { $createImageNode } from '@lexical/image';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatText = (format: 'bold' | 'italic' | 'underline' | 'strikethrough' | 'code') => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };

  const formatElement = (format: 'left' | 'center' | 'right' | 'justify') => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, format);
  };

  const formatHeading = (headingSize: 'h1' | 'h2' | 'h3') => {
    editor.update(() => {
      const selection = $getSelection();
      if (selection !== null) {
        $setBlocksType(selection, () => $createHeadingNode(headingSize));
      }
    });
  };

  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection();
      if (selection !== null) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  };

  const formatQuote = () => {
    editor.update(() => {
      const selection = $getSelection();
      if (selection !== null) {
        $setBlocksType(selection, () => $createQuoteNode());
      }
    });
  };

  const formatCode = () => {
    editor.update(() => {
      const selection = $getSelection();
      if (selection !== null) {
        $setBlocksType(selection, () => $createCodeNode());
      }
    });
  };

  const insertBulletList = () => {
    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
  };

  const insertNumberedList = () => {
    editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
  };

  const insertImage = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    const formData = new FormData();
    formData.append('cover_image', file);

    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const response = await fetch(`${API_BASE_URL}/api/blogs/upload-image`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      const imageUrl = `${API_BASE_URL}${data.imageUrl}`;

      editor.update(() => {
        const imageNode = $createImageNode({
          src: imageUrl,
          altText: file.name,
          maxWidth: 800,
        });
        $insertNodes([imageNode]);
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const undo = () => {
    editor.dispatchCommand(UNDO_COMMAND, undefined);
  };

  const redo = () => {
    editor.dispatchCommand(REDO_COMMAND, undefined);
  };

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b border-red-600/30 bg-black">
      {/* Undo/Redo */}
      <button
        type="button"
        onClick={undo}
        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600/10 rounded transition-all duration-200 cursor-pointer"
        title="Undo"
      >
        <i className="ri-arrow-go-back-line"></i>
      </button>
      <button
        type="button"
        onClick={redo}
        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600/10 rounded transition-all duration-200 cursor-pointer"
        title="Redo"
      >
        <i className="ri-arrow-go-forward-line"></i>
      </button>

      <div className="w-px h-6 bg-red-600/30 mx-1"></div>

      {/* Block Types */}
      <button
        type="button"
        onClick={formatParagraph}
        className="px-2 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600/10 rounded transition-all duration-200 cursor-pointer text-sm"
        title="Paragraph"
      >
        P
      </button>
      <button
        type="button"
        onClick={() => formatHeading('h1')}
        className="px-2 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600/10 rounded transition-all duration-200 cursor-pointer text-sm font-bold"
        title="Heading 1"
      >
        H1
      </button>
      <button
        type="button"
        onClick={() => formatHeading('h2')}
        className="px-2 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600/10 rounded transition-all duration-200 cursor-pointer text-sm font-bold"
        title="Heading 2"
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => formatHeading('h3')}
        className="px-2 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600/10 rounded transition-all duration-200 cursor-pointer text-sm font-bold"
        title="Heading 3"
      >
        H3
      </button>

      <div className="w-px h-6 bg-red-600/30 mx-1"></div>

      {/* Text Formatting */}
      <button
        type="button"
        onClick={() => formatText('bold')}
        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600/10 rounded transition-all duration-200 cursor-pointer font-bold"
        title="Bold"
      >
        B
      </button>
      <button
        type="button"
        onClick={() => formatText('italic')}
        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600/10 rounded transition-all duration-200 cursor-pointer italic"
        title="Italic"
      >
        I
      </button>
      <button
        type="button"
        onClick={() => formatText('underline')}
        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600/10 rounded transition-all duration-200 cursor-pointer underline"
        title="Underline"
      >
        U
      </button>
      <button
        type="button"
        onClick={() => formatText('strikethrough')}
        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600/10 rounded transition-all duration-200 cursor-pointer line-through"
        title="Strikethrough"
      >
        S
      </button>

      <div className="w-px h-6 bg-red-600/30 mx-1"></div>

      {/* Lists */}
      <button
        type="button"
        onClick={insertBulletList}
        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600/10 rounded transition-all duration-200 cursor-pointer"
        title="Bullet List"
      >
        <i className="ri-list-unordered"></i>
      </button>
      <button
        type="button"
        onClick={insertNumberedList}
        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600/10 rounded transition-all duration-200 cursor-pointer"
        title="Numbered List"
      >
        <i className="ri-list-ordered"></i>
      </button>

      <div className="w-px h-6 bg-red-600/30 mx-1"></div>

      {/* Special Formats */}
      <button
        type="button"
        onClick={formatQuote}
        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600/10 rounded transition-all duration-200 cursor-pointer"
        title="Quote"
      >
        <i className="ri-double-quotes-l"></i>
      </button>
      <button
        type="button"
        onClick={formatCode}
        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600/10 rounded transition-all duration-200 cursor-pointer"
        title="Code Block"
      >
        <i className="ri-code-box-line"></i>
      </button>

      <div className="w-px h-6 bg-red-600/30 mx-1"></div>

      {/* Image Upload */}
      <button
        type="button"
        onClick={insertImage}
        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600/10 rounded transition-all duration-200 cursor-pointer"
        title="Insert Image"
      >
        <i className="ri-image-add-line"></i>
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      <div className="w-px h-6 bg-red-600/30 mx-1"></div>

      {/* Alignment */}
      <button
        type="button"
        onClick={() => formatElement('left')}
        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600/10 rounded transition-all duration-200 cursor-pointer"
        title="Align Left"
      >
        <i className="ri-align-left"></i>
      </button>
      <button
        type="button"
        onClick={() => formatElement('center')}
        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600/10 rounded transition-all duration-200 cursor-pointer"
        title="Align Center"
      >
        <i className="ri-align-center"></i>
      </button>
      <button
        type="button"
        onClick={() => formatElement('right')}
        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600/10 rounded transition-all duration-200 cursor-pointer"
        title="Align Right"
      >
        <i className="ri-align-right"></i>
      </button>
    </div>
  );
}

function OnChangePluginWrapper({ onChange }: { onChange: (value: string) => void }) {
  const [editor] = useLexicalComposerContext();

  const handleChange = (editorState: EditorState) => {
    editor.update(() => {
      const htmlString = $generateHtmlFromNodes(editor);
      onChange(htmlString);
    });
  };

  return <OnChangePlugin onChange={handleChange} />;
}

function $generateHtmlFromNodes(editor: any): string {
  const root = $getRoot();
  return nodeToHtml(root);
}

function nodeToHtml(node: any): string {
  const type = node.getType();
  const children = node.getChildren();

  if (type === 'root') {
    return children.map((child: any) => nodeToHtml(child)).join('');
  }

  if (type === 'paragraph') {
    const content = children.map((child: any) => nodeToHtml(child)).join('');
    return content ? `<p>${content}</p>` : '';
  }

  if (type === 'heading') {
    const tag = node.getTag();
    const content = children.map((child: any) => nodeToHtml(child)).join('');
    return `<${tag}>${content}</${tag}>`;
  }

  if (type === 'quote') {
    const content = children.map((child: any) => nodeToHtml(child)).join('');
    return `<blockquote>${content}</blockquote>`;
  }

  if (type === 'code') {
    const content = children.map((child: any) => nodeToHtml(child)).join('');
    return `<pre><code>${content}</code></pre>`;
  }

  if (type === 'list') {
    const tag = node.getListType() === 'bullet' ? 'ul' : 'ol';
    const content = children.map((child: any) => nodeToHtml(child)).join('');
    return `<${tag}>${content}</${tag}>`;
  }

  if (type === 'listitem') {
    const content = children.map((child: any) => nodeToHtml(child)).join('');
    return `<li>${content}</li>`;
  }

  if (type === 'image') {
    const src = node.__src;
    const alt = node.__altText || '';
    const maxWidth = node.__maxWidth || 800;
    return `<img src="${src}" alt="${alt}" style="max-width:${maxWidth}px;width:100%;height:auto;" />`;
  }

  if (type === 'link') {
    const url = node.__url;
    const content = children.map((child: any) => nodeToHtml(child)).join('');
    return `<a href="${url}">${content}</a>`;
  }

  if (type === 'text') {
    let text = node.getTextContent();

    if (node.hasFormat('bold')) {
      text = `<strong>${text}</strong>`;
    }
    if (node.hasFormat('italic')) {
      text = `<em>${text}</em>`;
    }
    if (node.hasFormat('underline')) {
      text = `<u>${text}</u>`;
    }
    if (node.hasFormat('strikethrough')) {
      text = `<s>${text}</s>`;
    }
    if (node.hasFormat('code')) {
      text = `<code>${text}</code>`;
    }

    return text;
  }

  if (type === 'linebreak') {
    return '<br>';
  }

  return children.map((child: any) => nodeToHtml(child)).join('');
}

export default function RichTextEditor({ value, onChange, placeholder = 'Start writing...' }: RichTextEditorProps) {
  const initialConfig = {
    namespace: 'DocumentEditor',
    theme: {
      paragraph: 'mb-2',
      text: {
        bold: 'font-bold',
        italic: 'italic',
        underline: 'underline',
      },
      image: 'editor-image',
    },
    onError: (error: Error) => {
      console.error(error);
    },
    nodes: [
      HeadingNode,
      QuoteNode,
      ListNode,
      ListItemNode,
      CodeNode,
      LinkNode,
      ImageNode,
    ],
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="border border-red-600/30 rounded-lg overflow-hidden bg-black">
        <ToolbarPlugin />
        <div className="relative">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="min-h-[300px] max-h-[500px] overflow-y-auto px-4 py-3 text-white focus:outline-none prose prose-invert prose-sm max-w-none" />
            }
            placeholder={
              <div className="absolute top-3 left-4 text-gray-500 pointer-events-none">
                {placeholder}
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
        <HistoryPlugin />
        <ListPlugin />
        <OnChangePluginWrapper onChange={onChange} />
      </div>
    </LexicalComposer>
  );
}

import { useEffect } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeNode } from '@lexical/code';
import { LinkNode } from '@lexical/link';
import {
  $getRoot,
  $getSelection,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
  type EditorState,
} from 'lexical';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  const formatText = (format: 'bold' | 'italic' | 'underline') => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };

  const formatElement = (format: 'left' | 'center' | 'right' | 'justify') => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, format);
  };

  const undo = () => {
    editor.dispatchCommand(UNDO_COMMAND, undefined);
  };

  const redo = () => {
    editor.dispatchCommand(REDO_COMMAND, undefined);
  };

  return (
    <div className="flex items-center gap-1 p-2 border-b border-dark-border bg-dark-bg/50">
      {/* Undo/Redo */}
      <button
        type="button"
        onClick={undo}
        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-dark-hover rounded transition-all duration-200 cursor-pointer"
        title="Undo"
      >
        <i className="ri-arrow-go-back-line"></i>
      </button>
      <button
        type="button"
        onClick={redo}
        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-dark-hover rounded transition-all duration-200 cursor-pointer"
        title="Redo"
      >
        <i className="ri-arrow-go-forward-line"></i>
      </button>

      <div className="w-px h-6 bg-dark-border mx-1"></div>

      {/* Text Formatting */}
      <button
        type="button"
        onClick={() => formatText('bold')}
        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-dark-hover rounded transition-all duration-200 cursor-pointer font-bold"
        title="Bold"
      >
        B
      </button>
      <button
        type="button"
        onClick={() => formatText('italic')}
        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-dark-hover rounded transition-all duration-200 cursor-pointer italic"
        title="Italic"
      >
        I
      </button>
      <button
        type="button"
        onClick={() => formatText('underline')}
        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-dark-hover rounded transition-all duration-200 cursor-pointer underline"
        title="Underline"
      >
        U
      </button>

      <div className="w-px h-6 bg-dark-border mx-1"></div>

      {/* Alignment */}
      <button
        type="button"
        onClick={() => formatElement('left')}
        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-dark-hover rounded transition-all duration-200 cursor-pointer"
        title="Align Left"
      >
        <i className="ri-align-left"></i>
      </button>
      <button
        type="button"
        onClick={() => formatElement('center')}
        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-dark-hover rounded transition-all duration-200 cursor-pointer"
        title="Align Center"
      >
        <i className="ri-align-center"></i>
      </button>
      <button
        type="button"
        onClick={() => formatElement('right')}
        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-dark-hover rounded transition-all duration-200 cursor-pointer"
        title="Align Right"
      >
        <i className="ri-align-right"></i>
      </button>
      <button
        type="button"
        onClick={() => formatElement('justify')}
        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-dark-hover rounded transition-all duration-200 cursor-pointer"
        title="Justify"
      >
        <i className="ri-align-justify"></i>
      </button>
    </div>
  );
}

function OnChangePluginWrapper({ onChange }: { onChange: (value: string) => void }) {
  const [editor] = useLexicalComposerContext();

  const handleChange = (editorState: EditorState) => {
    editorState.read(() => {
      const root = $getRoot();
      const text = root.getTextContent();
      onChange(text);
    });
  };

  return <OnChangePlugin onChange={handleChange} />;
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
    ],
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="border border-dark-border rounded-lg overflow-hidden bg-dark-bg">
        <ToolbarPlugin />
        <div className="relative">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="min-h-[200px] max-h-[400px] overflow-y-auto px-4 py-3 text-white focus:outline-none prose prose-invert prose-sm max-w-none" />
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
        <OnChangePluginWrapper onChange={onChange} />
      </div>
    </LexicalComposer>
  );
}

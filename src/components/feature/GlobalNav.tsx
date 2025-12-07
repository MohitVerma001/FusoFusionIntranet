import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CreateSpaceModal from './CreateSpaceModal';
import CreateDocumentModal from './CreateDocumentModal';
import CreateCrossfunctionModal from './CreateCrossfunctionModal';
import CreateBlogModal from './CreateBlogModal';
import CreateActivityModal from './CreateActivityModal';

interface GlobalNavProps {
  userRole?: 'admin' | 'internal' | 'external';
}

export default function GlobalNav({ userRole = 'internal' }: GlobalNavProps) {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'ja'>(i18n.language as 'en' | 'ja' || 'en');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSpaceModal, setShowSpaceModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [showCrossfunctionModal, setShowCrossfunctionModal] = useState(false);
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [isCreateSpaceModalOpen, setIsCreateSpaceModalOpen] = useState(false);
  const [isCreateDocumentModalOpen, setIsCreateDocumentModalOpen] = useState(false);
  const [isCreateCrossfunctionModalOpen, setIsCreateCrossfunctionModalOpen] = useState(false);
  const [isCreateBlogModalOpen, setIsCreateBlogModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [googleTranslateLoaded, setGoogleTranslateLoaded] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const createRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
      if (createRef.current && !createRef.current.contains(event.target as Node)) {
        setShowCreateMenu(false);
      }
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setShowLanguageMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Initialize Google Translate
  useEffect(() => {
    // Load Google Translate script
    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }

    // Initialize Google Translate
    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,ja,es,fr,de,zh-CN,zh-TW,ko,ar,hi,pt,ru,it,nl,pl,tr,vi,th,id,ms,sv,no,da,fi,cs,hu,ro,uk,el,he,fa,bn,ur,ta,te,mr,gu,kn,ml,si,ne,my,km,lo,am,ti,sw,zu,yo,ig,ha,so,mg,ny,sn,st,xh,af',
          layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        'google_translate_element'
      );
      setGoogleTranslateLoaded(true);

      // Hide Google Translate banner
      const style = document.createElement('style');
      style.innerHTML = `
        .goog-te-banner-frame { display: none !important; }
        body { top: 0 !important; }
        .goog-te-combo {
          background-color: #1a1a1a !important;
          border: 1px solid rgba(220, 38, 38, 0.3) !important;
          color: #fff !important;
          padding: 8px 12px !important;
          border-radius: 8px !important;
          font-size: 14px !important;
          cursor: pointer !important;
        }
        .goog-te-combo:hover {
          border-color: rgba(220, 38, 38, 0.6) !important;
        }
        .goog-te-combo option {
          background-color: #1a1a1a !important;
          color: #fff !important;
        }
        #google_translate_element {
          background-color: #1a1a1a !important;
          border: 1px solid rgba(220, 38, 38, 0.3) !important;
          padding: 12px !important;
          border-radius: 8px !important;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5) !important;
        }
        .goog-te-gadget {
          font-family: inherit !important;
          color: #fff !important;
        }
        .goog-te-gadget-simple {
          background-color: transparent !important;
          border: none !important;
          padding: 0 !important;
        }
        .goog-logo-link {
          display: none !important;
        }
        .goog-te-gadget span {
          display: none !important;
        }
      `;
      document.head.appendChild(style);
    };
  }, []);

  // Toggle between English and Japanese
  const toggleLanguage = (lang: 'en' | 'ja') => {
    setCurrentLanguage(lang);
    i18n.changeLanguage(lang);
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Reset Google Translate to original language
    const iframe = document.querySelector('.goog-te-menu-frame') as HTMLIFrameElement;
    if (iframe) {
      const innerDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (innerDoc) {
        const originalLangButton = innerDoc.querySelector('.goog-te-menu2-item span.text:first-child') as HTMLElement;
        if (originalLangButton) {
          originalLangButton.click();
        }
      }
    }
    setShowLanguageMenu(false);
  };

  // Open Google Translate dropdown
  const openGoogleTranslate = () => {
    const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (selectElement) {
      selectElement.focus();
      selectElement.click();
      
      // Trigger the dropdown to open
      const event = new MouseEvent('mousedown', {
        view: window,
        bubbles: true,
        cancelable: true
      });
      selectElement.dispatchEvent(event);
    }
    setShowLanguageMenu(false);
  };

  const notifications = [
    { id: 1, type: 'comment', user: 'Takeshi Yamamoto', content: 'commented on your post', time: '5m ago', unread: true },
    { id: 2, type: 'follow', user: 'Sarah Chen', content: 'started following you', time: '1h ago', unread: true },
    { id: 3, type: 'mention', user: 'Mike Johnson', content: 'mentioned you in a discussion', time: '2h ago', unread: false },
    { id: 4, type: 'update', user: 'System', content: 'New policy document published', time: '3h ago', unread: false },
  ];

  const createOptions = [
    { icon: 'ri-layout-grid-line', label: 'Space', color: 'from-red-600 to-red-700', onClick: () => { setShowSpaceModal(true); setShowCreateMenu(false); } },
    { icon: 'ri-file-text-line', label: 'Document', color: 'from-red-600 to-red-700', onClick: () => { setShowDocumentModal(true); setShowCreateMenu(false); } },
    { icon: 'ri-article-line', label: 'Blog', color: 'from-red-600 to-red-700', onClick: () => { setShowBlogModal(true); setShowCreateMenu(false); } },
    { icon: 'ri-calendar-event-line', label: 'Activity', color: 'from-red-600 to-red-700', onClick: () => { setShowActivityModal(true); setShowCreateMenu(false); } },
    { icon: 'ri-group-line', label: 'Crossfunction', color: 'from-red-600 to-red-700', onClick: () => { setShowCrossfunctionModal(true); setShowCreateMenu(false); } },
    { icon: 'ri-calendar-line', label: 'Event', color: 'from-red-600 to-red-700', onClick: () => console.log('Create Event') },
    { icon: 'ri-bar-chart-box-line', label: 'Poll', color: 'from-red-600 to-red-700', onClick: () => console.log('Create Poll') },
    { icon: 'ri-chat-4-line', label: 'Discussion', color: 'from-red-600 to-red-700', onClick: () => console.log('Create Discussion') },
    { icon: 'ri-folder-line', label: 'File', color: 'from-red-600 to-red-700', onClick: () => console.log('Upload File') },
    { icon: 'ri-video-line', label: 'Video', color: 'from-red-600 to-red-700', onClick: () => console.log('Upload Video') },
    { icon: 'ri-bookmark-line', label: 'Bookmark', color: 'from-red-600 to-red-700', onClick: () => console.log('Add Bookmark') },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/95 backdrop-blur-lg shadow-lg shadow-red-600/10' : 'bg-black/80 backdrop-blur-md'
      }`}>
        <div className="w-full px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-red-600/30">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="text-xl font-bold text-white group-hover:text-red-500 transition-colors duration-300">Fusion Intranet</span>
            </Link>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Language Dropdown */}
              <div className="relative" ref={languageRef}>
                <button
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                  className="px-4 py-2 flex items-center gap-2 bg-dark-card border border-dark-border text-gray-300 rounded-lg hover:bg-dark-hover hover:border-red-600/50 hover:text-white transition-all duration-300 cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-global-line text-lg"></i>
                  <span className="text-sm font-medium">{currentLanguage === 'en' ? 'EN' : 'JP'}</span>
                  <i className={`ri-arrow-down-s-line text-base transition-transform duration-300 ${showLanguageMenu ? 'rotate-180' : ''}`}></i>
                </button>

                {/* Language Dropdown Menu */}
                {showLanguageMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-dark-card border border-dark-border rounded-lg shadow-2xl shadow-black/50 animate-slide-down overflow-hidden">
                    <div className="px-3 py-2 border-b border-dark-border">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Primary Languages</p>
                    </div>
                    <button
                      onClick={() => toggleLanguage('en')}
                      className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-dark-hover transition-colors duration-150 cursor-pointer ${
                        currentLanguage === 'en' ? 'bg-red-600/10' : ''
                      }`}
                    >
                      <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800/50">
                        <span className="text-sm font-bold">EN</span>
                      </div>
                      <span className="text-sm font-medium text-gray-300">English</span>
                      {currentLanguage === 'en' && (
                        <i className="ri-check-line text-red-600 ml-auto"></i>
                      )}
                    </button>
                    <button
                      onClick={() => toggleLanguage('ja')}
                      className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-dark-hover transition-colors duration-150 cursor-pointer ${
                        currentLanguage === 'ja' ? 'bg-red-600/10' : ''
                      }`}
                    >
                      <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800/50">
                        <span className="text-sm font-bold">JP</span>
                      </div>
                      <span className="text-sm font-medium text-gray-300">日本語</span>
                      {currentLanguage === 'ja' && (
                        <i className="ri-check-line text-red-600 ml-auto"></i>
                      )}
                    </button>
                    <div className="border-t border-dark-border mt-1 pt-1">
                      <button
                        onClick={openGoogleTranslate}
                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-dark-hover transition-colors duration-150 cursor-pointer"
                      >
                        <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800/50">
                          <i className="ri-translate-2 text-red-600"></i>
                        </div>
                        <span className="text-sm font-medium text-gray-300">Other Languages</span>
                        <i className="ri-arrow-right-s-line text-gray-400 ml-auto"></i>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Admin Panel Button - Only for Admin */}
              {userRole === 'admin' && (
                <Link
                  to="/admin"
                  className="px-4 py-2 flex items-center gap-2 bg-gradient-to-br from-red-600 to-red-700 text-white rounded-lg hover:shadow-lg hover:shadow-red-600/50 hover:scale-105 transition-all duration-300 cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-admin-line text-lg"></i>
                  <span className="font-medium">Admin</span>
                </Link>
              )}

              {/* Create Button - For Admin and Internal Users */}
              {(userRole === 'admin' || userRole === 'internal') && (
                <div className="relative" ref={createRef}>
                  <button
                    onClick={() => setShowCreateMenu(!showCreateMenu)}
                    className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-red-600 to-red-700 text-white rounded-lg hover:shadow-lg hover:shadow-red-600/50 hover:scale-110 transition-all duration-300 cursor-pointer"
                  >
                    <i className="ri-add-line text-xl"></i>
                  </button>

                  {/* Create Menu Dropdown - Now Scrollable */}
                  {showCreateMenu && (
                    <div className="absolute right-0 mt-3 w-64 bg-dark-card border border-dark-border rounded-lg shadow-2xl shadow-black/50 animate-slide-down overflow-hidden">
                      <div className="max-h-96 overflow-y-auto custom-scrollbar">
                        {createOptions.map((option, index) => (
                          <button
                            key={index}
                            onClick={option.onClick}
                            className="w-full px-4 py-3 flex items-center gap-3 hover:bg-dark-hover transition-colors duration-150 cursor-pointer"
                          >
                            <div className={`w-9 h-9 flex items-center justify-center rounded-lg bg-gray-800/50 ${option.color}`}>
                              <i className={`${option.icon} text-lg`}></i>
                            </div>
                            <span className="text-sm font-medium text-gray-300">{option.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Notifications */}
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-dark-hover rounded-lg transition-all duration-300 cursor-pointer"
                >
                  <i className="ri-notification-3-line text-xl"></i>
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-3 w-96 bg-dark-card border border-dark-border rounded-lg shadow-2xl shadow-black/50 animate-slide-down">
                    <div className="px-4 py-3 border-b border-dark-border flex items-center justify-between">
                      <h3 className="font-semibold text-white">Notifications</h3>
                      <button className="text-xs text-red-600 hover:text-red-500 font-medium whitespace-nowrap cursor-pointer">
                        Mark all read
                      </button>
                    </div>
                    <div className="max-h-96 overflow-y-auto custom-scrollbar">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`px-4 py-3 hover:bg-dark-hover cursor-pointer transition-colors duration-150 ${
                            notif.unread ? 'bg-red-600/5' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-9 h-9 flex items-center justify-center bg-gray-800 rounded-full flex-shrink-0">
                              <i className={`${
                                notif.type === 'comment' ? 'ri-chat-3-line' :
                                notif.type === 'follow' ? 'ri-user-follow-line' :
                                notif.type === 'mention' ? 'ri-at-line' :
                                'ri-information-line'
                              } text-gray-400`}></i>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-white">
                                <span className="font-semibold">{notif.user}</span>{' '}
                                <span className="text-gray-400">{notif.content}</span>
                              </p>
                              <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                            </div>
                            {notif.unread && (
                              <div className="w-2 h-2 bg-red-600 rounded-full flex-shrink-0 mt-2"></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-3 border-t border-dark-border text-center">
                      <button className="text-sm text-red-600 hover:text-red-500 font-medium whitespace-nowrap cursor-pointer">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Menu */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-dark-hover rounded-lg transition-all duration-300 cursor-pointer group"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center text-white text-sm font-semibold ring-2 ring-red-600/30 group-hover:ring-red-600/60 transition-all duration-300">
                    JD
                  </div>
                  <i className="ri-arrow-down-s-line text-gray-400 group-hover:text-white transition-colors duration-300"></i>
                </button>

                {/* Profile Dropdown */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-3 w-64 bg-dark-card border border-dark-border rounded-lg shadow-2xl shadow-black/50 animate-slide-down overflow-hidden">
                    <div className="px-4 py-3 border-b border-dark-border">
                      <p className="font-semibold text-white">Kenji Tanaka</p>
                      <p className="text-xs text-gray-400 mt-0.5">Senior Manager</p>
                    </div>
                    <Link to="/profile" className="px-4 py-2.5 flex items-center gap-3 hover:bg-dark-hover transition-colors duration-150 cursor-pointer">
                      <i className="ri-user-line text-gray-400"></i>
                      <span className="text-sm text-gray-300">View Profile</span>
                    </Link>
                    <Link to="/profile/edit" className="px-4 py-2.5 flex items-center gap-3 hover:bg-dark-hover transition-colors duration-150 cursor-pointer">
                      <i className="ri-edit-line text-gray-400"></i>
                      <span className="text-sm text-gray-300">Edit Profile</span>
                    </Link>
                    <Link to="/my-content" className="px-4 py-2.5 flex items-center gap-3 hover:bg-dark-hover transition-colors duration-150 cursor-pointer">
                      <i className="ri-folder-user-line text-gray-400"></i>
                      <span className="text-sm text-gray-300">My Content</span>
                    </Link>
                    <div className="border-t border-dark-border mt-2 pt-2">
                      <button className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-dark-hover transition-colors duration-150 cursor-pointer text-red-600">
                        <i className="ri-logout-box-line"></i>
                        <span className="text-sm font-medium whitespace-nowrap">Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Google Translate Element - Hidden by default */}
      <div id="google_translate_element" className="fixed top-20 right-6 z-50 hidden"></div>

      {/* Modals */}
      <CreateSpaceModal isOpen={showSpaceModal} onClose={() => setShowSpaceModal(false)} />
      <CreateDocumentModal isOpen={showDocumentModal} onClose={() => setShowDocumentModal(false)} />
      <CreateCrossfunctionModal isOpen={showCrossfunctionModal} onClose={() => setShowCrossfunctionModal(false)} />
      <CreateBlogModal isOpen={showBlogModal} onClose={() => setShowBlogModal(false)} />
      <CreateActivityModal isOpen={showActivityModal} onClose={() => setShowActivityModal(false)} />
    </>
  );
}

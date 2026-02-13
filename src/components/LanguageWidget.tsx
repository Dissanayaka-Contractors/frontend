import React, { useEffect, useState } from 'react';
import { Globe, ChevronUp } from 'lucide-react';

declare global {
    interface Window {
        google: any;
        googleTranslateElementInit: () => void;
    }
}

export const LanguageWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentLang, setCurrentLang] = useState('en');

    useEffect(() => {
        // Define the callback function globally
        window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'en,si,ta',
                autoDisplay: false,
            }, 'google_translate_element');
        };

        // Load the Google Translate script if not already loaded
        if (!document.getElementById('google-translate-script')) {
            const script = document.createElement('script');
            script.id = 'google-translate-script';
            script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
            script.async = true;
            document.body.appendChild(script);
        }

        // Add custom styles to hide the default Google Translate bar
        const style = document.createElement('style');
        style.innerHTML = `
            .goog-te-banner-frame.skiptranslate { display: none !important; }
            iframe.goog-te-banner-frame { display: none !important; }
            .goog-te-gadget-icon { display: none !important; }
            .goog-te-gadget-simple { background-color: transparent !important; border: none !important; font-size: 0 !important; }
            body { top: 0px !important; position: static !important; }
            #google_translate_element { display: none; }
            .skiptranslate > iframe { display: none !important; }
        `;
        document.head.appendChild(style);

        return () => {
            // Cleanup logic if needed
        };
    }, []);

    const changeLanguage = (langCode: string) => {
        const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
        if (select) {
            select.value = langCode;
            select.dispatchEvent(new Event('change'));
            setCurrentLang(langCode);
            setIsOpen(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
            {/* Hidden Google Translate Element */}
            <div id="google_translate_element"></div>

            {/* Language Menu */}
            {isOpen && (
                <div className="bg-white rounded-lg shadow-xl p-2 mb-2 animate-in slide-in-from-bottom-5 fade-in duration-200 min-w-[150px]">
                    <div className="flex flex-col gap-1">
                        <button
                            onClick={() => changeLanguage('en')}
                            className={`text-left px-4 py-2 rounded hover:bg-gray-100 text-sm font-medium transition-colors ${currentLang === 'en' ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}`}
                        >
                            🇺🇸 English
                        </button>
                        <button
                            onClick={() => changeLanguage('si')}
                            className={`text-left px-4 py-2 rounded hover:bg-gray-100 text-sm font-medium transition-colors ${currentLang === 'si' ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}`}
                        >
                            🇱🇰 Sinhala
                        </button>
                        <button
                            onClick={() => changeLanguage('ta')}
                            className={`text-left px-4 py-2 rounded hover:bg-gray-100 text-sm font-medium transition-colors ${currentLang === 'ta' ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}`}
                        >
                            🇮🇳 Tamil
                        </button>
                    </div>
                </div>
            )}

            {/* Float Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                aria-label="Change Language"
            >
                {isOpen ? <ChevronUp size={24} /> : <Globe size={24} />}
            </button>
        </div>
    );
};

"use client";

import React, { useState } from 'react';
import { useLanguage, Language } from '../contexts/LanguageContext';

const LanguageSelector: React.FC = () => {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const languages = [
        {
            code: 'fr' as Language,
            name: 'Français',
            flag: '🇫🇷'
        },
        {
            code: 'en' as Language,
            name: 'English',
            flag: '🇬🇧'
        }
    ];

    const currentLanguage = languages.find(lang => lang.code === language);

    const handleLanguageChange = (langCode: Language) => {
        setLanguage(langCode);
        setIsOpen(false);
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative" style={{ zIndex: 9999 }}>
            {/* Bouton principal */}
            <button
                onClick={toggleMenu}
                className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 transition-all duration-300 group"
                title={`Langue: ${currentLanguage?.name}`}
                style={{ zIndex: 9999 }}
            >
                <span className="text-lg">{currentLanguage?.flag}</span>
                <span className="text-white text-sm font-light tracking-wider uppercase hidden sm:block">
                    {language}
                </span>
                <svg 
                    className={`w-4 h-4 text-white/70 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>

            {/* Menu déroulant */}
            {isOpen && (
                <div 
                    className="absolute top-full mt-2 right-0 min-w-[120px] bg-black/90 backdrop-blur-md border border-white/20 rounded-lg shadow-2xl overflow-hidden"
                    style={{ zIndex: 9999 }}
                >
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => handleLanguageChange(lang.code)}
                            className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-all duration-200 ${
                                language === lang.code 
                                    ? 'bg-white/20 text-white' 
                                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                            }`}
                        >
                            <span className="text-lg">{lang.flag}</span>
                            <span className="text-sm font-light tracking-wide">
                                {lang.name}
                            </span>
                            {language === lang.code && (
                                <span className="ml-auto">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            )}

            {/* Overlay pour fermer le menu */}
            {isOpen && (
                <div 
                    className="fixed inset-0"
                    style={{ zIndex: 9998 }}
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
};

export default LanguageSelector; 
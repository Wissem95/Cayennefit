"use client";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import Image from 'next/image';
import AppointmentSystem from './AppointmentSystem';
import LanguageSelector from './LanguageSelector';
import { useVideoSound } from '../contexts/VideoSoundContext';

const NavBar = () => {
    const pathname = usePathname();
    const isAdminPage = pathname === '/admin';
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const { t } = useTranslation();
    const { isMuted, toggleMute } = useVideoSound();

    // Émettre un événement personnalisé quand le menu change d'état
    useEffect(() => {
        window.dispatchEvent(new CustomEvent('menuToggle', { detail: isMenuOpen }));
    }, [isMenuOpen]);

    // Gérer l'affichage de la navbar selon le scroll
    useEffect(() => {
        const controlNavbar = () => {
            if (typeof window !== 'undefined') {
                const currentScrollY = window.scrollY;
                
                // Montrer la navbar si on scroll vers le haut ou si on est en haut de page
                if (currentScrollY < lastScrollY || currentScrollY < 100) {
                    setIsVisible(true);
                } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
                    // Cacher la navbar si on scroll vers le bas et qu'on a dépassé 100px
                    setIsVisible(false);
                }
                
                setLastScrollY(currentScrollY);
            }
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlNavbar);
            return () => window.removeEventListener('scroll', controlNavbar);
        }
    }, [lastScrollY]);

    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
            setIsMenuOpen(false); // Fermer le menu après clic
        }
    };

    const menuItems = [
        { name: t('navigation.home'), action: () => scrollToSection('home') },
        { name: t('navigation.about'), action: () => scrollToSection('about') },
        { name: t('navigation.expertise'), action: () => scrollToSection('expertise') },
        { name: t('navigation.services'), action: () => scrollToSection('services') },
        { name: t('navigation.vehicles'), action: () => scrollToSection('discover') },
        { name: t('navigation.contact'), action: () => window.open('https://api.whatsapp.com/send?phone=33785189051', '_blank'), isWhatsApp: true },
    ];

    return (
        <header className={`w-full fixed z-[100] transition-transform duration-300 ${
            isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${isMenuOpen ? 'bg-transparent' : 'bg-black/20 backdrop-blur-sm'}`}>
            <nav className='w-full mx-auto flex justify-between items-center px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 py-4 bg-transparent'>
                {/* Version Mobile */}
                <div className="md:hidden flex items-center justify-between w-full">
                    {/* Bouton hamburger / croix - CORRIGÉ avec z-index élevé */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="relative z-[10000] p-2 rounded-md transition-all duration-300"
                        aria-label={isMenuOpen ? t('navigation.close') : t('navigation.menu')}
                    >
                        <div className="w-6 h-6 relative transform transition-all duration-300">
                            {isMenuOpen ? (
                                // Croix bien visible en haut à gauche
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-6 h-0.5 bg-white transform rotate-45 absolute shadow-lg"></div>
                                    <div className="w-6 h-0.5 bg-white transform -rotate-45 absolute shadow-lg"></div>
                                </div>
                            ) : (
                                // Hamburger classique
                                <div className="absolute inset-0 flex flex-col justify-center space-y-1">
                                    <div className="w-6 h-0.5 bg-white transform transition-all shadow-lg"></div>
                                    <div className="w-6 h-0.5 bg-white transform transition-all shadow-lg"></div>
                                    <div className="w-6 h-0.5 bg-white transform transition-all shadow-lg"></div>
                                </div>
                            )}
                        </div>
                    </button>

                    {/* Logo CAYENNEFIT centré en mobile - entre menu burger et sélecteur de langue */}
                    <Link href='/' className='flex justify-center items-center group'>
                        <div className="text-white font-light text-lg tracking-[0.3em] hover:tracking-[0.4em] transition-all duration-300 drop-shadow-lg">
                            CAYENNEFIT
                        </div>
                    </Link>

                    {/* Contrôles à droite en mobile */}
                    <div className="flex items-center space-x-2">
                        {/* Bouton de contrôle du son en mobile */}
                        <button
                            onClick={toggleMute}
                            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg p-2 transition-all duration-300"
                            title={isMuted ? t('hero.unmuteVideo') : t('hero.muteVideo')}
                        >
                            {isMuted ? (
                                // Icône son coupé
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                                </svg>
                            ) : (
                                // Icône son activé
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                </svg>
                            )}
                        </button>
                        
                        {/* Sélecteur de langue */}
                        <LanguageSelector />
                    </div>
                </div>

                {/* Version Desktop */}
                <div className="hidden md:flex items-center justify-between w-full">
                    {/* Espace gauche pour équilibrer */}
                    <div className="w-1/3"></div>

                    {/* Logo CAYENNEFIT centré sur desktop - masqué sur admin */}
                    {!isAdminPage && (
                        <Link href='/' className='flex justify-center items-center group'>
                            <div className="text-white font-light text-2xl xl:text-3xl tracking-[0.3em] hover:tracking-[0.4em] transition-all duration-300">
                                CAYENNEFIT
                            </div>
                        </Link>
                    )}

                    {/* Contrôles à droite sur desktop */}
                    <div className="w-1/3 flex justify-end items-center space-x-4">
                        {/* Bouton de contrôle du son */}
                        <button
                            onClick={toggleMute}
                            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg p-3 transition-all duration-300"
                            title={isMuted ? t('hero.unmuteVideo') : t('hero.muteVideo')}
                        >
                            {isMuted ? (
                                // Icône son coupé
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                                </svg>
                            ) : (
                                // Icône son activé
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                </svg>
                            )}
                        </button>
                        
                        {/* Sélecteur de langue */}
                        <LanguageSelector />
                    </div>
                </div>
            </nav>

            {/* Menu mobile overlay - CORRIGÉ avec z-index approprié */}
            {isMenuOpen && !isAdminPage && (
                <div className="md:hidden fixed inset-0 bg-black/95 backdrop-blur-md z-[9998]">
                    {/* En-tête du menu avec logo centré */}
                    <div className="flex justify-center items-center px-6 py-6 border-b border-white/10">
                        <div className="text-white font-light text-xl tracking-[0.3em]">
                            CAYENNEFIT
                        </div>
                    </div>
                    
                    {/* Menu principal */}
                    <div className="flex flex-col items-center justify-center h-full space-y-8 -mt-20">
                        {menuItems.map((item, index) => (
                            <button
                                key={index}
                                onClick={item.action}
                                className="text-white text-xl font-light tracking-[0.2em] hover:tracking-[0.3em] transition-all duration-300 hover:text-gray-300 flex items-center gap-3"
                            >
                                {item.name}
                                {item.isWhatsApp && (
                                    <Image
                                        src="/images/whatsapp.svg"
                                        alt="WhatsApp"
                                        width={24}
                                        height={24}
                                        className="inline-block"
                                    />
                                )}
                            </button>
                        ))}
                        
                        {/* Bouton de rendez-vous dans le menu mobile */}
                        <div className="mt-6 pt-6 border-t border-white/20">
                            <AppointmentSystem 
                                variant="luxury"
                                size="md"
                                className="bg-white/20 border border-white/40 text-white px-8 py-3 font-light tracking-[0.2em] text-sm uppercase hover:bg-white hover:text-black transition-all duration-500 backdrop-blur-md"
                            />
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default NavBar;

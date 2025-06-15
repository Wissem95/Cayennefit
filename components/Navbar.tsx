"use client";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import Image from 'next/image';
import AppointmentSystem from './AppointmentSystem';

const NavBar = () => {
    const pathname = usePathname();
    const isAdminPage = pathname === '/admin';
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { t } = useTranslation();

    // Émettre un événement personnalisé quand le menu change d'état
    useEffect(() => {
        window.dispatchEvent(new CustomEvent('menuToggle', { detail: isMenuOpen }));
    }, [isMenuOpen]);

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
        { name: t('navigation.contact'), action: () => window.open('https://api.whatsapp.com/send?phone=6583245152', '_blank'), isWhatsApp: true },
    ];

    return (
        <header className='w-full absolute z-20'>
            <nav className='max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-6 bg-transparent'>
                {/* Version Mobile */}
                <div className="md:hidden flex items-center justify-between w-full">
                    {/* Bouton hamburger / croix - aligné avec les autres éléments */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={`${isMenuOpen ? 'fixed left-6' : 'relative'} z-[9999] p-2 rounded-md transition-all duration-300`}
                        aria-label={isMenuOpen ? t('navigation.close') : t('navigation.menu')}
                    >
                        <div className={`w-6 h-6 relative transform transition-all duration-300`}>
                            {isMenuOpen ? (
                                // Croix positionnée à gauche
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-6 h-0.5 bg-white transform rotate-45 absolute"></div>
                                    <div className="w-6 h-0.5 bg-white transform -rotate-45 absolute"></div>
                                </div>
                            ) : (
                                // Hamburger classique
                                <div className="absolute inset-0 flex flex-col justify-center space-y-1">
                                    <div className="w-6 h-0.5 bg-white transform transition-all"></div>
                                    <div className="w-6 h-0.5 bg-white transform transition-all"></div>
                                    <div className="w-6 h-0.5 bg-white transform transition-all"></div>
                                </div>
                            )}
                        </div>
                    </button>
                </div>

                {/* Logo CAYENNEFIT centré sur desktop - masqué sur admin */}
                {!isAdminPage && (
                    <Link href='/' className='hidden md:flex justify-center items-center group absolute left-1/2 transform -translate-x-1/2 z-[9999]'>
                        <div className="text-white font-light text-2xl tracking-[0.3em] hover:tracking-[0.4em] transition-all duration-300">
                            CAYENNEFIT
                        </div>
                    </Link>
                )}
            </nav>

            {/* Menu mobile overlay */}
            {isMenuOpen && !isAdminPage && (
                <div className="md:hidden fixed inset-0 bg-black/95 backdrop-blur-md z-[9999]">
                    <div className="flex justify-center items-center px-6 py-6">
                        <div className="text-white font-light text-xl tracking-[0.3em]">
                            CAYENNEFIT
                        </div>
                    </div>
                    
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

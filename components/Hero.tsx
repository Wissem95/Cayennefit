"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslation } from "../contexts/LanguageContext";
import LanguageSelector from "./LanguageSelector";
import AppointmentSystem from './AppointmentSystem';

const Hero = () => {
    const { t } = useTranslation();
    const [currentVideo, setCurrentVideo] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isMuted, setIsMuted] = useState(true); // État global du son
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const video1Ref = useRef<HTMLVideoElement>(null);
    const video2Ref = useRef<HTMLVideoElement>(null);

    // Écouter l'événement personnalisé du menu burger depuis la Navbar
    useEffect(() => {
        const handleMenuToggle = (event: CustomEvent) => {
            setIsMenuOpen(event.detail);
        };

        window.addEventListener('menuToggle', handleMenuToggle as EventListener);
        
        return () => {
            window.removeEventListener('menuToggle', handleMenuToggle as EventListener);
        };
    }, []);

    // Auto-switch entre les vidéos toutes les 8 secondes (seulement si pas de survol)
    useEffect(() => {
        if (!isHovered) {
            const interval = setInterval(() => {
                setCurrentVideo(prev => prev === 0 ? 1 : 0);
            }, 8000);

            return () => clearInterval(interval);
        }
    }, [isHovered]);

    // Démarrer la première vidéo automatiquement au chargement
    useEffect(() => {
        if (video1Ref.current) {
            video1Ref.current.muted = isMuted;
            video1Ref.current.play().catch(e => console.log('Erreur lecture vidéo 1:', e));
        }
    }, []);

    // Gérer le changement de vidéo automatique
    useEffect(() => {
        const currentVideoRef = currentVideo === 0 ? video1Ref.current : video2Ref.current;
        const otherVideoRef = currentVideo === 0 ? video2Ref.current : video1Ref.current;
        
        if (currentVideoRef && otherVideoRef) {
            // Jouer la vidéo active
            currentVideoRef.muted = isMuted;
            currentVideoRef.currentTime = 0;
            currentVideoRef.play().catch(e => console.log('Erreur lecture vidéo:', e));
            
            // Arrêter l'autre vidéo
            otherVideoRef.pause();
            otherVideoRef.currentTime = 0;
        }
    }, [currentVideo, isMuted]);

    // Contrôle de la lecture et du son au survol (pour override temporaire)
    const handleVideoHover = (videoIndex: number, isEntering: boolean) => {
        setIsHovered(isEntering);
        
        if (isEntering) {
            setCurrentVideo(videoIndex);
        }
        // Plus besoin de gérer la lecture ici car elle est gérée par useEffect
    };

    // Contrôle global du son
    const toggleMute = () => {
        const newMutedState = !isMuted;
        setIsMuted(newMutedState);
        
        // Appliquer à toutes les vidéos
        if (video1Ref.current) video1Ref.current.muted = newMutedState;
        if (video2Ref.current) video2Ref.current.muted = newMutedState;
    };

    const handleScrollToAbout = () => {
        const aboutSection = document.getElementById("about");
        if (aboutSection) {
            // Calcul de la position avec un décalage pour éviter les données coupées
            const yOffset = +100; // Ajustez cette valeur selon vos besoins
            const y = aboutSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };

    const handleScrollToCollection = () => {
        const collectionSection = document.getElementById("discover");
        if (collectionSection) {
            // Calcul de la position avec un décalage pour éviter les données coupées
            const yOffset = +280; // Ajustez cette valeur selon vos besoins
            const y = collectionSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };

    return (
        <div id="home" className="relative h-screen w-full overflow-hidden bg-black">
            {/* Contrôles en haut à droite */}
            <div className="absolute top-6 right-6 z-[50] flex items-center space-x-4">
                {/* Contrôle du son - Caché sur mobile */}
                <button
                    onClick={toggleMute}
                    className="hidden md:block bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg p-3 transition-all duration-300 group"
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

                {/* Sélecteur de langue - pour desktop ET mobile */}
                <LanguageSelector />
            </div>

            {/* Version Desktop - Section vidéos côte à côte */}
            <div className="hidden md:flex absolute inset-0">
                {/* Vidéo 1 - Services automobiles */}
                <div 
                    className={`w-1/2 h-full relative group cursor-pointer transition-all duration-500 ${
                        currentVideo === 0 ? 'z-[5]' : 'z-[1]'
                    }`}
                    onMouseEnter={() => handleVideoHover(0, true)}
                    onMouseLeave={() => handleVideoHover(0, false)}
                >
                    {/* Fallback avec image si vidéo pas disponible */}
                    <div className="w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
                        <video
                            ref={video1Ref}
                            className={`w-full h-full object-cover transition-all duration-1000 ${
                                currentVideo === 0 ? 'opacity-100 scale-100' : 'opacity-70 scale-100'
                            }`}
                            muted={isMuted}
                            loop
                            playsInline
                            preload="metadata"
                        >
                            <source src="/videos/porsche cayenne fit.mp4" type="video/mp4" />
                            <source src="/videos/luxury-car-1.mp4" type="video/mp4" />
                        </video>
                    </div>
                    
                    {/* Overlay et contenu de la première section - SUPPRIMÉ */}
                    
                    {/* Contenu positionné avec contraintes pour éviter le chevauchement */}
                    <div className="absolute inset-0 flex items-center justify-start px-6 py-8">
                        <div className="text-center text-white w-full max-w-[500px] ml-4 rounded-xl p-10 h-[450px] flex flex-col justify-between">
                            {/* Contenu principal */}
                            <div className="flex flex-col justify-center flex-1">
                                {/* Titre principal responsive */}
                                <h2 
                                    className="text-xl md:text-2xl lg:text-3xl font-light tracking-[0.1em] mb-6 mt-8 whitespace-nowrap"
                                    dangerouslySetInnerHTML={{
                                        __html: t('hero.services').replace('PORSCHE CAYENNE', '<br/>PORSCHE CAYENNE')
                                    }}
                                />
                                
                                {/* Ligne de séparation responsive */}
                                <div className="w-20 md:w-24 h-px bg-white mx-auto mb-6"></div>
                                
                                {/* Sous-titre responsive avec line-height optimisé */}
                                <h3 
                                    className="text-sm md:text-base lg:text-lg font-light tracking-[0.1em] mb-8 opacity-90 leading-relaxed"
                                    dangerouslySetInnerHTML={{
                                        __html: t('hero.automobiles').replace(/<br\/>/g, '<br/>')
                                    }}
                                />
                            </div>
                            
                            {/* Container pour les boutons avec alignement parfait - fixé en bas */}
                            <div className="flex flex-col gap-4 items-center pb-4">
                                <button
                                    onClick={handleScrollToAbout}
                                    className="w-full max-w-[240px] bg-transparent border border-white/50 text-white px-6 py-3 font-light tracking-[0.15em] text-xs uppercase hover:bg-white hover:text-black transition-all duration-500"
                                >
                                    {t('hero.discover')}
                                </button>
                                
                                {/* Bouton Rendez-vous avec alignement parfait */}
                                <div className="w-full max-w-[240px]">
                                    <AppointmentSystem 
                                        variant="minimal"
                                        size="sm"
                                        className="w-full bg-white/10 border border-white/30 text-white px-6 py-3 font-light tracking-[0.15em] text-xs uppercase hover:bg-white hover:text-black transition-all duration-500 backdrop-blur-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Séparateur central */}
                <div className="w-px bg-white/20 z-[10]"></div>

                {/* Vidéo 2 - Véhicules & Pièces détachées */}
                <div 
                    className={`w-1/2 h-full relative group cursor-pointer transition-all duration-500 ${
                        currentVideo === 1 ? 'z-[5]' : 'z-[1]'
                    }`}
                    onMouseEnter={() => handleVideoHover(1, true)}
                    onMouseLeave={() => handleVideoHover(1, false)}
                >
                    {/* Fallback avec image si vidéo pas disponible */}
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 via-black to-gray-900 overflow-hidden">
                        <video
                            ref={video2Ref}
                            className={`w-full h-full object-cover transition-all duration-1000 ${
                                currentVideo === 1 ? 'opacity-100 scale-100' : 'opacity-70 scale-100'
                            }`}
                            muted={isMuted}
                            loop
                            playsInline
                            preload="metadata"
                        >
                            <source src="/videos/Porsche Cayenne Coupe Sound Review (1).mp4" type="video/mp4" />
                            <source src="/videos/luxury-car-2.mp4" type="video/mp4" />
                        </video>
                    </div>
                    
                    {/* Overlay et contenu de la deuxième section - SUPPRIMÉ */}
                    
                    {/* Contenu positionné avec contraintes pour éviter le chevauchement */}
                    <div className="absolute inset-0 flex items-center justify-end px-6 py-8">
                        <div className="text-center text-white w-full max-w-[500px] mr-4 rounded-xl p-10 h-[450px] flex flex-col justify-between">
                            {/* Contenu principal */}
                            <div className="flex flex-col justify-center flex-1">
                                {/* Titre principal responsive */}
                                <h2 
                                    className="text-xl md:text-2xl lg:text-3xl font-light tracking-[0.1em] mb-6 whitespace-nowrap"
                                    dangerouslySetInnerHTML={{
                                        __html: t('hero.parts').replace('PORSCHE CAYENNE', '<br/>PORSCHE CAYENNE')
                                    }}
                                />
                                
                                {/* Ligne de séparation responsive */}
                                <div className="w-20 md:w-24 h-px bg-white mx-auto mb-6"></div>
                                
                                {/* Sous-titre responsive avec line-height optimisé */}
                                <h3 
                                    className="text-sm md:text-base lg:text-lg font-light tracking-[0.1em] mb-8 opacity-90 leading-relaxed"
                                    dangerouslySetInnerHTML={{
                                        __html: t('hero.vehicles').replace(/<br\/>/g, '<br/>')
                                    }}
                                />
                            </div>
                            
                            {/* Container pour les boutons avec alignement parfait - fixé en bas */}
                            <div className="flex flex-col gap-4 items-center pb-4">
                                <button
                                    onClick={handleScrollToCollection}
                                    className="w-full max-w-[240px] bg-transparent border border-white/50 text-white px-6 py-3 font-light tracking-[0.15em] text-xs uppercase hover:bg-white hover:text-black transition-all duration-500"
                                >
                                    {t('hero.discover')}
                                </button>
                                
                                {/* Bouton Rendez-vous avec alignement parfait */}
                                <div className="w-full max-w-[240px]">
                                    <AppointmentSystem 
                                        variant="minimal"
                                        size="sm"
                                        className="w-full bg-white/10 border border-white/30 text-white px-6 py-3 font-light tracking-[0.15em] text-xs uppercase hover:bg-white hover:text-black transition-all duration-500 backdrop-blur-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Version Mobile - 2 sections verticales */}
            <div className="md:hidden absolute inset-0 flex flex-col">
                {/* Section 1 - Logo CAYENNEFIT */}
                <div className="h-1/2 w-full relative bg-gradient-to-br from-gray-900 via-black to-gray-800">
                    <img 
                        src="/videos/slider.jpg" 
                        alt="Services automobiles" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center bg-black/30 backdrop-blur-sm rounded-lg p-4">
                            <h1 className="text-white font-light text-2xl tracking-[0.3em] leading-tight mb-2 drop-shadow-2xl">
                                CAYENNEFIT
                            </h1>
                            <p className="text-white/80 font-light text-xs tracking-[0.2em] drop-shadow-lg">
                                LE SPÉCIALISTE PORSCHE CAYENNE
                            </p>
                        </div>
                    </div>
                </div>

                {/* Séparateur horizontal */}
                <div className="h-px bg-white/20 z-10"></div>

                {/* Section 2 - Véhicules & Pièces détachées */}
                <div className="h-1/2 w-full relative bg-gradient-to-br from-gray-800 via-black to-gray-900">
                    <img 
                        src="/videos/high-cayenne-coupa-2019-porsche-ag-redimensionner_1.jpg" 
                        alt="Véhicules et pièces détachées" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50"></div>
                    <div className="absolute inset-0 flex items-center justify-center px-4 py-8">
                        <div className="text-center text-white max-w-xs w-full">
                            <h2 className="text-base sm:text-lg font-light tracking-[0.25em] mb-3">
                                {t('hero.parts')}
                            </h2>
                            <div className="w-12 h-px bg-white mx-auto mb-3"></div>
                            <h3 
                                className="text-xs sm:text-sm font-light tracking-[0.1em] mb-4 opacity-90 leading-tight"
                                dangerouslySetInnerHTML={{
                                    __html: t('hero.vehicles').replace(/<br\/>/g, '<br/>')
                                }}
                            />
                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={handleScrollToCollection}
                                    className="bg-transparent border border-white/50 text-white px-3 py-2 font-light tracking-[0.15em] text-xs uppercase hover:bg-white hover:text-black transition-all duration-500 w-full max-w-[140px] mx-auto"
                                >
                                    {t('hero.discover')}
                                </button>
                                {/* Bouton Rendez-vous mobile */}
                                <div className="mt-3">
                                    <AppointmentSystem 
                                        variant="minimal"
                                        size="sm"
                                        className="bg-white/10 border border-white/30 text-white px-3 py-2 font-light tracking-[0.15em] text-xs uppercase hover:bg-white hover:text-black transition-all duration-500 w-full max-w-[140px] mx-auto backdrop-blur-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Logo CAYENNEFIT centré en overlay pour DESKTOP seulement - SANS bouton rendez-vous */}
            {!isMenuOpen && (
                <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[9999] pointer-events-none">
                    <div className="text-center bg-black/40 backdrop-blur-md rounded-lg p-4 md:p-6 border border-white/20 shadow-2xl">
                        <h1 className="text-white font-light text-xl md:text-2xl lg:text-4xl tracking-[0.3em] leading-tight mb-2 md:mb-3 drop-shadow-2xl">
                            CAYENNEFIT
                        </h1>
                        <p className="text-white/90 font-light text-xs md:text-sm tracking-[0.2em] drop-shadow-lg">
                            LE SPÉCIALISTE PORSCHE CAYENNE
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Hero;

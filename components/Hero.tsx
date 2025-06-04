"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslation } from "../contexts/LanguageContext";
import LanguageSelector from "./LanguageSelector";

const Hero = () => {
    const { t } = useTranslation();
    const [currentVideo, setCurrentVideo] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isMuted, setIsMuted] = useState(true); // État global du son
    const video1Ref = useRef<HTMLVideoElement>(null);
    const video2Ref = useRef<HTMLVideoElement>(null);

    // Auto-switch entre les vidéos toutes les 8 secondes (seulement si pas de survol)
    useEffect(() => {
        if (!isHovered) {
            const interval = setInterval(() => {
                setCurrentVideo(prev => prev === 0 ? 1 : 0);
            }, 8000);

            return () => clearInterval(interval);
        }
    }, [isHovered]);

    // Contrôle de la lecture et du son au survol
    const handleVideoHover = (videoIndex: number, isEntering: boolean) => {
        setIsHovered(isEntering);
        
        if (isEntering) {
            setCurrentVideo(videoIndex);
            const currentVideoRef = videoIndex === 0 ? video1Ref.current : video2Ref.current;
            if (currentVideoRef) {
                currentVideoRef.muted = isMuted; // Respecter l'état global du son
                currentVideoRef.currentTime = 0; // Recommencer depuis le début
                currentVideoRef.play().catch(e => console.log('Erreur lecture vidéo:', e));
            }
        } else {
            // Arrêter la vidéo quand on sort du survol
            const currentVideoRef = videoIndex === 0 ? video1Ref.current : video2Ref.current;
            if (currentVideoRef) {
                currentVideoRef.pause();
                currentVideoRef.currentTime = 0; // Remettre au début
            }
        }
    };

    // Contrôle global du son
    const toggleMute = () => {
        const newMutedState = !isMuted;
        setIsMuted(newMutedState);
        
        // Appliquer à toutes les vidéos
        if (video1Ref.current) video1Ref.current.muted = newMutedState;
        if (video2Ref.current) video2Ref.current.muted = newMutedState;
    };

    const handleScroll = () => {
        const nextSection = document.getElementById("discover");
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="relative h-screen w-full overflow-hidden bg-black">
            {/* Contrôles en haut à droite */}
            <div className="absolute top-6 right-6 z-30 flex items-center space-x-4">
                {/* Contrôle du son */}
                <button
                    onClick={toggleMute}
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg p-3 transition-all duration-300 group"
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

            {/* Section vidéos côte à côte */}
            <div className="absolute inset-0 flex">
                {/* Vidéo 1 - Services automobiles */}
                <div 
                    className="w-1/2 h-full relative group cursor-pointer"
                    onMouseEnter={() => handleVideoHover(0, true)}
                    onMouseLeave={() => handleVideoHover(0, false)}
                >
                    {/* Fallback avec image si vidéo pas disponible */}
                    <div className="w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-800">
                        <video
                            ref={video1Ref}
                            className={`w-full h-full object-cover transition-all duration-1000 ${
                                currentVideo === 0 ? 'opacity-100 scale-100' : 'opacity-70 scale-105'
                            }`}
                            muted={isMuted}
                            loop
                            playsInline
                            preload="metadata"
                        >
                            <source src="/videos/BB_0f12adc1-439a-47f9-aae7-de22db10df56.mp4" type="video/mp4" />
                            <source src="/videos/luxury-car-1.mp4" type="video/mp4" />
                        </video>
                    </div>
                    
                    {/* Overlay et contenu de la première section */}
                    <div className={`absolute inset-0 bg-black/40 transition-all duration-500 ${
                        currentVideo === 0 ? 'bg-black/25' : 'bg-black/55'
                    }`}></div>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white p-4 max-w-sm">
                            <h2 className="text-xl lg:text-3xl font-light tracking-[0.25em] mb-4">
                                {t('hero.services')}
                            </h2>
                            <div className="w-16 h-px bg-white mx-auto mb-4"></div>
                            <h3 className="text-sm lg:text-lg font-light tracking-[0.15em] mb-6 opacity-90">
                                {t('hero.automobiles')}
                            </h3>
                            <button
                                onClick={handleScroll}
                                className="bg-transparent border border-white/50 text-white px-6 py-2 font-light tracking-[0.15em] text-xs uppercase hover:bg-white hover:text-black transition-all duration-500 group-hover:border-white group-hover:bg-white group-hover:text-black"
                            >
                                {t('hero.discover')}
                            </button>
                        </div>
                    </div>

                    {/* Indicateur survol pour lancer la vidéo */}
                    {currentVideo === 0 && !isHovered && (
                        <div className="absolute bottom-4 left-4 z-20">
                            <div className="bg-black/60 text-white px-3 py-1 rounded-full text-xs font-light tracking-wide">
                                🎬 {t('hero.hoverToPlay')}
                            </div>
                        </div>
                    )}
                </div>

                {/* Séparateur central */}
                <div className="w-px bg-white/20 z-10"></div>

                {/* Vidéo 2 - Véhicules & Pièces détachées */}
                <div 
                    className="w-1/2 h-full relative group cursor-pointer"
                    onMouseEnter={() => handleVideoHover(1, true)}
                    onMouseLeave={() => handleVideoHover(1, false)}
                >
                    {/* Fallback avec image si vidéo pas disponible */}
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 via-black to-gray-900">
                        <video
                            ref={video2Ref}
                            className={`w-full h-full object-cover transition-all duration-1000 ${
                                currentVideo === 1 ? 'opacity-100 scale-100' : 'opacity-70 scale-105'
                            }`}
                            muted={isMuted}
                            loop
                            playsInline
                            preload="metadata"
                        >
                            <source src="/videos/BB_5e63ad56-5580-47b6-8864-b807fd5e0125.mp4" type="video/mp4" />
                            <source src="/videos/luxury-car-2.mp4" type="video/mp4" />
                        </video>
                    </div>
                    
                    {/* Overlay et contenu de la deuxième section */}
                    <div className={`absolute inset-0 bg-black/40 transition-all duration-500 ${
                        currentVideo === 1 ? 'bg-black/25' : 'bg-black/55'
                    }`}></div>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white p-4 max-w-sm">
                            <h2 className="text-xl lg:text-3xl font-light tracking-[0.25em] mb-4">
                                {t('hero.vehicles')}
                            </h2>
                            <div className="w-16 h-px bg-white mx-auto mb-4"></div>
                            <h3 className="text-sm lg:text-lg font-light tracking-[0.15em] mb-6 opacity-90">
                                {t('hero.parts')}
                            </h3>
                            <button
                                onClick={handleScroll}
                                className="bg-transparent border border-white/50 text-white px-6 py-2 font-light tracking-[0.15em] text-xs uppercase hover:bg-white hover:text-black transition-all duration-500 group-hover:border-white group-hover:bg-white group-hover:text-black"
                            >
                                {t('hero.discover')}
                            </button>
                        </div>
                    </div>

                    {/* Indicateur survol pour lancer la vidéo */}
                    {currentVideo === 1 && !isHovered && (
                        <div className="absolute bottom-4 left-4 z-20">
                            <div className="bg-black/60 text-white px-3 py-1 rounded-full text-xs font-light tracking-wide">
                                🎬 {t('hero.hoverToPlay')}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Logo CAYENNEFIT centré en overlay - Plus petit et élégant */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                <div className="text-center bg-black/30 backdrop-blur-sm rounded-lg p-6">
                    <h1 className="text-white font-light text-2xl lg:text-5xl tracking-[0.3em] leading-tight mb-3 drop-shadow-2xl">
                        CAYENNEFIT
                    </h1>
                    <div className="w-20 h-px bg-white/80 mx-auto mb-3"></div>
                    <p className="text-white/90 font-light text-sm lg:text-base tracking-[0.2em] uppercase">
                        {t('hero.excellence')}
                    </p>
                </div>
            </div>

            {/* Instructions de survol - Plus discrètes */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
                <div className="text-center text-white/60">
                    <p className="text-xs font-light tracking-wider uppercase">
                        {t('hero.hoverToListen')}
                    </p>
                </div>
            </div>

            {/* Navigation scroll hint */}
            <div className="absolute bottom-6 right-6 z-20">
                <button
                    onClick={handleScroll}
                    className="text-white/50 hover:text-white transition-colors duration-300 p-2 rounded-full hover:bg-white/10"
                    title={t('hero.discover')}
                >
                    <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Hero;

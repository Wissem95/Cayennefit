"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

interface VideoSoundContextType {
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  toggleMute: () => void;
  video1Ref: React.RefObject<HTMLVideoElement>;
  video2Ref: React.RefObject<HTMLVideoElement>;
}

const VideoSoundContext = createContext<VideoSoundContextType | undefined>(undefined);

export const VideoSoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(true);
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  // Fonction pour basculer le son
  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    
    // Appliquer à toutes les vidéos
    if (video1Ref.current) video1Ref.current.muted = newMutedState;
    if (video2Ref.current) video2Ref.current.muted = newMutedState;
  };

  // Gestion du scroll pour couper le son automatiquement
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('home');
      if (!heroSection) return;

      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
      const scrollPosition = window.scrollY + window.innerHeight * 0.3; // 30% de la hauteur de l'écran

      // Si on a scrollé au-delà de la section hero et que le son est activé
      if (scrollPosition > heroBottom && !isMuted) {
        setIsMuted(true);
        
        // Couper le son des vidéos
        if (video1Ref.current) video1Ref.current.muted = true;
        if (video2Ref.current) video2Ref.current.muted = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMuted]);

  // Appliquer le nouvel état aux vidéos quand isMuted change
  useEffect(() => {
    if (video1Ref.current) video1Ref.current.muted = isMuted;
    if (video2Ref.current) video2Ref.current.muted = isMuted;
  }, [isMuted]);

  return (
    <VideoSoundContext.Provider value={{
      isMuted,
      setIsMuted,
      toggleMute,
      video1Ref,
      video2Ref
    }}>
      {children}
    </VideoSoundContext.Provider>
  );
};

export const useVideoSound = () => {
  const context = useContext(VideoSoundContext);
  if (context === undefined) {
    throw new Error('useVideoSound must be used within a VideoSoundProvider');
  }
  return context;
}; 
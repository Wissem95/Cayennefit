import "./globals.css";

import { Footer, NavBar, CookieConsent } from "@components";
import { LanguageProvider } from "../contexts/LanguageContext";
import { VideoSoundProvider } from "../contexts/VideoSoundContext";
import ConditionalLayout from "../components/ConditionalLayout";

export const metadata = {
    title: "CAYENNEFIT - Excellence Automobile",
    description: "Découvrez une sélection exclusive de véhicules d'exception, alliant performance, élégance et raffinement.",
    icons: {
        icon: `/favicon.ico?v=${Date.now()}`,
        shortcut: `/favicon.ico?v=${Date.now()}`,
        apple: `/favicon.ico?v=${Date.now()}`,
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='fr'>
        <head>
            <link rel="icon" href={`/favicon.ico?v=${Date.now()}`} sizes="32x32" />
            <link rel="shortcut icon" href={`/favicon.ico?v=${Date.now()}`} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body className='relative bg-white'>
            <LanguageProvider>
                <VideoSoundProvider>
                    <ConditionalLayout>
                        {children}
                    </ConditionalLayout>
                    <CookieConsent />
                </VideoSoundProvider>
            </LanguageProvider>
        </body>
        </html>
    );
}

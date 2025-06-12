import "./globals.css";

import { Footer, NavBar } from "@components";
import { LanguageProvider } from "../contexts/LanguageContext";
import ConditionalLayout from "../components/ConditionalLayout";

export const metadata = {
    title: "CAYENNEFIT - Excellence Automobile",
    description: "Découvrez une sélection exclusive de véhicules d'exception, alliant performance, élégance et raffinement.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='fr'>
        <body className='relative bg-white'>
            <LanguageProvider>
                <ConditionalLayout>
                    {children}
                </ConditionalLayout>
            </LanguageProvider>
        </body>
        </html>
    );
}

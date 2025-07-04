"use client";

import { usePathname } from 'next/navigation';
import { Footer, NavBar } from "@components";

/**
 * Composant de layout conditionnel - Gère l'affichage de la navbar et du footer selon la page
 * N'affiche ni la navbar ni le footer sur les pages d'administration
 */
export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdminPage = pathname?.startsWith('/admin');

    return (
        <>
            {/* N'afficher la navbar que si ce n'est pas une page admin */}
            {!isAdminPage && <NavBar />}
            {children}
            {/* N'afficher le footer que si ce n'est pas une page admin */}
            {!isAdminPage && <Footer />}
        </>
    );
} 
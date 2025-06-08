"use client";

import { useRouter } from "next/navigation";
import { useTranslation } from "../contexts/LanguageContext";

import { ShowMoreProps } from "@types";
import { updateSearchParams } from "@utils";

/**
 * Composant ShowMore CAYENNEFIT - Design luxueux carré noir
 * Ne s'affiche que s'il y a réellement plus de véhicules à charger
 */
interface ShowMoreLuxeProps extends ShowMoreProps {
    totalVehicles?: number;
    currentlyShown?: number;
}

const ShowMore = ({ pageNumber, isNext, totalVehicles = 0, currentlyShown = 0 }: ShowMoreLuxeProps) => {
    const { t } = useTranslation();
    const router = useRouter();

    const handleNavigation = () => {
        // Calculer la nouvelle limite basée sur le numéro de page
        const newLimit = (pageNumber + 1) * 10;
        
        // Mettre à jour le paramètre de recherche "limit" dans l'URL
        const newPathname = updateSearchParams("limit", `${newLimit}`);
        
        router.push(newPathname);
    };

    // Ne pas afficher le bouton s'il n'y a pas plus de véhicules à charger
    const hasMoreVehicles = currentlyShown < totalVehicles;
    const remainingVehicles = totalVehicles - currentlyShown;

    // Ne pas afficher si pas de véhicules supplémentaires ou si isNext est false
    if (!hasMoreVehicles || !isNext) {
        return null;
    }

    return (
        <div className="w-full flex justify-center mt-16">
            <button
                onClick={handleNavigation}
                className="bg-black hover:bg-gray-800 text-white px-12 py-4 font-light tracking-wider text-sm transition-all duration-300 border border-gray-700 hover:border-gray-600 shadow-lg hover:shadow-xl group"
            >
                <div className="flex items-center space-x-3">
                    <span>{t('common.loadMore')}</span>
                    <div className="flex items-center space-x-1 text-xs opacity-70">
                        <span>({remainingVehicles} {t('common.remaining')}{remainingVehicles > 1 ? 's' : ''})</span>
                    </div>
                    <svg 
                        className="w-4 h-4 transform group-hover:translate-y-0.5 transition-transform duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </button>
        </div>
    );
};

export default ShowMore;

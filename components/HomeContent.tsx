"use client";

import { useTranslation } from "../contexts/LanguageContext";
import { useScrollAnimation, useStaggeredAnimation } from '../hooks/useScrollAnimation';
import { FilterProps, VehicleProps } from "@types";
import { VehicleCard, ShowMore, SearchBar, CustomFilter } from "@components";
import { getFuels, getYearsOfProduction } from "../utils/translatedConstants";

interface HomeContentProps {
    allVehicles: VehicleProps[];
    searchParams: FilterProps;
    totalVehicles: number;
    displayedVehicles: VehicleProps[];
    hasMoreVehicles: boolean;
    limit: number;
}

/**
 * Composant client pour la page d'accueil avec traductions
 */
const HomeContent = ({ 
    allVehicles, 
    searchParams, 
    totalVehicles, 
    displayedVehicles, 
    hasMoreVehicles, 
    limit 
}: HomeContentProps) => {
    const { t } = useTranslation();
    
    // Animations pour les différentes sections
    const { elementRef: sectionRef, isVisible: sectionVisible } = useScrollAnimation(0.1);
    const { elementRef: titleRef, isVisible: titleVisible } = useStaggeredAnimation(200);
    const { elementRef: filtersRef, isVisible: filtersVisible } = useStaggeredAnimation(400);
    const { elementRef: gridRef, isVisible: gridVisible } = useStaggeredAnimation(600);
    
    const isDataEmpty = !Array.isArray(allVehicles) || allVehicles.length < 1 || !allVehicles;

    // Utiliser les constantes traduites
    const fuels = getFuels(t);
    const yearsOfProduction = getYearsOfProduction(t);

    return (
        <div 
            ref={sectionRef as React.RefObject<HTMLDivElement>}
            className={`mt-12 padding-x padding-y max-width section-fade-in ${sectionVisible ? 'visible' : ''}`} 
            id='discover'
        >
            {/* En-tête élégant avec traductions */}
            <div 
                ref={titleRef as React.RefObject<HTMLDivElement>}
                className={`home__text-container mb-16 slide-up ${titleVisible ? 'animate' : ''}`}
            >
                <h1 className='text-4xl lg:text-6xl font-light text-gray-900 tracking-[0.2em] leading-tight'>
                    {t('home.collection')}
                    <span className="block text-gray-600 text-2xl lg:text-3xl mt-2 tracking-[0.3em]">
                        {t('home.automobile')}
                    </span>
                </h1>
                <p className="text-gray-700 font-light text-lg mt-6 max-w-2xl leading-relaxed">
                    {t('home.description')}
                </p>
            </div>

            {/* Filtres sophistiqués */}
            <div 
                ref={filtersRef as React.RefObject<HTMLDivElement>}
                className={`home__filters mb-16 slide-up ${filtersVisible ? 'animate' : ''}`}
            >
                <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg">
                    <h3 className="text-gray-900 font-light text-xl tracking-wider mb-6">
                        {t('home.refineSearch')}
                    </h3>
                    <SearchBar />

                    <div className='home__filter-container mt-6'>
                        <CustomFilter title={t('search.fuel')} options={fuels} />
                        <CustomFilter title={t('search.year')} options={yearsOfProduction} />
                    </div>
                </div>
            </div>

            {!isDataEmpty ? (
                <section>
                    {/* Compteur de résultats avec pagination */}
                    <div className="mb-8 text-center">
                        <p className="text-gray-600 font-light tracking-wider">
                            {displayedVehicles.length} / {totalVehicles} {t('home.vehiclesFound')}
                        </p>
                        <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto mt-4"></div>
                    </div>

                    {/* Grille de véhicules */}
                    <div 
                        ref={gridRef as React.RefObject<HTMLDivElement>}
                        className={`grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16 slide-up ${gridVisible ? 'animate' : ''}`}
                    >
                        {displayedVehicles?.map((vehicle) => (
                            <div key={vehicle.id} className="group">
                                <VehicleCard vehicle={vehicle} />
                            </div>
                        ))}
                    </div>

                    {/* ShowMore avec logique intelligente */}
                    <ShowMore
                        pageNumber={Math.floor(limit / 10)}
                        isNext={hasMoreVehicles}
                        totalVehicles={totalVehicles}
                        currentlyShown={displayedVehicles.length}
                    />
                </section>
            ) : (
                <div className='home__error-container'>
                    <div className="text-center py-20">
                        <div className="text-8xl mb-8 opacity-30">🏎️</div>
                        <h2 className='text-gray-900 text-2xl font-light mb-4 tracking-wide'>
                            {t('home.noVehiclesFound')}
                        </h2>
                        <p className="text-gray-600 font-light mb-8 max-w-md mx-auto leading-relaxed">
                            {t('home.noVehiclesDescription')}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomeContent; 
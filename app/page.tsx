import { FilterProps, VehicleProps } from "@types";
import { fuels, yearsOfProduction } from "@constants";
import { VehicleCard, ShowMore, SearchBar, CustomFilter, Hero } from "@components";
import fs from 'fs';
import path from 'path';

interface HomeProps {
    searchParams: FilterProps;
}

// Véhicules d'exemple pour l'initialisation
const INITIAL_VEHICLES: VehicleProps[] = [
    {
        id: "vehicle-1",
        make: "BMW",
        model: "Série 3",
        year: 2022,
        price: 45000,
        city_mpg: 8.5,
        highway_mpg: 6.2,
        fuel_type: "Essence",
        transmission: "Automatique",
        drive: "RWD",
        color: "Noir",
        mileage: 15000,
        description: "BMW Série 3 en excellent état, parfaite pour les trajets urbains et autoroutiers.",
        images: ["/pattern.png"],
        isAvailable: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: "vehicle-2", 
        make: "Mercedes",
        model: "Classe C",
        year: 2021,
        price: 42000,
        city_mpg: 9.1,
        highway_mpg: 6.8,
        fuel_type: "Diesel",
        transmission: "Automatique", 
        drive: "RWD",
        color: "Blanc",
        mileage: 22000,
        description: "Mercedes Classe C diesel, économique et confortable pour tous vos déplacements.",
        images: ["/pattern.png"],
        isAvailable: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];

/**
 * Récupère les véhicules directement depuis le serveur
 * Retourne seulement les véhicules disponibles (non vendus)
 */
async function getVehicles(filters?: FilterProps): Promise<VehicleProps[]> {
    try {
        const DB_PATH = path.join(process.cwd(), 'data', 'vehicles.json');
        
        // Initialiser la base de données si nécessaire
        if (!fs.existsSync(path.dirname(DB_PATH))) {
            fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
        }
        
        if (!fs.existsSync(DB_PATH)) {
            fs.writeFileSync(DB_PATH, JSON.stringify(INITIAL_VEHICLES, null, 2));
        }
        
        const data = fs.readFileSync(DB_PATH, 'utf-8');
        let vehicles: VehicleProps[] = JSON.parse(data);

        // IMPORTANT: Ne montrer que les véhicules disponibles sur le site principal
        vehicles = vehicles.filter(vehicle => vehicle.isAvailable === true);

        if (filters) {
            const { manufacturer, year, fuel, minPrice, maxPrice, model } = filters;

            // Appliquer les filtres
            if (manufacturer) {
                vehicles = vehicles.filter(vehicle => 
                    vehicle.make.toLowerCase().includes(manufacturer.toLowerCase())
                );
            }

            if (model) {
                vehicles = vehicles.filter(vehicle =>
                    vehicle.model.toLowerCase().includes(model.toLowerCase())
                );
            }

            if (year) {
                vehicles = vehicles.filter(vehicle => vehicle.year === year);
            }

            if (fuel) {
                vehicles = vehicles.filter(vehicle =>
                    vehicle.fuel_type.toLowerCase().includes(fuel.toLowerCase())
                );
            }

            if (minPrice) {
                vehicles = vehicles.filter(vehicle => vehicle.price >= minPrice);
            }

            if (maxPrice) {
                vehicles = vehicles.filter(vehicle => vehicle.price <= maxPrice);
            }
        }

        return vehicles;
    } catch (error) {
        console.error('Erreur lors de la récupération des véhicules:', error);
        return INITIAL_VEHICLES.filter(vehicle => vehicle.isAvailable === true);
    }
}

/**
 * Page d'accueil CAYENNEFIT - Collection automobile d'exception
 * Style luxueux inspiré de Dior pour une expérience premium
 */
export default async function Home({ searchParams }: HomeProps) {
    // Récupération des véhicules depuis la base de données locale
    const allVehicles = await getVehicles({
        manufacturer: searchParams.manufacturer || "",
        year: searchParams.year || undefined,
        fuel: searchParams.fuel || "",
        model: searchParams.model || "",
        minPrice: searchParams.minPrice || undefined,
        maxPrice: searchParams.maxPrice || undefined,
    });

    // Logique de pagination
    const limit = Number(searchParams.limit) || 10;
    const totalVehicles = allVehicles.length;
    const displayedVehicles = allVehicles.slice(0, limit);
    const hasMoreVehicles = totalVehicles > limit;

    const isDataEmpty = !Array.isArray(allVehicles) || allVehicles.length < 1 || !allVehicles;

    return (
        <main className='overflow-hidden bg-white'>
            <Hero />

            <div className='mt-12 padding-x padding-y max-width' id='discover'>
                {/* En-tête élégant */}
                <div className='home__text-container mb-16'>
                    <h1 className='text-4xl lg:text-6xl font-light text-gray-900 tracking-[0.2em] leading-tight'>
                        COLLECTION
                        <span className="block text-gray-600 text-2xl lg:text-3xl mt-2 tracking-[0.3em]">
                            AUTOMOBILE
                        </span>
                    </h1>
                    <p className="text-gray-700 font-light text-lg mt-6 max-w-2xl leading-relaxed">
                        Découvrez une sélection exclusive de véhicules d'exception, 
                        alliant performance, élégance et raffinement.
                    </p>
                </div>

                {/* Filtres sophistiqués */}
                <div className='home__filters mb-16'>
                    <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg">
                        <h3 className="text-gray-900 font-light text-xl tracking-wider mb-6">
                            AFFINER VOTRE RECHERCHE
                        </h3>
                        <SearchBar />

                        <div className='home__filter-container mt-6'>
                            <CustomFilter title='fuel' options={fuels} />
                            <CustomFilter title='year' options={yearsOfProduction} />
                        </div>
                    </div>
                </div>

                {!isDataEmpty ? (
                    <section>
                        {/* Compteur de résultats avec pagination */}
                        <div className="mb-8 text-center">
                            <p className="text-gray-600 font-light tracking-wider">
                                {displayedVehicles.length} / {totalVehicles} VÉHICULE{totalVehicles > 1 ? 'S' : ''} D'EXCEPTION
                            </p>
                            <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto mt-4"></div>
                        </div>

                        {/* Grille de véhicules */}
                        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16'>
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
                                AUCUN VÉHICULE TROUVÉ
                            </h2>
                            <p className="text-gray-600 font-light mb-8 max-w-md mx-auto leading-relaxed">
                                Aucun véhicule ne correspond à vos critères de recherche.
                                Modifiez vos filtres ou explorez notre collection complète.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}

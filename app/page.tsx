import { FilterProps, VehicleProps, SearchParamsProps, HomeProps } from "@types";
import { fuels, yearsOfProduction } from "@constants";
import { VehicleCard, ShowMore, SearchBar, CustomFilter, Hero, AboutUs, Expertise, Services, HomeContent } from "@components";
import { getAllVehicles } from "@lib/database";

// Configuration pour éviter le cache et forcer le rechargement des données
export const revalidate = 0; // Revalider à chaque requête
export const dynamic = 'force-dynamic'; // Forcer le rendu dynamique

// Plus de véhicules codés en dur - utilisation uniquement de Prisma

/**
 * Récupère les véhicules directement depuis Prisma avec filtres
 * Retourne seulement les véhicules disponibles (non vendus)
 */
async function getVehicles(filters?: FilterProps): Promise<VehicleProps[]> {
    try {
        // Récupérer tous les véhicules depuis Prisma
        let vehicles = await getAllVehicles();
        
        console.log(`Page d'accueil: ${vehicles.length} véhicules récupérés depuis la base`)
        console.log(`Page d'accueil: Filtres reçus:`, filters)
        
        // DEBUG: Afficher les données des véhicules pour comprendre le problème
        if (vehicles.length > 0) {
            console.log('DEBUG: Premier véhicule:', {
                make: vehicles[0].make,
                model: vehicles[0].model,
                year: vehicles[0].year,
                fuel_type: vehicles[0].fuel_type,
                isAvailable: vehicles[0].isAvailable
            });
        }
        
        // Filtrer seulement les véhicules disponibles (CORRECTIF PRINCIPAL)
        vehicles = vehicles.filter(vehicle => vehicle.isAvailable === true);
        
        console.log(`Page d'accueil: ${vehicles.length} véhicules disponibles après filtrage`)

        // Appliquer les filtres si fournis
        if (filters) {
            const { manufacturer, year, fuel, minPrice, maxPrice, model } = filters;

            if (manufacturer && manufacturer.trim() !== "") {
                console.log(`DEBUG: Filtrage par marque '${manufacturer}'`);
                console.log(`DEBUG: Véhicules avant filtrage marque:`, vehicles.map(v => v.make));
                vehicles = vehicles.filter(vehicle => 
                    vehicle.make.toLowerCase().includes(manufacturer.toLowerCase())
                );
                console.log(`Page d'accueil: Filtre marque '${manufacturer}': ${vehicles.length} véhicules`)
                console.log(`DEBUG: Véhicules après filtrage marque:`, vehicles.map(v => v.make));
            }

            if (model && model.trim() !== "") {
                console.log(`DEBUG: Filtrage par modèle '${model}'`);
                console.log(`DEBUG: Véhicules avant filtrage modèle:`, vehicles.map(v => v.model));
                vehicles = vehicles.filter(vehicle =>
                    vehicle.model.toLowerCase().includes(model.toLowerCase())
                );
                console.log(`Page d'accueil: Filtre modèle '${model}': ${vehicles.length} véhicules`)
                console.log(`DEBUG: Véhicules après filtrage modèle:`, vehicles.map(v => v.model));
            }

            // Conversion explicite pour l'année
            if (year) {
                const yearNum = typeof year === 'string' ? parseInt(year) : year;
                if (!isNaN(yearNum)) {
                    vehicles = vehicles.filter(vehicle => vehicle.year === yearNum);
                    console.log(`Page d'accueil: Filtre année ${yearNum}: ${vehicles.length} véhicules`)
                }
            }

            // Amélioration du filtre carburant
            if (fuel && fuel.trim() !== "") {
                console.log(`DEBUG: Filtrage par carburant '${fuel}'`);
                console.log(`DEBUG: Véhicules avant filtrage carburant:`, vehicles.map(v => v.fuel_type));
                
                vehicles = vehicles.filter(vehicle => {
                    const vehicleFuel = vehicle.fuel_type;
                    
                    // Si le carburant du véhicule est null/undefined, on l'exclut
                    if (!vehicleFuel) {
                        return false;
                    }
                    
                    // Comparaison exacte (insensible à la casse)
                    return vehicleFuel.toLowerCase() === fuel.toLowerCase();
                });
                
                console.log(`Page d'accueil: Filtre carburant '${fuel}': ${vehicles.length} véhicules`)
                console.log(`DEBUG: Véhicules après filtrage carburant:`, vehicles.map(v => v.fuel_type));
            }

            if (minPrice) {
                const minPriceNum = typeof minPrice === 'string' ? parseInt(minPrice) : minPrice;
                if (!isNaN(minPriceNum)) {
                    vehicles = vehicles.filter(vehicle => vehicle.price >= minPriceNum);
                    console.log(`Page d'accueil: Filtre prix min ${minPriceNum}: ${vehicles.length} véhicules`)
                }
            }

            if (maxPrice) {
                const maxPriceNum = typeof maxPrice === 'string' ? parseInt(maxPrice) : maxPrice;
                if (!isNaN(maxPriceNum)) {
                    vehicles = vehicles.filter(vehicle => vehicle.price <= maxPriceNum);
                    console.log(`Page d'accueil: Filtre prix max ${maxPriceNum}: ${vehicles.length} véhicules`)
                }
            }
        }

        console.log(`Page d'accueil: ${vehicles.length} véhicules après filtrage complet`)
        return vehicles;
    } catch (error) {
        console.error('Erreur lors de la récupération des véhicules:', error);
        return []; // Retourner un tableau vide au lieu de données codées en dur
    }
}

/**
 * Page d'accueil CAYENNEFIT - Collection automobile d'exception
 * Style luxueux inspiré de Dior pour une expérience premium
 */
export default async function Home({ searchParams }: HomeProps) {
    console.log('Page d\'accueil: searchParams reçus:', searchParams)
    
    // Conversion des searchParams (chaînes) vers FilterProps (types appropriés)
    const filters: FilterProps = {
        manufacturer: searchParams.manufacturer || "",
        year: searchParams.year ? parseInt(searchParams.year) : undefined,
        fuel: searchParams.fuel || "",
        model: searchParams.model || "",
        minPrice: searchParams.minPrice ? parseInt(searchParams.minPrice) : undefined,
        maxPrice: searchParams.maxPrice ? parseInt(searchParams.maxPrice) : undefined,
    };
    
    // Récupération des véhicules depuis la base de données locale
    const allVehicles = await getVehicles(filters);

    // Logique de pagination
    const limit = Number(searchParams.limit) || 10;
    const totalVehicles = allVehicles.length;
    const displayedVehicles = allVehicles.slice(0, limit);
    const hasMoreVehicles = totalVehicles > limit;

    return (
        <main className='overflow-hidden bg-white'>
            <Hero />
            
            {/* Sections de contenu premium */}
            <AboutUs />
            <Expertise />
            <Services />

            <HomeContent 
                allVehicles={allVehicles}
                searchParams={filters}
                totalVehicles={totalVehicles}
                displayedVehicles={displayedVehicles}
                hasMoreVehicles={hasMoreVehicles}
                limit={limit}
            />
        </main>
    );
}

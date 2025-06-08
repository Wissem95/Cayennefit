import { FilterProps, VehicleProps } from "@types";
import { fuels, yearsOfProduction } from "@constants";
import { VehicleCard, ShowMore, SearchBar, CustomFilter, Hero, AboutUs, Expertise, Services, HomeContent } from "@components";
import { getAllVehicles } from "@lib/database";

interface HomeProps {
    searchParams: FilterProps;
}

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
        
        // Filtrer seulement les véhicules disponibles (CORRECTIF PRINCIPAL)
        vehicles = vehicles.filter(vehicle => vehicle.isAvailable === true);
        
        console.log(`Page d'accueil: ${vehicles.length} véhicules disponibles après filtrage`)

        // Appliquer les filtres si fournis
        if (filters) {
            const { manufacturer, year, fuel, minPrice, maxPrice, model } = filters;

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

    return (
        <main className='overflow-hidden bg-white'>
            <Hero />
            
            {/* Sections de contenu premium */}
            <AboutUs />
            <Expertise />
            <Services />

            <HomeContent 
                allVehicles={allVehicles}
                searchParams={searchParams}
                totalVehicles={totalVehicles}
                displayedVehicles={displayedVehicles}
                hasMoreVehicles={hasMoreVehicles}
                limit={limit}
            />
        </main>
    );
}

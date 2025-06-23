import {MouseEventHandler} from "react";

// Types pour le nouveau système de vente de véhicules
export interface VehicleProps {
    id: string;
    make: string;
    model: string;
    year: number;
    price: number; // Prix de vente au lieu de location
    city_mpg: number;
    highway_mpg: number;
    fuel_type: string;
    transmission: string;
    drive: string;
    color: string;
    mileage: number; // Kilométrage
    description: string;
    images: string[]; // Tableau d'URLs d'images
    isAvailable: boolean;
    soldAt?: string; // Date de vente (optionnel)
    createdAt: string;
    updatedAt: string;
}

// Types pour l'administration
export interface AdminVehicleFormProps {
    make: string;
    model: string;
    year: number;
    price: number;
    city_mpg: number;
    highway_mpg: number;
    fuel_type: string;
    transmission: string;
    drive: string;
    color: string;
    mileage: number;
    description: string;
    images: FileList | null;
    isAvailable: boolean;
}

// Legacy types (à garder pour la migration progressive)
export interface CarProps {
    city_mpg: number;
    class: string;
    combination_mpg: number;
    cylinders: number;
    displacement: number;
    drive: string;
    fuel_type: string;
    highway_mpg: number;
    make: string;
    model: string;
    transmission: string;
    year: number;
}

export interface FilterProps {
    manufacturer?: string;
    year?: number;
    model?: string;
    limit?: number;
    fuel?: string;
    maxPrice?: number; // Nouveau filtre par prix maximum
    minPrice?: number; // Nouveau filtre par prix minimum
}

// Type spécifique pour les searchParams de Next.js (toujours des chaînes)
export interface SearchParamsProps {
    manufacturer?: string;
    year?: string;
    model?: string;
    limit?: string;
    fuel?: string;
    maxPrice?: string;
    minPrice?: string;
}

export interface HomeProps {
    searchParams: SearchParamsProps;
}

export interface CarCardProps {
    model: string;
    make: string;
    mpg: number;
    transmission: string;
    year: number;
    drive: string;
    cityMPG: number;
}

export interface CustomButtonProps {
    isDisabled?: boolean;
    btnType?: "button" | "submit";
    containerStyles?: string;
    textStyles?: string;
    title: string;
    rightIcon?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface OptionProps {
    title: string;
    value: string;
}

export interface CustomFilterProps {
    title: string;
    options: OptionProps[];
}

export interface ShowMoreProps {
    pageNumber: number;
    isNext: boolean;
}

export interface SearchManuFacturerProps {
    manufacturer: string;
    setManuFacturer: (manufacturer: string) => void;
}

// Nouveaux types pour l'admin panel
export interface AdminLayoutProps {
    children: React.ReactNode;
}

export interface VehicleCardProps {
    vehicle: VehicleProps;
    isAdmin?: boolean;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
    onMarkAsSold?: (id: string) => void;
}

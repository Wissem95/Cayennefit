import { CarProps, FilterProps } from "@types";
import { parseStringPromise } from 'xml2js';

export const calculateCarRent = (city_mpg: number | string, year: number) => {
    const basePricePerDay = 50; // Prix de base par jour en euros
    const mileageFactor = 0.1; // Facteur supplémentaire par mile
    const ageFactor = 0.05; // Facteur supplémentaire par année d'âge

    // Convertir city_mpg en nombre si c'est une chaîne
    const mpg = typeof city_mpg === 'string' ? parseFloat(city_mpg) || 15 : city_mpg;

    // Calculer le taux supplémentaire basé sur le kilométrage et l'âge
    const mileageRate = mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;

    // Calculer le taux total de location par jour
    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

    return rentalRatePerDay.toFixed(0);
};

export const updateSearchParams = (type: string, value: string) => {
    // Get the current URL search params
    const searchParams = new URLSearchParams(window.location.search);

    // Set the specified search parameter to the given value
    searchParams.set(type, value);

    // Set the specified search parameter to the given value
    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

    return newPathname;
};

export const deleteSearchParams = (type: string) => {
    // Set the specified search parameter to the given value
    const newSearchParams = new URLSearchParams(window.location.search);

    // Delete the specified search parameter
    newSearchParams.delete(type.toLocaleLowerCase());

    // Construct the updated URL pathname with the deleted search parameter
    const newPathname = `${window.location.pathname}?${newSearchParams.toString()}`;

    return newPathname;
};

export async function fetchCars(filters: FilterProps) {
    const { manufacturer, year, model, fuel } = filters;

    // Set the required headers for the API request
    const headers: HeadersInit = {
        "X-RapidAPI-Key": "a580ab9f76msh7fd003314b806f3p12b871jsn16d23210425c",
        "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
    };

    // Set the required headers for the API request
    const response = await fetch(
        `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&fuel_type=${fuel}`,
        {
            headers: headers,
        }
    );

    // Parse the response as JSON
    const result = await response.json();

    return result;
}

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
    const url = new URL("https://cdn.imagin.studio/getimage");
    const { make, model, year } = car;

    url.searchParams.append('customer', process.env.NEXT_PUBLIC_IMAGIN_API_KEY || 'hrjavascript-mastery');
    url.searchParams.append('make', make);
    url.searchParams.append('modelFamily', model.split(" ")[0]);
    url.searchParams.append('zoomType', 'fullscreen');
    url.searchParams.append('modelYear', `${year}`);
    url.searchParams.append('angle', `${angle || '01'}`);

    return `${url}`;
}

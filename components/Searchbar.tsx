"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "../contexts/LanguageContext";

import SearchManufacturer from "./SearchManufacturer";

const SearchBar = () => {
    const { t } = useTranslation();
    const [manufacturer, setManuFacturer] = useState("");
    const [model, setModel] = useState("");

    const router = useRouter();

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (manufacturer.trim() === "" && model.trim() === "") {
            return alert(t('search.pleaseProvideInput'));
        }

        updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase());
    };

    const updateSearchParams = (model: string, manufacturer: string) => {
        // Create a new URLSearchParams object using the current URL search parameters
        const searchParams = new URLSearchParams(window.location.search);

        // Update or delete the 'model' search parameter based on the 'model' value
        if (model) {
            searchParams.set("model", model);
        } else {
            searchParams.delete("model");
        }

        // Update or delete the 'manufacturer' search parameter based on the 'manufacturer' value
        if (manufacturer) {
            searchParams.set("manufacturer", manufacturer);
        } else {
            searchParams.delete("manufacturer");
        }

        // Generate the new pathname with the updated search parameters
        const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

        router.push(newPathname);
    };

    return (
        <form className='searchbar bg-transparent' onSubmit={handleSearch}>
            <div className='searchbar__item'>
                <SearchManufacturer
                    manufacturer={manufacturer}
                    setManuFacturer={setManuFacturer}
                />
            </div>
            <div className='searchbar__item'>
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                    <Image
                        src='/model-icon.png'
                        width={20}
                        height={20}
                        className='opacity-60'
                        alt='car model'
                    />
                </div>
                <input
                    type='text'
                    name='model'
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder='Cayenne'
                    className='searchbar__input'
                />
                <button type='submit' className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10 p-2 hover:bg-gray-100 rounded-full transition-all duration-300">
                    <Image
                        src={"/magnifying-glass.svg"}
                        alt={t('search.search')}
                        width={18}
                        height={18}
                        className='opacity-60 hover:opacity-100 transition-all duration-300'
                    />
                </button>
            </div>
        </form>
    );
};

export default SearchBar;

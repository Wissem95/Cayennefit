"use client";

import Image from "next/image";
import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { useTranslation } from "../contexts/LanguageContext";

import { manufacturers } from "@constants";
import { SearchManuFacturerProps } from "@types";

const SearchManufacturer = ({ manufacturer, setManuFacturer }: SearchManuFacturerProps) => {
    const { t } = useTranslation();
    const [query, setQuery] = useState("");

    const filteredManufacturers =
        query === ""
            ? manufacturers
            : manufacturers.filter((item) =>
                item
                    .toLowerCase()
                    .replace(/\s+/g, "")
                    .includes(query.toLowerCase().replace(/\s+/g, ""))
            );

    return (
        <div className='search-manufacturer'>
            <Combobox value={manufacturer} onChange={setManuFacturer}>
                <div className='relative w-full'>
                    {/* Search Manufacturer */}
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30">
                        <Image
                            src='/car-logo.svg'
                            width={20}
                            height={20}
                            className='opacity-60'
                            alt='car logo'
                        />
                    </div>
                    <Combobox.Input
                        className='search-manufacturer__input'
                        displayValue={(item: string) => item}
                        onChange={(event) => setQuery(event.target.value)} // Update the search query when the input changes
                        placeholder='Porsche'
                    />
                    
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none">
                        <svg className="w-4 h-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>

                    {/* Transition for displaying the options */}
                    <Transition
                        as={Fragment} // group multiple elements without introducing an additional DOM node i.e., <></>
                        leave='transition ease-in duration-100'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                        afterLeave={() => setQuery("")} // Reset the search query after the transition completes
                    >
                        <Combobox.Options
                            className='search-manufacturer__options'
                            static
                        >
                            {manufacturers.length === 0 && query !== "" ? (
                                <Combobox.Option
                                    value={query}
                                    className='search-manufacturer__option text-gray-500'
                                >
                                    {t('search.create')} "{query}"
                                </Combobox.Option>
                            ) : (
                                manufacturers.map((item) => (
                                    <Combobox.Option
                                        key={item}
                                        className={({ active }) =>
                                            `search-manufacturer__option ${
                                                active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                                            }`
                                        }
                                        value={item}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span className={`block truncate ${selected ? "font-medium" : "font-light"}`}>
                                                    {item}
                                                </span>

                                                {/* Show an active blue background color if the option is selected */}
                                                {selected && (
                                                    <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                        active ? "text-gray-900" : "text-gray-700"
                                                    }`}>
                                                        <svg className='h-5 w-5' fill="currentColor" viewBox="0 0 20 20" aria-hidden='true'>
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    );
};

export default SearchManufacturer;

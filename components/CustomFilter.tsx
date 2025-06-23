"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Listbox, Transition } from "@headlessui/react";

import { CustomFilterProps } from "@types";
import { updateSearchParams } from "@utils";

export default function CustomFilter({ title, options }: CustomFilterProps) {
    const router = useRouter();
    const [selected, setSelected] = useState(options[0]); // State for storing the selected option
    const [pendingSelection, setPendingSelection] = useState(options[0]); // État pour la sélection en attente
    const [showValidateButton, setShowValidateButton] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // État de chargement

    // Gérer la sélection temporaire
    const handleTempSelection = (option: { title: string; value: string }) => {
        setPendingSelection(option);
        setShowValidateButton(option.value !== ""); // Afficher le bouton valider si une option réelle est sélectionnée
    };

    // Valider la sélection et mettre à jour l'URL SANS scroll
    const handleValidateSelection = async () => {
        setIsLoading(true);
        setSelected(pendingSelection);
        
        try {
            const newPathName = updateSearchParams(title, pendingSelection.value.toLowerCase());
            
            // Utiliser router.push avec scroll: false pour éviter le scroll vers le haut
            await router.push(newPathName, { scroll: false });
            
        } catch (error) {
            console.error('Erreur lors de l\'application du filtre:', error);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
                setShowValidateButton(false);
            }, 500); // Petit délai pour montrer le loader
        }
    };

    // Annuler la sélection
    const handleCancelSelection = () => {
        setPendingSelection(selected);
        setShowValidateButton(false);
    };

    return (
        <div className='w-fit relative'>
            <Listbox
                value={pendingSelection}
                onChange={handleTempSelection}
                disabled={isLoading}
            >
                <div className='relative w-fit z-[9999]'>
                    {/* Button for the listbox avec loader */}
                    <Listbox.Button className={`custom-filter__btn ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}>
                        <span className='block truncate flex items-center gap-2'>
                            {isLoading && (
                                <svg className="animate-spin h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            )}
                            {pendingSelection.title}
                        </span>
                        <Image src='/chevron-up-down.svg' width={20} height={20} className='ml-4 object-contain opacity-60' alt='chevron_up-down' />
                    </Listbox.Button>
                    {/* Transition for displaying the options */}
                    <Transition
                        as={Fragment} // group multiple elements without introducing an additional DOM node i.e., <></>
                        leave='transition ease-in duration-100'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <Listbox.Options className="custom-filter__options">
                            {options.map((option) => (
                                <Listbox.Option
                                    key={option.title}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-3 px-4 transition-all duration-200 font-light tracking-wide ${
                                            active ? "bg-gray-100 text-gray-900" : "text-gray-700 hover:bg-gray-50"
                                        }`
                                    }
                                    value={option}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span className={`block truncate ${selected ? "font-medium" : "font-light"}`}>
                                                {option.title}
                                            </span>
                                            {selected && (
                                                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-900">
                                                    <svg className='h-5 w-5' fill="currentColor" viewBox="0 0 20 20" aria-hidden='true'>
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </span>
                                            )}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>

            {/* Boutons de validation avec indicateur de chargement */}
            {showValidateButton && (
                <div className="absolute top-full left-0 mt-2 z-[10000] bg-white rounded-lg border border-gray-200 shadow-xl p-3 flex gap-2 min-w-[200px]">
                    <button
                        onClick={handleValidateSelection}
                        disabled={isLoading}
                        className={`flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                            isLoading ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Filtrage...
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                Valider
                            </>
                        )}
                    </button>
                    <button
                        onClick={handleCancelSelection}
                        disabled={isLoading}
                        className={`flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                            isLoading ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                        Annuler
                    </button>
                </div>
            )}

            {/* Overlay de chargement global */}
            {isLoading && (
                <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[50000] flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 shadow-xl flex items-center gap-3">
                        <svg className="animate-spin h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="text-gray-700 font-medium">Application du filtre...</span>
                    </div>
                </div>
            )}
        </div>
    );
}

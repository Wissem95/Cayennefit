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

    // update the URL search parameters and navigate to the new URL
    const handleUpdateParams = (e: { title: string; value: string }) => {
        const newPathName = updateSearchParams(title, e.value.toLowerCase());

        router.push(newPathName);
    };

    return (
        <div className='w-fit'>
            <Listbox
                value={selected}
                onChange={(e) => {
                    setSelected(e); // Update the selected option in state
                    handleUpdateParams(e); // Update the URL search parameters and navigate to the new URL
                }}
            >
                <div className='relative w-fit z-10'>
                    {/* Button for the listbox */}
                    <Listbox.Button className='custom-filter__btn'>
                        <span className='block truncate'>{selected.title}</span>
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
        </div>
    );
}

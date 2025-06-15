'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { PhoneIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { parsePhoneNumber, AsYouType, isValidPhoneNumber, validatePhoneNumberLength, getCountryCallingCode } from 'libphonenumber-js';
import { CountryCode } from 'libphonenumber-js/types';

// Interface pour les props du composant
interface PhoneInputProps {
  /** Valeur du numéro de téléphone */
  value?: string;
  /** Fonction appelée lors du changement de valeur */
  onChange: (value: string | undefined) => void;
  /** Message d'erreur à afficher */
  error?: string;
  /** Placeholder pour l'input */
  placeholder?: string;
  /** Classe CSS supplémentaire */
  className?: string;
  /** Indique si le champ est requis */
  required?: boolean;
  /** Indique si le champ est désactivé */
  disabled?: boolean;
}

// Liste des pays supportés avec leurs codes et drapeaux
const COUNTRIES = [
  { code: 'FR' as CountryCode, name: 'France', flag: '🇫🇷', callingCode: '+33' },
  { code: 'BE' as CountryCode, name: 'Belgique', flag: '🇧🇪', callingCode: '+32' },
  { code: 'CH' as CountryCode, name: 'Suisse', flag: '🇨🇭', callingCode: '+41' },
  { code: 'DE' as CountryCode, name: 'Allemagne', flag: '🇩🇪', callingCode: '+49' },
  { code: 'IT' as CountryCode, name: 'Italie', flag: '🇮🇹', callingCode: '+39' },
  { code: 'ES' as CountryCode, name: 'Espagne', flag: '🇪🇸', callingCode: '+34' },
  { code: 'PT' as CountryCode, name: 'Portugal', flag: '🇵🇹', callingCode: '+351' },
  { code: 'NL' as CountryCode, name: 'Pays-Bas', flag: '🇳🇱', callingCode: '+31' },
  { code: 'GB' as CountryCode, name: 'Royaume-Uni', flag: '🇬🇧', callingCode: '+44' },
  { code: 'US' as CountryCode, name: 'États-Unis', flag: '🇺🇸', callingCode: '+1' },
  { code: 'CA' as CountryCode, name: 'Canada', flag: '🇨🇦', callingCode: '+1' },
  { code: 'MA' as CountryCode, name: 'Maroc', flag: '🇲🇦', callingCode: '+212' },
  { code: 'TN' as CountryCode, name: 'Tunisie', flag: '🇹🇳', callingCode: '+216' },
  { code: 'DZ' as CountryCode, name: 'Algérie', flag: '🇩🇿', callingCode: '+213' },
];

/**
 * Composant d'input téléphone international avec validation stricte
 * Utilise libphonenumber-js pour la validation native des limites par pays
 */
const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  error,
  placeholder = "Numéro de téléphone",
  className = "",
  required = false,
  disabled = false,
}) => {
  
  // États locaux
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>('FR');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [formatter, setFormatter] = useState<AsYouType>(new AsYouType('FR'));
  const [renderKey, setRenderKey] = useState<number>(0);
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number; width: number }>({ top: 0, left: 0, width: 0 });
  
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Synchroniser avec la valeur externe
  useEffect(() => {
    if (value) {
      try {
        const phoneNumber = parsePhoneNumber(value);
        if (phoneNumber) {
          setSelectedCountry(phoneNumber.country || 'FR');
          const formatter = new AsYouType(phoneNumber.country || 'FR');
          const formatted = formatter.input(phoneNumber.nationalNumber);
          setPhoneNumber(formatted);
          setFormatter(formatter);
        }
      } catch (error) {
        // En cas d'erreur de parsing, on garde la valeur telle quelle
      }
    }
  }, [value]);

  // Calculer la position du dropdown
  const updateDropdownPosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: 320
      });
    }
  };

  // Fermer le dropdown quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Mettre à jour la position quand le dropdown s'ouvre
  useEffect(() => {
    if (isDropdownOpen) {
      updateDropdownPosition();
    }
  }, [isDropdownOpen]);

  // Fonction pour valider et formater le numéro
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Extraire seulement les chiffres
    const digitsOnly = inputValue.replace(/\D/g, '');
    
    // Créer le numéro complet avec le code pays
    const fullNumber = `+${getCountryCallingCode(selectedCountry)}${digitsOnly}`;
    
    try {
      // Valider la longueur avec libphonenumber-js
      const lengthValidation = validatePhoneNumberLength(fullNumber, selectedCountry);
      
      // Si c'est trop long, on bloque la saisie
      if (lengthValidation === 'TOO_LONG') {
        return; // Bloquer la saisie
      }
      
      // Formater le numéro national
      const newFormatter = new AsYouType(selectedCountry);
      const formattedNational = newFormatter.input(digitsOnly);
      
      // Mettre à jour l'état local
      setPhoneNumber(formattedNational);
      setFormatter(newFormatter);
      
      // Appeler onChange avec le numéro complet international
      if (digitsOnly.length > 0) {
        onChange(fullNumber);
      } else {
        onChange(undefined);
      }
      
    } catch (error) {
      // En cas d'erreur, on permet quand même la saisie
      setPhoneNumber(inputValue);
    }
  };

  // Fonction pour changer de pays
  const handleCountryChange = (country: CountryCode) => {
    setSelectedCountry(country);
    setFormatter(new AsYouType(country));
    setIsDropdownOpen(false);
    
    // Reformater le numéro existant avec le nouveau pays
    if (phoneNumber) {
      const digitsOnly = phoneNumber.replace(/\D/g, '');
      const newFormatter = new AsYouType(country);
      const formattedNational = newFormatter.input(digitsOnly);
      setPhoneNumber(formattedNational);
      
      // Mettre à jour la valeur avec le nouveau code pays
      const fullNumber = `+${getCountryCallingCode(country)}${digitsOnly}`;
      onChange(fullNumber);
    }
    
    // Focus sur l'input après sélection
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const selectedCountryData = COUNTRIES.find(c => c.code === selectedCountry) || COUNTRIES[0];

  return (
    <div className="w-full">
      {/* Label avec icône */}
      <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
        <PhoneIcon className="w-4 h-4 mr-2" />
        Téléphone {required && '*'}
      </label>

      {/* Container pour l'input personnalisé */}
      <div className={`relative ${className}`}>
        <div className={`flex border rounded-lg overflow-hidden transition-colors ${
          error ? 'border-red-300 focus-within:ring-red-500' : 'border-gray-300 focus-within:ring-blue-500'
        } focus-within:ring-2`}>
          
          {/* Sélecteur de pays */}
          <div className="relative z-10" ref={dropdownRef}>
            <button
              ref={buttonRef}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                if (!disabled) {
                  setIsDropdownOpen(!isDropdownOpen);
                }
              }}
              disabled={disabled}
              className={`flex items-center px-4 py-3 bg-gray-50 border-r border-gray-300 hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-inset ${
                disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
              } ${isDropdownOpen ? 'bg-gray-100 shadow-inner' : ''}`}
            >
                              <span className="text-xl mr-3">{selectedCountryData.flag}</span>
                <span className="text-sm font-medium text-gray-800 mr-2 tracking-wide">
                  {selectedCountryData.callingCode}
                </span>
                <ChevronDownIcon className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`} />
            </button>

            
          </div>

          {/* Input du numéro */}
          <input
            ref={inputRef}
            type="tel"
            value={phoneNumber}
            onChange={handleInputChange}
            placeholder={placeholder}
            disabled={disabled}
            className={`flex-1 px-4 py-3 border-none outline-none bg-white ${
              disabled ? 'bg-gray-50 cursor-not-allowed' : ''
            }`}
          />
        </div>
      </div>

      {/* Message d'erreur */}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}

      {/* Dropdown en portal */}
      {isDropdownOpen && typeof window !== 'undefined' && createPortal(
        <div 
          ref={dropdownRef}
          style={{
            position: 'fixed',
            top: dropdownPosition.top,
            left: dropdownPosition.left,
            width: dropdownPosition.width,
            zIndex: 999999,
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            maxHeight: '280px',
            overflowY: 'auto'
          }}
        >
          
          {COUNTRIES.map((country) => (
            <button
              key={country.code}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleCountryChange(country.code);
              }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                padding: '14px 18px',
                textAlign: 'left',
                backgroundColor: selectedCountry === country.code ? '#f8fafc' : 'white',
                color: selectedCountry === country.code ? '#111827' : '#374151',
                borderBottom: '1px solid #f1f5f9',
                cursor: 'pointer',
                border: 'none',
                transition: 'all 0.15s ease-in-out',
                fontFamily: 'inherit'
              }}
              onMouseEnter={(e) => {
                if (selectedCountry !== country.code) {
                  e.currentTarget.style.backgroundColor = '#f8fafc';
                  e.currentTarget.style.color = '#111827';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCountry !== country.code) {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = '#374151';
                }
              }}
            >
              <span style={{ fontSize: '22px', marginRight: '14px' }}>{country.flag}</span>
              <div style={{ flex: 1 }}>
                <div style={{ 
                  fontWeight: selectedCountry === country.code ? '600' : '500', 
                  fontSize: '14px',
                  letterSpacing: '0.025em'
                }}>
                  {country.name}
                </div>
                <div style={{ 
                  fontSize: '12px', 
                  color: '#64748b',
                  fontWeight: '400',
                  marginTop: '2px'
                }}>
                  {country.callingCode}
                </div>
              </div>
              {selectedCountry === country.code && (
                <div style={{ 
                  width: '6px', 
                  height: '6px', 
                  backgroundColor: '#111827', 
                  borderRadius: '50%', 
                  marginLeft: '12px' 
                }}></div>
              )}
            </button>
          ))}
        </div>,
        document.body
      )}

    </div>
  );
};

export default PhoneInput; 
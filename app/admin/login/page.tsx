"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authenticateAdmin } from "@lib/auth";
import Image from "next/image";

/**
 * Page de connexion administrateur CAYENNEFIT
 * Design luxueux cohérent avec l'identité de marque
 */
const AdminLoginPage = () => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    /**
     * Gestion de la soumission du formulaire de connexion
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            // Validation basique
            if (!credentials.username || !credentials.password) {
                throw new Error("Veuillez saisir vos identifiants");
            }

            // Tentative d'authentification
            const isValid = authenticateAdmin(credentials.username, credentials.password);
            
            if (isValid) {
                // Connexion réussie, redirection vers l'admin
                router.push("/admin");
            } else {
                throw new Error("Identifiants incorrects");
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : "Erreur de connexion");
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Gestion des changements dans les champs
     */
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Effacer l'erreur lors de la saisie
        if (error) setError(null);
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            {/* Arrière-plan décoratif */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full opacity-5">
                    <Image
                        src="/pattern.png"
                        alt="Pattern"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>

            {/* Container principal */}
            <div className="relative w-full max-w-md">
                {/* Logo et titre */}
                <div className="text-center mb-8">
                    <div className="mx-auto w-20 h-20 bg-black rounded-full flex items-center justify-center mb-6">
                        <span className="text-white font-bold text-2xl">C</span>
                    </div>
                    <h1 className="text-3xl font-light text-gray-900 tracking-wide mb-2">
                        CAYENNE<span className="font-bold">FIT</span>
                    </h1>
                    <p className="text-gray-600 text-sm font-light tracking-wide">
                        ESPACE ADMINISTRATEUR
                    </p>
                </div>

                {/* Formulaire de connexion */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
                    <div className="mb-6">
                        <h2 className="text-xl font-light text-gray-900 tracking-wide text-center">
                            🔐 CONNEXION SÉCURISÉE
                        </h2>
                    </div>

                    {/* Messages d'erreur */}
                    {error && (
                        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.732 15.5c-.77.833.192 2.5 1.732 2.5z"></path>
                                </svg>
                                <p className="text-red-700 text-sm font-light">{error}</p>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Champ nom d'utilisateur */}
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                                👤 Nom d'utilisateur
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={credentials.username}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                                placeholder="Saisissez votre nom d'utilisateur"
                                disabled={isLoading}
                                autoComplete="username"
                            />
                        </div>

                        {/* Champ mot de passe */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                🔑 Mot de passe
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                                placeholder="Saisissez votre mot de passe"
                                disabled={isLoading}
                                autoComplete="current-password"
                            />
                        </div>

                        {/* Bouton de connexion */}
                        <button
                            type="submit"
                            disabled={isLoading || !credentials.username || !credentials.password}
                            className="w-full bg-black hover:bg-gray-800 text-white font-light tracking-wide py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                                    </svg>
                                    CONNEXION EN COURS...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                                    </svg>
                                    SE CONNECTER
                                </>
                            )}
                        </button>
                    </form>

                    
                </div>

                {/* Retour au site */}
                <div className="text-center mt-6">
                    <button
                        onClick={() => router.push("/")}
                        className="text-gray-600 hover:text-gray-900 text-sm font-light tracking-wide transition-colors duration-300 flex items-center justify-center gap-2 mx-auto"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                        </svg>
                        RETOUR AU SITE
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminLoginPage; 
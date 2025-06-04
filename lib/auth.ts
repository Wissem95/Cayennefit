/**
 * Système d'authentification CAYENNEFIT
 * Gestion simple des sessions administrateur
 */

interface AdminCredentials {
    username: string;
    password: string;
}

interface AdminSession {
    isAuthenticated: boolean;
    username: string;
    loginTime: number;
}

// Identifiants par défaut (en production, utiliser des variables d'environnement)
const ADMIN_CREDENTIALS: AdminCredentials = {
    username: "admin",
    password: "cayenne2024"
};

// Session stockée localement
const SESSION_KEY = "cayenne_admin_session";
const SESSION_DURATION = 2 * 60 * 60 * 1000; // 2 heures

/**
 * Authentifier un utilisateur admin
 */
export const authenticateAdmin = (username: string, password: string): boolean => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        const session: AdminSession = {
            isAuthenticated: true,
            username,
            loginTime: Date.now()
        };
        
        // Stocker la session en localStorage
        if (typeof window !== 'undefined') {
            localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        }
        
        return true;
    }
    
    return false;
};

/**
 * Vérifier si l'utilisateur est authentifié
 */
export const isAuthenticated = (): boolean => {
    if (typeof window === 'undefined') return false;
    
    try {
        const sessionData = localStorage.getItem(SESSION_KEY);
        if (!sessionData) return false;
        
        const session: AdminSession = JSON.parse(sessionData);
        
        // Vérifier si la session a expiré
        const now = Date.now();
        const sessionAge = now - session.loginTime;
        
        if (sessionAge > SESSION_DURATION) {
            // Session expirée, la supprimer
            localStorage.removeItem(SESSION_KEY);
            return false;
        }
        
        return session.isAuthenticated;
    } catch (error) {
        // Erreur de parsing, supprimer la session corrompue
        localStorage.removeItem(SESSION_KEY);
        return false;
    }
};

/**
 * Obtenir les informations de session
 */
export const getSession = (): AdminSession | null => {
    if (typeof window === 'undefined') return null;
    
    try {
        const sessionData = localStorage.getItem(SESSION_KEY);
        if (!sessionData) return null;
        
        const session: AdminSession = JSON.parse(sessionData);
        
        // Vérifier si la session est encore valide
        if (!isAuthenticated()) return null;
        
        return session;
    } catch (error) {
        return null;
    }
};

/**
 * Déconnecter l'utilisateur
 */
export const logout = (): void => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(SESSION_KEY);
    }
};

/**
 * Prolonger la session (à appeler lors d'activité)
 */
export const extendSession = (): void => {
    if (typeof window === 'undefined') return;
    
    try {
        const sessionData = localStorage.getItem(SESSION_KEY);
        if (!sessionData) return;
        
        const session: AdminSession = JSON.parse(sessionData);
        session.loginTime = Date.now(); // Renouveler le timestamp
        
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } catch (error) {
        // En cas d'erreur, déconnecter
        logout();
    }
}; 
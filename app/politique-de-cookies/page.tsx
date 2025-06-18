import React from 'react';
import { Metadata } from 'next';
import { CookiePreferencesManager } from '@/components';

export const metadata: Metadata = {
  title: 'Politique de Cookies - CAYENNEFIT',
  description: 'Politique de gestion des cookies et informations sur la collecte de données sur le site CAYENNEFIT',
};

/**
 * Page explicative de la politique de cookies
 * Conforme aux exigences RGPD
 */
export default function PolitiqueCookiesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-primary-blue text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            Politique de Cookies
          </h1>
          <p className="text-lg opacity-90">
            Informations sur l'utilisation des cookies sur cayennefit.io
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose max-w-none">
          
          {/* Section 1: Qu'est-ce qu'un cookie */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              1. Qu'est-ce qu'un cookie ?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, smartphone, tablette) 
              lors de votre visite sur notre site web. Il permet de reconnaître votre navigateur et de collecter 
              certaines informations vous concernant.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Les cookies nous aident à améliorer votre expérience de navigation, à analyser le trafic de notre 
              site et à vous proposer des contenus personnalisés.
            </p>
          </section>

          {/* Section 2: Types de cookies utilisés */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              2. Types de cookies utilisés sur CAYENNEFIT
            </h2>
            
            <div className="space-y-8">
              {/* Cookies nécessaires */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  🔒 Cookies Nécessaires
                </h3>
                <p className="text-gray-700 mb-3">
                  Ces cookies sont essentiels au fonctionnement de notre site web et ne peuvent pas être désactivés.
                </p>
                <ul className="text-gray-700 list-disc list-inside space-y-1">
                  <li>Cookies de session pour maintenir votre connexion</li>
                  <li>Cookies de sécurité pour protéger contre les attaques</li>
                  <li>Cookies de préférences utilisateur (langue, région)</li>
                  <li>Cookies de consentement pour retenir vos choix</li>
                </ul>
              </div>

              {/* Cookies analytiques */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  📊 Cookies Analytiques
                </h3>
                <p className="text-gray-700 mb-3">
                  Ces cookies nous permettent d'analyser l'utilisation de notre site et d'améliorer nos services.
                </p>
                <ul className="text-gray-700 list-disc list-inside space-y-1">
                  <li>Google Analytics : analyse du trafic et comportement des utilisateurs</li>
                  <li>Mesure de performance des pages</li>
                  <li>Statistiques de fréquentation</li>
                  <li>Identification des pages les plus consultées</li>
                </ul>
              </div>

              {/* Cookies marketing */}
              <div className="bg-orange-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  🎯 Cookies Marketing
                </h3>
                <p className="text-gray-700 mb-3">
                  Ces cookies permettent de vous proposer des publicités personnalisées et pertinentes.
                </p>
                <ul className="text-gray-700 list-disc list-inside space-y-1">
                  <li>Facebook Pixel : suivi des conversions publicitaires</li>
                  <li>Google Ads : personnalisation des annonces</li>
                  <li>Cookies de remarketing</li>
                  <li>Mesure de l'efficacité des campagnes publicitaires</li>
                </ul>
              </div>

              {/* Cookies personnalisation */}
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  🎨 Cookies de Personnalisation
                </h3>
                <p className="text-gray-700 mb-3">
                  Ces cookies permettent de personnaliser votre expérience sur notre site.
                </p>
                <ul className="text-gray-700 list-disc list-inside space-y-1">
                  <li>Mémorisation de vos préférences de navigation</li>
                  <li>Personnalisation de l'interface utilisateur</li>
                  <li>Recommandations de véhicules adaptées</li>
                  <li>Historique de vos recherches</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3: Durée de conservation */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              3. Durée de conservation des cookies
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Type de cookie</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Durée</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4">Cookies de session</td>
                    <td className="py-3 px-4">Supprimés à la fermeture du navigateur</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4">Cookies de consentement</td>
                    <td className="py-3 px-4">13 mois</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4">Cookies analytiques</td>
                    <td className="py-3 px-4">24 mois</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4">Cookies marketing</td>
                    <td className="py-3 px-4">90 jours</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Cookies de personnalisation</td>
                    <td className="py-3 px-4">12 mois</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 4: Gestion des cookies */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              4. Comment gérer vos cookies ?
            </h2>
            
            <div className="space-y-6">
              <div className="bg-primary-blue/10 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  🎛️ Gestion via notre interface
                </h3>
                <p className="text-gray-700 mb-4">
                  Vous pouvez modifier vos préférences de cookies à tout moment en cliquant sur le bouton ci-dessous :
                </p>
                <CookiePreferencesManager className="inline-flex items-center px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-primary-blue/90 transition-colors duration-200" />
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  🌐 Gestion via votre navigateur
                </h3>
                <p className="text-gray-700 mb-4">
                  Vous pouvez également gérer les cookies directement depuis votre navigateur :
                </p>
                <ul className="text-gray-700 list-disc list-inside space-y-2">
                  <li><strong>Chrome :</strong> Paramètres &gt; Confidentialité et sécurité &gt; Cookies</li>
                  <li><strong>Firefox :</strong> Préférences &gt; Vie privée et sécurité &gt; Cookies</li>
                  <li><strong>Safari :</strong> Préférences &gt; Confidentialité &gt; Cookies</li>
                  <li><strong>Edge :</strong> Paramètres &gt; Confidentialité &gt; Cookies</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 5: Cookies tiers */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              5. Cookies tiers
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Notre site utilise des services tiers qui peuvent déposer leurs propres cookies :
            </p>
            <div className="bg-yellow-50 p-6 rounded-lg">
              <ul className="text-gray-700 space-y-3">
                <li>
                  <strong>Google Analytics :</strong> Service d'analyse de Google Inc.
                  <br />
                  <a href="https://policies.google.com/privacy" className="text-primary-blue hover:underline" target="_blank" rel="noopener noreferrer">
                    Politique de confidentialité Google
                  </a>
                </li>
                <li>
                  <strong>Google Ads :</strong> Service publicitaire de Google Inc.
                  <br />
                  <a href="https://policies.google.com/technologies/ads" className="text-primary-blue hover:underline" target="_blank" rel="noopener noreferrer">
                    Politique publicitaire Google
                  </a>
                </li>
                <li>
                  <strong>Facebook Pixel :</strong> Service de suivi de Meta Platforms Inc.
                  <br />
                  <a href="https://www.facebook.com/privacy/policy/" className="text-primary-blue hover:underline" target="_blank" rel="noopener noreferrer">
                    Politique de confidentialité Facebook
                  </a>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 6: Contact */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              6. Contact et questions
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                Pour toute question concernant notre politique de cookies, vous pouvez nous contacter :
              </p>
              <ul className="text-gray-700 space-y-2">
                <li><strong>Email :</strong> contact@cayennefit.fr</li>
                <li><strong>Téléphone :</strong> +33 1 XX XX XX XX</li>
                <li><strong>Adresse :</strong> 14 bis rue du Bouchain, 59124 Escaudain</li>
              </ul>
            </div>
          </section>

          {/* Section 7: Mise à jour */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              7. Mise à jour de cette politique
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Cette politique de cookies peut être mise à jour périodiquement pour refléter les changements 
              dans nos pratiques ou dans la réglementation. Nous vous encourageons à consulter régulièrement 
              cette page pour rester informé de nos pratiques en matière de cookies.
            </p>
            <p className="text-gray-600 text-sm mt-4">
              <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR')}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
} 
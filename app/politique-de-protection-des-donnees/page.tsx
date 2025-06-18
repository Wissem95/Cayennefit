import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Politique de Protection des Données Personnelles - CAYENNEFIT',
  description: 'Politique de protection des données personnelles et informations sur la collecte de données sur le site CAYENNEFIT',
};

/**
 * Page de politique de protection des données personnelles
 * Conforme aux exigences RGPD - Adaptée à l'activité CAYENNEFIT
 * Design cohérent avec l'identité visuelle du site
 */
export default function PolitiqueProtectionDonneesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header avec style cohérent du site */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-light tracking-[0.1em] mb-6">
              POLITIQUE DE PROTECTION
            </h1>
            <div className="w-24 h-px bg-white mx-auto mb-6"></div>
            <p className="text-lg lg:text-xl font-light opacity-90 tracking-wider">
              DES DONNÉES PERSONNELLES
            </p>
            <p className="text-sm lg:text-base mt-4 opacity-80 max-w-2xl mx-auto">
              Protection de votre vie privée sur cayennefit.fr
            </p>
          </div>
        </div>
      </div>

      {/* Navigation breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link href="/" className="text-gray-500 hover:text-gray-700 font-light transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="flex-shrink-0 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-4 text-gray-900 font-light">Politique de Protection des Données</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Content avec design cohérent */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="max-w-4xl mx-auto">
          
          {/* Préambule */}
          <section className="mb-16">
            <h2 className="text-2xl lg:text-3xl font-light text-gray-900 mb-8 tracking-wide">
              Préambule
            </h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 mb-8">
              <p className="text-gray-700 leading-relaxed mb-6 font-light">
                Pour les besoins des présentes, <strong className="font-medium">CAYENNEFIT</strong> est la société éditrice du site <strong className="font-medium">www.cayennefit.fr</strong> :
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white rounded-lg p-6 border border-gray-100">
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-500 text-sm font-light">Société :</span>
                    <p className="font-medium text-gray-900">CAYENNEFIT</p>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm font-light">Email :</span>
                    <p className="font-medium text-gray-900">contact@cayennefit.fr</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-500 text-sm font-light">Siège social :</span>
                    <p className="font-medium text-gray-900">14 bis rue du Bouchain<br />59124 Escaudain - France</p>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm font-light">Téléphone :</span>
                    <p className="font-medium text-gray-900">07 85 18 90 51</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6 text-gray-700 leading-relaxed font-light">
              <p>
                La société CAYENNEFIT accorde une grande importance à la protection de votre vie privée et de vos 
                Données personnelles et s'engage à utiliser les Données personnelles de ses clients et prospects 
                dans la mesure où cela est strictement nécessaire au bon fonctionnement du site www.cayennefit.fr 
                (ci-après le "Site") et à la diffusion de ses services de vente de véhicules d'exception.
              </p>
              
              <p>
                Les Données personnelles désignent les informations qui concernent des personnes physiques, 
                identifiées ou identifiables, directement ou indirectement (ci-après les « Données personnelles »).
              </p>
              
              <p>
                La collecte et les traitements de Données personnelles que nous réalisons s'effectuent dans le 
                respect du cadre juridique en vigueur applicable à la protection des Données personnelles et 
                notamment du Règlement européen 2016/679 du 27 avril 2016, (ci-après le « Règlement »).
              </p>
              
              <p>
                Cette Politique a vocation à s'appliquer aux clients de CAYENNEFIT, ainsi qu'aux prospects et aux 
                visiteurs lors de leur navigation sur le Site. CAYENNEFIT se réserve la possibilité de modifier, 
                à tout moment, sa Politique afin notamment de faire évoluer ses services ou de se conformer à toute 
                nouvelle réglementation applicable.
              </p>
            </div>
          </section>

          {/* Section 1 */}
          <section className="mb-16">
            <h2 className="text-2xl lg:text-3xl font-light text-gray-900 mb-8 tracking-wide">
              1. Qui traite les Données personnelles ?
            </h2>
            <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
              <p className="text-gray-700 leading-relaxed font-light">
                CAYENNEFIT intervient en qualité de responsable des traitements de vos Données personnelles mis 
                en œuvre sur le Site. Ces traitements sont rendus nécessaires dans le cadre de nos services de 
                vente de véhicules d'exception et la gestion de la relation avec nos clients et prospects.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-16">
            <h2 className="text-2xl lg:text-3xl font-light text-gray-900 mb-8 tracking-wide">
              2. Quand les Données personnelles sont-elles collectées ?
            </h2>
            <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
              <p className="text-gray-700 leading-relaxed mb-6 font-light">
                Tout au long de la relation que CAYENNEFIT entretient avec ses clients et prospects, ces derniers 
                peuvent être amenés à transmettre leurs Données personnelles :
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Demande de rendez-vous pour consultation ou essai de véhicule",
                  "Contact auprès du service client de CAYENNEFIT",
                  "Souscription à la newsletter",
                  "Demande d'informations sur nos véhicules",
                  "Consultation et navigation sur le Site",
                  "Utilisation des cookies lors de la navigation",
                  "Participation à des enquêtes de satisfaction",
                  "Communication via nos formulaires de contact"
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 font-light">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-16">
            <h2 className="text-2xl lg:text-3xl font-light text-gray-900 mb-8 tracking-wide">
              3. Quelles Données personnelles sont collectées ?
            </h2>
            <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
              <p className="text-gray-700 leading-relaxed mb-8 font-light">
                En recourant aux services de notre Site, CAYENNEFIT peut utiliser les Données personnelles suivantes :
              </p>
              
              <div className="space-y-6">
                <div className="border border-gray-200 bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <span className="text-2xl mr-3">📋</span>
                    Données de contact et civilité
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {["Civilité, nom, prénom", "Numéros de téléphone", "Adresses email", "Adresses postales (si nécessaire)"].map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                        <span className="text-gray-700 font-light">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-gray-200 bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <span className="text-2xl mr-3">🚗</span>
                    Données relatives aux véhicules d'intérêt
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {["Préférences de marques et modèles", "Budget souhaité", "Critères de recherche de véhicules", "Historique des véhicules consultés"].map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                        <span className="text-gray-700 font-light">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-gray-200 bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <span className="text-2xl mr-3">🔐</span>
                    Données de connexion
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {["Adresse IP", "Données de navigation", "Cookies et identifiants de session"].map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                        <span className="text-gray-700 font-light">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-gray-200 bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <span className="text-2xl mr-3">📞</span>
                    Données de communication
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {["Gestion des rendez-vous", "Planification, confirmation et suivi des rendez-vous clients", "Échanges emails et messages", "Préférences de communication"].map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                        <span className="text-gray-700 font-light">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-8">
                <p className="text-gray-700 leading-relaxed font-light">
                  <strong className="font-medium">Important :</strong> CAYENNEFIT ne collecte aucune donnée bancaire. Les paiements, 
                  lorsqu'ils sont nécessaires (arrhes, acomptes), sont traités par des prestataires certifiés 
                  PCI-DSS conformément aux dispositions légales en vigueur.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Finalités des traitements */}
          <section className="mb-16">
            <h2 className="text-2xl lg:text-3xl font-light text-gray-900 mb-8 tracking-wide">
              4. Pour quelles raisons les Données personnelles sont-elles collectées et traitées ?
            </h2>
            <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
              <p className="text-gray-700 leading-relaxed mb-8 font-light">
                CAYENNEFIT s'engage à ne traiter et n'utiliser que les Données personnelles strictement 
                nécessaires pour atteindre les objectifs suivants :
              </p>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-lg border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 p-4 text-left font-medium text-gray-900">
                        Objectif du traitement
                      </th>
                      <th className="border border-gray-200 p-4 text-left font-medium text-gray-900">
                        Base légale
                      </th>
                      <th className="border border-gray-200 p-4 text-left font-medium text-gray-900">
                        Durée de conservation
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700 font-light">
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-200 p-4">
                        <strong className="font-medium">Gestion des rendez-vous</strong><br />
                        Planification, confirmation et suivi des rendez-vous clients
                      </td>
                      <td className="border border-gray-200 p-4">Exécution contractuelle</td>
                      <td className="border border-gray-200 p-4">3 ans après dernier contact</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-200 p-4">
                        <strong className="font-medium">Gestion de la relation client</strong><br />
                        Réponse aux demandes, suivi commercial, newsletter
                      </td>
                      <td className="border border-gray-200 p-4">Intérêt légitime / Consentement</td>
                      <td className="border border-gray-200 p-4">3 ans après dernier contact</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-200 p-4">
                        <strong className="font-medium">Amélioration du site web</strong><br />
                        Analyses statistiques, amélioration de l'expérience utilisateur
                      </td>
                      <td className="border border-gray-200 p-4">Intérêt légitime</td>
                      <td className="border border-gray-200 p-4">13 mois (cookies)</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-200 p-4">
                        <strong className="font-medium">Respect des obligations légales</strong><br />
                        Comptabilité, lutte anti-blanchiment
                      </td>
                      <td className="border border-gray-200 p-4">Obligation légale</td>
                      <td className="border border-gray-200 p-4">10 ans</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section 5: Partage des données */}
          <section className="mb-16">
            <h2 className="text-2xl lg:text-3xl font-light text-gray-900 mb-8 tracking-wide">
              5. Les Données personnelles sont-elles transmises à des tiers ?
            </h2>
            <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
              <p className="text-gray-700 leading-relaxed mb-6 font-light">
                CAYENNEFIT peut être amenée à transmettre des Données personnelles à des tiers dans les cas suivants :
              </p>
              
              <div className="space-y-4">
                {[
                  { title: "Prestataires de services", desc: "Hébergement web, services de maintenance, outils d'analyse (Google Analytics)" },
                  { title: "Autorités compétentes", desc: "Sur réquisition judiciaire ou administrative légalement motivée" },
                  { title: "Partenaires commerciaux", desc: "Uniquement avec votre consentement explicite et pour des services complémentaires" }
                ].map((item, index) => (
                  <div key={index} className="border border-gray-100 rounded-lg p-4 bg-gray-50">
                    <h4 className="font-medium text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-gray-700 font-light">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-6">
                <p className="text-gray-700 leading-relaxed font-light">
                  <strong className="font-medium">Engagement :</strong> CAYENNEFIT s'engage à ne jamais vendre, louer ou céder 
                  vos données personnelles à des fins commerciales non autorisées.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6: Vos droits */}
          <section className="mb-16">
            <h2 className="text-2xl lg:text-3xl font-light text-gray-900 mb-8 tracking-wide">
              6. Quels sont vos droits ?
            </h2>
            <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
              <p className="text-gray-700 leading-relaxed mb-8 font-light">
                Conformément au Règlement européen, vous disposez des droits suivants sur vos données personnelles :
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: "👁️", title: "Droit d'accès", desc: "Obtenir confirmation que vos données sont traitées et y accéder" },
                  { icon: "✏️", title: "Droit de rectification", desc: "Corriger vos données inexactes ou incomplètes" },
                  { icon: "🗑️", title: "Droit à l'effacement", desc: "Supprimer vos données dans certaines conditions" },
                  { icon: "⏸️", title: "Droit à la limitation", desc: "Limiter le traitement de vos données" },
                  { icon: "📦", title: "Droit à la portabilité", desc: "Récupérer vos données dans un format structuré" },
                  { icon: "🚫", title: "Droit d'opposition", desc: "Vous opposer au traitement pour motifs légitimes" }
                ].map((right, index) => (
                  <div key={index} className="border border-gray-100 rounded-lg p-6 bg-gray-50">
                    <div className="flex items-start space-x-4">
                      <span className="text-2xl">{right.icon}</span>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">{right.title}</h4>
                        <p className="text-gray-700 font-light text-sm">{right.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-8">
                <h4 className="font-medium text-gray-900 mb-4">Comment exercer vos droits ?</h4>
                <p className="text-gray-700 leading-relaxed mb-4 font-light">
                  Pour exercer vos droits, contactez-nous par email à <strong className="font-medium">contact@cayennefit.fr</strong> 
                  ou par courrier postal en joignant une copie de votre pièce d'identité.
                </p>
                <p className="text-gray-700 font-light text-sm">
                  Nous nous engageons à vous répondre dans un délai d'un mois maximum.
                </p>
              </div>
            </div>
          </section>

          {/* Section 7: Sécurité */}
          <section className="mb-16">
            <h2 className="text-2xl lg:text-3xl font-light text-gray-900 mb-8 tracking-wide">
              7. Comment vos données sont-elles sécurisées ?
            </h2>
            <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
              <p className="text-gray-700 leading-relaxed mb-6 font-light">
                CAYENNEFIT met en œuvre des mesures techniques et organisationnelles appropriées pour protéger 
                vos données personnelles contre la destruction, la perte, l'altération, la divulgation ou l'accès non autorisés :
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: "🔒", title: "Chiffrement SSL/TLS", desc: "Toutes les données transitent de manière sécurisée" },
                  { icon: "🏢", title: "Hébergement sécurisé", desc: "Serveurs certifiés ISO 27001 en France" },
                  { icon: "👥", title: "Accès contrôlé", desc: "Limitation des accès aux personnes autorisées" },
                  { icon: "🔄", title: "Sauvegardes régulières", desc: "Protection contre la perte de données" }
                ].map((measure, index) => (
                  <div key={index} className="border border-gray-100 rounded-lg p-4 bg-gray-50">
                    <div className="flex items-start space-x-3">
                      <span className="text-xl">{measure.icon}</span>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">{measure.title}</h4>
                        <p className="text-gray-700 font-light text-sm">{measure.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 8: Contact DPO */}
          <section className="mb-16">
            <h2 className="text-2xl lg:text-3xl font-light text-gray-900 mb-8 tracking-wide">
              8. Contact et réclamations
            </h2>
            <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Nous contacter</h4>
                  <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                    <div>
                      <span className="text-gray-500 text-sm font-light">Email :</span>
                      <p className="font-medium text-gray-900">contact@cayennefit.fr</p>
                    </div>
                    <div>
                      <span className="text-gray-500 text-sm font-light">Téléphone :</span>
                      <p className="font-medium text-gray-900">07 85 18 90 51</p>
                    </div>
                    <div>
                      <span className="text-gray-500 text-sm font-light">Adresse :</span>
                      <p className="font-medium text-gray-900">14 bis rue du Bouchain<br />59124 Escaudain</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Autorité de contrôle</h4>
                  <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                    <div>
                      <span className="text-gray-500 text-sm font-light">Organisme :</span>
                      <p className="font-medium text-gray-900">CNIL (Commission Nationale de l'Informatique et des Libertés)</p>
                    </div>
                    <div>
                      <span className="text-gray-500 text-sm font-light">Site web :</span>
                      <p className="font-medium text-gray-900">www.cnil.fr</p>
                    </div>
                    <div>
                      <span className="text-gray-500 text-sm font-light">Téléphone :</span>
                      <p className="font-medium text-gray-900">01 53 73 22 22</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 9: Mise à jour */}
          <section className="mb-16">
            <h2 className="text-2xl lg:text-3xl font-light text-gray-900 mb-8 tracking-wide">
              9. Mise à jour de cette politique
            </h2>
            <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
              <p className="text-gray-700 leading-relaxed font-light mb-4">
                CAYENNEFIT se réserve le droit de modifier cette politique de protection des données à tout moment, 
                notamment pour s'adapter aux évolutions légales ou à l'évolution de nos services.
              </p>
              <p className="text-gray-700 leading-relaxed font-light">
                <strong className="font-medium">Dernière mise à jour :</strong> Décembre 2024
              </p>
            </div>
          </section>

          {/* Bouton retour */}
          <div className="text-center">
            <Link 
              href="/"
              className="inline-flex items-center space-x-2 bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-light tracking-wide transition-all duration-300 hover:shadow-lg"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              <span>Retour à l'accueil</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 
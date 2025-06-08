import React from 'react';

const Services: React.FC = () => {
  const partsServices = [
    {
      category: "MOTEUR & TRANSMISSION",
      items: ["Blocs moteur révisés", "Boîtes de vitesses", "Turbocompresseurs", "Systèmes d'admission"]
    },
    {
      category: "CARROSSERIE & DESIGN",
      items: ["Éléments de carrosserie", "Optiques avant/arrière", "Jantes d'origine", "Éléments intérieurs"]
    },
    {
      category: "ÉLECTRONIQUE",
      items: ["Calculateurs", "Capteurs", "Systèmes multimédia", "Équipements de confort"]
    }
  ];

  const businessServices = [
    {
      icon: "💰",
      title: "ACHAT",
      subtitle: "Véhicules toutes conditions",
      description: "Nous rachetons votre Porsche Cayenne quel que soit son état. Évaluation gratuite et proposition immédiate.",
      features: ["Expertise gratuite", "Proposition sous 24h", "Transaction sécurisée", "Paiement comptant"]
    },
    {
      icon: "🚗",
      title: "REVENTE",
      subtitle: "Service complet de commercialisation",
      description: "Confiez-nous la vente de votre véhicule. Nous nous occupons de tout : présentation, expertise, commercialisation.",
      features: ["Préparation du véhicule", "Photos professionnelles", "Diffusion multi-canaux", "Suivi personnalisé"]
    },
    {
      icon: "🤝",
      title: "DÉPÔT-VENTE",
      subtitle: "Solution sans contrainte",
      description: "Déposez votre véhicule dans nos locaux. Nous nous chargeons de le vendre pendant que vous vaquez à vos occupations.",
      features: ["Stockage sécurisé", "Entretien préventif", "Assurance incluse", "Commission attractive"]
    }
  ];

  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Pièces détachées */}
        <div className="mb-24 lg:mb-32">
          {/* En-tête Pièces */}
          <div className="text-center mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200/50 mb-6">
              <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-green-600 rounded-full"></div>
              <span className="text-sm font-medium text-gray-600 tracking-wider uppercase">Nos produits</span>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-light text-gray-900 tracking-tight leading-tight mb-6">
              ACHAT DE PIÈCES DÉTACHÉES
            </h2>
            
            <p className="text-lg text-gray-600 font-light max-w-3xl mx-auto leading-relaxed mb-4">
              <span className="font-medium text-gray-900">Pièces d'occasion</span>
            </p>
            
            <div className="space-y-4 max-w-4xl mx-auto">
              <p className="text-lg text-gray-600 font-light leading-relaxed">
                Vous recherchez des pièces d'occasion pour votre Porsche Cayenne ? Vous êtes au bon endroit.
              </p>
              
              <p className="text-gray-600 leading-relaxed">
                Nous disposons d'un stock impressionnant de pièces détachées disponibles immédiatement, couvrant toutes les générations de Cayenne. Mécanique, électronique, carrosserie, intérieur… nous avons ce qu'il vous faut.
              </p>
              
              <p className="text-gray-600 leading-relaxed">
                <span className="font-medium text-gray-900">👉</span> Rendez-vous directement dans notre dépôt pour découvrir les pièces disponibles, ou<br/>
                <span className="font-medium text-gray-900">📩</span> contactez-nous via notre chat en ligne : notre équipe dédiée vous répondra rapidement pour vous guider et vérifier la disponibilité des pièces recherchées.
              </p>
              
              <p className="text-gray-600 leading-relaxed">
                Toutes nos pièces sont testées, contrôlées et garanties, afin de vous assurer une qualité optimale à prix réduit.
              </p>
            </div>
          </div>

          {/* Grille des catégories de pièces */}
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {partsServices.map((service, index) => (
              <div key={index} className="group relative">
                <div className="bg-white rounded-2xl p-8 border border-gray-200/50 hover:border-gray-300/50 transition-all duration-500 hover:shadow-xl hover:shadow-gray-200/50 h-full">
                  {/* Badge catégorie */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full mb-6">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs font-medium text-gray-700 tracking-wider uppercase">{service.category}</span>
                  </div>

                  {/* Liste des pièces */}
                  <div className="space-y-3">
                    {service.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center gap-3 text-gray-700">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full flex-shrink-0"></div>
                        <span className="font-light">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <button className="text-gray-900 font-medium text-sm tracking-wide hover:text-green-600 transition-colors duration-300 flex items-center gap-2 group-hover:gap-3">
                      Voir le catalogue
                      <svg className="w-4 h-4 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats pièces */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-light text-gray-900">5000+</div>
              <div className="text-sm text-gray-600 font-medium tracking-wider uppercase">Références disponibles</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-light text-gray-900">24h</div>
              <div className="text-sm text-gray-600 font-medium tracking-wider uppercase">Délai moyen</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-light text-gray-900">98%</div>
              <div className="text-sm text-gray-600 font-medium tracking-wider uppercase">Pièces en stock</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-light text-gray-900">100%</div>
              <div className="text-sm text-gray-600 font-medium tracking-wider uppercase">Pièces testées</div>
            </div>
          </div>
        </div>

        {/* Section Achat-Revente-Dépôt-vente */}
        <div>
          {/* En-tête Services */}
          <div className="text-center mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200/50 mb-6">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
              <span className="text-sm font-medium text-gray-600 tracking-wider uppercase">Nos services</span>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-light text-gray-900 tracking-tight leading-tight mb-6">
              ACHAT • REVENTE • DÉPÔT-VENTE
            </h2>
            
            <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
              Vous souhaitez vendre votre Porsche Cayenne ? CayenneFit vous propose plusieurs solutions simples et efficaces :
            </p>
            
            <div className="space-y-6 max-w-4xl mx-auto mt-8">
              <div className="bg-white/50 rounded-xl p-6 border border-gray-200/50">
                <h3 className="text-xl font-medium text-gray-900 mb-3">
                  <span className="font-bold">Rachat immédiat :</span>
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Nous reprenons votre Cayenne en l'état, même s'il est non roulant. Pas de contraintes, pas de frais cachés : notre équipe s'occupe de tout.
                </p>
              </div>
              
              <div className="bg-white/50 rounded-xl p-6 border border-gray-200/50">
                <h3 className="text-xl font-medium text-gray-900 mb-3">
                  <span className="font-bold">Dépôt-vente :</span>
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Confiez-nous votre véhicule, et nous nous chargeons de sa mise en valeur et de sa vente. Grâce à notre réseau solide d'acheteurs spécialisés, nous maximisons vos chances de vendre rapidement et au bon prix.
                </p>
              </div>
              
              <div className="bg-blue-50/50 rounded-xl p-6 border border-blue-200/50 mt-8">
                <h3 className="text-xl font-medium text-gray-900 mb-3">
                  <span className="font-bold">Vous êtes à la recherche d'un Porsche Cayenne d'occasion ?</span>
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Rendez-vous dans notre rubrique "Occasions du moment" pour découvrir notre sélection de véhicules disponibles. Tous nos modèles sont révisés, garantis, et prêts à prendre la route.
                </p>
              </div>
            </div>
          </div>

          {/* Grille des services business */}
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {businessServices.map((service, index) => (
              <div key={index} className="group relative h-full">
                <div className="bg-white rounded-2xl p-8 border border-gray-200/50 hover:border-blue-300/50 transition-all duration-500 hover:shadow-xl hover:shadow-blue-200/20 h-full flex flex-col">
                  {/* Icône et titre */}
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200/50 mb-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl" role="img" aria-label={service.title}>{service.icon}</span>
                    </div>
                    <h3 className="text-2xl font-medium text-gray-900 mb-1">{service.title}</h3>
                    <p className="text-blue-600 font-medium text-sm tracking-wide uppercase">{service.subtitle}</p>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed font-light mb-6 flex-grow">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3 text-gray-700">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0"></div>
                        <span className="font-light text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <button className="w-full py-3 px-6 bg-gray-900 hover:bg-blue-600 text-white rounded-xl font-medium tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/25 group-hover:-translate-y-0.5 mt-auto">
                    En savoir plus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services; 
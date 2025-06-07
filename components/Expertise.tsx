import React from 'react';

const Expertise: React.FC = () => {
  const expertiseItems = [
    {
      icon: "🔍",
      title: "EXPERTISE TECHNIQUE",
      description: "Évaluation complète de l'état mécanique, électronique et esthétique de chaque véhicule par nos experts certifiés."
    },
    {
      icon: "📋",
      title: "HISTORIQUE VÉRIFIÉ",
      description: "Vérification minutieuse de l'historique du véhicule, carnet d'entretien et authenticité des documents."
    },
    {
      icon: "⚙️",
      title: "MAINTENANCE PREMIUM",
      description: "Service de maintenance préventive et corrective par des techniciens spécialisés Porsche."
    },
    {
      icon: "🛡️",
      title: "GARANTIE QUALITÉ",
      description: "Garantie étendue sur tous nos véhicules avec suivi personnalisé et assistance dédiée."
    },
    {
      icon: "💎",
      title: "SÉLECTION EXCLUSIVE",
      description: "Curation rigoureuse de véhicules d'exception provenant de propriétaires passionnés et collectionneurs."
    },
    {
      icon: "🚗",
      title: "LIVRAISON PREMIUM",
      description: "Service de livraison sécurisée partout en France avec remise personnalisée et formation."
    }
  ];

  return (
    <section className="relative py-20 lg:py-32 bg-white">
      {/* Décoration géométrique */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-px h-32 bg-gradient-to-b from-gray-300 to-transparent"></div>
        <div className="absolute bottom-1/4 left-0 w-px h-32 bg-gradient-to-t from-gray-300 to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-full border border-gray-200 mb-6">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
            <span className="text-sm font-medium text-gray-600 tracking-wider uppercase">Notre savoir-faire</span>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-light text-gray-900 tracking-tight leading-tight mb-6">
            EXPERTISE
          </h2>
          
          <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
            Notre expertise s'étend bien au-delà de la simple transaction. 
            Nous vous accompagnons dans chaque étape de votre projet automobile.
          </p>
        </div>

        {/* Grille d'expertise */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {expertiseItems.map((item, index) => (
            <div 
              key={index}
              className="group relative bg-gradient-to-br from-white to-gray-50/50 rounded-2xl p-8 border border-gray-200/50 hover:border-gray-300/50 transition-all duration-500 hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1"
            >
              {/* Badge numéroté */}
              <div className="absolute top-6 right-6 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200/50">
                <span className="text-xs font-medium text-gray-500">{String(index + 1).padStart(2, '0')}</span>
              </div>

              {/* Icône */}
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-200/50 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl" role="img" aria-label={item.title}>{item.icon}</span>
                </div>
              </div>

              {/* Contenu */}
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-gray-900 tracking-wide">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>

              {/* Effet de survol */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 lg:mt-20 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl p-8 border border-gray-200/50">
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-2xl font-light text-gray-900 mb-2">
                Besoin d'une expertise personnalisée ?
              </h3>
              <p className="text-gray-600 font-light">
                Contactez nos experts pour une évaluation gratuite de votre projet
              </p>
            </div>
            <button className="group px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-medium tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-gray-900/25 hover:-translate-y-0.5">
              <span className="flex items-center gap-2">
                Nous contacter
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Expertise;
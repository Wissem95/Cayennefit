import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Décoration d'arrière-plan */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-gray-100/50 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-gray-200/40 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* En-tête de section */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200/50 mb-6">
            <div className="w-2 h-2 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full"></div>
            <span className="text-sm font-medium text-gray-600 tracking-wider uppercase">À propos</span>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-light text-gray-900 tracking-tight leading-tight mb-6">
            QUI SOMMES-NOUS ?
          </h2>
          
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto"></div>
        </div>

        {/* Contenu principal */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Texte */}
          <div className="space-y-6 lg:space-y-8">
            <div className="prose prose-lg prose-gray max-w-none">
              <p className="text-lg text-gray-700 font-light leading-relaxed">
                Passionnés par l'univers <span className="font-medium text-gray-900">Porsche Cayenne</span>, nous avons fait de ce SUV d'exception notre spécialité. Depuis plusieurs années, nous nous consacrons exclusivement à la réparation, l'entretien et la valorisation de cette gamme emblématique.
              </p>
              
              <p className="text-gray-600 leading-relaxed">
                Nous disposons aujourd'hui de l'un des plus grands stocks de pièces détachées d'occasion au monde dédiées au Porsche Cayenne, toutes rigoureusement contrôlées et garanties. Qu'il s'agisse d'une pièce rare, d'un élément mécanique, électronique ou de carrosserie, vous trouverez chez nous la solution adaptée à vos besoins.
              </p>
              
              <p className="text-gray-600 leading-relaxed">
                En plus de la vente de pièces, nous proposons également un service de montage complet dans nos ateliers spécialisés, avec des techniciens formés aux exigences Porsche. Notre mission : prolonger la vie de votre Cayenne, tout en vous faisant bénéficier de la qualité Porsche à prix maîtrisé.
              </p>
            </div>

            {/* Statistiques */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200/50">
              <div className="text-center">
                <div className="text-3xl font-light text-gray-900 mb-2">500+</div>
                <div className="text-sm text-gray-600 font-medium tracking-wider uppercase">Cayenne démontés</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-gray-900 mb-2">20</div>
                <div className="text-sm text-gray-600 font-medium tracking-wider uppercase">Ans d'expérience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-gray-900 mb-2">10K+</div>
                <div className="text-sm text-gray-600 font-medium tracking-wider uppercase">Pièces en stock</div>
              </div>
            </div>
          </div>

          {/* Image/Visual */}
          <div className="relative">
            <div className="aspect-[4/5] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              
              {/* Placeholder pour image */}
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-6xl mb-4">🏎️</div>
                  <p className="text-lg font-medium">Véhicule d'exception</p>
                  <p className="text-sm">Porsche Cayenne Collection</p>
                </div>
              </div>
            </div>

            {/* Badge flottant */}
            <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-6 shadow-lg border border-gray-200/50">
              <div className="text-center">
                <div className="text-2xl font-light text-gray-900 mb-1">Premium</div>
                <div className="text-xs text-gray-600 font-medium tracking-wider uppercase">Qualité</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs; 
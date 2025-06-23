'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSelector } from '@/components';
import Link from 'next/link';

export default function PolitiqueProtectionDonneesPage() {
  const { language, translations } = useLanguage();
  
  // Vérification défensive pour éviter les erreurs lors du pré-rendu
  // @ts-ignore - Accès dynamique aux traductions
  if (!translations || !translations[language] || !translations[language].privacyPolicy) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">{language === 'fr' ? 'Chargement...' : 'Loading...'}</p>
        </div>
      </div>
    );
  }
  
  // @ts-ignore - Les traductions privacyPolicy sont ajoutées dynamiquement
  const t = translations[language].privacyPolicy;

  return (
    <div className="min-h-screen bg-white">
      {/* Header avec sélecteur de langue */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Sélecteur de langue en haut à droite */}
          <div className="flex justify-end mb-6">
            <LanguageSelector />
          </div>
          
          <div className="text-center">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-light tracking-[0.1em] mb-6">
              {t.title.split(' ').slice(0, 3).join(' ')}
            </h1>
            <div className="w-24 h-px bg-white mx-auto mb-6"></div>
            <p className="text-lg lg:text-xl font-light opacity-90 tracking-wider">
              {t.title.split(' ').slice(3).join(' ')}
            </p>
            <p className="text-sm lg:text-base mt-4 opacity-80 max-w-2xl mx-auto">
              {t.subtitle}
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
                  {language === 'fr' ? 'Accueil' : 'Home'}
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="flex-shrink-0 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-4 text-gray-900 font-light">{t.title}</span>
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
              {t.preamble.title}
            </h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 mb-8">
              <p className="text-gray-700 leading-relaxed mb-6 font-light">
                {language === 'fr' ? 'Pour les besoins des présentes,' : 'For the purposes of this document,'} <strong className="font-medium">{t.preamble.company}</strong> {language === 'fr' ? 'est la société éditrice du site' : 'is the publisher of the website'} <strong className="font-medium">www.cayennefit.fr</strong> :
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white rounded-lg p-6 border border-gray-100">
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-500 text-sm font-light">{language === 'fr' ? 'Société :' : 'Company:'}</span>
                    <p className="font-medium text-gray-900">{t.preamble.company}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm font-light">Email :</span>
                    <p className="font-medium text-gray-900">{t.preamble.email}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-500 text-sm font-light">{language === 'fr' ? 'Siège social :' : 'Registered office:'}</span>
                    <p className="font-medium text-gray-900" dangerouslySetInnerHTML={{ __html: t.preamble.address }} />
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm font-light">{language === 'fr' ? 'Téléphone :' : 'Phone:'}</span>
                    <p className="font-medium text-gray-900">{t.preamble.phone}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6 text-gray-700 leading-relaxed font-light">
              <p>{t.preamble.content1}</p>
              <p>{t.preamble.content2}</p>
              <p>{t.preamble.content3}</p>
              <p>{t.preamble.content4}</p>
            </div>
          </section>

          {/* Section 1 */}
          <section className="mb-16">
            <h2 className="text-2xl lg:text-3xl font-light text-gray-900 mb-8 tracking-wide">
              1. {t.section1.title}
            </h2>
            <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
              <p className="text-gray-700 leading-relaxed font-light">
                {t.section1.content}
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-16">
            <h2 className="text-2xl lg:text-3xl font-light text-gray-900 mb-8 tracking-wide">
              2. {t.section2.title}
            </h2>
            <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
              <p className="text-gray-700 leading-relaxed mb-6 font-light">
                {t.section2.content}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {t.section2.items.map((item: string, index: number) => (
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
              3. {t.section3.title}
            </h2>
            <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
              <p className="text-gray-700 leading-relaxed mb-8 font-light">
                {t.section3.content}
              </p>
              
              <div className="space-y-6">
                <div className="border border-gray-200 bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <span className="text-2xl mr-3">📋</span>
                    {t.section3.categories.contact.title}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {t.section3.categories.contact.items.map((item: string, index: number) => (
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
                    {t.section3.categories.vehicles.title}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {t.section3.categories.vehicles.items.map((item: string, index: number) => (
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
                    {t.section3.categories.connection.title}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {t.section3.categories.connection.items.map((item: string, index: number) => (
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
                    {t.section3.categories.communication.title}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {t.section3.categories.communication.items.map((item: string, index: number) => (
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
                  <strong className="font-medium">{language === 'fr' ? 'Important :' : 'Important:'}</strong> {t.section3.important}
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Finalités des traitements */}
          <section className="mb-16">
            <h2 className="text-2xl lg:text-3xl font-light text-gray-900 mb-8 tracking-wide">
              4. {t.section4.title}
            </h2>
            <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
              <p className="text-gray-700 leading-relaxed mb-8 font-light">
                {t.section4.content}
              </p>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-lg border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 p-4 text-left font-medium text-gray-900">
                        {language === 'fr' ? 'Objectif du traitement' : 'Processing objective'}
                      </th>
                      <th className="border border-gray-200 p-4 text-left font-medium text-gray-900">
                        {language === 'fr' ? 'Base légale' : 'Legal basis'}
                      </th>
                      <th className="border border-gray-200 p-4 text-left font-medium text-gray-900">
                        {language === 'fr' ? 'Durée de conservation' : 'Retention period'}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700 font-light">
                    {t.section4.purposes.map((purpose: any, index: number) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="border border-gray-200 p-4">
                          <strong className="font-medium">{purpose.objective}</strong><br />
                          {purpose.description}
                        </td>
                        <td className="border border-gray-200 p-4">{purpose.legalBasis}</td>
                        <td className="border border-gray-200 p-4">{purpose.retention}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section 5: Partage des données */}
          <section className="mb-16">
            <h2 className="text-2xl lg:text-3xl font-light text-gray-900 mb-8 tracking-wide">
              5. {t.section5.title}
            </h2>
            <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
              <p className="text-gray-700 leading-relaxed mb-6 font-light">
                {t.section5.content}
              </p>
              
              <div className="space-y-4">
                {t.section5.cases.map((item: any, index: number) => (
                  <div key={index} className="border border-gray-100 rounded-lg p-4 bg-gray-50">
                    <h4 className="font-medium text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-gray-700 font-light">{item.description}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-6">
                <p className="text-gray-700 leading-relaxed font-light">
                  <strong className="font-medium">{language === 'fr' ? 'Engagement :' : 'Commitment:'}</strong> {t.section5.commitment}
                </p>
              </div>
            </div>
          </section>

          {/* Section 6: Vos droits */}
          <section className="mb-16">
            <h2 className="text-2xl lg:text-3xl font-light text-gray-900 mb-8 tracking-wide">
              6. {t.section6.title}
            </h2>
            <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
              <p className="text-gray-700 leading-relaxed mb-8 font-light">
                {t.section6.content}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {t.section6.rights.map((right: any, index: number) => {
                  const icons = ['👁️', '✏️', '🗑️', '⏸️', '📦', '🚫'];
                  return (
                    <div key={index} className="border border-gray-100 rounded-lg p-6 bg-gray-50">
                      <div className="flex items-start space-x-4">
                        <span className="text-2xl">{icons[index]}</span>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">{right.title}</h4>
                          <p className="text-gray-700 font-light text-sm">{right.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-8">
                <h4 className="font-medium text-gray-900 mb-4">{t.section6.howToExercise.title}</h4>
                <p className="text-gray-700 leading-relaxed mb-4 font-light" dangerouslySetInnerHTML={{ __html: t.section6.howToExercise.content }} />
                <p className="text-gray-700 font-light text-sm">
                  {t.section6.howToExercise.responseTime}
                </p>
              </div>
            </div>
          </section>

          {/* Section 7: Sécurité */}
          <section className="mb-16">
            <h2 className="text-2xl lg:text-3xl font-light text-gray-900 mb-8 tracking-wide">
              7. {t.section7.title}
            </h2>
            <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
              <p className="text-gray-700 leading-relaxed mb-6 font-light">
                {t.section7.content}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {t.section7.measures.map((measure: any, index: number) => {
                  const icons = ['🔒', '🏢', '👥', '🔄'];
                  return (
                    <div key={index} className="border border-gray-100 rounded-lg p-4 bg-gray-50">
                      <div className="flex items-start space-x-3">
                        <span className="text-xl">{icons[index]}</span>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">{measure.title}</h4>
                          <p className="text-gray-700 font-light text-sm">{measure.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Section 8: Contact DPO */}
          <section className="mb-16">
            <h2 className="text-2xl lg:text-3xl font-light text-gray-900 mb-8 tracking-wide">
              8. {t.section8.title}
            </h2>
            <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">{t.section8.contact.title}</h4>
                  <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                    <div>
                      <span className="text-gray-500 text-sm font-light">Email :</span>
                      <p className="font-medium text-gray-900">{t.section8.contact.email}</p>
                    </div>
                    <div>
                      <span className="text-gray-500 text-sm font-light">{language === 'fr' ? 'Téléphone :' : 'Phone:'}</span>
                      <p className="font-medium text-gray-900">{t.section8.contact.phone}</p>
                    </div>
                    <div>
                      <span className="text-gray-500 text-sm font-light">{language === 'fr' ? 'Adresse :' : 'Address:'}</span>
                      <p className="font-medium text-gray-900" dangerouslySetInnerHTML={{ __html: t.section8.contact.address }} />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-4">{t.section8.authority.title}</h4>
                  <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                    <div>
                      <span className="text-gray-500 text-sm font-light">{language === 'fr' ? 'Organisme :' : 'Organization:'}</span>
                      <p className="font-medium text-gray-900">{t.section8.authority.name}</p>
                    </div>
                    <div>
                      <span className="text-gray-500 text-sm font-light">Site web :</span>
                      <p className="font-medium text-gray-900">{t.section8.authority.website}</p>
                    </div>
                    <div>
                      <span className="text-gray-500 text-sm font-light">{language === 'fr' ? 'Téléphone :' : 'Phone:'}</span>
                      <p className="font-medium text-gray-900">{t.section8.authority.phone}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 9: Mise à jour */}
          <section className="mb-16">
            <h2 className="text-2xl lg:text-3xl font-light text-gray-900 mb-8 tracking-wide">
              9. {t.section9.title}
            </h2>
            <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
              <p className="text-gray-700 leading-relaxed font-light mb-4">
                {t.section9.content}
              </p>
              <p className="text-gray-700 leading-relaxed font-light">
                <strong className="font-medium">{t.section9.lastUpdate}</strong>
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
              <span>{t.backToHome}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 
'use client';

import { Metadata } from 'next';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSelector } from '@/components';
import Link from 'next/link';

// export const metadata: Metadata = {
//   title: 'Conditions Générales de Vente - Cayennefit',
//   description: 'Conditions générales de vente et d\'utilisation - Cayennefit Véhicules de Luxe',
// };

export default function ConditionsGenerales() {
  const { language, translations } = useLanguage();
  const t = translations[language].termsConditions;

  return (
    <div className="min-h-screen bg-white">
      {/* Header avec sélecteur de langue */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Sélecteur de langue en haut à droite */}
          <div className="flex justify-end mb-6">
            <LanguageSelector />
          </div>
          
          <h1 className="text-4xl font-bold text-center">
            {t.title}
          </h1>
          <p className="text-xl text-gray-300 text-center mt-4">
            {t.subtitle}
          </p>
        </div>
      </div>

      {/* Navigation breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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

      {/* Contenu */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
          
          {/* Article 1 - Dispositions générales */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Article 1 - {t.article1.title}</h2>
            
            <div className="space-y-6">
              <p>
                <strong>1.1</strong> <span dangerouslySetInnerHTML={{ __html: t.article1.content1 }} />
              </p>
              
              <p>
                <strong>1.2</strong> {t.article1.content2}
              </p>
              
              <p>
                <strong>1.3</strong> {t.article1.content3}
              </p>
              
              <p>
                <strong>1.4</strong> {t.article1.content4}
              </p>
              
              <p>
                <strong>1.5</strong> {t.article1.content5}
              </p>
              
              <p>
                <strong>1.6</strong> {t.article1.content6}
              </p>
            </div>
          </section>

          {/* Article 2 - Objet */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Article 2 - {t.article2.title}</h2>
            
            <p dangerouslySetInnerHTML={{ __html: t.article2.content }} />
          </section>

          {/* Article 3 - Définitions */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Article 3 - {t.article3.title}</h2>
            
            <div className="space-y-4">
              <p dangerouslySetInnerHTML={{ __html: t.article3.client }} />
              
              <p dangerouslySetInnerHTML={{ __html: t.article3.vehicles }} />
              
              <p dangerouslySetInnerHTML={{ __html: t.article3.parties }} />
              
              <p dangerouslySetInnerHTML={{ __html: t.article3.site }} />
            </div>
          </section>

          {/* Article 4 - Accessibilité et Rendez-vous */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Article 4 - {t.article4.title}</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">4.1 {t.article4.subtitle1}</h3>
                <div className="space-y-3">
                  <p><strong>4.1.1</strong> {t.article4.content1_1}</p>
                  <p><strong>4.1.2</strong> {t.article4.content1_2}</p>
                  <p><strong>4.1.3</strong> {t.article4.content1_3}</p>
                  <p><strong>4.1.4</strong> {t.article4.content1_4}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">4.2 {t.article4.subtitle2}</h3>
                <div className="space-y-3">
                  <p><strong>4.2.1</strong> {t.article4.content2_1}</p>
                  <p><strong>4.2.2</strong> {t.article4.content2_2}</p>
                  <p><strong>4.2.3</strong> {t.article4.content2_3}</p>
                  <p><strong>4.2.4</strong> {t.article4.content2_4}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Article 5 - Données personnelles */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Article 5 - {t.article5.title}</h2>
            
            <div className="space-y-4">
              <p>
                <strong>5.1</strong> {t.article5.content1}
              </p>
              
              <p>
                <strong>5.2</strong> <span dangerouslySetInnerHTML={{ __html: t.article5.content2 }} />
              </p>
              
              <p>
                <strong>5.3</strong> {t.article5.content3}
              </p>
              
              <p>
                <strong>5.4</strong> {t.article5.content4}
              </p>
              
              <p>
                <strong>5.5</strong> {t.article5.content5}
              </p>
              
              <p>
                <strong>5.6</strong> {t.article5.content6}
              </p>
              
              <p>
                <strong>5.7</strong> {t.article5.content7}
              </p>
              
              <p>
                <strong>5.8</strong> {t.article5.content8}
              </p>
            </div>
          </section>

          {/* Article 6 - Propriété intellectuelle */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Article 6 - {t.article6.title}</h2>
            
            <div className="space-y-4">
              <p>
                <strong>6.1</strong> {t.article6.content1}
              </p>
              
              <p>
                <strong>6.2</strong> {t.article6.content2}
              </p>
              
              <p>
                <strong>6.3</strong> {t.article6.content3}
              </p>
            </div>
          </section>

          {/* Article 7 - Commandes et Ventes */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Article 7 - {t.article7.title}</h2>
            
            <div className="space-y-4">
              <p>
                <strong>7.1</strong> {t.article7.content1}
              </p>
              
              <p>
                <strong>7.2</strong> {t.article7.content2}
              </p>
              
              <p>
                <strong>7.3</strong> {t.article7.content3}
              </p>
              
              <p>
                <strong>7.4</strong> {t.article7.content4}
              </p>
              
              <p>
                <strong>7.5</strong> {t.article7.content5}
              </p>
            </div>
          </section>

          {/* Article 8 - Prix */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Article 8 - {t.article8.title}</h2>
            
            <div className="space-y-4">
              <p>
                <strong>8.1</strong> {t.article8.content1}
              </p>
              
              <p>
                <strong>8.2</strong> {t.article8.content2}
              </p>
              
              <p>
                <strong>8.3</strong> {t.article8.content3}
              </p>
              
              <p>
                <strong>8.4</strong> {t.article8.content4}
              </p>
            </div>
          </section>

          {/* Article 9 - Modalités de paiement */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Article 9 - {t.article9.title}</h2>
            
            <div className="space-y-4">
              <p>
                <strong>9.1</strong> {t.article9.content1}
              </p>
              
              <p><strong>9.2</strong> {t.article9.paymentMethods}</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>{t.article9.method1}</li>
                <li>{t.article9.method2}</li>
                <li>{t.article9.method3}</li>
                <li>{t.article9.method4}</li>
              </ul>
              
              <p>
                <strong>9.3</strong> {t.article9.content3}
              </p>
            </div>
          </section>

          {/* Article 10 - Réserve de propriété et transfert des risques */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Article 10 - {t.article10.title}</h2>
            
            <div className="space-y-4">
              <p>
                <strong>10.1</strong> {t.article10.content1}
              </p>
              
              <p>
                <strong>10.2</strong> {t.article10.content2}
              </p>
            </div>
          </section>

          {/* Article 11 - Livraison */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Article 11 - {t.article11.title}</h2>
            
            <div className="space-y-4">
              <p>
                <strong>11.1</strong> {t.article11.content1}
              </p>
              
              <p><strong>11.2</strong> {t.article11.deliveryMethods}</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>{t.article11.delivery1}</li>
                <li>{t.article11.delivery2}</li>
                <li>{t.article11.delivery3}</li>
              </ul>
              
              <p>
                <strong>11.3</strong> {t.article11.content3}
              </p>
            </div>
          </section>

          {/* Article 12 - Droit de rétractation */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Article 12 - {t.article12.title}</h2>
            
            <div className="space-y-4">
              <p>
                <strong>12.1</strong> {t.article12.content1}
              </p>
              
              <p>
                <strong>12.2</strong> {t.article12.content2}
              </p>
            </div>
          </section>

          {/* Article 13 - Responsabilités */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Article 13 - {t.article13.title}</h2>
            
            <div className="space-y-4">
              <p>
                <strong>13.1</strong> {t.article13.content1}
              </p>
              
              <p>
                <strong>13.2</strong> {t.article13.content2}
              </p>
              
              <p>
                <strong>13.3</strong> {t.article13.content3}
              </p>
              
              <p>
                <strong>13.4</strong> {t.article13.content4}
              </p>
            </div>
          </section>

          {/* Article 14 - Garantie légale */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Article 14 - {t.article14.title}</h2>
            
            <div className="space-y-4">
              <p>
                <strong>14.1</strong> {t.article14.content1}
              </p>
              
              <p>
                <strong>14.2</strong> {t.article14.content2}
              </p>
              
              <p>
                <strong>14.3</strong> {t.article14.content3}
              </p>
            </div>
          </section>

          {/* Article 15 - Modification et résiliation */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Article 15 - {t.article15.title}</h2>
            
            <div className="space-y-4">
              <p>
                <strong>15.1</strong> {t.article15.content1}
              </p>

              <p>
                <strong>15.2</strong> {t.article15.content2}
              </p>
            </div>
          </section>

          {/* Article 16 - Litiges */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Article 16 - {t.article16.title}</h2>
            
            <div className="space-y-4">
              <p>
                <strong>16.1</strong> {t.article16.content1}
              </p>
              
              <p>
                <strong>16.2</strong> {t.article16.content2}
              </p>
              
              <p>
                <strong>16.3</strong> {t.article16.content3}
                <a href={t.article16.mediationLink} 
                   className="text-blue-600 hover:underline ml-1"
                   target="_blank" 
                   rel="noopener noreferrer">
                  {t.article16.mediationLink}
                </a>
              </p>
              
              <p>
                <strong>16.4</strong> {t.article16.content4}
                <a href={t.article16.disputeLink} 
                   className="text-blue-600 hover:underline ml-1"
                   target="_blank" 
                   rel="noopener noreferrer">
                  {t.article16.disputeLink}
                </a>
              </p>
              
              <p>
                <strong>16.5</strong> {t.article16.content5}
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.contact.title}</h2>
            
            <p className="mb-4">
              {t.contact.description}
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="mb-2"><strong>{t.contact.email}</strong> contact@cayennefit.fr</p>
                <p className="mb-2"><strong>{t.contact.phone}</strong> +33 1 XX XX XX XX</p>
              </div>
              <div>
                <p className="mb-2"><strong>{t.contact.address}</strong> 14 bis rue du Bouchain, 59124 Escaudain</p>
                <p><strong>{t.contact.hours}</strong> {t.contact.hoursValue}</p>
              </div>
            </div>
          </section>

          <p className="text-sm text-gray-600 mt-12 pt-8 border-t">
            <strong>{t.contact.lastUpdate}</strong> {new Date().toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US')}
          </p>

        </div>
      </div>
    </div>
  );
} 
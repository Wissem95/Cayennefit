import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente - Cayennefit',
  description: 'Conditions générales de vente et d\'utilisation - Cayennefit Véhicules de Luxe',
};

export default function ConditionsGenerales() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center">
            Conditions Générales de Vente
          </h1>
          <p className="text-xl text-gray-300 text-center mt-4">
            Cayennefit - Véhicules d'Exception
          </p>
        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
          
          {/* Article 1 - Dispositions générales */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Article 1 - Dispositions Générales</h2>
            
            <div className="space-y-6">
              <p>
                <strong>1.1</strong> Les présentes Conditions Générales de Vente s'appliquent aux relations contractuelles 
                entre <strong>CAYENNEFIT</strong>, entreprise individuelle ayant son siège social au 
                14 bis rue du Bouchain, 59124 Escaudain, France, ci-après dénommée "CAYENNEFIT" et le CLIENT, 
                personne physique, ci-après dénommé "CLIENT".
              </p>
              
              <p>
                <strong>1.2</strong> Les Conditions Générales sont portées à la connaissance du CLIENT avant l'exécution 
                de toute transaction et en constituent la base. CAYENNEFIT ne peut y renoncer par avance. 
                La prise de rendez-vous implique l'acceptation pleine et entière de ces Conditions par le CLIENT.
              </p>
              
              <p>
                <strong>1.3</strong> Aucune condition particulière ne peut prévaloir sauf acceptation formelle et écrite 
                de CAYENNEFIT contre ces Conditions Générales.
              </p>
              
              <p>
                <strong>1.4</strong> Ces Conditions Générales de Vente sont conformes aux dispositions du Code de commerce 
                et du Code de la consommation. Elles se conforment aux usages commerciaux actuels de la profession.
              </p>
              
              <p>
                <strong>1.5</strong> Les prix, informations et caractéristiques figurant sur les prospectus, fiches techniques, 
                le site web ou autres documents sont donnés à titre indicatif seulement et ne sauraient en aucun cas 
                être considérés comme des offres fermes.
              </p>
              
              <p>
                <strong>1.6</strong> En outre, CAYENNEFIT se réserve le droit, à tout moment et sans préavis, d'apporter 
                toutes modifications ou améliorations à ses offres qu'elle juge nécessaires, sans que le CLIENT 
                puisse prétendre à un quelconque préjudice.
              </p>
            </div>
          </section>

          {/* Article 2 - Objet */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Article 2 - Objet</h2>
            
            <p>
              L'objet des présentes Conditions Générales de Vente est de fixer les modalités applicables 
              à tout achat effectué par le CLIENT sur le site web de CAYENNEFIT : 
              <strong> www.cayennefit.io</strong> (ci-après dénommé le "SITE WEB") ou à toute commande 
              passée par téléphone ou e-mail.
            </p>
          </section>

          {/* Article 3 - Définitions */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Article 3 - Définitions</h2>
            
            <div className="space-y-4">
              <p><strong>CLIENT :</strong> désigne toute personne physique agissant en son nom propre, 
              effectuant un achat par l'intermédiaire du SITE WEB ou par téléphone ou e-mail.</p>
              
              <p><strong>VÉHICULES :</strong> désigne tous les véhicules de luxe et d'exception commercialisés 
              par CAYENNEFIT. Sauf cas particuliers, tous les véhicules proposés sont d'occasion en excellent état.</p>
              
              <p><strong>PARTIES :</strong> désigne le CLIENT et CAYENNEFIT, liés dans une relation par le présent accord.</p>
              
              <p><strong>SITE :</strong> désigne le site web "www.cayennefit.io" exploité par CAYENNEFIT.</p>
            </div>
          </section>

          {/* Article 4 - Accessibilité et Rendez-vous */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Article 4 - Accessibilité et Prise de Rendez-vous</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">4.1 Conditions de prise de rendez-vous</h3>
                <div className="space-y-3">
                  <p><strong>4.1.1</strong> La prise de rendez-vous se fait en remplissant un formulaire en ligne ou par contact téléphonique.</p>
                  <p><strong>4.1.2</strong> Le CLIENT doit être majeur et avoir la capacité de contracter.</p>
                  <p><strong>4.1.3</strong> CAYENNEFIT se réserve le droit d'accepter ou de refuser tout rendez-vous.</p>
                  <p><strong>4.1.4</strong> Le CLIENT s'engage à fournir des données exactes et véridiques.</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">4.2 Conditions d'essai des véhicules</h3>
                <div className="space-y-3">
                  <p><strong>4.2.1</strong> Présentation d'un permis de conduire valide obligatoire.</p>
                  <p><strong>4.2.2</strong> Justificatif d'identité et de domicile requis.</p>
                  <p><strong>4.2.3</strong> Signature d'une décharge de responsabilité avant l'essai.</p>
                  <p><strong>4.2.4</strong> Respect strict des consignes de sécurité et du code de la route.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Article 5 - Données personnelles */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Article 5 - Données Personnelles</h2>
            
            <div className="space-y-4">
              <p>
                <strong>5.1</strong> Dans le cadre de la relation contractuelle régie par les présentes Conditions Générales, 
                le CLIENT autorise expressément CAYENNEFIT à traiter les données personnelles de la manière décrite ci-dessous.
              </p>
              
              <p>
                <strong>5.2</strong> CAYENNEFIT agit en qualité de responsable du traitement. 
                Son siège social est situé au 14 bis rue du Bouchain, 59124 Escaudain, France.
                Contact : <strong>contact@cayennefit.fr</strong> ou par téléphone : <strong>+33 1 XX XX XX XX</strong>
              </p>
              
              <p>
                <strong>5.3</strong> La finalité du traitement auquel consent le CLIENT est de permettre à CAYENNEFIT 
                de satisfaire ses obligations contractuelles et d'informer le CLIENT de ses offres et nouveaux véhicules.
              </p>
              
              <p>
                <strong>5.4</strong> Les données personnelles collectées dans le cadre de cet accord sont les suivantes : 
                nom, prénom, coordonnées e-mail, postales et téléphoniques du CLIENT.
              </p>
              
              <p>
                <strong>5.5</strong> Seuls le dirigeant et le service clientèle de CAYENNEFIT ont accès aux données collectées.
              </p>
              
              <p>
                <strong>5.6</strong> Les données collectées sont conservées pendant toute la durée de la relation contractuelle 
                entre le CLIENT et CAYENNEFIT, et pendant un an après la fin de cette relation.
              </p>
              
              <p>
                <strong>5.7</strong> Le CLIENT est informé que les données collectées par CAYENNEFIT ne sont pas transférées 
                en dehors de l'Union européenne.
              </p>
              
              <p>
                <strong>5.8</strong> Le CLIENT dispose d'un droit d'accès, de rectification, d'effacement ou d'opposition 
                concernant ses données personnelles. Il peut également bénéficier du droit à la portabilité de ses données.
              </p>
            </div>
          </section>

          {/* Article 6 - Propriété intellectuelle */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Article 6 - Propriété Intellectuelle</h2>
            
            <div className="space-y-4">
              <p>
                <strong>6.1</strong> Le SITE WEB est la propriété exclusive de CAYENNEFIT, qui détient donc tous les droits 
                de propriété intellectuelle s'y rapportant. Son contenu ne peut donc être modifié, copié, distribué, 
                reproduit, téléchargé, affiché, publié, communiqué ou vendu sous quelque forme ou par quelque moyen que ce soit.
              </p>
              
              <p>
                <strong>6.2</strong> CAYENNEFIT conserve la propriété pleine et exclusive de toutes les marques, 
                dessins déposés et droits d'auteur attachés aux contenus fournis par ou accessibles par l'intermédiaire du SITE WEB.
              </p>
              
              <p>
                <strong>6.3</strong> Il est précisé que les marques des constructeurs automobiles (Porsche, Ferrari, Lamborghini, etc.) 
                sont des marques déposées de leurs propriétaires respectifs. CAYENNEFIT n'est pas un représentant officiel 
                de ces marques et n'agit pas en leur nom.
              </p>
            </div>
          </section>

          {/* Article 7 - Commandes et Ventes */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Article 7 - Processus de Vente</h2>
            
            <div className="space-y-4">
              <p>
                <strong>7.1</strong> Lorsque le CLIENT souhaite acquérir un véhicule, il doit d'abord prendre rendez-vous 
                pour une visite et un essai.
              </p>
              
              <p>
                <strong>7.2</strong> Après accord sur les conditions de vente, un contrat de vente est établi précisant 
                toutes les modalités (prix, paiement, livraison, garanties).
              </p>
              
              <p>
                <strong>7.3</strong> La vente ne sera réputée définitive qu'une fois le paiement reçu par CAYENNEFIT.
              </p>
              
              <p>
                <strong>7.4</strong> CAYENNEFIT se réserve le droit de refuser ou d'annuler toute vente, notamment 
                en cas d'insolvabilité du CLIENT ou de non-paiement.
              </p>
              
              <p>
                <strong>7.5</strong> Les photographies et vidéos présentées ne sont pas contractuelles. 
                Seule l'inspection physique du véhicule fait foi.
              </p>
            </div>
          </section>

          {/* Article 8 - Prix */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Article 8 - Prix</h2>
            
            <div className="space-y-4">
              <p>
                <strong>8.1</strong> Le prix des VÉHICULES sur le SITE WEB est exprimé en Euro et comprend toutes les taxes.
              </p>
              
              <p>
                <strong>8.2</strong> Le prix associé à chaque VÉHICULE ne comprend pas les frais de carte grise, 
                de livraison ou les droits de douane éventuels.
              </p>
              
              <p>
                <strong>8.3</strong> Le prix indiqué dans la confirmation de commande est le prix définitif.
              </p>
              
              <p>
                <strong>8.4</strong> CAYENNEFIT se réserve le droit de modifier le prix des VÉHICULES à tout moment, 
                étant entendu que le prix figurant dans la confirmation de commande ne s'applique qu'au CLIENT.
              </p>
            </div>
          </section>

          {/* Article 9 - Modalités de paiement */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Article 9 - Modalités de Paiement</h2>
            
            <div className="space-y-4">
              <p>
                <strong>9.1</strong> Le prix facturé au CLIENT est le prix indiqué dans la confirmation de commande 
                émise par CAYENNEFIT.
              </p>
              
              <p><strong>9.2</strong> Moyens de paiement acceptés :</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Virement bancaire</li>
                <li>Chèque de banque</li>
                <li>Espèces (dans la limite légale)</li>
                <li>Financement avec nos partenaires bancaires</li>
              </ul>
              
              <p>
                <strong>9.3</strong> CAYENNEFIT se réserve le droit de demander un chèque de banque et/ou une preuve 
                d'identité et/ou un justificatif de domicile lorsque des montants importants sont en jeu.
              </p>
            </div>
          </section>

          {/* Article 10 - Réserve de propriété et transfert des risques */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Article 10 - Réserve de Propriété et Transfert des Risques</h2>
            
            <div className="space-y-4">
              <p>
                <strong>10.1</strong> Les VÉHICULES commandés demeurent la propriété de CAYENNEFIT jusqu'à leur livraison 
                et paiement intégral.
              </p>
              
              <p>
                <strong>10.2</strong> Tous les risques de perte ou de dommage des VÉHICULES sont transférés au CLIENT 
                au moment où le CLIENT prend physiquement possession de ces VÉHICULES.
              </p>
            </div>
          </section>

          {/* Article 11 - Livraison */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Article 11 - Livraison</h2>
            
            <div className="space-y-4">
              <p>
                <strong>11.1</strong> Après confirmation de la commande et sous réserve du paiement intégral, 
                CAYENNEFIT s'engage à livrer le VÉHICULE selon les modalités convenues au contrat.
              </p>
              
              <p><strong>11.2</strong> Modalités de livraison :</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Remise sur place dans nos locaux à Escaudain</li>
                <li>Livraison à domicile possible (frais supplémentaires)</li>
                <li>Remise de tous les documents (carte grise, certificat de cession, facture)</li>
              </ul>
              
              <p>
                <strong>11.3</strong> CAYENNEFIT ne sera pas responsable des retards de livraison dus à un événement 
                de force majeure, à la faute d'un tiers, ou à une erreur du CLIENT.
              </p>
            </div>
          </section>

          {/* Article 12 - Droit de rétractation */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Article 12 - Droit de Rétractation</h2>
            
            <div className="space-y-4">
              <p>
                <strong>12.1</strong> Conformément à l'article L 221-28 du Code de la consommation, 
                le droit de rétractation ne s'applique pas aux contrats de vente de véhicules automobiles.
              </p>
              
              <p>
                <strong>12.2</strong> Cependant, CAYENNEFIT s'engage à reprendre tout véhicule présentant un vice caché 
                ou une non-conformité substantielle par rapport à la description contractuelle.
              </p>
            </div>
          </section>

          {/* Article 13 - Responsabilités */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Article 13 - Responsabilités</h2>
            
            <div className="space-y-4">
              <p>
                <strong>13.1</strong> CAYENNEFIT décline toute responsabilité en cas d'utilisation illicite 
                ou d'exploitation de tout ou partie du contenu du SITE WEB.
              </p>
              
              <p>
                <strong>13.2</strong> CAYENNEFIT ne pourra être tenu responsable de tout dommage de quelque nature qu'il soit, 
                résultant de l'utilisation du véhicule après livraison, sauf en cas de vice caché avéré.
              </p>
              
              <p>
                <strong>13.3</strong> CAYENNEFIT garantit la conformité de ses VÉHICULES avec les spécifications décrites 
                et ne saurait être responsable de toute utilisation contraire à ces spécifications.
              </p>
              
              <p>
                <strong>13.4</strong> Le CLIENT assume toute responsabilité autre que celle de conformité des VÉHICULES 
                avec les spécifications, et notamment concernant l'adéquation des VÉHICULES à ses besoins 
                et l'utilisation des VÉHICULES.
              </p>
            </div>
          </section>

          {/* Article 14 - Garantie légale */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Article 14 - Garantie Légale</h2>
            
            <div className="space-y-4">
              <p>
                <strong>14.1</strong> Tous les VÉHICULES fournis par CAYENNEFIT sont couverts par la garantie légale 
                relative aux vices cachés prévue par les articles 1641 et suivants du Code civil, 
                valable pendant vingt-quatre (24) mois à compter de la découverte du vice caché.
              </p>
              
              <p>
                <strong>14.2</strong> En cas d'application de la garantie des vices cachés, le CLIENT aura le choix 
                entre la résolution de la vente ou la réduction du prix de vente conformément à l'article 1644 du Code civil.
              </p>
              
              <p>
                <strong>14.3</strong> En cas de non-conformité d'un VÉHICULE vendu, le CLIENT bénéficie de la garantie légale 
                de conformité prévue aux articles L. 211-4 et suivants du Code de la consommation.
              </p>
            </div>
          </section>

          {/* Article 15 - Modification et résiliation */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Article 15 - Modification et Résiliation</h2>
            
            <div className="space-y-4">
              <p>
                <strong>15.1</strong> Ces Conditions Générales prennent effet à compter de leur publication sur le SITE WEB 
                et demeurent en vigueur jusqu'à modification partielle ou totale par CAYENNEFIT.
              </p>

              <p>
                <strong>15.2</strong> CAYENNEFIT se réserve le droit de modifier ces conditions à tout moment. 
                Les nouvelles conditions sont mises à disposition par un e-mail envoyé à tous les CLIENTS.
              </p>
            </div>
          </section>

          {/* Article 16 - Litiges */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Article 16 - Litiges</h2>
            
            <div className="space-y-4">
              <p>
                <strong>16.1</strong> Ces Conditions Générales sont régies par le droit français.
              </p>
              
              <p>
                <strong>16.2</strong> En cas de litiges pouvant survenir concernant la validité, l'interprétation, 
                l'exécution ou la non-exécution des présentes Conditions Générales, les Parties s'efforceront 
                de parvenir à une solution amiable.
              </p>
              
              <p>
                <strong>16.3</strong> Le CLIENT peut consulter la liste des médiateurs de la consommation via le lien suivant :
                <a href="http://www.economie.gouv.fr/mediation-conso/saisir-mediateur" 
                   className="text-blue-600 hover:underline ml-1">
                  http://www.economie.gouv.fr/mediation-conso/saisir-mediateur
                </a>
              </p>
              
              <p>
                <strong>16.4</strong> Plateforme européenne de résolution des litiges :
                <a href="https://webgate.ec.europa.eu/odr/main/?event=main.home.show&lng=FR" 
                   className="text-blue-600 hover:underline ml-1">
                  https://webgate.ec.europa.eu/odr/main/?event=main.home.show&lng=FR
                </a>
              </p>
              
              <p>
                <strong>16.5</strong> Tout litige entre les Parties découlant de l'interprétation ou de l'exécution 
                des présentes Conditions Générales sera porté devant les tribunaux compétents.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact</h2>
            
            <p className="mb-4">
              Pour toute question relative aux présentes conditions générales de vente, vous pouvez nous contacter :
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="mb-2"><strong>Email :</strong> contact@cayennefit.fr</p>
                <p className="mb-2"><strong>Téléphone :</strong> +33 1 XX XX XX XX</p>
              </div>
              <div>
                <p className="mb-2"><strong>Adresse :</strong> 14 bis rue du Bouchain, 59124 Escaudain</p>
                <p><strong>Horaires :</strong> Lundi au vendredi, 9h-18h</p>
              </div>
            </div>
          </section>

          <p className="text-sm text-gray-600 mt-12 pt-8 border-t">
            <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR')}
          </p>

        </div>
      </div>
    </div>
  );
} 
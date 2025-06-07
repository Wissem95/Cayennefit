import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: "Véhicules d'occasion", href: "#discover" },
      { name: "Pièces détachées", href: "#services" },
      { name: "Expertise véhicule", href: "#expertise" },
      { name: "Dépôt-vente", href: "#services" }
    ],
    company: [
      { name: "À propos", href: "#about" },
      { name: "Notre expertise", href: "#expertise" },
      { name: "Contact", href: "#contact" },
      { name: "Actualités", href: "#news" }
    ],
    support: [
      { name: "Centre d'aide", href: "#help" },
      { name: "Garanties", href: "#warranty" },
      { name: "Financement", href: "#financing" },
      { name: "Livraison", href: "#delivery" }
    ]
  };

  const socialLinks = [
    {
      name: "Facebook",
      href: "#",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      name: "Instagram",
      href: "#",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12.017 0C8.396 0 7.932.013 6.714.06 5.499.107 4.677.252 3.963.472a5.962 5.962 0 0 0-2.197 1.294A5.979 5.979 0 0 0 .472 3.963C.252 4.677.107 5.5.06 6.714.013 7.932 0 8.396 0 12.017c0 3.624.013 4.09.06 5.303.047 1.216.192 2.039.412 2.753a5.98 5.98 0 0 0 1.294 2.197A5.996 5.996 0 0 0 3.963 23.528c.714.22 1.537.365 2.753.412 1.218.047 1.682.06 5.303.06 3.624 0 4.09-.013 5.303-.06 1.216-.047 2.039-.192 2.753-.412a5.89 5.89 0 0 0 2.197-1.294 5.958 5.958 0 0 0 1.294-2.197c.22-.714.365-1.537.412-2.753.047-1.218.06-1.682.06-5.303 0-3.624-.013-4.09-.06-5.303-.047-1.216-.192-2.039-.412-2.753a5.89 5.89 0 0 0-1.294-2.197A5.958 5.958 0 0 0 20.753.472c-.714-.22-1.537-.365-2.753-.412C16.782.013 16.318 0 12.017 0zm0 2.17c3.556 0 3.971.01 5.375.058 1.296.059 2.001.27 2.47.448.621.242 1.065.531 1.532.998.467.467.756.911.998 1.532.178.469.389 1.174.448 2.47.048 1.404.058 1.819.058 5.375 0 3.556-.01 3.971-.058 5.375-.059 1.296-.27 2.001-.448 2.47-.242.621-.531 1.065-.998 1.532a4.127 4.127 0 0 1-1.532.998c-.469.178-1.174.389-2.47.448-1.404.048-1.819.058-5.375.058-3.556 0-3.971-.01-5.375-.058-1.296-.059-2.001-.27-2.47-.448a4.127 4.127 0 0 1-1.532-.998 4.127 4.127 0 0 1-.998-1.532c-.178-.469-.389-1.174-.448-2.47C2.18 15.988 2.17 15.573 2.17 12.017c0-3.556.01-3.971.058-5.375.059-1.296.27-2.001.448-2.47.242-.621.531-1.065.998-1.532a4.127 4.127 0 0 1 1.532-.998c.469-.178 1.174-.389 2.47-.448C8.046 2.18 8.461 2.17 12.017 2.17z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      name: "LinkedIn",
      href: "#",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" clipRule="evenodd" />
        </svg>
      )
    }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-gray-50 to-white border-t border-gray-200/50">
      {/* Décoration d'arrière-plan */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-px h-16 bg-gradient-to-b from-gray-300 to-transparent"></div>
        <div className="absolute top-0 right-1/4 w-px h-16 bg-gradient-to-b from-gray-300 to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section principale */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Branding et description */}
            <div className="lg:col-span-4 space-y-6">
              <div>
                <h3 className="text-2xl font-light text-gray-900 tracking-[0.2em] mb-4">
                    CAYENNEFIT
                </h3>
                <p className="text-gray-600 font-light leading-relaxed max-w-md">
                  Spécialiste des véhicules d'exception Porsche Cayenne. 
                  Expertise, qualité et service premium depuis plus de 8 ans.
                </p>
              </div>

              {/* Contact rapide */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span className="font-light text-sm">contact@cayennefit.fr</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <span className="font-light text-sm">+33 1 XX XX XX XX</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                  <span className="font-light text-sm">Du lundi au vendredi, 9h-18h</span>
                </div>
              </div>

              {/* Réseaux sociaux */}
              <div className="pt-4">
                <p className="text-gray-600 font-medium text-sm tracking-wider uppercase mb-4">
                  Suivez-nous
                </p>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      className="group w-10 h-10 bg-white rounded-xl border border-gray-200/50 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:border-gray-300 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Liens de navigation */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              
              {/* Services */}
              <div>
                <h4 className="text-gray-900 font-medium text-sm tracking-wider uppercase mb-6">
                  Services
                </h4>
                <ul className="space-y-3">
                  {footerLinks.services.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-gray-600 font-light hover:text-gray-900 transition-colors duration-300 text-sm flex items-center gap-2 group"
                      >
                        <div className="w-1 h-1 bg-gray-400 rounded-full flex-shrink-0 group-hover:bg-gray-700 transition-colors duration-300"></div>
                        {link.name}
                      </a>
                    </li>
                            ))}
                </ul>
                        </div>

              {/* Entreprise */}
              <div>
                <h4 className="text-gray-900 font-medium text-sm tracking-wider uppercase mb-6">
                  Entreprise
                </h4>
                <ul className="space-y-3">
                  {footerLinks.company.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-gray-600 font-light hover:text-gray-900 transition-colors duration-300 text-sm flex items-center gap-2 group"
                      >
                        <div className="w-1 h-1 bg-gray-400 rounded-full flex-shrink-0 group-hover:bg-gray-700 transition-colors duration-300"></div>
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
                    </div>

              {/* Support */}
              <div>
                <h4 className="text-gray-900 font-medium text-sm tracking-wider uppercase mb-6">
                  Support
                </h4>
                <ul className="space-y-3">
                  {footerLinks.support.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-gray-600 font-light hover:text-gray-900 transition-colors duration-300 text-sm flex items-center gap-2 group"
                      >
                        <div className="w-1 h-1 bg-gray-400 rounded-full flex-shrink-0 group-hover:bg-gray-700 transition-colors duration-300"></div>
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            </div>
        </div>

        {/* Section copyright */}
        <div className="border-t border-gray-200/50 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4 text-gray-600 font-light text-sm">
              <p>© {currentYear} CAYENNEFIT. Tous droits réservés.</p>
              <div className="hidden md:block w-px h-4 bg-gray-300"></div>
              <div className="flex gap-6">
                <a href="#" className="hover:text-gray-900 transition-colors duration-300">
                  Mentions légales
                </a>
                <a href="#" className="hover:text-gray-900 transition-colors duration-300">
                  Confidentialité
                </a>
                <a href="#" className="hover:text-gray-900 transition-colors duration-300">
                  CGV
                </a>
              </div>
            </div>
            
            {/* Badge qualité */}
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-green-50 rounded-lg flex items-center justify-center border border-green-200/50">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <span className="font-light">Certifié qualité</span>
            </div>
          </div>
            </div>
        </div>
    </footer>
);
};

export default Footer;

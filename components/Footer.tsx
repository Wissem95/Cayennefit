import Image from "next/image";
import Link from "next/link";

import { footerLinks } from "@constants";

const Footer = () => (
    <footer className='flex flex-col text-gray-900 mt-5 border-t border-gray-200 bg-gradient-to-br from-white via-gray-50 to-gray-100'>
        <div className='flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 py-10'>
            <div className='flex flex-col justify-start items-start gap-6'>
                <div className="text-black font-light text-2xl tracking-[0.3em]">
                    CAYENNEFIT
                </div>
                <p className='text-base text-gray-600 font-light leading-relaxed'>
                    CAYENNEFIT 2024 <br />
                    Collection automobile d'exception &copy;
                </p>
            </div>

            <div className="footer__links">
                {footerLinks.map((item) => (
                    <div key={item.title} className="footer__link">
                        <h3 className="font-medium text-gray-900 tracking-wide mb-4">{item.title}</h3>
                        <div className="flex flex-col gap-3">
                            {item.links.map((link) => (
                                <Link
                                    key={link.title}
                                    href={link.url}
                                    className="text-gray-600 hover:text-black font-light tracking-wide transition-colors duration-300"
                                >
                                    {link.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div className='flex justify-between items-center flex-wrap mt-10 border-t border-gray-200 sm:px-16 px-6 py-10'>
            <p className="text-gray-600 font-light tracking-wide">@2024 CAYENNEFIT. Tous droits réservés</p>

            <div className="footer__copyrights-link">
                <Link href="/" className="text-gray-500 hover:text-gray-900 font-light tracking-wide transition-colors duration-300">
                    Politique de confidentialité
                </Link>
                <Link href="/" className="text-gray-500 hover:text-gray-900 font-light tracking-wide transition-colors duration-300">
                    Conditions générales
                </Link>
            </div>
        </div>
    </footer>
);

export default Footer;

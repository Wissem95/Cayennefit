"use client";
import Link from "next/link";
import { usePathname } from 'next/navigation';

const NavBar = () => {
    const pathname = usePathname();
    const isAdminPage = pathname === '/admin';

    return (
        <header className='w-full absolute z-20'>
            <nav className='max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-6 bg-transparent'>
                {/* Navigation avec icône maison - toujours visible */}
                <div className="flex items-center space-x-6">
                    <Link href='/' className='flex items-center justify-center group p-2 hover:bg-white/10 rounded-full transition-all duration-300'>
                        <svg className={`w-6 h-6 group-hover:text-gray-300 transition-colors ${isAdminPage ? 'text-gray-600' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                        </svg>
                    </Link>
                </div>

                {/* Logo CAYENNEFIT centré - masqué sur admin */}
                {!isAdminPage && (
                    <Link href='/' className='flex justify-center items-center group absolute left-1/2 transform -translate-x-1/2'>
                        <div className="text-white font-light text-2xl tracking-[0.3em] hover:tracking-[0.4em] transition-all duration-300">
                            CAYENNEFIT
                        </div>
                    </Link>
                )}

                {/* Espace vide pour équilibrer */}
                <div className="w-10"></div>
            </nav>
        </header>
    );
};

export default NavBar;

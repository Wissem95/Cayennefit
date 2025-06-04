"use client";
import Link from "next/link";
import { usePathname } from 'next/navigation';

const NavBar = () => {
    const pathname = usePathname();
    const isAdminPage = pathname === '/admin';

    return (
        <header className='w-full absolute z-20'>
            <nav className='max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-6 bg-transparent'>
                {/* Logo CAYENNEFIT centré - masqué sur admin */}
                {!isAdminPage && (
                    <Link href='/' className='flex justify-center items-center group absolute left-1/2 transform -translate-x-1/2'>
                        <div className="text-white font-light text-2xl tracking-[0.3em] hover:tracking-[0.4em] transition-all duration-300">
                            CAYENNEFIT
                        </div>
                    </Link>
                )}
            </nav>
        </header>
    );
};

export default NavBar;

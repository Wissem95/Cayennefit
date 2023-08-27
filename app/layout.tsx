import "./globals.css";

import { Footer, NavBar } from "@components";

export const metadata = {
    title: "ShopYourCar",
    description: "Discover world's best car showcase application",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
        <body className='relative bg-black-100'>
        <NavBar />
        {children}
        <Footer />
        </body>
        </html>
    );
}

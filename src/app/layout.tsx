import Footer from '@/component/footer/footer';
import Header from '@/component/header/header';
import type {Metadata} from 'next';
import {Geist} from 'next/font/google';
import React from 'react';
import './globals.scss';

const fontGeist = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'JIFLabs',
    description: 'You wont get any more JIF anywhere else!',
};

export default function RootLayout(
    {children}: Readonly<{ children: React.ReactNode; }>,
) {
    return (
        <html lang="de">
        <body className={`${fontGeist.variable}`}>
        <Header/>
        {children}
        <Footer/>
        </body>
        </html>
    );
}

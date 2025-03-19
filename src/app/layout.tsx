import Footer from "@/component/footer/footer";
import Header from "@/component/header/header";
import type {Metadata} from "next";
import {Geist} from "next/font/google";
import React from "react";
import "./globals.scss";

const fontGeist = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: {
        template: "JIFLabs | %s",
        default: "JIFLabs",
    },
    authors: [{name: "Felix Schreiber"}],
    creator: "Felix Schreiber",
    generator: "Next.js",
    keywords: ["jif", "jiflabs", "jiflabsde"],
    description: "Die offizielle JIFLabs Website",
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

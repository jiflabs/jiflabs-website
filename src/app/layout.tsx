import Footer from "@/component/footer/footer";
import Header from "@/component/header/header";
import {config} from "@fortawesome/fontawesome-svg-core";
import type {Metadata} from "next";
import {Fira_Code, Geist} from "next/font/google";
import React from "react";
import "./globals.scss";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

const fontGeist = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin", "latin-ext"],
});

const fontFira = Fira_Code({
    variable: "--font-fira-code",
    subsets: ["latin", "latin-ext"],
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
        <body className={`${fontGeist.variable} ${fontFira.variable}`}>
        <Header/>
        {children}
        <Footer/>
        </body>
        </html>
    );
}

import Footer from "@/component/footer/footer";
import Header from "@/component/header/header";

import {config} from "@fortawesome/fontawesome-svg-core";
import {faWarning} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import type {Metadata} from "next";
import {Fira_Code, Fira_Sans} from "next/font/google";

import type {ReactNode} from "react";

import "./globals.scss";

import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

const fontFiraCode = Fira_Code({
    variable: "--font-fira-code",
    subsets: ["latin", "latin-ext"],
});

const fontFiraSans = Fira_Sans({
    variable: "--font-fira-sans",
    subsets: ["latin", "latin-ext"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
    title: {
        template: "JIFLabs | %s",
        default: "JIFLabs",
    },
    authors: [{name: "Felix Schreiber"}],
    creator: "Felix Schreiber",
    generator: "Next.js",
    keywords: ["jif", "jiflabs", "jiflabsde", "robotics", "robot"],
};

export default async function Layout(
    {children}: Readonly<{ children: ReactNode }>,
) {
    return (
        <html lang="de">
        <body className={`${fontFiraSans.className} ${fontFiraCode.variable}`}>
        <Header/>
        <div className="wip-banner">
            <FontAwesomeIcon icon={faWarning} size="2xl"/>
            <span>Warnung: diese Webseite ist noch in Entwicklung, sprich wichtige Information wie die Datenschutzerklärung und das Impressum können unter Umständen noch fehlerhaft oder unvollständig sein.</span>
        </div>
        {children}
        <Footer/>
        </body>
        </html>
    );
}

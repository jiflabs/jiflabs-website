"use client";

import {faBars, faClose} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Link from "next/link";

import {useState} from "react";

import styles from "./header.module.scss";
import {ReactSVG} from "react-svg";

export default function Header() {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <header className={`${styles.header}`}>
            <Link href="/" className={styles.home}>
                <ReactSVG src="/favicon.svg" className={styles.home}/>
                Startseite
            </Link>
            <nav className={`${styles.right} ${open ? styles.open : ""}`}>
                <button onClick={() => setOpen(o => !o)} title="Menü umschalten">
                    <FontAwesomeIcon icon={open ? faClose : faBars} size="xl"/>
                </button>
                <ul>
                    <li><Link href="/about">Über Uns</Link></li>
                    <li><Link href="/blog">Blog</Link></li>
                    <li><Link href="/login">Login</Link></li>
                </ul>
            </nav>
        </header>
    );
}
"use client";

import icon from "@/app/favicon.ico";

import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";
import styles from "./header.module.scss";

export default function Header() {
    const [open, setOpen] = useState(false);
    const [menuIcon, setMenuIcon] = useState("");

    useEffect(() => {
        fetch(open ? "/close.svg" : "/menu.svg")
            .then(res => res.text())
            .then(setMenuIcon);
    }, [open]);

    return (
        <header className={`${styles.header} ${open ? styles.open : styles.close}`}>
            <Link href="/" className={styles.home}>
                <Image src={icon} alt="" className={styles.home}/>
                Startseite
            </Link>
            <div className={`${styles.right} ${open ? styles.open : styles.close}`}>
                <div>
                    <button onClick={() => setOpen(o => !o)} title="Menü umschalten">
                        <div dangerouslySetInnerHTML={{__html: menuIcon}}/>
                    </button>
                </div>
                <nav>
                    <ul>
                        <li><Link href="/about">Über JIF</Link></li>
                        <li><Link href="/blog">Blog</Link></li>
                        <li><Link href="/login">Login</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
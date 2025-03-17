"use client";

import icon from "@/app/favicon.ico";
import MenuIconClose from "@/asset/close.svg";

import MenuIconOpen from "@/asset/menu.svg";

import Image from "next/image";
import Link from "next/link";
import {useState} from "react";
import styles from "./header.module.scss";

export default function Header() {
    const [open, setOpen] = useState(false);

    return (
        <header className={`${styles.header} ${open ? styles.open : styles.close}`}>
            <Link href="/" className={styles.home}>
                <Image src={icon} alt="Start-Icon" className={styles.home}/>
                Startseite
            </Link>
            <div className={`${styles.right} ${open ? styles.open : styles.close}`}>
                <div>
                    <button onClick={() => setOpen(o => !o)}>
                        <Image src={open ? MenuIconClose : MenuIconOpen} alt="Menü-Icon"/>
                    </button>
                </div>
                <ul>
                    <li><Link href="/about">Über JIF</Link></li>
                    <li><Link href="/blog">Blog</Link></li>
                    <li><Link href="/login">Login</Link></li>
                </ul>
            </div>
        </header>
    );
}
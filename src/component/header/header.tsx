"use client";

import favicon from "@/asset/favicon.svg";

import {faBars, faClose} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import Image from "next/image";
import Link from "next/link";

import {useState} from "react";

import styles from "./header.module.scss";

export default function Header() {
    const [open, setOpen] = useState(false);

    return (
        <header className={`${styles.header}`}>
            <Link href="/" className={styles.home}>
                <Image src={favicon} alt="" className={styles.home} priority quality={100}/>
                Startseite
            </Link>
            <div className={`${styles.right} ${open ? styles.open : styles.close}`}>
                <div>
                    <button onClick={() => setOpen(o => !o)} title="Menü umschalten">
                        <FontAwesomeIcon icon={open ? faClose : faBars} size="xl"/>
                    </button>
                </div>
                <nav>
                    <ul>
                        <li><Link href="/about">Über Uns</Link></li>
                        <li><Link href="/blog">Blog</Link></li>
                        <li><Link href="/login">Login</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
import Link from "next/link";

import styles from "./footer.module.scss";

export default async function Footer() {
    return (
        <footer className={styles.footer}>
            <section className={styles.links}>
                <p>Essentiell</p>
                <nav>
                    <ul>
                        <li><Link href="/imprint">Impressum</Link></li>
                        <li><Link href="/privacy">Datenschutzerklärung</Link></li>
                        <li><Link href="/">&copy; jiflabs.de 2025</Link></li>
                    </ul>
                </nav>
            </section>
            <section className={styles.links}>
                <p>Foo</p>
                <nav>
                    <ul>
                        <li><Link href="/editor">Markdown Editor</Link></li>
                        <li><Link href="/">Bar 2</Link></li>
                        <li><Link href="/">Bar 3</Link></li>
                    </ul>
                </nav>
            </section>
            <section className={styles.links}>
                <p>Links</p>
                <nav>
                    <ul>
                        <li><Link href="/">Link 1</Link></li>
                        <li><Link href="/">Link 2</Link></li>
                        <li><Link href="/">Link 3</Link></li>
                    </ul>
                </nav>
            </section>
        </footer>
    );
}
import Link from "next/link";

import styles from "./footer.module.scss";

export default async function Footer() {
    return (
        <footer className={styles.footer}>
            <section className={styles.links}>
                <p>Essentiell</p>
                <nav>
                    <Link href="/imprint">Impressum</Link>
                    <Link href="/privacy">Datenschutzerklärung</Link>
                    <Link href="/">&copy; jiflabs.de 2025</Link>
                </nav>
            </section>
            <section className={styles.links}>
                <p>Foo</p>
                <nav>
                    <Link href="/editor">Markdown Editor</Link>
                    <Link href="/">Bar 2</Link>
                    <Link href="/">Bar 3</Link>
                </nav>
            </section>
            <section className={styles.links}>
                <p>Links</p>
                <nav>
                    <Link href="/">Link 1</Link>
                    <Link href="/">Link 2</Link>
                    <Link href="/">Link 3</Link>
                </nav>
            </section>
        </footer>
    );
}
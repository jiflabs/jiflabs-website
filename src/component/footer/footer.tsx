import Link from 'next/link';
import styles from './footer.module.scss';

export default async function Footer() {
    return (
        <footer className={styles.footer}>
            <section className={styles.essential}>
                <p><Link href={'/imprint'}>Imprint</Link></p>
                <p><Link href={'/privacy'}>Privacy Policy</Link></p>
                <p><Link href={'/'}>&copy; 2025 jiflabs.de</Link></p>
            </section>
            <section className={styles.links}>
                Links
                <nav></nav>
            </section>
        </footer>
    );
}
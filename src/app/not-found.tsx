import Link from "next/link";
import styles from "./not-found.module.scss";

export default async function NotFound() {
    return (
        <main className={styles.container}>
            <div>
                <h1>404</h1>
                <h2>Seite nicht gefunden</h2>
            </div>
            <Link href="/">Zurück zur Startseite</Link>
        </main>
    );
}

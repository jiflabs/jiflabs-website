import Link from "next/link";
import styles from "./not-found.module.scss";

export default async function NotFound() {
    return (
        <main className={styles.container}>
            <div>
                <h1>404</h1>
                <h3>Seite nicht gefunden</h3>
            </div>
            <Link href="/">Zurück zur Startseite</Link>
        </main>
    );
}

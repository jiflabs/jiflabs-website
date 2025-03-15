import Link from 'next/link';
import styles from './not-found.module.scss';

export default async function NotFound() {
    return (
        <main className={styles.container}>
            <div>
                <h1>404</h1>
                <h3>Page Not Found</h3>
            </div>
            <Link href={'/'}>Go Back</Link>
        </main>
    );
}

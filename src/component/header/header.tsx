import icon from '@/app/favicon.ico';
import Image from 'next/image';
import Link from 'next/link';
import styles from './header.module.scss';

export default async function Header() {
    return (
        <header className={styles.header}>
            <nav>
                <Link href="/"><Image src={icon} alt={'home icon'}/>Home</Link>
                <ul>
                    <li><Link href={'/about'}>About</Link></li>
                    <li><Link href={'/blog'}>Blog</Link></li>
                    <li><Link href={'/login'}>Login</Link></li>
                </ul>
            </nav>
        </header>
    );
}
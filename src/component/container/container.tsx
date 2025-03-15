import React from 'react';
import styles from './container.module.scss';

export default async function Container({children, className}: React.PropsWithChildren<{ className?: string }>) {
    return <main className={`${styles.container} ${className ?? ''}`}>{children}</main>;
}

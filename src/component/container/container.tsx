import React from 'react';
import styles from './container.module.scss';

type Props = {
    as?: keyof React.JSX.IntrinsicElements,
    children?: React.ReactNode,
    className?: string,
}

export default async function Container({as = 'section', children, className, ...props}: Props) {
    const ComponentType = as;
    return <ComponentType className={`${styles.container} ${className ?? ''}`} {...props}>{children}</ComponentType>;
}

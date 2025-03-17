import React from "react";
import styles from "./container.module.scss";

type Props = {
    slim?: boolean;
    as?: keyof React.JSX.IntrinsicElements,
    children?: React.ReactNode,
    className?: string,
}

export default async function Container({slim = false, as = "section", children, className, ...props}: Props) {
    const ComponentType = as;
    return (
        <ComponentType className={`${styles.container} ${slim ? styles.slim : ""} ${className ?? ""}`}
                       {...props}>
            {children}
        </ComponentType>
    );
}

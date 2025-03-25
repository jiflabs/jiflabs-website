import {ComponentPropsWithRef, ElementType} from "react";

import styles from "./container.module.scss";

type Props<E extends ElementType> = {
    as: E,
    slim?: boolean;
    full?: boolean;
} & ComponentPropsWithRef<E>

export default async function Container<E extends ElementType>(
    {
        as: Component,
        slim,
        full,
        className,
        ...props
    }: Props<E>,
) {
    return <Component
        className={`${styles.container} ${slim ? styles.slim : ""} ${full ? styles.full : ""} ${className ?? ""}`}
        {...props}/>;
}

export const Main = async (
    props: Omit<Props<"main">, "as">,
) => <Container<"main"> as="main" {...props}/>;

export const Section = async (
    props: Omit<Props<"section">, "as">,
) => <Container<"section"> as="section" {...props}/>;

export const Div = async (
    props: Omit<Props<"div">, "as">,
) => <Container<"div"> as="div" {...props}/>;

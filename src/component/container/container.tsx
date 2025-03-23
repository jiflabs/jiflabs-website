import {ComponentPropsWithRef, ElementType} from "react";
import styles from "./container.module.scss";

type Props<E extends ElementType> = {
    as: E,
    slim?: boolean;
} & ComponentPropsWithRef<E>

export default async function Container<E extends ElementType>(
    {
        as: Component,
        slim,
        className,
        ...props
    }: Props<E>,
) {
    return <Component className={`${styles.container} ${slim ? styles.slim : ""} ${className ?? ""}`} {...props}/>;
}

export const Main = async (
    {slim, ...props}: Omit<Props<"main">, "as">,
) => <Container<"main"> as="main" slim={slim} {...props}/>;

export const Section = async (
    {slim, ...props}: Omit<Props<"section">, "as">,
) => <Container<"section"> as="section" slim={slim} {...props}/>;

export const Div = async (
    {slim, ...props}: Omit<Props<"div">, "as">,
) => <Container<"div"> as="div" slim={slim} {...props}/>;

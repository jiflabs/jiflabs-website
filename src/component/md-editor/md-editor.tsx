"use client";

import {ChangeEventHandler, DetailedHTMLProps, InputHTMLAttributes, ReactNode, useActionState, useState} from "react";
import Markdown from "react-markdown";

import styles from "./md-editor.module.scss";

type InputProps = {
    children?: ReactNode,
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

function Input({children, ...props}: InputProps) {
    return (
        <label>
            <strong>{children}</strong>
            <input {...props}/>
        </label>
    );
}

type Status = { success: boolean, message?: string }

export default function MDEditor() {

    //
    // Example:
    //  # Header 1
    //  ## Header 2
    //
    //  Hello World from **Markdown**!
    //
    //  ## Another Header 2
    //  ### Header 3
    //  #### Header 4
    //  ##### Header 5
    //  ###### Header 6
    //
    //  Some more *example* text.
    //
    //  ![the page favicon](/favicon.ico)
    //

    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState<string>();

    const [status, action] = useActionState<Status | undefined, FormData>(async (status, data) => {
        console.log("state", status);
        console.log("data", data);

        data.append("date", new Date().toISOString());

        setContent(undefined);
        setIsEditing(false);

        return {success: true};
    }, undefined);

    const handleChange: ChangeEventHandler<HTMLTextAreaElement> = ({currentTarget}) => {
        if (isEditing)
            return;
        setIsEditing(true);
        setTimeout(() => {
            setContent(currentTarget.value);
            setIsEditing(false);
        }, 1000);
    };

    return (
        <div className={styles.wrapper}>
            <section className={styles.editor}>
                <form action={action}>
                    <Input type="text" name="title" placeholder="Seitentitel..." required>Titel</Input>
                    <Input type="text" name="tags" placeholder="Schlagwörter..." required>Tags</Input>
                    <Input type="text" name="category" placeholder="Kategorie..." required>Kategorie</Input>
                    <textarea onChange={handleChange}
                              name="content"
                              placeholder="Inhalt..."
                              required/>
                    <div className={styles.submit}>
                        <button type="submit">Erstellen</button>
                        {status && (
                            <p>
                                {status.success
                                    ? "Seite erfolgreich erstellt!"
                                    : `Fehler beim erstellen der Seite: ${status.message}`}
                            </p>
                        )}
                    </div>
                </form>
            </section>
            <section className={styles.preview}>
                {content && <Markdown>{content}</Markdown>}
            </section>
        </div>
    );
}

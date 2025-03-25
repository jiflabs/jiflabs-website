"use client";

import {Main} from "@/component/container/client-container";
import {readBase64} from "@/util/file";
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
            {props.type === "file" ? <span>Dateien auswählen</span> : undefined}
            <input {...props}/>
        </label>
    );
}

export type Status = {
    success: boolean,
    message?: string,
}

export type Image = {
    key: string,
    name: string,
    value: string,
}

export type Data = {
    title: string,
    tags: string[],
    category: string,
    content: string,
    date: Date,
    images: Image[],
}

type Props = {
    onSubmit: (data: Data) => Promise<Status>;
}

export default function MDEditor({onSubmit}: Props) {

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

    // <backend>/resources/blob/<id>
    // ![...](@ilian) -> ![...](<backend>/resources/blob/<id of ilian>)

    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState<string>();
    const [images, setImages] = useState<Image[]>([]);

    const [status, action] = useActionState<Status | undefined, FormData>(async (status, formData) => {
        const data: Data = {
            title: formData.get("title") as string,
            tags: (formData.get("tags") as string).split(/\s+/),
            category: formData.get("category") as string,
            content: formData.get("content") as string,
            date: new Date(),
            images,
        };

        const result = await onSubmit(data);
        if (result.success) {
            setContent(undefined);
            setIsEditing(false);
            setImages([]);
        }

        return result;
    }, undefined);

    const handleContentChange: ChangeEventHandler<HTMLTextAreaElement> = ({currentTarget}) => {
        if (isEditing)
            return;
        setIsEditing(true);
        setTimeout(() => {
            setContent(currentTarget.value);
            setIsEditing(false);
        }, 1000);
    };

    const handleImagesChange: ChangeEventHandler<HTMLInputElement> = ({currentTarget}) => {
        const files = currentTarget.files;
        if (!files) return;
        for (let i = 0; i < files.length; ++i) {
            const file = files[i];
            readBase64(file).then(value => setImages(images => Array.from(new Set([
                ...images,
                {
                    key: file.name,
                    name: file.name,
                    value,
                },
            ]))));
        }
    };

    return (
        <div className={styles.wrapper}>
            <section className={styles.editor}>
                <form action={action}>
                    <Input type="text" name="title" placeholder="Seitentitel..." required>Titel</Input>
                    <Input type="text" name="tags" placeholder="Schlagwörter..." required>Tags</Input>
                    <Input type="text" name="category" placeholder="Kategorie..." required>Kategorie</Input>
                    <Input type="file" multiple accept="image/*" onChange={handleImagesChange}>Bilder</Input>
                    {images.length ? <ul className={styles.fileExtra}>
                        {images.map(({key, name}, index) => <li key={key}>
                            <input type="text" defaultValue={name} onChange={({currentTarget}) => {
                                setImages(images => {
                                    images[index].name = currentTarget.value;
                                    return images;
                                });
                            }}/>
                        </li>)}
                    </ul> : undefined}
                    <textarea onChange={handleContentChange}
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
                <Main full>
                    <Markdown urlTransform={url => {
                        if (!url.trim())
                            return null;
                        if (url.startsWith("@") && url.length > 1) {
                            const key = url.slice(1);
                            return images.find(({name}) => name === key)?.value;
                        }
                        return url;
                    }} skipHtml>
                        {content}
                    </Markdown>
                </Main>
            </section>
        </div>
    );
}

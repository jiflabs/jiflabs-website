"use client";

import {Main} from "@/component/container/client-container";
import {readBase64} from "@/util/file";
import {faTrashCan} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Highlight from "highlight.js";
import {
    ChangeEventHandler,
    DetailedHTMLProps,
    FormEventHandler,
    InputHTMLAttributes,
    ReactNode,
    useEffect,
    useState,
} from "react";
import Markdown from "react-markdown";
import "highlight.js/styles/github-dark.css";

import styles from "./md-editor.module.scss";

type InputProps = {
    children?: ReactNode,
    message?: ReactNode,
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

function Input({children, message, ...props}: InputProps) {
    return (
        <label>
            <strong>{children}</strong>
            {message ? <span>{message}</span> : undefined}
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

export default function MDEditor({onSubmitAction}: { onSubmitAction: (data: Data) => Promise<Status> }) {

    const [status, setStatus] = useState<Status | null | undefined>();
    const [title, setTitle] = useState<string>("");
    const [tags, setTags] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [images, setImages] = useState<Image[]>([]);

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        if (status === null)
            return;

        setStatus(null);

        const data: Data = {
            title,
            tags: tags.split(/\s+/),
            category,
            content,
            date: new Date(),
            images,
        };

        const result = await onSubmitAction(data);
        setStatus(result);
        setTimeout(() => setStatus(undefined), 2000);
    };

    const handleImagesChange: ChangeEventHandler<HTMLInputElement> = ({currentTarget}) => {
        const files = currentTarget.files;
        if (!files) return;
        for (const file of files) {
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

    useEffect(() => {
        Highlight.highlightAll();

        return () => {
            [...document.getElementsByTagName("code")]
                .forEach(code => code.removeAttribute("data-highlighted"));
        };
    }, [content]);

    return (
        <div className={styles.wrapper}>
            <section className={styles.editor}>
                <form onSubmit={handleSubmit}>
                    <Input type="text"
                           placeholder="Titel"
                           required
                           onChange={({currentTarget}) => setTitle(currentTarget.value)}>
                        Titel
                    </Input>
                    <Input type="text"
                           placeholder="Schlagworte"
                           required
                           onChange={({currentTarget}) => setTags(currentTarget.value)}>
                        Tags
                    </Input>
                    <Input type="text"
                           placeholder="Kategorie"
                           required
                           onChange={({currentTarget}) => setCategory(currentTarget.value)}>
                        Kategorie
                    </Input>
                    <Input type="file"
                           message="Dateien anfügen"
                           accept="image/*"
                           multiple
                           onChange={handleImagesChange}>
                        Bilder
                    </Input>
                    {images.length ? <ul className={styles.fileExtra}>
                        {images.map(({key, name}, index) => <li key={key}>
                            <input type="text" defaultValue={name} onChange={({currentTarget}) => {
                                setImages(images => {
                                    images[index].name = currentTarget.value;
                                    return images;
                                });
                            }}/>
                            <button type="button" onClick={() => setImages(images => images
                                .filter((_, i) => i !== index))}>
                                <FontAwesomeIcon icon={faTrashCan}/>
                            </button>
                        </li>)}
                    </ul> : undefined}
                    <textarea spellCheck={false}
                              autoFocus={true}
                              required
                              onChange={({currentTarget}) => setContent(currentTarget.value)}/>
                    <div className={styles.submit}>
                        <button type="submit">Erstellen</button>
                        {status && (
                            <p>
                                {status.success
                                    ? "Seite erfolgreich erstellt."
                                    : `Fehler beim Erstellen der Seite: ${status.message}`}
                            </p>
                        )}
                    </div>
                </form>
            </section>
            <section className={styles.preview}>
                <Main full>
                    <Markdown urlTransform={url => {
                        if (!url.trim()) return undefined;
                        if (!url.startsWith("@")) return url;
                        if (url.length <= 1) return undefined;
                        const key = url.slice(1);
                        return images.find(({name}) => name === key)?.value;
                    }} skipHtml>
                        {content}
                    </Markdown>
                </Main>
            </section>
        </div>
    );
}

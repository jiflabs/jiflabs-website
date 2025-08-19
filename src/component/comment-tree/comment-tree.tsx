"use client";

import {Comment} from "@/content/comment";
import {User} from "@/content/user";
import {formatDate} from "@/util/date";
import {TreeNode} from "@/util/tree";
import {faThumbsUp} from "@fortawesome/free-regular-svg-icons";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useEffect, useState} from "react";
import styles from "./comment-tree.module.scss";

type Props = {
    tree: TreeNode<Comment & { _user: User }>[],
    close?: boolean,
};

export function CommentTree({tree, close}: Readonly<Props>) {

    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        if (close)
            setOpen(false);
    }, [close]);

    if (!tree.length)
        return;

    return (
        <ul className={`${styles.comment_tree} ${close ? styles.close : ""}`}>
            {tree.map(({value, children}) => {
                return (
                    <li key={value.id}>
                        <div className={styles.comment_item}>
                            <span className={styles.user_name}>{value._user.name}</span>
                            <time dateTime={new Date(value.create_date).toISOString()}>
                                {formatDate(value.create_date)}
                            </time>
                            <span>{value.content}</span>
                            <span><FontAwesomeIcon icon={faThumbsUp}/> {value.likes}</span>
                        </div>
                        {children.length ? (
                            <>
                                <button className={styles.toggle}
                                        title="Ebene aufklappen"
                                        onClick={() => setOpen(o => !o)}>
                                    <FontAwesomeIcon icon={open ? faMinus : faPlus}/>
                                </button>
                                <CommentTree tree={children} close={!open}/>
                            </>
                        ) : undefined}
                    </li>
                );
            })}
        </ul>
    );
}
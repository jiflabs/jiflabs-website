import {UUID} from "crypto";

type TreeValueLike = { id: UUID };

export type TreeNode<T extends TreeValueLike> = {
    value: T,
    children: TreeNode<T>[],
}

export function tree<T extends TreeValueLike>(values: T[], parent: keyof T): TreeNode<T>[] {

    const root: TreeNode<T>[] = [];
    const map: Record<string, TreeNode<T>> = {};

    for (const value of values)
        map[value.id] = {value, children: []};

    for (const value of values) {
        const node = map[value.id];

        const parent_id = value[parent] as UUID | null;
        if (parent_id !== null) {
            map[parent_id].children.push(node);
            continue;
        }

        root.push(node);
    }

    return root;
}

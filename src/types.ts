export type Tag = {
    id: number,
    name: string
}

export type Note = {
    id: string,
    title: string,
    content: string,
    createdAt: string,
    updatedAt: string,
    tags: Tag[]
}

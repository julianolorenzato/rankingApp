import { IPostProps, Post } from "../post"

type PostInput = {
    props: IPostProps
    id?: string
    createdAt?: Date
}

export class PostService {
    bulkCreatePost(inputs: PostInput[]) {
        const posts: Post[] = inputs.map(input => {
            const { props, id, createdAt } = input

            return Post.create(props, id, createdAt)
        })

        return posts
    }
}
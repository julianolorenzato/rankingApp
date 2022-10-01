import { Post } from "../post"

export interface IPostRepository {
	save(post: Post): Promise<void>
}
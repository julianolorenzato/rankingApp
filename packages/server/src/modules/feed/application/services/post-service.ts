import { Post } from 'modules/feed/domain/post/post'
import { IPostRepository } from 'modules/feed/domain/post/repository'
import { Poll } from 'modules/social/domain/poll'

interface CreatePostData {
    poll: Poll
}

interface BulkCreatePostData {
    polls: Poll[]
}

export class PostService {
	constructor(private postRepository: IPostRepository) {}
        
    async createPost({ poll }: CreatePostData) {
        const post = Post.create({ type: 'poll', poll })

        await this.postRepository.save(post)

        return post
    }
    
    async bulkCreatePost({ polls }: BulkCreatePostData) {
        const posts: Post[] = []

        for await (const poll of polls) {
            const post = Post.create({ type: 'poll', poll })

            posts.push(post)

            await this.postRepository.save(post)
        }

        return posts
    }
}

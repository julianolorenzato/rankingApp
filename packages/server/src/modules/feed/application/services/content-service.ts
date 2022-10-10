import { Content } from 'modules/feed/domain/content/content'
import { IContentRepository } from 'modules/feed/domain/content/repository'
import { Poll } from 'modules/social/domain/poll'

interface CreateContentInput {
	poll: Poll
}

interface DreateContentInput {
	poll: Poll
}

// interface BulkCreateContentInput {
// 	polls: Poll[]
// }

export class ContentService {
	constructor(private contentRepository: IContentRepository) {}

	async createContent({ poll }: CreateContentInput) {
		const content = Content.create({ type: 'poll', pollId: poll.id })

		await this.contentRepository.save(content)

		return content
	}

	async deleteContent({ poll }: DreateContentInput) {
		await this.contentRepository.deleteByPollId(poll.id)
	}

	// async bulkCreateContent({ polls }: BulkCreateContentInput) {
	// 	const contents: Content[] = []

	// 	for await (const poll of polls) {
	// 		const content = Content.create({ type: 'poll', pollId: poll.id })

	// 		contents.push(content)

	// 		await this.contentRepository.save(content)
	// 	}

	// 	return contents
	// }
}

import { Mapper } from 'shared/contracts/infra/mapper'
import { UnexpectedError } from 'shared/errors/unexpected-error'
import { Option } from '../domain/poll/option'
import { Duration, Poll } from '../domain/poll/poll'
import { PollTitle } from '../domain/poll/poll-title'
import { Vote } from '../domain/poll/vote'
import { IPollDTO } from '../dtos/poll-dto'

interface PersistencePoll {
	id: string
	createdAt: Date
	title: string
	ownerId: string
	pageId: string
	duration: Duration
	options: {
		id: string
		createdAt: Date
		name: string
		votes: {
			id: string
			createdAt: Date
			memberId: string
			optionId: string
			pollId: string
		}[]
	}[]
}

class PollMapperClass implements Mapper<Poll, PersistencePoll, IPollDTO> {
	toDomain(rawData: PersistencePoll): Poll | Error {
		const { title, ownerId, pageId, duration, options, id, createdAt } = rawData

		const titleOrError = PollTitle.create({ value: title })

		if (titleOrError.isLeft()) return new UnexpectedError()

		const poll = Poll.create(
			{
				title: titleOrError.value,
				ownerId,
				pageId,
				duration: duration as Duration,
				options: options.map(
					opt =>
						Option.create(
							{
								name: opt.name,
								votes: opt.votes.map(vt =>
									Vote.create(
										{
											memberId: vt.memberId,
											optionId: vt.optionId,
											pollId: vt.pollId
										},
										vt.id,
										vt.createdAt
									)
								)
							},
							opt.id,
							opt.createdAt
						).value as Option
				)
			},
			id,
			createdAt
		)

		return poll
	}

	toPersistence(entity: Poll): PersistencePoll {
		return {
			id: entity.id,
			createdAt: entity.createdAt,
			title: entity.title.value,
			ownerId: entity.ownerId,
			pageId: entity.pageId,
			duration: entity.duration,
			options: entity.options.map(opt => ({
				id: opt.id,
				createdAt: opt.createdAt,
				name: opt.name,
				votes: opt.votes.map(vt => ({
					id: vt.id,
					createdAt: vt.createdAt,
					memberId: vt.memberId,
					optionId: vt.optionId,
					pollId: vt.pollId
				}))
			}))
		}
	}

	toDTO(entity: Poll): IPollDTO {
		return {
			id: entity.id,
			createdAt: entity.createdAt,
			title: entity.title.value,
			ownerId: entity.ownerId,
			pageId: entity.pageId,
			duration: entity.duration,
			options: entity.options.map(opt => ({
				id: opt.id,
				createdAt: opt.createdAt,
				name: opt.name,
				votes: opt.votes.map(vt => ({
					id: vt.id,
					createdAt: vt.createdAt,
					memberId: vt.memberId,
					optionId: vt.optionId,
					pollId: vt.pollId
				}))
			}))
		}
	}
}

const PollMapper = new PollMapperClass()

export { PollMapper }

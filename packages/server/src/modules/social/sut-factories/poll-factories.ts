import { randomUUID } from 'crypto'
import { Option, IOptionProps } from 'modules/social/domain/poll/option'
import { IVoteProps, Vote } from 'modules/social/domain/poll/vote'
import { IPollProps, Poll } from 'modules/social/domain/poll/poll'
import { IPollTitleProps, PollTitle } from 'modules/social/domain/poll/poll-title'

export namespace PollFactories {
	export const makeVote = (
		{ optionId = randomUUID(), memberId = randomUUID(), pollId = randomUUID() }: Partial<IVoteProps> = {},
		id?: string,
		createdAt?: Date
	) => {
		return Vote.create(
			{
				memberId,
				optionId,
				pollId
			},
			id,
			createdAt
		)
	}

	export const makeOption = (
		{ name = 'Vandal', votes = [] }: Partial<IOptionProps> = {},
		id?: string,
		createdAt?: Date
	) => {
		return Option.create(
			{
				name,
				votes
			},
			id,
			createdAt
		).value as Option
	}

	export const makePollTitle = ({ value = 'Qual a melhor arma do Valorant?' }: Partial<IPollTitleProps> = {}) => {
		return PollTitle.create({
			value
		}).value as PollTitle
	}

	export const makePoll = (
		{
			title = makePollTitle() as PollTitle,
			owner = randomUUID(),
			pageId = randomUUID(),
			duration = {
				type: 'permanent'
			},
			options = []
		}: Partial<IPollProps> = {},
		id?: string,
		createdAt?: Date
	): Poll => {
		return Poll.create(
			{
				title,
				owner,
				pageId,
				duration,
				options
			},
			id,
			createdAt
		)
	}
}

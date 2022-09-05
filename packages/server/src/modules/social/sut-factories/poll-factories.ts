import { randomUUID } from 'crypto'
import { Option, IOptionProps } from 'modules/social/domain/poll/option'
import { IOptionVoteProps, OptionVote } from 'modules/social/domain/poll/option-vote'
import { IPollProps, Poll } from 'modules/social/domain/poll/poll'
import { IPollTitleProps, PollTitle } from 'modules/social/domain/poll/poll-title'

export namespace PollFactories {
	export const makeOptionVote = (
		{ optionId = randomUUID(), owner = randomUUID(), pollId = randomUUID() }: Partial<IOptionVoteProps> = {},
		id?: string,
		createdAt?: Date
	) => {
		return OptionVote.create(
			{
				owner,
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
		).value
	}

	export const makePollTitle = ({ value = 'Qual a melhor arma do Valorant?' }: Partial<IPollTitleProps> = {}) => {
		return PollTitle.create({
			value
		}).value
	}

	export const makePoll = (
		{
			title = makePollTitle() as PollTitle,
			owner = randomUUID(),
			pageId = randomUUID(),
			duration = {
				type: 'permanent'
			},
			options = [makeOption() as Option]
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

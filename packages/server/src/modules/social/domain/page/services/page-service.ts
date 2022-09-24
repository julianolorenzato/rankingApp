import { UnauthorizedError } from 'shared/errors/unauthorized-error'
import { Either, left } from 'shared/logic/either'
import { Member } from '../../member/member'
import { Poll } from '../../poll/poll'
import { Page } from '../page'

export class PageService {
	static followAPage(page: Page, member: Member): Either<Error, void> {
		const pageResult = page.beFollowed(member)
		if (pageResult?.isLeft()) return left(pageResult.value)

		const memberResult = member.followPage(page)
		if (memberResult?.isLeft()) return left(memberResult.value)
	}

	static unfollowAPage(page: Page, member: Member): Either<Error, void> {
		const pageResult = page.beUnfollowed(member)
		if (pageResult?.isLeft()) return left(pageResult.value)

		const memberResult = member.unfollowPage(page)
		if (memberResult?.isLeft()) return left(memberResult.value)
	}

	static removeAPollFromPage(page: Page, poll: Poll, memberId: string): Either<Error, void> {
		if (poll.ownerId !== memberId) {
			return left(new UnauthorizedError())
		}

		const result = page.removePoll(poll)

		if (result?.isLeft()) {
			return left(result.value)
		}
	}
}

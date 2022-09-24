import { PageFactories } from '../../../sut-factories/page-factories'
import { MemberFactories } from '../../../sut-factories/member-factories'
import { PageService } from './page-service'
import { randomUUID } from 'crypto'
import { AlreadyFollowingError } from 'shared/errors/already-following-error'
import { NotFoundError } from 'shared/errors/not-found-error'

describe('Domain Service - page service', () => {
    const { makePage } = PageFactories
    const { makeMember } = MemberFactories

    it('should be able to a member follow a page', () => {
        const page = makePage()
        const member = makeMember()

        PageService.followAPage(page, member)

        expect(page.followerIds[0]).toBe(member.id)
        expect(member.followedPageIds[0]).toBe(page.id)
    })

    it('should not be able to a member that already follow a page follow it again', () => {
        const pageId = randomUUID()
        const memberId = randomUUID()

        const page = makePage({ followerIds: [memberId] }, pageId)
        const member = makeMember({ followedPageIds: [pageId] }, memberId)

        const result = PageService.followAPage(page, member)

        expect(result.value).toBeDefined()
        expect(result.value).toBeInstanceOf(AlreadyFollowingError)
    })

    it('should be able to a member unfollow a page', () => {
        const pageId = randomUUID()
        const memberId = randomUUID()

        const page = makePage({ followerIds: [memberId] }, pageId)
        const member = makeMember({ followedPageIds: [pageId] }, memberId)

        PageService.unfollowAPage(page, member)

        expect(page.followerIds[0]).not.toBeDefined()
        expect(member.followedPageIds[0]).not.toBeDefined()
    })

    it('should not be able to a member that not follow a page unfollow this page', () => {
        const page = makePage()
        const member = makeMember()

        const result = PageService.unfollowAPage(page, member)

        expect(result.value).toBeDefined()
        expect(result.value).toBeInstanceOf(NotFoundError)
    })
})
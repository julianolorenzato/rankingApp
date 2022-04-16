class GetPollsRouter {
    route(httpRequest) {
        return {
            statuscode: 0
        }
    }
}

describe('Get Polls Router', () => {
    it('should return s.c. 204 if no exists polls', () => {
        const sut = new GetPollsRouter()

        expect(sut.route(2).statuscode).toBe(204)
    })
})
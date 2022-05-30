import { inMemoryMembersRepositoryInstance } from "modules/social/repositories/implementations/in-memory-member-repository"
import { GetMemberByUsernameUseCase } from "../get-member-by-username/get-member-by-username-use-case"
import { GetCurrentMemberController } from "./get-current-member-controller"

const getMemberByUsernameUseCase = new GetMemberByUsernameUseCase(inMemoryMembersRepositoryInstance)
const getCurrentMemberController = new GetCurrentMemberController(getMemberByUsernameUseCase)

export { getCurrentMemberController }
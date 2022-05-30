import { createMemberUseCase } from "../use-cases/member/create-member";
import { AfterUserRegistered } from "./after-user-registered";

new AfterUserRegistered(createMemberUseCase)

import { memberService } from "../services/member";
import { createMemberUseCase } from "../use-cases/member/create-member";
import { AfterUserRegistered } from "./after-user-registered";
import { CreateMemberHandler } from "./after-user-registered/create-member-handler";

new CreateMemberHandler(memberService)

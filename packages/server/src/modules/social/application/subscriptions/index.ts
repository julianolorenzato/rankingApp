import { memberService } from '../services/member'
import { AfterUserRegistered } from './after-user-registered'

new AfterUserRegistered(memberService)

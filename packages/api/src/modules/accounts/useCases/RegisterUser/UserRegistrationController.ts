import { userRegistrationUseCase } from "./UserRegistrationUseCase";

export class UserRegistrationController {
    constructor(
        private userRegistrationUseCase: userRegistrationUseCase
    ) {}

    execute(req, res) {
        const { username, email, password } = req.body

        await this.userRegistrationUseCase.execute({
            username,
            email,
            
        })
    }
}
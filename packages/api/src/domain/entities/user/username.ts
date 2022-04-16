import { InvalidUsernameError } from "./errors/invalid-username-error"

export class Username {
    private readonly username
    
    private constructor(username: string) {
        this.username = username
    }

    //validate(email) { either logic... }
    //format(email) { email.trim() }

    static create(username: string) {
        if(username.length > 12) throw new InvalidUsernameError(username)
        
        return new Username(username)
    }
}
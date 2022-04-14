export class Username {
    private readonly username
    
    private constructor(username: string) {
        this.username = username
    }

    //validate(email) { either logic... }
    //format(email) { email.trim() }

    static create(username: string) {
        return new Username(username)
    }
}
export class Email {
    private readonly email
    
    private constructor(email: string) {
        this.email = email
    }

    //validate(email) { either logic... }
    //format(email) { email.trim() }

    static create(email: string) {
        return new Email(email)
    }
}
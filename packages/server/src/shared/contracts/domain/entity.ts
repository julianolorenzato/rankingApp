import { randomUUID } from 'crypto'

export abstract class Entity<T> {
	public readonly id: string
    public readonly createdAt: Date
    protected props: T

	constructor(props: T, id?: string, createdAt?: Date) {
        this.props = props
        this.createdAt = createdAt ?? new Date()
		this.id = id ?? randomUUID()
	}

    public equals(object?: Entity<T>): boolean {
        if(object === null || object === undefined) {
            return false
        }

        if(this === object) {
            return true
        }

        if(!(object instanceof Entity)) {
            return false
        }

        return this.id === object.id
    }
}

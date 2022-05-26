import { randomUUID } from 'crypto'

export abstract class Entity<T> {
	protected _id
    protected _createdAt
    public props

	constructor(props: T, id?: string, createdAt?: Date) {
        this.props = props
        this._createdAt = createdAt ?? new Date()
		this._id = id ?? randomUUID()
	}

    get id() {
        return this._id
    }

    get createdAt() {
        return this._createdAt
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

import { randomUUID } from 'crypto'

export abstract class Entity<T> {
	protected _id
    public props

	constructor(props: T, id?: string) {
        this.props = props
		this._id = id ?? randomUUID()
	}

    get id() {
        return this._id
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

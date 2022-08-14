import { Entity } from '../domain/entity'

export interface Mapper<T extends Entity<any>, rawData, DTO> {
	toDomain(rawData: rawData): T | Error
	toPersistence(entity: T): rawData | Promise<rawData>
	toDTO(entity: T): DTO
}

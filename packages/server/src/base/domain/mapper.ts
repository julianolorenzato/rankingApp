import { Entity } from "./entity";

export interface Mapper<T extends Entity<any>, rawData, DTO> {
    toDomain(rawData: rawData): T
    toPersistence(entity: T): rawData | Promise<rawData>
    toDTO(entity: T): DTO
}
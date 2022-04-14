import { Vote } from '@/domain/entities/vote'

export interface UsersRepository {
	findUserById(id: string): () => Promise<Vote>
}

import { UserEntity } from "../domains/entities/user.entity";

export class StoreHelper {
    public static users: UserEntity[];
    
    public static async Users(): Promise<UserEntity[]> {
        return null;
    }
    public static async User(id: number): Promise<UserEntity> {
        return null;
    }
}

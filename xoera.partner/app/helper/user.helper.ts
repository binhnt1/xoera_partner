import * as jwt from "jsonwebtoken";
import { UserDto } from "../domains/objects/user.dto";
import { UserEntity } from "../domains/entities/user.entity";
import { ConfigHelper } from "../../../mvc/helpers/config.helper";

export class UserHelper {    
    public static GenerateJWT(user: UserDto) {
        const today = new Date();
        const exp = new Date(today);
        exp.setDate(today.getDate() + 60);

        return jwt.sign({
            Email: user.Email,
            UserName: user.UserName,
            exp: exp.getTime() / 1000,
        }, ConfigHelper.SECRET);
    }
    
    public static ToEntity(item: any): UserEntity {
        if (item) {
            const entity: UserEntity = new UserEntity();
            entity.Id = item.Id;
            entity.Email = item.Email;
            entity.Phone = item.Phone;
            entity.SurName = item.SurName;
            entity.UserName = item.UserName;
            entity.IsActive = item.IsActive;            
            entity.Approved = item.Approved;      
            entity.CompanyId = item.CompanyId;
            entity.FirstName = item.FirstName;      
            entity.VertifyCode = item.VertifyCode;            
            entity.PasswordHash = item.PasswordHash;
            return entity;
        }
        return null;
    }
    
    public static ToDto(item: UserEntity): UserDto {
        if (item) {
            const entity: UserDto = new UserDto();
            entity.Id = item.Id;
            entity.Locked = false;
            entity.Email = item.Email;
            entity.Phone = item.Phone;
            entity.SurName = item.SurName;
            entity.UserName = item.UserName;
            entity.IsActive = item.IsActive;
            entity.Approved = item.Approved;      
            entity.FirstName = item.FirstName;
            entity.CompanyId = item.CompanyId;
            return entity;
        }
        return null;
    }

    public static ToEntities(items: any[]): UserEntity[] {
        if (items && items.length > 0) {
            const array: UserEntity[] = [];
            for (let i = 0; i < items.length; i++) {
                const item = UserHelper.ToEntity(items[i]);
                array.push(item);
            }
            return array;
        }
        return null;
    }
}
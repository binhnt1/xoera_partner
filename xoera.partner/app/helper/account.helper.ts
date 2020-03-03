import * as jwt from "jsonwebtoken";
import { ConfigHelper } from "../../../mvc/helpers/config.helper";
import { AccountDto } from "../../../mvc/domains/objects/account.dto";
import { AccountEntity } from "../../../mvc/domains/entities/account.entity";

export class AccountHelper {    
    public static GenerateJWT(user: AccountDto) {
        const today = new Date();
        const exp = new Date(today);
        exp.setDate(today.getDate() + 60);

        return jwt.sign({
            Email: user.Email,
            UserName: user.UserName,
            exp: exp.getTime() / 1000,
        }, ConfigHelper.SECRET);
    }
    
    public static ToEntity(item: any): AccountEntity {
        if (item) {
            const entity: AccountEntity = new AccountEntity();
            entity.Id = item.Id;
            entity.Email = item.Email;
            entity.Phone = item.Phone;
            entity.Avatar = item.Avatar;
            entity.IsAdmin = item.IsAdmin;
            entity.UserName = item.UserName;
            entity.FullName = item.FullName;
            entity.Password = item.Password;
            entity.Description = item.Description;
            return entity;
        }
        return null;
    }
    
    public static ToDto(item: AccountEntity): AccountDto {
        if (item) {
            const entity: AccountDto = new AccountDto();
            entity.Id = item.Id;
            entity.Email = item.Email;
            entity.Phone = item.Phone;
            entity.Avatar = item.Avatar;
            entity.IsAdmin = item.IsAdmin;
            entity.UserName = item.UserName;
            entity.FullName = item.FullName;
            return entity;
        }
        return null;
    }

    public static ToEntities(items: any[]): AccountEntity[] {
        if (items && items.length > 0) {
            const array: AccountEntity[] = [];
            for (let i = 0; i < items.length; i++) {
                const item = AccountHelper.ToEntity(items[i]);
                array.push(item);
            }
            return array;
        }
        return null;
    }
}
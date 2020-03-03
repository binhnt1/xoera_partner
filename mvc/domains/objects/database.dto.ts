import * as _ from 'lodash';
import { TableDto } from './table.dto';
import { DatabaseType } from '../enums/database.type';

export class DatabaseDto {
    Id: number;
    Host: string;
    Port: number;
    Name: string;
    Expand: boolean;
    UserName: string;
    Password: string;
    Tables: TableDto[];
    Type: DatabaseType;
    Description: string;
    
    constructor(id: number, host: string, name: string, userName: string, password: string, port: number = 3306, type: DatabaseType, description: string = '') {
        this.Id = id;
        this.Host = host;
        this.Port = port;
        this.Name = name;
        this.Type = type;
        this.UserName = userName;
        this.Password = password;
        this.Description = description;
    }
}

export const DATABASES = [
    new DatabaseDto(1, '167.179.69.198', 'eva', 'binhnt', 'BinhAnh@134!', 3306, DatabaseType.MySql, 'talkfb.com'),
    new DatabaseDto(2, '54.38.94.124', 'Xoera_partner', 'tower_sql_admin', 'v\\+@6{BM2Y.3UHp9', 3306, DatabaseType.Sql, 'xoera.partner'),
];

import * as _ from 'lodash';
import { DataType } from '../enums/data.type';

export class ColumnDto {
    Name: string;
    Order: number;
    Type: DataType;
    Comment: string;
    DefaultValue: any;
    MaxLength: number;
    PrimaryKey: boolean;
    IsNullable: boolean;
    AutoIncrement: boolean;
}

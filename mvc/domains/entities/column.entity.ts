import * as _ from 'lodash';
import { DataType } from '../enums/data.type';
import { ColumnDto } from '../objects/column.dto';

export class ColumnEntity {
    EXTRA: string;
    DATA_TYPE: string;
    COLUMN_KEY: string;
    COLUMN_DEFAULT: any;
    COLUMN_NAME: string;
    IS_NULLLABLE: string;
    ORDINAL_POSITION: any;
    COLUMN_COMMENT: string;
    CHARACTER_MAXIMUM_LENGTH: any;
}

export class ColumnEntityHelper {
    public static ToEntity(item: ColumnEntity): ColumnDto {
        if (item) {
            const entity: ColumnDto = new ColumnDto();
            entity.Name = item.COLUMN_NAME;
            entity.Comment = item.COLUMN_COMMENT;
            switch (item.DATA_TYPE.toLowerCase()) {
                case 'bit':
                    entity.Type = DataType.Boolean;
                    break;
                case 'int':
                    entity.Type = DataType.Number;
                    break;
                case 'text':
                    entity.Type = DataType.String;
                    break;
                case 'varchar':
                    entity.Type = DataType.String;
                    break;
                case 'date':
                case 'datetime':
                    entity.Type = DataType.DateTime; break;
            }
            entity.DefaultValue = item.COLUMN_DEFAULT;
            entity.Order = parseInt(item.ORDINAL_POSITION || 0);
            entity.MaxLength = parseInt(item.CHARACTER_MAXIMUM_LENGTH || 0);
            entity.AutoIncrement = item.EXTRA && item.EXTRA.toLowerCase() == 'auto_increment';
            entity.PrimaryKey = item.COLUMN_KEY && item.COLUMN_KEY.toLowerCase().indexOf('pri') >= 0;
            entity.IsNullable = item.IS_NULLLABLE && item.IS_NULLLABLE.toLowerCase().indexOf('yes') >= 0;
            return entity;
        }
        return null;
    }

    public static ToEntities(items: ColumnEntity[]): ColumnDto[] {
        if (items && items.length > 0) {
            return _.map(items, (c) => ColumnEntityHelper.ToEntity(c));
        }
        return null;
    }
}

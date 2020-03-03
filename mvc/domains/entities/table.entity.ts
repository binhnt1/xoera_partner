import * as _ from 'lodash';
import { TableDto } from '../objects/table.dto';
import { ObjectExHelper } from '../../decorators/object.decorator';

export class TableEntity {
    TABLE_NAME: string;
    TABLE_ROWS: number;
    DATA_LENGTH: number;
}

export class TableEntityHelper {
    public static ToEntity(item: TableEntity): TableDto {
        if (item) {
            const entity: TableDto = new TableDto();
            entity.Name = item.TABLE_NAME;
            entity.Count = item.TABLE_ROWS;
            entity.Size = item.DATA_LENGTH;
            entity.Label = ObjectExHelper.CreateLabel(entity.Name);
            return entity;
        }
        return null;
    }

    public static ToEntities(items: TableEntity[]): TableDto[] {
        if (items && items.length > 0) {
            return _.map(items, (c) => TableEntityHelper.ToEntity(c));
        }
        return null;
    }
}

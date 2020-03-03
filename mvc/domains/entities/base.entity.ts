import { AlignType } from '../enums/align.type';
import { DateTimeType, NumberType } from '../enums/data.type';
import { NumberDecorator } from '../../decorators/number.decorator';
import { BooleanDecorator } from '../../decorators/boolean.decorator';
import { DropDownDecorator } from '../../decorators/dropdown.decorator';
import { DateTimeDecorator } from '../../decorators/datetime.decorator';

export class BaseEntity {
    @NumberDecorator({ 
        step: 1, 
        order: 0,
        max: 100000000, 
        showInEdit: false,
        type: NumberType.Text, 
        align: AlignType.Center 
    })
    Id?: number;
}

export class BaseExEntity extends BaseEntity {
    @BooleanDecorator({ showInEdit: false, showInGrid: false })
    IsActive?: boolean;

    @BooleanDecorator({ showInEdit: false, showInGrid: false })
    IsDelete?: boolean;

    @DropDownDecorator({ 
        showInEdit: false, 
        showInGrid: false,    
    })
    CreatedBy?: number;

    @DateTimeDecorator({ 
        showInEdit: false, 
        showInGrid: false,
        type: DateTimeType.Date, 
    })
    CreatedDate?: Date;

    @DropDownDecorator({ 
        showInEdit: false,
        showInGrid: false,        
    })
    UpdatedBy?: number;

    @DateTimeDecorator({ 
        showInEdit: false, 
        showInGrid: false,
        type: DateTimeType.Date, 
    })
    UpdatedDate?: Date;
}

import { LicenceEntity } from './licence.entity';
import { BaseExEntity } from '../../../../mvc/domains/entities/base.entity';
import { TableDecorator } from '../../../../mvc/decorators/table.decorator';
import { StringDecorator } from '../../../../mvc/decorators/string.decorator';
import { BooleanDecorator } from '../../../../mvc/decorators/boolean.decorator';
import { DropDownDecorator } from '../../../../mvc/decorators/dropdown.decorator';
import { StringType, DateTimeType, DropDownType } from '../../../../mvc/domains/enums/data.type';
import { DateTimeDecorator, DateTimeFormat } from '../../../../mvc/decorators/datetime.decorator';

@TableDecorator({ name: 'Device' })
export class DeviceEntity extends BaseExEntity {
    @StringDecorator({ required: true, max: 255, type: StringType.Text })
    Name: string;

    @DropDownDecorator({ required: true, reference: LicenceEntity, type: DropDownType.DropdownDevexpress, propertyDisplay: ['Key'] })
    LicenceId: number;

    @StringDecorator({ required: true, max: 25, type: StringType.Text })
    Ip: string;

    @StringDecorator({ required: true, max: 5, type: StringType.Text })
    Port: string;

    @StringDecorator({ required: true, max: 25, type: StringType.Password })
    Password: string;

    @DateTimeDecorator({ min: new Date(), type: DateTimeType.DateTime, format: DateTimeFormat.DMYHM })
    LastLogin: Date;

    @StringDecorator({ max: 255, type: StringType.Text })
    Location: string;

    @BooleanDecorator({ default: true })
    Enabled: boolean;
}

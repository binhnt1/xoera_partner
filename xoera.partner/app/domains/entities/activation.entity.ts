import { LicenceEntity } from './licence.entity';
import { BaseExEntity } from '../../../../mvc/domains/entities/base.entity';
import { TableDecorator } from '../../../../mvc/decorators/table.decorator';
import { StringDecorator } from '../../../../mvc/decorators/string.decorator';
import { BooleanDecorator } from '../../../../mvc/decorators/boolean.decorator';
import { DropDownDecorator } from '../../../../mvc/decorators/dropdown.decorator';
import { StringType, DateTimeType, DropDownType } from '../../../../mvc/domains/enums/data.type';
import { DateTimeDecorator, DateTimeFormat } from '../../../../mvc/decorators/datetime.decorator';

@TableDecorator({ name: 'Activation' })
export class ActivationEntity extends BaseExEntity {
    @StringDecorator({ max: 512, type: StringType.Text })
    ActivationKey: string;

    @DropDownDecorator({ reference: LicenceEntity, type: DropDownType.DropdownDevexpress, propertyDisplay: ['Key'] })
    LicenceId: number;

    @StringDecorator({ max: 256, type: StringType.Text })
    ClientDeviceId: string;

    @BooleanDecorator()
    Enabled: boolean;

    @DateTimeDecorator({ min: new Date(), type: DateTimeType.DateTime, format: DateTimeFormat.DMYHM })
    ActivationDateTime: Date;

    @DateTimeDecorator({ min: new Date(), type: DateTimeType.DateTime, format: DateTimeFormat.DMYHM })
    LastChecked: Date;

    @DateTimeDecorator({ min: new Date(), type: DateTimeType.DateTime, format: DateTimeFormat.DMYHM })
    NextCheck: Date;

    @StringDecorator({ max: 15, type: StringType.Text })
    ClientDeviceIp: string;

    @BooleanDecorator()
    LoginAllowedFromDifferentIp: boolean;
}

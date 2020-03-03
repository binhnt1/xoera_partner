import { LicenceEntity } from './licence.entity';
import { BaseExEntity } from '../../../../mvc/domains/entities/base.entity';
import { TableDecorator } from '../../../../mvc/decorators/table.decorator';
import { StringDecorator } from '../../../../mvc/decorators/string.decorator';
import { DropDownDecorator } from '../../../../mvc/decorators/dropdown.decorator';
import { StringType, DateTimeType, DropDownType } from '../../../../mvc/domains/enums/data.type';
import { DateTimeDecorator, DateTimeFormat } from '../../../../mvc/decorators/datetime.decorator';

@TableDecorator({ name: 'ClientLogin' })
export class ClientLoginEntity extends BaseExEntity {
    @StringDecorator({ max: 255, type: StringType.Account })
    ClientDeviceUserName: string;

    @DateTimeDecorator({ min: new Date(), type: DateTimeType.DateTime, format: DateTimeFormat.DMYHM })
    ClientDeviceDateTime: Date;

    @DateTimeDecorator({ min: new Date(), type: DateTimeType.DateTime, format: DateTimeFormat.DMYHM })
    ServerDateTime: Date;

    @StringDecorator({ max: 15, type: StringType.Text })
    ClientDeviceIp: string;

    @StringDecorator({ max: 255, type: StringType.Text })
    ClientDeviceLocation: string;

    @DropDownDecorator({ reference: LicenceEntity, type: DropDownType.DropdownDevexpress, propertyDisplay: ['Key'] })
    LicenceId: number;
}

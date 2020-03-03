import { CompanyEntity } from './company.entity';
import { BaseExEntity } from '../../../../mvc/domains/entities/base.entity';
import { TableDecorator } from '../../../../mvc/decorators/table.decorator';
import { StringDecorator } from '../../../../mvc/decorators/string.decorator';
import { NumberDecorator } from '../../../../mvc/decorators/number.decorator';
import { DropDownDecorator } from '../../../../mvc/decorators/dropdown.decorator';
import { StringType, DateTimeType, DropDownType } from '../../../../mvc/domains/enums/data.type';
import { DateTimeDecorator, DateTimeFormat } from '../../../../mvc/decorators/datetime.decorator';

@TableDecorator({ name: 'Licence' })
export class LicenceEntity extends BaseExEntity {
    @StringDecorator({ required: true, max: 10, min: 10, type: StringType.AutoGenerate, readonly: true })
    Key: string;

    @DateTimeDecorator({ min: new Date(), type: DateTimeType.DateTime, format: DateTimeFormat.DMYHM })
    ExpiryDate: Date;

    @DropDownDecorator({ reference: CompanyEntity, type: DropDownType.DropdownDevexpress, label: 'Company' })
    CompanyId: number;

    @StringDecorator({ max: 256, type: StringType.Text, label: 'DeviceId' })
    DeviceId: string;

    @NumberDecorator({ step: 1, max: 100000 })
    Type: number;

    @StringDecorator({ max: 55, type: StringType.Text })
    Description: string;

    @StringDecorator({ required: true, max: 256, min: 256, type: StringType.AutoGenerate, showInGrid: false, rows: 3, readonly: true })
    DesktopClientKey: string;
}

import { StringType } from '../../../../mvc/domains/enums/data.type';
import { BaseExEntity } from '../../../../mvc/domains/entities/base.entity';
import { TableDecorator } from '../../../../mvc/decorators/table.decorator';
import { StringDecorator } from '../../../../mvc/decorators/string.decorator';
import { NumberDecorator } from '../../../../mvc/decorators/number.decorator';

@TableDecorator({ name: 'Company' })
export class CompanyEntity extends BaseExEntity {
    @StringDecorator({ exists: true, required: true, max: 45 })
    Name: string;

    @StringDecorator({ max: 160 })
    ContactName: string;

    @NumberDecorator({ step: 0.1, min: -100000, max: 100000, decimals: 6 })
    Lat?: number;

    @NumberDecorator({ step: 0.1, min: -100000, max: 100000, decimals: 6 })
    Lng?: number;

    @StringDecorator({ max: 17, type: StringType.Phone })
    ContactPhone: string;

    @StringDecorator({ max: 160, type: StringType.Email })
    ContactEmail: string;

    @StringDecorator({ max: 160, type: StringType.Text, icon: 'socicon-google' })
    Address: string;
}

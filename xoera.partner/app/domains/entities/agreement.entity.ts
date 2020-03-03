import { BaseExEntity } from '../../../../mvc/domains/entities/base.entity';
import { TableDecorator } from '../../../../mvc/decorators/table.decorator';
import { StringDecorator } from '../../../../mvc/decorators/string.decorator';
import { BooleanDecorator } from '../../../../mvc/decorators/boolean.decorator';
import { StringType, DateTimeType } from '../../../../mvc/domains/enums/data.type';
import { DateTimeDecorator, DateTimeFormat } from '../../../../mvc/decorators/datetime.decorator';

@TableDecorator({ name: 'Agreement' })
export class AgreementEntity extends BaseExEntity {
    @StringDecorator({ required: true, max: 160, type: StringType.Text })
    Name: string;

    @StringDecorator({ required: true, type: StringType.MultiHtml, showInGrid: false })
    Text: string;

    @DateTimeDecorator({ min: new Date(), type: DateTimeType.Date, format: DateTimeFormat.DMY })
    IssueDate: Date;

    @DateTimeDecorator({ min: new Date(), type: DateTimeType.Date, format: DateTimeFormat.DMY })
    EffectiveFrom: Date;

    @DateTimeDecorator({ min: new Date(), type: DateTimeType.Date, format: DateTimeFormat.DMY })
    ExpiryDate: Date;

    @BooleanDecorator({ default: false, showInEdit: false })
    Binding: boolean;
}

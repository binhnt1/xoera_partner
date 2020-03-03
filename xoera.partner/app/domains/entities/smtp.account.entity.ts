import { StringType } from '../../../../mvc/domains/enums/data.type';
import { BaseExEntity } from '../../../../mvc/domains/entities/base.entity';
import { TableDecorator } from '../../../../mvc/decorators/table.decorator';
import { StringDecorator } from '../../../../mvc/decorators/string.decorator';
import { NumberDecorator } from '../../../../mvc/decorators/number.decorator';
import { BooleanDecorator } from '../../../../mvc/decorators/boolean.decorator';

@TableDecorator({ name: 'SmtpAccount' })
export class SmtpAccountEntity extends BaseExEntity {
    @StringDecorator({ max: 80, type: StringType.Text })
    Host: string;

    @StringDecorator({ max: 60, type: StringType.Account })
    UserName: string;

    @StringDecorator({ max: 45, type: StringType.Password, showInGrid: false })
    Password: string;

    @NumberDecorator({ step: 1, max: 10000 })
    Port: string;

    @BooleanDecorator()
    SslEnabled: string;

    @StringDecorator({ max: 60, type: StringType.Account })
    EmailFrom: string;
}

import { BaseExEntity } from '../../../../mvc/domains/entities/base.entity';
import { TableDecorator } from '../../../../mvc/decorators/table.decorator';
import { BooleanDecorator } from '../../../../mvc/decorators/boolean.decorator';

@TableDecorator({ name: 'UserAgreementDto' })
export class UserAgreementDto extends BaseExEntity {
    UserId: number;
    AgreedOn: Date;
    AgreementId: number;

    @BooleanDecorator({ required: true })
    Agreed: boolean;
}

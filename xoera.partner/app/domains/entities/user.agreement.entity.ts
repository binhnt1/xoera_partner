import { UserEntity } from './user.entity';
import { AgreementEntity } from './agreement.entity';
import { BaseExEntity } from '../../../../mvc/domains/entities/base.entity';
import { TableDecorator } from '../../../../mvc/decorators/table.decorator';
import { BooleanDecorator } from '../../../../mvc/decorators/boolean.decorator';
import { DropDownDecorator } from '../../../../mvc/decorators/dropdown.decorator';
import { DateTimeType, DropDownType } from '../../../../mvc/domains/enums/data.type';
import { DateTimeDecorator, DateTimeFormat } from '../../../../mvc/decorators/datetime.decorator';

@TableDecorator({ name: 'UserAgreement' })
export class UserAgreementEntity extends BaseExEntity {
    @DropDownDecorator({ reference: UserEntity, type: DropDownType.DropdownDevexpress, propertyDisplay: ['UserName'] })
    UserId: number;

    @DropDownDecorator({ reference: AgreementEntity, type: DropDownType.DropdownDevexpress, propertyDisplay: ['Name'] })
    AgreementId: number;

    @BooleanDecorator({ default: false, readonly: true })
    Agreed: boolean;

    @DateTimeDecorator({ min: new Date(), default: new Date(), readonly: true, type: DateTimeType.DateTime, format: DateTimeFormat.DMYHM })
    AgreedOn: Date;
}

import { UserEntity } from './user.entity';
import { DropDownType } from '../../../../mvc/domains/enums/data.type';
import { BaseExEntity } from '../../../../mvc/domains/entities/base.entity';
import { TableDecorator } from '../../../../mvc/decorators/table.decorator';
import { AccountEntity } from '../../../../mvc/domains/entities/account.entity';
import { BooleanDecorator } from '../../../../mvc/decorators/boolean.decorator';
import { DropDownDecorator } from '../../../../mvc/decorators/dropdown.decorator';

@TableDecorator({ name: 'Setting' })
export class SettingEntity extends BaseExEntity {
    @DropDownDecorator({ reference: UserEntity, propertyDisplay: ['UserName'], type: DropDownType.DropdownDevexpress, label: 'User' })
    UserId: number;

    @DropDownDecorator({ reference: AccountEntity, propertyDisplay: ['UserName'], type: DropDownType.DropdownDevexpress, label: 'AccountId' })
    AccountId: number;

    @BooleanDecorator({ default: true })
    ReceiveEmailTicket?: boolean;
}

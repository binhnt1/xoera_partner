import { CompanyEntity } from './company.entity';
import { BaseExEntity } from '../../../../mvc/domains/entities/base.entity';
import { TableDecorator } from '../../../../mvc/decorators/table.decorator';
import { StringDecorator } from '../../../../mvc/decorators/string.decorator';
import { BooleanDecorator } from '../../../../mvc/decorators/boolean.decorator';
import { DropDownDecorator } from '../../../../mvc/decorators/dropdown.decorator';
import { StringType, DropDownType } from '../../../../mvc/domains/enums/data.type';

@TableDecorator({ name: 'User' })
export class UserEntity extends BaseExEntity {
    @StringDecorator({ exists: true, max: 25, type: StringType.Account })
    UserName: string;

    @StringDecorator({ max: 1000, type: StringType.Password, showInGrid: false })
    PasswordHash: string;

    @StringDecorator({ max: 80, type: StringType.Text })
    FirstName: string;

    @StringDecorator({ max: 80, type: StringType.Text })
    SurName: string;

    @StringDecorator({ exists: true, max: 160, type: StringType.Email })
    Email: string;

    @StringDecorator({ exists: true, max: 17, type: StringType.Phone })
    Phone: string;

    @DropDownDecorator({ reference: CompanyEntity, type: DropDownType.DropdownDevexpress, label: 'Company' })
    CompanyId: number;

    @StringDecorator({ max: 15, type: StringType.Code })
    DialingCode: string;

    @StringDecorator({ max: 15, type: StringType.Code })
    VertifyCode: string;

    @BooleanDecorator()
    public Approved: boolean;
}

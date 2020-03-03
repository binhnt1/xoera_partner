import { CompanyEntity } from './company.entity';
import { FeedbackType } from '../enums/feedback.type';
import { BaseExEntity } from '../../../../mvc/domains/entities/base.entity';
import { TableDecorator } from '../../../../mvc/decorators/table.decorator';
import { StringDecorator } from '../../../../mvc/decorators/string.decorator';
import { BooleanDecorator } from '../../../../mvc/decorators/boolean.decorator';
import { DropDownDecorator } from '../../../../mvc/decorators/dropdown.decorator';
import { StringType, DropDownType } from '../../../../mvc/domains/enums/data.type';

@TableDecorator({ name: 'Feedback' })
export class FeedbackEntity extends BaseExEntity {
    @DropDownDecorator({ required: true, reference: CompanyEntity, type: DropDownType.DropdownDevexpress, label: 'Company' })
    CompanyId: number;

    @StringDecorator({ required: true, max: 255 })
    Subject: string;

    @DropDownDecorator({ enumType: FeedbackType })
    Type: string;

    @StringDecorator({ max: 2000 })
    Description: string;

    @BooleanDecorator()
    Accepted: boolean;

    @StringDecorator({ max: 45 })
    Roadmap: string;

    @StringDecorator({ max: 255 })
    Status: string;

    @StringDecorator({ max: 80, type: StringType.Account })
    FirstName: string;

    @StringDecorator({ max: 17, type: StringType.Phone })
    Phone: string;

    @StringDecorator({ max: 80, type: StringType.Email })
    Email: string;
}

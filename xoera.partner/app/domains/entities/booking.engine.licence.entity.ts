import { CompanyEntity } from './company.entity';
import { BaseExEntity } from '../../../../mvc/domains/entities/base.entity';
import { TableDecorator } from '../../../../mvc/decorators/table.decorator';
import { StringDecorator } from '../../../../mvc/decorators/string.decorator';
import { DropDownDecorator } from '../../../../mvc/decorators/dropdown.decorator';
import { StringType, DropDownType } from '../../../../mvc/domains/enums/data.type';

@TableDecorator({ name: 'BookingEngineLicence' })
export class BookingEngineLicenceEntity extends BaseExEntity {
    @StringDecorator({ max: 255, type: StringType.Text })
    WebsiteName: string;

    @StringDecorator({ max: 255, type: StringType.Link })
    WebsiteUrl: string;

    @DropDownDecorator({ reference: CompanyEntity, type: DropDownType.DropdownDevexpress, label: 'Company' })
    CompanyId: number;

    @StringDecorator({ max: 255, type: StringType.Code })
    TrackingCode: string;
}

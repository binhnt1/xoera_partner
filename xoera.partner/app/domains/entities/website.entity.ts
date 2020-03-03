import { CompanyEntity } from './company.entity';
import { BaseExEntity } from '../../../../mvc/domains/entities/base.entity';
import { TableDecorator } from '../../../../mvc/decorators/table.decorator';
import { StringDecorator } from '../../../../mvc/decorators/string.decorator';
import { DropDownDecorator } from '../../../../mvc/decorators/dropdown.decorator';
import { StringType, DropDownType } from '../../../../mvc/domains/enums/data.type';

@TableDecorator({ name: 'Website' })
export class WebsiteEntity extends BaseExEntity {
    @StringDecorator({ max: 255, type: StringType.Text })
    SiteName: string;

    @StringDecorator({ max: 80, type: StringType.Text })
    Domain: string;

    @StringDecorator({ max: 500, type: StringType.MultiText, showInGrid: false })
    Code: string;

    @DropDownDecorator({ reference: CompanyEntity, type: DropDownType.DropdownDevexpress, label: 'Company' })
    CompanyId: number;

    @StringDecorator({ max: 255, type: StringType.Text })
    CallingDomain: string;

    @StringDecorator({ max: 512, type: StringType.Link })
    CustAppApiUrl: string;

    @StringDecorator({ max: 255, type: StringType.Link })
    BookingPageUrl: string;

    @StringDecorator({ type: StringType.MultiText, showInGrid: false })
    QuickBookingTemplate: string;
}

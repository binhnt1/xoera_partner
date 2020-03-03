import { CompanyEntity } from './company.entity';
import { DropDownType } from '../../../../mvc/domains/enums/data.type';
import { BaseExEntity } from '../../../../mvc/domains/entities/base.entity';
import { TableDecorator } from '../../../../mvc/decorators/table.decorator';
import { BooleanDecorator } from '../../../../mvc/decorators/boolean.decorator';
import { DropDownDecorator } from '../../../../mvc/decorators/dropdown.decorator';

@TableDecorator({ name: 'CompanyPartner' })
export class CompanyPartnerEntity extends BaseExEntity {
    @DropDownDecorator({ required: true, reference: CompanyEntity, type: DropDownType.DropdownDevexpress, label: 'Company' })
    CompanyId: number;

    @DropDownDecorator({ required: true, reference: CompanyEntity, type: DropDownType.DropdownDevexpress, label: 'Partner' })
    PartnerId: number;

    @BooleanDecorator({ default: false })
    Accept: boolean;
}

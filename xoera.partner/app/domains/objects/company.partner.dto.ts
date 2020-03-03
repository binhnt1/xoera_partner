import * as _ from 'lodash';
import { CompanyEntity } from '../entities/company.entity';
import { DropDownType } from '../../../../mvc/domains/enums/data.type';
import { TableDecorator } from '../../../../mvc/decorators/table.decorator';
import { DropDownDecorator } from '../../../../mvc/decorators/dropdown.decorator';

@TableDecorator({ name: 'CompanyPartnerDto' })
export class CompanyPartnerDto {    
    @DropDownDecorator({ required: true, reference: CompanyEntity, type: DropDownType.DropdownDevexpress, label: 'Company' })
    CompanyId: number;
    PartnerIds: number[];
    Company: CompanyEntity;
}

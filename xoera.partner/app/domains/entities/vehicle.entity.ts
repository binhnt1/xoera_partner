import { WebsiteEntity } from './website.entity';
import { AlignType } from '../../../../mvc/domains/enums/align.type';
import { StringType } from '../../../../mvc/domains/enums/data.type';
import { Dictionary } from '../../../../mvc/domains/data/dictionary';
import { BaseExEntity } from '../../../../mvc/domains/entities/base.entity';
import { TableDecorator } from '../../../../mvc/decorators/table.decorator';
import { StringDecorator } from '../../../../mvc/decorators/string.decorator';
import { NumberDecorator } from '../../../../mvc/decorators/number.decorator';
import { DropDownDecorator } from '../../../../mvc/decorators/dropdown.decorator';

@TableDecorator({ name: 'Vehicle' })
export class VehicleEntity extends BaseExEntity {
    @DropDownDecorator({ 
        label: 'Website',
        reference: WebsiteEntity, 
        propertyDisplay: ['SiteName'],
        emptyItem: new Dictionary('0', 'Select Website'), 
    })
    WebsiteId: string;

    @StringDecorator({ max: 80, type: StringType.Text })
    Name: string;

    @StringDecorator({ max: 255, type: StringType.Text })
    Image: string;

    @NumberDecorator({ max: 50, align: AlignType.Center })
    NoOfLuaggage: number;

    @NumberDecorator({ max: 50, align: AlignType.Center })
    NoOfPassagenr: number;
}

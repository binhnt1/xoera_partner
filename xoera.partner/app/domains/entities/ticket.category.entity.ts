import { AlignType } from '../../../../mvc/domains/enums/align.type';
import { StringType } from '../../../../mvc/domains/enums/data.type';
import { BaseExEntity } from '../../../../mvc/domains/entities/base.entity';
import { TableDecorator } from '../../../../mvc/decorators/table.decorator';
import { StringDecorator } from '../../../../mvc/decorators/string.decorator';

@TableDecorator({ name: 'TicketCategory' })
export class TicketCategoryEntity extends BaseExEntity {
    @StringDecorator({ required: true, max: 255 })
    Name: string;

    @StringDecorator({ max: 2000, type: StringType.MultiText })
    Description: string;

    @StringDecorator({ 
        max: 4000, 
        align: AlignType.Center,
        type: StringType.MultiText, 
        renderHtmlRaw: '<i class="{value}"></i>', 
    })
    public SvgIcon: string;
}

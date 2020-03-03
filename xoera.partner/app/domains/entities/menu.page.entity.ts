import { Dictionary } from "../../../../mvc/domains/data/dictionary";
import { StringType } from "../../../../mvc/domains/enums/data.type";
import { AlignType } from "../../../../mvc/domains/enums/align.type";
import { ConstantHelper } from "../../../../mvc/helpers/constant.helper";
import { TableDecorator } from "../../../../mvc/decorators/table.decorator";
import { BaseExEntity } from "../../../../mvc/domains/entities/base.entity";
import { StringDecorator } from "../../../../mvc/decorators/string.decorator";
import { NumberDecorator } from "../../../../mvc/decorators/number.decorator";
import { BooleanDecorator } from "../../../../mvc/decorators/boolean.decorator";
import { DropDownDecorator } from "../../../../mvc/decorators/dropdown.decorator";

@TableDecorator({ name: 'MenuPage' })
export class MenuPageEntity extends BaseExEntity {
    @StringDecorator({ required: true, type: StringType.Text })
    public Name: string;

    @StringDecorator({ type: StringType.Text })
    public Link: string;

    @DropDownDecorator({
        items: ConstantHelper.ICONS,
        renderHtmlRaw: '<i class="{value}"></i> {value}'
    })
    public Icon: string;

    @StringDecorator({ 
        max: 4000, 
        align: AlignType.Center,
        type: StringType.MultiText, 
        renderHtmlRaw: '<i class="{value}"></i>', 
    })
    public SvgIcon: string;

    @StringDecorator({ 
        showInGrid: false ,
        type: StringType.MultiHtml, 
    })
    public Content: boolean;

    @BooleanDecorator()
    public IsShow: boolean;

    @NumberDecorator({ step: 1, min: 0, max: 1000 })
    public Order: number;

    @DropDownDecorator({
        label: 'Parent',
        reference: MenuPageEntity,
        emptyItem: new Dictionary('0', 'Select Menu')
    })
    public ParentId: number;
}
import { BaseExEntity } from "./base.entity";
import { StringType } from "../enums/data.type";
import { Dictionary } from "../data/dictionary";
import { TableDto } from "../objects/table.dto";
import { AlignType } from "../enums/align.type";
import { ActionType } from "../enums/action.type";
import { ConstantHelper } from "../../helpers/constant.helper";
import { TableDecorator } from "../../decorators/table.decorator";
import { StringDecorator } from "../../decorators/string.decorator";
import { NumberDecorator } from "../../decorators/number.decorator";
import { BooleanDecorator } from "../../decorators/boolean.decorator";
import { DropDownDecorator } from "../../decorators/dropdown.decorator";

@TableDecorator({ name: 'Function' })
export class FunctionEntity extends BaseExEntity {
    @StringDecorator({ type: StringType.Text })
    public Name: string;

    @DropDownDecorator({
        reference: TableDto,
        propertyValue: 'Name',
        propertyDisplay: ['Name'],
        OnChanged: () => {

        },
        emptyItem: new Dictionary('', 'Select Controller')
    })
    public Controller: string;

    @DropDownDecorator({
        enumType: ActionType,
        emptyItem: new Dictionary('', 'Select Action'),
    })
    public Action: string;

    @StringDecorator({ type: StringType.Text })
    public Parameter: string;

    @DropDownDecorator({
        items: ConstantHelper.ICONS,
        emptyItem: new Dictionary('0', 'Select Icon'),
        renderHtmlRaw: '<i class="{value}"></i> {value}',
    })
    public Icon: string;

    @StringDecorator({ 
        max: 4000, 
        align: AlignType.Center,
        type: StringType.MultiText, 
        renderHtmlRaw: '<i class="{value}"></i>', 
    })
    public SvgIcon: string;

    @BooleanDecorator()
    public Shortcut: boolean;

    @BooleanDecorator()
    public IsShow: boolean;

    @NumberDecorator({ step: 1, min: 0, max: 1000 })
    public Order: number;

    @DropDownDecorator({
        label: 'Parent',
        reference: FunctionEntity,
        emptyItem: new Dictionary('0', 'Select Function')
    })
    public ParentId: number;
}
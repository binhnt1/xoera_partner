import { BooleanType } from "../enums/data.type";
import { FilterType } from "../enums/filter.type";
import { CompareType } from "../enums/compare.type";
import { StringDecorator } from "../../decorators/string.decorator";
import { ObjectDecorator } from "../../decorators/object.decorator";
import { BooleanDecorator } from "../../decorators/boolean.decorator";
import { DropDownDecorator } from "../../decorators/dropdown.decorator";

export class FilterData {
    @ObjectDecorator()
    public value?: any;

    @ObjectDecorator()
    public value1?: any;

    @ObjectDecorator()
    public value2?: any;

    @StringDecorator({ max: 250 })
    public name: string;

    @DropDownDecorator({ 
        label: 'Compare',
        enumType: CompareType, 
    })
    public compare?: CompareType;

    @BooleanDecorator({ type: BooleanType.RadioButton, enumType: FilterType })
    public type?: FilterType;

    constructor() {
        this.type = FilterType.And;
    }
}
import { StringType } from "../../../../mvc/domains/enums/data.type";
import { TableDecorator } from "../../../../mvc/decorators/table.decorator";
import { StringDecorator } from "../../../../mvc/decorators/string.decorator";
import { DropDownDecorator } from "../../../../mvc/decorators/dropdown.decorator";

@TableDecorator({ name: 'CardDto' })
export class CardDto {
    @StringDecorator({ required: true, type: StringType.Account, max: 100 })
    public Name: string;

    @StringDecorator({ required: true, type: StringType.Text, max: 500 })
    public Address: string;

    @StringDecorator({ required: true, type: StringType.Card, max: 30 })
    public CardNumber: string;

    @StringDecorator({ required: true, type: StringType.Text, max: 200 })
    public City: string;

    @DropDownDecorator({ required: true })
    public ExpMonth: string;

    @DropDownDecorator({ required: true })
    public ExpYear: string;

    @StringDecorator({ required: true, type: StringType.Cvc, max: 4 })
    public Cvc: string;

    @StringDecorator({ required: true, type: StringType.Text, max: 20 })
    public PostCode: string;

    @StringDecorator({ required: true, type: StringType.Text, max: 200 })
    public Country: string;
}

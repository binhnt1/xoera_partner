import { RememberType } from "../enums/remeber.type";
import { StringType } from "../../../../mvc/domains/enums/data.type";
import { TableDecorator } from "../../../../mvc/decorators/table.decorator";
import { NumberDecorator } from "../../../../mvc/decorators/number.decorator";
import { StringDecorator } from "../../../../mvc/decorators/string.decorator";
import { DropDownDecorator } from "../../../../mvc/decorators/dropdown.decorator";

@TableDecorator({ name: 'BookingHistoryEditDto' })
export class BookingHistoryEditDto {
    @StringDecorator({ type: StringType.Account, max: 100 })
    public Name: string;

    @NumberDecorator({ min: 0, max: 5 })
    public Rating: number;

    @StringDecorator({ type: StringType.MultiText, max: 1000, rows: 5 })
    public Comments: string;

    @DropDownDecorator({ data: [{key: 'Last 5', value: 'Last 5'}, {key: 'Last 25', value: 'Last 25'}, {key: '1 Month', value: '1 Month'}, {key: '3 Months', value: '3 Months'}, {key: 'All', value: 'All'}] })
    public History: string;

    @DropDownDecorator({ data: [{key: RememberType.Normal, value: 'Pickup, Dropoff'}, {key: RememberType.Swap, value: 'Pickup, Dropoff (Swap)'}] })
    public Remember: number;
}

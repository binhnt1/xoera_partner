import { BaseExEntity } from "./base.entity";
import { StringType } from "../enums/data.type";
import { TableDecorator } from "../../decorators/table.decorator";
import { StringDecorator } from "../../decorators/string.decorator";
import { BooleanDecorator } from "../../decorators/boolean.decorator";

@TableDecorator({ name: 'Account' })
export class AccountEntity extends BaseExEntity {
    @StringDecorator({ required: true, type: StringType.Text })
    public FullName: string;

    @StringDecorator({ required: true, type: StringType.Account })
    public UserName?: string;

    @StringDecorator({ required: true, min: 0, max: 100, type: StringType.Password })
    public Password: string;

    @StringDecorator({ required: true, type: StringType.Email })
    public Email?: string;

    @StringDecorator({ type: StringType.Phone })
    public Phone?: string;

    @StringDecorator({ type: StringType.Text })
    public Avatar?: string;

    @BooleanDecorator()
    public IsAdmin?: boolean;

    @StringDecorator({ type: StringType.MultiText })
    public Description?: string;
}
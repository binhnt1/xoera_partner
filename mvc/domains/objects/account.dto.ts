import { StringType } from "../enums/data.type";
import { StringDecorator } from "../../decorators/string.decorator";
import { BooleanDecorator } from "../../decorators/boolean.decorator";

export class LoginDto {
  @StringDecorator({ required: true, type: StringType.Account })
  public Account: string;

  @StringDecorator({ required: true, type: StringType.Password })
  public Password: string;
}

export class AccountDto {
    public Id: number;
    
    @StringDecorator({ required: true, type: StringType.Text })
    public FullName: string;

    @StringDecorator({ required: true, type: StringType.Account })
    public UserName: string;

    @StringDecorator({ type: StringType.Email })
    public Email: string;

    @StringDecorator({ type: StringType.Phone })
    public Phone: string;

    @StringDecorator({ type: StringType.Text })
    public Avatar: string;

    @BooleanDecorator()
    public IsAdmin: boolean;

    @BooleanDecorator()
    public Locked: boolean;
    
    @StringDecorator({ type: StringType.Text })
    public Token?: string;
}

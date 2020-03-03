import { PatternType } from "../../../../mvc/domains/enums/pattern.type";
import { FileDecorator } from "../../../../mvc/decorators/file.decorator";
import { TableDecorator } from "../../../../mvc/decorators/table.decorator";
import { StringDecorator } from "../../../../mvc/decorators/string.decorator";
import { StringType, FileType } from "../../../../mvc/domains/enums/data.type";
import { BooleanDecorator } from "../../../../mvc/decorators/boolean.decorator";

@TableDecorator({ name: 'UserDto' })
export class UserDto {
    public Id: number;
    public CompanyId: number;

    @StringDecorator({ required: true, max: 80, type: StringType.Text })
    public FirstName: string;

    @StringDecorator({ required: true, max: 80, type: StringType.Text })
    public SurName: string;

    @StringDecorator({ required: true, max: 25, type: StringType.Account })
    public UserName: string;

    @StringDecorator({ required: true, max: 160, type: StringType.Email })
    public Email: string;

    @StringDecorator({ type: StringType.Phone })
    public Phone: string;

    @BooleanDecorator()
    public Locked: boolean;

    @StringDecorator({ type: StringType.Text })
    public Token?: string;

    @BooleanDecorator()
    public IsActive: boolean;

    @BooleanDecorator()
    public Approved: boolean;
}

@TableDecorator({ name: 'LoginDto' })
export class LoginDto {
    @StringDecorator({ required: true, type: StringType.Account })
    public Account: string;

    @StringDecorator({ required: true, type: StringType.Password })
    public Password: string;

    @BooleanDecorator({ description: 'Remember me' })
    RememberMe?: boolean;
}

@TableDecorator({ name: 'ForgotDto' })
export class ForgotDto {
    @StringDecorator({ required: true, type: StringType.Email })
    public Email: string;
}

@TableDecorator({ name: 'SocialDto' })
export class SocialDto {
    @StringDecorator({ required: true, type: StringType.Text })
    public Name: string;

    @StringDecorator({ type: StringType.Email })
    public Email: string;

    @StringDecorator({ type: StringType.Phone })
    public Phone: string;

    @FileDecorator({ type: FileType.Image })
    public Image: string;

    @StringDecorator({ type: StringType.Code })
    public SocialId: string;
}

@TableDecorator({ name: 'RegisterDto' })
export class RegisterDto {
    @StringDecorator({
        max: 25,
        required: true,
        type: StringType.Account,
        validators: [{ pattern: PatternType.Exists, table: 'User', message: 'UserName does exist' }]
    })
    public UserName: string;

    @StringDecorator({ required: true, max: 80, type: StringType.Text })
    FirstName: string;

    @StringDecorator({ required: true, max: 80, type: StringType.Text })
    SurName: string;

    @StringDecorator({
        max: 160,
        required: true,
        type: StringType.Email,
        validators: [{ pattern: PatternType.Exists, table: 'User', message: 'Email does exist' }]
    })
    Email: string;

    @StringDecorator({
        max: 17,
        required: true,
        type: StringType.Phone,
        validators: [{ pattern: PatternType.Exists, table: 'User', message: 'Phone does exist' }]
    })
    Phone: string;

    @StringDecorator({ required: true, min: 6, type: StringType.Password })
    Password: string;

    @StringDecorator({ required: true, min: 6, requiredMatch: 'Password', type: StringType.Password })
    ConfirmPassword: string;

    @StringDecorator({
        required: true,
        type: StringType.Text,
        icon: 'la la-building',
        validators: [{ pattern: PatternType.Exists, table: 'Company', message: 'Company Name does exist' }]
    })
    CompanyName: string;

    @StringDecorator({ type: StringType.MultiText, rows: 6 })
    CompanyAddress: string;

    @StringDecorator({ max: 160, type: StringType.Account })
    ContactPerson: string;

    @StringDecorator({ max: 160, type: StringType.Email })
    ContactEmail: string;

    @StringDecorator({ max: 17, type: StringType.Phone })
    ContactPhone: string;

    @StringDecorator({ required: true, max: 10, type: StringType.Code })
    VertifyCode: string;

    @BooleanDecorator({ required: true })
    AgreeTerms: boolean;
}

@TableDecorator({ name: 'RegisterVertifyDto' })
export class RegisterVertifyDto {
    @StringDecorator({ required: true, type: StringType.Account })
    public Account: string;

    @StringDecorator({ required: true, max: 10, type: StringType.Code })
    VertifyCode: string;
}
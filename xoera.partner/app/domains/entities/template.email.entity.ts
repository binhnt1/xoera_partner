import { TemplateEmailType } from '../enums/template.email.type';
import { StringType } from '../../../../mvc/domains/enums/data.type';
import { BaseExEntity } from '../../../../mvc/domains/entities/base.entity';
import { TableDecorator } from '../../../../mvc/decorators/table.decorator';
import { StringDecorator } from '../../../../mvc/decorators/string.decorator';
import { DropDownDecorator } from '../../../../mvc/decorators/dropdown.decorator';

@TableDecorator({ name: 'TemplateEmail' })
export class TemplateEmailEntity extends BaseExEntity {
    @StringDecorator({ required: true, max: 1000, type: StringType.Text })
    Title: string;

    @DropDownDecorator({ required: true, enumType: TemplateEmailType })
    Type: number;

    @StringDecorator({
        required: true,
        showInGrid: false,
        type: StringType.MultiHtml,
        variables: [            
            {
                title: 'Register Account', icon: 'info',
                childrens: [
                    { title: 'UserName', variable: 'UserName' },
                    { title: 'Full Name', variable: 'FullName' },
                    { title: 'Active Code', variable: 'ActiveCode' },
                    { title: 'Active Link', variable: 'ActiveLink' }
                ]
            },
            {
                title: 'Ticket', icon: 'info',
                childrens: [
                    { title: 'Account', variable: 'Account' },
                    { title: 'UserName', variable: 'UserName' },
                    { title: 'Title', variable: 'Title' },
                    { title: 'Number', variable: 'Number' },
                    { title: 'DateTime', variable: 'DateTime' }, 
                    { title: 'Priority', variable: 'Priority' }
                ]
            },
        ]
    })
    Content: string;
}

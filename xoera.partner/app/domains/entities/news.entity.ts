import { FileDecorator } from '../../../../mvc/decorators/file.decorator';
import { BaseExEntity } from '../../../../mvc/domains/entities/base.entity';
import { TableDecorator } from '../../../../mvc/decorators/table.decorator';
import { StringDecorator } from '../../../../mvc/decorators/string.decorator';
import { BooleanDecorator } from '../../../../mvc/decorators/boolean.decorator';
import { StringType, FileType, DateTimeType } from '../../../../mvc/domains/enums/data.type';
import { DateTimeDecorator, DateTimeFormat } from '../../../../mvc/decorators/datetime.decorator';

@TableDecorator({ name: 'News' })
export class NewsEntity extends BaseExEntity {
    @StringDecorator({ required: true, max: 255 })
    Title: string;

    @StringDecorator({ max: 2000 })
    Description: string;

    @StringDecorator({ required: true, type: StringType.MultiHtml, showInGrid: false, variables: [{ title: 'Account', icon: 'user', childrens: [{ title: 'UserName', variable: 'UserName' }, { title: 'Full Name', variable: 'FullName' }]}] })
    Content: string;

    @FileDecorator({ type: FileType.Image, multiple: true })
    Image: string;

    @DateTimeDecorator({ required: true, type: DateTimeType.DateTime, format: DateTimeFormat.DMYHM, default: new Date() })
    DateTime: Date;

    @BooleanDecorator()
    IsPublished: string;
}

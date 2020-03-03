import { TutorialCategoryEntity } from './tutorial.category.entity';
import { FileDecorator } from '../../../../mvc/decorators/file.decorator';
import { BaseExEntity } from '../../../../mvc/domains/entities/base.entity';
import { TableDecorator } from '../../../../mvc/decorators/table.decorator';
import { StringDecorator } from '../../../../mvc/decorators/string.decorator';
import { BooleanDecorator } from '../../../../mvc/decorators/boolean.decorator';
import { DropDownDecorator } from '../../../../mvc/decorators/dropdown.decorator';
import { DateTimeDecorator, DateTimeFormat } from '../../../../mvc/decorators/datetime.decorator';
import { StringType, FileType, DateTimeType, DropDownType } from '../../../../mvc/domains/enums/data.type';

@TableDecorator({ name: 'Tutorial' })
export class TutorialEntity extends BaseExEntity {
    @StringDecorator({ required: true, max: 255 })
    Title: string;

    @DropDownDecorator({ reference: TutorialCategoryEntity, type: DropDownType.DropdownDevexpress, label: 'Category' })
    CategoryId: number;

    @StringDecorator({ required: true, type: StringType.MultiHtml, showInGrid: false })
    Content: string;

    @FileDecorator({ type: FileType.Image, multiple: true })
    Image: string;

    @DateTimeDecorator({ required: true, type: DateTimeType.DateTime, format: DateTimeFormat.DMYHM, default: new Date() })
    DateTime: Date;

    @BooleanDecorator()
    IsPublished: string;
}

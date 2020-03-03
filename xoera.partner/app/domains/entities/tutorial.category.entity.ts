import { StringType } from '../../../../mvc/domains/enums/data.type';
import { BaseExEntity } from '../../../../mvc/domains/entities/base.entity';
import { TableDecorator } from '../../../../mvc/decorators/table.decorator';
import { StringDecorator } from '../../../../mvc/decorators/string.decorator';

@TableDecorator({ name: 'TutorialCategory' })
export class TutorialCategoryEntity extends BaseExEntity {
    @StringDecorator({ required: true, max: 255 })
    Name: string;

    @StringDecorator({ max: 2000, type: StringType.MultiText })
    Description: string;
}

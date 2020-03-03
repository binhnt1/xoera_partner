import { UserEntity } from './user.entity';
import { TicketStatusType } from '../enums/ticket.status.type';
import { TicketCategoryEntity } from './ticket.category.entity';
import { TicketPriorityType } from '../enums/ticket.priority.type';
import { FileDecorator } from '../../../../mvc/decorators/file.decorator';
import { BaseExEntity } from '../../../../mvc/domains/entities/base.entity';
import { TableDecorator } from '../../../../mvc/decorators/table.decorator';
import { StringDecorator } from '../../../../mvc/decorators/string.decorator';
import { AccountEntity } from '../../../../mvc/domains/entities/account.entity';
import { BooleanDecorator } from '../../../../mvc/decorators/boolean.decorator';
import { DropDownDecorator } from '../../../../mvc/decorators/dropdown.decorator';
import { DateTimeDecorator, DateTimeFormat } from '../../../../mvc/decorators/datetime.decorator';
import { StringType, FileType, DateTimeType, DropDownType } from '../../../../mvc/domains/enums/data.type';

@TableDecorator({ name: 'Ticket' })
export class TicketEntity extends BaseExEntity {
    @DropDownDecorator({ required: true, reference: TicketCategoryEntity, type: DropDownType.DropdownDevexpress, label: 'Category' })
    CategoryId: number;

    @DropDownDecorator({ required: true, reference: UserEntity, propertyDisplay: ['UserName'], type: DropDownType.DropdownDevexpress, label: 'User' })
    UserId: number;

    @StringDecorator({ required: true, max: 255, label: 'Subject' })
    Title: string;

    @StringDecorator({ required: true, type: StringType.MultiText, showInGrid: false, rows: 8 })
    Content: string;

    @FileDecorator({ type: FileType.File, multiple: true })
    Attachments: string;

    @DateTimeDecorator({ required: true, type: DateTimeType.DateTime, format: DateTimeFormat.DMYHM, default: new Date() })
    DateTime: Date;

    @DropDownDecorator({ required: true, enumType: TicketStatusType, label: 'Status', default: TicketStatusType.Open })
    StatusType: number;

    @DropDownDecorator({ required: true, enumType: TicketPriorityType, label: 'Priority', default: TicketPriorityType.Low })
    PriorityType: number;

    @DropDownDecorator({ required: true, reference: AccountEntity, propertyDisplay: ['UserName'], type: DropDownType.DropdownDevexpress, label: 'Assign To' })
    AssignToId: number;

    @BooleanDecorator({ default: true })
    Private?: boolean;

    @StringDecorator({ type: StringType.MultiText, max: 1000, label: 'Note', showInGrid: false, rows: 4 })
    InternalNote?: string;
}

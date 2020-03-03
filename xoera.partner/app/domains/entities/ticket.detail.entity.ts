import { UserEntity } from './user.entity';
import { TicketEntity } from './ticket.entity';
import { TicketStatusType } from '../enums/ticket.status.type';
import { FileDecorator } from '../../../../mvc/decorators/file.decorator';
import { BaseExEntity } from '../../../../mvc/domains/entities/base.entity';
import { TableDecorator } from '../../../../mvc/decorators/table.decorator';
import { NumberDecorator } from '../../../../mvc/decorators/number.decorator';
import { StringDecorator } from '../../../../mvc/decorators/string.decorator';
import { AccountEntity } from '../../../../mvc/domains/entities/account.entity';
import { DropDownDecorator } from '../../../../mvc/decorators/dropdown.decorator';
import { DateTimeDecorator, DateTimeFormat } from '../../../../mvc/decorators/datetime.decorator';
import { StringType, FileType, DateTimeType, DropDownType } from '../../../../mvc/domains/enums/data.type';

@TableDecorator({ name: 'TicketDetail' })
export class TicketDetailEntity extends BaseExEntity {
    @DropDownDecorator({ required: true, reference: TicketEntity, type: DropDownType.DropdownDevexpress, label: 'Ticket' })
    TicketId: number;

    @DropDownDecorator({ required: true, enumType: TicketStatusType, label: 'Status' })
    StatusType: number;

    @StringDecorator({ type: StringType.MultiText, showInGrid: false, showInEdit: false, rows: 3 })
    Quote?: string;

    @DateTimeDecorator({ type: DateTimeType.DateTime, format: DateTimeFormat.DMYHM, default: new Date(), label: 'Quote DateTime' })
    QuoteDateTime: Date;

    @DropDownDecorator({ reference: AccountEntity, propertyDisplay: ['UserName'], type: DropDownType.DropdownDevexpress, label: 'Quote Answer by' })
    QuoteAnswerById?: number;

    @DropDownDecorator({ reference: UserEntity, propertyDisplay: ['UserName'], type: DropDownType.DropdownDevexpress, label: 'Quote Question by' })
    QuoteQuestionById?: number;

    @FileDecorator({ type: FileType.File, multiple: true, label: 'Quote Attachments' })
    QuoteAttachments?: string;

    @NumberDecorator({ step: 1, min: 1, max: 10000 })
    Number?: number;

    @StringDecorator({ required: true, type: StringType.MultiText, showInGrid: false, rows: 5 })
    Content?: string;

    @FileDecorator({ type: FileType.File, multiple: true })
    Attachments?: string;

    @DateTimeDecorator({ required: true, type: DateTimeType.DateTime, format: DateTimeFormat.DMYHM, default: new Date() })
    DateTime: Date;

    @DropDownDecorator({ required: true, reference: AccountEntity, propertyDisplay: ['UserName'], type: DropDownType.DropdownDevexpress, label: 'Answer by' })
    AnswerById?: number;

    @DropDownDecorator({ reference: AccountEntity, propertyDisplay: ['UserName'], type: DropDownType.DropdownDevexpress, label: 'Assign To' })
    AssignToId?: number;

    @DropDownDecorator({ reference: UserEntity, propertyDisplay: ['UserName'], type: DropDownType.DropdownDevexpress, label: 'Question by' })
    QuestionById?: number;

    @StringDecorator({ max: 1000, type: StringType.MultiText, showInGrid: false, rows: 4, label: 'Note' })
    InternalNote?: string;
}

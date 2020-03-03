declare var toastr: any;
import * as _ from "lodash";
import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { ApiService } from "../../../../services/api.service";
import { AuthService } from "../../../../services/auth.service";
import { DialogType } from "../../../../domains/enums/dialog.type";
import { AppConfig } from "../../../../../../mvc/helpers/app.config";
import { validation } from "../../../../../../mvc/interceptor/validation";
import { RouterHelper } from "../../../../../../mvc/helpers/router.helper";
import { MvcApiService } from "../../../../../../mvc/services/api.service";
import { FileDto } from "../../../../../../mvc/domains/objects/file.dto";
import { DataType } from "../../../../../../mvc/domains/enums/data.type";
import { FileEx } from "../../../../../../mvc/decorators/file.decorator";
import { MvcAuthService } from "../../../../../../mvc/services/auth.service";
import { ResultApi } from "../../../../../../mvc/domains/data/result.api";
import { OrderType } from "../../../../../../mvc/domains/enums/order.type";
import { MvcEventService } from "../../../../../../mvc/services/event.service";
import { TableEx } from "../../../../../../mvc/decorators/table.decorator";
import { FilterData } from "../../../../../../mvc/domains/data/filter.data";
import { ObjectEx } from "../../../../../../mvc/decorators/object.decorator";
import { DecoratorHelper } from "../../../../../../mvc/helpers/decorator.helper";
import { MvcDialogService } from "../../../../../../mvc/services/dialog.service";
import { SortingData } from "../../../../../../mvc/domains/data/sorting.data";
import { CompareType } from "../../../../../../mvc/domains/enums/compare.type";
import { AlignTypeAware } from "../../../../../../mvc/domains/enums/align.type";
import { AccountEntity } from "../../../../../../mvc/domains/entities/account.entity";
import { ResultType, ResultTypeAware } from "../../../../../../mvc/domains/enums/result.type";
import { TicketDto } from "../../../..//domains/objects/ticket.dto";
import { UserEntity } from "../../../../domains/entities/user.entity";
import { TicketEntity } from "../../../../domains/entities/ticket.entity";
import { TicketDetailDto } from "../../../..//domains/objects/ticket.detail.dto";
import { TicketDetailEntity } from "../../../../domains/entities/ticket.detail.entity";
import { TicketPriorityTypeAware } from "../../../..//domains/enums/ticket.priority.type";
import { TicketCategoryEntity } from "../../../../domains/entities/ticket.category.entity";
import { TicketStatusType, TicketStatusTypeAware } from "../../../..//domains/enums/ticket.status.type";

@AlignTypeAware
@ResultTypeAware
@TicketStatusTypeAware
@TicketPriorityTypeAware
@Component({
    styleUrls: ['./ticket.view.scss'],
    templateUrl: './ticket.view.component.html',
})
export class TicketViewComponent {
    admin: boolean;
    message: string;
    loading: boolean;
    readonly: boolean;
    ticket: TicketDto;
    processing: boolean;
    loadingText: string;
    processingStatus: boolean;
    anwsers: TicketDetailDto[];
    anwser: TicketDetailEntity;
    portletReplies: boolean = true;
    portletAddReply: boolean = true;

    users: UserEntity[];
    accounts: AccountEntity[];
    ticketCategories: TicketCategoryEntity[];

    constructor(
        public router: Router,
        public auth: AuthService,
        public serive: ApiService,
        public mvcAuth: MvcAuthService,
        public dialog: MvcDialogService,
        public mvcEvent: MvcEventService,
        public mvcService: MvcApiService) {
        let id = RouterHelper.getId(this.router);
        if (id) {
            this.loadTicket(id);
        } else {
            this.loading = false;
            this.readonly = false;
            this.ticket = new TicketEntity();
        }
        let adminController = RouterHelper.GetController(this.router) == 'admin';
        this.admin = adminController && this.mvcAuth.account != null;
    }

    closeMessage() {
        this.message = '';
    }

    async submitTicket() {
        let valid = await validation(this.anwser, this.mvcEvent, this.mvcService, ['Content']);
        if (valid) {
            this.loading = true;
            this.processing = true;
            this.loadingText = 'Loading...';

            // upload
            await this.uploadFiles(this.anwser);

            // save
            this.loadingText = 'Saving...';
            this.anwser.DateTime = new Date();
            this.anwser.TicketId = this.ticket.Id;
            this.anwser.StatusType = this.ticket.StatusType;
            if (this.anwser.QuoteAttachments)
                this.anwser.QuoteAttachments = typeof this.anwser.QuoteAttachments == 'string'
                    ? this.anwser.QuoteAttachments
                    : JSON.stringify(this.anwser.QuoteAttachments);
            if (this.admin)
                this.anwser.AnswerById = this.mvcAuth.account.Id;
            else
                this.anwser.QuestionById = this.auth.account.Id;
            this.serive.addNewTicketDetail(this.anwser).then(async (result: ResultApi) => {
                if (result && result.Type == ResultType.Success) {
                    this.anwser.Id = <number>result.Object;
                    this.anwsers.push(this.entityToDto(this.anwser));
                    let message = this.admin
                        ? 'Reply ticket success!'
                        : 'We have received your reply, please wait for a response from us'
                    toastr.success(message, 'Information');
                    this.anwser = null;
                    setTimeout(() => {
                        this.anwser = new TicketDetailEntity();
                    }, 300);
                } else if (result && result.Type != ResultType.Success) {
                    let message = result.Description;
                    toastr.error(message, 'Error');
                }
                this.loading = false;
                this.processing = false;
            });
        }
    }

    naviageToGridTicket() {
        if (this.admin)
            RouterHelper.Navigate(this.router, '/admin/ticket');
        else
            RouterHelper.Navigate(this.router, '/ticket');
    }

    togglePortletReplies() {
        this.portletReplies = !this.portletReplies;
    }

    togglePortletAddReply() {
        this.portletAddReply = !this.portletAddReply;
    }

    openPopupAssignTo() {
        this.dialog.Dialog({
            admin: this.admin,
            title: 'Assign Ticket',
            object: _.cloneDeep(this.ticket),
            type: <number>DialogType.AssignTicket,
            okFunction: (item: TicketEntity) => {
                if (item) {
                    this.loading = true;
                    this.serive.assignTicket(item).then(async (result: ResultApi) => {
                        if (result && result.Type == ResultType.Success) {
                            this.ticket.AssignToId = item.AssignToId;
                            this.ticket.PriorityType = item.PriorityType;
                            this.ticket.AssignTo = this.accounts.find(c => c.Id == this.ticket.AssignToId);
                            toastr.success('Assign ticket success!', 'Success');

                            // add assigned item
                            let anwser: TicketDetailEntity = new TicketDetailEntity();
                            anwser.TicketId = item.Id;
                            anwser.DateTime = new Date();
                            anwser.AssignToId = this.ticket.AssignToId;
                            anwser.AnswerById = this.mvcAuth.account.Id;
                            anwser.StatusType = TicketStatusType.Assigned;
                            this.serive.addNewTicketDetail(anwser).then(async (result: ResultApi) => {
                                if (result && result.Type == ResultType.Success) {
                                    anwser.Id = <number>result.Object;
                                    this.anwsers.push(this.entityToDto(anwser));
                                }
                            });
                        } else if (result && result.Type != ResultType.Success) {
                            let message = result.Description;
                            toastr.error(message, 'Error');
                        }
                        this.loading = false;
                        this.processing = false;
                    });
                }
            }
        });
    }

    openPopupEditTicket() {
        this.dialog.Dialog({
            admin: this.admin,
            title: 'Edit Ticket',
            object: _.cloneDeep(this.ticket),
            type: <number>DialogType.EditTicket,
            okFunction: (item: TicketEntity) => {
                if (item) {
                    this.loading = true;
                    this.serive.update('Ticket', item, ['Title', 'Content', 'InternalNote']).then(async (result: ResultApi) => {
                        if (result && result.Type == ResultType.Success) {
                            this.ticket = item;
                            toastr.success('Edit ticket success!', 'Success');
                        } else if (result && result.Type != ResultType.Success) {
                            let message = result.Description;
                            toastr.error(message, 'Error');
                        }
                        this.loading = false;
                        this.processing = false;
                    });
                }
            }
        });
    }

    openPopupEditTicketDetail(ticketDetail: TicketDetailEntity) {
        this.dialog.Dialog({
            admin: this.admin,
            title: 'Edit Comment',
            object: _.cloneDeep(ticketDetail),
            type: <number>DialogType.EditTicketDetail,
            okFunction: (item: TicketDetailEntity) => {
                if (item) {
                    this.loading = true;
                    this.serive.update('TicketDetail', item, ['Content', 'InternalNote']).then(async (result: ResultApi) => {
                        if (result && result.Type == ResultType.Success) {
                            let itemDb = this.anwsers.find(c => c.Id == item.Id);
                            itemDb.Content = item.Content;
                            itemDb.InternalNote = item.InternalNote;
                            toastr.success('Edit comment success!', 'Success');
                        } else if (result && result.Type != ResultType.Success) {
                            let message = result.Description;
                            toastr.error(message, 'Error');
                        }
                        this.loading = false;
                        this.processing = false;
                    });
                }
            }
        });
    }

    openTicket() {
        this.dialog.Confirm('Do you want re-open this ticket?', () => {
            this.loading = true;
            this.processingStatus = true;
            let item = _.cloneDeep(this.ticket);
            item.StatusType = TicketStatusType.Open;
            this.serive.reOpenTicket(item).then(async (result: ResultApi) => {
                if (result && result.Type == ResultType.Success) {
                    this.ticket = item;
                    toastr.success('Re-open ticket success!', 'Success');

                    // add re-open item
                    let anwser: TicketDetailEntity = new TicketDetailEntity();
                    anwser.TicketId = item.Id;
                    anwser.DateTime = new Date();
                    anwser.StatusType = item.StatusType;
                    if (this.admin)
                        anwser.AnswerById = this.mvcAuth.account.Id;
                    else
                        anwser.QuestionById = this.auth.account.Id;
                    this.serive.addNewTicketDetail(anwser).then(async (result: ResultApi) => {
                        if (result && result.Type == ResultType.Success) {
                            anwser.Id = <number>result.Object;
                            this.anwsers.push(this.entityToDto(anwser));
                        }
                    });
                } else if (result && result.Type != ResultType.Success) {
                    let message = result.Description;
                    toastr.error(message, 'Error');
                }
                this.loading = false;
                this.processingStatus = false;
            });
        });
    }

    closeTicket() {
        this.dialog.Confirm('Do you want close this ticket?', () => {
            this.loading = true;
            this.processingStatus = true;
            let item = _.cloneDeep(this.ticket);
            item.StatusType = TicketStatusType.Closed;
            this.serive.update('Ticket', item, ['StatusType']).then(async (result: ResultApi) => {
                if (result && result.Type == ResultType.Success) {
                    this.ticket = item;
                    toastr.success('Close ticket success!', 'Information');

                    // add close item
                    let anwser: TicketDetailEntity = new TicketDetailEntity();
                    anwser.TicketId = item.Id;
                    anwser.DateTime = new Date();
                    anwser.StatusType = item.StatusType;
                    if (this.admin)
                        anwser.AnswerById = this.mvcAuth.account.Id;
                    else
                        anwser.QuestionById = this.auth.account.Id;
                    this.serive.addNewTicketDetail(anwser).then(async (result: ResultApi) => {
                        if (result && result.Type == ResultType.Success) {
                            anwser.Id = <number>result.Object;
                            this.anwsers.push(this.entityToDto(anwser));
                        }
                    });
                } else if (result && result.Type != ResultType.Success) {
                    let message = result.Description;
                    toastr.error(message, 'Error');
                }
                this.loading = false;
                this.processingStatus = false;
            });
        });
    }

    closeQuoteContent() {
        this.anwser.Quote = null;
        this.anwser.QuoteDateTime = null;
        this.anwser.QuoteAnswerById = null;
        this.anwser.QuoteAttachments = null;
        this.anwser.QuoteQuestionById = null;
    }

    quoteTicket(item: TicketEntity) {
        this.anwser.Quote = item.Content;
        this.anwser.QuoteAnswerById = null;
        this.anwser.QuoteDateTime = item.DateTime;
        this.anwser.QuoteQuestionById = item.UserId;
        this.anwser.QuoteAttachments = item.Attachments;
    }

    quoteTicketDetail(item: TicketDetailEntity) {
        this.anwser.Quote = item.Content;
        this.anwser.QuoteDateTime = item.DateTime;
        this.anwser.QuoteAnswerById = item.AnswerById;
        this.anwser.QuoteAttachments = item.Attachments;
        this.anwser.QuoteQuestionById = item.QuestionById;
    }

    private async loadUser() {
        if (!this.users) {
            await this.serive.selectAll('User', null, null, null, 1, 1000).then((result: ResultApi) => {
                if (result && result.Type == ResultType.Success)
                    this.users = <UserEntity[]>result.Object;
            });
        }
    }

    private async loadAccount() {
        if (!this.accounts) {
            await this.serive.selectAll('Account', null, null, null, 1, 1000).then((result: ResultApi) => {
                if (result && result.Type == ResultType.Success)
                    this.accounts = <AccountEntity[]>result.Object;
            });
        }
    }

    private async loadAnswers() {
        this.anwser = null;
        let filters: FilterData[] = [
            { name: 'TicketId', compare: CompareType.N_Equals, value: this.ticket.Id }
        ];
        let orders: SortingData[] = [
            { name: 'DateTime', type: OrderType.Asc }
        ];
        let anwsers = await this.serive.selectAll('TicketDetail', null, filters, orders, 1, 1000).then((result: ResultApi) => {
            if (result && result.Type == ResultType.Success)
                return <TicketDetailEntity[]>result.Object;
            return null;
        });
        if (anwsers) {
            this.anwsers = [];
            anwsers.forEach((item: TicketDetailEntity) => {
                let anwser: TicketDetailDto = new TicketDetailEntity();
                anwser.Id = item.Id;
                anwser.Quote = item.Quote;
                anwser.Content = item.Content;
                anwser.DateTime = item.DateTime;
                anwser.TicketId = item.TicketId;
                anwser.AssignToId = item.AssignToId;
                anwser.AnswerById = item.AnswerById;
                anwser.StatusType = item.StatusType;
                anwser.Attachments = item.Attachments;
                anwser.QuestionById = item.QuestionById;
                anwser.InternalNote = item.InternalNote;
                anwser.QuoteDateTime = item.QuoteDateTime;
                anwser.QuoteAnswerById = item.QuoteAnswerById;
                anwser.QuoteAttachments = item.QuoteAttachments;
                anwser.QuoteQuestionById = item.QuoteQuestionById;
                anwser.AssignTo = this.accounts.find(c => c.Id == item.AssignToId);
                anwser.AnswerBy = this.accounts.find(c => c.Id == item.AnswerById);
                anwser.QuestionBy = this.users.find(c => c.Id == item.QuestionById);
                anwser.QuoteAnswerBy = this.accounts.find(c => c.Id == item.QuoteAnswerById);
                anwser.QuoteQuestionBy = this.users.find(c => c.Id == item.QuoteQuestionById);
                this.anwsers.push(anwser);
            });
        }
        this.anwser = new TicketDetailEntity();
    }

    private async loadTicket(id: number) {
        this.loading = true;
        this.readonly = true;
        await this.loadUser();
        await this.loadAccount();
        await this.loadTicketCategories();
        this.serive.selectOne('Ticket', id).then(async (result: ResultApi) => {
            if (result && result.Type == ResultType.Success) {
                let item: TicketEntity = result.Object;

                this.ticket = new TicketEntity();
                this.ticket.Id = item.Id;
                this.ticket.Title = item.Title;
                this.ticket.UserId = item.UserId;
                this.ticket.Content = item.Content;
                this.ticket.DateTime = item.DateTime;
                this.ticket.AssignToId = item.AssignToId;
                this.ticket.CategoryId = item.CategoryId;
                this.ticket.StatusType = item.StatusType;
                this.ticket.Attachments = item.Attachments;
                this.ticket.InternalNote = item.InternalNote;
                this.ticket.PriorityType = item.PriorityType;
                this.ticket.User = this.users.find(c => c.Id == item.UserId);
                this.ticket.AssignTo = this.accounts.find(c => c.Id == item.AssignToId);
                this.ticket.Category = this.ticketCategories.find(c => c.Id == item.CategoryId);
                await this.loadAnswers();
                this.loading = false;
            } else setTimeout(() => { this.loading = false; }, 1000);
        });
    }

    private async loadTicketCategories() {
        if (!this.ticketCategories) {
            await this.serive.selectAll('TicketCategory', null, null, null, 1, 1000).then((result: ResultApi) => {
                if (result && result.Type == ResultType.Success)
                    this.ticketCategories = <TicketCategoryEntity[]>result.Object;
            });
        }
    }

    private async uploadFiles(item: any) {
        let table: TableEx = item.TableEx
            ? <TableEx>item.TableEx
            : DecoratorHelper.DecoratorClass(TicketEntity),
            properties = Object.getOwnPropertyNames(item);
        if (properties && properties.length > 0) {
            for (let i = 0; i < properties.length; i++) {
                let property = properties[i];
                let decorator = <ObjectEx>DecoratorHelper.DecoratorProperty(table.className, property);
                if (decorator && decorator.dataType == DataType.File) {
                    let fileUploads: any[] = [],
                        files = <FileDto[]>item[decorator.property];
                    if (files && files.length > 0) {
                        for (let i = 0; i < files.length; i++) {
                            let file = files[i],
                                length = files.length;
                            this.loadingText = `Upload ${i}/${length}...`;
                            if (file.Data) {
                                await this.mvcService.upload({
                                    data: files[i].NativeData,
                                    type: (<FileEx>decorator).type,
                                    processFunction: (percent: number) => {
                                        this.loadingText = `Upload ${i}/${length}...${percent}%`;
                                    },
                                    completeFunction: (result: ResultApi) => {
                                        this.loadingText = `Upload ${i + 1}/${length}...`;
                                        if (result && result.Type == ResultType.Success)
                                            fileUploads.push(result.Object.path);
                                    },
                                });
                            } else if (file.Path) {
                                let path = file.Path
                                    .replace(AppConfig.ApiUrl + '/', '')
                                    .replace(AppConfig.ApiUrl, '');
                                this.loadingText = `Upload ${i + 1}/${length}...`;
                                fileUploads.push(path);
                            }
                        }
                        item[decorator.property] = JSON.stringify(fileUploads);
                    }
                }
            }
        }
    }

    private entityToDto(entity: TicketDetailEntity): TicketDetailDto {
        let dto: TicketDetailDto = _.cloneDeep(entity);
        dto.AssignTo = this.accounts.find(c => c.Id == dto.AssignToId);
        dto.AnswerBy = this.accounts.find(c => c.Id == dto.AnswerById);
        dto.QuestionBy = this.users.find(c => c.Id == dto.QuestionById);
        dto.QuoteAnswerBy = this.accounts.find(c => c.Id == dto.QuoteAnswerById);
        dto.QuoteQuestionBy = this.users.find(c => c.Id == dto.QuoteQuestionById);
        return dto;
    }
}

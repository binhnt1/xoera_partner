import * as _ from "lodash";
import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { ApiService } from "../../../../services/api.service";
import { AuthService } from "../../../../services/auth.service";
import { AppConfig } from "../../../../../../mvc/helpers/app.config";
import { validation } from "../../../../../../mvc/interceptor/validation";
import { RouterHelper } from "../../../../../../mvc/helpers/router.helper";
import { MvcApiService } from "../../../../../../mvc/services/api.service";
import { FileDto } from "../../../../../../mvc/domains/objects/file.dto";
import { DataType } from "../../../../../../mvc/domains/enums/data.type";
import { FileEx } from "../../../../../../mvc/decorators/file.decorator";
import { MvcAuthService } from "../../../../../../mvc/services/auth.service";
import { ResultApi } from "../../../../../../mvc/domains/data/result.api";
import { MvcEventService } from "../../../../../../mvc/services/event.service";
import { TableEx } from "../../../../../../mvc/decorators/table.decorator";
import { ObjectEx } from "../../../../../../mvc/decorators/object.decorator";
import { DecoratorHelper } from "../../../../../../mvc/helpers/decorator.helper";
import { AlignTypeAware } from "../../../../../../mvc/domains/enums/align.type";
import { ResultType, ResultTypeAware } from "../../../../../../mvc/domains/enums/result.type";
import { TicketEntity } from "../../../../domains/entities/ticket.entity";
import { TicketStatusType, TicketStatusTypeAware } from "../../../../domains/enums/ticket.status.type";

@AlignTypeAware
@ResultTypeAware
@TicketStatusTypeAware
@Component({
    styleUrls: ['./ticket.edit.scss'],
    templateUrl: './ticket.edit.component.html',
})
export class TicketEditComponent {
    admin: boolean;
    message: string;
    loading: boolean;
    processing: boolean;
    loadingText: string;
    ticket: TicketEntity;
    
    constructor(
        public router: Router,
        public auth: AuthService,
        public serive: ApiService,
        public mvcAuth: MvcAuthService,
        public mvcEvent: MvcEventService,
        public mvcService: MvcApiService) {
        this.loading = false;
        this.ticket = new TicketEntity();
        let adminController = RouterHelper.GetController(this.router) == 'admin';
        this.admin = adminController && this.mvcAuth.account != null;
    }

    closeMessage() {
        this.message = '';
    }

    async submitTicket() {
        let valid = await validation(this.ticket, this.mvcEvent, this.mvcService, ['CategoryId', 'Title', 'Content']);
        if (valid) {
            this.loading = true;
            this.processing = true;
            this.loadingText = 'Loading...';

            // upload
            await this.uploadFiles(this.ticket);

            // save
            this.loadingText = 'Saving...';
            this.ticket.DateTime = new Date();
            this.ticket.UserId = this.auth.account.Id;
            this.ticket.StatusType = TicketStatusType.Open;
            this.serive.addNewTicket(this.ticket).then(async (result: ResultApi) => {
                if (result && result.Type == ResultType.Success) {
                    this.ticket.Id = <number>result.Object;
                    this.naviageToGridTicket();
                } else if (result && result.Type != ResultType.Success) {
                    this.message = result.Description;
                    this.processing = false;
                    this.loading = false;
                }
            });
        }
    }

    naviageToGridTicket() {
        RouterHelper.Navigate(this.router, '/ticket');
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
}

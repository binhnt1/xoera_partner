declare var toastr: any;
import * as _ from "lodash";
import { Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { ApiService } from "./services/api.service";
import { DataService } from "./services/data.service";
import { environment } from "../environments/environment";
import { AppConfig } from "../../mvc/helpers/app.config";
import { validation } from "../../mvc/interceptor/validation";
import { RouterHelper } from "../../mvc/helpers/router.helper";
import { MessageHelper } from "../../mvc/helpers/message.helper";
import { MvcDataService } from "../../mvc/services/data.service";
import { FileEx } from "../../mvc/decorators/file.decorator";
import { UtilityHelper } from "../../mvc/helpers/utility.helper";
import { FileDto } from "../../mvc/domains/objects/file.dto";
import { ResultApi } from "../../mvc/domains/data/result.api";
import { TableEx } from "../../mvc/decorators/table.decorator";
import { MvcEventService } from "../../mvc/services/event.service";
import { ResultType } from "../../mvc/domains/enums/result.type";
import { ObjectEx } from "../../mvc/decorators/object.decorator";
import { DecoratorHelper } from "../../mvc/helpers/decorator.helper";
import { StringEx } from "../../mvc/decorators/string.decorator";
import { Component, ViewEncapsulation, OnInit, OnDestroy } from "@angular/core";
import { DataType, StringType, StoreFileType } from "../../mvc/domains/enums/data.type";

@Component({
    selector: 'app-root',
    styleUrls: ['./app.scss'],
    templateUrl: './app.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, OnDestroy {
    loading: boolean;
    loadingText = 'Loading...';
    subscribeSave: Subscription;
    subscribeDelete: Subscription;

    constructor(
        public router: Router,
        public data: DataService,
        public service: ApiService,
        public event: MvcEventService,
        public mvcData: MvcDataService) {
        UtilityHelper.setCmsInformation();
        AppConfig.EnableActive = false;
        AppConfig.EnableDeleted = true;
        AppConfig.ApiUrl = environment.api;
    }
    async ngOnInit() {
        this.loading = true;
        this.subscribeSave = this.event.Save.subscribe(async (obj: any) => {
            if (obj) {
                let item = _.cloneDeep(obj),
                    valid = await validation(item, this.event, this.service);
                if (valid) {
                    this.loading = true;
                    this.loadingText = 'Loading...';

                    if (!obj.TableEx) {
                        item.TableEx = DecoratorHelper.DecoratorClassByTable(typeof (item));
                    }
                    item.TableEx = _.cloneDeep(obj.TableEx);

                    // phone
                    this.updatePhone(item);

                    // upload
                    await this.uploadFiles(item);

                    // primaryKey
                    let primaryKey = this.primaryKey(item);

                    this.loadingText = 'Saving...';
                    let table: TableEx = <TableEx>item.TableEx;
                    if (item && item[primaryKey]) {
                        this.service.update(table.name, item).then((result: ResultApi) => {
                            if (result.Type == ResultType.Success) {
                                RouterHelper.NavigateToGridPage(this.router);
                                toastr.success('Save success', 'Success');
                            } else {
                                let description = result.Description || MessageHelper.SystemWrong;
                                toastr.warning(description, 'Error');
                            }
                            this.loading = false;
                        });
                    } else {
                        this.service.insert(table.name, item).then((result: ResultApi) => {
                            if (result.Type == ResultType.Success) {
                                RouterHelper.NavigateToGridPage(this.router);
                                toastr.success('Save success', 'Success');
                            } else {
                                let description = result.Description || MessageHelper.SystemWrong;
                                toastr.warning(description, 'Error');
                            }
                            this.loading = false;
                        });
                    }
                }
            }
        });
        this.subscribeDelete = this.event.Delete.subscribe((obj: any) => {
            if (obj) {
                this.loading = true;
                let item = _.cloneDeep(obj);
                this.loadingText = 'Deleting...';
                let table: TableEx = <TableEx>item.TableEx;
                this.service.delete(table.name, item.Id).then((result: ResultApi) => {
                    if (result.Type == ResultType.Success)
                        this.event.ReloadDatagrid.emit();
                    this.loading = false;
                });
            }
        });
        this.loading = false;
    }

    private primaryKey(item: any) {
        let table: TableEx = <TableEx>item.TableEx,
            properties = Object.getOwnPropertyNames(item);
        if (properties && properties.length > 0) {
            for (let i = 0; i < properties.length; i++) {
                let property = properties[i];
                let decorator = <ObjectEx>DecoratorHelper.DecoratorProperty(table.className, property);
                if (decorator && decorator.primaryKey) {
                    return decorator.property;
                }
            }
        }
        return null;
    }
    private updatePhone(item: any) {
        let table: TableEx = <TableEx>item.TableEx,
            properties = Object.getOwnPropertyNames(item);
        if (properties && properties.length > 0) {
            for (let i = 0; i < properties.length; i++) {
                let property = properties[i];
                let decorator = <ObjectEx>DecoratorHelper.DecoratorProperty(table.className, property);
                if (decorator &&
                    item[decorator.property] &&
                    decorator.dataType == DataType.String &&
                    (<StringEx>decorator).type == StringType.Phone) {
                    let $element = <any>jQuery('#' + decorator.id);
                    if ($element && $element.length > 0) {
                        let $item = <any>jQuery('#' + decorator.id),
                            number = $item && $item.length > 0 && $item.intlTelInput("getNumber");
                        item[decorator.property] = number;
                    }
                }
            }
        }
    }

    private async uploadFiles(item: any) {
        let table: TableEx = <TableEx>item.TableEx,
            properties = Object.getOwnPropertyNames(item);
        if (properties && properties.length > 0) {
            for (let i = 0; i < properties.length; i++) {
                let property = properties[i];
                let decorator = <ObjectEx>DecoratorHelper.DecoratorProperty(table.className, property);
                if (decorator &&
                    item[decorator.property] &&
                    decorator.dataType == DataType.File) {
                    let files: FileDto[];
                    if (typeof item[decorator.property] == 'string') {
                        let json: string = item[decorator.property];
                        if (json.indexOf('Data') >= 0)
                            files = <FileDto[]>JSON.parse(item[decorator.property]);
                        else {
                            files = [{ Data: json }];
                        }
                    } else files = <FileDto[]>item[decorator.property];
                    if ((<FileEx>decorator).store == StoreFileType.Database) {
                        if (files && files.length > 0) {
                            let file = files[0];
                            if (file.Data) {
                                let data = file.Data.replace(/data:image.*?,/i, '');
                                item[decorator.property] = atob(data);
                            }
                        }
                    } else {
                        let fileUploads: any[] = [];
                        if (files && files.length > 0) {
                            for (let i = 0; i < files.length; i++) {
                                let file = files[i],
                                    length = files.length;
                                this.loadingText = `Upload ${i}/${length}...`;
                                if (file.Data) {
                                    await this.service.upload({
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

    ngOnDestroy() {
        if (this.subscribeSave) {
            this.subscribeSave.unsubscribe();
            this.subscribeSave = null;
        }
        if (this.subscribeDelete) {
            this.subscribeDelete.unsubscribe();
            this.subscribeDelete = null;
        }
    }
}

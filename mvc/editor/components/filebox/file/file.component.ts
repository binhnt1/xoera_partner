import "reflect-metadata";
import * as _ from "lodash";
import { AppConfig } from "../../../../../mvc/helpers/app.config";
import { MvcDataService } from "../../../../services/data.service";
import { MvcDialogService } from "../../../../services/dialog.service";
import { FileEx } from "../../../../../mvc/decorators/file.decorator";
import { UtilityHelper } from "../../../../../mvc/helpers/utility.helper";
import { MessageHelper } from "../../../../../mvc/helpers/message.helper";
import { FileDto } from "../../../../../mvc/domains/objects/file.dto";
import { ValidatorHelper } from "../../../../../mvc/helpers/validator.helper";
import { StoreFileType } from "../../../../../mvc/domains/enums/data.type";
import { OnInit, Input, Component, Output, EventEmitter, ViewChild, ElementRef, DoCheck } from "@angular/core";

@Component({
    styleUrls: ['./file.scss'],
    selector: 'editor-filebox-file',
    templateUrl: './file.component.html',
})
export class EditorFileBoxFileComponent implements OnInit, DoCheck {
    files: FileDto[];
    classAlign: string;
    classLabel: string;
    classInput: string;

    @Input() object: any;
    @Input() property: string;
    @Input() disabled: boolean;
    @Input() decorator: FileEx;
    @Output('objectChange') objectChange = new EventEmitter();

    @ViewChild('fileInput', null) fileInput: ElementRef;

    constructor(
        public data: MvcDataService,
        public dialog: MvcDialogService) {
        this.files = [];
    }

    ngOnInit() {
        this.decorator = _.cloneDeep(this.decorator);
        this.classAlign = UtilityHelper.alignString(this.decorator.align);

        // grid
        if (!this.decorator.grid) this.decorator.grid = '3-9';
        let classLabel = 'col-sm-' + this.decorator.grid.split('-')[0],
            classInput = 'col-sm-' + this.decorator.grid.split('-')[1];
        this.classLabel = classLabel + (this.decorator.classLabel ? ' ' + this.decorator.classLabel : '');
        this.classInput = classInput + (this.decorator.classInput ? ' ' + this.decorator.classInput : '');

        // set value
        this.renderFile();
    }

    ngDoCheck() {
        let value = this.object[this.decorator.property];
        if (this.decorator.value != value) {
            this.decorator.value = value;
            this.decorator.valueDisplay = value;
            this.renderFile();
        }
    }

    public renderFile() {
        if (this.decorator.store != StoreFileType.Database) {
            let array = Array.isArray(this.decorator.value)
                ? <string[]>this.decorator.value
                : this.decorator.value && <string[]>JSON.parse(this.decorator.value);
            if (array && array.length > 0) {
                array.forEach((item: any) => {
                    if (typeof item == 'string') {
                        this.files.push({
                            Path: AppConfig.ApiUrl + '/' + item,
                            Name: item.substring(item.lastIndexOf('/') + 1).substring(item.lastIndexOf('\\') + 1)
                        });
                    } else {
                        this.files.push(item);
                    }
                });
                this.objectChange.emit(this.files);
            }
        } else {
            if (this.decorator.value) {
                this.files.push({
                    Name: '',
                    Data: this.decorator.value,
                });
            }
        }
    }

    public selectFileToUpload() {
        this.fileInput.nativeElement.click();
    }

    public removeFile(item: FileDto) {
        if (!this.decorator.multiple) this.files = [];
        else _.remove(this.files, c => c.Name == item.Name);
        this.objectChange.emit(this.files);
    }

    public uploadFile(event: any) {
        let files = event.srcElement.files;
        if (files && files.length > 0) {
            if (!ValidatorHelper.validImageUpload(files)) {
                this.dialog.Error(MessageHelper.FileImageInvalid, 'Upload Error');
            } else {
                this.readImage(files);
            }
        }
        this.objectChange.emit(this.files);
        this.decorator.value = JSON.stringify(this.files);
        if (this.decorator.value) {
            this.decorator.valid = true;
            this.decorator.message = '';
        }
    }
    public readImage(files: any) {
        if (files && files.length > 0) {
            if (!this.decorator.multiple) this.files = [];
            for (let i = 0; i < files.length; i++) {
                let file = files[i],
                    item: FileDto = {
                        Name: file.name,
                        NativeData: file,
                        Size: file.size / 1024 / 1024,
                    };
                this.files.push(item);

                let FR = new FileReader();
                FR.onload = () => {
                    item.Data = FR.result;
                };
                FR.onerror = () => {
                    this.dialog.Error(MessageHelper.FileImageInvalid);
                };
                FR.readAsDataURL(files[i]);
            }
        }
    }
}

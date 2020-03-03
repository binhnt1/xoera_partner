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
import { StoreFileType, StoreFileTypeAware } from "../../../../../mvc/domains/enums/data.type";
import { OnInit, Input, Component, Output, EventEmitter, ViewChild, ElementRef, DoCheck } from "@angular/core";

@StoreFileTypeAware
@Component({
    styleUrls: ['./image.scss'],
    selector: 'editor-filebox-image',
    templateUrl: './image.component.html',
})
export class EditorFileBoxImageComponent implements OnInit, DoCheck {
    files: FileDto[];
    classAlign: string;
    classLabel: string;
    classInput: string;
    loadComplete: boolean;

    @Input() object: any;
    @Input() property: string;
    @Input() disabled: boolean;
    @Input() decorator: FileEx;
    @Output('valueChange') valueChange = new EventEmitter();
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
        this.classInput = classInput + (this.decorator.classInput ? ' ' + this.classInput : '');

        // set value
        this.renderImage();
    }

    ngDoCheck() {
        let value = this.object[this.decorator.property];
        if (this.decorator.value != value) {
            this.decorator.value = value;
            this.decorator.valueDisplay = value;
            this.valueChange.emit(this.object[this.decorator.property]);
            this.renderImage();
        }
    }

    public renderImage() {
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
            }
        } else {
            if (this.decorator.value) {
                let value: string = this.decorator.value;
                if (value.indexOf('data:image') < 0)
                    value = 'data:image/png;base64,' + value;
                this.files.push({
                    Name: '',
                    Data: value,
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

        this.decorator.value = JSON.stringify(this.files);
        this.object[this.decorator.property] = JSON.stringify(this.files);
        if (this.decorator.value) {
            this.decorator.valid = true;
            this.decorator.message = '';
        }
        this.valueChange.emit(this.object[this.decorator.property]);
    }

    public uploadFile(event: any) {
        let files = event.srcElement.files;
        if (files && files.length > 0) {
            if (!ValidatorHelper.validImageUpload(files)) {
                this.dialog.Error(MessageHelper.FileImageInvalid, 'Upload Error');
            } else {
                this.loadComplete = false;
                this.readImage(files);
            }
        }

        let interval = setInterval(() => {
            if (this.loadComplete) {
                clearInterval(interval);
                this.decorator.value = JSON.stringify(this.files);
                this.object[this.decorator.property] = JSON.stringify(this.files);
                if (this.decorator.value) {
                    this.decorator.valid = true;
                    this.decorator.message = '';
                }
                this.valueChange.emit(this.object[this.decorator.property]);
            }
        }, 100);
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

                let FR = new FileReader();
                FR.onload = () => {
                    item.Data = FR.result;
                    this.files.push(item);
                    this.loadComplete = true;
                };
                FR.onerror = () => {
                    this.dialog.Error(MessageHelper.FileImageInvalid);
                    this.loadComplete = true;
                };
                FR.readAsDataURL(files[i]);
            }
        }
    }
}

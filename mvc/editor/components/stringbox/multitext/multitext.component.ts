declare var tinymce: any;
import "reflect-metadata";
import * as _ from "lodash";
import { Subscription } from "rxjs/Subscription";
import { MvcEventService } from "../../../../services/event.service";
import { UtilityHelper } from "../../../../../mvc/helpers/utility.helper";
import { ObjectEx } from "../../../../../mvc/decorators/object.decorator";
import { StringEx } from "../../../../../mvc/decorators/string.decorator";
import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from "@angular/core";
import { StringType, StringTypeAware } from "../../../../../mvc/domains/enums/data.type";

@StringTypeAware
@Component({
    styleUrls: ['./multitext.scss'],
    selector: 'editor-stringbox-multitext',
    templateUrl: './multitext.component.html',
})
export class EditorStringBoxMultiTextComponent implements OnInit, OnDestroy {
    classAlign: string;
    classLabel: string;
    classInput: string;
    subscribeValidation: Subscription;

    @Input() object: any;
    @Input() property: string;
    @Input() disabled: boolean;
    @Input() decorator: StringEx;
    @Output('valueChange') valueChange = new EventEmitter();
    @Output('objectChange') objectChange = new EventEmitter();

    constructor(public event: MvcEventService) {

    }

    ngOnInit() {
        if (this.decorator) {
            this.decorator = _.cloneDeep(this.decorator);
            this.classAlign = UtilityHelper.alignString(this.decorator.align);
        }

        // set default value
        if (!this.decorator.value && this.decorator.default) {
            this.decorator.value = _.cloneDeep(this.decorator.default);
            this.object[this.decorator.property] = this.decorator.value;
        }

        // subscribe validate
        if (!this.subscribeValidation) {
            this.subscribeValidation = this.event.Validate.subscribe((item: ObjectEx) => {
                if (item.table == this.decorator.table &&
                    item.property == this.decorator.property) {
                    this.decorator.valid = item.valid;
                    this.decorator.message = item.message;
                }
            })
        }

        // grid
        if (!this.decorator.grid) this.decorator.grid = '3-9';
        let classLabel = 'col-sm-' + this.decorator.grid.split('-')[0],
            classInput = 'col-sm-' + this.decorator.grid.split('-')[1];
        this.classLabel = classLabel + (this.decorator.classLabel ? ' ' + this.decorator.classLabel : '');
        this.classInput = classInput + (this.decorator.classInput ? ' ' + this.decorator.classInput : '');

        // render editor
        if (this.decorator.editable) {
            if (this.decorator.type == StringType.MultiHtml) {
                let interval = setInterval(() => {
                    let elementId = 'textarea#' + this.decorator.id,
                        $element = <any>jQuery(elementId);
                    if ($element && $element.length > 0) {
                        clearInterval(interval);
                        if (!this.decorator.value)
                            this.decorator.value = null;
                        if (!this.decorator.valueDisplay)
                            this.decorator.valueDisplay = null;
                        let variable = this.decorator.variables && this.decorator.variables.length > 0,
                            toolbar = 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help';
                        if (variable) toolbar = 'menuVariables | ' + toolbar;

                        tinymce.remove(elementId);
                        tinymce.init({
                            selector: elementId,
                            height: 500,
                            menubar: true,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor textcolor',
                                'searchreplace visualblocks code fullscreen variable code',
                                'insertdatetime media table paste help wordcount'
                            ],
                            toolbar: toolbar,
                            setup: (editor: any) => {
                                if (variable) {
                                    editor.ui.registry.addMenuButton('menuVariables', {
                                        text: 'Variables',
                                        title: 'Variables',
                                        fetch: (callback: any) => {
                                            let items = [];
                                            for (let i = 0; i < this.decorator.variables.length; i++) {
                                                let item: any = {},
                                                    itemVarible = this.decorator.variables[i];
                                                item.type = itemVarible.childrens && itemVarible.childrens.length > 0
                                                    ? 'nestedmenuitem'
                                                    : 'menuitem';
                                                item.icon = itemVarible.icon;
                                                item.text = itemVarible.title;
                                                if (itemVarible.variable) {
                                                    item.onAction = () => {
                                                        editor.plugins.variable.addVariable(itemVarible.variable);
                                                    }
                                                }
                                                if (itemVarible.childrens && itemVarible.childrens.length > 0) {
                                                    let childItems = [];
                                                    for (let j = 0; j < itemVarible.childrens.length; j++) {
                                                        let itemF2: any = {},
                                                            itemVaribleF2 = itemVarible.childrens[j];
                                                        itemF2.type = 'menuitem';
                                                        itemF2.icon = itemVaribleF2.icon;
                                                        itemF2.text = itemVaribleF2.title;
                                                        if (itemVaribleF2.variable) {
                                                            itemF2.onAction = () => {
                                                                editor.plugins.variable.addVariable(itemVaribleF2.variable);
                                                            }
                                                        }
                                                        childItems.push(itemF2);
                                                    }
                                                    item.getSubmenuItems = () => {
                                                        return childItems;
                                                    }
                                                }
                                                items.push(item);
                                            }
                                            callback(items);
                                        }
                                    });
                                }
                            },
                            init_instance_callback: (editor: any) => {
                                editor.on('click', (e: any) => {
                                    this.decorator.valid = true;
                                    this.decorator.message = null;
                                });
                                editor.on('blur', (e: any) => {
                                    let htmlContent = tinymce.get(this.decorator.id).getContent();
                                    this.decorator.value = htmlContent;
                                    this.object[this.decorator.property] = htmlContent;
                                    if (this.decorator.value) {
                                        this.decorator.valid = true;
                                        this.decorator.message = '';
                                    }
                                    this.valueChange.emit(this.object[this.decorator.property]);
                                });
                            },
                            content_style: ".variable{cursor:default;background-color:#65b9dd;color:#FFF;padding:0px 6px;border-radius:3px;font-weight: bold;font-style:normal;display:inline-block;}"
                        });
                    }
                }, 100);
            }
        }
    }

    ngOnDestroy() {
        if (this.decorator) {
            this.decorator.valid = true;
            this.decorator.message = null;
            this.object[this.decorator.property] = null;
        }
    }

    onGenerate() {
        if (this.decorator.type == StringType.AutoGenerate) {
            let max = this.decorator.max || 10,
                value = UtilityHelper.randomString(max);
            this.decorator.value = value;
            this.object[this.decorator.property] = value;
            if (this.decorator.value) {
                this.decorator.valid = true;
                this.decorator.message = '';
            }
        }
    }
}

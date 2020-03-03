import "reflect-metadata";
import * as $ from "jquery";
import * as _ from "lodash";
import { Subscription } from "rxjs/Subscription";
import { MvcEventService } from "../../../../services/event.service";
import { UtilityHelper } from "../../../../../mvc/helpers/utility.helper";
import { ObjectEx } from "../../../../../mvc/decorators/object.decorator";
import { StringEx } from "../../../../../mvc/decorators/string.decorator";
import { StringType, StringTypeAware } from "../../../../../mvc/domains/enums/data.type";
import { Component, Input, AfterContentInit, Output, EventEmitter, OnDestroy, DoCheck } from "@angular/core";

@StringTypeAware
@Component({
    styleUrls: ['./text.scss'],
    selector: 'editor-stringbox-text',
    templateUrl: './text.component.html',
})
export class EditorStringBoxTextComponent implements AfterContentInit, OnDestroy, DoCheck {
    type: string;
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

    ngAfterContentInit() {
        if (this.decorator) {
            this.decorator = _.cloneDeep(this.decorator);
            this.classAlign = UtilityHelper.alignString(this.decorator.align);
        }

        // set default value
        if (!this.decorator.value && this.decorator.default) {
            this.decorator.value = _.cloneDeep(this.decorator.default);
            this.object[this.decorator.property] = this.decorator.value;
        }

        // format
        this.type = 'text';
        switch (this.decorator.type) {
            case StringType.Cvc: this.type = 'tel'; break;
            case StringType.Phone: this.type = 'tel'; break;
            case StringType.Email: this.type = 'email'; break;
            case StringType.PhoneText: this.type = 'tel'; break;
            case StringType.Password: this.type = 'password'; break;
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
        if (!this.decorator.grid) this.decorator.grid = '3-6';
        let classLabel = 'col-sm-' + this.decorator.grid.split('-')[0],
            classInput = 'col-sm-' + this.decorator.grid.split('-')[1];
        this.classLabel = classLabel + (this.decorator.classLabel ? ' ' + this.decorator.classLabel : '');
        this.classInput = classInput + (this.decorator.classInput ? ' ' + this.decorator.classInput : '');

        // render editor
        if (this.decorator.editable) {
            if (this.decorator.type == StringType.Phone) {
                if (this.decorator.value) {
                    this.decorator.value = this.decorator.value.replace(' ', '').replace(' ', '').replace(' ', '');
                    this.object[this.decorator.property] = this.decorator.value;
                }

                let interval = setInterval(() => {
                    let $element = <any>jQuery('#' + this.decorator.id);
                    if ($element && $element.length > 0) {
                        clearInterval(interval);
                        if (!this.decorator.value)
                            this.decorator.value = null;
                        if (!this.decorator.valueDisplay)
                            this.decorator.valueDisplay = null;
                        $element.intlTelInput({
                            autoFormat: false,
                            customPlaceholder: '',
                            initialCountry: 'auto',
                            separateDialCode: true,
                            autoPlaceholder: false,
                            formatOnDisplay: false,
                            autoHideDialCode: false,
                            utilsScript: "../../../../../assets/plugins/bootstrap-phone/build/js/utils.js?" + (new Date()).getTime(),
                            geoIpLookup: (callback: any) => {
                                if (!this.decorator.value) {
                                    $.get("//ip-api.com/json/", function () { }, "jsonp").always(function (resp) {
                                        let countryCode: string = resp && resp.countryCode || "gb";
                                        if (countryCode)
                                            countryCode = countryCode.toLowerCase();
                                        if (callback) callback(countryCode);
                                    });
                                }
                            },
                            countrychange: () => {
                                let $item = <any>jQuery('#' + this.decorator.id),
                                    number = $item && $item.length > 0 && $item.intlTelInput("getNumber");
                                this.decorator.value = number;
                            }
                        });
                        setTimeout(() => {
                            let countryData = $element.intlTelInput('getSelectedCountryData');
                            if (!countryData || !countryData.dialCode) {
                                $element.intlTelInput("setCountry", "gb");
                            }
                        }, 1000);
                        if (this.decorator.value) {
                            $element.intlTelInput("setNumber", this.decorator.value);
                        }
                        this.valueChanged();
                    }
                }, 100);
            } else if (this.decorator.type == StringType.Cvc) {
                let interval = setInterval(() => {
                    let $element = <any>jQuery('#' + this.decorator.id);
                    if ($element && $element.length > 0) {
                        clearInterval(interval);
                        $element.payment('formatCardCVC');
                    }
                }, 100);
            } else if (this.decorator.type == StringType.Card) {
                let interval = setInterval(() => {
                    let $element = <any>jQuery('#' + this.decorator.id);
                    if ($element && $element.length > 0) {
                        clearInterval(interval);
                        $element.payment('formatCardNumber');
                    }
                }, 100);
            }
        }
    }

    ngDoCheck() {
        let value = this.object[this.decorator.property];
        if (this.decorator.value != value) {
            this.decorator.value = value;
            this.decorator.valueDisplay = value;
            if (this.decorator.type == StringType.Phone) {
                if (this.decorator.value) {
                    this.decorator.value = this.decorator.value.replace(' ', '').replace(' ', '').replace(' ', '');
                    this.object[this.decorator.property] = this.decorator.value;
                }
                if (this.object &&
                    this.decorator &&
                    this.object[this.decorator.property]) {
                    setTimeout(() => {
                        let value = this.object[this.decorator.property],
                            $element = <any>jQuery('#' + this.decorator.id);
                        if ($element && $element.length > 0) {
                            $element.intlTelInput("setNumber", value);
                            let countryData = $element.intlTelInput('getSelectedCountryData');
                            if (!countryData || !countryData.dialCode) {
                                $element.intlTelInput("setCountry", "gb");
                            }
                        }
                    }, 500);
                }
            }
        }
    }

    ngOnDestroy() {
        if (this.subscribeValidation) {
            this.subscribeValidation.unsubscribe();
            this.subscribeValidation = null;
        }
    }

    valueChanged() {
        if (this.decorator.type == StringType.Phone) {
            let value = this.object[this.decorator.property];
            let $item = <any>jQuery('#' + this.decorator.id);
            if ($item && $item.length > 0) {
                value = $item.intlTelInput("getNumber");
                if (value == '+undefined') value = null;
            }
            this.decorator.value = value;
        } else this.decorator.value = this.object[this.decorator.property];
        if (this.decorator.value) {
            this.decorator.valid = true;
            this.decorator.message = '';
        }
        this.valueChange.emit(this.object[this.decorator.property]);
    }

    onKeyup() {
        if (this.decorator.type == StringType.Phone || this.decorator.type == StringType.PhoneText) {
            if (!this.decorator.value) return;
            if (this.decorator.value.length == 0) return;

            if (/\D/g.test(this.decorator.value))
                this.decorator.value = this.decorator.value.replace(/\D/g, '');
            if (this.decorator.type == StringType.Phone) {
                if (this.decorator.value.indexOf('0') == 0)
                    this.decorator.value = this.decorator.value.replace('0', '');
            }
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

    onKeypress(event: any) {
        if (this.decorator.type == StringType.Phone) {
            if (isNaN(event.key))
                event.preventDefault();
            else if (event.key == '0') {
                if (this.decorator.type == StringType.Phone) {
                    if (!this.decorator.value || this.decorator.value.length == 0) {
                        event.preventDefault();
                    }
                }
            }
        }
    }
}

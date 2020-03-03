import * as _ from 'lodash';
import * as $ from 'jquery';
import { DecoratorHelper } from './decorator.helper';
import { AlignType } from '../domains/enums/align.type';
import { OrderType } from '../domains/enums/order.type';
import { CompareType } from '../domains/enums/compare.type';
import { DropDownEx } from '../decorators/dropdown.decorator';
import { DateTimeFormat } from '../decorators/datetime.decorator';

export class UtilityHelper {
    private static SEPARATOR = '_|_';

    public static setCmsInformation() {
        setTimeout(() => {
            $('.page-footer-inner').html('2020 © Xoera CMS by xoera.dev@gmail.com');
        }, 1000);
    }
    public static randomItem(items: any[]): any {
        var item = items[Math.floor(Math.random() * items.length)];
        return item;
    }
    public static referenceKey(item: DropDownEx) {
        let referenceKey: string;
        if (item.reference) {
            let decoratorClass = DecoratorHelper.DecoratorClass(item.reference);
            if (decoratorClass)
                referenceKey = decoratorClass.name + '.' + item.propertyValue;
            else
                referenceKey = item.reference.name + '.' + item.propertyValue;
        } else {
            referenceKey = item.property;
        }
        try {
            referenceKey = referenceKey.toLowerCase();
        } catch (e) {
            console.log(e);
        }
        return referenceKey;
    }
    public static alignString(type: AlignType): string {
        if (!type) return AlignType[AlignType.Left].toLowerCase();
        return AlignType[type].toLowerCase();
    }
    public static buildSort(name: string, type: OrderType): string {
        return "[" + name + UtilityHelper.SEPARATOR + type + "]";
    }
    public static buildFiler(name: string, type: CompareType, value1: any, value2?: any) {
        var filter = "[" + name + UtilityHelper.SEPARATOR + type + "_|_" + value1;
        filter += !value2 ? "]" : UtilityHelper.SEPARATOR + value2 + "]";
        return filter;
    }
    public static replace(source: string, searchValue: string, replaceValue?: string): string {
        if (!replaceValue) replaceValue = '';
        if (!source || !searchValue) return source;
        while (source.indexOf(searchValue) >= 0)
            source = source.replace(searchValue, replaceValue);
        return source;
    }

    public static validImageUpload(files: any): boolean {
        if (files && files[0]) {
            let file = files[0];
            if (file.type.search(/image\/(jpg|jpeg|png|gif|svg)/) < 0)
                return false;
            if (file.size > 30 * 1024 * 1024)
                return false;
            return true;
        }
        return false;
    }

    public static randomText(length: number) {
        var result = '';
        var characters = 'abcdefghijklmnopqrstuvwxyz';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    public static randomString(length: number) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^*';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    public static executeTimeout(func: () => void, timeout: number = 1000) {
        if (func) {
            setTimeout(() => {
                func();
            }, timeout);
        }
    }

    public static arrayMove(arr: any[], fromIndex: number, toIndex: number): any[] {
        let items = _.cloneDeep(arr);
        var element = _.cloneDeep(items[fromIndex]);
        items.splice(fromIndex, 1);
        items.splice(toIndex, 0, element);
        return items;
    }

    public static toDateTimeString(date: Date, format: DateTimeFormat) {
        let days = date.getDate(),
            hours = date.getHours(),
            years = date.getFullYear(),
            minutes = date.getMinutes(),
            seconds = date.getSeconds(),
            months = date.getMonth() + 1;

        switch (format) {
            case DateTimeFormat.HM: return hours + ':' + minutes;
            case DateTimeFormat.DMY: return days + '/' + months + '/' + years;
            case DateTimeFormat.MDY: return months + '/' + days + '/' + years;
            case DateTimeFormat.YMD: return years + '/' + months + '/' + days;
            case DateTimeFormat.HMS: return hours + ':' + minutes + ':' + seconds;
            case DateTimeFormat.DMYHM: return days + '/' + months + '/' + years + ' ' + hours + ':' + minutes;
            case DateTimeFormat.DMYHMS: return days + '/' + months + '/' + years + ' ' + hours + ':' + minutes + ':' + seconds;
        }
        return '';
    }

    public static toLocalTime(dateObj: any, gmt: boolean = false): string {
        if (!dateObj) return '';
        let date = new Date(dateObj);
        var tzo = -date.getTimezoneOffset(),
            dif = tzo >= 0 ? '+' : '-',
            pad = function (num: number) {
                var norm = Math.abs(Math.floor(num));
                return (norm < 10 ? '0' : '') + norm;
            };
        var result = date.getFullYear()
            + '-' + pad(date.getMonth() + 1)
            + '-' + pad(date.getDate())
            + 'T' + pad(date.getHours())
            + ':' + pad(date.getMinutes())
            + ':' + pad(date.getSeconds());
        if (gmt) result += dif + pad(tzo / 60) + ':' + pad(tzo % 60);
        else result += '.000Z';
        return result;
    }
}
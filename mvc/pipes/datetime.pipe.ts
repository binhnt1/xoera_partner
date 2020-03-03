import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'datex'
})

export class DatexPipe implements PipeTransform {
    transform(value: Date): string {
        return this.dateTimeString(value);
    }

    private dateTimeString(date: Date): string {
        if (!date) return '';
        if (date == null) return '';
        if (typeof date == 'string')
            date = new Date(date);

        var message = '';
        var month = date.getMonth() + 1;
        message += (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
        message += '/' + (month < 10 ? '0' + month : month);
        message += '/' + date.getFullYear();
        message += ' ' + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
        message += ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
        return message;
    }
}
export class UtilityHelper {
    public static FormatDateTime(date: Date): string {
        let days = date.getDate(),
            hours = date.getHours(),
            years = date.getFullYear(),
            minutes = date.getMinutes(),
            months = date.getMonth() + 1,
            daysString = days < 10 ? '0' + days : days,
            hoursString = hours < 10 ? '0' + hours : hours,
            monthsString = months < 10 ? '0' + months : months,
            minutesString = minutes < 10 ? '0' + minutes : minutes;
        return daysString + '/' + monthsString + '/' + years + ' ' + hoursString + ':' + minutesString;
    }
}

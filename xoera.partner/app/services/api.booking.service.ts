import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Zone } from '../domains/data/zone';
import { Http, Headers } from '@angular/http';
import { Driver } from '../domains/data/driver';
import { Booking } from '../domains/data/booking';
import { customer } from '../domains/data/customer';
import { Quotation } from '../domains/data/quotation';
import { PickType } from '../domains/enums/pickup.type';
import { ReturnType } from '../domains/enums/return.type';
import { VehicleType } from '../domains/data/vehicle.type';
import { BookingDto } from '../domains/objects/booking.dto';
import { NearestDriver } from '../domains/data/nearest.driver';
import { BookingHistory } from '../domains/data/booking.history';
import { SystemParameter } from '../domains/data/system.parameter';
import { SearchAddressType } from '../domains/enums/search.address.type';
import { Address, ViaAddress, AddressPostCode } from '../domains/data/address';

@Injectable()
export class ApiBookingService {
    private bookingSourceType: number = 1;
    private inoviclabApi = 'https://testapi.inoviclabs.co.uk';

    constructor(protected http: Http) {
    }

    vehicleTypes() {
        let api = this.inoviclabApi + '/api/VehicleTypes';
        return this.http.get(api)
            .map(res => <VehicleType[]>res.json())
            .toPromise();
    }
    systemParameters() {
        let api = this.inoviclabApi + '/api/SystemParameters';
        return this.http.get(api)
            .map(res => <SystemParameter>res.json())
            .toPromise();
    }
    findZone(item: Address) {
        let api = this.inoviclabApi + '/api/Zone/FindZone/' + item.postcode + '/' + item.lat + '/' + item.lng;
        return this.http.get(api)
            .map(res => <Zone>res.json());
    }

    driverLookup() {
        let api = this.inoviclabApi + '/api/Driver/DriverLookup';
        return this.http.get(api)
            .map(res => <Driver[]>res.json())
            .toPromise();
    }
    nearestDriver(item: Address) {
        let api = this.inoviclabApi + '/api/Driver/NearestDriver/' + item.lat + '/' + item.lng;
        return this.http.get(api)
            .map(res => <NearestDriver>res.json());
    }
    quotation(item: BookingDto, calcRoute: boolean = false) {
        let headers = new Headers(),
            api = this.inoviclabApi + '/api/Quotation';
        headers.append('Content-Type', 'application/json');

        // Via address
        let viaaddresses = new Array();
        if (item.ViaAddress) {
            item.ViaAddress.forEach((element: Address) => {
                if (element) {
                    let viaAddress = ViaAddress.ToViaAddress(element);
                    viaaddresses.push(viaAddress);
                }
            });
        }

        // DateTime
        let time = item.DateTime;
        if (item.PickType == PickType.Now) {
            time = time || (new Date());
        }
        let params = {
            ip: item.Ip,
            accId: item.Account,
            fleetId: item.Fleet,
            bookerId: item.Booker,
            recalcRoute: calcRoute,
            vehTypeId: item.Vehicle,
            zoneId: item.PickUpZoneId,
            viaaddresses: viaaddresses,
            pickupLat: item.PickUp.lat,
            pickupLng: item.PickUp.lng,
            travelTime: item.TravelTime,
            distance: item.RouterDistance,
            dropoffLat: item.PickDown.lat,
            dropoffLng: item.PickDown.lng,
            source: this.bookingSourceType,
            pickup: item.PickUp.fullAddress,
            dropoff: item.PickDown.fullAddress,
            pickupPostcode: item.PickUp.postcode,
            isASAP: item.PickType == PickType.Now,
            bookingDateTime: this.toLocalTime(time),
            dropoffPostcode: item.PickDown.postcode,
            isReturn: item.ReturnType == ReturnType.Return,
            deviceId: window.navigator.userAgent.replace(/\D+/g, ''),
            requestid: ((new Date().getTime() * 10000) + 621355968000000000).toString(),
        };
        return this.http
            .post(api, JSON.stringify(params), { headers: headers })
            .map((res: any) => <Quotation>res.json());
    }

    bookingDetail(id: number) {
        let api = this.inoviclabApi + '/api/Booking/BookingDetail/' + id;
        return this.http.get(api)
            .map(res => <Booking>res.json())
            .map(booking => Booking.ToBookingDto(booking))
            .toPromise();
    }
    detailsByPhoneNumber(code: string, phoneNumber: string) {
        let api = this.inoviclabApi + '/api/Customer/DetailsByPhoneNumber/' + code + '/' + phoneNumber;
        return this.http.get(api)
            .map(res => <customer>res.json());
    }
    bookingHistoryByCustomer(code: string, phoneNumber: string, filter: string) {
        let api = this.inoviclabApi + '/api/Booking/BookingHistoryByCustomer/' + code + '/' + phoneNumber + '/' + filter;
        return this.http.get(api)
            .map(res => <BookingHistory[]>res.json());
    }

    searchAddressPostCode(term: string, type: SearchAddressType) {
        let typeString = SearchAddressType[type].toLowerCase(),
            api = this.inoviclabApi + '/api/AddressSearch/MatchPostcode/' + term + '/' + typeString;
        return this.http.get(api)
            .map(res => <AddressPostCode>res.json());
    }
    searchAddress(term: string, type: SearchAddressType, postCode: string) {
        let typeString = SearchAddressType[type].toLowerCase(),
            api = this.inoviclabApi + '/api/AddressSearch/' + term + '/' + typeString + '/' + postCode;
        return this.http.get(api)
            .map(res => <Address[]>res.json());
    }

    private toLocalTime(date: Date, gmt: boolean = false): string {
        if (date == null) return '';
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

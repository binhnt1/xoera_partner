import { PickType } from "../enums/pickup.type";
import { ViaAddress, Address } from "./address";
import { ReturnType } from "../enums/return.type";
import { DriverType } from "../enums/driver.type";
import { RouterType } from "../enums/router.type";
import { BookingDto } from "../objects/booking.dto";
import { PaymentType } from "../enums/payment.type";

export class Booking {
    paid: boolean;
    price: number;
    jobId: number;
    topup: number;
    zoneId: number;
    custId: number;
    status: string;
    isAsap: boolean;
    fleetId: number;
    custRef: string;
    parking: number;
    distance: number;
    bookerId: number;
    driverId: number;
    signReq: boolean;
    zoneName: string;
    leadTime: number;
    luggages: number;
    pickupLat: number;
    pickupLng: number;
    isReturn: boolean;
    jobPartId: number;
    accountId: number;
    custPhone: string;
    custEmail: string;
    custNotes: string;
    vehTypeId: number;
    cashAmount: number;
    cardAmount: number;
    dropoffLat: number;
    dropoffLng: number;
    pickupNote: string;
    witingTime: number;
    bookersFee: number;
    bookersRef: string;
    passengers: number;
    custRating: number;
    travelTime: number;
    dropoffNote: string;
    bookersComm: number;
    meetnGreet: boolean;
    driverPrice: number;
    officeNotes: string;
    systemPrice: number;
    flightNumber: string;
    authorisedBy: string;
    otherCharges: number;
    noOfHandBags: number;
    noOfSmallPet: number;
    noOfLargePet: number;
    autoDispatch: boolean;
    dropoffZoneId: number;
    paymentMethod: string;
    passengerName: string;
    pickupAddress: string;
    waitingCharge: number;
    passengerPhone: string;
    passengerEmail: string;
    dropoffAddress: string;
    notesForDriver: string;
    pickupPostcode: string;
    dropoffPostcode: string;
    fixedBookerComm: number;
    accDispatchNote: string;
    customerSurname: string;
    custDialingCode: string;
    bookingDateTime: string;
    prefferedDriver: string;
    dropoffZoneName: string;
    expFlightArrival: string;
    customerFirstName: string;
    custDispatchNotes: string;
    travelTimeFromBase: number;
    isCustBlackListed: boolean;
    viaLocations: ViaAddress[];
    noOfSmallChildSeat: number;
    noOfLargeChildSeat: number;
    passengerDialingCode: string;
    arrivingFromAirportName: string;
    arrivingFromAirportCode: string;

    public static ToBookingDto(entity: Booking): BookingDto {
        let item: BookingDto = new BookingDto();
        item.PickUp = {
            lat: entity.pickupLat,
            lng: entity.pickupLng,
            postcode: entity.pickupPostcode,
            fullAddress: entity.pickupAddress,
        };
        item.PickDown = {
            lat: entity.dropoffLat,
            lng: entity.dropoffLng,
            postcode: entity.dropoffPostcode,
            fullAddress: entity.dropoffAddress,
        };
        if (entity.viaLocations && entity.viaLocations.length > 0) {
            item.ViaAddress = [];
            entity.viaLocations.forEach((address: ViaAddress) => {
                let itemVia: Address = {
                    lat: address.lat,
                    lng: address.lng,
                    postcode: address.postcode,
                    fullAddress: address.address,
                };
                item.ViaAddress.push(itemVia);
            });
        } else item.ViaAddress = [];
        item.Price = entity.price;
        item.Id = entity.jobPartId;
        item.Fleet = entity.fleetId;
        item.Booker = entity.bookerId;
        item.Driver = entity.driverId;
        item.Luggage = entity.luggages;
        item.Vehicle = entity.vehTypeId;
        item.Account = entity.accountId;
        item.DriverTopup = entity.topup;
        item.PickUpZone = entity.zoneName;
        item.PickUpZoneId = entity.zoneId;
        item.HandBag = entity.noOfHandBags;
        item.Passenger = entity.passengers;
        item.BookerRef = entity.bookersRef;
        item.CallerEmail = entity.custEmail;
        item.CallerNotes = entity.custNotes;
        item.DriverParking = entity.parking;
        item.TravelTime = entity.travelTime;
        item.SmallPet = entity.noOfSmallPet;
        item.LargePet = entity.noOfLargePet;
        item.PaymentCash = entity.cashAmount;
        item.PaymentCard = entity.cardAmount;
        item.OfficeNote = entity.officeNotes;
        item.DriverPrice = entity.driverPrice;
        item.RouterType = RouterType.Static;
        item.CallerRating = entity.custRating;
        item.PickUpLeadTime = entity.leadTime;
        item.RouterDistance = entity.distance;
        item.MeetAndGreet = entity.meetnGreet;
        item.FlightNumber = entity.flightNumber;
        item.DriverNote = entity.notesForDriver;
        item.AccountCustomerRef = entity.custRef;
        item.WaitingCharge = entity.waitingCharge;
        item.DriverBookingFee = entity.bookersFee;
        item.PassengerName = entity.passengerName;
        item.DropOffZone = entity.dropoffZoneName;
        entity.dropoffZoneId = entity.dropoffZoneId;
        item.CallerName = entity.customerFirstName;
        item.CallerSurName = entity.customerSurname;
        item.ArrivingFrom = entity.expFlightArrival;
        item.AccountAuthorisedBy = entity.authorisedBy;
        item.AccountSignatureRequired = entity.signReq;
        item.SmallChildSeat = entity.noOfSmallChildSeat;
        item.LargeChildSeat = entity.noOfLargeChildSeat;
        item.CallerBlacklisted = entity.isCustBlackListed;
        item.DriverBookerCommPercent = entity.bookersComm;
        item.DriverBookerCommFixed = entity.fixedBookerComm;
        item.TravelTimeFromDriver = entity.travelTimeFromBase;
        item.PickType = entity.isAsap ? PickType.Now : PickType.Later;
        item.ReturnType = entity.isReturn ? ReturnType.Return : ReturnType.Signle;
        item.DriverType = entity.autoDispatch ? DriverType.Dispath : DriverType.Allocate;
        item.DateTime = entity.bookingDateTime ? (new Date(entity.bookingDateTime)) : null;
        item.Payment = entity.paymentMethod == 'Card' ? PaymentType.Card : PaymentType.Cash;
        item.CallerPhone = entity.custDialingCode ? entity.custDialingCode + entity.custPhone : '';
        item.PassengerPhone = entity.passengerPhone ? entity.passengerDialingCode + entity.passengerPhone : '';
        return item;
    }
}
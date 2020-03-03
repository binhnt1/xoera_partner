import { Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { Zone } from "../../../../domains/data/zone";
import { Driver } from "../../../../domains/data/driver";
import { Address } from "../../../../domains/data/address";
import { customer } from "../../../../domains/data/customer";
import { ApiService } from "../../../../services/api.service";
import { Quotation } from "../../../../domains/data/quotation";
import { CardDto } from "../../../../domains/objects/card.dto";
import { DataService } from "../../../../services/data.service";
import { UtilService } from "../../../../services/util.service";
import { DialogType } from "../../../../domains/enums/dialog.type";
import { BookingDto } from "../../../../domains/objects/booking.dto";
import { PaymentType } from "../../../../domains/enums/payment.type";
import { NearestDriver } from "../../../../domains/data/nearest.driver";
import { validation } from "../../../../../../mvc/interceptor/validation";
import { Dictionary } from "../../../../../../mvc/domains/data/dictionary";
import { DropDownTypeAware } from "../../../../domains/enums/dropdown.type";
import { PositionTypeAware } from "../../../../domains/enums/position.type";
import { ApiBookingService } from "../../../../services/api.booking.service";
import { MvcAuthService } from "../../../../../../mvc/services/auth.service";
import { UtilityHelper } from "../../../../../../mvc/helpers/utility.helper";
import { MvcEventService } from "../../../../../../mvc/services/event.service";
import { EditorComponent } from "../../../../../../mvc/editor/editor.component";
import { AlignTypeAware } from "../../../../../../mvc/domains/enums/align.type";
import { PickTypeAware, PickType } from "../../../../domains/enums/pickup.type";
import { MvcDialogService } from "../../../../../../mvc/services/dialog.service";
import { AutocompleteTypeAware } from "../../../../domains/enums/autocomplete.type";
import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from "@angular/core";
import { SystemParameter, FleetBooker, FleetAccount } from "../../../../domains/data/system.parameter";
import { SearchAddressType, SearchAddressTypeAware } from "../../../../domains/enums/search.address.type";

@PickTypeAware
@AlignTypeAware
@DropDownTypeAware
@PositionTypeAware
@AutocompleteTypeAware
@SearchAddressTypeAware
@Component({
    styleUrls: ['./booking.item.scss'],
    selector: 'xoera-partner-booking-item',
    templateUrl: './booking.item.component.html',
    host: { '(document:keydown)': 'handleKeyboardEvent($event)' },
})
export class XoeraPartnerBookingItemComponent implements OnInit {
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.key == 'F1') {
            event.preventDefault();
            event.stopPropagation();
            this.addressTypeChange();
        }
    }

    map: string;
    quotation: Quotation;
    fleets: Dictionary[];
    drivers: Dictionary[];
    bookers: Dictionary[];
    accounts: Dictionary[];
    expYears: Dictionary[];
    expMonths: Dictionary[];
    card: CardDto = new CardDto();

    pickupInput: boolean;
    dropoffInput: boolean;
    priceEnabled: boolean;
    viaAddressCount: number;
    saveBookingEnabled: boolean;
    driverPriceEnabled: boolean;
    bookersFixedCommEnabled: boolean;
    bookersPercentCommEnabled: boolean;
    bookingConfirmationSmsEnabled: boolean;

    requestQuotation: Subscription;
    requestPickUpZone: Subscription;
    requestPickDownZone: Subscription;
    requestNearestDriver: Subscription;
    requestDetailsByPhoneNumber: Subscription;

    @ViewChild('editorFleet', { static: false }) editorFleet: EditorComponent;
    @ViewChild('editorDriver', { static: false }) editorDriver: EditorComponent;
    @ViewChild('editorBooker', { static: false }) editorBooker: EditorComponent;
    @ViewChild('editorAccount', { static: false }) editorAccount: EditorComponent;
    @ViewChild('editorExpYear', { static: false }) editorExpYear: EditorComponent;
    @ViewChild('editorExpMonth', { static: false }) editorExpMonth: EditorComponent;
    @ViewChild('editorPaymentCard', { static: false }) editorPaymentCard: EditorComponent;
    @ViewChild('editorPaymentCash', { static: false }) editorPaymentCash: EditorComponent;

    loading: boolean;
    loadingText: string;
    loadingQuotation: boolean;
    loadConfiguration: boolean;
    loadingPickUpZone: boolean;
    loadingPickDownZone: boolean;
    loadingQuotationText: string;
    loadingNearestDriver: boolean;

    popupCallerVisible: boolean;
    popupViaAddressVisible: boolean;
    popupCardPaymentVisible: boolean;
    popupDriverPriceVisible: boolean;
    popupPaymentDetailVisible: boolean;
    popupAdditionalInfoVisible: boolean;
    popupAddViaLocationVisible: boolean;
    popupAdditionalPriceVisible: boolean;

    @Input() item: BookingDto;
    @Output('addItem') addItem = new EventEmitter();

    constructor(
        public router: Router,
        public util: UtilService,
        public data: DataService,
        public service: ApiService,
        public event: MvcEventService,
        public authen: MvcAuthService,
        public dialog: MvcDialogService,
        public serviceBooking: ApiBookingService) {
    }

    async ngOnInit() {
        this.loading = true;
        this.loadConfiguration = false;
        this.map = this.item ? ('map_' + this.item.Key) : 'map';
        await this.serviceBooking.systemParameters().then((item: SystemParameter) => {
            this.data.SystemParameter = item;
            this.loadConfiguration = true;
            this.fleets = this.data.SystemParameter.fleets.map(c => new Dictionary(c.fleetId, c.name));
            UtilityHelper.executeTimeout(() => {
                let fleet = this.fleets && this.fleets.length > 0
                    ? this.fleets[0]
                    : null;
                this.editorFleet.refreshDataOfDropDown(this.fleets, fleet);
            });
        });
        await this.serviceBooking.driverLookup().then((items: Driver[]) => {
            this.drivers = items.map(c => new Dictionary(c.driverId, c.driverId + ' - ' + c.firstName + ' ' + c.surname));
            this.editorDriver.refreshDataOfDropDown(this.drivers);
        });
        this.util.InitMap(this.map);
        this.loading = false;
    }

    resetForm() {
        this.item.PickUp = null;
        this.item.PickDown = null;
        this.item = new BookingDto();
    }

    addViaLocation(e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        if (!this.item.ViaAddress) this.item.ViaAddress = [];
        if (this.item.ViaAddress.length < 5) {
            this.item.ViaAddress.push(null);
        }
    }
    upViaLocation(e: MouseEvent, i: number) {
        e.preventDefault();
        e.stopPropagation();
        if (i > 0) {
            this.item.ViaAddress = UtilityHelper.arrayMove(this.item.ViaAddress, i, i - 1);
            this.requestQuotationApi(true);
        }
    }
    downViaLocation(e: MouseEvent, i: number) {
        e.preventDefault();
        e.stopPropagation();
        if (i < 4) {
            this.item.ViaAddress = UtilityHelper.arrayMove(this.item.ViaAddress, i, i + 1);
            this.requestQuotationApi(true);
        }
    }
    removeViaLocation(e: MouseEvent, i: number) {
        e.preventDefault();
        e.stopPropagation();
        this.item.ViaAddress.splice(i, 1);
        this.requestQuotationApi(true);
    }

    popupBookingHistory() {
        let params: string = '';
        if (this.item.CallerPhone && this.item.CallerPhone.length >= 5) {
            let number = this.item.CallerPhone,
                $element = (<any>jQuery('#callerphone_' + this.item.Key)),
                code: string = $element.intlTelInput('getSelectedCountryData').dialCode;
            while (code.indexOf('+') >= 0)
                code = code.replace('+', '');
            params = code + '/' + number;
        }
        if (params) {
            this.dialog.Dialog({
                content: params,
                object: this.item,
                title: 'Booking History',
                type: <number>DialogType.BookingHistory,
                okFunction: (item: BookingDto) => {
                    this.item.PickUp = null;
                    this.item.PickDown = null;
                    this.item = item;
                },
                resultFunction: (item: BookingDto) => {
                    this.addItem.emit(item);
                },
            });
        }
    }
    toggleCaller(focusHide: boolean) {
        if (focusHide) {
            this.popupCallerVisible = false;
            return;
        }
        this.popupCallerVisible = !this.popupCallerVisible;
    }
    toggleViaAddress(focusHide: boolean) {
        if (focusHide) {
            this.popupViaAddressVisible = false;
            return;
        }
        this.popupViaAddressVisible = !this.popupViaAddressVisible;
        if (this.popupViaAddressVisible) {
            if (this.item.ViaAddress == null)
                this.item.ViaAddress = [];
            if (this.item.ViaAddress.length == 0)
                this.item.ViaAddress.push(null);
        }
    }
    toggleCardPayment(focusHide: boolean) {
        this.popupPaymentDetailVisible = false;
        if (focusHide) {
            this.popupCardPaymentVisible = false;
            return;
        }
        this.popupCardPaymentVisible = !this.popupCardPaymentVisible;
        if (this.popupCardPaymentVisible) {
            if (!this.expYears) {
                this.expYears = [];
                let year = (new Date()).getFullYear();
                for (let i = 0; i < 20; i++) {
                    this.expYears.push({
                        key: year.toString(),
                        value: year.toString()
                    });
                    year += 1;
                }
                this.editorExpYear.refreshDataOfDropDown(this.expYears, this.expYears[0]);
            }

            if (!this.expMonths) {
                this.expMonths = [];
                for (let i = 1; i < 12; i++) {
                    let month: string = i < 10 ? '0' + i.toString() : i.toString();
                    this.expMonths.push({
                        key: month,
                        value: month
                    });
                }
                let currentMonth = (new Date()).getMonth() + 1,
                    currentMonthString = currentMonth < 10 ? '0' + currentMonth : currentMonth.toString(),
                    selectedCurrentMonth = this.expMonths.find(c => c.key == currentMonthString);
                this.editorExpMonth.refreshDataOfDropDown(this.expMonths, selectedCurrentMonth);
            }
        }
    }
    toggleDriverPrice(focusHide: boolean) {
        if (focusHide) {
            this.popupDriverPriceVisible = false;
            return;
        }
        this.popupDriverPriceVisible = !this.popupDriverPriceVisible;
    }
    togglePaymentDetails(focusHide: boolean) {
        if (focusHide) {
            this.popupCardPaymentVisible = false;
            this.popupPaymentDetailVisible = false;
            return;
        }
        this.popupCardPaymentVisible = false;
        this.popupPaymentDetailVisible = !this.popupPaymentDetailVisible;
    }
    toggleAdditionalInfo(focusHide: boolean) {
        if (focusHide) {
            this.popupAdditionalInfoVisible = false;
            return;
        }
        this.popupAdditionalInfoVisible = !this.popupAdditionalInfoVisible;
    }
    toggleAdditionalPrice(focusHide: boolean) {
        if (focusHide) {
            this.popupAdditionalPriceVisible = false;
            return;
        }
        this.popupAdditionalPriceVisible = !this.popupAdditionalPriceVisible;
    }

    async processPayment() {
        let valid = await validation(this.card, this.event);
        if (valid) {
            console.log(valid);
        }
        console.log(valid);
    }

    topupChanged() {
        this.calculateDriverPrice();
    }
    fleetChanged() {
        if (this.item.Fleet) {
            this.item.Booker = null;
            let fleet = this.data.SystemParameter.fleets.find(c => c.fleetId == this.item.Fleet),
                bookers = fleet && fleet.bookers;
            if (bookers) {
                this.bookers = bookers.map(c => new Dictionary(c.bookerID, c.bookerName));
                let booker = this.bookers && this.bookers.length > 0
                    ? this.bookers.find(c => c.value.toUpperCase() == 'DIRECT')
                    : null;
                this.editorBooker.refreshDataOfDropDown(this.bookers, booker);
            }
        }
    }
    bookerChanged() {
        if (this.item.Booker) {
            this.item.Account = null;
            let fleet = this.data.SystemParameter.fleets.find(c => c.fleetId == this.item.Fleet),
                booker = fleet && fleet.bookers && fleet.bookers.find(c => c.bookerID == this.item.Booker);

            // check enabled
            if (booker) {
                if (booker.sendBookingConfirmationSMS && this.data.SystemParameter.textOnConfirmation && !this.item.Id) {
                    this.item.BookingConfirmationSms = true;
                    this.bookingConfirmationSmsEnabled = true;
                } else {
                    this.item.BookingConfirmationSms = false;
                    this.bookingConfirmationSmsEnabled = false;
                }

                this.driverPriceEnabled = booker.allowEditingDriverPrice ? true : false;
                this.bookersPercentCommEnabled = booker.allowEditingVarComm ? true : false;
                this.bookersFixedCommEnabled = booker.allowEditingFixedComm ? true : false;
            }

            // re-load account
            let accounts = booker && booker.accounts;
            if (!accounts || accounts.length == 0) {
                let bookers = fleet && fleet.bookers;
                if (bookers && bookers.length > 0) {
                    bookers.forEach((item: FleetBooker) => {
                        if (item.accounts && item.accounts.length > 0) {
                            item.accounts.forEach((itemAccount: FleetAccount) => {
                                accounts.push(itemAccount);
                            });
                        }
                    });
                }
            }
            if (accounts && accounts.length > 0) {
                let account: Dictionary = null;
                this.accounts = accounts.map(c => new Dictionary(c.accID, c.accName));
                if (this.accounts && this.accounts.length > 0) {
                    account = this.accounts.find(c => c.key == fleet.defaultAccount) || this.accounts[0];
                }
                this.editorAccount.refreshDataOfDropDown(this.accounts, account);
            }
        }
    }
    pickupChanged() {
        this.util.InitMarkers(this.map, this.item, false);
        if (this.item.PickUp) {
            // NearestDriver
            if (this.item.PickUp.lat && this.item.PickUp.lng) {
                this.loadingNearestDriver = true;
                if (this.requestNearestDriver) {
                    this.requestNearestDriver.unsubscribe();
                }
                this.requestNearestDriver = this.serviceBooking.nearestDriver(this.item.PickUp).subscribe((item: NearestDriver) => {
                    this.item.TravelTimeFromDriver = item.travelTime;
                    this.item.DistanceFromDriver = item.distance;
                    this.item.NearestDriver = item.driverNumber;
                    this.loadingNearestDriver = false;
                });
            }

            // FindZone
            if (this.item.PickUp.lat && this.item.PickUp.lng) {
                this.loadingPickUpZone = true;
                if (this.requestPickUpZone) {
                    this.requestPickUpZone.unsubscribe();
                }
                this.requestPickUpZone = this.serviceBooking.findZone(this.item.PickUp).subscribe((item: Zone) => {
                    this.item.PickUpZoneParking = item.parking || 0;
                    this.item.PickUpLeadTime = item.leadTime;
                    this.item.PickUpZoneId = item.zoneID;
                    this.item.PickUpZone = item.zone;
                    this.loadingPickUpZone = false;
                    if (this.item.PickUpZoneParking && this.item.DropOffZoneParking)
                        this.item.DriverParking = this.item.PickUpZoneParking + this.item.DropOffZoneParking;
                });
            }

            // Quotation
            this.requestQuotationApi(true);
        } else {
            this.util.ClearRoute();
            this.util.RemoveMarkers(this.map, -1);
        }
        this.pickupInput = false;
    }
    dropoffChanged() {
        this.util.InitMarkers(this.map, this.item, false);
        if (this.item.PickDown) {
            // FindZone
            if (this.item.PickDown.lat && this.item.PickDown.lng) {
                this.loadingPickDownZone = true;
                if (this.requestPickDownZone) {
                    this.requestPickDownZone.unsubscribe();
                }
                this.requestPickDownZone = this.serviceBooking.findZone(this.item.PickDown).subscribe((item: Zone) => {
                    this.item.DropOffZoneParking = item.parking || 0;
                    this.item.DropOffLeadTime = item.leadTime;
                    this.item.DropOffZoneId = item.zoneID;
                    this.item.DropOffZone = item.zone;
                    this.loadingPickDownZone = false;
                    if (this.item.PickUpZoneParking && this.item.DropOffZoneParking)
                        this.item.DriverParking = this.item.PickUpZoneParking + this.item.DropOffZoneParking;
                });
            }

            // Quotation
            this.requestQuotationApi(true);
        } else {
            this.util.ClearRoute();
            this.util.RemoveMarkers(this.map, 100);
        }
        this.dropoffInput = false;
    }
    parkingChanged() {
        this.calculateBookersCommAndDriverPrice();
    }
    accountChanged() {
        if (this.item.Account)
            this.requestQuotationApi(false);
    }
    paymentChanged() {
        this.calculateBookersCommAndDriverPrice();
        if (this.item.Payment == PaymentType.Cash) {
            this.item.PaymentCash = this.item.Price;
            this.item.PaymentCard = 0;
        } else {
            this.item.PaymentCash = 0;
            this.item.PaymentCard = this.item.Price;
        }
    }
    pickTypeChanged() {
        if (this.item.PickType == PickType.Now) {
            this.requestQuotationApi(false);
        } else {
            if (!this.item.DateTime) {
                this.item.Price = 0;
            } else {
                this.requestQuotationApi(false);
            }
        }
    }
    datetimeChanged() {
        if (!this.item.DateTime) {
            this.item.Price = 0;
        } else {
            this.requestQuotationApi(false);
        }
    }
    returnTypeChanged() {
        this.requestQuotationApi(false);
    }
    bookingFeeChanged() {
        this.calculateDriverPrice();
    }
    driverPriceChanged() {
        this.calculateDriverEarning();
    }
    pickupInputChange() {
        this.pickupInput = true;
        this.resetPrice(true);
    }
    dropoffInputChange() {
        this.dropoffInput = true;
        this.resetPrice(true);
    }
    callerPhoneChanged() {
        if (this.requestDetailsByPhoneNumber) {
            this.requestDetailsByPhoneNumber.unsubscribe();
        }
        if (this.item.CallerPhone && this.item.CallerPhone.length >= 5) {
            let number = this.item.CallerPhone,
                $element = (<any>jQuery('#callerphone_' + this.item.Key)),
                code: string = $element.intlTelInput('getSelectedCountryData').dialCode;
            while (code.indexOf('+') >= 0)
                code = code.replace('+', '');
            this.requestDetailsByPhoneNumber = this.serviceBooking.detailsByPhoneNumber(code, number).subscribe((item: customer) => {
                if (item) {
                    this.item.CallerNotes = item.notes;
                    this.item.CallerEmail = item.email;
                    this.item.CallerRating = item.rating;
                    this.item.CallerSurName = item.surname;
                    this.item.CallerComments = item.comments;
                    this.item.CallerBlacklisted = item.isBlacklisted;
                    this.item.CallerName = item.surname + ' ' + item.firstName;
                }
            });
        }
    }
    paymentCardChanged() {
        this.item.PaymentCash = parseFloat((this.item.Price - this.item.PaymentCard).toFixed(2));
    }
    paymentCashChanged() {
        this.item.PaymentCard = parseFloat((this.item.Price - this.item.PaymentCash).toFixed(2));
    }
    bookersFixedCommChanged() {
        this.calculateDriverPrice();
    }
    bookersPercentCommChanged() {
        this.calculateDriverPrice();
    }
    viaAddressChanged(obj: Address, index: number) {
        this.item.ViaAddress[index] = obj;
        this.util.InitMarkers(this.map, this.item, false);

        // Quotation
        this.requestQuotationApi(true);
        this.viaAddressCount = this.item.ViaAddress.filter(c => c != null).length;
    }
    addressTypeChange(type: SearchAddressType = null) {
        if (type) this.data.SearchAddressType = type;
        else {
            switch (this.data.SearchAddressType) {
                case SearchAddressType.Google: this.data.SearchAddressType = SearchAddressType.Local; break;
                case SearchAddressType.Local: this.data.SearchAddressType = SearchAddressType.National; break;
                case SearchAddressType.National: this.data.SearchAddressType = SearchAddressType.Google; break;
            }
        }
        this.item.PickUp = null;
        this.item.PickDown = null;
    }

    private processQuotation() {
        this.calculateBookersCommAndDriverPrice();
        if (this.item.Payment == PaymentType.Cash) {
            if ((this.item.Price - this.item.PaymentCard) < 0) {
                this.item.PaymentCash = this.item.Price;
                this.item.PaymentCard = 0;
            } else {
                this.item.PaymentCash = this.item.Price - this.item.PaymentCard;
            }
        }
        else {
            if ((this.item.Price - this.item.PaymentCash) < 0) {
                this.item.PaymentCard = this.item.Price;
                this.item.PaymentCash = 0;
            } else {
                this.item.PaymentCard = this.item.Price - this.item.PaymentCash;
            }
        }
        this.editorPaymentCard.refreshMaxOfNumber(this.item.Price);
        this.editorPaymentCash.refreshMaxOfNumber(this.item.Price);
        this.saveBookingEnabled = true;
    }
    private calculateDriverPrice() {
        this.item.DriverPrice = parseFloat(((this.item.Price + this.item.DriverTopup) - (this.item.DriverBookingFee + this.item.DriverBookerCommPercent + this.item.DriverBookerCommFixed)).toFixed(2));
    }
    private calculateDriverEarning() {
        if (this.item && this.item.Booker && this.item.Price) {
            let fleet = this.data.SystemParameter.fleets.find(c => c.fleetId == this.item.Fleet),
                booker = fleet && fleet.bookers && fleet.bookers.find(c => c.bookerID == this.item.Booker);
            if (fleet) {
                if (!fleet.noCommOnParking) {
                    let companyShare = ((((this.item.DriverPrice) * (booker.commissionChargable)) / 100) + this.item.DriverBookingFee) - (this.item.DriverTopup);
                    this.item.DriverEarning = this.mathRound(companyShare);
                } else {
                    let companyShare = ((((this.item.DriverPrice - this.item.DriverParking) * (booker.commissionChargable)) / 100) + this.item.DriverBookingFee) - (this.item.DriverTopup);
                    this.item.DriverEarning = this.mathRound(companyShare);
                }
            }
        }
    }
    private mathRound(value: number) {
        return parseFloat((Math.round(value * 100) / 100).toFixed(2));
    }
    private calculateBookersCommAndDriverPrice() {
        if (this.item && this.item.Booker && this.item.Price) {
            let fleet = this.data.SystemParameter.fleets.find(c => c.fleetId == this.item.Fleet),
                booker = fleet && fleet.bookers && fleet.bookers.find(c => c.bookerID == this.item.Booker);
            if (booker) {
                if (!booker.fixedCommissionOnCash) booker.fixedCommissionOnCash = 0;
                if (!booker.fixedCommissionOnCard) booker.fixedCommissionOnCard = 0;
                if (!booker.variableCommissionOnCash) booker.variableCommissionOnCash = 0;
                if (!booker.variableCommissionOnCard) booker.variableCommissionOnCard = 0;
                if (this.item.Payment == PaymentType.Cash) {
                    if (booker.autoCalculateDriverPrice) {
                        this.item.DriverBookerCommFixed = this.mathRound(booker.fixedCommissionOnCash);
                        this.item.DriverBookerCommPercent = this.mathRound(booker.variableCommissionOnCash * (this.item.Price - this.item.DriverBookerCommFixed) / 100);
                    } else {
                        if (!this.item.Id) {
                            this.item.DriverBookerCommFixed = 0;
                            this.item.DriverBookerCommPercent = 0;
                        }
                    }
                } else {
                    if (booker.autoCalculateDriverPrice) {
                        this.item.DriverBookerCommFixed = this.mathRound(booker.fixedCommissionOnCard);
                        this.item.DriverBookerCommPercent = this.mathRound(booker.variableCommissionOnCard * (this.item.Price - this.item.DriverBookerCommFixed) / 100);
                    } else {
                        if (!this.item.Id) {
                            this.item.DriverBookerCommFixed = 0;
                            this.item.DriverBookerCommPercent = 0;
                        }
                    }
                }

                this.calculateDriverPrice();
                this.calculateDriverEarning();
            }
        }
    }
    private resetPrice(calcRoute: boolean = false) {
        this.item.Price = 0;
        this.priceEnabled = false;
        if (calcRoute) {
            this.util.ClearRoute();
            this.item.TravelTime = 0;
            this.item.RouterDistance = 0;
        }
    }
    private requestQuotationApi(calcRoute: boolean = false) {
        this.loadingQuotation = true;
        this.loadingQuotationText = 'Quotation...';
        if (this.requestQuotation) {
            this.requestQuotation.unsubscribe();
        }
        this.resetPrice(calcRoute);
        if (this.item.PickUp && this.item.PickUp.lat && this.item.PickUp.lng &&
            this.item.PickDown && this.item.PickDown.lat && this.item.PickDown.lng) {
            this.requestQuotation = this.serviceBooking.quotation(this.item, calcRoute).subscribe((item: Quotation) => {
                this.quotation = item;
                this.item.Price = item.price;
                this.item.TravelTime = item.travelTime;
                this.item.RouterDistance = item.distance;
                if (this.quotation.routePath && this.quotation.routePath.length > 0)
                    this.util.DrawRoute(this.map, this.item, this.quotation);
                if (this.quotation.returnRoutePath && this.quotation.returnRoutePath.length > 0)
                    this.util.DrawReturnRoute(this.map, this.item, this.quotation);
                this.processQuotation();
                this.loadingQuotation = false;
                if (this.item.Price) this.priceEnabled = true;
            });
        }
    }
}

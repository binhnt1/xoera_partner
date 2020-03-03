declare var google;
import { Subscription } from 'rxjs/subscription';
import { DataService } from '../../../services/data.service';
import { Address, AddressPostCode } from '../../../domains/data/address';
import { AddressShortcut } from '../../../domains/data/system.parameter';
import { ApiBookingService } from '../../../services/api.booking.service';
import { UtilityHelper } from '../../../../../mvc/helpers/utility.helper';
import { AutocompleteType } from '../../../domains/enums/autocomplete.type';
import { SearchAddressType, SearchAddressTypeAware } from '../../../domains/enums/search.address.type';
import { Component, Input, Output, EventEmitter, OnInit, AfterContentInit, NgZone } from '@angular/core';

@SearchAddressTypeAware
@Component({
    templateUrl: 'autocomplete.component.html',
    selector: 'xoera-partner-editor-autocomplete',
    styleUrls: ['../ui-icon.scss', 'autocomplete.scss'],
})
export class XoeraPartnerEditorAutoCompleteComponent implements OnInit, AfterContentInit {
    blur: boolean;
    message: string;
    items: Address[];
    value: string = '';
    placeholder: string;
    objectValue: Address;
    valid: boolean = true;
    objectSelected: boolean;
    loading: boolean = false;
    requestSearch: Subscription;
    panelVisible: boolean = false;
    requestSearchPostCode: Subscription;

    id: string = '';
    icon: string = '';
    iconPlane: string = '';
    iconRemove: string = '';
    iconLoading: string = '';
    iconInvalid: string = '';
    assets: string = 'assets/images/';

    @Input() type: AutocompleteType;
    @Input()
    get object(): Address {
        return this.objectValue;
    }
    set object(value: Address) {
        this.objectValue = value;        
        this.objectChange.emit(value);
        this.value = value && value.fullAddress;
    }
    @Output('inputChange') inputChange = new EventEmitter();
    @Output('objectChange') objectChange = new EventEmitter();
    @Output('selectedChange') selectedChange = new EventEmitter();

    constructor(
        public zone: NgZone,
        public data: DataService,
        public service: ApiBookingService) {
    }

    ngOnInit() {
        this.initItems();
        this.renderGoogleAddress();
        this.id = UtilityHelper.randomText(6);
        if (this.object) this.value = this.object.fullAddress;

        switch (this.type) {
            case AutocompleteType.Pickup: {
                this.iconRemove = 'ui-icon-remove';
                this.placeholder = 'Pickup Address';
                this.icon = this.assets + 'editor/pickup.png';
            }
                break;
            case AutocompleteType.Dropoff: {
                this.iconRemove = 'ui-icon-remove';
                this.placeholder = 'Destination Address';
                this.icon = this.assets + 'editor/dropoff.png';
            }
                break;
            case AutocompleteType.ViaAddress: {
                this.placeholder = 'Via Location';
                this.iconRemove = 'ui-icon-remove';
                this.icon = this.assets + 'editor/via.png';
            }
                break;
        }
        this.iconPlane = this.assets + 'editor/img/plane.png';
        this.iconInvalid = this.assets + 'editor/notfound.png';
        this.iconLoading = this.assets + 'editor/preloader.gif';
    }

    ngAfterContentInit() {
        setTimeout(() => {
            if (this.object) this.value = this.object.fullAddress;
        }, 1000);
    }

    initItems() {
        let result = new Array<Address>();

        /// Add item address fix
        let itemFixs: Address[] = this.data.SystemParameter.addressShortcuts.map(c => AddressShortcut.ToAddress(c));
        for (let i = 0; i <= itemFixs.length; i++) {
            let temp = itemFixs[i];
            if (temp != undefined) {
                result.push(temp);
            }
        }
        this.items = result;
    }
    blurInput() {
        UtilityHelper.executeTimeout(() => {
            if (this.blur) {
                if (this.requestSearch) {
                    this.requestSearch.unsubscribe();
                }
                if (!this.objectSelected) {
                    this.loading = true;
                    this.panelVisible = false;
                    if (this.requestSearchPostCode) {
                        this.requestSearchPostCode.unsubscribe();
                    }
                    let type = this.data.SearchAddressType || SearchAddressType.Local;
                    this.requestSearchPostCode = this.service.searchAddressPostCode(this.value, type)
                        .subscribe((item: AddressPostCode) => {
                            if (!item || !item.postcode) {
                                this.valid = false;
                                this.object = null;
                            } else {
                                this.valid = true;
                                let object: Address = {
                                    lat: item.latLng.lat,
                                    lng: item.latLng.lng,
                                    postcode: item.postcode,
                                    fullAddress: this.value,
                                }
                                this.object = object;
                                this.objectSelected = true;
                            }
                            this.loading = false;
                            this.message = this.object ? '' : 'Addess is empty or invalid';
                        });
                }
            }
        }, 300);
    }
    clickInput() {
        if (!this.value) this.items = null;
        this.panelVisible = !this.panelVisible;
        if (!this.items || this.items.length == 0) {
            this.initItems();
        }
    }
    searchItems() {
        this.blur = true;
        this.message = '';
        this.loading = true;
        this.inputChange.emit();
        this.objectSelected = false;
        if (!this.value || this.value.length <= 1) {
            this.loading = false;
            this.initItems();
        } else {
            if (this.requestSearch) {
                this.requestSearch.unsubscribe();
            }
            let type = this.data.SearchAddressType || SearchAddressType.Local,
                postCode = this.data.SystemParameter && this.data.SystemParameter.fleets && this.data.SystemParameter.fleets.length > 0
                    ? this.data.SystemParameter.fleets[0].mainBasePostcode
                    : null;
            if (!postCode) return;

            this.requestSearch = this.service.searchAddress(this.value, type, postCode)
                .subscribe((items: Address[]) => {
                    if (items == null || items.length == 0) {
                        this.valid = false;
                        this.panelVisible = false;
                    } else {
                        this.valid = true;
                        this.items = items;
                        this.panelVisible = true;
                    }
                    this.loading = false;
                });
        }
    }
    clearClick(e: MouseEvent) {
        this.value = null;
        this.object = null;
        e.preventDefault();
        e.stopPropagation();
        this.panelVisible = false;
        if (this.requestSearch) {
            this.requestSearch.unsubscribe();
        }
        if (this.requestSearchPostCode) {
            this.requestSearchPostCode.unsubscribe();
        }
        this.selectedChange.emit(this.object);
    }
    selectedItem(e: MouseEvent, item: Address) {
        this.blur = false;
        this.valid = true;
        this.object = item;
        this.panelVisible = false;
        this.objectSelected = true;
        if (!this.object.lat || !this.object.lng && this.object.postcode) {
            this.loading = true;
            this.panelVisible = false;
            if (this.requestSearchPostCode) {
                this.requestSearchPostCode.unsubscribe();
            }
            let type = SearchAddressType.National;
            this.requestSearchPostCode = this.service.searchAddressPostCode(this.object.postcode, type)
                .subscribe((item: AddressPostCode) => {
                    if (!item || !item.postcode) {
                        this.valid = false;
                        this.object = null;
                    } else {
                        this.valid = true;
                        let object: Address = {
                            lat: item.latLng.lat,
                            lng: item.latLng.lng,
                            postcode: item.postcode,
                            fullAddress: this.value,
                        }
                        this.object = object;
                        this.objectSelected = true;
                    }
                    this.loading = false;
                    this.selectedChange.emit(this.object);
                    this.message = this.object ? '' : 'Addess is empty or invalid';
                });
        } else {
            this.selectedChange.emit(this.object);
            this.value = this.object && this.object.fullAddress;
            this.message = this.object ? '' : 'Addess is empty or invalid';
        }
        this.blur = true;
        e.preventDefault();
        e.stopPropagation();
    }

    hidePanel() {
        this.panelVisible = false;
    }
    iconPath(item: Address) {
        return this.assets + item.icon;
    }
    private renderGoogleAddress() {
        setTimeout(() => {
            let id = 'autocomplete-google-' + this.id,
                options = {
                    componentRestrictions: {
                        country: 'gb'
                    }
                },
                circle = new google.maps.Circle({
                    radius: 775000,
                    center: {
                        lat: 54.093409,
                        lng: -2.89479
                    }
                }),
                inputPlace = new google.maps.places.Autocomplete(document.getElementById(id), options);
            inputPlace.setBounds(circle.getBounds());
            google.maps.event.addListener(inputPlace, 'place_changed', () => {
                let postCode = '',
                    place = inputPlace.getPlace(),
                    lat = place.geometry.location.lat(),
                    lng = place.geometry.location.lng();
                for (var i = 0; i < place.address_components.length; i++) {
                    for (var j = 0; j < place.address_components[i].types.length; j++) {
                        if (place.address_components[i].types[j] == "postal_code") {
                            postCode = place.address_components[i].long_name;
                        }
                    }
                }
                console.log(place);
                this.zone.run(() => {
                    this.valid = true;
                    let object: Address = {
                        lat: lat,
                        lng: lng,
                        postcode: postCode,
                        fullAddress: (<any>document.getElementById(id)).value,
                    }
                    this.object = object;
                    this.objectSelected = true;
                    this.selectedChange.emit(this.object);
                });
            });
        }, 1000);
    }
}

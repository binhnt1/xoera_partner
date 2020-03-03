import { Address } from "./address";

export class SystemParameter {
    fleets: Fleet[];
    defaultFleet: number;
    defaultVehicle: number;
    earningCalcType: string;
    shouldCalcEarning: boolean;
    textOnConfirmation: boolean;
    googleBrowserAPIKey: string;
    defaultAddressSearch: string;   
    defaultDistanceCalcMethod: string; 
    addressShortcuts: AddressShortcut[];
}

export class Fleet {
    name: string;
    fleetId: number;
    bookers: FleetBooker[];
    defaultAccount: number;
    noCommOnParking: number;
    mainBasePostcode: string;
}

 export class FleetBooker {
    fleetId: number;
    bookerID: number;
    bookerName: string;
    accounts: FleetAccount[];
    commissionChargable: number;
    allowEditingVarComm: boolean;
    fixedCommissionOnCash: number; 
    fixedCommissionOnCard: number;
    allowEditingFixedComm: boolean;
    allowEditingDriverPrice: boolean;
    variableCommissionOnCash: number; 
    variableCommissionOnCard: number;
    autoCalculateDriverPrice: boolean;
    sendBookingConfirmationSMS: string;
 }

 export class FleetAccount {
    accID: number;
    rating: number;
    accName: string;
    bookerID: number;
    dispatchNotes: string;
 }

 export class AddressShortcut {
    lat: number;
    lng: number;
    order: number;
    postCode: string;
    postCodeWs: string;
    addShortcut: string;
    fullAddress: string;
    addCategory: string;
    addShortcutId: number;

    public static ToAddress(item: AddressShortcut): Address {
        return {
            icon: '',
            lat: item.lat,
            lng: item.lng,
            order: item.order,
            postcode: item.postCode,
            category: item.addCategory,
            postcodeWS: item.postCodeWs,
            fullAddress: item.fullAddress,
        }
    }
 }
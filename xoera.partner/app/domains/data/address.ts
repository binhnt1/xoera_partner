export class Address {
    lat: number;
    lng: number;
    icon?: string;
    order?: number;
    line1?: string;
    line2?: string;
    postcode: string;
    category?: string;
    postcodeWS?: string;
    fullAddress: string;
}

export class AddressPostCode {
    postcode: string;
    latLng: AddressCoordinates;
}

export class AddressCoordinates {
    lat: number;
    lng: number;
}

export class ViaAddress {
    lat: number;
    lng: number;
    address: string;
    postcode: string;

    public static ToViaAddress(address: Address): ViaAddress {
        if (address == null) return null;
        let item = new ViaAddress();
        item.lat = address.lat;
        item.lng = address.lng;
        item.postcode = address.postcode;
        item.address = address.fullAddress;
        return item;
    }
}
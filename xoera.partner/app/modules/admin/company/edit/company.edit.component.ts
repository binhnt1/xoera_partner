declare var google;
import { Router } from "@angular/router";
import { Component, NgZone } from "@angular/core";
import { DataService } from "../../../../services/data.service";
import { AppConfig } from "../../../../../../mvc/helpers/app.config";
import { ResultApi } from "../../../../../../mvc/domains/data/result.api";
import { RouterHelper } from "../../../../../../mvc/helpers/router.helper";
import { MvcApiService } from "../../../../../../mvc/services/api.service";
import { CompanyEntity } from "../../../../domains/entities/company.entity";
import { ResultType } from "../../../../../../mvc/domains/enums/result.type";

@Component({
    selector: 'app-company-edit',
    styleUrls: ['company.edit.scss'],
    templateUrl: 'company.edit.component.html',
})
export class CompanyEditComponent {
    circle: any;
    options: any;
    loading: boolean;
    item: CompanyEntity;

    constructor(
        public zone: NgZone,
        public router: Router,
        public data: DataService,
        public service: MvcApiService) {
        this.item = new CompanyEntity();
        let objId = RouterHelper.getId(this.router);
        if (objId) {
            this.loading = true;
            this.service.selectOne('Company', objId).then((result: ResultApi) => {
                if (result.Type == ResultType.Success) {
                    this.item = <CompanyEntity>result.Object;
                    this.renderGoogleAddress();
                    this.loading = false;
                }
            });
        } else this.renderGoogleAddress();
    }

    private renderGoogleAddress() {
        setTimeout(() => {
            this.options = {
                componentRestrictions: {
                    country: 'gb'
                }
            };
            this.circle = new google.maps.Circle({
                radius: 775000,
                center: {
                    lat: 54.093409,
                    lng: -2.89479
                }
            });
            let inputPlace = new google.maps.places.Autocomplete(document.getElementById('company-address'), this.options);
            inputPlace.setBounds(this.circle.getBounds());
            google.maps.event.addListener(inputPlace, 'place_changed', () => {
                let place = inputPlace.getPlace(),
                    lat = place.geometry.location.lat(),
                    lng = place.geometry.location.lng();
                this.zone.run(() => {
                    this.item.Lat = parseFloat(lat.toFixed(6));
                    this.item.Lng = parseFloat(lng.toFixed(6));
                });
            });
        }, 1000);
    }
}

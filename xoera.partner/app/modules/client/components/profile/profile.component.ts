import { Component } from "@angular/core";
import { AuthService } from "../../../../services/auth.service";
import { UserDto } from "../../../../domains/objects/user.dto";

@Component({
    styleUrls: ['./profile.scss'],
    templateUrl: './profile.component.html',
    selector: 'xoera-partner-profile-component',
})
export class XoeraPartnerProfileComponent {
    item: UserDto;

    constructor(public auth: AuthService) {
        this.item = this.auth.account;
    }
}

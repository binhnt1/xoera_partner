import { NgModule } from '@angular/core';
import { MvcSharedModule } from '../../../mvc/modules/shared.module';

// Layout
import { XoeraPartnerCompanyComponent } from './client/components/company/company.component';
import { XoeraPartnerProfileComponent } from './client/components/profile/profile.component';
import { XoeraPartnerLicenceComponent } from './client/components/licence/licence.component';
import { XoeraPartnerLayoutHeaderComponent } from '../layout/components/header/header.component';
import { XoeraPartnerLayoutFooterComponent } from '../layout/components/footer/footer.component';
import { XoeraPartnerLayoutSubHeaderComponent } from '../layout/components/subheader/subheader.component';

// Component
import { TicketViewComponent } from './client/ticket/view/ticket.view.component';
import { TicketGridComponent } from './client/ticket/grid/ticket.grid.component';
import { CompanyPartnerComponent } from './client/company.partner/company.partner.component';

// Modal
import { XoeraPartnerModalVncComponent } from '../components/modal/vnc/vnc.component';
import { XoeraPartnerModalAgreementComponent } from '../components/modal/agreement/agreement.component';
import { XoeraPartnerModalEditTicketComponent } from '../components/modal/edit.ticket/edit.ticket.component';
import { XoeraPartnerModalAssignTicketComponent } from '../components/modal/assign.ticket/assign.ticket.component';
import { XoeraPartnerModalEditTicketDetailComponent } from '../components/modal/edit.ticket.detail/edit.ticket.detail.component';

// Editor
import { XoeraPartnerEditorAutoCompleteComponent } from '../components/editor/autocomplete/autocomplete.component';
import { XoeraPartnerModalBookingHistoryComponent } from '../components/modal/booking.history/booking.history.component';

@NgModule({
    imports: [
        MvcSharedModule,
    ],
    declarations: [
        TicketGridComponent,
        TicketViewComponent,
        CompanyPartnerComponent,
        XoeraPartnerCompanyComponent,
        XoeraPartnerProfileComponent,
        XoeraPartnerLicenceComponent,
        XoeraPartnerModalVncComponent,
        XoeraPartnerLayoutHeaderComponent,
        XoeraPartnerLayoutFooterComponent,
        XoeraPartnerModalAgreementComponent,
        XoeraPartnerLayoutSubHeaderComponent,
        XoeraPartnerModalEditTicketComponent,
        XoeraPartnerModalAssignTicketComponent,
        XoeraPartnerEditorAutoCompleteComponent,
        XoeraPartnerModalBookingHistoryComponent,
        XoeraPartnerModalEditTicketDetailComponent,
    ],
    exports: [
        MvcSharedModule,
        TicketGridComponent,
        TicketViewComponent,
        CompanyPartnerComponent,
        XoeraPartnerCompanyComponent,
        XoeraPartnerProfileComponent,
        XoeraPartnerLicenceComponent,
        XoeraPartnerModalVncComponent,
        XoeraPartnerLayoutHeaderComponent,
        XoeraPartnerLayoutFooterComponent,
        XoeraPartnerModalAgreementComponent,
        XoeraPartnerLayoutSubHeaderComponent,
        XoeraPartnerModalEditTicketComponent,
        XoeraPartnerModalAssignTicketComponent,
        XoeraPartnerEditorAutoCompleteComponent,
        XoeraPartnerModalBookingHistoryComponent,
        XoeraPartnerModalEditTicketDetailComponent
    ]
})
export class XoeraPartnerModule { }

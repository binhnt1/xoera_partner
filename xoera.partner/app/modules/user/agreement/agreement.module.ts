import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AgreementComponent } from './agreement.component';
import { XoeraPartnerModule } from '../../xoera.partner.module';

@NgModule({
    declarations: [
        AgreementComponent
    ],
    imports: [
        XoeraPartnerModule,
        RouterModule.forChild([           
            { path: '', component: AgreementComponent, pathMatch: 'full' },
        ])
    ]
})
export class AgreementModule { }


import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XoeraPartnerModule } from '../../xoera.partner.module';
import { UserAgreementGridComponent } from './grid/user.agreement.grid.component';
import { UserAgreementEditComponent } from './edit/user.agreement.edit.component';
import { TemplateGridComponent } from '../../../../../mvc/templates/grid/template.grid.component';
import { TemplateEditComponent } from '../../../../../mvc/templates/edit/template.edit.component';

@NgModule({
    declarations: [
        UserAgreementGridComponent,
        UserAgreementEditComponent
    ],
    imports: [
        XoeraPartnerModule,
        RouterModule.forChild([
            {
                path: '',
                component: TemplateGridComponent,
                children: [
                    { path: '', component: UserAgreementGridComponent, pathMatch: 'full' },
                    { path: 'grid', component: UserAgreementGridComponent },
                ]
            },
            {
                path: '',
                component: TemplateEditComponent,
                children: [
                    { path: 'new', component: UserAgreementEditComponent },
                    { path: 'edit', component: UserAgreementEditComponent },
                ]
            }
        ])
    ]
})
export class UserAgreementModule { }

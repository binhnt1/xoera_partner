
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XoeraPartnerModule } from '../../xoera.partner.module';
import { SmtpAccountGridComponent } from './grid/smtp.account.grid.component';
import { SmtpAccountEditComponent } from './edit/smtp.account.edit.component';
import { TemplateGridComponent } from '../../../../../mvc/templates/grid/template.grid.component';
import { TemplateEditComponent } from '../../../../../mvc/templates/edit/template.edit.component';

@NgModule({
    declarations: [
        SmtpAccountGridComponent,
        SmtpAccountEditComponent
    ],
    imports: [
        XoeraPartnerModule,
        RouterModule.forChild([
            {
                path: '',
                component: TemplateGridComponent,
                children: [
                    { path: '', component: SmtpAccountGridComponent, pathMatch: 'full' },
                    { path: 'grid', component: SmtpAccountGridComponent },
                ]
            },
            {
                path: '',
                component: TemplateEditComponent,
                children: [
                    { path: 'new', component: SmtpAccountEditComponent },
                    { path: 'edit', component: SmtpAccountEditComponent },
                ]
            }
        ])
    ]
})
export class SmtpAccountModule { }

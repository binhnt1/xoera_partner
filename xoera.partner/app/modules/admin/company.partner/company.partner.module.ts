
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XoeraPartnerModule } from '../../xoera.partner.module';
import { CompanyPartnerComponent } from '../../client/company.partner/company.partner.component';
import { TemplateEmptyComponent } from '../../../../../mvc/templates/empty/template.empty.component';

@NgModule({
    declarations: [
    ],
    imports: [
        XoeraPartnerModule,
        RouterModule.forChild([
            {
                path: '',
                component: TemplateEmptyComponent,
                children: [
                    { path: '', component: CompanyPartnerComponent, pathMatch: 'full' },
                    { path: 'grid', component: CompanyPartnerComponent },
                ]
            },
        ])
    ]
})
export class CompanyPartnerModule { }

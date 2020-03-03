
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CompanyGridComponent } from './grid/company.grid.component';
import { CompanyEditComponent } from './edit/company.edit.component';
import { XoeraPartnerModule } from '../../xoera.partner.module';
import { TemplateGridComponent } from '../../../../../mvc/templates/grid/template.grid.component';
import { TemplateEditComponent } from '../../../../../mvc/templates/edit/template.edit.component';

@NgModule({
    declarations: [
        CompanyGridComponent,
        CompanyEditComponent
    ],
    imports: [
        XoeraPartnerModule,
        RouterModule.forChild([
            {
                path: '',
                component: TemplateGridComponent,
                children: [
                    { path: '', component: CompanyGridComponent, pathMatch: 'full' },
                    { path: 'grid', component: CompanyGridComponent },
                ]
            },
            {
                path: '',
                component: TemplateEditComponent,
                children: [
                    { path: 'new', component: CompanyEditComponent },
                    { path: 'edit', component: CompanyEditComponent },
                ]
            }
        ])
    ]
})
export class CompanyModule { }

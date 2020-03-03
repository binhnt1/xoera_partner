
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XoeraPartnerModule } from '../../xoera.partner.module';
import { AgreementGridComponent } from './grid/agreement.grid.component';
import { AgreementEditComponent } from './edit/agreement.edit.component';
import { TemplateGridComponent } from '../../../../../mvc/templates/grid/template.grid.component';
import { TemplateEditComponent } from '../../../../../mvc/templates/edit/template.edit.component';

@NgModule({
    declarations: [
        AgreementGridComponent,
        AgreementEditComponent
    ],
    imports: [
        XoeraPartnerModule,
        RouterModule.forChild([
            {
                path: '',
                component: TemplateGridComponent,
                children: [
                    { path: '', component: AgreementGridComponent, pathMatch: 'full' },
                    { path: 'grid', component: AgreementGridComponent },
                ]
            },
            {
                path: '',
                component: TemplateEditComponent,
                children: [
                    { path: 'new', component: AgreementEditComponent },
                    { path: 'edit', component: AgreementEditComponent },
                ]
            }
        ])
    ]
})
export class AgreementModule { }

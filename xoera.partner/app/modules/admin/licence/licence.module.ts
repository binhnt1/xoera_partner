
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LicenceGridComponent } from './grid/licence.grid.component';
import { LicenceEditComponent } from './edit/licence.edit.component';
import { XoeraPartnerModule } from '../../xoera.partner.module';
import { TemplateGridComponent } from '../../../../../mvc/templates/grid/template.grid.component';
import { TemplateEditComponent } from '../../../../../mvc/templates/edit/template.edit.component';
@NgModule({
    declarations: [
        LicenceGridComponent,
        LicenceEditComponent
    ],
    imports: [
        XoeraPartnerModule,
        RouterModule.forChild([
            {
                path: '',
                component: TemplateGridComponent,
                children: [
                    { path: '', component: LicenceGridComponent, pathMatch: 'full' },
                    { path: 'grid', component: LicenceGridComponent },
                ]
            },
            {
                path: '',
                component: TemplateEditComponent,
                children: [
                    { path: 'new', component: LicenceEditComponent },
                    { path: 'edit', component: LicenceEditComponent },
                ]
            }
        ])
    ]
})
export class LicenceModule { }

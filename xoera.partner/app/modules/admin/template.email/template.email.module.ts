
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XoeraPartnerModule } from '../../xoera.partner.module';
import { TemplateEmailGridComponent } from './grid/template.email.grid.component';
import { TemplateEmailEditComponent } from './edit/template.email.edit.component';
import { TemplateGridComponent } from '../../../../../mvc/templates/grid/template.grid.component';
import { TemplateEditComponent } from '../../../../../mvc/templates/edit/template.edit.component';

@NgModule({
    declarations: [
        TemplateEmailGridComponent,
        TemplateEmailEditComponent
    ],
    imports: [
        XoeraPartnerModule,
        RouterModule.forChild([
            {
                path: '',
                component: TemplateGridComponent,
                children: [
                    { path: '', component: TemplateEmailGridComponent, pathMatch: 'full' },
                    { path: 'grid', component: TemplateEmailGridComponent },
                ]
            },
            {
                path: '',
                component: TemplateEditComponent,
                children: [
                    { path: 'new', component: TemplateEmailEditComponent },
                    { path: 'edit', component: TemplateEmailEditComponent },
                ]
            }
        ])
    ]
})
export class TemplateEmailModule { }


import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XoeraPartnerModule } from '../../xoera.partner.module';
import { ActivationGridComponent } from './grid/activation.grid.component';
import { ActivationEditComponent } from './edit/activation.edit.component';
import { TemplateGridComponent } from '../../../../../mvc/templates/grid/template.grid.component';
import { TemplateEditComponent } from '../../../../../mvc/templates/edit/template.edit.component';

@NgModule({
    declarations: [
        ActivationGridComponent,
        ActivationEditComponent
    ],
    imports: [
        XoeraPartnerModule,
        RouterModule.forChild([
            {
                path: '',
                component: TemplateGridComponent,
                children: [
                    { path: '', component: ActivationGridComponent, pathMatch: 'full' },
                    { path: 'grid', component: ActivationGridComponent },
                ]
            },
            {
                path: '',
                component: TemplateEditComponent,
                children: [
                    { path: 'new', component: ActivationEditComponent },
                    { path: 'edit', component: ActivationEditComponent },
                ]
            }
        ])
    ]
})
export class ActivationModule { }


import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VehicleGridComponent } from './grid/vehicle.grid.component';
import { VehicleEditComponent } from './edit/vehicle.edit.component';
import { XoeraPartnerModule } from '../../xoera.partner.module';
import { TemplateGridComponent } from '../../../../../mvc/templates/grid/template.grid.component';
import { TemplateEditComponent } from '../../../../../mvc/templates/edit/template.edit.component';

@NgModule({
    declarations: [
        VehicleGridComponent,
        VehicleEditComponent
    ],
    imports: [
        XoeraPartnerModule,
        RouterModule.forChild([
            {
                path: '',
                component: TemplateGridComponent,
                children: [
                    { path: '', component: VehicleGridComponent, pathMatch: 'full' },
                    { path: 'grid', component: VehicleGridComponent },
                ]
            },
            {
                path: '',
                component: TemplateEditComponent,
                children: [
                    { path: 'new', component: VehicleEditComponent },
                    { path: 'edit', component: VehicleEditComponent },
                ]
            }
        ])
    ]
})
export class VehicleModule { }

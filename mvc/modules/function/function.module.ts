import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MvcSharedModule } from '../shared.module';
import { FunctionGridComponent } from './grid/function.grid.component';
import { FunctionEditComponent } from './edit/function.edit.component';
import { TemplateGridComponent } from '../../templates/grid/template.grid.component';
import { TemplateEditComponent } from '../../templates/edit/template.edit.component';

@NgModule({
    declarations: [
        FunctionGridComponent,
        FunctionEditComponent
    ],
    imports: [
        MvcSharedModule,
        RouterModule.forChild([
            {
                path: '',
                component: TemplateGridComponent,
                children: [
                    { path: '', component: FunctionGridComponent, pathMatch: 'full' },
                    { path: 'grid', component: FunctionGridComponent },
                ]
            },
            {
                path: '',
                component: TemplateEditComponent,
                children: [
                    { path: 'new', component: FunctionEditComponent },
                    { path: 'edit', component: FunctionEditComponent },
                ]
            }
        ])
    ]
})
export class FunctionModule { }

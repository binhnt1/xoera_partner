import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import {
    DxFormModule,
    DxTagBoxModule,
    DxTextBoxModule,
    DxDataGridModule,
    DxTextAreaModule,
    DxLoadPanelModule,
    DxSelectBoxModule,
    DxHtmlEditorModule,
    DxRadioGroupModule,
    DxDropDownBoxModule,
} from 'devextreme-angular';

// Editor textbox
import { EditorComponent } from '../editor/editor.component';
import { EditorStringBoxComponent } from '../editor/components/stringbox/stringbox.component';
import { EditorStringBoxTextComponent } from '../editor/components/stringbox/text/text.component';
import { EditorStringBoxMultiTextComponent } from '../editor/components/stringbox/multitext/multitext.component';

// Editor numberbox
import { EditorNumberboxComponent } from '../editor/components/numberbox/numberbox.component';
import { EditorNumberboxTextComponent } from '../editor/components/numberbox/text/text.component';
import { EditorNumberboxNumberComponent } from '../editor/components/numberbox/number/number.component';

// Editor dropdown
import { EditorDropDownboxComponent } from '../editor/components/dropdownbox/dropdownbox.component';
import { EditorDropDownboxSelectComponent } from '../editor/components/dropdownbox/select/select.component';
import { EditorDropDownboxDropDownComponent } from '../editor/components/dropdownbox/dropdown/dropdown.component';
import { EditorDropDownboxDropDownAjaxComponent } from '../editor/components/dropdownbox/dropdownajax/dropdownajax.component';
import { EditorDropDownboxDropDownGridComponent } from '../editor/components/dropdownbox/dropdown.grid/dropdown.grid.component';
import { EditorDropDownboxDropDownDevExpressComponent } from '../editor/components/dropdownbox/dropdown.devexpress/dropdown.devexpress.component';

// Editor datetime
import { EditorDateTimeBoxComponent } from '../editor/components/datetimebox/datetimebox.component';
import { EditorDateTimeBoxTimeComponent } from '../editor/components/datetimebox/time/time.component';
import { EditorDateTimeBoxDateComponent } from '../editor/components/datetimebox/date/date.component';
import { EditorDateTimeBoxDateTimeComponent } from '../editor/components/datetimebox/datetime/datetime.component';

// Editor boolean
import { EditorBoolBoxComponent } from '../editor/components/boolbox/boolbox.component';
import { EditorBoolBoxCheckboxComponent } from '../editor/components/boolbox/checkbox/checkbox.component';
import { EditorBoolBoxRadioButtonComponent } from '../editor/components/boolbox/radiobutton/radiobutton.component';

// Editor file
import { EditorFileBoxComponent } from '../editor/components/filebox/filebox.component';
import { EditorFileBoxFileComponent } from '../editor/components/filebox/file/file.component';
import { EditorFileBoxImageComponent } from '../editor/components/filebox/image/image.component';

// Grid
import { GridActionComponent } from '../components/grid/action/action.component';
import { GridPagingComponent } from '../components/grid/paging/paging.component';
import { GridHeadingComponent } from '../components/grid/heading/heading.component';

// Edit
import { EditHeadingComponent } from '../components/edit/heading/heading.component';

// Pipe
import { DatexPipe } from '../pipes/datetime.pipe';
import { HighlightPipe } from '../pipes/highlight.pipe';
import { SanitizeUrlPipe } from '../pipes/sanitizeurl.pipe';
import { SanitizeHtmlPipe } from '../pipes/sanitizehtml.pipe';

// Directive
import { ClickOutsideModule } from 'ng-click-outside';
import { MvcClickOutsideDirective } from '../directives/click.outside.directive';
import { MvcRemoveWrapperDirective } from '../directives/remove.wapper.directive';
import { MvcScrollTrackerDirective } from '../directives/scroll.tracker.directive';

// Layout
import { TemplateEditComponent } from '../templates/edit/template.edit.component';
import { TemplateGridComponent } from '../templates/grid/template.grid.component';
import { TemplateEmptyComponent } from '../templates/empty/template.empty.component';
import { TemplateSignInComponent } from '../templates/signin/template.signin.component';
import { LayoutMetronicHeaderComponent } from '../layout/components/header/header.component';
import { LayoutMetronicFooterComponent } from '../layout/components/footer/footer.component';
import { LayoutMetronicSidebarComponent } from '../layout/components/sidebar/sidebar.component';
import { LayoutMetronicRightBarComponent } from '../layout/components/rightbar/rightbar.component';
import { LayoutMetronicSubHeaderComponent } from '../layout/components/subheader/subheader.component';

// Components
import { MvcAlertComponent } from '../components/alert/alert.component';
import { MvcLoadingComponent } from '../components/loading/loading.component';
import { ModalDialogComponent } from '../components/modal/dialog/dialog.component';
import { ModalConfirmComponent } from '../components/modal/confirm/confirm.component';

@NgModule({
    imports: [
        HttpModule,
        FormsModule,
        CommonModule,
        RouterModule,
        DxFormModule,
        DxTagBoxModule,
        DxTextBoxModule,
        DxDataGridModule,
        DxTextAreaModule,
        DxLoadPanelModule,
        DxSelectBoxModule,
        DxHtmlEditorModule,
        DxRadioGroupModule,
        ClickOutsideModule,
        DxDropDownBoxModule,
    ],
    declarations: [
        DatexPipe,
        HighlightPipe,
        EditorComponent,
        SanitizeUrlPipe,
        SanitizeHtmlPipe,
        MvcAlertComponent,
        MvcLoadingComponent,
        GridActionComponent,
        GridPagingComponent,
        GridHeadingComponent,
        EditHeadingComponent,
        ModalDialogComponent,
        ModalConfirmComponent,
        TemplateGridComponent,
        TemplateEditComponent,
        TemplateEmptyComponent,
        EditorBoolBoxComponent,
        EditorFileBoxComponent,
        TemplateSignInComponent,
        EditorStringBoxComponent,
        EditorNumberboxComponent,
        MvcClickOutsideDirective,
        MvcRemoveWrapperDirective,
        MvcScrollTrackerDirective,
        EditorDateTimeBoxComponent,
        EditorDropDownboxComponent,
        EditorFileBoxFileComponent,
        EditorFileBoxImageComponent,
        EditorStringBoxTextComponent,
        EditorNumberboxTextComponent,
        LayoutMetronicHeaderComponent,
        LayoutMetronicFooterComponent,
        EditorNumberboxNumberComponent,
        EditorDateTimeBoxTimeComponent,
        EditorDateTimeBoxDateComponent,
        EditorBoolBoxCheckboxComponent,
        LayoutMetronicSidebarComponent,
        LayoutMetronicRightBarComponent,
        EditorDropDownboxSelectComponent,
        LayoutMetronicSubHeaderComponent,
        EditorBoolBoxRadioButtonComponent,
        EditorStringBoxMultiTextComponent,
        EditorDateTimeBoxDateTimeComponent,
        EditorDropDownboxDropDownComponent,
        EditorDropDownboxDropDownGridComponent,
        EditorDropDownboxDropDownAjaxComponent,
        EditorDropDownboxDropDownDevExpressComponent,
    ],
    exports: [
        DatexPipe,
        HttpModule,
        FormsModule,
        DxFormModule,
        CommonModule,
        RouterModule,
        AgGridModule,
        HighlightPipe,
        DxTagBoxModule,
        EditorComponent,
        SanitizeUrlPipe,
        DxTextBoxModule,
        SanitizeHtmlPipe,
        DxDataGridModule,
        DxTextAreaModule,
        MvcAlertComponent,
        DxLoadPanelModule,
        DxSelectBoxModule,
        DxHtmlEditorModule,
        DxRadioGroupModule,
        ClickOutsideModule,
        DxDropDownBoxModule,
        MvcLoadingComponent,
        GridActionComponent,
        GridPagingComponent,
        GridHeadingComponent,
        EditHeadingComponent,
        ModalDialogComponent,
        ModalConfirmComponent,
        TemplateGridComponent,
        TemplateEditComponent,
        TemplateEmptyComponent,
        EditorBoolBoxComponent,
        EditorFileBoxComponent,
        TemplateSignInComponent,
        EditorStringBoxComponent,
        EditorNumberboxComponent,
        MvcClickOutsideDirective,
        MvcRemoveWrapperDirective,
        MvcScrollTrackerDirective,
        EditorDateTimeBoxComponent,
        EditorDropDownboxComponent,
        EditorFileBoxFileComponent,
        EditorFileBoxImageComponent,
        EditorStringBoxTextComponent,
        EditorNumberboxTextComponent,
        LayoutMetronicHeaderComponent,
        LayoutMetronicFooterComponent,
        EditorNumberboxNumberComponent,
        EditorDateTimeBoxTimeComponent,
        EditorDateTimeBoxDateComponent,
        EditorBoolBoxCheckboxComponent,
        LayoutMetronicSidebarComponent,
        LayoutMetronicRightBarComponent,
        EditorDropDownboxSelectComponent,
        LayoutMetronicSubHeaderComponent,
        EditorBoolBoxRadioButtonComponent,
        EditorStringBoxMultiTextComponent,
        EditorDateTimeBoxDateTimeComponent,
        EditorDropDownboxDropDownComponent,
        EditorDropDownboxDropDownGridComponent,
        EditorDropDownboxDropDownAjaxComponent,
        EditorDropDownboxDropDownDevExpressComponent,
    ]
})
export class MvcSharedModule { }

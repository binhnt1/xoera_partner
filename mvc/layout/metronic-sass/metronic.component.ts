import { ThemeTypeAware } from "../../domains/enums/theme.type";
import { Component, ViewEncapsulation, OnInit } from "@angular/core";
import KTLayoutHelper from "../../../assets/layouts/metronic-sass/js/scripts.bundle";

@ThemeTypeAware
@Component({
  templateUrl: './metronic.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    '../../../assets/plugins/datatables/datatables.bundle.css',
    '../../../assets/plugins/perfect-scrollbar/css/perfect-scrollbar.css',
    '../../../assets/plugins/bootstrap-select/dist/css/bootstrap-select.css',
    '../../../assets/plugins/bootstrap-timepicker/css/bootstrap-timepicker.css',
    '../../../assets/plugins/jquery-dragtable-column/dragndrop.table.columns.css',
    '../../../assets/plugins/bootstrap-datepicker/dist/css/bootstrap-datepicker.css',
    '../../../assets/plugins/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.css',
    '../../../assets/plugins/bootstrap-datetime-picker/css/bootstrap-datetimepicker.css',
    '../../../assets/plugins/toastr/build/toastr.css',
    '../../../assets/plugins/select2/dist/css/select2.css',
    '../../../assets/plugins/line-awesome/css/line-awesome.css',
    '../../../assets/plugins/socicon/css/socicon.css',
    '../../../assets/plugins/flaticon2/flaticon.css',
    '../../../assets/plugins/flaticon/flaticon.css',
    '../../../assets/plugins/fontawesome5/css/all.min.css',
    '../../../assets/layouts/metronic-sass/scss/style.bundle.css',
    '../../../assets/plugins/bootstrap-phone/build/css/intlTelInput.css',
  ]
})
export class LayoutMetronicSassComponent implements OnInit {
  ngOnInit() {
    setTimeout(() => { KTLayoutHelper(); }, 1000);
  }
}

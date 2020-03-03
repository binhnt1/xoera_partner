import { Component, ViewEncapsulation, OnInit } from "@angular/core";
import KTLayoutHelper from '../../../assets/layouts/metronic/js/scripts.bundle';

@Component({
  encapsulation: ViewEncapsulation.None,
  templateUrl: './metronic.component.html',
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
    '../../../assets/plugins/animate.css/animate.css',
    '../../../assets/plugins/socicon/css/socicon.css',
    '../../../assets/plugins/flaticon2/flaticon.css',
    '../../../assets/plugins/flaticon/flaticon.css',
    '../../../assets/layouts/metronic/scss/style.bundle.css',
    '../../../assets/plugins/fontawesome5/css/all.min.css',
    '../../../assets/layouts/skins/header/base/light.css',
    '../../../assets/layouts/skins/header/menu/light.css',
    '../../../assets/layouts/skins/aside/dark.css',
    '../../../assets/layouts/skins/brand/dark.css',
    '../../../assets/plugins/bootstrap-phone/build/css/intlTelInput.css',
  ]
})
export class LayoutMetronicComponent implements OnInit {
  ngOnInit() {
    setTimeout(() => { KTLayoutHelper(); }, 1000);
  }
}

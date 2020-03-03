import { Router } from "@angular/router";
import { RouterHelper } from "../../helpers/router.helper";

export class ButtonData {
    public name?: string;
    public icon?: string;
    public className?: string;
    public click?: (obj?: any) => any;
}

export class ActionConfirmData {
    title: string;
    content: string;
    buttons: ButtonData[];
}

export class ActionData extends ButtonData {
    public divider?: boolean;
    public subAction?: boolean;
    public confirm?: ActionConfirmData;

    public static toolboxDivider(): ActionData {
        let item: ActionData = {
            divider: true,
            subAction: true,
        }
        return item;
    }

    public static back(router: Router, click?: () => any): ActionData {
        let item: ActionData = {
            name: 'Back',
            subAction: false,
            className: 'btn btn-outline-secondary',
            icon: 'la la-hand-o-left',
            click: () => {
                if (click) click();
                else history.back();
            }
        }
        return item;
    }

    public static save(router: Router, click?: () => any): ActionData {
        let item: ActionData = {
            name: 'Save',
            subAction: false,
            icon: 'la la-save',
            className: 'btn btn-primary',
            click: () => {
                if (click) click();
                else RouterHelper.NavigateToGridPage(router);
            }
        }
        return item;
    }

    public static addNew(router: Router, click?: () => any): ActionData {
        let item: ActionData = {
            name: 'Add New',
            subAction: false,
            icon: 'la la-plus',
            className: 'btn btn-primary',
            click: () => {
                if (click) click();
                else {
                    let url = router.url,
                        urlTree = router.parseUrl(url),
                        queryParams = urlTree.queryParams,
                        redirectLink = RouterHelper.RemoveAllActions(router) + '/new';
                    RouterHelper.NavigateState(router, redirectLink, null, queryParams);
                }
            }
        }
        return item;
    }

    public static delete(okClick?: () => any, cancelClick?: () => any): ActionData {
        let item: ActionData = {
            name: 'Delete',
            subAction: false,
            icon: 'la la-trash',
            className: 'btn btn-danger',
            confirm: {
                title: 'Confirm',
                content: 'Are you sure delete this item?',
                buttons: [
                    {
                        name: 'OK',
                        className: 'btn btn-sm btn-success',
                        click: () => {
                            if (okClick) okClick();
                        },
                    },
                    {
                        name: 'Cancel',
                        className: 'btn btn-sm btn-danger',
                        click: () => {
                            if (cancelClick) cancelClick();
                        },
                    },
                ]
            },
        }
        return item;
    }

    public static gridEdit(router: Router, id: number, controller?: string, click?: () => any): ActionData {
        let item: ActionData = {
            name: 'Edit',
            subAction: false,
            icon: 'la la-edit',
            className: 'btn btn-sm btn-icon btn-clean',
            click: () => {
                if (click) click();
                else RouterHelper.NavigateToEditPage(router, id, controller);
            }
        }
        return item;
    }

    public static gridDelete(okClick?: () => any, cancelClick?: () => any): ActionData {
        let item: ActionData = {
            name: 'Delete',
            subAction: false,
            icon: 'la la-trash',
            className: 'btn btn-sm btn-icon btn-clean',
            confirm: {
                title: 'Confirm',
                content: 'Are you sure delete this item?',
                buttons: [
                    {
                        name: 'OK',
                        className: 'btn btn-sm btn-success',
                        click: () => {
                            if (okClick) okClick();
                        },
                    },
                    {
                        name: 'Cancel',
                        className: 'btn btn-sm btn-danger',
                        click: () => {
                            if (cancelClick) cancelClick();
                        },
                    },
                ]
            },
        }
        return item;
    }

    public static gridInActive(router: Router, id: number, click?: () => any): ActionData {
        let item: ActionData = {
            name: 'Disable',
            subAction: false,
            icon: 'la la-hand-o-down',
            className: 'btn btn-sm btn-icon btn-clean',
            click: () => {
                if (click) click();
                else {
                    let url = RouterHelper.RemoveAllActions(router);
                    RouterHelper.Navigate(router, url);
                }
            }
        }
        return item;
    }

    public static toolboxBack(router: Router, click?: () => any): ActionData {
        let item: ActionData = {
            name: 'Back',
            subAction: true,
            icon: 'la la-hand-o-left',
            click: () => {
                if (click) click();
                else RouterHelper.NavigateToGridPage(router);
            }
        }
        return item;
    }

    public static toolboxClone(router: Router, click?: () => any): ActionData {
        let item: ActionData = {
            name: 'Clone',
            subAction: true,
            icon: 'la la-copy',
            click: () => {
                if (click) click();
                else RouterHelper.NavigateToNewPage(router);
            }
        }
        return item;
    }

    public static toolboxAddNew(router: Router, click?: () => any): ActionData {
        let item: ActionData = {
            name: 'New',
            subAction: true,
            icon: 'la la-plus',
            click: () => {
                if (click) click();
                else RouterHelper.NavigateToNewPage(router);
            }
        }
        return item;
    }

    public static toolboxDelete(okClick?: () => any, cancelClick?: () => any): ActionData {
        let item: ActionData = {
            name: 'Delete',
            subAction: true,
            icon: 'la la-trash',
            confirm: {
                title: 'Confirm',
                content: 'Are you sure delete this item?',
                buttons: [
                    {
                        name: 'OK',
                        className: 'btn btn-sm btn-success',
                        click: () => {
                            if (okClick) okClick();
                        },
                    },
                    {
                        name: 'Cancel',
                        className: 'btn btn-sm btn-danger',
                        click: () => {
                            if (cancelClick) cancelClick();
                        },
                    },
                ]
            },
        }
        return item;
    }

    public static toolboxRefresh(router: Router, click?: () => any): ActionData {
        let item: ActionData = {
            name: 'Refresh',
            subAction: true,
            icon: 'la la-refresh',
            click: () => {
                if (click) click();
                else location.reload(true);
            }
        }
        return item;
    }

    public static toolboxInformation(router: Router, click?: () => any): ActionData {
        let item: ActionData = {
            subAction: true,
            icon: 'la la-info',
            name: 'Information',
            click: () => {
                if (click) click();
                else RouterHelper.NavigateToNewPage(router);
            }
        }
        return item;
    }

    public static toolboxViewAll(router: Router, click?: () => any): ActionData {
        let item: ActionData = {
            name: 'All',
            subAction: true,
            icon: 'la la-arrows-alt',
            click: () => {
                if (click) click();
                else RouterHelper.NavigateToNewPage(router);
            }
        }
        return item;
    }

    public static toolboxViewTrash(router: Router, click?: () => any): ActionData {
        let item: ActionData = {
            name: 'Trash',
            subAction: true,
            icon: 'la la-trash',
            click: () => {
                if (click) click();
                else RouterHelper.NavigateToNewPage(router);
            }
        }
        return item;
    }

    public static toolboxViewActive(router: Router, click?: () => any): ActionData {
        let item: ActionData = {
            name: 'Enabled',
            subAction: true,
            icon: 'la la-hand-o-up',
            click: () => {
                if (click) click();
                else RouterHelper.NavigateToNewPage(router);
            }
        }
        return item;
    }

    public static toolboxViewInActive(router: Router, click?: () => any): ActionData {
        let item: ActionData = {
            name: 'Disabled',
            subAction: true,
            icon: 'la la-hand-o-down',
            click: () => {
                if (click) click();
                else RouterHelper.NavigateToNewPage(router);
            }
        }
        return item;
    }

    public static toolboxExportPdf(router: Router, click?: () => any): ActionData {
        let item: ActionData = {
            name: 'Export PDF',
            subAction: true,
            icon: 'la la-file-pdf-o',
            click: () => {
                if (click) click();
                else RouterHelper.NavigateToNewPage(router);
            }
        }
        return item;
    }

    public static toolboxExportCsv(router: Router, click?: () => any): ActionData {
        let item: ActionData = {
            name: 'Export CSV',
            subAction: true,
            icon: 'la la-file-text-o',
            click: () => {
                if (click) click();
                else RouterHelper.NavigateToNewPage(router);
            }
        }
        return item;
    }

    public static toolboxExportExcel(router: Router, click?: () => any): ActionData {
        let item: ActionData = {
            name: 'Export Excel',
            subAction: true,
            icon: 'la la-file-excel-o',
            click: () => {
                if (click) click();
                else RouterHelper.NavigateToNewPage(router);
            }
        }
        return item;
    }
}
import * as $ from 'jquery';
import { Router, UrlTree, Route } from '@angular/router';

export class RouterHelper {
    public static getId(router: Router): number {
        let id = RouterHelper.getUrlState(router, 'id');
        return id ? parseInt(id) : 0;
    }

    public static getUrlState(router: Router, state?: string): any {
        if (!state) state = 'id';
        let sessionKey = 'session_' + state;

        if (state == 'id' && RouterHelper.IsNewPage(router)) {
            sessionStorage.removeItem(sessionKey);
            return 0;
        }
        let navigation = router.getCurrentNavigation();
        let value = navigation && navigation.extras && navigation.extras.state
            ? navigation.extras.state[state]
            : sessionStorage.getItem(sessionKey);
        if (value) sessionStorage.setItem(sessionKey, value.toString());
        return value;
    }

    public static getOrders(router: Router): any {
        let url = router.url,
            urlTree = router.parseUrl(url),
            queryParams = urlTree.queryParams;
        return (queryParams && queryParams['orders']) || '';
    }

    public static getColumns(router: Router): any {
        let url = router.url,
            urlTree = router.parseUrl(url),
            queryParams = urlTree.queryParams;
        return (queryParams && queryParams['columns']) || '';
    }

    public static getFilters(router: Router): any {
        let url = router.url,
            urlTree = router.parseUrl(url),
            queryParams = urlTree.queryParams;
        return (queryParams && queryParams['filters']) || '';
    }

    public static getPageSize(router: Router): any {
        let url = router.url,
            urlTree = router.parseUrl(url),
            queryParams = urlTree.queryParams;
        return (queryParams && queryParams['size']) || 20;
    }

    public static getPageIndex(router: Router): any {
        let url = router.url,
            urlTree = router.parseUrl(url),
            queryParams = urlTree.queryParams;
        return (queryParams && queryParams['page']) || 1;
    }

    public static RemoveAllActions(router: Router) {
        let url = router.url,
            urlTree = router.parseUrl(url),
            segments = urlTree.root.children.primary.segments
                .filter(c => c.path != 'new')
                .filter(c => c.path != 'edit')
                .filter(c => c.path != 'grid'),
            redirectLink = urlTree.root + '/' + segments.map(c => c.path).join('/');
        return redirectLink;
    }

    public static IsEditPage(router: Router): boolean {
        return router.url.indexOf('/edit') >= 0;
    }

    public static IsNewPage(router: Router): boolean {
        let url = router.url.replace('/news', '');
        return url.indexOf('/new') >= 0;
    }

    public static IsGridPage(router: Router): boolean {
        let grid = router.url.indexOf('/grid') >= 0;
        if (!grid) {
            grid = !RouterHelper.IsEditPage(router) && !RouterHelper.IsNewPage(router);
        }
        return grid;
    }

    public static Navigate(router: Router, item: string, params?: any, external?: boolean) {
        $('.bs-tooltip-top').remove();
        if (external) {
            window.location.href = item.indexOf('/') == 0 ? item : '/' + item;
            return;
        }
        $('body,html').animate({ scrollTop: 0 });
        if (params) router.navigateByUrl(item, { state: params });
        else router.navigateByUrl(item);
    }

    public static NavigateQueryParams(router: Router, item: string, params?: any, complete?: () => void) {
        $('.bs-tooltip-top').remove();
        $('body,html').animate({ scrollTop: 0 });
        if (params) router.navigate([item], { queryParams: params }).then(() => {
            if (complete) complete();
        });
        else router.navigate([item]).then(() => {
            if (complete) complete();
        });
    }

    public static NavigateState(router: Router, item: string, state?: any, params?: any, complete?: () => void) {
        $('.bs-tooltip-top').remove();
        $('body,html').animate({ scrollTop: 0 });
        if (state && params) router.navigate([item], { state: state, queryParams: params }).then(() => {
            if (complete) complete();
        }); else if (params) router.navigate([item], { queryParams: params }).then(() => {
            if (complete) complete();
        }); else if (state) router.navigate([item], { state: state }).then(() => {
            if (complete) complete();
        }); else router.navigate([item]).then(() => {
            if (complete) complete();
        });
    }

    public static NavigateToNewPage(router: Router, controller?: string) {
        $('.bs-tooltip-top').remove();
        let url = router.url,
            urlTree = router.parseUrl(url),
            queryParams = urlTree.queryParams,
            redirectLink = RouterHelper.RemoveAllActions(router) + '/new';
        if (controller) redirectLink = controller + '/new';
        RouterHelper.NavigateState(router, redirectLink, null, queryParams);
    }

    public static NavigateToGridPage(router: Router, controller?: string) {
        $('.bs-tooltip-top').remove();
        let url = router.url,
            urlTree = router.parseUrl(url),
            queryParams = urlTree.queryParams,
            redirectLink = RouterHelper.RemoveAllActions(router) + '/grid';
        if (controller) redirectLink = controller + '/grid';
        RouterHelper.NavigateState(router, redirectLink, null, queryParams);
    }

    public static NavigateToEditPage(router: Router, id: number, controller?: string) {
        $('.bs-tooltip-top').remove();
        let url = router.url,
            urlTree = router.parseUrl(url),
            queryParams = urlTree.queryParams,
            redirectLink = RouterHelper.RemoveAllActions(router);
        if (controller) {
            redirectLink = redirectLink.substring(0, redirectLink.lastIndexOf('/'));
            redirectLink += '/' + controller;
        }
        redirectLink += '/edit';
        RouterHelper.NavigateState(router, redirectLink, { id: id }, queryParams);
    }

    public static ScrollToTop() {
        $('body,html').animate({ scrollTop: 0 });
    }

    public static GetController(router: Router): string {
        let url = router.url,
            urlTree = router.parseUrl(url),
            segments = urlTree.root.children.primary.segments;
        return segments && segments.length > 0 && segments[0].path;
    }
}
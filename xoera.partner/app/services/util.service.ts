declare var jQuery: any;
declare var google: any;
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Address } from '../domains/data/address';
import { BookingDto } from '../domains/objects/booking.dto';
import { Quotation } from '../domains/data/quotation';

@Injectable()
export class UtilService {
    map: any;
    markers: Array<any>;
    flightPath: any = null;
    infowindow: any = null;
    MAP_MAX_ZOOM: number = 15;
    flightReturnPath: any = null;

    constructor(public data: DataService) {
    }
    public IsMobile(): boolean {
        var width = jQuery(window).length > 0 ? jQuery(window).width() : jQuery('body').width();
        return width <= 567;
    }
    public CheckIOSPlatform(): boolean {
        var result = false;
        var iDevices = [
            'iPhone Simulator',
            'iPod Simulator',
            'iPhone',
            'iPod'
        ];
        if (!!navigator.platform) {
            while (iDevices.length) {
                if (navigator.platform == iDevices.pop()) {
                    result = true;
                    break;
                }
            }
        }
        return result;
    }
    public ScrollToStickyInModal(sticky: string, modal: string) {
        sticky = '#' + sticky;
        if (jQuery(sticky).length > 0) {
            var offset = jQuery(sticky).offset();
            if (offset && offset.top > 0) {
                var top = jQuery('#' + modal).scrollTop() + offset.top;
                if (jQuery('#' + modal).length > 0) {
                    jQuery('#' + modal).scrollTop(top);
                }
            }
        }
    }
    public ScrollToSticky(sticky: string, menufix: boolean = true) {
        sticky = '#' + sticky;
        if (jQuery(sticky).length > 0) {
            var offset = jQuery(sticky).offset();
            if (offset && offset.top > 0) {
                var menuHeight = jQuery('#menus').length > 0 ? jQuery('#menus').outerHeight() : 0;
                var top = menufix ? offset.top - menuHeight : offset.top;
                if (jQuery(window).scrollTop() == 0 && menufix) {
                    top -= menuHeight;
                }
                jQuery('body,html').animate({ scrollTop: top });
                jQuery(window).scrollTop(top);
            }
        }
    }

    private InitInfowindow() {
        return new google.maps.InfoWindow({ size: new google.maps.Size(150, 50) });
    }
    public ResizeMap(heightExpand: number = 300) {
        if (this.map == null) return;
        if (!this.CheckExistsMap('map')) return;

        var that = this;
        setTimeout(function () {
            if (jQuery(window).width() > 991) {
                /// Check scroll time
                if (jQuery('#stickyTime').length > 0) {
                    var scrollTop = jQuery(window).scrollTop() + 81;
                    var top = jQuery('#stickyTime').offset().top;
                    var pickTime = scrollTop > top;

                    /// Scroll
                    if (pickTime) {
                        top = jQuery('#stickyTime').offset().top - 81;
                        if (jQuery(window).scrollTop() == 0) top -= 81;
                        jQuery('body,html').scrollTop(top);
                    }
                }

                /// Resize
                let height = jQuery('#pickup-container #form').outerHeight() + 60 + heightExpand;
                if (jQuery('.dropdown-more-options').length > 0) {
                    if (jQuery('.dropdown-more-options').is(':visible')) {
                        height += 180;
                    }
                }
                if (height > 870) {
                    jQuery('#map').height(height);
                    google.maps.event.trigger(that.map, 'resize');
                    jQuery('#pickup-container').innerHeight(height);
                } else {
                    jQuery('#map').height(870);
                    google.maps.event.trigger(that.map, 'resize');
                    jQuery('#pickup-container').innerHeight(height);
                }
            }
        }, 10);

    }
    private ShiftRight(elementId: string = 'map') {
        if (!this.CheckExistsMap(elementId)) return;

        var map = this.map;
        var markers = this.markers;
        if (jQuery(window).width() > 991 && jQuery('#form').length > 0) {
            var overlay = new google.maps.OverlayView();
            overlay.draw = function () { };
            overlay.onAdd = function () {
                const arrayMin = function arrayMin(arr: any) {
                    var len = arr.length, min = Infinity;
                    while (len--) {
                        if (arr[len] < min) {
                            min = arr[len];
                        }
                    }
                    return min;
                };
                const arrayMax = function arrayMax(arr: any) {
                    var len = arr.length, max = -Infinity;
                    while (len--) {
                        if (arr[len] > max) {
                            max = arr[len];
                        }
                    }
                    return max;
                };

                var projection = this.getProjection();
                var lats: any = [];
                markers.forEach(function (object: any) {
                    lats.push(projection.fromLatLngToDivPixel(object.position).x);
                });
                var shift = 0;
                var min = arrayMin(lats);
                var max = arrayMax(lats);
                var boundWidth = Math.abs(max - min);
                var mapWidth = jQuery('#' + elementId).outerWidth();
                var mapHeight = jQuery('#' + elementId).outerHeight();
                var current = { x: Math.round(mapWidth / 2), y: Math.round(mapHeight / 2) };
                var outerWidth = jQuery('#form').offset().left + jQuery('#form').outerWidth();

                shift = lats.length <= 1
                    ? Math.round(outerWidth / 4)
                    : Math.round(outerWidth / 2) + boundWidth / 2;
                map.setCenter(projection.fromContainerPixelToLatLng({ x: current.x - shift, y: current.y }));
                if (max + shift > mapWidth || min + shift > mapWidth) {
                    map.setZoom(map.getZoom() - 1);
                }
            };
            overlay.setMap(map);
        }
    }
    private BoundMarkers(elementId: string = 'map') {
        if (!this.CheckExistsMap(elementId)) return;
        if (this.markers != null && this.markers.length > 0) {
            var bounds = new google.maps.LatLngBounds();
            this.markers.forEach(function (object: any) {
                bounds.extend(object.position);
            });
            if (this.map != null) this.map.fitBounds(bounds);
            var map = this.map;
            var zoom = this.MAP_MAX_ZOOM;
            window.setTimeout(function () {
                if (map.getZoom() > zoom) map.setZoom(zoom);
            }, 200);
        }
    }
    public CheckExistsMap(elementId: string = 'map') {
        var element = document.getElementById(elementId);
        if (element && google) {
            element.style.display = 'block';
            return true;
        }
        return false;
    }
    public RemoveMarkers(elementId: string = 'map', i: number) {
        if (!this.CheckExistsMap(elementId))
            return;

        this.ClearRoute(elementId, true, true);
        if (this.markers == null) this.markers = new Array();
        for (var j = 0; j < this.markers.length; j++) {
            if (this.markers[j].index == i)
                this.markers[j].setMap(null);
        }
        return;
    }
    private DrawMarker(elementId: string = 'map', address: Address, i: number): any {
        if (this.map == null) return null;
        if (!this.CheckExistsMap(elementId)) return null;
        if (this.infowindow == null) this.infowindow = this.InitInfowindow();

        let image: any;
        if (i == -1) {
            image = {
                url: 'assets/images/map/pickup2.png',
            };
        } else if (i == 100) {
            image = {
                url: 'assets/images/map/dropoff2.png',
            };
        } else {
            image = {
                url: 'assets/images/map/via' + (i + 1) + '.png',
            };
        }

        if (address == null || address.lat == null || address.lng == null) return null;
        let marker = new google.maps.Marker({
            index: i,
            icon: image,
            draggable: false,
            map: this.map,
            position: {
                lat: address.lat,
                lng: address.lng
            },
            formatted_address: address.line1 || address.line2
                ? address.line1 + '<br />' + address.line2
                : address.fullAddress
        });

        var that = this;
        let infowindowMarker = this.infowindow;
        google.maps.event.addListener(marker, 'click', function () {
            if (marker.formatted_address && marker.formatted_address != '') {
                infowindowMarker.setContent(marker.formatted_address);
            }
            infowindowMarker.open(that.map, marker);
        });
        return marker;
    }
    public ClearRoute(elementId: string = 'map', onwardPath: boolean = true, returnPath: boolean = true) {
        if (!this.CheckExistsMap(elementId)) return;
        if (onwardPath) {
            if (this.flightPath != null)
                this.flightPath.setMap(null);
        }
        if (returnPath) {
            if (this.flightReturnPath != null)
                this.flightReturnPath.setMap(null);
        }
    }
    public InitMarkers(elementId: string = 'map', booking: BookingDto, shift: boolean = false) {
        if (!this.CheckExistsMap(elementId)) return;

        this.map = this.InitMap(elementId);
        if (booking == null) return;
        if (this.map == null) return;

        if (this.markers == null) this.markers = new Array();
        for (var j = 0; j < this.markers.length; j++) {
            this.markers[j].setMap(null);
        }
        this.markers = new Array();
        if (booking.PickUp != null) {
            let marker = this.DrawMarker(elementId, booking.PickUp, -1);
            if (marker != null) this.markers.push(marker);
        }
        if (booking.PickDown != null) {
            let marker = this.DrawMarker(elementId, booking.PickDown, 100);
            if (marker != null) this.markers.push(marker);
        }
        if (booking.ViaAddress != null && booking.ViaAddress.length > 0) {
            booking.ViaAddress.forEach((element, index) => {
                if (element != null) {
                    let marker = this.DrawMarker(elementId, element, index);
                    if (marker != null) this.markers.push(marker);
                }
            });
        }

        /// Bound Markers
        this.BoundMarkers(elementId);

        /// Clear Route
        this.ClearRoute(elementId, true, true);

        /// Shift
        if (shift && this.markers != null && this.markers.length > 0) {
            var that = this;
            window.setTimeout(function () {
                that.ShiftRight(elementId);
            }, 500);
        }
    }
    public DrawRoute(elementId: string = 'map', booking: BookingDto, quotation: Quotation) {
        this.ClearRoute(elementId, true, false);
        if (!this.CheckExistsMap(elementId)) return this.flightPath;
        if (!booking || !this.map || !booking.PickUp || !booking.PickDown) return this.flightPath;
        if (!quotation || !quotation.routePath || quotation.routePath.length == 0) return this.flightPath;

        let coordinates: any = [];
        quotation.routePath.forEach(item => {
            coordinates.push({ lat: item[1], lng: item[0] });
        });
        this.flightPath = new google.maps.Polyline({
            strokeWeight: 3,
            path: coordinates,
            strokeOpacity: 1.0,
            strokeColor: '#063D62',
        });
        this.flightPath.setMap(this.map);
    }
    public DrawReturnRoute(elementId: string = 'map', booking: BookingDto, quotation: Quotation): any {
        this.ClearRoute(elementId, false, true);
        if (!this.CheckExistsMap(elementId)) return this.flightReturnPath;
        if (!this.CheckExistsMap(elementId)) return this.flightReturnPath;
        if (!booking || !this.map || !booking.PickUp || !booking.PickDown) return this.flightReturnPath;
        if (!quotation || !quotation.routePath || quotation.routePath.length == 0) return this.flightReturnPath;

        let coordinates: any = [];
        quotation.returnRoutePath.forEach(item => {
            coordinates.push({ lat: item[1], lng: item[0] });
        });
        var flightPath = new google.maps.Polyline({
            strokeWeight: 1.5,
            path: coordinates,
            strokeOpacity: 1.0,
            strokeColor: '#3699DD',
        });
        flightPath.setMap(this.map);
        return flightPath;
    }
    public InitMap(elementId: string = 'map', lat: number = 51.498826, lng: number = -0.014468, createMarker: boolean = false) {
        if (!this.CheckExistsMap(elementId))
            return this.map;
        var map: any = null;

        if (lat != null && lng != null) {
            map = new google.maps.Map(document.getElementById(elementId), {
                zoom: this.MAP_MAX_ZOOM,
                scrollwheel: false,
                center: {
                    lat: lat,
                    lng: lng
                },
                streetViewControlOptions: {
                    position: google.maps.ControlPosition.RIGHT_TOP
                },
                zoomControlOptions: {
                    position: google.maps.ControlPosition.RIGHT_TOP
                }
            });
        } else {
            lat = 51.498826; lng = -0.014468;
            map = new google.maps.Map(document.getElementById(elementId), {
                zoom: this.MAP_MAX_ZOOM,
                scrollwheel: false,
                center: {
                    lat: lat,
                    lng: lng
                },
                streetViewControlOptions: {
                    position: google.maps.ControlPosition.RIGHT_TOP
                },
                zoomControlOptions: {
                    position: google.maps.ControlPosition.RIGHT_TOP
                }
            });
        }

        if (createMarker) {
            let marker = new google.maps.Marker({
                map: map,
                draggable: false,
                position: {
                    lat: lat,
                    lng: lng
                },
                formatted_address: 'Xoera',
            });

            let infowindowMarker = new google.maps.InfoWindow({ size: new google.maps.Size(150, 50) });
            google.maps.event.addListener(marker, 'click', function () {
                if (marker.formatted_address && marker.formatted_address != '') {
                    infowindowMarker.setContent(marker.formatted_address);
                }
                infowindowMarker.open(this.map, marker);
            });
        }
        return map;
    }
}

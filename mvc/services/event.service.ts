import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class MvcEventService {
    public Save: EventEmitter<any> = new EventEmitter<any>();
    public Delete: EventEmitter<any> = new EventEmitter<any>();
    public Validate: EventEmitter<any> = new EventEmitter<any>();
    public EditEntity: EventEmitter<any> = new EventEmitter<any>();
    public ReloadDatagrid: EventEmitter<any> = new EventEmitter<any>();
}

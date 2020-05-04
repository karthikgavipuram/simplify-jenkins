import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class DashboardService {
    @Output("selectedSection") selectedSection: EventEmitter<any> = new EventEmitter<any>();
    @Output("selectedSubsection") selectedSubsection: EventEmitter<any> = new EventEmitter<any>();
    constructor(){}
}
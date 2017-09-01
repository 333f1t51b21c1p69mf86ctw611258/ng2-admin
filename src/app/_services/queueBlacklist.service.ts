import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

//
import { CustomHttp } from "app/_helpers";

@Injectable()
export class QueueBlacklistService {
    constructor(private http: CustomHttp) { }

    add(formData: any) {
        return this.http.post('/queueBlacklists/add', formData)
            .map((response: Response) => {
                return response.json();
            });
    }

    getAddResult(id: number) {
        return this.http.get('/queueBlacklists/getAddResult/' + id)
            .map((response: Response) => {
                return response.json();
            });
    }
}

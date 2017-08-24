import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

//
import { CustomHttp } from "app/_helpers";

@Injectable()
export class QueueBlacklistService {
    constructor(private http: CustomHttp) { }

    add(deviceId: string, filename: string, md5: string) {
        return this.http.post('/queueBlacklists/add', { deviceId: deviceId, filename: filename, md5: md5 })
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

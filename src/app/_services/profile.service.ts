import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

//
import { CustomHttp } from 'app/_helpers';

@Injectable()
export class ProfileService {
    constructor(private http: CustomHttp) { }

    add(formData: any) {
        return this.http.post('/profile', formData)
            .map((response: Response) => {
                return response.json();
            });
    }

    getAll() {
        return this.http.get('/profile')
            .map((response: Response) => {
                return response.json();
            });
    }

    delete(formData: any) {
        const url = '/profile/detail/' + formData;
        return this.http.delete(url);
    }
}

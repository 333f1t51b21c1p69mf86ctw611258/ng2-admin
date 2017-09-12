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

    getById(id: string) {
        return this.http.get('/profile/detail/' + id)
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

    delete(id: string) {
        const url = '/profile/detail/' + id;
        return this.http.delete(url)
            .map((response: Response) => {
                return response.json();
            });
    }
}

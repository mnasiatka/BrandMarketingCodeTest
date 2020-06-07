import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactItemDto, ContactListModelDto } from '../models';
import { map, reduce } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ContactService {

    constructor(private httpService: HttpClient) {
    }

    public getContacts(): Observable<ContactItemDto[]> {
        return this.httpService.get<ContactItemDto[]>(`http://demo5838836.mockable.io/contact`).pipe(
            map(data => data.map(data => data as ContactItemDto))
        );
    }
}
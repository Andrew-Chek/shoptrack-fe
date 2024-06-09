import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LIST } from '../constants/api-urls';
import { ListApiInterface, ListCreateApiInterface, ListUpdateApiInterface } from '../dto/list.api.interface';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {

    constructor(private http: HttpClient) { }

    createList(list: ListCreateApiInterface) {
        return this.http.post<ListCreateApiInterface>(LIST.lists, list);
    }

    getListsByUserId(userId: number): Observable<ListApiInterface[]> {
        const url = `${LIST.listsByUser}/${userId}`;
        return this.http.get<ListApiInterface[]>(url);
    }
    
    updateList(list: ListApiInterface) {
        list.products = list.products.map(product => {
            if(product.discounts == null) {
                product.discounts = [];
            }

            return product;
        });
        const url = `${LIST.lists}/list/${list.list_id}`;
        return this.http.put<ListApiInterface>(url, list);
    }

    deleteList(list_id: number) {
        const url = `${LIST.lists}/${list_id}`;
        return this.http.delete<ListApiInterface>(url);
    }

    removeProductFromList(list: ListApiInterface, product_id: number) {
        const url = `${LIST.lists}/${list.list_id}/removeProduct/${product_id}`;
        return this.http.put<ListApiInterface>(url, list);
    }
}

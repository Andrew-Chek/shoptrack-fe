import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { StoreNamesApiInterface } from '../dto/storeNames.api.interface';
import { STORE } from '../constants/api-urls';
import { StoreApiInterface } from '../dto/store.api.inteface';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

    constructor(private http: HttpClient) { }

    // Метод для отримання даних про магазини з сервера
    getStoreNames(): Observable<string[]> {
        const url = STORE.names; // Замініть '/stores' на ваш ендпоінт
        return this.http.get<StoreNamesApiInterface>(url).pipe(map((data) => data.names));
    }

    getStoreById(storeId: string): Observable<StoreApiInterface> {
        const url = `${STORE.stores}/${storeId}`;
        return this.http.get<StoreApiInterface>(url).pipe(map((data) => {
            return {
                store_id: data.store_id,
                name: data.name,
                address: data.address,
                location: data.location,
                products: data.products,
            };
        }));
    }

    getStoresByName(storeName: string): Observable<StoreApiInterface[]> {
        const url = `${STORE.store}/${storeName}`;
        return this.http.get<StoreApiBackendInterface[]>(url).pipe(map((data) => {
            return data.map(store => {
                return {
                    store_id: store.storeId,
                    name: store.name,
                    address: store.address,
                    location: store.location,
                    products: []
                };
            });
        }));
    }

    createStore(store: StoreApiInterface): Observable<StoreApiInterface> {
        const url = STORE.stores;
        return this.http.post<StoreApiInterface>(url, store);
    }

    updateStore(store: StoreApiInterface): Observable<StoreApiInterface> {
        const url = `${STORE.stores}/store/${store.store_id}`;
        console.log(url);
        console.log(store);
        return this.http.put<StoreApiInterface>(url, store);
    }

    deleteStore(storeId: number): Observable<StoreApiInterface> {
        const url = `${STORE.stores}/store/${storeId}`;
        return this.http.delete<StoreApiInterface>(url);
    }
}

interface StoreApiBackendInterface {
    storeId: number;
    name: string;
    address: string;
    location: string;
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MaxDiscountPerProductDto } from '../dto/discount-per-product.api.interface';
import { ProductPriceDto } from '../dto/product.price.api.interface';
import { STATISTICS, STORE } from '../constants/api-urls';

@Injectable({
    providedIn: 'root'
})
export class StatisticsService {

    constructor(private http: HttpClient) { }

    getMaxDiscountsPerProduct(storeName: string): Observable<MaxDiscountPerProductDto[]> {
        return this.http.get<MaxDiscountPerProductDto[]>(`${STORE.stores}/${storeName}/max-discounts`);
    }

    getCheapestProducts(): Observable<ProductPriceDto[]> {
        return this.http.get<ProductPriceDto[]>(STATISTICS.cheapestProducts);
    }

    getMostExpensiveProducts(): Observable<ProductPriceDto[]> {
        return this.http.get<ProductPriceDto[]>(STATISTICS.mostExpensiveProducts);
    }

    getProductsInListPerStore(storeName: string): Observable<ProductPriceDto[]> {
        return this.http.get<ProductPriceDto[]>(`${STATISTICS.productsInListPerStore}/${storeName}`);
    }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PRODUCT } from '../constants/api-urls';
import { ProductApiInterface } from '../dto/product.api.interface';
import { DiscountApiInterface, DiscountCreateApiInterface } from '../dto/discount.api.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

    constructor(private http: HttpClient) { }

    getProductById(productId: string): Observable<ProductApiInterface> {
        const url = `${PRODUCT.products}/${productId}`;
        return this.http.get<ProductApiInterface>(url).pipe(map((data) => {
            return {
                product_id: data.product_id,
                name: data.name,
                description: data.description,
                price: data.price,
                discounts: data.discounts,
            };
        }));
    }

    createProduct(product: ProductApiInterface, storeId: string): Observable<ProductApiInterface> {
        const url = `${PRODUCT.products}/toStore/${storeId}`;
        return this.http.post<ProductApiInterface>(url, product);
    }

    createDiscount(discount: DiscountCreateApiInterface): Observable<DiscountApiInterface> {
        const url = `${PRODUCT.discounts}/addDiscount`;
        return this.http.post<DiscountApiInterface>(url, discount);
    }

    updateProduct(product: ProductApiInterface): Observable<ProductApiBackendInterface> {
        const url = `${PRODUCT.product}/${product.product_id}`;
        return this.http.put<ProductApiBackendInterface>(url, product);
    }

    deleteProduct(productId: number): Observable<ProductApiInterface> {
        const url = `${PRODUCT.products}/${productId}`;
        return this.http.delete<ProductApiInterface>(url);
    }
}


interface ProductApiBackendInterface {
    productId: number;
    message: string;
}

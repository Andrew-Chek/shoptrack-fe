import { Injectable } from '@angular/core';
import { ProductApiInterface } from '@app/core/dto/product.api.interface';

@Injectable({
  providedIn: 'root'
})
export class GuestCartService {
    private products: ProductApiInterface[] = [];

    constructor() { }
  
    addProduct(product: ProductApiInterface): void {
        this.products.push(product);
    }
  
    getProducts(): ProductApiInterface[] {
        return this.products;
    }
  
    getTotalPrice(products: ProductApiInterface[]): string {
        return products.reduce((total, product) => {
            const discount = product.discounts && product.discounts.length > 0 ? product.discounts[0].amount : 0;
            const validDiscount = isNaN(Number(discount)) ? 0 : Number(discount);
            const price = product.price * (1 - (validDiscount / 100));
            return total + price;
        }, 0).toFixed(2);
    }

    removeProduct(product: ProductApiInterface): void {
        this.products = this.products.filter(p => p !== product);
    }

    clearCart(): void {
        this.products = [];
    }
}

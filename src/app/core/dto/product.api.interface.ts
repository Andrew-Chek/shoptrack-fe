import { DiscountApiInterface } from "./discount.api.interface";

export interface ProductApiInterface {
    product_id: number; 
    name: string; 
    description: string; 
    price: number; 
    discounts: DiscountApiInterface[];
}

import { ProductApiInterface } from "./product.api.interface";

export interface StoreApiInterface {
    store_id: number;
    name: string;
    location: string;
    address: string;
    products: ProductApiInterface[];
}

import { ProductApiInterface } from "./product.api.interface";

export interface ListApiInterface { 
    list_id: number; 
    user_id: number;
    name: string; 
    is_active: boolean;
    products: ProductApiInterface[];
}

export interface ListCreateApiInterface {
    userId: number;
    name: string;
    isActive: boolean;
    products: ProductApiInterface[];
}

export interface ListUpdateApiInterface {
    listId: number;
    userId: number;
    name: string;
    isActive: boolean;
    products: ProductApiInterface[];
}

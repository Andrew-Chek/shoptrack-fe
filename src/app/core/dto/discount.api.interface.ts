export interface DiscountApiInterface {
    discount_id: number;
    product_id: number;
    description: string; 
    amount: number;
}

export interface DiscountCreateApiInterface {
    discount_id: number;
    amount: number;
    productId: number;
    description: string;
}

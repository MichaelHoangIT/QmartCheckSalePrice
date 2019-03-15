export interface SalePrice {
    storeNo: string;
    itemNo: string;
    itemName?: string;
    barcode: string;
    nomalPrice?: number;
    redFlagPrice?: number;
    storePrice: number;
    inspector?: string;
}

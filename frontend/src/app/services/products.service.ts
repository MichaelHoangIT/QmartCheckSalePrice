import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { SalePrice } from '../model/salePrice';
import { Observable } from 'rxjs';


const httpOptions: {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  observe?: 'body';
  params?: HttpParams | {
    [param: string]: string | string[];
  };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
} = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  observe: 'response' as 'body',
  responseType: 'json'
};

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  configUrl = 'http://localhost:1337/api/products';

  constructor(private http: HttpClient) { }

  findBarcodes(): Observable<HttpResponse<any>> {
    return this.http.get<any>(this.configUrl + '/lstbarcode', httpOptions);
  }

  findProducts(store: string, barcode: string): Observable<HttpResponse<any>> {
    const body = {
      'store': store,
      'barcode': barcode
    };
    return this.http.post<any>(this.configUrl, body, httpOptions);
  }

  checkSalePriceLogs(firstPage: number, pageSize: number): Observable<HttpResponse<any>> {
    const body = {
      'firstPage': firstPage,
      'pageSize': pageSize
    };
    return this.http.post<any>(this.configUrl + '/salePriceLog/lst', body, httpOptions);
  }

  saveSalePriceLogs(salePrice: SalePrice): Observable<HttpResponse<any>> {
    const body = {
      'storeNo': salePrice.storeNo,
      'itemNo': salePrice.itemNo,
      'itemName': salePrice.itemName,
      'barcode': salePrice.barcode,
      'nomalPrice': salePrice.nomalPrice,
      'redFlagPrice': salePrice.redFlagPrice,
      'storePrice': salePrice.storePrice,
      'postingDate': new Date(),
      'inspector': salePrice.inspector
    };
    return this.http.post<any>(this.configUrl + '/salePriceLog', body, httpOptions);
  }
}

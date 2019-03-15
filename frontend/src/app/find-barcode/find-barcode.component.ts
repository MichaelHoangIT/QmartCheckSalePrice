import { Component, ElementRef, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { SalePrice } from '../model/salePrice';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-find-barcode',
  templateUrl: './find-barcode.component.html',
  styleUrls: ['./find-barcode.component.scss'],
  providers: [MessageService]
})
export class FindBarcodeComponent implements OnInit, AfterViewInit {

  @ViewChild('chCode') chCode: ElementRef;

  texts;
  show = false;
  products: any[];
  labels: any[];
  barcodeGlobals: any[];
  barcodes: any[];
  isFilter = false;

  constructor(private productsService: ProductsService, private messageService: MessageService) { }

  ngOnInit() {
    this.productsService.findBarcodes().subscribe(res => {
      if (res && res.status === 200) {
        this.barcodeGlobals = res.body || [];
      }
    }, err => { console.error(err); });
  }

  ngAfterViewInit() {
    this.chCode.nativeElement.focus();
  }

  onEnter(chCode: string, barcode: string) {
    this.show = false;
    if (chCode && barcode) {
      this.productsService.findProducts(chCode, barcode).subscribe(res => {
        if (res && res.status === 200) {
          this.products = res.body || [];
          if (this.products) {
            this.labels = Object.keys(this.products[0]) || [];
          }

          if (this.products.length > 0) {
            this.show = true;
          }
        }
      }, err => { console.error(err); });
    }
  }

  numberOnly(e): boolean {
    const charCode = (e.which) ? e.which : e.keyCode;
    if (
      // Allow: Delete, Backspace, Tab, Escape, Enter
      [46, 8, 9, 27, 13].indexOf(charCode) !== -1 ||
      (charCode === 65 && e.ctrlKey === true) || // Allow: Ctrl+A
      (charCode === 67 && e.ctrlKey === true) || // Allow: Ctrl+C
      (charCode === 86 && e.ctrlKey === true) || // Allow: Ctrl+V
      (charCode === 88 && e.ctrlKey === true) || // Allow: Ctrl+X
      (charCode === 65 && e.metaKey === true) || // Cmd+A (Mac)
      (charCode === 67 && e.metaKey === true) || // Cmd+C (Mac)
      (charCode === 86 && e.metaKey === true) || // Cmd+V (Mac)
      (charCode === 88 && e.metaKey === true) || // Cmd+X (Mac)
      (charCode >= 35 && charCode <= 39) // Home, End, Left, Right
    ) {
      return true;  // let it happen, don't do anything
    }
    // Ensure that it is a number and stop the keypress
    if (
      (e.shiftKey || (charCode < 48 || charCode > 57)) &&
      (charCode < 96 || charCode > 105)
    ) {
      return false;
    }
    return true;
  }

  onSave(product: any, price: number = 0) {
    const salePrice: SalePrice = {
      storeNo: product['storeNo'],
      itemNo: product['itemNo'],
      itemName: product['itemName'],
      barcode: product['barcode'],
      nomalPrice: this.toFloat(product['nomalPrice']),
      redFlagPrice: this.toFloat(product['redFlagPrice']),
      storePrice: this.toFloat(price),
      inspector: '1',
    };
    this.productsService.saveSalePriceLogs(salePrice).subscribe(res => {
      if (res && res.status === 200) {
        this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Save successfully' });
      }
    }, err => { console.error(err); });
  }

  private toFloat(params): number {
    let num: number = null;
    const strNum: string = params;
    console.log(strNum);
    if (strNum) {
      num = parseFloat(strNum.replace(',', ''));
    }
    console.log(num);
    return num;
  }

  onKeyUpBarcode(value: string) {
    if (value && value.length > 0) {
      this.barcodes = [];
      this.barcodeGlobals.filter(el => {
        const barcode: string = el['barcode'];
        if (barcode.indexOf(value) >= 0) {
          this.barcodes.push(barcode);
        }
      });
      if (this.barcodes.length > 0) {
        this.isFilter = true;
      }
    } else {
      this.isFilter = false;
    }
  }

}

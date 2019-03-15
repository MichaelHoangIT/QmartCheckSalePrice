import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-his-find',
  templateUrl: './his-find.component.html',
  styleUrls: ['./his-find.component.scss']
})
export class HisFindComponent implements OnInit {
  @ViewChild('dt') private _table: Table;
  loading: boolean;
  salePriceLog: any[];
  cols: any[];

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this._table.filterConstraints['my'] = (value, filter): boolean => {
      // Make sure the value and the filter are Dates
      return value.getTime() === filter.getTime();
    }
    this.salePriceLog = [];
    this.productsService.checkSalePriceLogs(0, null).subscribe(res => {
      if (res && res.status === 200) {
        this.salePriceLog = res.body || [];
        if (this.salePriceLog) {
          this.cols = [];
          this.cols.push({ field: 'Index', header: 'Index' });
          const keyHeaders = Object.keys(this.salePriceLog[0]) || [];
          keyHeaders.forEach(el => {
            if (!el.startsWith('RowNum')) {
              this.cols.push({ field: el, header: el });
            }
          });
        }
      }
    }, err => { console.error(err); });
  }

}

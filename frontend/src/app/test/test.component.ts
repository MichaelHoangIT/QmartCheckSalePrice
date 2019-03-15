import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  country: any;

  countries: any[];

  filteredCountriesSingle: any[];

  filterCountrySingle(event) {
    const query = event.query;
    this.filteredCountriesSingle = this.filterCountry(query, this.countries);
  }

  filterCountry(query, countries: any[]): any[] {
    // in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    const filtered: any[] = [];
    for (let i = 0; i < countries.length; i++) {
      const country = countries[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filtered.push(country);
      }
    }
    return filtered;
  }

  constructor() { }

  ngOnInit() {
    this.countries = [
      { 'name': 'Afghanistan', 'code': 'AF' },
      { 'name': 'Åland Islands', 'code': 'AX' },
      { 'name': 'Albania', 'code': 'AL' },
      { 'name': 'Algeria', 'code': 'DZ' },
      { 'name': 'American Samoa', 'code': 'AS' },
      { 'name': 'Andorra', 'code': 'AD' },
      { 'name': 'Angola', 'code': 'AO' },
      { 'name': 'Anguilla', 'code': 'AI' },
      { 'name': 'Antarctica', 'code': 'AQ' },
      { 'name': 'Antigua and Barbuda', 'code': 'AG' },
      { 'name': 'Argentina', 'code': 'AR' },
      { 'name': 'Armenia', 'code': 'AM' }
    ];
  }

}

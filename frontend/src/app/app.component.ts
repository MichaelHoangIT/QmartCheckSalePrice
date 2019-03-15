import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  countries: any[];
  selectedCountry = { code: 'vi' };

  constructor(private translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('vi');
  }

  ngOnInit(): void {
    this.countries = [
      { name: 'USA', flag: 'en.png', code: 'en' },
      { name: 'Việt Nam', flag: 'vi.png', code: 'vi' }
    ];
  }

  onChangeLang() {
    console.log(this.selectedCountry);
    this.translate.use(this.selectedCountry.code || 'vi');
  }
}

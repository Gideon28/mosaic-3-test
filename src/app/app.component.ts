import { Component } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { LoadingIndicatorService } from './core/service/loading-indicator.service';

import { defaultLanguage } from './core/models/translate.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string;
  isLoading: boolean = false;

  constructor(private translateService: TranslateService,
              private loadingIndicatorService: LoadingIndicatorService) {
    loadingIndicatorService.onLoadingChanged.subscribe(isLoading => setTimeout(()=> this.isLoading = isLoading, 0));

    translateService.setDefaultLang(defaultLanguage);
    translateService.use('en');
  }
}

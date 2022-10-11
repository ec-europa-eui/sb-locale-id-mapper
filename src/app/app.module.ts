import { NgModule,LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';

import { EuiIconModule } from '@eui/components/atoms/eui-icon';
import { EuiButtonModule } from '@eui/components/eui-button';
import { EuiCardModule } from '@eui/components/eui-card';
import { EuiLabelModule } from '@eui/components/atoms/eui-label';
import { CommonModule } from '@angular/common';
import { CoreModule } from './core/core.module';
import { EuiAppModule, EuiNotificationsModule } from '@eui/components/layout';
import { CachePreventionInterceptor } from '@eui/core';
import { CorsSecurityInterceptor } from '@eui/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocaleService } from './services/locale.service';




@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    EuiButtonModule,
    EuiIconModule,
    EuiCardModule,
    EuiLabelModule,
    EuiAppModule,
    EuiNotificationsModule,
  ],
  providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CachePreventionInterceptor,
            multi: true,
        },
        
       { provide: HTTP_INTERCEPTORS,
        useClass: CorsSecurityInterceptor,
        multi: true,
    },
    
    LocaleService,
    {
      provide: LOCALE_ID,
      useFactory: (localeService: LocaleService) => {
        console.log('locale ID', localeService.getLanguage());
        return localeService.getLanguage();
      },
      deps: [LocaleService]
      
  }

    
],
  declarations: [AppComponent, HelloComponent],
  bootstrap: [AppComponent],

})

export class AppModule {}

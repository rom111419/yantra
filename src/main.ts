import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http'
import {enableProdMode, importProvidersFrom, NgZone} from '@angular/core'
import {createCustomElement} from '@angular/elements'
import {createApplication} from '@angular/platform-browser'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {provideRouter, TitleStrategy} from '@angular/router'
import {AppComponent} from './app/app.component'
import {routes} from './app/app.routes'
import {TemplatePageTitleStrategy} from './app/seo/template-page-title-strategy'
import {environment} from './environments/environment'

if (environment.production) {
  enableProdMode()
}

const appOptions = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    {provide: TitleStrategy, useClass: TemplatePageTitleStrategy}
  ]
}

void (async () => {
  const app = await createApplication(appOptions)
  const appComponent = createCustomElement(AppComponent, {injector: app.injector})
  customElements.define('app-root', appComponent)

})()

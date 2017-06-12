import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {routing, RootComponent} from './routes.component';

import {GpusModule} from './gpus';

import {MainComponent} from './main.component';
import {HeaderComponent} from './header.component';
import {TitleComponent} from './title.component';
import {FooterComponent} from './footer.component';

@NgModule({
  imports: [
    BrowserModule,
    routing,
    GpusModule,
  ],
  declarations: [
    RootComponent,
    MainComponent,
    HeaderComponent,
    TitleComponent,
    FooterComponent
  ],
  bootstrap: [MainComponent]
})
export class AppModule {}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { SlideComponent } from './slideshow/slide/slide.component';
import { PageComponent } from './page/page.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TreeNodeComponent } from './navigation/tree-node/tree-node.component';

@NgModule({
  declarations: [
    AppComponent,
    SlideshowComponent,
    SlideComponent,
    PageComponent,
    NavigationComponent,
    TreeNodeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

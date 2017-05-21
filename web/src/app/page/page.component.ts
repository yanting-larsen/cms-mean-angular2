import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { Page } from '../page';
import { PageService } from '../page.service';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
  providers: [PageService]
})
export class PageComponent implements OnInit {
  private url: String;
  private header: String;
  private contents: String[] = [];
  private displaySlideshow: Boolean = false;

  // Time until showing next slide
  private NextSlideInterval: number = 3000;
  // Loop the slide or not
  private loopSlides: boolean = true;
  // Slides
  private slides: Array<any> = [];

  constructor(
    private route: ActivatedRoute,
    private pageService: PageService
  ) {
    this.url = '/' + route.snapshot.url.join('/');
    this.initSlides();
  }

  ngOnInit() {
    this.pageService
      .getPage(this.url)
      .then((page: Page) => {
        this.header = page.header;
        this.contents = page.content.split('\n');
        this.displaySlideshow = page.slideshow;
      }).catch(() => {
        this.header = 'Page Not Found';
        this.contents = [
          'The page you are looking for could not be found.'
        ];
        this.displaySlideshow = false;
      });
  }

  private initSlides() {
    this.slides.push(
      { image: 'http://static.hasselblad.com/uploads/2014/11/Maasai-Moran2-666x1000.jpg' },
      { image: 'http://static.hasselblad.com/uploads/2014/11/Maasai-Woman4-666x1000.jpg' },
      { image: 'http://static.hasselblad.com/uploads/2014/11/B_0127-copy-749x1000.jpg' }
    );
  }
}

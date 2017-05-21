import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { Page } from '../page';
import { PageService } from '../page.service';

import { Slide } from '../slide';
import { SlideService } from '../slide.service';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
  providers: [PageService, SlideService]
})
export class PageComponent implements OnInit {
  private mediaUrl: String = 'http://localhost:8080/media/uploads';
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
    private pageService: PageService,
    private slideService: SlideService) {
    this.url = '/' + route.snapshot.url.join('/');
  }

  ngOnInit() {
    if (this.url === '/') {
      this.getStartPage();
    } else {
      this.getPage(this.url);
    }

    this.initSlides();
  }

  private initSlides() {
    this.slideService
      .getSlides()
      .then((slides: Slide[]) => {
        slides.forEach((slide) => {
          this.slides.push(
            {
              image: this.mediaUrl + "/" + slide.fileName
            }
          );
        })
      });
  }

  private getPage(url: String) {
    this.pageService
      .getPage(url)
      .then((page: Page) => {
        if (!page) {
          this.pageNotFound();
          return;
        }

        this.header = page.header;
        this.contents = page.content.split('\n');
        this.displaySlideshow = page.start;
      });
  }

  private getStartPage() {
    this.pageService
      .getStartPage()
      .then((page: Page) => {
        if (!page) {
          this.pageNotFound();
          return;
        }

        this.header = page.header;
        this.contents = page.content.split('\n');
        this.displaySlideshow = page.start;
      });
  }

  private pageNotFound() {
    this.header = 'Page Not Found';
    this.contents = [
      'The page you are looking for could not be found.'
    ];
    this.displaySlideshow = false;
  }
}

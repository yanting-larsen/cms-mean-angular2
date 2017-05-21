import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Settings } from './settings';
import { SettingsService } from './settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SettingsService]
})
export class AppComponent implements OnInit {
  private footerItems: String[];
  private companyName: String;

  // Time until showing next slide
  private NextSlideInterval: number = 3000;
  // Loop the slide or not
  private loopSlides: boolean = true;
  // Slides
  private slides: Array<any> = [];

  constructor(
    private settingsService: SettingsService) {
    this.initSlides();
  }

  private initSlides() {
    this.slides.push(
      { image: 'http://static.hasselblad.com/uploads/2014/11/Maasai-Moran2-666x1000.jpg' },
      { image: 'http://static.hasselblad.com/uploads/2014/11/Maasai-Woman4-666x1000.jpg' },
      { image: 'http://static.hasselblad.com/uploads/2014/11/B_0127-copy-749x1000.jpg' }
    );
  }

  ngOnInit() {
    this.settingsService
      .getSettings()
      .then((settings: Settings) => {
        this.companyName = settings.companyName;
        this.footerItems = settings.footer.split("\n");
      });
  }
}

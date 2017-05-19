import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Time until showing next slide
  private NextSlideInterval: number = 3000;
  // Loop the slide or not
  private loopSlides: boolean = true;
  // Slides
  private slides: Array<any> = [];

  constructor() {
    this.initSlides();
  }

  private initSlides() {
    this.slides.push(
      { image: 'http://static.hasselblad.com/uploads/2014/11/Maasai-Moran2-666x1000.jpg' },
      { image: 'http://static.hasselblad.com/uploads/2014/11/Maasai-Woman4-666x1000.jpg' },
      { image: 'http://static.hasselblad.com/uploads/2014/11/B_0127-copy-749x1000.jpg' }
    );
  }
}

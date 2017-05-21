import { Component, OnInit } from '@angular/core';
import { Slide } from '../slide';
import { SlideService } from '../slide.service';
import { SlideNewComponent } from '../slide-new/slide-new.component';

@Component({
  selector: 'app-slide-list',
  templateUrl: './slide-list.component.html',
  styleUrls: ['./slide-list.component.css'],
  providers: [SlideService]
})
export class SlideListComponent implements OnInit {
  mediaUrl: String = 'http://localhost:8080/media/uploads';

  slides: Slide[];
  selectedSlide: Slide;

  constructor(private slideService: SlideService) { }

  ngOnInit() {
    this.slideService
      .getSlides()
      .then((slides: Slide[]) => {
        this.slides = slides;
      });
  }

  private getIndexofSlide = (slideId: String) => {
    return this.slides.findIndex((slide) => {
      return slide._id === slideId;
    });
  }

  selectSlide(slide: Slide) {
    this.selectedSlide = slide;
  }

  createNewSlide() {
    const slide: Slide = {
      image: '',
      fileName: '',
      position: 0
    };

    this.selectSlide(slide);
  }

  deleteSlide = (slideId: String) => {
    const idx = this.getIndexofSlide(slideId);
    if (idx !== -1) {
      this.slides.splice(idx, 1);
      this.selectSlide(null);
    }
    return this.slides;
  }

  addSlide = (slide: Slide) => {
    this.slides.push(slide);
    this.selectSlide(slide);
    return this.slides;
  }

  updateSlide = (slide: Slide) => {
    const idx = this.getIndexofSlide(slide._id);
    if (idx !== -1) {
      this.slides[idx] = slide;
      this.selectSlide(slide);
    }
    return this.slides;
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { Slide } from '../slide';
import { SlideService } from '../slide.service';

@Component({
  selector: 'app-slide-new',
  templateUrl: './slide-new.component.html',
  styleUrls: ['./slide-new.component.css']
})
export class SlideNewComponent implements OnInit {
  slides: Slide[];
  @Input()
  slide: Slide;

  imageData: string;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor (private slideService: SlideService) {}

  createSlide(slide: Slide) {
    slide.image = this.imageData;

    this.slideService.createSlide(slide).then((newSlide: Slide) => {
      this.createHandler(newSlide);
    });
  }

  updateSlide(slide: Slide): void {
    this.slideService.updateSlide(slide).then((updatedSlide: Slide) => {
      this.updateHandler(updatedSlide);
    });
  }

  deleteSlide(slideId: String): void {
    this.slideService.deleteSlide(slideId).then((deletedSlideId: String) => {
      this.deleteHandler(deletedSlideId);
    });
  }

  ngOnInit() {
    this.slideService
        .getSlides()
        .then((slides: Slide[]) => {
          this.slides = slides;
        });
  }

  handleImageFile($event) {
    this.readImageFile($event.target);
  }

  readImageFile(inputValue: any) {
    const file: File = inputValue.files[0];
    const reader: FileReader = new FileReader();

    reader.onloadend = (e) => {
      this.imageData = btoa(reader.result)
    }

    reader.readAsBinaryString(file);
  }
}

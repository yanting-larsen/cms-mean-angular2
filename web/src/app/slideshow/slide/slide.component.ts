import { Component, OnInit, OnDestroy, Input, HostBinding } from '@angular/core';
import { SlideshowComponent, Direction } from '../slideshow.component';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit, OnDestroy {
  @Input()
  index: number;
  @Input()
  direction: Direction;

  @HostBinding('class.active')
  @Input()
  active: boolean;

  @HostBinding('class.item')
  @HostBinding('class.slideshow-item')
  private addClass: boolean = true;

  constructor(private slideshow: SlideshowComponent) {}

  ngOnInit() {
    this.slideshow.addSlide(this);
  }

  ngOnDestroy() {
    this.slideshow.removeSlide(this);
  }

}

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideNewComponent } from './slide-new.component';

describe('SlideNewComponent', () => {
  let component: SlideNewComponent;
  let fixture: ComponentFixture<SlideNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

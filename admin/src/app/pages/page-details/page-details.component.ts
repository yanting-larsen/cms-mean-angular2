import { Component, Input, OnInit } from '@angular/core';
import { Page } from '../page';
import { PageService } from '../page.service';

@Component({
  selector: 'app-page-details',
  templateUrl: './page-details.component.html',
  styleUrls: ['./page-details.component.css']
})
export class PageDetailsComponent implements OnInit {
  pages: Page[];

  @Input()
  page: Page;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor (private pageService: PageService) {}

  createPage(page: Page) {
    this.pageService.createPage(page).then((newPage: Page) => {
      this.createHandler(newPage);
    });
  }

  updatePage(page: Page): void {
    this.pageService.updatePage(page).then((updatedPage: Page) => {
      this.updateHandler(updatedPage);
    });
  }

  deletePage(pageId: String): void {
    this.pageService.deletePage(pageId).then((deletedPageId: String) => {
      this.deleteHandler(deletedPageId);
    });
  }

  ngOnInit() {
    this.pageService
      .getPages()
      .then((pages: Page[]) => {
        this.pages = pages;
      });
  }
}

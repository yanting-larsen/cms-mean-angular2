import { Component, OnInit } from '@angular/core';
import { Page } from '../page';
import { PageService } from '../page.service';
import { PageDetailsComponent } from '../page-details/page-details.component';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css'],
  providers: [PageService]
})
export class PageListComponent implements OnInit {
  pages: Page[];
  selectedPage: Page;

  constructor(private pageService: PageService) { }

  ngOnInit() {
    this.pageService
      .getPages()
      .then((pages: Page[]) => {
        this.pages = pages;
      });
  }

  private getIndexOfPage = (pageId: String) => {
    return this.pages.findIndex((page) => {
      return page._id === pageId;
    });
  }

  selectPage(page: Page) {
    this.selectedPage = page;
  }

  createNewPage() {
    const page: Page = {
      name: '',
      header: '',
      content: '',
      position: 0,
      parentId: null,
      path: '',
      languages: [],
      visible: true,
      menu: true,
      slideshow: false
    };

    // By default, a newly-created page will have the selected state.
    this.selectPage(page);
  }

  deletePage = (pageId: String) => {
    const idx = this.getIndexOfPage(pageId);
    if (idx !== -1) {
      this.pages.splice(idx, 1);
      this.selectPage(null);
    }
    return this.pages;
  }

  addPage = (page: Page) => {
    this.pages.push(page);
    this.selectPage(page);
    return this.pages;
  }

  updatePage = (page: Page) => {
    const idx = this.getIndexOfPage(page._id);
    if (idx !== -1) {
      this.pages[idx] = page;
      this.selectPage(page);
    }
    return this.pages;
  }

}

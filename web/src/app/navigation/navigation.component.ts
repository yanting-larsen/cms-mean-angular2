import { Component, OnInit } from '@angular/core';
import { Page } from '../page';
import { PageService } from '../page.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  providers: [PageService]
})
export class NavigationComponent implements OnInit {
  pageMap: Map<String, Page[]> = new Map<string, Page[]>();

  constructor(private pageService: PageService) { }

  ngOnInit() {
    this.pageService
      .getNavigation()
      .then((pages: Page[]) => {
        for (let page of pages) {
          const key = page.parentId;

          if (!this.pageMap.get(key)) {
            this.pageMap.set(key, []);
          }

          this.pageMap.get(key).push(page);
        }
      });
  }

  getMenu(pageId?: String): Page[] {
    if (!pageId) pageId = null;
    return this.pageMap.get(pageId);
  }
}

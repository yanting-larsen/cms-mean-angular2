import { Component, OnInit } from '@angular/core';
import { Page } from '../page';
import { NavigationService } from './navigation.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  providers: [NavigationService]
})
export class NavigationComponent implements OnInit {
  pageMap: Map<String, Page[]> = new Map<string, Page[]>();

  constructor(private navService: NavigationService) { }

  ngOnInit() {
    this.navService
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

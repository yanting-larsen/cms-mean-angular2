import { Component, Input } from '@angular/core';
import { Page } from '../../page';

@Component({
  selector: 'app-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.css']
})
export class TreeNodeComponent {
  @Input()
  page: Page;

  @Input()
  pageMap: Map<String, Page[]>;

  @Input()
  getMenu: Function;

  @Input()
  selectedPage: Page;

  @Input()
  selectPageHandler: Function;

  constructor() { }
}

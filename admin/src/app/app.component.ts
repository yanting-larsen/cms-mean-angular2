import { Component, OnInit, ChangeDetectorRef, ApplicationRef, trigger, state, style, transition, animate } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public isMenuExpanded: boolean = false;

  constructor(
    private changeRef: ChangeDetectorRef,
    private appRef: ApplicationRef,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  toggleMenu() {
    this.isMenuExpanded = !this.isMenuExpanded;
  }

  ngOnInit() {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe(event => {
        let currentRoute = this.route.root;
        while (currentRoute.children[0] !== undefined) {
          currentRoute = currentRoute.children[0];
        }
      })
  }
}

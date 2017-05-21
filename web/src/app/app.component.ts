import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Settings } from './settings';
import { SettingsService } from './settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SettingsService]
})
export class AppComponent implements OnInit {
  private footerItems: String[];
  private companyName: String;

  constructor(
    private settingsService: SettingsService) { }

  ngOnInit() {
    this.settingsService
      .getSettings()
      .then((settings: Settings) => {
        this.companyName = settings.companyName;
        this.footerItems = settings.footer.split("\n");
      });
  }
}

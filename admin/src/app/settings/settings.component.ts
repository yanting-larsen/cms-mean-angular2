import { Component, Input, OnInit } from '@angular/core';
import { Settings } from './settings';
import { SettingsService } from './settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  providers: [SettingsService]
})

export class SettingsComponent implements OnInit {

  @Input()
  settings: Settings;

  constructor (private settingsService: SettingsService) {}

  updateSettings(settings: Settings): void {
    this.settingsService.updateSettings(settings).then((updateSettings: Settings) => {
      return this.settings;
    });
  }

  ngOnInit() {
    this.settingsService
      .getSettings()
      .then((settings: Settings) => {
        this.settings = settings;
      });
  }

}

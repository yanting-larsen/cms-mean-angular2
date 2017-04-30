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

  @Input()
  updateHandler: Function;

  constructor (private settingsService: SettingsService) {}

  updateSetings(settings: Settings): void {
    this.settingsService.updateSetings(settings).then((updateSetings: Settings) => {
      this.updateHandler(updateSetings);
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

// settings.component.ts
import { Component, OnInit } from '@angular/core';
import { SettingsService,UserSettings } from 'src/app/auth/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  settings: UserSettings;

  constructor(private settingsService: SettingsService) {
    this.settings = {
      notifications: false,
      darkMode: false,
      autoBooking: false,
    };
  }

  ngOnInit(): void {
    this.fetchSettings();
  }

  fetchSettings(): void {
    this.settingsService.getSettings().subscribe((settings) => {
      this.settings = settings;
    });
  }

  updateSettings(): void {
    this.settingsService.updateSettings(this.settings);
    alert('Settings updated successfully!');
  }
}

// settings.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface UserSettings {
  notifications: boolean;
  darkMode: boolean;
  autoBooking: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private settingsSubject = new BehaviorSubject<UserSettings>({
    notifications: true,
    darkMode: false,
    autoBooking: true,
  });

  constructor() {}

  getSettings(): Observable<UserSettings> {
    return this.settingsSubject.asObservable();
  }

  updateSettings(newSettings: UserSettings): void {
    this.settingsSubject.next(newSettings);
  }
}

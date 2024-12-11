import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  // Observable to track loader visibility state
  private loaderSubject = new Subject<boolean>();

  // Public observable that components can subscribe to
  loaderState = this.loaderSubject.asObservable();

  // Method to show the loader
  show() {
    this.loaderSubject.next(true);
  }

  // Method to hide the loader
  hide() {
    this.loaderSubject.next(false);
  }
}

import { Component } from '@angular/core';
import { LoaderService } from 'src/app/auth/loader-service.service'; 

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {

  // This property will be used to control the loader's visibility
  isLoading: boolean = false;

  constructor(private loaderService: LoaderService) {
    // Subscribe to the loader state from the LoaderService
    this.loaderService.loaderState.subscribe((state: boolean) => {
      this.isLoading = state;
    });
  }
}

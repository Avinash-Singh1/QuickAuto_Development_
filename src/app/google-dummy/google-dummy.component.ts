import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-google-dummy',
  templateUrl: './google-dummy.component.html',
  styleUrls: ['./google-dummy.component.css']
})
export class GoogleDummyComponent implements OnInit {
  center: google.maps.LatLngLiteral = { lat: -34.397, lng: 150.644 };
  zoom = 8;

  constructor() {}

  ngOnInit(): void {
    this.loadGoogleMaps();
  }

  loadGoogleMaps() {
    const script = document.createElement('script');
    script.src = `https://maps.gomaps.pro/maps/api/js?key=${environment.googleMapsApiKey}`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      this.initializeMap();  // Call method to initialize the map once the script is loaded
    };

    document.body.appendChild(script);
  }

  initializeMap() {
    const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: this.center,
      zoom: this.zoom,
    });
  }
  
}

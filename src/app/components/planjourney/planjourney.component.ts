import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleMapsService } from 'src/app/google-maps.service';
import { ScriptLoaderService } from 'src/app/services/script-loader.service';
import { environment } from 'src/environments/environment.local';

@Component({
  selector: 'app-planjourney',
  templateUrl: './planjourney.component.html',
  styleUrls: ['./planjourney.component.css']
})
export class PlanjourneyComponent implements OnInit {

  source: string = '';
  destination: string = '';
  directions: any;
  markers: { position: { lat: number; lng: number }, label: string }[] = [];
  polyline: any;
  distance: number | null = null;
  fare: number | null = null;
  sourceSuggestions: any[] = [];
  destinationSuggestions: any[] = [];
  options: google.maps.MapOptions = { zoom: 14, center: { lat: 28.6139, lng: 77.2090 } };

  apiLoaded = false;
  isLoading = true; // Flag to control loader visibility

  constructor(
    private googleMapsService: GoogleMapsService,
    private scriptLoader: ScriptLoaderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Dynamically load Google Maps API
    const apiUrl = `https://maps.gomaps.pro/maps/api/js?key=${environment.googleApiKey}&libraries=places`;

    this.scriptLoader.loadScript(apiUrl).then(() => {
      this.apiLoaded = true;
      this.isLoading = false; // Hide the loader when the API is loaded
      console.log('Google Maps API loaded');
    }).catch((error) => {
      console.error('Error loading Google Maps API:', error);
      this.isLoading = false; // Hide the loader if there's an error loading the API
    });
  }

  // Other methods (getDirections, onSourceInput, onDestinationInput, etc.)

  // Method to handle input for source
  onSourceInput() {
    this.fetchAutocompleteSuggestions(this.source, 'source');
  }

  // Method to handle input for destination
  onDestinationInput() {
    this.fetchAutocompleteSuggestions(this.destination, 'destination');
  }

  // Fetch autocomplete suggestions from Google Maps API
  private fetchAutocompleteSuggestions(query: string, type: string) {
    if (query.length < 3) {
      this.clearSuggestions(type);
      return;
    }

    this.googleMapsService.getAutocompleteSuggestions(query).subscribe(
      (data) => {
        if (type === 'source') {
          this.sourceSuggestions = data.predictions;
        } else {
          this.destinationSuggestions = data.predictions;
        }
      },
      (error) => {
        console.error('Error fetching autocomplete suggestions:', error);
      }
    );
  }

  // Clear suggestions
  private clearSuggestions(type: string) {
    if (type === 'source') {
      this.sourceSuggestions = [];
    } else {
      this.destinationSuggestions = [];
    }
  }

  // Select source suggestion
  selectSource(suggestion: any) {
    this.source = suggestion.description;
    this.clearSuggestions('source');
  }

  // Select destination suggestion
  selectDestination(suggestion: any) {
    this.destination = suggestion.description;
    this.clearSuggestions('destination');
  }

  // Get directions using Google Maps API
  getDirections() {
    if (this.source && this.destination) {
      this.googleMapsService.getDirections(this.source, this.destination).subscribe(
        (data) => {
          this.directions = data;
          this.setMarkers();
          this.setPolyline();
          this.calculateDistanceAndFare(); // Calculate distance and fare
        },
        (error) => {
          console.error('Error fetching directions', error);
        }
      );
    } else {
      alert('Please enter both source and destination');
    }
  }

  // Set markers for source and destination on the map
  setMarkers() {
    if (this.directions.routes.length > 0) {
      const route = this.directions.routes[0].legs[0];
      const startLocation = route.start_location;
      const endLocation = route.end_location;

      this.markers = [
        { position: { lat: startLocation.lat, lng: startLocation.lng }, label: 'Source' },
        { position: { lat: endLocation.lat, lng: endLocation.lng }, label: 'Destination' }
      ];

      this.options = { ...this.options, center: { lat: startLocation.lat, lng: startLocation.lng } };
    }
  }

  // Set polyline for the route on the map
  setPolyline() {
    if (this.directions.routes.length > 0) {
      const encodedPath = this.directions.routes[0].overview_polyline.points;
      const path = google.maps.geometry.encoding.decodePath(encodedPath);

      this.polyline = {
        path: path,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
      };
    }
  }

  // Calculate distance and fare
  private calculateDistanceAndFare() {
    if (this.directions.routes.length > 0) {
      const route = this.directions.routes[0].legs[0];
      this.distance = route.distance.value / 1000; // Convert meters to kilometers
      this.fare = this.distance * 10; // Fare calculation based on distance
    }
  }

  // Navigate to the booking page with selected source, destination, fare, and distance
  FillAllDetails() {
    this.router.navigate(['/booking2'], {
      queryParams: { source: this.source, destination: this.destination, fare: this.fare, distance: this.distance }
    });
  }
}

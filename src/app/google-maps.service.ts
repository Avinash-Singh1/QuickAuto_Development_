// google-maps.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {

  private apiUrl = '/api/directions';
  private autocompleteUrl = '/api/autocomplete'; // Backend endpoint for autocomplete

  constructor(private http: HttpClient) { }

  private getToken(): string | null {
    return localStorage.getItem('token');  // Adjust according to where you store the token
  }

    // Add the Authorization header to the request
  private getAuthHeaders(): HttpHeaders {
      const token = this.getToken();
      if (token) {
        return new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
      } else {
        return new HttpHeaders();
      }
    }

  getDirections(source: string, destination: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}?source=${source}&destination=${destination}`,{headers});
  }

 
  getAutocompleteSuggestions(query: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.autocompleteUrl}?input=${encodeURIComponent(query)}`,{headers});
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScriptLoaderService {

  private loadedScripts: { [url: string]: boolean } = {};

  loadScript(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      // Check if the script is already loaded
      if (this.loadedScripts[url]) {
        resolve();
        return;
      }

      // Create a script element
      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        this.loadedScripts[url] = true;
        resolve();
      };

      script.onerror = (err) => {
        reject(err);
      };

      // Append the script to the document head
      document.head.appendChild(script);
    });
  }
}

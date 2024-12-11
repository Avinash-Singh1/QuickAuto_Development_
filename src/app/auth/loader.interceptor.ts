import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { LoaderService } from './loader-service.service'; 

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private loaderService: LoaderService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Exclude specific API request (e.g., /api/autocomplete)
    const skipLoaderUrls = ['/api/autocomplete'];

    // Check if the request URL matches any of the URLs we want to skip
    const shouldSkipLoader = skipLoaderUrls.some(url => request.url.includes(url));

    // If the request is not in the skip list, show the loader
    if (!shouldSkipLoader) {
      this.loaderService.show();
    }

    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // Hide the loader on success only if it's not an excluded request
            if (!shouldSkipLoader) {
              this.loaderService.hide();
            }
          }
        },
        (error: HttpErrorResponse) => {
          // Hide the loader on error only if it's not an excluded request
          if (!shouldSkipLoader) {
            this.loaderService.hide();
          }
        }
      ),
      // Ensure the loader is hidden even if the observable completes or errors out
      finalize(() => {
        if (!shouldSkipLoader) {
          this.loaderService.hide();
        }
      })
    );
  }
}

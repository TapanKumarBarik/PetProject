import { provideRouter } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { importProvidersFrom } from '@angular/core'; // Import this
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(HttpClientModule), // Use importProvidersFrom here to import HttpClientModule
  ],
}).catch((err) => console.error(err));

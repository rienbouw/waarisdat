import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// import "../node-modules/ionic/angular/css/core.css";

// /* Basic CSS for apps built with Ionic */
// import "../node-modules/ionic/angular/css/normalize.css";
// import "../node-modules/ionic/angular/css/structure.css";
// import "../node-modules/ionic/angular/css/typography.css";
// import '../node-modules/ionic/angular/css/display.css';

// /* Optional CSS utils that can be commented out */
// import "../node-modules/ionic/angular/css/padding.css";
// import "../node-modules/ionic/angular/css/float-elements.css";
// import "../node-modules/ionic/angular/css/text-alignment.css";
// import "../node-modules/ionic/angular/css/text-transformation.css";
// import "../node-modules/ionic/angular/css/flex-utils.css";


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

import { bootstrapApplication } from '@angular/platform-browser';
import {
	RouteReuseStrategy,
	provideRouter,
	withComponentInputBinding,
	withPreloading,
	PreloadAllModules
} from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';
import { provideTanStackQuery, QueryClient } from '@tanstack/angular-query-experimental';

bootstrapApplication(AppComponent, {
	providers: [
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
		provideIonicAngular(),
		provideLottieOptions({ player: () => player }),
		provideTanStackQuery(new QueryClient()),
		provideRouter(routes, withPreloading(PreloadAllModules), withComponentInputBinding())
	]
});

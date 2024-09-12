import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

export class LoggingPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: Function): Observable<any> {
    if (route.data && route.data['preload']) {
      console.log(`Предварительная загрузка компонента: ${route.path}`);
      return load();
    } else {
      return of(null);
    }
  }
}

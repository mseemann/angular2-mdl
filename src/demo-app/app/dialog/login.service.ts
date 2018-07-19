import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class LoginService {

  public login(username, password): Observable<any> {
    console.log(`login for ${username}/${password}`);
    return of({username: username}).pipe(delay(2000));
  }
}

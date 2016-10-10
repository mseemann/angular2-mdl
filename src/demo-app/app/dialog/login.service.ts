import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/delay';

@Injectable()
export class LoginService {

  public login(username, password): Observable<void> {
    console.log(`login for ${username}/${password}`);
    return Observable.of(null).delay(2000);
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/delay';

@Injectable()
export class LoginService {

  public login(username, password): Observable<string> {
    console.log(`login for ${username}/${password}`);
    return Observable.of('Yeah!').delay(2000);
  }
}

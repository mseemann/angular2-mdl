import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/delay';

@Injectable()
export class LoginService {

  public login(username, password): Observable<any> {
    console.log(`login for ${username}/${password}`);
    return Observable.of({username: username}).delay(2000);
  }
}

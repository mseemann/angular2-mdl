import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";

@Injectable()
export class LoginService {
  public login(
    username: string,
    password: string
  ): Observable<{ username: string }> {
    console.log(`login for ${username}/${password}`);
    return of({ username }).pipe(delay(2000));
  }
}

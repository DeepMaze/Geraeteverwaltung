import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnInit {

  public loggedInObservable: Subject<boolean> = new Subject<boolean>();
  public loggedIn: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.checkLoggedIn().subscribe((result) => { this.loggedIn = result; });
  }

  checkLoggedIn(): Observable<boolean> {
    return new Observable((observer) => {
      if (localStorage.getItem("token")) {
        observer.next(true);
      } else {
        observer.next(false);
      }
    })
  }

  checkToken() {
    return true;
  }
}
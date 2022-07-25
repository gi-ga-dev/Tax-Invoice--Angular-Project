import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IAuthData } from './interfaces/iauth-data';
import { ISignupData } from './interfaces/isignup-data';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IClientsData } from '../client-list/interfaces/iclients-data';
import { ITaxesData } from '../tax-invoice-list/interfaces/itaxes-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authSubject = new BehaviorSubject<IAuthData | null>(null);
  private urlJsonServer = 'http://localhost:4201';
  helper = new JwtHelperService();
  error = undefined;

  constructor(private http: HttpClient, private router: Router) {
    this.restoreUserLogin();
  }

  /* ============ Login/Register ============ */

  restoreUserLogin() {
    const json = localStorage.getItem('isAuthenticated');
    if (json) {
      const user = JSON.parse(json);
      if (this.helper.isTokenExpired(user.accessToken)) {
        localStorage.removeItem('isAuthenticated');
        return
      } else {
        this.authSubject.next(user);
      }
    }
  }

  login(obj: ISignupData) {
    return this.http.post<IAuthData>(this.urlJsonServer + '/login', obj).pipe(
      tap(data => {
        this.authSubject.next(data);
        localStorage.setItem('isAuthenticated', JSON.stringify(data));
      })
    )
  }

  signup(obj: ISignupData) {
    return this.http.post(this.urlJsonServer + '/register', obj);
  }

  logout() {
    this.authSubject.next(null);
    localStorage.removeItem('isAuthenticated');
    this.router.navigate(['/login']);
  }

  /* ============ Post/Delete ============ */

  /* rimuove tutte le fatture relative a quel cliente */
  removeTaxes(element: ITaxesData) {
    let idEleToDelete = element.id;
    return this.http.delete('http://localhost:4201/taxes/' + idEleToDelete) // taxes.cliente.id
  }

  /* rimuove la singola fattura al click */
  removeInvoiceS(id: number): Observable<Object> {
    return this.http.delete('http://localhost:4201/taxes/' + id) // taxes.id
  }

  removeAllInvoices(id: number) {
    return this.http.get('http://localhost:4201/taxes').subscribe(resp => {
      let parseRes: ITaxesData[] = <ITaxesData[]><unknown>resp;
      parseRes.forEach(element => {
        console.log(element)
        // se idCliente (taxes) = parametro id cliente (del table)
        if (element.idCliente === id) {
          this.removeTaxes(element).subscribe()
        }
      });
    })
  }

  /* rimuove tutte le fatture di un singolo cliente */
  removeInvoice(ele: ITaxesData) {
    let idInvoice = ele.id;
    return this.http.delete('http://localhost:4201/taxes/' + idInvoice) // taxes.id
  }

  /* rimuove il singolo cliente al click */
  removeClientS(id: number): Observable<Object> {
    return this.http.delete('http://localhost:4201/clients/' + id); //clients.id
  }

  /* aggiunge valori di ritorno del form, al db */
  addClient(obj: IClientsData) {
    return this.http.post(this.urlJsonServer + '/clients', obj); //clients
  }

  addInvoice(obj: ITaxesData) {
    return this.http.post(this.urlJsonServer + '/taxes', obj); //clients
  }

  get_taxes_by_id() {
    return this.http.get(this.urlJsonServer + '/taxes');
  }

  getClientId(id: number) {
    return this.http.get(this.urlJsonServer + '/clients' + id);
  }

  /* ======= Reload della rotta (non del browser) ======= */

  reloadRoute() {
    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]);
    });
  }

  /* ======= Pulizia sessionStorage ======= */

  deleteStorage(): void {
    sessionStorage.removeItem('storedClient');
  }

  deleteInvoices(): void {
    sessionStorage.removeItem('storedInvoice');
  }

  deleteAllData(): void {
    sessionStorage.removeItem('storedClient');
    sessionStorage.removeItem('storedInvoice');
  }

}

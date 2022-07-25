import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { IClientsData } from 'src/app/pages_and_components/client-list/interfaces/iclients-data';
import { HttpClient } from '@angular/common/http';
import { ITaxesData } from '../../interfaces/itaxes-data';

@Component({
  selector: 'app-invoices-mat-form',
  templateUrl: './invoices-mat-form.component.html',
  styleUrls: ['./invoices-mat-form.component.scss']
})
export class InvoicesMatFormComponent implements OnInit {

  invoicesForm = new FormGroup({
    id: new FormControl(),
    idCliente: new FormControl(),
    descrizione: new FormControl(''),
    natura: new FormControl(''),
    quantita: new FormControl(),
    data: new FormControl(),
    scadenza: new FormControl(),
    importo: new FormControl()
  });

  @ViewChild('fClient') formCliente!: NgForm;
  @ViewChild('fInvoices') formInvoices!: NgForm;
  hide = true;
  error = undefined;
  panelOpenState = false;
  storedClient!: any;
  parsedClient!: IClientsData;
  idCliente!: number;

  storedInvoice!: any;
  parsedInvoice!: ITaxesData;
  idInvoice!: number;

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {
    this.clearFields();
    // 1) click tag a Fatture (clients Table) --> salva dati in sessionStorage e cambia rotta
    // 2) ngOnInit recupero dati cliente da sessionStorage e salvo nei campi di input
    // 3) Riprendo i dati delle fatture dal sessionStorage
    this.storedClient = sessionStorage.getItem('storedClient');
    this.parsedClient = JSON.parse(this.storedClient);
    this.idCliente = this.parsedClient.id!.valueOf();
    this.invoicesForm.get('idCliente')?.setValue(this.parsedClient.id!);

    /* Al click di mod button (table), inserisci negli input i dati presi dal sessionStorage */
    if (sessionStorage.key(1)) {
      this.storedInvoice = sessionStorage.getItem('storedInvoice');
      this.parsedInvoice = JSON.parse(this.storedInvoice);
      this.idInvoice = this.parsedInvoice.id!.valueOf();

      this.invoicesForm.get('id')?.setValue(this.parsedInvoice.id!);
      this.invoicesForm.get('idCliente')?.setValue(this.parsedInvoice?.idCliente!);
      this.invoicesForm.get('descrizione')?.setValue(this.parsedInvoice?.descrizione!);
      this.invoicesForm.get('natura')?.setValue(this.parsedInvoice?.natura!);
      this.invoicesForm.get('quantita')?.setValue(this.parsedInvoice?.quantita!);
      this.invoicesForm.get('data')?.setValue(this.parsedInvoice?.data!);
      this.invoicesForm.get('scadenza')?.setValue(this.parsedInvoice?.scadenza!);
      this.invoicesForm.get('importo')?.setValue(this.parsedInvoice?.importo!);
    }
  }

  onSubmit() {
    // con l'id del cliente selezionato e il valore del form, inserisco dati nel db relativo allo spec. cliente
    this.idCliente = this.parsedClient.id!.valueOf();
    this.postInvoice(this.formInvoices.value).subscribe();
    this.authService.reloadRoute();
  }

  postInvoice(obj: ITaxesData) {
    this.idCliente = this.parsedClient.id!.valueOf();
    return this.http.post('http://localhost:4201/taxes/', obj);
  }

  modInvoice(id: number) {
    this.authService.removeInvoiceS(id).subscribe();
    setTimeout(() => { this.modInvoiceAfter(); }, 100);
  }

  modInvoiceAfter(): void {
    // per correggere un bug che non permetteva chiamata delete e post una dopo l'altra
    this.authService.addInvoice(this.formInvoices.value).subscribe();
    this.clearFields();
    sessionStorage.removeItem('storedInvoice');
    this.authService.reloadRoute();
  }

  clearFields() {
    this.invoicesForm.reset({
      "idCliente": this.idCliente,
      "descrizione": '',
      "natura": '',
      "quantita": '',
      "data": '',
      "scadenza": '',
      "importo": ''
    });
  }

}


import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { IClientsData } from '../../interfaces/iclients-data';

@Component({
  selector: 'app-clients-mat-form',
  templateUrl: './clients-mat-form.component.html',
  styleUrls: ['./clients-mat-form.component.scss']
})
export class ClientsMatFormComponent implements OnInit, AfterContentInit {

  /* Raggruppamento dei dati nel db per essere letti dopo il cast */
  clientForm = new FormGroup({
    id: new FormControl(),
    nomeCliente: new FormControl(''),
    cognomeCliente: new FormControl(''),
    ragioneSociale: new FormControl(''),
    partitaIva: new FormControl(),
    tipoCliente: new FormControl(''),
    telefono: new FormControl(),
    email: new FormControl(''),
    pec: new FormControl(''),

    indirizzoSedeOperativa: new FormGroup({
      via: new FormControl(''),
      civico: new FormControl(),
      cap: new FormControl(),
      localita: new FormGroup({
        comune: new FormControl(''),
        provincia: new FormControl(''),
      })
    }),

    indirizzoSedeLegale: new FormGroup({
      via: new FormControl(''),
      civico: new FormControl(),
      cap: new FormControl(),
      localita: new FormGroup({
        comune: new FormControl(''),
        provincia: new FormControl(''),
      })
    })
  });

  @ViewChild('f') form!: NgForm;
  hide = true;
  error = undefined;
  panelOpenState = false;
  clients: IClientsData[] = [];
  storedClient!: any;
  parsedClient!: IClientsData;
  idCliente!: number;

  constructor(private authService: AuthService) { }

  ngAfterContentInit() {
    // se ho cliccato sul btn modCliente(table), quindi se ho salvato i dati nel sessionStorage
    this.clearFields();
    //if (sessionStorage.length >= 1) {
    if (sessionStorage.key(0)) {
      this.storedClient = sessionStorage.getItem('storedClient');
      this.parsedClient = JSON.parse(this.storedClient);
      this.idCliente = this.parsedClient.id!.valueOf();

      this.clientForm.get('id')?.setValue(this.parsedClient.id!);
      this.clientForm.get('nomeCliente')?.setValue(this.parsedClient.nomeCliente!);
      this.clientForm.get('cognomeCliente')?.setValue(this.parsedClient.cognomeCliente!);
      this.clientForm.get('ragioneSociale')?.setValue(this.parsedClient.ragioneSociale!);
      this.clientForm.get('partitaIva')?.setValue(this.parsedClient.partitaIva!);
      this.clientForm.get('tipoCliente')?.setValue(this.parsedClient.tipoCliente!);
      this.clientForm.get('telefono')?.setValue(this.parsedClient.telefono!);
      this.clientForm.get('email')?.setValue(this.parsedClient.email!);
      this.clientForm.get('pec')?.setValue(this.parsedClient.pec!);

      this.clientForm.get('indirizzoSedeOperativa.via')?.setValue(this.parsedClient.indirizzoSedeOperativa!.via!);
      this.clientForm.get('indirizzoSedeOperativa.civico')?.setValue(this.parsedClient.indirizzoSedeOperativa?.civico!);
      this.clientForm.get('indirizzoSedeOperativa.cap')?.setValue(this.parsedClient.indirizzoSedeOperativa?.cap!);
      this.clientForm.get('indirizzoSedeOperativa.localita.comune')?.setValue(this.parsedClient.indirizzoSedeOperativa!.localita!.comune!);
      this.clientForm.get('indirizzoSedeOperativa.localita.provincia')?.setValue(this.parsedClient.indirizzoSedeOperativa!.localita!.provincia!);

      this.clientForm.get('indirizzoSedeLegale.via')?.setValue(this.parsedClient.indirizzoSedeLegale!.via!);
      this.clientForm.get('indirizzoSedeLegale.civico')?.setValue(this.parsedClient.indirizzoSedeLegale?.civico!);
      this.clientForm.get('indirizzoSedeLegale.cap')?.setValue(this.parsedClient.indirizzoSedeLegale?.cap!);
      this.clientForm.get('indirizzoSedeLegale.localita.comune')?.setValue(this.parsedClient.indirizzoSedeLegale!.localita!.comune!);
      this.clientForm.get('indirizzoSedeLegale.localita.provincia')?.setValue(this.parsedClient.indirizzoSedeLegale!.localita!.provincia!);
    }
  }

  ngOnInit(): void {

    this.clearFields();
  }

  onSubmit() {
    this.authService.add_client(this.form.value).subscribe(
      resp => {
        console.log(resp);
        this.error = undefined;
      },
      err => {
        console.log(err.error);
        this.error = err.error;
      }
    )
    this.authService.reloadRoute();
  }

  modClient(id: number) {
    // 1) modCliente (nel table) --> al click salva dati nel sessionStorage
    // 2) ngAfterContentInit --> rileva il primo cambiamento nel sessionStorage e scrive nei campi di input (form), poi reload rotta
    // 3) modCliente (nel form) --> al click rimuove cliente, ne aggiunge un altro con lo stesso id e stesse fattura (eventuali)
    // pulisce i campi e rimuove i dati dal sessionStorage, e reload della rotta.
    this.authService.removeClientS(id).subscribe();
    setTimeout(() => { this.modClientAfter(); }, 100);
  }

  modClientAfter(): void {
    // per correggere un bug che non permetteva chiamata delete e post una dopo l'altra
    this.authService.add_client(this.form.value).subscribe();
    this.clearFields();
    sessionStorage.removeItem('storedClient');
    this.authService.reloadRoute();
  }

  clearFields() {
    this.clientForm.reset();
  }

}


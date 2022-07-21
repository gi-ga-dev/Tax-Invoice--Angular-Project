import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActualClientIdService } from 'src/app/pages_and_components/actual-client-id.service';
import { AuthService } from 'src/app/pages_and_components/auth/auth.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { ITaxesData } from '../../interfaces/itaxes-data';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ThisReceiver } from '@angular/compiler';
import { IClientsData } from 'src/app/pages_and_components/client-list/interfaces/iclients-data';

@Component({
  selector: 'app-invoices-mat-table',
  templateUrl: './invoices-mat-table.component.html',
  styleUrls: ['./invoices-mat-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class InvoicesMatTableComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild('f') form!: NgForm;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['id', 'data', 'scadenza', 'importo'];
  invoices: ITaxesData[] = [];
  dataSource: MatTableDataSource<ITaxesData> = new MatTableDataSource(this.invoices);
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement!: ITaxesData | null;
  private urlJsonServer = 'http://localhost:4201';
  storedId!: any;
  storedClient!: any;
  parsedClient!: IClientsData;
  idCliente!: number;
  error = undefined;
  print: boolean = false;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private actual_client: ActualClientIdService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllInvoices();
    this.dataSource = new MatTableDataSource(this.invoices);
  }

  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.invoices);
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) { this.dataSource.paginator.firstPage(); }
  }

  getAllInvoices(): void {

    this.storedClient = sessionStorage.getItem('storedClient');
    this.parsedClient = JSON.parse(this.storedClient);
    this.idCliente = this.parsedClient.id!.valueOf();

    this.authService.authSubject.subscribe(client => {
      this.http.get<ITaxesData[]>('http://localhost:4201/taxes', {
        headers: new HttpHeaders({ "Authorization": "Bearer " + client?.accessToken })
      })
        .subscribe(
          resp => {
            // se l'id cliente proveniente dal sessionStorage e' = all'id della risposta ciclata del get
            // mi riporti solo le tasse di quel cliente
            let castResp: ITaxesData[] = <ITaxesData[]><unknown>resp;
            let prop: ITaxesData[] = [];
            castResp.forEach(element => {
              if (element?.idCliente === this.idCliente) {
                prop.push(element)
              }
            })
            this.invoices = prop;
            this.dataSource.paginator = this.paginator;
            this.dataSource = new MatTableDataSource(this.invoices)
            console.log(this.invoices, resp, castResp);

          },
          err => {
            console.log(err);
            this.error = err.error
          }
        )
    })
  }

  removeInvoice(id: number): void {
    this.authService.removeInvoiceS(id).subscribe();
    this.getAllInvoices();
  }

  saveInvoice(id: ITaxesData): void {
    this.invoices.forEach(ele => {
      if (ele === id) {
        sessionStorage.setItem('storedInvoice', JSON.stringify(ele))
      }
    })
    this.authService.reloadRoute();
  }

  printInvoice() {
    this.print = true;
    if (this.print === true) {
      let divToPrint = document.getElementById('print-invoice');
      let newWin = window.open('', 'Print-Window', 'width=1200,height=700');
      newWin!.document.open();
      newWin!.document.write('<html><head><link href="app/assets/css/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css"/><link href="app/assets/css/print.css" rel="stylesheet" type="text/css"/><style></style> </head><body onload="window.print()">' + divToPrint!.innerHTML + '</body></html>');
      newWin!.document.title = 'Riepilogo Fattura Elettronica';
      newWin!.document.close();
      this.print = false;
    }
  }

}



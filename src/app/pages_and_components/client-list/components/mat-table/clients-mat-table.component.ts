import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/pages_and_components/auth/auth.service';
import { IClientsData } from '../../interfaces/iclients-data';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-clients-mat-table',
  templateUrl: './clients-mat-table.component.html',
  styleUrls: ['./clients-mat-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ClientsMatTableComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild('f') form!: NgForm;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['id', 'nomeCliente', 'cognomeCliente', 'partitaIva', 'email'];
  clients: IClientsData[] = [];
  dataSource: MatTableDataSource<IClientsData> = new MatTableDataSource(this.clients);
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement!: IClientsData | null;
  error = undefined;
  client_id!: number;
  storedId!: any;

  constructor(private authService: AuthService, private http: HttpClient) { }

  ngOnInit(): void { this.getAllClients(); }

  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.clients);
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

  /* get dei clienti, crea table e success lo popola con i dati */
  getAllClients() {
    this.authService.authSubject.subscribe(client => {
      this.http.get<IClientsData[]>('http://localhost:4201/clients', {
        headers: new HttpHeaders({ "Authorization": "Bearer " + client?.accessToken })
      })
        .subscribe(
          resp => {
            /* cast dell'oggetto json intero (resp) per tipizzarle in prop come quelle dell'interfaccia */
            let castResp: IClientsData[] = <IClientsData[]><unknown>resp;
            this.clients = castResp;
            this.dataSource = new MatTableDataSource(this.clients)
            this.dataSource.paginator = this.paginator;
            console.log(this.clients, resp, castResp);
          },
          err => {
            console.log(err);
            this.error = err.error
          }
        )
    })
  }

  removeClient(id: number): void {
    this.authService.removeClientS(id).subscribe();
    this.clients.forEach(ele => {
      if (ele.id === id) { this.authService.removeAllInvoices(ele.id); }
    });
    this.getAllClients();
  }

  saveClient(id: IClientsData): void {
    this.clients.forEach(ele => {
      /* se l'elemento ciclato e' = all'id (cliente selezionato) */
      if (ele === id) {
        /* inserisci i dati nel localStorage */
        sessionStorage.setItem('storedClient', JSON.stringify(ele))
      }
    })
    this.authService.reloadRoute();
  }

  saveForInvoices(id: IClientsData): void {
    this.clients.forEach(ele => {
      if (ele === id) {
        sessionStorage.setItem('storedClient', JSON.stringify(ele))
      }
    })
  }

}


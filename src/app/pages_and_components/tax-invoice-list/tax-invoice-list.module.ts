import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaxInvoiceListRoutingModule } from './tax-invoice-list-routing.module';
import { TaxInvoiceListPage } from './tax-invoice-list.page';
import { InvoicesMatTableComponent } from './components/mat-table/invoices-mat-table.component';
import { InvoicesMatFormComponent } from './components/mat-form/invoices-mat-form.component';

/* ---------- Material ---------- */
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    TaxInvoiceListPage,
    InvoicesMatFormComponent,
    InvoicesMatTableComponent
  ],
  imports: [
    CommonModule,
    TaxInvoiceListRoutingModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSortModule,
    MatCardModule
  ]
})
export class TaxInvoiceListModule { }

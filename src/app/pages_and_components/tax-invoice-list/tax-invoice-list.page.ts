import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-tax-invoice-list',
  templateUrl: './tax-invoice-list.page.html',
  styleUrls: ['./tax-invoice-list.page.scss']
})
export class TaxInvoiceListPage implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void { }

}

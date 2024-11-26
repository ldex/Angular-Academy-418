import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { catchError, delay, map, Observable, shareReplay, tap } from 'rxjs';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'https://671d383409103098807c943e.mockapi.io/api/products/';
  private http = inject(HttpClient)

  products$: Observable<Product[]>

  constructor() {
    this.initProducts()
  }

  getProductById(id: number): Observable<Product> {
    return this.products$.pipe(
      map(products => products.find(product => product.id == id))
    )
  }

  initProducts() {
    this.products$ = this
                      .http
                      .get<Product[]>(this.baseUrl)
                      .pipe(
                          delay(1500), // For the demo!!!
                          tap(console.table),
                          shareReplay()
                      )
  }

  resetList() {
    this.initProducts()
  }

}

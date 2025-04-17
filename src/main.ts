import 'zone.js';
import { Component, inject, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

export interface ProductsData {
  products: [];
}

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <h1>Products List</h1>
    <ul>
      <li *ngFor="let item of productslist">{{item.title}} - {{item.price}}</li>
    </ul>
  `,
  imports: [CommonModule, HttpClientModule],
})
export class App implements OnInit {
  name = 'Angular';
  http = inject(HttpClient);
  productslist: any[] = [];

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.http.get<ProductsData>('https://dummyjson.com/products').subscribe({
      next: (res) => {
        if (res) {
          this.productslist = res.products;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

bootstrapApplication(App);

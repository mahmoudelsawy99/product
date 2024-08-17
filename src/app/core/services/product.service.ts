import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/app/shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://dummyjson.com/products';
  private categoryUrl = 'https://dummyjson.com/products/category';
  private searchQuerySubject = new BehaviorSubject<string>('');
  public searchQuery$ = this.searchQuerySubject.asObservable();
  constructor(private http: HttpClient) {}

  getProducts(page: number, limit: number): Observable<any> {
    const skip = (page - 1) * limit;
    return this.http.get<any>(`${this.apiUrl}?limit=${limit}&skip=${skip}`);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.categoryUrl}-list`);
  }

  searchProducts(query: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/search?q=${query}`);
  }

  getProductsByCategory(category: string): Observable<any> {
    return this.http.get<any>(`${this.categoryUrl}/${category}`);
  }

  setSearchQuery(query: string) {
     
    this.searchQuerySubject.next(query);
  }
}

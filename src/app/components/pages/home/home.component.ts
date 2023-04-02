import { Subscription } from "rxjs";
import { Product } from "./../../../models/product.model";
import { CartService } from "./../../../services/cart.service";
import { OnDestroy, OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { StoreService } from "src/app/services/store.service";

//here we are assigning the types of tiles for the product depending on the users dynamic value
const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 355, 4: 350 };

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit, OnDestroy {
  cols = 3;
  categ: string | undefined;
  products: Array<Product> | undefined;
  sort = "desc";
  count = " 12";
  productSubscription: Subscription | undefined;
  //we declare a new property that will return the numbers of product in the display therefor update the size of the tiles
  rowHeight = ROWS_HEIGHT[this.cols];
  constructor(
    private cartService: CartService,
    private storeSerive: StoreService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productSubscription = this.storeSerive
      .getAllProducts(this.count, this.sort, this.categ)
      .subscribe((_products) => {
        this.products = _products;
      });
  }

  ngOnDestroy(): void {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }

  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;
    //we call the method here once more to update dynamically
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  OnShowCategory(category: string): void {
    this.categ = category;
    this.getProducts();
    // console.log(category);
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }

  onItemsCountChange(newCount: number): void {
    this.count = newCount.toString();
    this.getProducts();
  }

  onSortChange(newSort: string): void {
    this.sort = newSort;
    this.getProducts();
  }
}

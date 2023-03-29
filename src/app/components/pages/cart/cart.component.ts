import { CartService } from "./../../../services/cart.service";
import { Component, OnInit } from "@angular/core";
import { Cart, CartItem } from "src/app/models/cart.model";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
})
export class CartComponent implements OnInit {
  cart: Cart = {
    items: [
      {
        product: "https://via.placeholder.com/150",
        name: "shoes",
        price: 150,
        quantity: 1,
        id: 1,
      },
      {
        product: "https://via.placeholder.com/150",
        name: "shoes",
        price: 50,
        quantity: 4,
        id: 1,
      },
      {
        product: "https://via.placeholder.com/150",
        name: "shoes",
        price: 10,
        quantity: 4,
        id: 1,
      },
      {
        product: "https://via.placeholder.com/150",
        name: "shoes",
        price: 54,
        quantity: 5,
        id: 1,
      },
      {
        product: "https://via.placeholder.com/150",
        name: "shoes",
        price: 50,
        quantity: 6,
        id: 1,
      },
    ],
  };
  //define a property that we will use inside the tabgle and it will recieve the car item array
  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = [
    "product",
    "name",
    "price",
    "quantity",
    "total",
    "action",
  ];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.dataSource = this.cart.items;
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

  onRemoveFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }
}

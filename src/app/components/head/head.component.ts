import { CartService } from "./../../services/cart.service";
import { Component, Input } from "@angular/core";
import { Cart } from "src/app/models/cart.model";
import { CartItem } from "src/app/models/cart.model";

@Component({
  selector: "app-head",
  templateUrl: "./head.component.html",
})
export class HeadComponent {
  private _cart: Cart = { items: [] };
  itemsQuantity = 0;
  @Input()
  get cart(): Cart {
    return this._cart;
  }
  set cart(cart: Cart) {
    this._cart = cart;
    this.itemsQuantity = cart.items
      .map((item) => item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }
  constructor(private cartService: CartService) {}

  test() {
    console.log(this.cart.items);
  }
  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }
  onClearCart(): void {
    this.cartService.clearCart();
  }
}

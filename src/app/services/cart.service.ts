import { CartItem } from "src/app/models/cart.model";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject } from "rxjs";
import { Cart } from "../models/cart.model";

@Injectable({
  providedIn: "root",
})
export class CartService {
  cart = new BehaviorSubject<Cart>({ items: [] });
  constructor(private _snackBar: MatSnackBar) {}

  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items];

    const itemInCart = items.find((_item) => _item.id === item.id);

    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push(item);
    }

    this.cart.next({ items });
    this._snackBar.open("1 item added to cart", "Ok", { duration: 3000 });
    console.log(this.cart.value);
  }

  getTotal(items: Array<CartItem>): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }

  clearCart(): void {
    this.cart.next({ items: [] });
    this._snackBar.open("Cart is cleared", "Ok", { duration: 3000 });
  }
  removeFromCart(item: CartItem, update = true): Array<CartItem> {
    const filteredItems = this.cart.value.items.filter(
      (_item) => _item.id !== item.id
    );
    if (update) {
      this.cart.next({ items: filteredItems });
      this._snackBar.open("item is removed", "Ok", { duration: 3000 });
    }

    return filteredItems;
  }

  removeOneQuanitty(item: CartItem): void {
    let itemForRemoval: CartItem | undefined;

    let fileteredItems = this.cart.value.items.map((_item) => {
      if (_item.id === item.id) {
        _item.quantity--;

        if (_item.quantity === 0) {
          itemForRemoval = _item;
        }
      }
      return _item;
    });

    if (itemForRemoval) {
      fileteredItems = this.removeFromCart(itemForRemoval, false);
    }
    this.cart.next({ items: fileteredItems });
    this._snackBar.open("item is removed", "Ok", { duration: 3000 });
  }
}

//this service will make posisble for us to use the cart property wherever we want and by assigning it to a behavioursubject
//we can subscribe to this service and add items in the array so that the UI changes every time we need it to change :)

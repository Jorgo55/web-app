import { Component, OnInit } from "@angular/core";
import { Input } from "@angular/core";

@Component({
  selector: "app-product-box",
  templateUrl: "./product-box.component.html",
  styles: [],
})
export class ProductBoxComponent implements OnInit {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  @Input() fullWidthMode = false;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method, @typescript-eslint/no-empty-function
  ngOnInit(): void {}
}

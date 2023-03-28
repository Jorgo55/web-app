import { OnInit } from "@angular/core";
import { Component } from "@angular/core";

//here we are assigning the types of tiles for the product depending on the users dynamic value
const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 355, 4: 350 };

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
  cols = 3;
  categ: string | undefined;
  //we declare a new property that will return the numbers of product in the display therefor update the size of the tiles
  rowHeight = ROWS_HEIGHT[this.cols];
  constructor() {}

  ngOnInit(): void {}

  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;
    //we call the method here once more to update dynamically
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  OnShowCategory(category: string): void {
    this.categ = category;
    console.log(category);
  }
}

import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-products-header",
  templateUrl: "./products-header.component.html",
  styles: [],
})
export class ProductsHeaderComponent implements OnInit {
  @Output() columnsCountChange = new EventEmitter<number>();
  //we send the data with the output to the home component to execute
  @Output() itemsCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();

  sort = "sort";
  itemsshowCounnt = 12;
  constructor() {}

  ngOnInit(): void {}

  onSortUpdated(newSort: string): void {
    this.sort = newSort;
    this.sortChange.emit(newSort);
  }

  onItemsUpdated(count: number): void {
    this.itemsshowCounnt = count;
    this.itemsCountChange.emit(count);
  }

  onColumnsUpdated(colNum: number): void {
    this.columnsCountChange.emit(colNum);
    //we execute the number of columns in the home component through this event by binding it to another method which updates the value
  }
}

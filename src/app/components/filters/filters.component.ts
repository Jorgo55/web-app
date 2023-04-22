import { Component, OnDestroy, OnInit, Output } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { Subscription } from "rxjs";
import { StoreService } from "src/app/services/store.service";

@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() showCategory = new EventEmitter<string>();
  categoriesSubcription: Subscription | undefined;
  categories: Array<string> | undefined;
  constructor(private storeServiece: StoreService) {}

  ngOnInit(): void {
    this.categoriesSubcription = this.storeServiece
      .getAllCategories()
      .subscribe((response) => {
        this.categories = response;
      });
  }

  ngOnDestroy(): void {
    if (this.categoriesSubcription) {
      this.categoriesSubcription.unsubscribe();
    }
  }
  onShowCategory(category: string): void {
    this.showCategory.emit(category);
  }
}

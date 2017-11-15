import { Component } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Response } from '@angular/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  constructor(private dataStorageService: DataStorageService) {}

  onSaveData() {
    this.dataStorageService.storageRecipes()
      .subscribe(
        (response: Response) => console.log(response)
      );
  }

  onFetchData() {
    this.dataStorageService.getRecipes();
  }
}

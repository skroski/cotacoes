import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CurrencyListComponent } from "./currency-list/currency-list.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CurrencyListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'cotacoes';
}

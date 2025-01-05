import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-currency-list',
  imports: [CommonModule],
  template: `
    <div class="p-4">
      <h1 class="text-lg font-bold mb-4">Cotações de Moedas</h1>
      @if (loading) {
        <p>Carregando...</p>
      }
      @else{
        @for (currency of currencies() ; track currency.name) {
          <p>
            {{ currency.name }}: {{ currency.rate | currency: 'BRL' : true : '1.2-2' }}
          </p>

        }

      }

    </div>
  `,
  styleUrl: './currency-list.component.scss'
})
export class CurrencyListComponent {
  private http = inject(HttpClient);

  currencies: any = signal([]);
  loading: boolean = true;
  private readonly targetCurrencies = ['BRL', 'BTC', 'EUR'];

  constructor() {
    this.fetchCurrencies();
  }

  private fetchCurrencies() {
    const url = 'https://openexchangerates.org/api/latest.json?app_id=99fa09ce8fb942799235ca5529280fc9';


    this.http.get<any[]>(url).subscribe({
      next: (data: any) => {

        const rates = data.rates;
        const brlRate = rates['BRL'];

        const filteredRates = this.targetCurrencies.map((currency) => {
          debugger;
          let rate = rates[currency];

          // Multiplicar BTC e EUR pela taxa do Real (BRL)
          if (currency !== 'BRL') {
            rate = (1 / rate) * brlRate;
          }

          return { name: currency, rate };
        });
        this.currencies.set(filteredRates);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}

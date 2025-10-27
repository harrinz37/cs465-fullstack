import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent],
  template: `
    <app-navbar></app-navbar>
    <main class="pageWrapper">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .pageWrapper {
      padding: 1rem 2rem;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background-color: #111827;
      min-height: 100vh;
      color: #fff;
    }
  `]
})
export class App {}

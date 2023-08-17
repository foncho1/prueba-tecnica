import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  close = false;
  title = 'Prueba técnica';

  openSubmenu(e: HTMLLIElement): void {
    e.classList.toggle('showMenu');
  }
}

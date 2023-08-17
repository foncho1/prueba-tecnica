import { Component } from '@angular/core';

@Component({
  selector: 'app-mind-map',
  templateUrl: './mind-map.component.html',
  styleUrls: ['./mind-map.component.scss'],
})
export class MindMapComponent {
  closeMindMap(e: HTMLDivElement): void {
    e.classList.toggle('close');
  }
}

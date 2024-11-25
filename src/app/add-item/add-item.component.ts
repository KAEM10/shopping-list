import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
})
export class AddItemComponent {
  nombre: string = '';
  sitio: string = '';
  sitios: string[] = [];
  @Output() itemAdded = new EventEmitter<any>();

  agregarSitio() {
    if (this.sitio.trim()) {
      this.sitios.push(this.sitio);
      this.sitio = '';
    }
  }

  agregarProducto() {
    if (this.nombre.trim()) {
      this.itemAdded.emit({ nombre: this.nombre, sitio: this.sitio });
      this.nombre = '';
    }
  }
}

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NuevaListaModalComponent } from './nueva-lista-modal.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('NuevaListaModalComponent', () => {
  let component: NuevaListaModalComponent;
  let fixture: ComponentFixture<NuevaListaModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaListaModalComponent ],
      imports: [CommonModule,
        FormsModule,
        IonicModule  ,IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NuevaListaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

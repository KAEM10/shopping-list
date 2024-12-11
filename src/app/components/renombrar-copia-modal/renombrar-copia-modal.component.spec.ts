import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RenombrarCopiaModalComponent } from './renombrar-copia-modal.component';

describe('RenombrarCopiaModalComponent', () => {
  let component: RenombrarCopiaModalComponent;
  let fixture: ComponentFixture<RenombrarCopiaModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RenombrarCopiaModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RenombrarCopiaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

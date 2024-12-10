import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddshoppinglistPage } from './addshoppinglist.page';

describe('AddshoppinglistPage', () => {
  let component: AddshoppinglistPage;
  let fixture: ComponentFixture<AddshoppinglistPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddshoppinglistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

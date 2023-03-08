import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditargrupoComponent } from './editargrupo.component';

describe('EditargrupoComponent', () => {
  let component: EditargrupoComponent;
  let fixture: ComponentFixture<EditargrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditargrupoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditargrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

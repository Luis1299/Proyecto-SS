import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarMaestroComponent } from './editarmaestro.component';

describe('EditarMaestroComponent', () => {
  let component: EditarMaestroComponent;
  let fixture: ComponentFixture<EditarMaestroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarMaestroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarMaestroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

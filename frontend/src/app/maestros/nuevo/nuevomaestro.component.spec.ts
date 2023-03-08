import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoMaestroComponent } from './nuevomaestro.component';

describe('NuevoMaestroComponent', () => {
  let component: NuevoMaestroComponent;
  let fixture: ComponentFixture<NuevoMaestroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoMaestroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoMaestroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

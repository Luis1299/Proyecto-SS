import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarMaestroComponent } from './buscarmaestro.component';

describe('BuscarMaestroComponent', () => {
  let component: BuscarMaestroComponent;
  let fixture: ComponentFixture<BuscarMaestroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarMaestroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarMaestroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

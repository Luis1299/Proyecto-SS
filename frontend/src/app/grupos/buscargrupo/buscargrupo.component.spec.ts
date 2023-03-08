import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscargrupoComponent } from './buscargrupo.component';

describe('BuscargrupoComponent', () => {
  let component: BuscargrupoComponent;
  let fixture: ComponentFixture<BuscargrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscargrupoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscargrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

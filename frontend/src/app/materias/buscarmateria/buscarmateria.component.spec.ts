import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarmateriaComponent } from './buscarmateria.component';

describe('BuscarmateriaComponent', () => {
  let component: BuscarmateriaComponent;
  let fixture: ComponentFixture<BuscarmateriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarmateriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarmateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

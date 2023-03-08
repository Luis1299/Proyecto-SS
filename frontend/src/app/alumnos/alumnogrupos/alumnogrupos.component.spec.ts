import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoGruposComponent } from './alumnogrupos.component';

describe('GruposComponent', () => {
  let component: AlumnoGruposComponent;
  let fixture: ComponentFixture<AlumnoGruposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnoGruposComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnoGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

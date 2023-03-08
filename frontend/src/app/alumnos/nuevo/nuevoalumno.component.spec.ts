import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoAlumnoComponent } from './nuevoalumno.component';

describe('NuevoAlumnoComponent', () => {
  let component: NuevoAlumnoComponent;
  let fixture: ComponentFixture<NuevoAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoAlumnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAlumnoComponent } from './editaralumno.component';

describe('EditarAlumnoComponent', () => {
  let component: EditarAlumnoComponent;
  let fixture: ComponentFixture<EditarAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarAlumnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

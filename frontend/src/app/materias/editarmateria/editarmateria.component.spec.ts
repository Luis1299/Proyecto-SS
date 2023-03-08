import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarmateriaComponent } from './editarmateria.component';

describe('EditarmateriaComponent', () => {
  let component: EditarmateriaComponent;
  let fixture: ComponentFixture<EditarmateriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarmateriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarmateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

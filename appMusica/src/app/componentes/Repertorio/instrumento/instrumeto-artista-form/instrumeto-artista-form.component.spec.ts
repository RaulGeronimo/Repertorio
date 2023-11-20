import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumetoArtistaFormComponent } from './instrumeto-artista-form.component';

describe('InstrumetoArtistaFormComponent', () => {
  let component: InstrumetoArtistaFormComponent;
  let fixture: ComponentFixture<InstrumetoArtistaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstrumetoArtistaFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstrumetoArtistaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

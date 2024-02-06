import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumetoArtistaListComponent } from './instrumeto-artista-list.component';

describe('InstrumetoArtistaListComponent', () => {
  let component: InstrumetoArtistaListComponent;
  let fixture: ComponentFixture<InstrumetoArtistaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstrumetoArtistaListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstrumetoArtistaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

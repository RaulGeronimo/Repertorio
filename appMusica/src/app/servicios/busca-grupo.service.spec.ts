import { TestBed } from '@angular/core/testing';

import { BuscaGrupoService } from './busca-grupo.service';

describe('BuscaGrupoService', () => {
  let service: BuscaGrupoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscaGrupoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

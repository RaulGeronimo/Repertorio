import { TestBed } from '@angular/core/testing';

import { BuscaAlbumService } from './busca-album.service';

describe('BuscaAlbumService', () => {
  let service: BuscaAlbumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscaAlbumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

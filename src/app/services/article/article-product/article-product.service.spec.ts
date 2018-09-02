import { TestBed, inject } from '@angular/core/testing';

import { ArticleProductService } from './article-product.service';

describe('ArticleProductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArticleProductService]
    });
  });

  it('should be created', inject([ArticleProductService], (service: ArticleProductService) => {
    expect(service).toBeTruthy();
  }));
});

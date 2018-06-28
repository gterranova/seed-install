import { TestBed, inject } from '@angular/core/testing';

import { {{ properCase service-name }}Service } from './{{dashCase service-name}}.service';

describe('{{ properCase service-name }}Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{{ properCase service-name }}Service]
    });
  });

  it('should be created', inject([{{ properCase service-name }}Service], (service: {{ properCase service-name }}Service) => {
    expect(service).toBeTruthy();
  }));
});

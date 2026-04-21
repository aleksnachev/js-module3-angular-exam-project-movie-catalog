import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieContent } from './movie-content';

describe('MovieContent', () => {
  let component: MovieContent;
  let fixture: ComponentFixture<MovieContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieContent],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieContent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

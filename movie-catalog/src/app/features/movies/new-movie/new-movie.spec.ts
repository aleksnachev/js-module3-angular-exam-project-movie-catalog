import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMovie } from './new-movie';

describe('NewMovie', () => {
  let component: NewMovie;
  let fixture: ComponentFixture<NewMovie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewMovie],
    }).compileComponents();

    fixture = TestBed.createComponent(NewMovie);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

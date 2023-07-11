import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorysliderComponent } from './storyslider.component';

describe('StorysliderComponent', () => {
  let component: StorysliderComponent;
  let fixture: ComponentFixture<StorysliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StorysliderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StorysliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

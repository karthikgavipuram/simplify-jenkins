import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CvgeneratorComponent } from './cvgenerator.component';

describe('CvgeneratorComponent', () => {
  let component: CvgeneratorComponent;
  let fixture: ComponentFixture<CvgeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CvgeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvgeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

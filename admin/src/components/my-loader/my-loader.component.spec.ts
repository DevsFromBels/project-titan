import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLoaderComponent } from './my-loader.component';

describe('MyLoaderComponent', () => {
  let component: MyLoaderComponent;
  let fixture: ComponentFixture<MyLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyLoaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

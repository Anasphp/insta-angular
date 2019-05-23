import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminallpostsComponent } from './adminallposts.component';

describe('AdminallpostsComponent', () => {
  let component: AdminallpostsComponent;
  let fixture: ComponentFixture<AdminallpostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminallpostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminallpostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});

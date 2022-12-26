import { FilterClassSchedulePipe } from '@schedulesModule/pipes/filter-class-schedule.pipe';

fdescribe('FilterClassSchedulePipe', () => {
  const dateServiceSpy = jasmine.createSpyObj(['getWeekDay']);
  it('create an instance', () => {
    const pipe = new FilterClassSchedulePipe(dateServiceSpy);
    expect(pipe).toBeTruthy();
  });
});

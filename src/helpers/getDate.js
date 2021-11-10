import moment from 'moment';

export function getNextDate(dateNum) {
  const dayINeed = dateNum; // for Tuesday
  const today = moment().isoWeekday();

  // if we haven't yet passed the day of the week that I need:
  if (today <= dayINeed) { 
    // then just give me this week's instance of that day
    return moment().isoWeekday(dayINeed).format('MM DD YY');
  } else {
    // otherwise, give me *next week's* instance of that same day
    return moment().add(1, 'weeks').isoWeekday(dayINeed).format('MM DD YY');
  }
}

export function getNextTuesdayReadable() {
  const dayINeed = 7; // for Tuesday
  const today = moment().isoWeekday();

  // if we haven't yet passed the day of the week that I need:
  if (today <= dayINeed) { 
    // then just give me this week's instance of that day
    return moment().isoWeekday(dayINeed).format('MMM DD');
  } else {
    // otherwise, give me *next week's* instance of that same day
    return moment().add(1, 'weeks').isoWeekday(dayINeed).format('MMM DD');
  }
}

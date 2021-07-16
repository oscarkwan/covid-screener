import moment from 'moment';

export function getNextTuesday() {
  const dayINeed = 7; // for Tuesday
  const today = moment().isoWeekday();

  // if we haven't yet passed the day of the week that I need:
  if (today <= dayINeed) { 
    // then just give me this week's instance of that day
    return moment().isoWeekday(dayINeed).format('MM DD');
  } else {
    // otherwise, give me *next week's* instance of that same day
    return moment().add(1, 'weeks').isoWeekday(dayINeed).format('MM DD');
  }
}

export function getNextSundayReadable() {
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

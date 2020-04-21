import isBefore from 'date-fns/isBefore';
import isAfter from 'date-fns/isAfter';

class SkyBackground {
  constructor(props) {
    this.sunTimes = props.sunTimes;

    this.currentSkyTime = null;
    this.nextSkyTime = null;

    this.sunTimeMap = this.mapSunTimes();
    console.log('this.sunTimeMap', this.sunTimeMap)
    // this.setSkyTimes();

    this.startAndEndDayColor = [3, 12, 27];
    this.midDayColor = [25, 89, 200];

    this.startOfDay = this.sunTimeMap.get('nadir').getTime();
    this.midOfDay = this.sunTimeMap.get('solarNoon').getTime();
    this.endOfDay = this.sunTimeMap.get('night').getTime();

    this.dayDuration = this.endOfDay - this.startOfDay;

    this.getSkyColor();
  }

  sortSunTimes([, aDate], [, bDate]) {
    if (isBefore(aDate, bDate)) return -1;
    if (isBefore(bDate, aDate)) return 1;
    return 0;
  }

  mapSunTimes() {
    const sunTimeMap = new Map();
    const sunTimeNames = Object.keys(this.sunTimes);
    for (const sunTimeName of sunTimeNames) {
      sunTimeMap.set(sunTimeName, this.sunTimes[sunTimeName]);
    }

    return new Map([...sunTimeMap.entries()].sort(this.sortSunTimes));
  }

  getSkyColor = () => {
    const currentDateTime = new Date().getTime();
    
    let startColor = this.startAndEndDayColor;
    let currentDiff = currentDateTime - this.startOfDay;
    let durationToMidDay = this.midDay - this.startOfDay;

    if (currentDateTime > this.midOfDay) {
      startColor = this.midDayColor; 
      currentDiff = this.endOfDay - currentDateTime;
      durationToMidDay = this.endOfDay - this.midOfDay;
    }

    const colorFactors = {
      r: (this.midDayColor[0] - this.startAndEndDayColor[0]) / durationToMidDay,
      g: (this.midDayColor[1] - this.startAndEndDayColor[1]) / durationToMidDay,
      b: (this.midDayColor[2] - this.startAndEndDayColor[2]) / durationToMidDay,
    };

    const r = colorFactors.r * currentDiff;
    const g = colorFactors.g * currentDiff;
    const b = colorFactors.b * currentDiff;

    return `rgb(${r}, ${g}, ${b})`;
  }

  // setSkyTimes() {
  //   this.currentSkyTime = null;
  //   this.nextSkyTime = null;

  //   const currentDateTime = new Date();

  //   let previousSunTime;

  //   for (const [sunTimeName, sunTimeDate] of this.sunTimeMap.entries()) {

  //     console.log('check', { 
  //       sunTimeName,
  //       currentDateTime,
  //       sunTimeDate,
  //       isBefore: isBefore(currentDateTime, sunTimeDate),
  //     })
  //     if (isBefore(currentDateTime, sunTimeDate)) {
  //       if (!previousSunTime) {
  //         this.currentSkyTime = { name: sunTimeName, date: sunTimeDate }; 
  //       } else {
  //         this.currentSkyTime = previousSunTime; 
  //         this.nextSkyTime = { name: sunTimeName, date: sunTimeDate }; 
  //       }
  //     } else {
  //       previousSunTime = { name: sunTimeName, date: sunTimeDate }; 
  //     }

  //     if (this.currentSkyTime && !this.netSkyTime) {
  //       this.nextSkyTime = { name: sunTimeName, date: sunTimeDate };
  //     }

  //     if (this.currentSkyTime && this.nextSkyTime) {
  //       break;
  //     }
  //     previousSunTime = { name: sunTimeName, date: sunTimeDate };
  //   }

  //   console.log('currentSkyTime', this.currentSkyTime)
  //   console.log('nextSkyTime', this.nextSkyTime)
  // }

  getCurrentSkyBackground() {
    const currentDateTime = new Date();
  }
};

export default SkyBackground;

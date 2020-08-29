export function getSecond(totalSecond){
  let sec = (totalSecond % 60) >> 0;
  if(sec<10){
    sec = '0' + sec;
  }
  return sec
}

export function getMinute(totalSecond){
  let min = (totalSecond/60) >> 0;
  if(min<10){
    min = '0' + min;
  }
  return min
}
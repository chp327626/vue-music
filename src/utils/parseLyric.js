export function parseLyric(text) {         
  let lyricArr = text.split('\n');           
  let result = [];
             
  for (let i = 0; i < lyricArr.length; i++) {
    let playTimeArr = lyricArr[i].match(/\[\d*:\d*((\.|:)\d*)*\]/g);            
    let lineLyric = "";
    if (lyricArr[i].split(playTimeArr).length > 0) {
      lineLyric = lyricArr[i].split(playTimeArr);
    }
    if (playTimeArr != null) {
      for (let j = 0; j < playTimeArr.length; j++) {
        let time = playTimeArr[j].substring(1, playTimeArr[j].indexOf("]")).split(":"); 
        result.push({ 
          time: (parseInt(time[0]) * 60 + parseFloat(time[1])).toFixed(2),
          content: String(lineLyric).substr(1)
        });
      }
    }
  }
  return result;
}
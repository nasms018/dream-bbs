export const displayDate = (regDate,upDate) => {
  const now = new Date();
  //console.log(now);
  
  const diffMilli = now.getTime()- upDate ? upDate : regDate;
  const diffSec = diffMilli / (1000);
  let timeBefore = "";
  if(diffSec < 60){
    timeBefore=Math.round(diffSec)+"초 전";
  } else {
    const diffMin = diffSec / (60);
    if(diffMin < 60){
      timeBefore=Math.round(diffMin)+"분 전";
    } else {
      const diffHour = diffMin / (60);
      if(diffHour < 60){
        timeBefore=Math.round(diffHour)+"시간 전";
      } else {
        const diffDay = diffHour / (24);
        if(diffDay < 60){
          timeBefore=Math.round(diffDay)+"일 전";
        } else {
          const diffYear = diffDay / (365);
          timeBefore=Math.round(diffYear)+"일 전";
        }
      }
    }
  }
  return timeBefore
}

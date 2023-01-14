let hours = document.querySelectorAll(".hours");
let lastWeek = document.querySelectorAll(".last-week");

const dailyLink = document.getElementById("daily-link");
const weeklyLink = document.getElementById("weekly-link");
const hourlyLink = document.getElementById("monthly-link");

weeklyLink.style.color = "white";

dailyLink.addEventListener("click", () => updateInfo('daily'));

weeklyLink.addEventListener("click", () => updateInfo('weekly'));

hourlyLink.addEventListener("click", () => updateInfo('monthly'));

async function getData() {
  let url = 'data.json'
  try {
    let res = await fetch(url)
    return await res.json()
  } catch (error) {
    console.log(error)
  }
}


async function updateInfo(timeframe) {
  if (timeframe == 'daily') {
    dailyLink.style.color = "white";
    hourlyLink.style.color = "";
    weeklyLink.style.color = "";
    let data = await getData()
    mainLoop(data, 0, 0, 'daily')
  } else if (timeframe == 'weekly') {
    weeklyLink.style.color = "white";
    dailyLink.style.color = "";
    hourlyLink.style.color = "";
    let data = await getData()
    mainLoop(data, 0, 0, 'weekly')
  } else if (timeframe == 'monthly') {
    hourlyLink.style.color = "white";
    weeklyLink.style.color = "";
    dailyLink.style.color = "";
    let data = await getData()
    mainLoop(data, 0, 0, 'monthly')
  }
}


function mainLoop(data, currentCount, prevCount, timeframe) {
  for (let hour of hours) {
    currentCount++;
    if (timeframe == 'daily') {
      let currentData = data[currentCount - 1].timeframes.daily.current
      hour.textContent = `${currentData}hrs`
    } else if (timeframe == 'weekly') {
      let currentData = data[currentCount - 1].timeframes.weekly.current;
      hour.textContent = `${currentData}hrs`;
    } else if (timeframe == 'monthly') {
      let currentData = data[currentCount - 1].timeframes.monthly.current;
      hour.textContent = `${currentData}hrs`;
    }
  }
  for (let last of lastWeek) {
    prevCount++;
    if (timeframe == 'daily') {
      let prevData = data[prevCount - 1].timeframes.daily.previous;
      last.textContent = `Last Month - ${prevData}hrs`;
    } else if (timeframe == 'weekly') {
      let prevData = data[prevCount - 1].timeframes.weekly.previous;
      last.textContent = `Last Month - ${prevData}hrs`;
    } else if (timeframe == 'monthly') {
      let prevData = data[prevCount - 1].timeframes.monthly.previous;
      last.textContent = `Last Month - ${prevData}hrs`;
    }
  }
  currentCount = 0;
  prevCount = 0;
}
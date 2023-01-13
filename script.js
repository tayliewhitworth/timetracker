let hours = document.querySelectorAll(".hours");
let lastWeek = document.querySelectorAll(".last-week");

const dailyLink = document.getElementById("daily-link");
const weeklyLink = document.getElementById("weekly-link");
const hourlyLink = document.getElementById("monthly-link");

weeklyLink.style.color = "white";

dailyLink.addEventListener("click", updateDaily);

weeklyLink.addEventListener("click", updateWeekly);

hourlyLink.addEventListener("click", updateMonthly);

function updateDaily() {
  dailyLink.style.color = "white";
  hourlyLink.style.color = "";
  weeklyLink.style.color = "";
  console.log("clicked");
  fetch("data.json")
    .then((res) => res.json())
    .then((data) => {
      dailyLoop(data, hours);
    });
}

function updateWeekly() {
  weeklyLink.style.color = "white";
  dailyLink.style.color = "";
  hourlyLink.style.color = "";
  console.log("clicked");
  fetch("data.json")
    .then((res) => res.json())
    .then((data) => {
      loopTrial(data, hours);
    });
}

function updateMonthly() {
  hourlyLink.style.color = "white";
  weeklyLink.style.color = "";
  dailyLink.style.color = "";
  console.log("clicked");
  fetch('data.json')
    .then((res) => res.json())
    .then((data) => {
      monthlyLoop(data, hours)
    })
}


let count = 0;
let prevCount = 0;

function loopTrial(data, hours) {
  for (let hour of hours) {
    count++;
    let currentData = data[count - 1].timeframes.weekly.current;
    hour.textContent = `${currentData}hrs`;
  }
  for (let last of lastWeek) {
    prevCount++;
    let prevData = data[prevCount - 1].timeframes.weekly.previous;
    last.textContent = `Last Week - ${prevData}hrs`;
  }
  count = 0
  prevCount = 0
}

let dailyCount = 0;
let dailyPrev = 0;

function dailyLoop(data, hours) {
  for (let hour of hours) {
    dailyCount++;
    let currentData = data[dailyCount - 1].timeframes.daily.current;
    hour.textContent = `${currentData}hrs`;
    console.log(currentData);
  }
  for (let last of lastWeek) {
    dailyPrev++;
    let prevData = data[dailyPrev - 1].timeframes.daily.previous;
    last.textContent = `Yesterday - ${prevData}hrs`;
  }
  dailyCount = 0
  dailyPrev = 0
}


let monthlyCount = 0;
let monthlyPrev = 0;

function monthlyLoop(data, hours) {
  for (let hour of hours) {
    monthlyCount++;
    let currentData = data[monthlyCount - 1].timeframes.monthly.current;
    hour.textContent = `${currentData}hrs`;
    console.log(currentData);
  }
  for (let last of lastWeek) {
    monthlyPrev++;
    let prevData = data[monthlyPrev - 1].timeframes.monthly.previous;
    last.textContent = `Last Month - ${prevData}hrs`;
  }
  monthlyCount = 0
  monthlyPrev = 0
}
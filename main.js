const   time = document.getElementById('time'),
        dateNow = document.getElementById('date');

var rotate = document.getElementById('refresh');
var input = document.querySelector('input');
var temperatureNow = document.getElementById('temperature-now');
var temperatureFirst = document.getElementById('temperature-first');
var temperatureSecond = document.getElementById('temperature-second');
var temperatureThird = document.getElementById('temperature-third');
var latitude = document.getElementById('latitude');
var longitude = document.getElementById('longitude');
var feelsLike = document.getElementById('feels-like');
var wind = document.getElementById('wind');
var humidity = document.getElementById('humidity');
var weatherStatus = document.getElementById('weather-status');

var buttonCels = document.getElementById('button-cels');
var buttonFar = document.getElementById('button-far');

var weekOne = document.getElementById('week-one');
var weekTwo = document.getElementById('week-two');
var weekThree = document.getElementById('week-three');

function showTime() {
    let today = new Date(),
      hour = today.getHours(),
      min = today.getMinutes(),
      sec = today.getSeconds();
  
    time.innerHTML = `${hour}<span> : </span>${addZero(min)}<span> : </span>${addZero(sec)}`;
  
    setTimeout(showTime, 1000);
}

function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function showDate() {
    let todayDate = new Date(),
      day = todayDate.getDate(),
      month = todayDate.getMonth(),
      week = todayDate.getDay();

    switch (week) {
        case 0:
            week = 'Sun';
            weekOne.innerHTML = 'Monday';
            weekTwo.innerHTML = 'Tuesday';
            weekThree.innerHTML = 'Wednesday';
            break;
        case 1:
            week = 'Mon';
            weekOne.innerHTML = 'Tuesday';
            weekTwo.innerHTML = 'Wednesday';
            weekThree.innerHTML = 'Thursday';
            break;
        case 2:
            week = 'Tues';
            weekOne.innerHTML = 'Wednesday';
            weekTwo.innerHTML = 'Thursday';
            weekThree.innerHTML = 'Friday';
            break;
        case 3:
            week = 'Wed';
            weekOne.innerHTML = 'Thursday';
            weekTwo.innerHTML = 'Friday';
            weekThree.innerHTML = 'Saturday';
            break;
        case 4:
            week = 'Thur';
            weekOne.innerHTML = 'Friday';
            weekTwo.innerHTML = 'Saturday';
            weekThree.innerHTML = 'Sunday';
            break;
        case 5:
            week = 'Fri';
            weekOne.innerHTML = 'Saturday';
            weekTwo.innerHTML = 'Sunday';
            weekThree.innerHTML = 'Monday';
            break;
        case 6:
            week = 'Sat';
            weekOne.innerHTML = 'Sunday';
            weekTwo.innerHTML = 'Monday';
            weekThree.innerHTML = 'Tuesday';
            break;
    }

    switch (month) {
        case 0:
            month = 'January';
            break;
        case 1:
            month = 'February';
            break;
        case 2:
            month = 'March';
            break;
        case 3:
            month = 'April';
            break;
        case 4:
            month = 'May';
            break;
        case 5:
            month = 'June';
            break;
        case 6:
            month = 'July';
            break;
        case 7:
            month = 'August';
            break;
        case 8:
            month = 'September';
            break;
        case 9:
            month = 'October';
            break;
        case 10:
            month = 'November';
            break;
        case 11:
            month = 'December';
            break;    
    }

    dateNow.innerHTML = `${week}<span> </span>${day}<span> </span>${month}`;
  
    setTimeout(showTime, 1000);
}

refresh.onclick = function() {
    rotate.classList.add("rotate");
    let randomBg = Math.floor(Math.random() * (6 - 0 + 1)) + 0;
    let background = `url(./background/${randomBg}.jpg) no-repeat center center fixed`;

    setTimeout( function() {
        document.body.style.background = background;
        rotate.classList.remove("rotate");

        openBg;
        let opa = 0;

        var openBg = setInterval( function() {
            opa++;
            document.body.style.opacity = opa / 10;
            if ( opa === 10 ) {
                clearInterval(openBg);
            }
        }, 100)
    }, 1000);
}

input.onclick = function() {
    if (input.value === 'Search city or ZIP') {
        input.value = '';
    }
}
buttonCels.onclick = function(e) {
    if( this.classList.contains('active') ) {
        return false;
    } else {
        buttonCels.classList.add("active");
        buttonFar.classList.remove("active");
    }
}
buttonFar.onclick = function(e) {
    if( this.classList.contains('active') ) {
        return false;
    } else {
        buttonFar.classList.add("active");
        buttonCels.classList.remove("active");
    }
}

document.onclick = function(e){
    if ( event.target != input ) {
        if (input.value === '') {
            input.value = 'Search city or ZIP';
        }
    };
};

function initMap() {
    var coordinates = {lat: 53.9, lng: 27.56},
    zoom = 10,

    map = new google.maps.Map(document.getElementById('geo-maps'), {
        center: coordinates,
        zoom: zoom,
        disableDefaultUI: true
    }),

    marker = new google.maps.Marker({
        position: coordinates,
        map: map
    });

    marker.addListener('click', function () {
        marker.setAnimation(null);
    });

}

function getGeo() {
    fetch(
      "https://ipinfo.io/json?token=603648da1a2c04"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
}

function getWeather() {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=Minsk&units=metric&lang=EN&appid=ff0534b467d145be778cd1ec2930ac63`) // btu - фаренгейты , metric - цельсия
        .then((response) => {
            return response.json();
        })
        .then((data) => {   
            console.log(data);
            temperatureNow.innerHTML = Math.round(data.list[0].main.temp);
            weatherStatus.innerHTML = `${data.list[0].weather[0].description}`;
            feelsLike.innerHTML = `Feels like: ${Math.round(data.list[0].main.feels_like)}°`;
            wind.innerHTML = `Wind: ${Math.round(data.list[0].wind.speed)} m/s`;
            humidity.innerHTML = `Humidity: ${Math.round(data.list[0].main.humidity)} %`;
            temperatureFirst.innerHTML = Math.round(data.list[6].main.temp);
            temperatureSecond.innerHTML = Math.round(data.list[14].main.temp);
            temperatureThird.innerHTML = Math.round(data.list[22].main.temp);

            latitude.innerHTML = `Latitude: ${data.city.coord.lat}`;
            longitude.innerHTML = `Longitude: ${data.city.coord.lon}`;
        });
}


showTime();
showDate();
getWeather();
initMap();
getGeo();
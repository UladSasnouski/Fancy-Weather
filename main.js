const time = document.getElementById('time'),
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

var cityes = document.getElementById('city');
var country = document.getElementById('country');

var errorMessage = document.getElementById('error-message');

var cloudTop = document.getElementById('cloud-top');
var cloudOne = document.getElementById('cloud-one');
var cloudTwo = document.getElementById('cloud-two');
var cloudThree = document.getElementById('cloud-three');

var buttonCels = document.getElementById('button-cels');
var buttonFar = document.getElementById('button-far');
var buttonLang = document.getElementById('button-lang');

var weekOne = document.getElementById('week-one');
var weekTwo = document.getElementById('week-two');
var weekThree = document.getElementById('week-three');


var textLang = document.getElementById('textLang');
var textSearch = document.getElementById('textSearch');
var textFeels = document.getElementById('textFeels');
var textWind = document.getElementById('textWind');
var textWindParam = document.getElementById('textWindParam');
var textHumidity = document.getElementById('textHumidity');
var textLatitude = document.getElementById('textLatitude');
var textLongitude = document.getElementById('textLongitude');

var localCity;

var timeUT;

var celsium;
var farengeit;

var lang;

function showTime() {
    let today = new Date(),
        hour = today.getUTCHours(),
        min = today.getUTCMinutes(),
        sec = today.getUTCSeconds();

    var static = timeUT / 3600;

    var hourUTC = (+hour + static);

    if (hourUTC < 0) {
        hourUTC = 24 + hourUTC;
    };

    time.innerHTML = `${hourUTC}<span> : </span>${addZero(min)}<span> : </span>${addZero(sec)}`;

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

    if (localStorage.getItem('language') === 'EN' || lang === 'EN') {
        textLang.innerHTML = 'EN';
        textSearch.innerHTML = 'SEARCH';
        textFeels.innerHTML = 'FEELS LIKE: ';
        textWind.innerHTML = 'WIND: ';
        textWindParam.innerHTML = 'm/s';
        textHumidity.innerHTML = 'HUMIDITY: ';
        textLatitude.innerHTML = 'Latitude:';
        textLongitude.innerHTML = 'Longitude:';

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

    } else if (localStorage.getItem('language') === 'RU' || lang === 'RU') {
        textLang.innerHTML = 'РУ';
        textSearch.innerHTML = 'ПОИСК';
        textFeels.innerHTML = 'ОЩУЩАЕТСЯ: ';
        textWind.innerHTML = 'ВЕТЕР: ';
        textWindParam.innerHTML = 'м/с';
        textHumidity.innerHTML = 'ВЛАЖНОСТЬ: ';
        textLatitude.innerHTML = 'Широта:';
        textLongitude.innerHTML = 'Долгота:';

        switch (week) {
            case 0:
                week = 'Вс';
                weekOne.innerHTML = 'Понедельник';
                weekTwo.innerHTML = 'Вторник';
                weekThree.innerHTML = 'Среда';
                break;
            case 1:
                week = 'Пн';
                weekOne.innerHTML = 'Вторник';
                weekTwo.innerHTML = 'Среда';
                weekThree.innerHTML = 'Четверг';
                break;
            case 2:
                week = 'Вт';
                weekOne.innerHTML = 'Среда';
                weekTwo.innerHTML = 'Четверг';
                weekThree.innerHTML = 'Пятница';
                break;
            case 3:
                week = 'Ср';
                weekOne.innerHTML = 'Четверг';
                weekTwo.innerHTML = 'Пятница';
                weekThree.innerHTML = 'Суббота';
                break;
            case 4:
                week = 'Чт';
                weekOne.innerHTML = 'Пятница';
                weekTwo.innerHTML = 'Суббота';
                weekThree.innerHTML = 'Воскресенье';
                break;
            case 5:
                week = 'Пт';
                weekOne.innerHTML = 'Суббота';
                weekTwo.innerHTML = 'Воскресенье';
                weekThree.innerHTML = 'Понедельник';
                break;
            case 6:
                week = 'Сб';
                weekOne.innerHTML = 'Воскресенье';
                weekTwo.innerHTML = 'Понедельник';
                weekThree.innerHTML = 'Вторник';
                break;
        }
        switch (month) {
            case 0:
                month = 'Январь';
                break;
            case 1:
                month = 'Февраль';
                break;
            case 2:
                month = 'Март';
                break;
            case 3:
                month = 'Апрель';
                break;
            case 4:
                month = 'Май';
                break;
            case 5:
                month = 'Июнь';
                break;
            case 6:
                month = 'Июль';
                break;
            case 7:
                month = 'Август';
                break;
            case 8:
                month = 'Сентябрь';
                break;
            case 9:
                month = 'Октябрь';
                break;
            case 10:
                month = 'Ноябрь';
                break;
            case 11:
                month = 'Декабрь';
                break;
        }
    }

    dateNow.innerHTML = `${week}<span> </span>${day}<span> </span>${month}`;

    setTimeout(showTime, 1000);
}

function UpdateImage() {
    rotate.classList.add("rotate");
    let randomBg = Math.floor(Math.random() * (6 - 0 + 1)) + 0;

    let background = `url(./background/${randomBg}.jpg) no-repeat center center fixed`;

    setTimeout(function () {
        document.body.style.background = background;
        rotate.classList.remove("rotate");
    }, 1000);
}

refresh.onclick = function () {
    rotate.classList.add("rotate");
    let randomBg = Math.floor(Math.random() * (6 - 0 + 1)) + 0;

    let background = `url(./background/${randomBg}.jpg) no-repeat center center fixed`;

    setTimeout(function () {
        document.body.style.background = background;
        rotate.classList.remove("rotate");

        openBg;
        let opa = 0;

        var openBg = setInterval(function () {
            opa++;
            document.body.style.opacity = opa / 10;
            if (opa === 10) {
                clearInterval(openBg);
            }
        }, 100)
    }, 1000);
}

input.onclick = function () {
    if (input.value === 'Search city or ZIP') {
        input.value = '';
    } else if (input.value === 'Искать город или почтовый индекс') {
        input.value = '';
    }
}

buttonLang.onclick = function (e) {


    if (lang === 'EN') {
        lang = 'RU';
        localStorage.setItem('language', lang);
        textLang.innerHTML = 'РУ';
        textFeels.innerHTML = 'ОЩУЩАЕТСЯ: ';
        textWind.innerHTML = 'ВЕТЕР: ';
        textWindParam.innerHTML = 'м/с';
        textHumidity.innerHTML = 'ВЛАЖНОСТЬ: ';
        input.value === 'Искать город или почтовый индекс';
        textSearch.innerHTML = 'ПОИСК';
        textLatitude.innerHTML = 'Широта:';
        textLongitude.innerHTML = 'Долгота:';
        getWeather(localCity);
        showDate();
    } else if (lang === 'RU') {
        lang = 'EN';
        localStorage.setItem('language', lang);
        textLang.innerHTML = 'EN';
        textFeels.innerHTML = 'FEELS LIKE: ';
        textWind.innerHTML = 'WIND: ';
        textWindParam.innerHTML = 'm/s';
        textHumidity.innerHTML = 'HUMIDITY: ';
        input.value === 'Search city or ZIP';
        textSearch.innerHTML = 'SEARCH';
        textLatitude.innerHTML = 'Latitude:';
        textLongitude.innerHTML = 'Longitude:';
        getWeather(localCity);
        showDate();
    }
    UpdateImage();
}

buttonCels.onclick = function (e) {
    if (this.classList.contains('active')) {
        return false;
    } else {
        buttonCels.classList.add("active");
        buttonFar.classList.remove("active");
        celsium = true;
        farengeit = false;

        localStorage.setItem('temp-status', 'celsium');

        // Пример: (50°F - 32) : 1,8

        temperatureNow.innerHTML = ((+temperatureNow.textContent - 32) / 1.8).toFixed(0);
        temperatureFirst.innerHTML = ((+temperatureFirst.textContent - 32) / 1.8).toFixed(0);
        temperatureSecond.innerHTML = ((+temperatureSecond.textContent - 32) / 1.8).toFixed(0);
        temperatureThird.innerHTML = ((+temperatureThird.textContent - 32) / 1.8).toFixed(0);
        feelsLike.innerHTML = ((+feelsLike.textContent - 32) / 1.8).toFixed(0);
        UpdateImage();
    }
}
buttonFar.onclick = function (e) {
    if (this.classList.contains('active')) {
        return false;
    } else {
        buttonFar.classList.add("active");
        buttonCels.classList.remove("active");
        celsium = false;
        farengeit = true;

        localStorage.setItem('temp-status', 'farengeit');

        // Пример: 10°C x 1,8 + 32 

        temperatureNow.innerHTML = (+temperatureNow.textContent * 1.8 + 32).toFixed(0);
        temperatureFirst.innerHTML = (+temperatureFirst.textContent * 1.8 + 32).toFixed(0);
        temperatureSecond.innerHTML = (+temperatureSecond.textContent * 1.8 + 32).toFixed(0);
        temperatureThird.innerHTML = (+temperatureThird.textContent * 1.8 + 32).toFixed(0);
        feelsLike.innerHTML = (+feelsLike.textContent * 1.8 + 32).toFixed(0);
        UpdateImage();
    }
}

document.onclick = function (e) {
    if (event.target != input) {
        if (input.value === '') {
            if (lang === 'EN') {
                input.value = 'Search city or ZIP';
            } else {
                input.value = 'Искать город или почтовый индекс';
            }
        }
    };
    if (errorMessage.classList.contains('open-error')) {
        errorMessage.classList.remove('open-error');
    } else {
        return 0;
    }
};

function initMap(lati, long) {
    var coordinates = { lat: lati, lng: long },
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
}

function getNewCity() {
    localSearch = (document.getElementById('yourSearch')).value;
    getWeather(localSearch);
    console.log(localSearch);
    localSearch = 'Search city or ZIP';
}

function getGeo() {
    fetch(
        "https://ipinfo.io/json?token=603648da1a2c04"
    )
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            getWeather(data.city)
        });
}

function getWeather(city) {
    localCity = city;
    if (localStorage.getItem('temp-status') === 'farengeit') {
        buttonFar.classList.add("active");
        buttonCels.classList.remove("active");
        celsium = false;
        farengeit = true;

        let langu = lang;
        langu.toLowerCase();


        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=${langu}&appid=ff0534b467d145be778cd1ec2930ac63`) // btu - фаренгейты , metric - цельсия
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log('Что-то пошло не так :(')
                    return Promise.reject(response);
                }
            })
            .then((data) => {
                console.log(data);
                temperatureNow.innerHTML = Math.round(data.list[0].main.temp);
                weatherStatus.innerHTML = `${data.list[0].weather[0].description}`;
                feelsLike.innerHTML = `${Math.round(data.list[0].main.feels_like)}`;
                wind.innerHTML = `${Math.round(data.list[0].wind.speed)}`;
                humidity.innerHTML = `${Math.round(data.list[0].main.humidity)} %`;

                cloudTop.innerHTML = `<img src="icons/animated/${data.list[0].weather[0].icon}.svg" alt="cloud">`;

                temperatureFirst.innerHTML = Math.round(data.list[6].main.temp);
                cloudOne.innerHTML = `<img src="icons/animated/${data.list[6].weather[0].icon}.svg" alt="cloud">`;


                temperatureSecond.innerHTML = Math.round(data.list[14].main.temp);
                cloudTwo.innerHTML = `<img src="icons/animated/${data.list[14].weather[0].icon}.svg" alt="cloud">`;


                temperatureThird.innerHTML = Math.round(data.list[22].main.temp);
                cloudThree.innerHTML = `<img src="icons/animated/${data.list[22].weather[0].icon}.svg" alt="cloud">`;

                latitude.innerHTML = `${data.city.coord.lat.toFixed(2)}`;
                longitude.innerHTML = `${data.city.coord.lon.toFixed(2)}`;

                let regionNames = new Intl.DisplayNames([`${langu}`], { type: 'region' });

                cityes.innerHTML = `${data.city.name}`;
                country.innerHTML = regionNames.of(`${data.city.country}`);

                temperatureNow.innerHTML = (+temperatureNow.textContent * 1.8 + 32).toFixed(0);
                temperatureFirst.innerHTML = (+temperatureFirst.textContent * 1.8 + 32).toFixed(0);
                temperatureSecond.innerHTML = (+temperatureSecond.textContent * 1.8 + 32).toFixed(0);
                temperatureThird.innerHTML = (+temperatureThird.textContent * 1.8 + 32).toFixed(0);
                feelsLike.innerHTML = (+feelsLike.textContent * 1.8 + 32).toFixed(0);

                let latit = data.city.coord.lat;
                let lonit = data.city.coord.lon;



                initMap(latit, lonit);
                timeUT = data.city.timezone;
                showTime();
                console.log(data.city.timezone);
                UpdateImage();

                document.body.classList.add('loaded_hiding');
                window.setTimeout(function () {
                    document.body.classList.add('loaded');
                    document.body.classList.remove('loaded_hiding');
                }, 1000);

            })
            .catch((error) => {
                errorMessage.classList.add('open-error');
                let textError = document.getElementById('textError');
                if (localStorage.getItem('language') === 'EN' || lang === 'EN') {
                    textError.innerHTML = 'Ops... Invalid request :('
                } else if (localStorage.getItem('language') === 'RU' || lang === 'RU') {
                    textError.innerHTML = 'Ой... Что-то пошло не так :('
                }
            });

    } else {
        buttonCels.classList.add("active");
        buttonFar.classList.remove("active");
        celsium = true;
        farengeit = false;

        let langu = lang;
        langu.toLowerCase();

        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=${langu}&appid=ff0534b467d145be778cd1ec2930ac63`) // btu - фаренгейты , metric - цельсия
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log('Что-то пошло не так :(')
                    return Promise.reject(response);
                }
            })
            .then((data) => {
                console.log(data);
                temperatureNow.innerHTML = Math.round(data.list[0].main.temp);
                weatherStatus.innerHTML = `${data.list[0].weather[0].description}`;
                feelsLike.innerHTML = `${Math.round(data.list[0].main.feels_like)}`;
                wind.innerHTML = `${Math.round(data.list[0].wind.speed)}`;
                humidity.innerHTML = `${Math.round(data.list[0].main.humidity)} %`;

                cloudTop.innerHTML = `<img src="icons/animated/${data.list[0].weather[0].icon}.svg" alt="cloud">`;

                temperatureFirst.innerHTML = Math.round(data.list[6].main.temp);
                cloudOne.innerHTML = `<img src="icons/animated/${data.list[6].weather[0].icon}.svg" alt="cloud">`;


                temperatureSecond.innerHTML = Math.round(data.list[14].main.temp);
                cloudTwo.innerHTML = `<img src="icons/animated/${data.list[14].weather[0].icon}.svg" alt="cloud">`;


                temperatureThird.innerHTML = Math.round(data.list[22].main.temp);
                cloudThree.innerHTML = `<img src="icons/animated/${data.list[22].weather[0].icon}.svg" alt="cloud">`;

                let regionNames = new Intl.DisplayNames([`${langu}`], { type: 'region' });

                cityes.innerHTML = `${data.city.name}`;
                country.innerHTML = regionNames.of(`${data.city.country}`);


                latitude.innerHTML = `${data.city.coord.lat.toFixed(2)}`;
                longitude.innerHTML = `${data.city.coord.lon.toFixed(2)}`;

                let latit = data.city.coord.lat;
                let lonit = data.city.coord.lon;



                initMap(latit, lonit);
                timeUT = data.city.timezone;
                showTime();
                console.log(data.city.timezone);
                UpdateImage();

                document.body.classList.add('loaded_hiding');
                window.setTimeout(function () {
                    document.body.classList.add('loaded');
                    document.body.classList.remove('loaded_hiding');
                }, 5000);

            })
            .catch((error) => {
                errorMessage.classList.add('open-error');
                let textError = document.getElementById('textError');
                if (localStorage.getItem('language') === 'EN' || lang === 'EN') {
                    textError.innerHTML = 'Ops... Invalid request :('
                } else if (localStorage.getItem('language') === 'RU' || lang === 'RU') {
                    textError.innerHTML = 'Ой... Что-то пошло не так :('
                }
            });
    }

}

document.getElementById('yourSearch').addEventListener('keydown', function (e) {
    if (e.keyCode === 13) {
        getNewCity()
    }
});

function onLoadPage() {
    if (localStorage.getItem('language') === null) {
        lang = 'EN';
        localStorage.setItem('language', lang);
        getGeo();
        showDate();
    } else {
        lang = localStorage.getItem('language');
        getGeo();
        showDate();
    }
}

onLoadPage();


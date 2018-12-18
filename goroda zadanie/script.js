let body = document.querySelector("body");

// Массив, хранящий в себе города и их id
let cities = [
  { id: 1, name: "Tbilisi" },
  { id: 2, name: "Moskva" },
  { id: 3, name: "Kiev" },
  { id: 4, name: "Minsk" },
  { id: 5, name: "London" },
  { id: 6, name: "Paris" },
  { id: 7, name: "Pekin" },
  { id: 8, name: "Tokio" },
  { id: 9, name: "Dubai" },
  { id: 10, name: "Deli" },
  { id: 11, name: "Berlin" },
  { id: 12, name: "Lixtenberg" },
  { id: 13, name: "Vena" }
];
// Массив, хранящий в себе дороги
let roads = [
  { cityA: 1, cityB: 2 },
  { cityA: 2, cityB: 3 },
  { cityA: 3, cityB: 4 },
  { cityA: 4, cityB: 5 },
  { cityA: 4, cityB: 6 },
  { cityA: 7, cityB: 8 },
  { cityA: 8, cityB: 9 },
  { cityA: 8, cityB: 10 },
  { cityA: 1, cityB: 10 },
  { cityA: 2, cityB: 8 },
  { cityA: 11, cityB: 12 },
  { cityA: 12, cityB: 13 }
];
//==========================
// Функция поиска маршрута между городами
let routesId = [];
function checkRoadExists(cityA, cityB, road = []) {
  road = road.concat(cityA);
  if (cityA == cityB) routesId.push(road);
  for (let city of getConnectedCities(cityA)) {
    if (road.indexOf(city) == -1) {
      checkRoadExists(city, cityB, road);
    }
  }
}
// ======================
// Функция поиска соседних городов
function getConnectedCities(cityId) {
  let result = [];
  for (let road of roads) {
    if (road.cityA == cityId) result.push(road.cityB);
    if (road.cityB == cityId) result.push(road.cityA);
  }
  return result;
}
// Переменные для отображения пути на карте
let pointOnMap = document.querySelectorAll(".point");
let roadOnMap = document.querySelectorAll(".pointRoad");

// Переменный для передачи городов в функцию
let firstPoint = document.querySelector("#cityA");
let lastPoint = document.querySelector("#cityB");
let routesButton = document.querySelector("#routes");
let routesInform = document.querySelector("#routesInform");
//Действие при нажатии кнопки "Найти маршрут"
routesButton.onclick = function() {
  let mapAll = document.querySelectorAll(".map");
  for (let e of mapAll) body.removeChild(e);
  routesId = [];
  let firstPointId;
  let lastPointId;
  let k = 0;
  // Проверка наличия города на карте
  for (let i = 0; i < cities.length; i++) {
    if (firstPoint.value == cities[i].name) {
      k++;
      firstPointId = cities[i].id;
    }
  }
  if (k > 0) {
    for (let i = 0; i < cities.length; i++) {
      if (lastPoint.value == cities[i].name) {
        k--;
        lastPointId = cities[i].id;
      }
    }
    if (k > 0) alert("Второго города нет на карте!");
  } else if (k == 0) alert("Первого города нет на карте");
  //  Передача id городов для прокладки маршрута (ВЫЗОВ ФУНКЦИИ ПРОКЛАДКИ МАРШРУТА)
  checkRoadExists(firstPointId, lastPointId);

  if (routesId.length == 0) {
    routesInform.value = "Путь между городами не найден!";
  } else {
    for (routes of routesId) {
      // создание карты
      let map = document.createElement("div");
      map.classList.add("map");

      for (let i = 0; i < routes.length; i++) {
        for (let j = 0; j < cities.length; j++) {
          if (routes[i] == cities[j].id) {
            routes[i] = cities[j].name;
            //
            let point = document.createElement("div");
            point.classList.add("point");
            point.innerText = routes[i];
            //
            let pointRoad = document.createElement("div");
            pointRoad.classList.add("pointRoad");
            map.appendChild(point);
            map.appendChild(pointRoad);
          }
        }
      }
      routesInform.value = "Маршрут построен!";

      body.appendChild(map);
    }
  }
};
// Переменный для поиска соседних городов
let index = document.querySelector("#index");
let indexButton = document.querySelector("#indexButton");
let indexId = 0;
let connectedCities = [];
//Действие при нажатии кнопки "Найти соседние города"
indexButton.onclick = function() {
  if (index.value == "") routesInform.value = "Город не указан!";
  else {
    for (let i = 0; i < cities.length; i++) {
      if (index.value == cities[i].name) indexId = cities[i].id;
    }
    connectedCities = getConnectedCities(indexId); // (ВЫЗОВ ФУНКЦИИ ПОИСКА СОСЕДНИХ ГОРОДОВ)
    for (let i = 0; i < connectedCities.length; i++) {
      for (let j = 0; j < cities.length; j++) {
        if (connectedCities[i] == cities[j].id)
          connectedCities[i] = cities[j].name;
      }
    }
    routesInform.value = "Соседние города:" + connectedCities + ".";
  }
};

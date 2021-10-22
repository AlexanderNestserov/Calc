'use strict';

const title = document.getElementsByTagName('h1')[0];
const button = document.getElementsByClassName('handler__btn')[0];
const plus = document.querySelector('.screen-btn');

const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');

const inputType = document.querySelector('.rollback input ');
const spanRange = document.querySelector('.rollback span.range-value ');


const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const fullTotalCount = document.getElementsByClassName('total-input')[3];
const totalCountRollback = document.getElementsByClassName('total-input')[4];

let screens = document.querySelectorAll('.screen');
let option = document.querySelectorAll('.screen');


const appData = {
   title: '',
   screens: [],
   option: [],
   screenPrice: 0,
   adaptive: true,
   rollback: 10,
   fullPrice: 0,
   quantity: 0,
   servicePercentPrice: 0,
   servicePricesPercent: 0,
   servicePricesNumber: 0,
   servicesPercent: {},
   servicesNumber: {},
   init: function () {
      appData.addTitle();
      button.addEventListener('click', appData.nullResult);
      plus.addEventListener('click', appData.addScreenBlock);

      inputType.addEventListener('input', appData.addRange);
      inputType.addEventListener('change', appData.addRange);
   },
   addTitle: function () {
      document.title = title.textContent;
   },
   isError: false,
   nullResult: function () {
      screens = document.querySelectorAll('.screen')
      screens.forEach(function (screen) {
         const select = screen.querySelector('select');
         const input = screen.querySelector('input');
         if (select.value === '' || input.value === '') {
            console.log('Заполни все области экранов');
            appData.isError = true;
         } else {
            appData.isError = false;
         }
      })
      if (!appData.isError) {
         appData.start();
      }
   },
   start: function () {
      appData.addScreens();
      appData.addServices();
      appData.addPrices();
      //appData.logger();
      appData.showResult();
   },
   showResult: function () {
      total.value = appData.screenPrice;
      totalCountOther.value = appData.servicePricesNumber + appData.servicePricesPercent;
      fullTotalCount.value = appData.fullPrice;
      totalCountRollback.value = appData.servicePercentPrice;
      totalCount.value = appData.quantity;
   },
   addRange: function (e) {
      spanRange.textContent = `${e.target.value}`;
      appData.rollback = spanRange.textContent;
   },
   addScreens: function () {
      screens = document.querySelectorAll('.screen');
      screens.forEach(function (screen, index) {
         const input = screen.querySelector('input');
         const select = screen.querySelector('select');
         const selectName = select.options[select.selectedIndex].textContent;
         appData.screens.push({
            id: index,
            name: selectName,
            count: +input.value,
            price: +select.value * +input.value
         });
      });
   },
   addServices: function () {
      otherItemsPercent.forEach(function (item) {
         const check = item.querySelector('input[type=checkbox]');
         const label = item.querySelector('label');
         const input = item.querySelector('input[type=text]');

         if (check.checked) {
            appData.servicesPercent[label.textContent] = +input.value;
         }
      });

      otherItemsNumber.forEach(function (item) {
         const check = item.querySelector('input[type=checkbox]');
         const label = item.querySelector('label');
         const input = item.querySelector('input[type=text]');

         if (check.checked) {
            appData.servicesNumber[label.textContent] = +input.value;
         }
      });
   },
   addScreenBlock: function () {
      const cloneScreen = screens[0].cloneNode(true);
      screens[screens.length - 1].after(cloneScreen);
   },

   addPrices: function () {
      for (let screen of appData.screens) {
         appData.screenPrice += + screen.price;
         appData.quantity += + screen.count;
      }
      for (let key in appData.servicesNumber) {
         appData.servicePricesNumber += appData.servicesNumber[key];
      }
      for (let key in appData.servicesPercent) {
         appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100);
      }
      appData.fullPrice = +appData.screenPrice + appData.servicePricesPercent + appData.servicePricesNumber;

      appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));

   },
   logger: function () {
      console.log(appData.fullPrice);
      console.log(appData.servicePercentPrice);
      console.log(appData.screens);
   }
};

appData.init();

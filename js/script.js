'use strict';

const title = document.getElementsByTagName('h1')[0];
const button = document.getElementsByClassName('handler__btn')[0];
const but1 = document.getElementsByClassName('handler__btn')[1];
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

let inp = document.querySelectorAll("input[type=text");
let sel = document.querySelectorAll("select");
let che = document.querySelectorAll("input[type=checkbox");

const appData = {
   title: '',
   screens: [],
   option: [],
   screenPrice: 0,
   adaptive: true,
   rollback: 0,
   fullPrice: 0,
   quantity: 0,
   servicePercentPrice: 0,
   servicePricesPercent: 0,
   servicePricesNumber: 0,
   servicesPercent: {},
   servicesNumber: {},
   init: function () {
      this.addTitle();
      button.addEventListener('click', this.nullResult);
      plus.addEventListener('click', this.addScreenBlock);
      inputType.addEventListener('input', this.addRange);
      inputType.addEventListener('change', this.addRange);
      but1.addEventListener('click', this.reset);
   },
   addTitle: function () {
      document.title = title.textContent;
   },
   isError: false,
   nullResult: function () {
      screens = document.querySelectorAll('.screen');
      screens.forEach((screen) => {
         const select = screen.querySelector('select');
         const input = screen.querySelector('input');
         if (select.value === '' || input.value === '') {
            console.log('Заполни все области экранов');
            this.isError = true;
         } else {
            this.isError = false;
         }
      })
      if (!this.isError) {
         newStart();
      }
   },
   start: start,
   showResult: function () {
      total.value = this.screenPrice;
      totalCountOther.value = this.servicePricesNumber + this.servicePricesPercent;
      fullTotalCount.value = this.fullPrice;
      totalCountRollback.value = this.servicePercentPrice;
      totalCount.value = this.quantity;
   },
   addRange: function (e) {
      spanRange.textContent = `${e.target.value}`;
      appData.rollback = spanRange.textContent;
   },
   addScreens: function () {
      screens = document.querySelectorAll('.screen');
      screens.forEach((screen, index) => {
         const input = screen.querySelector('input');
         const select = screen.querySelector('select');
         const selectName = select.options[select.selectedIndex].textContent;
         this.screens.push({
            id: index,
            name: selectName,
            count: +input.value,
            price: +select.value * +input.value
         });
      });
   },
   addServices: function () {
      otherItemsPercent.forEach((item) => {
         const check = item.querySelector('input[type=checkbox]');
         const label = item.querySelector('label');
         const input = item.querySelector('input[type=text]');

         if (check.checked) {
            this.servicesPercent[label.textContent] = +input.value;
         }
      });

      otherItemsNumber.forEach((item) => {
         const check = item.querySelector('input[type=checkbox]');
         const label = item.querySelector('label');
         const input = item.querySelector('input[type=text]');

         if (check.checked) {
            this.servicesNumber[label.textContent] = +input.value;
         }
      });
   },
   addScreenBlock: function () {
      const cloneScreen = screens[0].cloneNode(true);
      screens[screens.length - 1].after(cloneScreen);
   },

   addPrices: function () {
      for (let screen of this.screens) {
         this.screenPrice += + screen.price;
         this.quantity += + screen.count;
      }
      for (let key in this.servicesNumber) {
         this.servicePricesNumber += this.servicesNumber[key];
      }
      for (let key in this.servicesPercent) {
         this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100);
      }
      this.fullPrice = +this.screenPrice + this.servicePricesPercent + this.servicePricesNumber;

      this.servicePercentPrice = this.fullPrice - (this.fullPrice * (this.rollback / 100));

   },
   reset: function () {
      but1.style.display = 'none';
      button.style.display = 'block';
      plus.disabled = false;
      for (let item of inp) {
         item.disabled = false;
      }
      for (let item of sel) {
         item.disabled = false
      }
      for (let item of che) {
         item.disabled = false;
      }

      total.value = '';
      totalCount.value = '';;
      totalCountOther.value = '';
      fullTotalCount.value = '';
      totalCountRollback.value = '';
      for (let item of inp) {
         item.value = '';
      }
      for (let item of sel) {
         item.value = '';
      }
      for (let item of che) {
         item.checked = false;
      }
   },
   logger: function () {
      console.log(this.fullPrice);
      console.log(this.servicePercentPrice);
      console.log(this.screens);
   }
};

function start() {
   this.addScreens();
   this.addServices();
   this.addPrices();
   //appData.logger();
   this.showResult();

   for (let item of inp) {
      item.disabled = true;
   }
   for (let item of sel) {
      item.disabled = true;
   }
   for (let item of che) {
      item.disabled = true;
   }
   plus.disabled = true;
   button.style.display = 'none';
   but1.style.display = 'block';
}
const newStart = start.bind(appData);


appData.init();


//document.querySelector("select").addEventListener("click", function () {
 //  this.disabled = true;
//});
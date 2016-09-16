(function($) {
  'use strict';

  var app = (function() {
    return {
      init: function init() {
        this.companyInfo();
        this.initEvents();
      },

      initEvents: function initEvents() {
        $('[data-js="form-register"]').on('submit', this.handleFormRegister)
      },

      handleFormRegister: function handleFormRegister(e) {
        e.preventDefault();
        var $carsList = $('[data-js="cars-list"]').get();
        $carsList.appendChild(app.createNewCar());
        app.clearFormRegister();
      },

      createNewCar: function createNewCar() {
        var $fragment = document.createDocumentFragment();
        var $tr = document.createElement('tr');
        var $tdImage = document.createElement('td');
        var $image = document.createElement('img');
        var $tdBrand = document.createElement('td');
        var $tdYear = document.createElement('td');
        var $tdSign = document.createElement('td');
        var $tdColor = document.createElement('td');

        $image.setAttribute('src', $('[data-js="input-image"]').get().value)
        $tdImage.appendChild($image);

        $tdBrand.textContent = $('[data-js="input-brand"]').get().value;
        $tdYear.textContent = $('[data-js="input-year"]').get().value;
        $tdSign.textContent = $('[data-js="input-sign"]').get().value;
        $tdColor.textContent = $('[data-js="input-color"]').get().value;

        $tr.appendChild($tdImage);
        $tr.appendChild($tdBrand);
        $tr.appendChild($tdYear);
        $tr.appendChild($tdSign);
        $tr.appendChild($tdColor);

        return $fragment.appendChild($tr);
      },

      clearFormRegister: function clearFormRegister() {
        $('[data-js="input-image"]').get().value = '';
        $('[data-js="input-brand"]').get().value = '';
        $('[data-js="input-year"]').get().value = '';
        $('[data-js="input-sign"]').get().value = '';
        $('[data-js="input-color"]').get().value = '';
      },

      companyInfo: function companyInfo() {
        var ajax = new XMLHttpRequest();
        ajax.open('GET', '/company.json', true);
        ajax.send();
        ajax.addEventListener('readystatechange', this.getCompanyInfo, false);
      },

      getCompanyInfo: function getCompanyInfo() {
        if(!app.isReady.call(this))
          return;

        var data = JSON.parse(this.responseText);
        var $companyName = $('[data-js="company-name"]').get();
        var $companyPhone = $('[data-js="company-phone"]').get();
        $companyName.textContent = data.name;
        $companyPhone.textContent = data.phone;
      },

      isReady: function isReady() {
        return this.readyState === 4 && this.status === 200;
      }

    };
  })();

  app.init();

})(window.DOM);

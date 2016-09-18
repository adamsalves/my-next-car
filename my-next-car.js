(function($, doc) {
  'use strict';

  var app = (function() {
    return {
      init: function init() {
        this.handleCompanyInfo();
        this.initEvents();
      },

      initEvents: function initEvents() {
        $('[data-js="form-register"]').on('submit', this.handleFormRegister, false);
      },

      handleFormRegister: function handleFormRegister(e) {
        e.preventDefault();
        var $carsList = $('[data-js="cars-list"]').get();
        $carsList.appendChild(app.createNewCar());
        app.clearFormRegister();
      },

      createNewCar: function createNewCar() {
        var $fragment = doc.createDocumentFragment();
        var $tr = doc.createElement('tr');
        var $tdImage = doc.createElement('td');
        var $image = doc.createElement('img');
        var $tdBrand = doc.createElement('td');
        var $tdYear = doc.createElement('td');
        var $tdSign = doc.createElement('td');
        var $tdColor = doc.createElement('td');

        $image.setAttribute('src', $('[data-js="input-image"]').get().value);
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

      handleCompanyInfo: function handleCompanyInfo() {
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

})(window.DOM, document);

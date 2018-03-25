'use strict';

var controlsSelectBranch = window.document.getElementsByClassName('controls__select-branch')[0];
var fileBtnBack = document.getElementsByClassName('file__btn-back')[0];

controlsSelectBranch.onchange = function () {
  location.pathname = controlsSelectBranch.value;
};

fileBtnBack.onclick = function (e) {
  location.pathname = e.currentTarget.dataset.goBack;
};
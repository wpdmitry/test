'use strict';

var controlsSelectBranch = document.getElementsByClassName('controls__select-branch')[0];
var commitsList = document.getElementsByClassName('commits__list')[0];

controlsSelectBranch.onchange = function () {
  location.pathname = controlsSelectBranch.value;
};

commitsList.onclick = function (e) {
  var commitsItem = e.target.closest('[data-go]');

  location.pathname = commitsItem.dataset.go;
};
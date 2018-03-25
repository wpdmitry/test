'use strict';

var controlsSelectBranch = document.getElementsByClassName('controls__select-branch')[0];
var fileStructureList = document.getElementsByClassName('tree__list')[0];

controlsSelectBranch.onchange = function () {
  location.pathname = controlsSelectBranch.value;
};

fileStructureList.onclick = function (e) {
  var treeItem = e.target.closest('.tree__item');

  location.pathname = treeItem.dataset.go;
};
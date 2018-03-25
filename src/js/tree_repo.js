const controlsSelectBranch = document.getElementsByClassName('controls__select-branch')[0];
const fileStructureList = document.getElementsByClassName('tree__list')[0];

controlsSelectBranch.onchange = () => {
  location.pathname = controlsSelectBranch.value;
};

fileStructureList.onclick = (e) => {
  const treeItem = e.target.closest('.tree__item');

  location.pathname = treeItem.dataset.go;
};




const controlsSelectBranch = document.getElementsByClassName('controls__select-branch')[0];
const commitsList = document.getElementsByClassName('commits__list')[0];

controlsSelectBranch.onchange = () => {
  location.pathname = controlsSelectBranch.value;
};

commitsList.onclick = (e) => {
  const commitsItem = e.target.closest('[data-go]');

  location.pathname = commitsItem.dataset.go;
};

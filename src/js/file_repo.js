const controlsSelectBranch = window.document.getElementsByClassName('controls__select-branch')[0];
const fileBtnBack = document.getElementsByClassName('file__btn-back')[0];

controlsSelectBranch.onchange = () => {
  location.pathname = controlsSelectBranch.value;
};

fileBtnBack.onclick = (e) => {
  location.pathname = e.currentTarget.dataset.goBack;
};

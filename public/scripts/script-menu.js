// Menu code-------------------
// 1. Listen for click on the first level menu
// 2. When clicked display the appropriate menu by adding an 'active' class

(function menu() {
  const menuBranches = document.querySelectorAll('.menu__topic');
  const dropDownContentArr = document.querySelectorAll('.drop-down-content');
  // const arrows = document.querySelectorAll('.menu__arrow');

  menuBranches.forEach((branch, index) => {
    branch.addEventListener('click', () => {
      dropDownContentArr.forEach((item, i) => {
        if (index === i) {
          item.classList.toggle('open');
        } else {
          item.classList.remove('open');
        }
      });
      menuBranches.forEach((branch2, index2) => {
        if (index2 === index) {
          branch2.classList.toggle('menu__topic-active');
        } else {
          branch2.classList.remove('menu__topic-active');
        }
      });
    });
  });
}());

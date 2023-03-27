const linkList = Array.from(document.getElementsByClassName('menu__link'));

linkList.forEach((link) => link.onclick = () => {
    const parentMenuItem = link.closest("li");
    const parentMenu = link.closest('ul');
    const subMenuList = Array.from(parentMenu.querySelectorAll('ul'));
    const subMenu = parentMenuItem.querySelector("ul");
    console.log(subMenuList);
    if (subMenu) {
        if (subMenu.classList.contains('menu_active')) {
            subMenu.classList.remove('menu_active');
        } else {
            subMenuList.forEach((subMenu) => subMenu.classList.remove('menu_active'))
            subMenu.classList.add('menu_active');
        }
        return false;
    }
});

const tabs1 = document.getElementById('tabs1');

function switchTab (index, evt) {
    const tabs = evt.currentTarget.closest('.tabs');
    const tabContentList = tabs.querySelectorAll('.tab__content');
    const tabList = tabs.querySelectorAll('.tab');
    if (tabContentList[index].classList.contains('tab__content_active')) {
        return;
    } else {
        closeActive(tabContentList, 'tab__content_active');
        closeActive(tabList, 'tab_active')
        tabContentList[index].classList.add('tab__content_active')
        tabList[index].classList.add('tab_active')
    };
};

function closeActive(list, classForRemove) {
    list.forEach((item) => {
        item.classList.remove(classForRemove);
    });
};

tabs1.querySelectorAll('.tab').forEach((tab, index) => {
    tab.addEventListener('click', switchTab.bind(null, index));
});
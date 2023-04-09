let hasTooltipList = document.querySelectorAll('.has-tooltip');
let positionTooltip = 'top';

hasTooltipList.forEach(el => {
    el.insertAdjacentHTML("afterend", `<div class="tooltip" data-position=${positionTooltip}>${el.title}</div>`);
    el.addEventListener('click', showTooltip);
});

function showTooltip (ev) {
    let {top, bottom, right, left} = ev.currentTarget.getBoundingClientRect();
    ev.preventDefault();
    document.querySelectorAll('.tooltip').forEach(el => {
        el.classList.remove('tooltip_active');
    });
    let currentTooltip = ev.currentTarget.nextElementSibling;
    let whereToWithdraw = currentTooltip.dataset.position;
    ev.currentTarget.nextElementSibling.classList.add('tooltip_active');
    let heightTooltip = currentTooltip.getBoundingClientRect();
    console.log(currentTooltip.getBoundingClientRect())
    if (whereToWithdraw == 'top') {
        currentTooltip.setAttribute('style', `left: ${left}px; top: ${top - heightTooltip.height}px`);
    } else if (whereToWithdraw == 'bottom') {
        currentTooltip.setAttribute('style', `left: ${left}px; top: ${bottom}px`);
    } else if (whereToWithdraw == 'right') {
        currentTooltip.setAttribute('style', `left: ${right}px; top: ${top}px`);
    } else if (whereToWithdraw == 'left') {
        currentTooltip.setAttribute('style', `left: ${left - heightTooltip.width}px; top: ${top}px`);
    };
};
export function createBtnWithTooltip(icon, text, tooltipPosition = 'bottomright') {
    var button = document.createElement('button');
    if (typeof icon === 'string') button.innerHTML = icon;
    else button.appendChild(icon);

    var tooltip = document.createElement('span');
    tooltip.innerText = text;

    if (tooltipPosition === 'topleft') tooltip.className = 'tooltiptext tooltip-right tooltip-bottom';
    else if (tooltipPosition === 'topright') tooltip.className = 'tooltiptext tooltip-left tooltip-bottom';
    else if (tooltipPosition === 'bottomleft') tooltip.className = 'tooltiptext tooltip-right tooltip-top';
    else tooltip.className = 'tooltiptext tooltip-left tooltip-top';

    var container = document.createElement('span');
    container.className = 'tooltip';
    container.append(button, tooltip);

    return [button, tooltip, container];
}

export const SAVE_ICON = '<i class="fa fa-book" aria-hidden="true"></i>';
export const CITE_ICON = '<i class="fa fa-quote-right" aria-hidden="true"></i>';
export const CLOSE_ICON = '<i class="fa fa-close" aria-hidden="true"></i>';
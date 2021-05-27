export class TextPopup {
    constructor(container) {
        if(!container) return;
        this.container = container;
        this.init();
    }

    init() {
        var aDoms = Array.from(this.container.getElementsByTagName('a'));
        var internalADoms = aDoms.filter(a => a.href ? ['engineeringhistoricalmemory.com', 'localhost'].includes((new URL(a.href)).hostname) : false);
        var externalADoms = aDoms.filter(a => a.href ? !['engineeringhistoricalmemory.com', 'localhost'].includes((new URL(a.href)).hostname) : false);
        externalADoms.forEach(aDom => aDom.target = '_blank');

        var extIframeDom = document.createElement('iframe');
        var extDivClose = document.createElement('span');
        extDivClose.innerHTML = '&times;';
        var extDivDom = document.createElement('div');
        extDivDom.className = 'ext-biblio';
        extDivDom.append(extIframeDom, extDivClose);
        this.container.appendChild(extDivDom);

        for (let aDom of internalADoms) {
            aDom.onclick = e => {
                e.preventDefault();
                extDivDom.style.display = 'block';
                extIframeDom.src = aDom.href;
                extDivDom.style.left = Math.min(this.container.offsetWidth - extDivDom.offsetWidth - 35, e.layerX) + "px";
                extDivDom.style.top = this.container.scrollTop + e.layerY + 10 + "px";
            }
        }
        extDivClose.onclick = () => extDivDom.style.display = 'none';
    }
}
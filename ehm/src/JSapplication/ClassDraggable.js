export class Draggable {
    constructor(container, fullScreentBtn=true, ratio=4 / 3) {
        this.container = container;
        this.ratio = ratio;
        this.init();
        if(fullScreentBtn) this.createFullScreenBtn();
    }

    init() {
        var _thisRef = this;
        var closeBtn = document.createElement('span');
        closeBtn.innerHTML = '&times;';
        this.header = document.createElement('div');
        this.header.className = 'draggable-header';
        this.header.appendChild(closeBtn);
        this.body = document.createElement('div');
        this.body.className = 'draggable-body';
        this.container.append(this.header, this.body);
        closeBtn.onclick = () => this.container.style.display = 'none';
        $(function () {
            $(_thisRef.container).resizable({aspectRatio: _thisRef.ratio});
            $(_thisRef.container).draggable({handle: '.draggable-header'});
        });
    }

    createFullScreenBtn() {
        var fullScreenIcon = document.createElement('img');
        fullScreenIcon.src = "Images/fullscreen.ico";

        var fullscreenBtn = document.createElement('button');
        fullscreenBtn.appendChild(fullScreenIcon);

        fullscreenBtn.onclick = () => {
            if (document.fullscreenElement) {
                closeFullscreen();
                this.height = this.initialHeight;
            }
            else {
                openFullscreen(this.body);
                this.height = screen.height;
            }
        };

        document.addEventListener("fullscreenchange", function (event) {
            if (document.fullscreenElement) {
                fullScreenIcon.src = "Images/collapse.png";
                elementTooltip.innerText = 'Exit full screen';
            } else {
                fullScreenIcon.src = "Images/fullscreen.ico";
                elementTooltip.innerText = 'Full screen';
            }
        });

        var elementTooltip = document.createElement('span');
        elementTooltip.className = 'tooltiptext tooltip-right tooltip-bottom';
        elementTooltip.innerText = 'Full screen';

        var element = document.createElement('div');
        element.className = 'fullscreen ol-unselectable ol-control tooltip';
        element.append(fullscreenBtn, elementTooltip);

        this.body.appendChild(element);

        function openFullscreen(elem) {
            if (elem.requestFullscreen) elem.requestFullscreen();
            else if (elem.mozRequestFullScreen) elem.mozRequestFullScreen();
            else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
            else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
        }

        function closeFullscreen() {
            if (document.exitFullscreen) document.exitFullscreen();
            else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
            else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
            else if (document.msExitFullscreen) document.msExitFullscreen();
        }
    }

    show(){
        this.container.style.display = 'block';
    }

    hide(){
        this.container.style.display = 'none';
    }
}
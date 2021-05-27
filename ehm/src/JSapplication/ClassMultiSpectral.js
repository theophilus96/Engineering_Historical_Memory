export class MultiSpectral {
    constructor(container, img1, img2, img3, img4, chooseMapAction) {
        this.img1Path = `Images/multi-spectral/${img1}`;
        this.img2Path = `Images/multi-spectral/${img2}`;
        this.img3Path = `Images/multi-spectral/${img3}`;
        this.img4Path = `Images/multi-spectral/${img4}`;
        this.container = document.getElementById(container);
        this.chooseMapAction = chooseMapAction;

        // this.container.style.position = 'relative';
        this.height = this.initialHeight = this.container.parentElement.offsetHeight;
        this.init();
        this.createFullScreenBtn();
    }

    createImgCont(path, id, name) {
        var img = document.createElement('img');
        img.src = path;
        img.style.height = this.height + "px";
        img.style.width = this.height + "px";
        var container = document.createElement('div');
        container.id = id;
        container.append(img);
        this.container.append(container);

        var btn = document.createElement('button');
        btn.innerHTML = name + ' spectrum';
        btn.style.width = '5em';
        btn.style.fontWeight = 'unset';
        btn.style.height = 'unset';
        btn.style.lineHeight = 'unset';
        var btnCont = document.createElement('div');
        btnCont.id = id + 'Btn';
        btnCont.className = 'ol-control';
        btnCont.appendChild(btn);
        this.container.parentElement.appendChild(btnCont);

        btn.onclick = () => this.chooseMapAction(`Zoomify/Multispectral/${name}/`);
        return container;
    }

    init() {
        this.container.innerHTML = '';
        this.container.style.width = this.height + "px";
        this.container.style.height = this.height + "px";
        var cont1 = this.createImgCont(this.img1Path, 'multiSpectral1', 'Visible');
        var cont2 = this.createImgCont(this.img2Path, 'multiSpectral2', 'Infrared');
        var cont3 = this.createImgCont(this.img3Path, 'multiSpectral3', 'Tangential');
        var cont4 = this.createImgCont(this.img4Path, 'multiSpectral4', 'Ultraviolet');
        var _thisRef = this;

        this.container.addEventListener('mousemove', function (e) {
            var rect = e.target.getBoundingClientRect();
            var curCursorX = e.clientX - rect.left;
            var curCursorY = e.clientY - rect.top;

            // if (e.pageX || e.pageY) {
            //     var curCursorX = e.pageX;
            //     var curCursorY = e.pageY;
            // } else {
            //     curCursorX = e.clientX + document.body.scrollLeft;
            //     curCursorY = e.clientY + document.body.scrollTop;
            // }

            cont1.style.height = curCursorY + "px";
            cont1.style.width = curCursorX + "px";
            cont2.style.height = curCursorY + "px";
            cont2.style.width = _thisRef.height - curCursorX + "px";
            cont3.style.height = _thisRef.height - curCursorY + "px";
            cont3.style.width = curCursorX + "px";
            cont4.style.height = _thisRef.height - curCursorY + "px";
            cont4.style.width = _thisRef.height - curCursorX + "px";
        })
    }


    createFullScreenBtn() {
        var _thisRef = this;
        var fullScreenIcon = document.createElement('img');
        fullScreenIcon.src = "Images/fullscreen.ico";

        var fullscreenBtn = document.createElement('button');
        fullscreenBtn.appendChild(fullScreenIcon);

        fullscreenBtn.onclick = function () {
            if (document.fullscreenElement) {
                closeFullscreen();
                _thisRef.height = _thisRef.initialHeight;
                _thisRef.init();
            }
            else {
                openFullscreen(_thisRef.container.parentElement);
                _thisRef.height = screen.height;
                _thisRef.init();
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
        element.style.bottom = 'calc(2% + 55px)';
        element.className = 'fullscreen ol-unselectable ol-control tooltip';
        element.append(fullscreenBtn, elementTooltip);

        this.container.parentElement.appendChild(element);

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
}
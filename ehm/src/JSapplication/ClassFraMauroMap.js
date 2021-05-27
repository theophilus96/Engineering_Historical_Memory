import {HistMap} from "./ClassHistMap.js";

export class FraMauroMap extends HistMap{
    fm_init(videoAction, multiSpectralAction){
        this.videoAction = videoAction;
        this.multiSpectralAction = multiSpectralAction;
        this.createVideoBtn();
        this.createMultiSpectralBtn();
    }


    createVideoBtn(){
        var [btn, tooltip, container] = this.createBtn('<img src="Images/icons/play.ico">', 'Digital Recomposition', 'topright');
        this.videoBtn = btn;
        container.style.bottom = `calc(2% + 40px)`;
        container.style.left = '2%';

        btn.addEventListener('click', () => {
            this.videoAction();
        });
    }

    createMultiSpectralBtn(){
        var [btn, tooltip, container] = this.createBtn('<img src="Images/icons/multi_spectral.png">', 'Multispectral Analysis', 'topright');
        container.style.bottom = 'calc(2% + 80px)';
        container.style.left = '2%';

        btn.addEventListener('click', () => {
            this.multiSpectralAction();
        });
    }
}
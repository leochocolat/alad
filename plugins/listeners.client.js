import DeviceUtils from '~/assets/javascript/utils/DeviceUtils';
import Emitter from '~/assets/javascript/events/Emitter';
import ResizeManager from '~/assets/javascript/managers/ResizeManager';
import ScrollManager from '~/assets/javascript/managers/ScrollManager';
ScrollManager.enableSmooth();

export default ({ store }) => {
    function setup() {
        store.dispatch('device/isModule', DeviceUtils.isMobile());    
        store.dispatch('device/isTactile', DeviceUtils.isTouch());
        
        setupEventListener();
    }

    function setupEventListener () {
        ResizeManager.addEventListener('resize', resizeHandler);
        ResizeManager.addEventListener('resize:end', resizeEndHandler);

        ScrollManager.addEventListener('scroll', scrollHandler);
        ScrollManager.addEventListener('scroll:end', scrollEndHandler);
    }

    function resizeHandler(e) {
        Emitter.emit('RESIZE', e);
    }

    function resizeEndHandler(e) {
        Emitter.emit('RESIZE:END', e);
    }

    function scrollHandler(e) {
        Emitter.emit('SCROLL', e);
    }

    function scrollEndHandler(e) {
        Emitter.emit('SCROLL:END', e);
    }

    setup();
}

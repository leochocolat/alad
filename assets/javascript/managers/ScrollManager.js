import EventDispatcher from '../events/EventDispatcher';
import bindAll from '../utils/bindAll';
import lerp from '../utils/lerp';

import { gsap } from 'gsap';
import VirtualScroll from 'virtual-scroll';
const virtualScroll = new VirtualScroll({ e: window });

const SMOOTH = 0.15;
const THROTTLE_VALUE = 300;

class ScrollManager extends EventDispatcher {
    constructor() {
        super();

        bindAll(
            this,
            '_scrollHandler',
            '_scrollEndHandler',
            '_tickHandler'
        );

        this._isScrollEnable = true;
        this._scroll = { x: 0, y: 0, deltaX: 0, deltaY: 0, directionX: undefined, directionY: undefined };
        this._smoothScroll = { x: 0, y: 0, deltaX: 0, deltaY: 0, directionX: undefined, directionY: undefined };

        this._isSmooth = true;

        this._setup();
    }

    /**
    * Public
    */
    enable() {
        this._isScrollEnable = true;
    }

    disable() {
        this._isScrollEnable = false;
    }

    enableSmooth() {
        this._setupSmoothScroll();
    }

    getDelta() {
        return this._isSmooth ? { x: this._smoothScroll.deltaX, y: this._smoothScroll.deltaY } : { x: this._scroll.deltaX, y: this._scroll.deltaY }
    }

    getPosition() {
        return this._isSmooth ? { x: this._smoothScroll.x, y: this._smoothScroll.y } : { x: this._scroll.x, y: this._scroll.y }
    }

    reset() {
        this._scroll = { x: 0, y: 0, deltaX: 0, deltaY: 0, direction: undefined };
        this._smoothScroll = { x: 0, y: 0, deltaX: 0, deltaY: 0, direction: undefined };
    }

    /**
    * Private
    */
    _setup() {
        this._setupEventListeners();
    }

    _setupSmoothScroll() {
        this._isSmooth = true;

        gsap.ticker.add(this._tickHandler);
    }

    _updateValues(e) {
        this._scroll.x = e.x;
        this._scroll.y = e.y;
        this._scroll.deltaX = e.deltaX;
        this._scroll.deltaY = e.deltaY;
        this._scroll.directionX = Math.sign(e.deltaX);
        this._scroll.directionY = Math.sign(e.deltaY);
    }

    _updateSmoothValues() {
        const x = lerp(this._smoothScroll.x, this._scroll.x, SMOOTH);
        const y = lerp(this._smoothScroll.y, this._scroll.y, SMOOTH);

        this._smoothScroll.deltaX = (x - this._smoothScroll.x).toFixed(2);
        this._smoothScroll.deltaY = (y - this._smoothScroll.y).toFixed(2);

        this._smoothScroll.directionX = Math.sign(this._smoothScroll.deltaY);
        this._smoothScroll.directionY = Math.sign(this._smoothScroll.deltaY);

        this._smoothScroll.x = x.toFixed(2);
        this._smoothScroll.y = y.toFixed(2);

        if (this._smoothScroll.deltaY != 0 || this._smoothScroll.deltaX != 0) {
            this._smoothScrollHandler();
        }
    }

    _setupEventListeners() {
        virtualScroll.on(this._scrollHandler);
    }

    _scrollHandler(e) {
        if (!this._isScrollEnable) return;

        this._updateValues(e);

        if (this._isSmooth) return;
        this.dispatchEvent('scroll', this._scroll);

        clearTimeout(this._scrollTimeout);
        this._scrollTimeout = setTimeout(this._scrollEndHandler, THROTTLE_VALUE);
    }

    _smoothScrollHandler() {
        this.dispatchEvent('scroll', this._smoothScroll);

        clearTimeout(this._smoothScrollTimeout);
        this._smoothScrollTimeout = setTimeout(this._scrollEndHandler, THROTTLE_VALUE);
    }

    _scrollEndHandler() {
        const payload = this._isSmooth ? this._smoothScroll : this._scroll;
        this.dispatchEvent('scroll:end', payload);
    }

    _tickHandler() {
        this._updateSmoothValues();
    }
}

export default new ScrollManager();
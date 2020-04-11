//events
import Emitter from '../events/Emitter';

//utils
import bindAll from '../utils/bindAll';
import normalize from '../utils/normalize';

//vendor
import * as THREE from 'three';
import { gsap } from 'gsap';

//modules
import ThreeImagesGrid from '../modules/ThreeImagesGrid';

const PESPECTIVE = 800;

class ThreeSceneComponent {
    constructor(options) {
        this.el = options.el;

        bindAll(
            this,
            '_resizeHandler',
            '_tickHandler',
            '_mousemoveHandler',
            '_loadedHandler'
        );

        this.sceneEntities = {};

        this._mouse = new THREE.Vector2();
        this._normalizedMouse = new THREE.Vector2();

        this._setup();
    }

    //public
    start() {
        this._setupEventListeners();
    }

    stop() {
        this._removeEventListeners();
    }

    //private
    _setup() {
        this._setupThreeScene();
        this._setupImagesGrid();
        this._resize();
    }

    _setupThreeScene() {
        this._scene = new THREE.Scene();

        const fov = (180 * (2 * Math.atan(window.innerHeight/2/PESPECTIVE))) / Math.PI;
        this._camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 1, 1000);
        this._camera.position.set(0, 0, PESPECTIVE);

        this._renderer = new THREE.WebGLRenderer({
            canvas: this.el,
            alpha: true,
            antialias: true,
        });
        
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        this._renderer.setPixelRatio(window.devicePixelRatio);
    }

    _setupImagesGrid() {
        let grid = new ThreeImagesGrid({
            width: this._width,
            height: this._height,
            scene: this._scene
        });

        this.sceneEntities.imageGrid = grid;
    }

    _resize() {
        this._width = window.innerWidth;
        this._height = window.innerHeight;

        this._renderer.setSize(this._width, this._height);
        this._renderer.setPixelRatio(window.devicePixelRatio);

        this._camera.fov = (180 * (2 * Math.atan(this._height / 2 / PESPECTIVE))) / Math.PI;
        this._camera.aspect = this._width / this._height;
        this._camera.updateProjectionMatrix();
    }

    _tick() {
        this._renderer.render(this._scene, this._camera);
    }

    _setupEventListeners() {
        window.addEventListener('resize', this._resizeHandler);
        window.addEventListener('mousemove', this._mousemoveHandler);
        gsap.ticker.add(this._tickHandler);

        Emitter.on('LOADING:PROGRESS', this._loadProgressHandler, { passive: true });
        Emitter.on('LOADING:DONE', this._loadedHandler, { passive: true });
    }

    _removeEventListeners() {
        window.removeEventListener('resize', this._resizeHandler);
        gsap.ticker.remove(this._tickHandler);
    }

    _resizeHandler() {
        this._resize();
    }

    _tickHandler() {
        this._tick();
    }

    _loadedHandler(e) {
        console.log('three', e);
    }

    _loadProgressHandler(e) {
        console.log('three', e.progress);
    }

    _mousemoveHandler(e) {
        const mousePosition = { x: e.clientX, y: e.clientY };
        const normalizePosition = normalize(mousePosition, this._width, this._height);

        this._mouse.x = mousePosition.x;
        this._mouse.y = mousePosition.y;

        this._normalizedMouse.x = normalizePosition.x;
        this._normalizedMouse.y = normalizePosition.y;
    }
}

export default ThreeSceneComponent;
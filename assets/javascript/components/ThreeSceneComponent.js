//events
import Emitter from '../events/Emitter';

//utils
import bindAll from '../utils/bindAll';
import normalize from '../utils/normalize';

//vendor
import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
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
            '_loadedHandler',
            '_clickHandler'
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
        this._resize();
    }

    _setupThreeScene() {
        this._scene = new THREE.Scene();

        const fov = (180 * (2 * Math.atan(window.innerHeight/2/PESPECTIVE))) / Math.PI;
        this._camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 1, 1000);
        this._camera.position.set(0, 0, PESPECTIVE);

        this._raycaster = new THREE.Raycaster();

        this._renderer = new THREE.WebGLRenderer({
            canvas: this.el,
            alpha: true,
            antialias: true,
        });
        
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        this._renderer.setPixelRatio(window.devicePixelRatio);

        // this._controls = new OrbitControls(this._camera, this._renderer.domElement);
    }

    _setupImagesGrid(images) {
        let grid = new ThreeImagesGrid({
            width: this._width,
            height: this._height,
            scene: this._scene,
            images: images
        });

        this.sceneEntities.imageGrid = grid;
    }

    _raycast() {
        this._raycaster.setFromCamera(this._normalizedMouse, this._camera);
        let intersects = this._raycaster.intersectObjects(this._scene.children);

        this._currentMouseTarget = intersects[0];
    }

    _resize() {
        this._width = window.innerWidth;
        this._height = window.innerHeight;

        for (let i in this.sceneEntities) {
            if (!this.sceneEntities[i].resize) continue;
            this.sceneEntities[i].resize();
        }

        this._renderer.setSize(this._width, this._height);
        this._renderer.setPixelRatio(window.devicePixelRatio);

        this._camera.fov = (180 * (2 * Math.atan(this._height / 2 / PESPECTIVE))) / Math.PI;
        this._camera.aspect = this._width / this._height;
        this._camera.updateProjectionMatrix();
    }

    _tick() {
        for (let i in this.sceneEntities) {
            if (!this.sceneEntities[i].update) continue;
            this.sceneEntities[i].update();
        }

        this._renderer.render(this._scene, this._camera);
    }

    _setupEventListeners() {
        window.addEventListener('resize', this._resizeHandler);
        window.addEventListener('mousemove', this._mousemoveHandler);
        window.addEventListener('click', this._clickHandler);
        gsap.ticker.add(this._tickHandler);

        Emitter.on('LOADING:DONE', this._loadedHandler, { passive: true });
    }

    _removeEventListeners() {
        window.removeEventListener('resize', this._resizeHandler);
        window.removeEventListener('mousemove', this._mousemoveHandler);
        window.removeEventListener('click', this._clickHandler);
        gsap.ticker.remove(this._tickHandler);
    }

    _resizeHandler() {
        this._resize();
    }

    _tickHandler() {
        this._tick();
    }

    _loadedHandler(e) {
        const images = e.images;
        this._setupImagesGrid(images);
    }

    _mousemoveHandler(e) {
        const mousePosition = { x: e.clientX, y: e.clientY };

        this._mouse.x = mousePosition.x;
        this._mouse.y = mousePosition.y;

        this._normalizedMouse = normalize(this._mouse, this._width, this._height);

        this._raycast();
    }

    _clickHandler() {
        if (!this._currentMouseTarget) return;

        const title = this._currentMouseTarget.object.title;
        const tag = this._currentMouseTarget.object.tag;
    }
}

export default ThreeSceneComponent;
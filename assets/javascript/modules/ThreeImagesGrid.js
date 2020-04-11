import ThreeImage from './ThreeImage';
import Emitter from '../events/Emitter';
import bindAll from '../utils/bindAll';
import normalize from '../utils/normalize';

import * as THREE from 'three';

const WIDTH = 500;

class ThreeImagesGrid {
    constructor(options) {
        const { width, height, scene, images } = options;

        //public
        this.images = images;
        this.threeImages = [];
        this.meshImages = [];

        //pritate
        this._width = width;
        this._height = height;
        this._scene = scene;

        bindAll(this, '_scrollHandler');
        
        this._setup();
    }

    //public
    update() {
        for (let i = 0; i < this.threeImages.length; i++) {
            if (!this.threeImages[i].update) continue;
            this.threeImages[i].update();
        }
    }

    resize() {
        for (let i = 0; i < this.threeImages.length; i++) {
            if (!this.threeImages[i].resize) continue;
            this.threeImages[i].resize();
        }
    }

    //private
    _setup() {
        this._setupPosition();
        this._createImages();
        this._setupEventListeners();
    }

    _setupPosition() {
        this._positions = [];

        const padding = 50;

        for (let i = 0; i < this.images.length; i++) {
            const x = (WIDTH + padding) * i;
            const y = 0;
            const z = 0;
            
            let vector = new THREE.Vector3();
            vector.set(x, y, z);

            this._positions.push(vector);
        }
    }

    _createImages() {
        this._threeImages = [];

        for (let i = 0; i < this._positions.length; i++) {
            const width = WIDTH;
            const height = this.images[i].height / this.images[i].width * width;

            let threeImage = new ThreeImage(
                this.images[i],
                this.images[i].texture,
                this._positions[i],
                width,
                height
            );

            let mesh = threeImage.getMesh();

            this.meshImages.push(mesh);
            this.threeImages.push(threeImage);

            this._scene.add(mesh);
        }
    }

    _setupEventListeners() {
        Emitter.on('SCROLL', this._scrollHandler);
    }

    _scrollHandler(e) {
        for (let i = 0; i < this.threeImages.length; i++) {
            this.threeImages[i].setPosition(e.deltaY);
        }
    }
}

export default ThreeImagesGrid;
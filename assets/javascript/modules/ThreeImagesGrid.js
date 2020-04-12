import ThreeImage from './ThreeImage';
import Emitter from '../events/Emitter';
import bindAll from '../utils/bindAll';
import SimplexNoise from 'simplex-noise';
const simplex = new SimplexNoise(); 

const WIDTH = 200;

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
        this._setupContainerSize();
        this._setupPosition();
        this._createImages();
        this._setupEventListeners();
    }

    _setupContainerSize() {
        const amount = this.images.length;
        const concentration = 10;
        let factor = amount/concentration;

        this._container = {
            width: this._width * factor,
            height: this._height * factor,
        }

        console.log(this._container.width)
    }

    _setupPosition() {
        this._positions = [];

        const PADDING = 500;

        const limit = this.images.length;
        // const limit = 1;
        for (let i = 0; i < limit; i++) {
            const lastPos = this._positions[i - 1] ? this._positions[i - 1] : { x: 0, y: 0 };
            const randomX = simplex.noise2D(i * 10, lastPos.x);
            const randomY = simplex.noise2D(i * 10, lastPos.y);
            console.log(randomX, randomY);
            const x = randomX * (this._container.width - PADDING);
            const y = randomY * (this._container.height - PADDING);
            const z = 0;
            
            let vector = new THREE.Vector3();
            vector.set(x, y, z);

            this._positions.push(vector);
        }
    }

    _createImages() {
        this._threeImages = [];

        const limit = this._positions.length;
        // const limit = 1;
        for (let i = 0; i < limit; i++) {
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
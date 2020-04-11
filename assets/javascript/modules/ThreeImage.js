import * as THREE from 'three';

class ThreeImage {
    constructor(image, texture, position, width, height) {
        this.image = image
        this.position = position;
        this.texture = texture;
        this.width = width;
        this.height = height;

        this._setup();
    }

    getMesh() {
        return this.mesh;
    }

    setPosition(deltaX) {
        this.position.x += deltaX * 0.2;
        this.mesh.position.x = this.position.x;
    }

    update() {
        
    }
 
    _setup() {
        const geometry = new THREE.PlaneGeometry(1, 1, 1);

        const material = new THREE.MeshBasicMaterial({ 
            map: this.texture,
            side: THREE.DoubleSide,
        });

        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.name = this.image.title;
        this.mesh.tag = this.image.tag;
        this.mesh.position.set(this.position.x, this.position.y, this.position.z);
        this.mesh.scale.set(this.width, this.height, 1);
    }
}

export default ThreeImage;
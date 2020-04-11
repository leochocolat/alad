import * as THREE from 'three';

import vertex from '~/assets/glsl/vertex.glsl';
import fragment from '~/assets/glsl/fragment.glsl';

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
        this._uniforms.u_delta.value = deltaX * 0.003;
        this.position.x += deltaX * 0.2;
        this.mesh.position.x = this.position.x;
    }

    update() {
        
    }
 
    _setup() {
        const geometry = new THREE.PlaneGeometry(1, 1, 1);

        this._uniforms = {
            resolution: { value: new THREE.Vector2() },
            u_texture: { type: 't', value: this.texture },
            u_direction: { value: 1.0 },
            u_delta: { value: 0.0 }
        }

        const material = new THREE.ShaderMaterial({ 
            uniforms: this._uniforms,
            vertexShader: vertex,
            fragmentShader: fragment,
        });

        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.name = this.image.title;
        this.mesh.tag = this.image.tag;
        this.mesh.position.set(this.position.x, this.position.y, this.position.z);
        this.mesh.scale.set(this.width, this.height, 1);
    }
}

export default ThreeImage;
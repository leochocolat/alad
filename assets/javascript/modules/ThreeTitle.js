import fonts from '~/assets/data/fonts';

//modules
import fontsLoader from './fontsLoader';

//utils
import bindAll from '../utils/bindAll';

//vendor
import createTextGeometry from 'three-bmfont-text';
import MSDFShader from 'three-bmfont-text/shaders/msdf';

//glsl
import vertex from '~/assets/glsl/text/vertex.glsl';
import fragment from '~/assets/glsl/text/fragment.glsl';

class ThreeTitle {
    constructor(options) {
        const { font, content, color, scene, width, height } = options;

        //public
        this.font = font;
        this.content = content;
        this.color = color;

        this._scene = scene;
        this._width = width;
        this._height = height;

        this._setup();
    }

    //public
    update() {

    } 

    resize() {

    }

    getMesh() {
        return this.mesh;
    }

    setFont(font) {
        this.font = font;

        this._geometry = createTextGeometry({
            font: this.font[0],
            text: this.content,
        });

        this._material = new THREE.RawShaderMaterial(MSDFShader({
            map: this.font[1],
            color: this.color,
            side: THREE.DoubleSide,
            transparent: true,
            negate: false,
        }));

        this.mesh.geometry = this._geometry;
        this.mesh.material = this._material;
    }

    setContent(content) {
        this.content = content;

        this._geometry.update({
            text: content
        });

        this.mesh.geometry = this._geometry;
    }

    //private
    _setup() {
        this._geometry = createTextGeometry({
            font: this.font[0],
            text: this.content,
        });

        this._material = new THREE.RawShaderMaterial(MSDFShader({
            map: this.font[1],
            color: this.color,
            side: THREE.DoubleSide,
            transparent: true,
            negate: false,
        }));

        this.mesh = new THREE.Mesh(this._geometry, this._material);
        this.mesh.position.set(- this._width * 0.5, 0, -10);
        this.mesh.scale.set(10, 10, 10);
        this.mesh.rotation.set(Math.PI, 0, 0);

        this._scene.add(this.mesh);
    }
}

export default ThreeTitle;
import Emitter from '../events/Emitter';

import * as THREE from 'three';

const texturesLoader = (images) => {
    let promises = [];

    for (let i = 0; i < images.length; i++) {
        let promise = new Promise(resolve => {
            new THREE.TextureLoader().load(images[i].url, resolve);
        }).then(texture => {
            images[i].texture = texture;
            Emitter.emit('LOADING:PROGRESS', { progress: (i+1) / images.length * 100, images: images });
        });

        promises.push(promise);
    }

    return Promise.all(promises).then(() => {
        Emitter.emit('LOADING:DONE', { progress: 100, images: images });
    });
}

export default texturesLoader;
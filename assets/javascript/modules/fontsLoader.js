import loadFont from 'load-bmfont';

const fontsLoader = (fonts) => {
    let promises = [];

    for (let i = 0; i < fonts.length; i++) {
        let promise = Promise.all([
            new Promise(resolve => {
                loadFont(`${fonts[i].url}.fnt`, (err, font) => {
                    resolve(font)
                })
            }),
            new Promise(resolve => {
                new THREE.TextureLoader().load(`${fonts[i].url}.png`, texture => {
                    resolve(texture)
                });
            })
        ]);

        promises.push(promise);
    }

    return Promise.all(promises);
}

export default fontsLoader;
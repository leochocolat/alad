export default function normalizePosition(position, width, height) {
    let x = (position.x / width) * 2 - 1;
    let y = - (position.y / height) * 2 + 1;

    return { x: x, y: y };
}
function addFloor() {

    var floorGeometry = new THREE.PlaneGeometry(400,400);
    var floorMaterial = new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        roughness: 0.9,
        metalness: 0.0
    });
    var floorTexture = new THREE.TextureLoader().load('src/images/grass.jpg');
    floorTexture.repeat.set(8, 8);
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorMaterial.map = floorTexture;
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -90 * DEG_TO_RAD;
    floor.receiveShadow = true;
    floor.position.set(0, 0, 0);
    scene.add(floor);
    return floor;
}

function addBunny() {
    const geometry = new THREE.BoxGeometry( 10, 10, 10 );
    const material = new THREE.MeshStandardMaterial( {
        color: 0x74512d,
        roughness: 0.8,
        metalness: 0.0
    } );
    const bunny = new THREE.Mesh( geometry, material );
    bunny.position.set(0, 5, 0);
    bunny.castShadow = true;
    scene.add( bunny );
    return bunny;
}
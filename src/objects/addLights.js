function addLights() {

    var ambientLight = new THREE.AmbientLight(0xffffff);
    ambientLight.intensity = 0.5;
    scene.add(ambientLight);

    var directionaLight = new THREE.DirectionalLight(0xffffff);
    directionaLight.position.set(-50, 150, 200);
    directionaLight.lookAt(scene.position);
    directionaLight.intensity = 0.5;
    directionaLight.castShadow = true;
    directionaLight.shadow.radius = 2;
    directionaLight.shadow.camera.top = 100;
    directionaLight.shadow.camera.bottom = -100;
    directionaLight.shadow.camera.left = -100;
    directionaLight.shadow.camera.right = 100;
    directionaLight.shadow.mapSize.width = 2048;
    directionaLight.shadow.mapSize.height = 2048;
    scene.add(directionaLight);
    //scene.add(new THREE.CameraHelper(directionaLight.shadow.camera));
}

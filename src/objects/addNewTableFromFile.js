function addNewTableFromFile() {

    table = new THREE.Group();

    var fbxloader = new THREE.FBXLoader();

    fbxloader.load('src/models/Desk0.5.fbx', function(object) {
        table.add(object);

        object.traverse(function(child) {
            if (child.isMesh) {
                child.translateX(-88.7);
                child.translateZ(-35);
                //ToDo: Find out how to change origin without translation

                child.material.map = new THREE.TextureLoader().load('src/images/Desk0_Desk_Material_BaseColor_3.png');
                child.material.bumpMap = new THREE.TextureLoader().load('src/images/Desk0_Desk_Material_Height_2.png');
                child.material.normalMap = new THREE.TextureLoader().load('src/images/Desk0_Desk_Material_Normal.png');
                child.material.roughnessMap = new THREE.TextureLoader().load('src/images/Desk0_Desk_Material_Roughness_2.png');
                child.material.metalnessMap = new THREE.TextureLoader().load('src/images/Desk0_Desk_Material_Metallic_2.png');
                child.material.map.anisotropy = 8;
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
    });

    table.position.set(3.7, 72, 0);
    scene.add(table);
    physics.addBox(table, 182, 3, 80, 0);
}

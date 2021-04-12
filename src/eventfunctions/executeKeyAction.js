var spaceDown = false;

function keyDownAction(event) {
    switch (event.keyCode) {
        case 32:
            if (!spaceDown) {
                spaceDown = true;

                // Throw a ball
                var ballRadius = 2;
                var ballGeometry = new THREE.SphereGeometry(ballRadius, 16, 16);
                var ball = new THREE.Mesh(ballGeometry, new THREE.MeshLambertMaterial({
                    color: 0x00FFFF
                }));
                ball.position.set(camera.position.x, camera.position.y, camera.position.z);
                ball.castShadow = true;
                scene.add(ball);

                var directionalVectorDC = new THREE.Vector3(0,0,1);
                var velocityVectorWC = directionalVectorDC.unproject(camera);
                velocityVectorWC.normalize();
                velocityVectorWC.multiplyScalar(800);
                physics.addSphere(ball, ballRadius, 1, velocityVectorWC);
            }
        break;
        // case 87: 
        //     //camera position Up
        //     camera.position.set(camera.position.x, camera.position.y, camera.position.z - 10);
        //     camera.updateProjectionMatrix();
        //     orbitControls.update();
        // break;
        // case 65: 
        //     //camera position Left
        //     camera.position.set(camera.position.x - 10, camera.position.y, camera.position.z);
        //     camera.updateProjectionMatrix();
        //     orbitControls.update();
        // break;
        // case 83: 
        //     //camera position Down
        //     camera.position.set(camera.position.x, camera.position.y, camera.position.z + 10);
        //     camera.updateProjectionMatrix();
        //     orbitControls.update();
        // break;
        // case 68: 
        //     //camera position Right
        //     camera.position.set(camera.position.x + 10, camera.position.y, camera.position.z);
        //     camera.updateProjectionMatrix();
        //     orbitControls.update();
        // break;
    }
}

function keyUpAction(event) {
    switch (event.keyCode) {
    case 32:
        spaceDown = false;
        break;
    }
}

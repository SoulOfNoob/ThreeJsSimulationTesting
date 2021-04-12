function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function moveBunny(bunny) {
    //console.log("move", bunny);
    const direction = new THREE.Vector3( (getRandomInt(3)-1), 0, (getRandomInt(3)-1) );
    bunny.position.addScaledVector(direction, 10);

    var searchX = bunny.position.x, searchY = bunny.position.y, searchZ = bunny.position.z;

    var result = nearby.query(searchX, searchY, searchZ);
    for (var object of result.keys()){
      console.log(object.id + " is found nearby!", object);
    }
}
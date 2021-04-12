/* global THREE */
const includes = [
  "node_modules/three/build/three.min.js",
  "node_modules/three/examples/js/libs/stats.min.js",
  "node_modules/three/examples/js/loaders/FBXLoader.js",
  "node_modules/three/examples/js/controls/OrbitControls.js",
  "node_modules/three/examples/js/controls/FirstPersonControls.js",
  "node_modules/three/examples/js/controls/PointerLockControls.js",
  "node_modules/dat.gui/build/dat.gui.min.js",
  "node_modules/cannon/build/cannon.min.js",
  "node_modules/cannon/tools/threejs/CannonDebugRenderer.js",
  "node_modules/nearby-js/build/Nearby.js",
  "src/objects/addFloor.js",
  "src/objects/addLights.js",
  "src/objects/addBunny.js",
  "src/eventfunctions/moveBunny.js",
  "src/eventfunctions/updateAspectRatio.js",
  "src/eventfunctions/calculateMousePosition.js",
  "src/eventfunctions/executeRaycast.js",
  "src/eventfunctions/executeKeyAction.js",
  "src/physics/Physics.js"
];

// Loading external code
includes.forEach(function(src) {
    document.write('<script src="' + src + '"></script>');
});

const DEG_TO_RAD = Math.PI / 180;

bunnyParameters = {
  speed: 1000
};

function main() {

    scene = new THREE.Scene();

    physics = new Physics();
    physics.initialize(0, -200, 0, 1/120, true);

    nearby = new Nearby(400, 400, 400, 10);

    createFood();

    floor = addFloor();
    console.log(floor.geometry.parameters);

    // addNewTableFromFile();

    // addMonitorFromFile();

    addLights();

    bunny = addBunny();

    moveBunnyInterval = setInterval(function() {
      moveBunny(bunny);
    }, bunnyParameters.speed);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000); // watch video
    camera.position.set(-50, 200, -400);
    camera.lookAt(0, 0, 0);

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.shadowMap.enabled = true;
    document.getElementById("3d_content").appendChild(renderer.domElement);

    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
    //orbitControls.target = new THREE.Vector3(0,83,0);
    

    // var controls = new THREE.PointerLockControls( camera, renderer.domElement );
    // controls.connect();
    //controls.target = new THREE.Vector3(0,83,0);
  
    var stats = new Stats();
    stats.showPanel(0);
    document.body.appendChild(stats.dom);

    var clock = new THREE.Clock();

    function mainLoop() {

        stats.begin();

        var delta = clock.getDelta();
        physics.update(delta);

        renderer.render(scene, camera);
        orbitControls.update();

        stats.end();

        requestAnimationFrame(mainLoop);
    }

    mainLoop();

    window.onresize = updateAspectRatio;
    window.onmousemove = calculateMousePosition;
    window.onclick = executeRaycast;
    window.onkeydown = keyDownAction;
    window.onkeyup = keyUpAction;

    // Creating a GUI and a subfolder.
    var gui = new dat.GUI();

    // Add a number controller slider.
    var speedDial = gui.add(bunnyParameters, 'speed', 0, 1000);
    speedDial.onChange(function() {
      clearInterval(moveBunnyInterval);
      moveBunnyInterval = setInterval(function() {
        moveBunny(bunny);
      }, bunnyParameters.speed);
    });
}


document.addEventListener("DOMContentLoaded", function(event) { 
  main();
});

function createFood() {

  for (let index = 0; index < 20; index++) {
    // CREATE AN OBJECT REPRESENTATION
    var objectPosX = getRandomInt(400)-200, objectPosY = 0, objectPosZ = getRandomInt(400)-200;
    var objectWidth = 5, objectHeight = 5, objectDepth = 5;
    var objectID = "food"+index;

    const geometry = new THREE.BoxGeometry( objectWidth, objectHeight, objectDepth );
    const material = new THREE.MeshStandardMaterial( {
        color: 0xff0000,
        roughness: 0.8,
        metalness: 0.0
    } );
    const food = new THREE.Mesh( geometry, material );
    food.position.set(objectPosX, objectPosY, objectPosZ);
    food.castShadow = true;
    food.name = objectID;
    scene.add( food );

    // Creates a new bounding box of (10x50x100) size, located at
    // the position (x: 0, y: 100, z: -100)
    var box = nearby.createBox(
      objectPosX, objectPosY, objectPosZ,
      objectWidth, objectHeight, objectDepth
    );

    
    var object = nearby.createObject(objectID, box);

    // INSERT THE OBJECT INTO THE WORLD
    nearby.insert(object);
    
  }

}
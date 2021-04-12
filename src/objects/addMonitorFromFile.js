function addMonitorFromFile() {

  var pivotScreen = [
    "Monitor_Front",
    "Monitor_Back",
    "Screen",
    "Monitor_Holder",
    "Button_1",
    "Button_2",
    "Button_3",
    "Button_4",
    "Power_Button"
  ];

  var rotateFoot = [
    "Foot_Disc",
    "Backpanel",
    "Monitor_Holder",
    "Frontpanel",
    "Cover",
    "Holder",
    "Monitor_Front",
    "Monitor_Back",
    "Screen",
    "Button_1",
    "Button_2",
    "Button_3",
    "Button_4",
    "Power_Button"
  ];

  var changeHeight = [
    "Monitor_Front",
    "Monitor_Back",
    "Screen",
    "Monitor_Holder",
    "Holder",
    "Button_1",
    "Button_2",
    "Button_3",
    "Button_4",
    "Power_Button"
  ];


  monitor = new THREE.Group();

  var fbxloader = new THREE.FBXLoader();

  fbxloader.load('src/models/Monitor.fbx', function(object) {
    monitor.add(object);

    object.traverse(function(child) {
      //console.log(child);
      if (child.isMesh) {
        child.scale.set(1, 1, 1);
        child.material.side = THREE.DoubleSide;
        child.castShadow = true;
        child.translateX(0);
        child.translateY(6);
        child.translateZ(-3);
      }
    });


    //ToDo: create function to do this #neverrepeatyourself

    //ToDo: Pivot not correct when rotated
    var tweenPartner = [];
    pivotScreen.forEach(function(name) {
      var child = object.getObjectByName(name);
      //new THREE.Vector3(child.rotation.x + (20 * DEG_TO_RAD))
      var tweens = {
        status: 0,
        last: 0,
        firstTween: new TWEEN.Tween(child.rotation)
          .to({x: + (20 * DEG_TO_RAD)}, 1000)
          .easing(TWEEN.Easing.Quadratic.Out),
        neutralTween: new TWEEN.Tween(child.rotation)
          .to({x: - (0 * DEG_TO_RAD)}, 1000)
          .easing(TWEEN.Easing.Quadratic.Out),
        secondTween: new TWEEN.Tween(child.rotation)
          .to({x: - (20 * DEG_TO_RAD)}, 1000)
          .easing(TWEEN.Easing.Quadratic.Out)
      };
      child.pivotScreen = tweens;
      tweenPartner.push(child);
    });
    object.getObjectByName("Screen").tweenPartner = tweenPartner;

    var tweenPartner = [];
    rotateFoot.forEach(function(name) {
      var child = object.getObjectByName(name);
      var tweens = {
        status: 0,
        last: 0,
        firstTween: new TWEEN.Tween(child.rotation)
          .to({y: + (45 * DEG_TO_RAD)}, 1000)
          .easing(TWEEN.Easing.Quadratic.Out),
        neutralTween: new TWEEN.Tween(child.rotation)
          .to({y: - (0 * DEG_TO_RAD)}, 1000)
          .easing(TWEEN.Easing.Quadratic.Out),
        secondTween: new TWEEN.Tween(child.rotation)
          .to({y: - (45 * DEG_TO_RAD)}, 1000)
          .easing(TWEEN.Easing.Quadratic.Out)
      };
      child.rotateFoot = tweens;
      tweenPartner.push(child);
    });
    object.getObjectByName("Foot_Disc").tweenPartner = tweenPartner;

    var tweenPartner = [];
    changeHeight.forEach(function(name) {
      var child = object.getObjectByName(name);
      var tweens = {
        status: 0,
        last: 0,
        firstTween: new TWEEN.Tween(child.position)
          .to({y: child.position.y + 4}, 1000)
          .easing(TWEEN.Easing.Quadratic.Out),
        neutralTween: new TWEEN.Tween(child.position)
          .to({y: child.position.y}, 1000)
          .easing(TWEEN.Easing.Quadratic.Out),
        secondTween: new TWEEN.Tween(child.position)
          .to({y: child.position.y - 8}, 1000)
          .easing(TWEEN.Easing.Quadratic.Out)
      };
      child.changeHeight = tweens;
      tweenPartner.push(child);
    });
    object.getObjectByName("Holder").tweenPartner = tweenPartner;
  });

  monitor.position.set(0, 120, -20);
  scene.add(monitor);
  //ToDo: add more Boxes for better effect
  physics.addBox(monitor, 54, 45, 13, 20);
}

function tweening(object, axis, deg, speed) {
  // var tweens = {
  //   forward: false,
  //   firstTween: new TWEEN.Tween(object.rotation)
  //     .to({axis: + (45 * DEG_TO_RAD)}, 1000)
  //     .easing(TWEEN.Easing.Quadratic.Out),
  //   neutralTween: new TWEEN.Tween(object.rotation)
  //     .to({axis: - (0 * DEG_TO_RAD)}, 1000)
  //     .easing(TWEEN.Easing.Quadratic.Out),
  //   secondTween: new TWEEN.Tween(object.rotation)
  //     .to({axis: - (45 * DEG_TO_RAD)}, 1000)
  //     .easing(TWEEN.Easing.Quadratic.Out)
  // };
  // child.rotateFoot = tweens;
}

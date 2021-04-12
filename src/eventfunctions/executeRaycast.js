raycaster = new THREE.Raycaster();

function executeRaycast(event) {

  raycaster.setFromCamera(mousePosition, camera);

  var intersects = raycaster.intersectObjects(scene.children, true);
  console.log(intersects[0].object.name);

  if (intersects.length > 0) {
    var firstHit = intersects[0].object;
    if (firstHit.name === "PhysBox") firstHit = intersects[1].object; //ignore physic box

    if (firstHit.name === "Screen" || firstHit.name === "Foot_Disc" || firstHit.name === "Holder") {
      //console.log(firstHit);
      var tweenPartner = firstHit.tweenPartner;
      if (typeof(tweenPartner) !== "undefined") {
        window.dispatchEvent(new Event('monitorStateChanged'));
        tweenPartner.forEach(function(partner) {
          switch (firstHit.name) {
            case "Screen":
              userData = partner.pivotScreen;
              break;
            case "Foot_Disc":
              userData = partner.rotateFoot;
              break;
            case "Holder":
              userData = partner.changeHeight;
              break;
            default:
          }
          if(userData.status === 0 && userData.last !== 1) {
            userData.neutralTween.stop();
            userData.firstTween.start();
            userData.status = 1;
            userData.last = 1;
          } else if(userData.status === 0 && userData.last !== -1) {
            userData.neutralTween.stop();
            userData.secondTween.start();
            userData.status = -1;
            userData.last = -1;
          } else {
            userData.firstTween.stop();
            userData.secondTween.stop();
            userData.neutralTween.start();
            userData.status = 0;
          }

        });
      }
    }
  }
}

let scene, camera, renderer, car;

function startGame() {
  document.getElementById("menu").style.display = "none";
  init();
  animate();
}

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("gameCanvas")
  });

  renderer.setSize(window.innerWidth, window.innerHeight);

  // Track
  const track = new THREE.Mesh(
    new THREE.PlaneGeometry(200,200),
    new THREE.MeshBasicMaterial({color:0x333333})
  );
  track.rotation.x = -Math.PI/2;
  scene.add(track);

  // Car
  const carGeo = new THREE.BoxGeometry(1,0.5,2);
  const carMat = new THREE.MeshBasicMaterial({color:0xff0000});
  car = new THREE.Mesh(carGeo, carMat);
  car.position.y = 0.25;
  scene.add(car);

  camera.position.set(0,3,5);
}

let speed = 0;

document.addEventListener("keydown", e=>{
  if(e.key==="ArrowUp") speed = 0.2;
});

document.addEventListener("keyup", ()=>{
  speed = 0;
});

function animate(){
  requestAnimationFrame(animate);

  car.position.z -= speed;

  camera.position.z = car.position.z + 5;
  camera.lookAt(car.position);

  renderer.render(scene,camera);
}

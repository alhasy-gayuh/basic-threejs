const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGL1Renderer({
  antialias: true,
});

scene.background = new THREE.Color("0x0a0a0a");

// disini ngatur shadow nya >> dan harus di atur di setiap materialnya
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

// menggunakan mesh basic material >> tidak membutuhkan cahaya atau lightning
const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0xf50000 });
// const box = new THREE.Mesh(geometry, material);

// lightning atau pencahayaan
// const light = new THREE.PointLight(0x79d9ff, 1);
// light.position.set(0, 3, 2);
// scene.add(light);

// pencahayaan dengan spotlight
const spotlight = new THREE.SpotLight(0x79d9ff);
spotlight.position.set(2, 2, 0);
spotlight.castShadow = true; // ini shadow
scene.add(spotlight);

// texture
const batu = new THREE.TextureLoader().load("img/batu.jpg");
const bata = new THREE.TextureLoader().load("img/bata.jpg");
const sketch_batu = new THREE.TextureLoader().load("img/R.jpeg");

// menggunakan mesh lumbert
// const material2 = new THREE.MeshLambertMaterial({
//   map: batu,
//   alphaMap: bata,
//   transparent: true,
//   side: THREE.DoubleSide,
// });
// const box2 = new THREE.Mesh(geometry, material2);
// box2.position.set(2, 0, 0);

// mesh phong material >> lebih detail dari mesh lumbert dan pastinya lebih berat untuk di render
const material3 = new THREE.MeshPhongMaterial({
  //   map: bata,
  //   bumpMap: sketch_batu,
  color: 0xff0000,
});
const box3 = new THREE.Mesh(geometry, material3);
box3.position.set(0, 0, 2);
box3.castShadow = true; // ini shadow
box3.receiveShadow = true; // ini shadow juga

// scene.add(box);
// scene.add(box2);
scene.add(box3);

// nyoba plane geometry
const planeGeometry = new THREE.PlaneGeometry(1000, 1000, 500, 500);
const planeMaterial = new THREE.MeshLambertMaterial({
  color: 0xaaffaa,
});
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
planeMesh.position.set(0, -1, 0);
planeMesh.rotation.x = -Math.PI / 2;
planeMesh.receiveShadow = true; // shadow lagi
scene.add(planeMesh);

camera.position.z += 10;

window.addEventListener("resize", function () {
  const width = window.innerWidth;
  const height = window.innerHeight;

  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

function animate() {
  requestAnimationFrame(animate);

  //   box.rotation.z += 0.01;
  //   box.rotation.y += 0.01;

  //   box2.rotation.z += 0.01;
  //   box2.rotation.y += 0.01;

  box3.rotation.z += 0.01;
  box3.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();

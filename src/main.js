// Importar Three.js
import * as THREE from 'three';

// para capturar movimiento del mouse
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

// Crear escena
const scene = new THREE.Scene();

// Crear cámara
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1, 6);

// Crear renderizador
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement)

// agregando ejes
const axeHelper=new THREE.AxesHelper(10);
scene.add(axeHelper);

// agregando luz
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);


// Crea una instancia de OrbitControls y pasa la cámara y el lienzo (renderer.domElement)
const controls = new OrbitControls(camera, renderer.domElement);
// Establece la velocidad de rotación del control
controls.rotateSpeed = 0.5;
// Establece la velocidad de acercamiento y alejamiento
controls.zoomSpeed = 1.2;
// Activa la capacidad de hacer zoom
controls.enableZoom = true;
// Actualiza los controles en cada fotograma
function animate() {
  requestAnimationFrame(animate);
  controls.update();  // ¡No olvides llamar a update() en tu bucle de animación!
  renderer.render(scene, camera);
}



// CON IMAGEN DE SILLAS
// function agregarParedInterior(){
//   const alturaCilindro = 8; // Altura del cilindro
//   const radioInferior = 10; // Radio inferior del cilindro
//   const radioSuperior = 6; // Radio superior del cilindro
//   const segmentos = 32; // Número de segmentos para la geometría

//   const textureLoader = new THREE.TextureLoader();
//   textureLoader.load("img/g104.png", (texture) => {
//     // Configuración de la textura en caso de carga exitosa
    
//     const geometry2 = new THREE.CylinderGeometry(radioInferior, radioSuperior, alturaCilindro, segmentos,1, true);
//     // Utilizar MeshPhongMaterial o MeshStandardMaterial con side: THREE.DoubleSide
//     const material = new THREE.MeshPhongMaterial({ map: texture, side: THREE.DoubleSide });
//     const cilindro = new THREE.Mesh(geometry2, material);
//     cilindro.position.y = 0; // Alinear con el plano XZ
//     // Añadir cilindro a la escena
//     scene.add(cilindro);


//     renderer.render(scene, camera);  
//   }, undefined, (err) => {
//     console.error('Error al cargar la textura:', err);
//   });
// }

// SIN IMAGEN DE SILLAS
// function agregarParedInterior() {
//   const alturaCilindro = 6;
//   const radioInferior = 10;
//   const radioSuperior = 6;
//   const segmentos = 32;

//   const geometry = new THREE.CylinderGeometry(radioInferior, radioSuperior, alturaCilindro, segmentos, 1, true);
//   geometry.translate( 0, alturaCilindro / 2, 0 );
//   geometry.rotateX( Math.PI / 2 );
//   const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
//   const cilindro = new THREE.Mesh(geometry, material);
//   cilindro.position.y = 0;
//   scene.add(cilindro);
// }

function agregarParedExterior() {
  const alturaCilindro = 6;
  const radioInferior = 15;
  const radioSuperior = 15;
  const segmentos = 32;

  const geometry = new THREE.CylinderGeometry(radioInferior, radioSuperior, alturaCilindro, segmentos, 1, true);
  geometry.translate( 0, alturaCilindro / 2, 0 );
  
  const material = new THREE.MeshBasicMaterial({ color: '#9b9b9b', wireframe: true });
  const cilindro = new THREE.Mesh(geometry, material);
  console.log(cilindro.geometry.attributes.position.array)
 
  cilindro.position.set(0, 0, 0);
  scene.add(cilindro);
}

function agregarCancha() {
  const geometry = new THREE.PlaneGeometry(20, 10);
  const textureLoader = new THREE.TextureLoader();

  textureLoader.load("img/soccerField.png", (texture) => {
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = 0;
    scene.add(plane);

    // Renderizar la escena
    renderer.render(scene, camera);
  }, undefined, (err) => {
    console.error('Error al cargar la textura:', err);
  });
}

// function butaca(){
//   const geometry1 = new THREE.BoxGeometry( 0.8, 0.25, 0.5 ); 
//   geometry1.translate(0.5,0,0)
//   const material1 = new THREE.MeshBasicMaterial( {color: 0xff0000} ); 
//   const asiento = new THREE.Mesh( geometry1, material1 ); 
//   scene.add( asiento );

//   const geometry2 = new THREE.BoxGeometry( 0.25, 1, 0.5 ); 
//   geometry2.translate(0,0.5,0)
//   const material2 = new THREE.MeshBasicMaterial( {color: 0xff0000} ); 
//   const respaldo = new THREE.Mesh( geometry2, material2 ); 
//   scene.add( respaldo );
// }

function agregarParedInterior() {
  const alturaCilindro = 6;
  const radioInferior = 10;
  const radioSuperior = 6;
  const segmentos = 60;

  const grupoButacas = new THREE.Group();

  for(let escalon=1; escalon<=alturaCilindro; escalon++){

    // Crear una serie de butacas y agregarlas al grupo
    for (let i = 0; i < segmentos; i++) {
      const angulo = (i / segmentos) * Math.PI * 2;
      const x = Math.cos(angulo) * (radioInferior+escalon);
      const z = Math.sin(angulo) * radioInferior;

      // Crear butaca
      const butacaMesh = butaca();
      butacaMesh.position.set(x, escalon, z);
      butacaMesh.rotation.y = angulo;

      // Agregar la butaca al grupo
      grupoButacas.add(butacaMesh);
    }
}

  // Agregar el grupo de butacas a la escena
  scene.add(grupoButacas);
}


function butaca() {
  const grupoButacas = new THREE.Group();

  // asiento
  const geometry1 = new THREE.BoxGeometry(0.8, 0.25, 0.5);
  geometry1.translate(0.5, 0, 0);
  //geometry1.rotateY(Math.PI)
  const material1 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const asiento = new THREE.Mesh(geometry1, material1);
  grupoButacas.add(asiento);

  // respaldo
  const geometry2 = new THREE.BoxGeometry(0.25, 1, 0.5);
  geometry2.translate(0.8, 0.5, 0);
  //geometry2.rotateY(Math.PI)
  const material2 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const respaldo = new THREE.Mesh(geometry2, material2);
  grupoButacas.add(respaldo);

  return grupoButacas;
}

agregarParedInterior();
agregarParedExterior();
agregarCancha();
animate();

renderer.render(scene,camera)











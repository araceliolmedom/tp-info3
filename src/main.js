// Importar Three.js
import * as THREE from 'three';

// Crear escena
const scene = new THREE.Scene();

// Crear cámara
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 20);

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
function agregarParedInterior() {
  const alturaCilindro = 8;
  const radioInferior = 10;
  const radioSuperior = 6;
  const segmentos = 32;

  const geometry2 = new THREE.CylinderGeometry(radioInferior, radioSuperior, alturaCilindro, segmentos, 1, true);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
  const cilindro = new THREE.Mesh(geometry2, material);
  cilindro.position.y = 0;
  scene.add(cilindro);
}

function agregarParedExterior() {
  const alturaCilindro = 8;
  const radioInferior = 10;
  const radioSuperior = 10;
  const segmentos = 32;

  const geometry = new THREE.CylinderGeometry(radioInferior, radioSuperior, alturaCilindro, segmentos, 1, true);
  const material = new THREE.MeshBasicMaterial({ color: '#9b9b9b', wireframe: true });
  const cilindro = new THREE.Mesh(geometry, material);
  cilindro.position.set(0, 0, 0);
  scene.add(cilindro);
}

function agregarCancha() {
  const geometry = new THREE.PlaneGeometry(10, 5);
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

// Llamada a las funciones para agregar geometría y texturas
agregarParedInterior();
agregarParedExterior();
agregarCancha();









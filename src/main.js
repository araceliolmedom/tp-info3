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

function agregarPiso(){
  const radio=10;
  const segmentos=32;
  const geometry= new THREE.CircleGeometry(radio,segmentos);
  const material=new THREE.MeshBasicMaterial({color:'#0000ff', side: THREE.DoubleSide});
  const circulo=new THREE.Mesh(geometry,material);
  circulo.rotation.x = -Math.PI / 2;

  const objeto=new THREE.Object3D();
  objeto.add(circulo);

  objeto.scale.x+=0.6;
  scene.add(objeto)
}

function agregarParedExterior() {
  const alturaCilindro = 7;
  const radioInferior = 11;
  const radioSuperior = 11;
  const segmentos = 32;

  // Crear la geometría del cilindro
  const geometry = new THREE.CylinderGeometry(radioInferior, radioSuperior, alturaCilindro, segmentos, 1, true);
  // const geometry2= new THREE.Cylinder
  
  
  // Crear el material
  const material = new THREE.MeshBasicMaterial({ color: '#9b9b9b', wireframe: false,side: THREE.DoubleSide });
  
  // Crear la malla del cilindro
  const cilindro = new THREE.Mesh(geometry, material);

  // Añadir la malla del cilindro al objeto 3D
  const cylinder = new THREE.Object3D();
  cylinder.add(cilindro);

  // Mover el pivote hacia arriba
  cilindro.position.y = alturaCilindro / 2; 

  // Escalar el cilindro en el eje y
  cilindro.scale.x += 0.6;

  // Añadir el objeto 3D a la escena
  scene.add(cylinder);
}

function agregarParedInterior() {
  const alturaCilindro = 8;
  const radioInferior =6;
  const radioSuperiorBut = 10;
  const radioSuperior = 8;
  const segmentos = 32;
  const cantButacas=60

  const grupoButacas = new THREE.Group();
  
  // agregando pared
  const geometry=new THREE.CylinderGeometry(radioSuperior, radioInferior,alturaCilindro,segmentos, 1, true);
  const material=new THREE.MeshBasicMaterial({color:'#9b9b9b', wireframe:false, side: THREE.DoubleSide})
  const cilindro=new THREE.Mesh(geometry,material);

  // Añadir la malla del cilindro al objeto 3D
  const cylinder = new THREE.Object3D();
  cylinder.add(cilindro);

  // Mover el pivote hacia arriba
  cilindro.position.y = alturaCilindro / 2; 

  // Escalar el cilindro en el eje y
  cilindro.scale.x += 1.2;
  cilindro.scale.z += 0.5;

  // Añadir el objeto 3D a la escena
  scene.add(cylinder);


  // agregando butacas
  for(let escalon=0; escalon<=alturaCilindro; escalon++){

    for (let i = 1; i < cantButacas; i++) {
    const angulo = (i / cantButacas) * Math.PI * 2;
    const x = Math.cos(angulo) * (radioSuperiorBut + escalon);
    const z = Math.sin(angulo) * radioSuperiorBut;

    // Crear butaca
    const butacaMesh = butaca();
    butacaMesh.position.set(x, escalon, z);

    // Ajustar la rotación para que la butaca mire hacia el centro
    butacaMesh.rotation.y = angulo + Math.PI / 2;
    // Definir el color basado en la posición en el eje vertical

    if (butacaMesh.position.y > alturaCilindro / 2) {
        // Mitad inferior: Color rojo
        butacaMesh.children[0].material.color.set(0xff0000); // Rojo
        butacaMesh.children[1].material.color.set(0xff0000); // Rojo
    } else {
        // Mitad superior: Color azul
        butacaMesh.children[0].material.color.set(0x0000ff); // Azul
        butacaMesh.children[1].material.color.set(0x0000ff); // Azul
        // FALTA FORMAR CCP
        // if((butacaMesh.position.y>0 && butacaMesh.position.y<4)){
        //   console.log(butacaMesh.position)
        //   butacaMesh.children[0].material.color.set(0xff0000); // Rojo
        //   butacaMesh.children[1].material.color.set(0xff0000); // Rojo
        // }
    }

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
agregarPiso()
agregarCancha();
animate();

renderer.render(scene,camera)











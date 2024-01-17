// Importar Three.js
import * as THREE from 'three';
// para capturar movimiento del mouse
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';


// Crear escena
const scene = new THREE.Scene();

// para el fondo
const cubeTextureLoader = new THREE.CubeTextureLoader();
const environmentMap = cubeTextureLoader.load([
    'img/fondo/px.png',
    'img/fondo/nx.png',
    'img/fondo/py.png',
    'img/fondo/ny.png',
    'img/fondo/pz.png',
    'img/fondo/nz.png'
])
console.log(environmentMap)
scene.background = environmentMap

// Crear cámara
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(10, 15, 50);

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

//tamaño
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//resize
// para que al achicar o agrandar la pantalla la forma se adapte
window.addEventListener('resize', () => {
  //update sizes
  console.log(window.innerWidth)
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  //update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize( sizes.width , sizes.height)

})

const loop = () => {
  //renderer.render(scene,camera);
  window.requestAnimationFrame(loop);
  
}

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
  const geometry = new THREE.PlaneGeometry(18, 10);
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

function aggregarPiso(){
  const radio=10;
  const segmentos=32;
  const geometry= new THREE.CircleGeometry(radio,segmentos);
  const material=new THREE.MeshBasicMaterial({color:'#0078ff', side: THREE.DoubleSide});
  const circulo=new THREE.Mesh(geometry,material);
  circulo.rotation.x = -Math.PI / 2;
  
  const objeto=new THREE.Object3D();
  objeto.add(circulo);
  objeto.position.y=-0.5
  objeto.scale.x+=0.6;
  scene.add(objeto)
}

function agregarParedExterior() {
  const alturaCilindro = 9;
  const radioInferior = 12;
  const radioSuperior = 12;
  const segmentos = 32;

  // Crear la geometría del cilindro
  const geometry = new THREE.CylinderGeometry(radioInferior, radioSuperior, alturaCilindro, segmentos, 1, true);
  const textureLoader = new THREE.TextureLoader();

  textureLoader.load("img/chapa.png", (texture) => {
    const material = new THREE.MeshBasicMaterial({ map: texture, side:THREE.DoubleSide });
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

    // Renderizar la escena
    renderer.render(scene, camera);
  }, undefined, (err) => {
    console.error('Error al cargar la textura:', err);
  });
}

function agregarParedInterior() {
  const alturaCilindro = 8;
  const radioInferior =7;
  const radioSuperiorBut = 10;
  const radioSuperior = 8;
  const segmentos = 32;
  const cantButacas=70

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
  cilindro.scale.x += 1.3;
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
      butacaMesh.rotation.y= Math.PI*2-angulo//Math.PI*2-Math.atan(z/x) //(Math.PI / 2-angulo)//Math.PI-Math.atan(z/x)
      console.log(angulo,Math.PI*2-Math.atan(z/x) )

      console.log(butacaMesh)

      // Definir el color basado en la posición en el eje vertical
      if (butacaMesh.position.y > alturaCilindro / 2) {
          // Mitad inferior: Color rojo
          butacaMesh.children[0].material.color.set(0xff0000); // Rojo
          butacaMesh.children[1].material.color.set(0xff0000); // Rojo
      } else {
          // Mitad superior: Color azul
          butacaMesh.children[0].material.color.set(0x0000ff); // Azul
          butacaMesh.children[1].material.color.set(0x0000ff); // Azul
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

function edificio() {
  const altura = 15;
  const ancho = 35;
  const profundidad = 2;

  // parte Principal del edificio
  const geometryPrincipal = new THREE.BoxGeometry(ancho, altura, profundidad);
  const materialPrincipal = new THREE.MeshBasicMaterial({ color: '#ffffff' });
  const edificioPrincipal = new THREE.Mesh(geometryPrincipal, materialPrincipal);
  edificioPrincipal.position.z=13;
  edificioPrincipal.position.y=4;
  scene.add(edificioPrincipal);

  // extremos
  const anchoSecundario=6
  const profundidadSecundaria=6

  const geometryExtremo = new THREE.BoxGeometry(anchoSecundario, altura, profundidadSecundaria);
  const materialExtremo = new THREE.MeshBasicMaterial({ color: '#ffffff' });

  const extremoIzquierdo = new THREE.Mesh(geometryExtremo, materialExtremo);
  //extremoIzquierdo.rotation.x = Math.PI / 2;
  extremoIzquierdo.position.x = -ancho / 2;
  extremoIzquierdo.position.z=10;
  extremoIzquierdo.position.y=4
  scene.add(extremoIzquierdo);

  const extremoDerecho = extremoIzquierdo.clone();
  extremoDerecho.position.x = ancho / 2;
  scene.add(extremoDerecho);

  // techito
  const largoTecho=10
  const geometryTecho=new THREE.BoxGeometry(ancho,largoTecho,profundidad);
  const materialTecho=new THREE.MeshBasicMaterial({color:'#ffffff'});
  const techo=new THREE.Mesh(geometryTecho,materialTecho);
  techo.position.y=4+altura/2
  techo.position.z=8
  techo.rotation.x=Math.PI/2

  scene.add(techo)

  //parte central
  const anchoCentral=10
  const geometryCentral=new THREE.BoxGeometry(anchoCentral,altura,profundidad);
  const materialCentral=new THREE.MeshBasicMaterial({color:'#ff0000'});
  const edificioCentral=new THREE.Mesh(geometryCentral,materialCentral);
  edificioCentral.position.z=15;
  edificioCentral.position.y=4;
  scene.add(edificioCentral)

  //costados
  const anchoCostado=5;
  const geometryCostado=new THREE.BoxGeometry(anchoCostado,altura, profundidad/2);
  const materialCostado=new THREE.MeshBasicMaterial({color:'#0078ff'})
  const edificioCostadoDerecho=new THREE.Mesh(geometryCostado,materialCostado);
  edificioCostadoDerecho.position.z=14;
  edificioCostadoDerecho.position.y=4;
  edificioCostadoDerecho.position.x=anchoCentral/2+anchoCostado/2;
  scene.add(edificioCostadoDerecho)

  const edificioCostadoIzquierdo=edificioCostadoDerecho.clone();
  edificioCostadoIzquierdo.position.z=14;
  edificioCostadoIzquierdo.position.y=4;
  edificioCostadoIzquierdo.position.x=-(anchoCentral/2+anchoCostado/2);
  scene.add(edificioCostadoIzquierdo)

  // VENTANAS
  const numeroFilas=3;
  const numeroVentanas = 8;
  const anchoVentana = 1;
  const alturaVentana = 1;
  
  for(let i=0; i<numeroFilas; i++){
    for (let j = 0; j < numeroVentanas; j++) {
    const ventana = new THREE.Mesh(
      new THREE.BoxGeometry(anchoVentana, alturaVentana, profundidad/2),
      new THREE.MeshBasicMaterial({ color: '#ffff00' }) // Puedes ajustar el color
    );

    // Calcular la posición de cada ventana en la parte central del edificio
    const offsetX = (j - (numeroVentanas - 1) / 2) * (ancho / numeroVentanas);
    const offsetY=(altura/2-4*i)
    ventana.position.set(offsetX, offsetY, 15);

    scene.add(ventana);
  }}

  // PUERTAS 

  const anchoPuerta=3;
  const altoPuerta=8;
  const geometryPuerta=new THREE.BoxGeometry(anchoPuerta,altoPuerta,profundidad);
  const materialPuerta=new THREE.MeshBasicMaterial({color:'#1d3557'});
  const puerta1=new THREE.Mesh(geometryPuerta,materialPuerta);
  puerta1.position.set(anchoPuerta/2+0.25, 1, 15.5);
  scene.add(puerta1)

  const puerta2=puerta1.clone();
  puerta1.position.set(-(anchoPuerta/2+0.25), 1, 15.5);
  scene.add(puerta2)



  // cartel
  const altoCartel=4;
  const anchoCartel=8
  
  const geometryCartel1=new THREE.PlaneGeometry(anchoCartel,altoCartel)
  const textureLoader = new THREE.TextureLoader();

  textureLoader.load("img/text.png", (texture) => {
    const materialCartel = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide, transparent: true });
    const cartel = new THREE.Mesh(geometryCartel1, materialCartel);
    cartel.position.z=16.5
    cartel.position.y=altura/2;
    
    scene.add(cartel);

    // Renderizar la escena
    renderer.render(scene, camera);
  }, undefined, (err) => {
    console.error('Error al cargar la textura:', err);
  });

  

}

agregarParedInterior();
agregarParedExterior();
aggregarPiso()
agregarCancha();
edificio()
animate();
loop();
renderer.render(scene,camera))











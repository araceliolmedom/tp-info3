// Importar Three.js
import * as THREE from 'three';
// para capturar movimiento del mouse
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
//archivos blender
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';


// Crear escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // Color celeste (sky blue)


// para el fondo
// const cubeTextureLoader = new THREE.CubeTextureLoader();
// const environmentMap = cubeTextureLoader.load([
//     'img/fondo/px.png',
//     'img/fondo/nx.png',
//     'img/fondo/py.png',
//     'img/fondo/ny.png',
//     'img/fondo/pz.png',
//     'img/fondo/nz.png'
// ])
// console.log(environmentMap)
// scene.background = environmentMap

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

function agregarPlanoSuelo() {
  const planoGeometry = new THREE.PlaneGeometry(100, 100);
  const textureLoader = new THREE.TextureLoader();

  textureLoader.load("img/suelo.jpg", (texture) => {
    const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
    const plano = new THREE.Mesh(planoGeometry, material);
    plano.rotation.x = -Math.PI / 2;
    plano.position.y = -1; // Ajusta la posición según las necesidades de tu escena
    scene.add(plano);
  }, 
  // Manejo de errores
  (xhr) => {
    console.log('Progreso de carga: ', (xhr.loaded / xhr.total * 100) + '%');
  },
  (error) => {
    console.error('Error al cargar la textura del suelo:', error);
  });
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

function agregarPiso(){
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
  const radioInferior = 7;
  const radioSuperiorBut = 10.5;
  const radioSuperior = 8;
  const segmentos = 32;
  const cantButacas = 70;

  const grupoButacas = new THREE.Group();

  // Agregando pared
  const geometry = new THREE.CylinderGeometry(radioSuperior, radioInferior, alturaCilindro, segmentos, 1, true);
  const material = new THREE.MeshPhongMaterial({ color: '#9b9b9b', side: THREE.DoubleSide }); // Utilizar MeshPhongMaterial para mejor respuesta a la iluminación
  const cilindro = new THREE.Mesh(geometry, material);

  // Añadir la malla del cilindro al objeto 3D
  const cylinder = new THREE.Object3D();
  cylinder.add(cilindro);

  // Mover el pivote hacia arriba
  cilindro.position.y = alturaCilindro / 2;

  // Escalar el cilindro en el eje y
  cilindro.scale.x += 1.3;
  cilindro.scale.z += 0.5;

// Configuración de sombras para el cilindro
  cilindro.castShadow = true;
  cilindro.receiveShadow = true;

  // Añadir el objeto 3D a la escena
  scene.add(cylinder);

 // Agregando butacas
  for (let escalon = 0; escalon <= alturaCilindro; escalon++) {
    // Crea separacion entre butacas rojas y azules
    if (escalon !== alturaCilindro / 2) {
      for (let i = 1; i < cantButacas; i++) {
        const angulo = (i / cantButacas) * Math.PI * 2;
        const x = Math.cos(angulo) * (radioSuperiorBut + escalon);
        const z = Math.sin(angulo) * radioSuperiorBut;


        // Determina el color de la butaca según la mitad en la que se encuentre
        const colorButaca = escalon <= alturaCilindro / 2 ? 0x0000ff /* Azul */ :0xff0000 /* Rojo */;
          // Eliminamos la columna de butacas del eje x para crear separacion
        if (Math.abs(z) > 1e-10) { // 10e-10 Pequeña tolerancia para evitar problemas numéricos
          // Llamando a la función cargarButaca y pasando una callback para manejar el objeto cargado
          cargarButaca(colorButaca, function (butaca) {

            butaca.position.set(x, escalon, z);
            butaca.lookAt(new THREE.Vector3(0, escalon, 0)); // Hace que la butaca mire hacia el centro del cilindro

            // Ajustando la rotación para que siempre se vea de frente al centro del cilindro
            if (i > cantButacas / 2) {
              butaca.rotation.y = -angulo + Math.PI;
            } else {
              butaca.rotation.y = angulo;
            }

            // Configuración de sombras para las butacas
            butaca.castShadow = true;
            butaca.receiveShadow = true;

            // Añadiendo la butaca al grupo de butacas
            grupoButacas.add(butaca);

         
          });
        }
      }
    }
  }


  // Añadiendo el grupo de butacas a la escena
  scene.add(grupoButacas);
  // Configuración de sombras para el grupo de butacas
  grupoButacas.castShadow = true;
  grupoButacas.receiveShadow = true;

}


//Light
const lightObject = new THREE.DirectionalLight(0xffffff);
lightObject.position.set(10, 10, 10); // Ajusta la posición de la luz
lightObject.target.position.set(0, 0, 0); // Punto hacia el centro del cilindro
scene.add(lightObject);
scene.add(lightObject.target);

// Función para cargar una butaca desde un archivo .obj
function cargarButaca(color, callback) {
  // instantiate a loader
  const loaderButaca = new OBJLoader();
  
  // Define el material para la butaca con el color pasado como parámetro
  const materialButaca = new THREE.MeshPhongMaterial({ color: color, side: THREE.DoubleSide });

  // load butaca
  loaderButaca.load(
    // resource URL
    './src/butaca.obj',
    // called when resource is loaded
    function (objectButaca) {
      // Escala el objeto
      objectButaca.scale.set(0.8, 0.8, 0.8);
  
      // Asigna el nuevo material a la butaca
      objectButaca.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.material = materialButaca;
        }
      });

      // Llama a la función de devolución de llamada con el objeto cargado
      callback(objectButaca);
    },
    // called when loading is in progresses
    function (xhr) {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    // called when loading has errors
    function (error) {
      console.log('An error happened', error);
    }
  );
}


function edificio() {
  const altura = 15;
  const ancho = 35;
  const profundidad = 2;

  // parte Principal del edificio
  const geometryPrincipal = new THREE.BoxGeometry(ancho, altura, profundidad);
  const materialPrincipal = new THREE.MeshBasicMaterial({ color: '#F4F0EF' });
  const edificioPrincipal = new THREE.Mesh(geometryPrincipal, materialPrincipal);
  edificioPrincipal.position.z=13;
  edificioPrincipal.position.y=4;
  scene.add(edificioPrincipal);

  // extremos
  const anchoSecundario=6
  const profundidadSecundaria=6

  const geometryExtremo = new THREE.BoxGeometry(anchoSecundario, altura, profundidadSecundaria);
  const materialExtremo = new THREE.MeshBasicMaterial({ color: '#F4F0EF' });

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
  const materialTecho=new THREE.MeshBasicMaterial({color:'#F4F0EF'});
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

// Función para cargar un arco desde un archivo .obj
function cargarArco(posicionX, posicionZ, rotacionY) {
  // instantiate a loader
  const loaderArco = new OBJLoader();
  // load arco
  loaderArco.load(
    // resource URL
    './src/arco.obj',
    // called when resource is loaded
    function ( objectArco ) {
      // Crear un material blanco
      const materialBlanco = new THREE.MeshStandardMaterial({ color: 0xffffff });

      // Asignar el material blanco al objeto
      objectArco.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.material = materialBlanco;
        }
      });

      // Escala el objeto
      objectArco.scale.set(0.005, 0.005, 0.005);

      // Rotar el objeto en el eje y 
      objectArco.rotation.y = rotacionY;

      // Ubicar el arco
      objectArco.position.x = posicionX;
      objectArco.position.z = posicionZ;

      // Añadir el arco a la escena
      scene.add(objectArco);
    },
    // called when loading is in progresses
    function ( xhr ) {
      console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    // called when loading has errors
    function ( error ) {
      console.log( 'An error happened', error );
    }
  );
}

cargarArco(8.6, 1.25, Math.PI / 2); //Arco 1
cargarArco(-8.6, -1.25, -Math.PI / 2); //Arco 2
agregarPlanoSuelo();
agregarParedInterior();
agregarParedExterior();
agregarPiso()
agregarCancha();
edificio()
animate();
loop();
renderer.render(scene,camera);











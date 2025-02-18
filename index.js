import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


// making a scene,  camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);
// 

scene.background = new THREE.Color(0xADD8E6);

// light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3); // ambient light
scene.add(ambientLight);


const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // directional light
directionalLight.position.set(5, 5, 0);
scene.add(directionalLight);

// making an orbit control
const controls = new OrbitControls( camera, renderer.domElement );

// 

// bg loader
    // const bgLoader = new THREE.TextureLoader();

    // const bg = bgLoader.load("/bg/bg.jpg");

    // scene.background = bg;
// 

// baton
const loader = new GLTFLoader();

loader.load( '/models/baton/scene.gltf', function ( gltf ) { 
    gltf.scene.scale.set(0.01, 0.01, 0.01);
    gltf.scene.position.set(0, 0, 0);
    gltf.scene.traverse((child) => {
        if (child.isMesh) {
            const textureLoader = new THREE.TextureLoader();
            const normalMap = textureLoader.load('/models/baton/textures/Material_normal.png');
            const metallicRoughnessMap = textureLoader.load('/models/baton/textures/Material_metallicRoughness.png');
            child.material = new THREE.MeshStandardMaterial({ 
                color: 0xDAA520, 
                metalness: 0.6, 
                roughness: 0.7,
                normalMap: normalMap,
                roughnessMap: metallicRoughnessMap  
            });
        }
    });
    scene.add(gltf.scene);
}, undefined, function ( error ) {
    console.error( error );
} );
// 

camera.position.z = 3;

function animate() {
    controls.update();
	renderer.render( scene, camera );
}

if ( WebGL.isWebGL2Available() ) {

    renderer.setAnimationLoop( animate );

} else {

	const warning = WebGL.getWebGL2ErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );

}

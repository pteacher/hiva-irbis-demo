import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Stats } from 'three/examples/jsm/libs/stats.module.js';
import { RoughnessMipmapper } from 'three/examples/jsm/utils/RoughnessMipmapper.js';
import head from './head.gltf';

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.physicallyCorrectLights = true;
const roughnessMipmapper = new RoughnessMipmapper( renderer );
document.body.appendChild( renderer.domElement );

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );

const controls = new OrbitControls( camera, renderer.domElement );

const ambient = new THREE.AmbientLight( 0x222222, 1.0 );
scene.add( ambient );

const directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
directionalLight.position.set( 0, 20, 100 ).normalize();
scene.add( directionalLight );

const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 5 );
scene.add( light );

const spot1 = new THREE.SpotLight( 0xffffff, 1 );
spot1.position.set( 5, 20, 100 );
spot1.angle = 0.50;
spot1.penumbra = 0.75;
spot1.intensity = 100;
spot1.decay = 2;

camera.position.set( 0, 20, 100 );
controls.update();
controls.mouseButtons = {
	LEFT: THREE.MOUSE.ROTATE,
	MIDDLE: THREE.MOUSE.DOLLY,
	RIGHT: THREE.MOUSE.PAN
}

// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

scene.background = new THREE.Color('black');
let mixer;
let clock = new THREE.Clock();

const loader = new GLTFLoader();

loader.load( head, function ( gltf ) {
    const model = gltf.scene;
    gltf.scene.traverse( function ( child ) {
        if ( child.isMesh ) {
            roughnessMipmapper.generateMipmaps( child.material );
        }
    } )
    mixer = new THREE.AnimationMixer( gltf.scene );
    gltf.animations.forEach( ( clip ) => {  
        mixer.clipAction( clip ).play();
    } );
    model.position.set( 0, 0, 0 );
    model.scale.set( 0.5, 0.5, 0.5 );
    scene.add( model );
}, undefined, function ( error ) {
	console.error( error );
} );

animate();

function animate() {
	requestAnimationFrame( animate );
    var delta = clock.getDelta();
    if ( mixer ) mixer.update( delta );
	controls.update();
	renderer.render( scene, camera );
}

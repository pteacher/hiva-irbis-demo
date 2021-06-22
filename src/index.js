import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { RoughnessMipmapper } from 'three/examples/jsm/utils/RoughnessMipmapper.js';
import head from './head.glb';


let scene, renderer;

let mouseX = 0, mouseY = 0;

let windowWidth, windowHeight;

let mixer;
let clock = new THREE.Clock();

const views = [
    {
        left: 0.5,
        bottom: 0,
        width: 0.5,
        height: 0.5,
        background: new THREE.Color( 0.7, 0.5, 0.5 ),
        eye: [ 400, 0, 0 ],
        up: [ 0, 0, 1 ],
        fov: 30,
        
    },
    {
        left: 0,
        bottom: 0,
        width: 0.5,
        height: 0.5,
        background: new THREE.Color( 0.5, 0.7, 0.7 ),
        eye: [ -400, 0, 0 ],
        up: [ 1, 0, 0 ],
        fov: 30,
    
    },
    {
        left: 0.25,
        bottom: 0.4,
        width: 0.5,
        height: 0.6,
        background: new THREE.Color( 0.5, 0.5, 0.7 ),
        eye: [ 0, 100, 400 ],
        up: [ 0, 1, 0 ],    
        fov: 30,
    }
];



init();

const roughnessMipmapper = new RoughnessMipmapper( renderer );
animate();

function init() {

    const container = document.getElementById( 'container' );

    
    
    scene = new THREE.Scene();

    const light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 0, 0, 1 );
    scene.add( light );

    const ambient = new THREE.AmbientLight( 0x222222, 1.0 );
    scene.add( ambient );

    

    const canvas = document.createElement( 'canvas' );
    canvas.width = 128;
    canvas.height = 128;

    const context = canvas.getContext( '2d' );
    const gradient = context.createRadialGradient( canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2 );
    gradient.addColorStop( 0.1, 'rgba(0,0,0,0.15)' );
    gradient.addColorStop( 1, 'rgba(0,0,0,0)' );

    context.fillStyle = gradient;
    context.fillRect( 0, 0, canvas.width, canvas.height );

    const shadowTexture = new THREE.CanvasTexture( canvas );

    const shadowMaterial = new THREE.MeshBasicMaterial( { map: shadowTexture, transparent: true } );
    const shadowGeo = new THREE.PlaneGeometry( 300, 300, 1, 1 );

    const radius = 200;

    const geometry1 = new THREE.IcosahedronGeometry( radius, 1 );
  
    const count = geometry1.attributes.position.count;
    geometry1.setAttribute( 'color', new THREE.BufferAttribute( new Float32Array( count * 3 ), 3 ) );
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
        model.position.set( 0, 13, 0 );
        model.scale.set( 50, 50, 50 );
        model.rotation.set(0, 0, Math.PI);
        scene.add( model );
    }, undefined, function ( error ) {
        console.error( error );
    } );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );
    for ( let ii = 0; ii < views.length; ++ ii ) {

        const view = views[ ii ];
        const camera = new THREE.PerspectiveCamera( view.fov, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.fromArray( view.eye );
        camera.up.fromArray( view.up );
        camera.lookAt( scene.position );
        view.camera = camera;
        
    }

    document.addEventListener( 'mousemove', onDocumentMouseMove );

}

function onDocumentMouseMove( event ) {

    mouseX = ( event.clientX - windowWidth / 2 );
    mouseY = ( event.clientY - windowHeight / 2 );

}

function updateSize() {

    if ( windowWidth != window.innerWidth || windowHeight != window.innerHeight ) {

        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;

        renderer.setSize( windowWidth, windowHeight );

    }

}



function animate() {

    render();

    requestAnimationFrame( animate );
    updateSize()
}

function render() {

    updateSize();

    var delta = clock.getDelta();
    if ( mixer ) mixer.update( delta );

    for ( let ii = 0; ii < views.length; ++ ii ) {

        const view = views[ ii ];
        const left = Math.floor( windowWidth * view.left );
        const bottom = Math.floor( windowHeight * view.bottom );
        const width = Math.floor( windowWidth * view.width );
        const height = Math.floor( windowHeight * view.height );

        renderer.setViewport( left, bottom, width, height );
        renderer.setScissor( left, bottom, width, height );
        renderer.setScissorTest( true );

        renderer.render( scene, view.camera );

    }

}
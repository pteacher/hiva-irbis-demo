// DONE: Russian voice recognition and synth
// DONE: Playing 20 seconds of music from Youtube
// DONE: News, Time, Weather on request
// DONE: Computer which can handle Vosk + silero (torch)
// DONE: HIVA guide – интерактивный гид (вывод на табло)
// DONE: Pitch voice to make it cartoon like
// DONE: Голографическая система афиширования
// DONE: 70% Hiva prompt - система для приема и обработки заявок жалоб и предложений на русском языке (нет тестов)
// DONE: 80% Wiki search if not found in QA base (confidence less than 50%) (90% pass)
// DONE: Вывод информации на круговое информационное меню (4-7 пунктов) "что ты умеешь делать?"

// TODO: Question answering local Dialog DataBase (accuracy 90%) - based on test
// TODO: Optimize answer search speed (to 1 sec)
// TODO: 3D Holographic University model: info about all university blocks and each block animated (rotation) and with short info
// TODO: Добавить функцию уточняющих вопросов

// TODO: Mobile app - ticket system for incoming Hiva prompt tasks (problems and suggestions)
// TODO: Add more dialogs (1000 most frequent topics phrases)
// TODO: Video Demo of Project


// TODO: 3D model - Barsik with animations: speaking, idle (blinking, random head turn, tail wave, head scratch, body turns, ear moves), wave on greetings, thumbs up animations

// HIVA EVO (ver. 3)
// TODO: Система визуального распознавания лиц с помощью ИИ

import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {RoughnessMipmapper} from 'three/examples/jsm/utils/RoughnessMipmapper.js';
//import head from './eve_anim.glb';
import head from './chibi_v2.glb';
import {io} from "socket.io-client";
// import {WebGLRenderTarget} from "three";
// import {ShaderPass} from "three/examples/jsm/postprocessing/ShaderPass";
// import {HorizontalBlurShader} from "three/examples/jsm/shaders/HorizontalBlurShader";
// import {VerticalBlurShader} from "three/examples/jsm/shaders/VerticalBlurShader";
import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer";
import {RenderPass} from "three/examples/jsm/postprocessing/RenderPass";
import {UnrealBloomPass} from "three/examples/jsm/postprocessing/UnrealBloomPass";
import {TWEEN} from 'three/examples/jsm/libs/tween.module.min'
// import {GUI} from "three/examples/jsm/libs/dat.gui.module";

const socket = io();

// const getImageTexture = (image, density = 1) => {
//     const canvas = document.createElement('canvas');
//     const ctx = canvas.getContext('2d');
//     const { width, height } = image;
//
//     canvas.setAttribute('width', window.innerWidth * .25);
//     canvas.setAttribute('height', window.innerHeight * .25);
//     canvas.style.width = `${width}px`;
//     canvas.style.height = `${height}px`;
//
//     ctx.drawImage(image, 0, 0, width * density, height * density);
//
//     return canvas;
// };

// let VolumetericLightShader = {
//     uniforms: {
//         tDiffuse: {value:null},
//         lightPosition: {value: new THREE.Vector2(0.5, 0.5)},
//         exposure: {value: 1},
//         decay: {value: 1},
//         density: {value: 6},
//         weight: {value: 0.57},
//         samples: {value: 30}
//     },
//
//     vertexShader: [
//         "varying vec2 vUv;",
//         "void main() {",
//         "vUv = uv;",
//         "gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",
//         "}"
//     ].join("\n"),
//
//     fragmentShader: [
//         "varying vec2 vUv;",
//         "uniform sampler2D tDiffuse;",
//         "uniform vec2 lightPosition;",
//         "uniform float exposure;",
//         "uniform float decay;",
//         "uniform float density;",
//         "uniform float weight;",
//         "uniform int samples;",
//         "const int MAX_SAMPLES = 100;",
//         "void main()",
//         "{",
//         "vec2 texCoord = vUv;",
//         "vec2 deltaTextCoord = texCoord - lightPosition;",
//         "deltaTextCoord *= 1.0 / float(samples) * density;",
//         "vec4 color = texture2D(tDiffuse, texCoord);",
//         "float illuminationDecay = 1.0;",
//         "for(int i=0; i < MAX_SAMPLES; i++)",
//         "{",
//         "if(i == samples) {",
//         "break;",
//         "}",
//         "texCoord += deltaTextCoord;",
//         "vec4 sampled = texture2D(tDiffuse, texCoord);",
//         "sampled *= illuminationDecay * weight;",
//         "color += sampled;",
//         "illuminationDecay *= decay;",
//         "}",
//         "gl_FragColor = color * exposure;",
//         "}"
//     ].join("\n")
// };
// let AdditiveBlendingShader = {
//     uniforms: {
//         tDiffuse: { value:null },
//         tAdd: { value:null }
//     },
//
//     vertexShader: [
//         "varying vec2 vUv;",
//         "void main() {",
//         "vUv = uv;",
//         "gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",
//         "}"
//     ].join("\n"),
//
//     fragmentShader: [
//         "uniform sampler2D tDiffuse;",
//         "uniform sampler2D tAdd;",
//         "varying vec2 vUv;",
//         "void main() {",
//         "vec4 color = texture2D(tDiffuse, vUv);",
//         "vec4 add = texture2D(tAdd, vUv);",
//         "gl_FragColor = color + add;",
//         "}"
//     ].join("\n")
// };
// let PassThroughShader = {
//     uniforms: {
//         tDiffuse: { value: null }
//     },
//
//     vertexShader: [
//         "varying vec2 vUv;",
//         "void main() {",
//         "vUv = uv;",
//         "gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",
//         "}"
//     ].join("\n"),
//
//     fragmentShader: [
//         "uniform sampler2D tDiffuse;",
//         "varying vec2 vUv;",
//         "void main() {",
//         "gl_FragColor = texture2D(tDiffuse, vec2(vUv.x, vUv.y));",
//         "}"
//     ].join("\n")
// };

socket.on("connect", () => {
    console.log(socket.id);
});

socket.on("startspeak", () => {
    console.log("START SPEAK");
    setTimeout(() => {
        fadeToAction("greeting", 0)
    }, 1)

    setTimeout(() => {
        fadeToAction("Mouth loop", 1)
    }, 2)
})

socket.on("endspeak", () => {
    console.log("END SPEAK");
    setTimeout(() => {
        fadeToAction("greeting", 0)
    }, 1)

    setTimeout(() => {
        fadeToAction("Idle", 1)
    }, 2)
})

socket.on("hello", (data) => {
    console.log(data.res.length);

    createCurvedPlane(data.res);
    isInfoShowing = 0;
})
socket.on("announcement", (data) => {
    console.log(data);
    createCircularMenu(data.res.split("|"));
});

let scene, renderer;
let mouseX = 0, mouseY = 0;
let windowWidth, windowHeight, activeAction, previousAction;
let curvedRectangle;
let mixer, actions;
const clock = new THREE.Clock();
let rotSpeed = -4, rotAngle = 180;
let appear = true;
let evenTextMessage = 0;
let isInfoShowing = 3;
let disapearTimer;

let composer,
    // filmPass,
    // badTVPass,
    // bloomPass,
    // blendPass,
    // occlusionComposer,
    itemMesh,
    occMesh;
// occRenderTarget,
// lightSource,
// vlShaderUniforms;

const params = {
    exposure: 1.1,
    bloomStrength: 2.0,
    bloomThreshold: 0.1,
    bloomRadius: 1
};

let renderScene;
const ctx = document.createElement('canvas').getContext('2d');

function fadeMesh(mesh, direction, options) {
    options = options || {};
    // set and check
    let current = {percentage: direction == "in" ? 1 : 0},
        // this check is used to work with normal and multi materials.
        mats = mesh.material.materials ?
            mesh.material.materials : [mesh.material],

        originals = mesh.userData.originalOpacities,
        easing = options.easing || TWEEN.Easing.Linear.None,
        duration = options.duration || 2000;
    // check to make sure originals exist
    if (!originals) {
        console.error("Fade error: originalOpacities not defined, use trackOriginalOpacities");
        return;
    }
    // tween opacity back to originals
    let tweenOpacity = new TWEEN.Tween(current)
        .to({percentage: direction == "in" ? 0 : 1}, duration)
        .easing(easing)
        .onUpdate(function () {
            for (var i = 0; i < mats.length; i++) {
                mats[i].opacity = originals[i] * current.percentage;
            }
        })
        .onComplete(function () {
            if (options.callback) {
                options.callback();
            }
        });
    tweenOpacity.start();
    return tweenOpacity;
}

function createInfoBlock(message, x, y, w, h, n) {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    ctx.canvas.width = w * 3;
    ctx.canvas.height = h * 3;

    // ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    let lineHeight = 50;

    if (message.length < 10 && n < 5) {
        lineHeight = 100;
    }

    ctx.font = lineHeight + 'px Verdana';
    ctx.textAlign = "center";
    // ctx.fillStyle = "#000";


    // context.font = textSize + "px Verdana";
    // let metrics = context.measureText( message );
    // let textWidth = metrics.width;
    //
    // // context.fillStyle = "rgba(255, 255, 255, 0.0)";
    // context.fillStyle = "rgba(255, 255, 255, 0.8)";
    // context.strokeStyle = "rgb(255, 255, 255)";
    const borderThickness = 2;
    // context.lineWidth = borderThickness;
    // roundRect(context, borderThickness/2, borderThickness/2, textWidth + borderThickness + 10, textSize * 1.4 + borderThickness, 6);

    ctx.fillStyle = "#fff";
    roundRect(ctx, borderThickness / 2, borderThickness / 2, ctx.canvas.width, ctx.canvas.height, 20);
    ctx.fillStyle = "#000";
    wrapText(ctx, message, ctx.canvas.width / 2, ctx.canvas.height / 2, ctx.canvas.width - 5, lineHeight);
    // let textSize = 20;
    // ctx.fillStyle = "rgba(0, 0, 0, 1.0)";
    // context.fillStyle = "rgba(255, 10, 10, 1.0)";
    // ctx.fillText( " " + message, borderThickness, textSize + borderThickness);

    let texture = new THREE.Texture(canvas)
    texture.needsUpdate = true;
    texture.repeat.set(-1, 1);
    texture.center.set(0.5, 0.5);
    let spriteMaterial = new THREE.SpriteMaterial(
        {map: texture, useScreenCoordinates: false, rotation: Math.PI, transparent: true, opacity: 0.9});
    let sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(w / 3, h / 3, 0.3);
    sprite.position.set(x, y, 100);
    return sprite;
}

function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

function wrapText(context, text, x, y, maxWidth, lineHeight) {
    let words = text.split(' ');
    let line = '';
    context.textAlign = "center";

    for (let n = 0; n < words.length; n++) {
        console.log(words[n]);
        let testLine = line + words[n] + ' ';
        let metrics = context.measureText(testLine);
        let testWidth = metrics.width;
        if ((testWidth > maxWidth && n > 0) || (words[n] == '\n')) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        } else {
            line = testLine;
        }
    }
    context.fillText(line, x, y);
}

function rotateAboutPoint(obj, point, axis, theta, pointIsWorld) {
    pointIsWorld = (pointIsWorld === undefined) ? false : pointIsWorld;

    if (pointIsWorld) {
        obj.parent.localToWorld(obj.position); // compensate for world coordinate
    }

    obj.position.sub(point); // remove the offset
    obj.position.applyAxisAngle(axis, theta); // rotate the POSITION
    obj.position.add(point); // re-add the offset

    if (pointIsWorld) {
        obj.parent.worldToLocal(obj.position); // undo world coordinates compensation
    }

    obj.rotateOnAxis(axis, -theta); // rotate the OBJECT
}

function planeCurve(g, z) {
    if (!g instanceof THREE.PlaneGeometry) {
        throw new Error('first argument of planeCurve() MUST be an instance of PlaneGeometry');
    }

    let p = g.parameters;
    let hw = p.width * 0.5;

    let a = new THREE.Vector2(-hw, 0);
    let b = new THREE.Vector2(0, z);
    let c = new THREE.Vector2(hw, 0);

    let ab = new THREE.Vector2().subVectors(a, b);
    let bc = new THREE.Vector2().subVectors(b, c);
    let ac = new THREE.Vector2().subVectors(a, c);

    let r = (ab.length() * bc.length() * ac.length()) / (2 * Math.abs(ab.cross(ac)));

    let center = new THREE.Vector2(0, z - r);
    let baseV = new THREE.Vector2().subVectors(a, center);
    let baseAngle = baseV.angle() - (Math.PI * 0.5);
    let arc = baseAngle * 2;

    let uv = g.attributes.uv;
    let pos = g.attributes.position;
    let mainV = new THREE.Vector2();

    for (let i = 0; i < uv.count; i++) {
        let uvRatio = 1 - uv.getX(i);
        let y = pos.getY(i);
        mainV.copy(c).rotateAround(center, (arc * uvRatio));
        pos.setXYZ(i, mainV.x, y, -mainV.y);
    }
    pos.needsUpdate = true;
}

function createCurvedPlane(text) {
    if (curvedRectangle != null) {
        curvedRectangle.geometry.dispose();
        curvedRectangle.material.dispose();
        clearTimeout(disapearTimer);
        scene.remove(curvedRectangle);
    }

    ctx.canvas.width = 320;
    ctx.canvas.height = 180;
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    let lineHeight = 30;

    if (text.length < 10) {
        lineHeight = 60;
    }
    if (text.length > 35) {
        lineHeight = 22;
    }
    if (text.length > 45) {
        lineHeight = 20;
    }

    ctx.font = lineHeight + 'px Verdana';
    ctx.textAlign = "center";
    ctx.fillStyle = "#000";
    wrapText(ctx, text.toUpperCase(), ctx.canvas.width / 2, ctx.canvas.height / 3, ctx.canvas.width - 5, lineHeight);

    const texture = new THREE.CanvasTexture(ctx.canvas);
    const geometry = new THREE.PlaneGeometry(16 / 10, 9 / 10, 8, 1);
    // const positions = geometry.attributes.position;

    planeCurve(geometry, -1);

    const material = new THREE.MeshBasicMaterial({map: texture, transparent: true, opacity: 0.7});
    material.side = THREE.DoubleSide;

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = 0;
    mesh.position.x = 0;
    mesh.position.z = 100;
    mesh.rotation.set(Math.PI, 0, 0);
    mesh.scale.set(90, 90, 90);
    scene.add(mesh);

    curvedRectangle = mesh;
    curvedRectangle.material.opacity = 0;
    appear = true;
    rotSpeed = -4;

    rotAngle = 180;
    rotateAboutPoint(curvedRectangle, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0), THREE.Math.degToRad(rotAngle), true);
    evenTextMessage = 0;

}

const views = [
    { // RIGHT
        left: 0.62,
        bottom: -0.05,
        width: 0.5,
        height: 0.5,
        background: new THREE.Color(0.7, 0.5, 0.5),
        eye: [400, 0, 0],
        up: [0, 0, 1],
        fov: 30,
    },
    { // LEFT
        left: -0.12,
        bottom: -0.05,
        width: 0.5,
        height: 0.5,
        background: new THREE.Color(0.5, 0.7, 0.7),
        eye: [-400, 0, 0],
        up: [0, 0, 1],
        fov: 30,
    },
    { // CENTER
        left: 0.25,
        bottom: 0.5,
        width: 0.5,
        height: 0.5,
        background: new THREE.Color(0.5, 0.5, 0.7),
        eye: [0, -10, 400],
        up: [0, 1, 0],
        fov: 30,
    },
];

let particles;
let pointCloud;
let particlePositions;
let particleNum = 30;
let range = 300;

init();

const roughnessMipmapper = new RoughnessMipmapper(renderer);
animate();

function createCircularMenu(list) {
    // if (curvedRectangle != null) {
    //     curvedRectangle.geometry.dispose();
    //     curvedRectangle.material.dispose();
    //     clearTimeout(disapearTimer);
    //     scene.remove(curvedRectangle);
    // }
    const n = list.length;
    const a = 360 / n;
    const group = new THREE.Group();
    for (const i in list) {
        group.add(createInfoBlock(list[i], Math.cos(Math.PI * (a * i) / 180) * 50, Math.sin(Math.PI * (a * i) / 180) * 50, 7 / n * 150, 7 / n * 75), n);
    }
    group.scale.set(0, 0, 0)
    scene.add(group);

    const bounce = () => {

        new TWEEN.Tween(group.scale)
            .to({
                x: 1,
                y: 1,
                z: 1
            }, 2000)
            .easing(TWEEN.Easing.Quadratic.In)
            .start()
            .onComplete(() => {
                    new TWEEN.Tween(group.scale)
                        .to({
                            x: 1,
                            y: 1,
                            z: 1
                        }, 13000)
                        .easing(TWEEN.Easing.Quadratic.In)
                        .start().onComplete(() => {
                        new TWEEN.Tween(group.scale)
                            .to({
                                x: 0,
                                y: 0,
                                z: 0
                            }, 1000)
                            .easing(TWEEN.Easing.Cubic.In)
                            .start()
                    })
                }
            )
    }

    // fadeMesh(group, "out");

    // setInterval(bounce, 1000);

    bounce();

}

function init() {
    const container = document.getElementById('container');

    scene = new THREE.Scene();

    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 0, 1);
    scene.add(light);

    const light2 = new THREE.DirectionalLight(0xffffff);
    light2.position.set(-10, -10, 0);
    scene.add(light2);

    const light3 = new THREE.DirectionalLight(0xffffff);
    light3.position.set(10, 10, 0);
    scene.add(light3);

    const ambient = new THREE.AmbientLight(0x222222, 0.7);
    scene.add(ambient);

    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;

    const context = canvas.getContext('2d');
    const gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
    gradient.addColorStop(0.1, 'rgba(0,0,0,0.15)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');

    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // const shadowTexture = new THREE.CanvasTexture(canvas);
    // const shadowMaterial = new THREE.MeshBasicMaterial({map: shadowTexture, transparent: true});
    // const shadowGeo = new THREE.PlaneGeometry(300, 300, 1, 1);

    const radius = 200;

    const geometry1 = new THREE.IcosahedronGeometry(radius, 1);
    const textureLoader = new THREE.TextureLoader();

    const sprite1 = textureLoader.load('snowflake2.png');

    let pMaterial = new THREE.PointsMaterial({
        color: 0xFFFFFF,
        size: 30,
        map: sprite1,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
        transparent: true,
    });

    particles = new THREE.BufferGeometry();

    particlePositions = new Float32Array(particleNum * 3);
    for (let i = 0; i < particleNum; i++) {
        let x = Math.random() * range - range / 2;
        let y = Math.random() * range - range / 2;
        let z = Math.random() * range - range / 2;
        particlePositions[i * 3] = x;
        particlePositions[i * 3 + 1] = y;
        particlePositions[i * 3 + 2] = z;
    }
    particles.setDrawRange(0, particleNum);
    particles.addAttribute('position', new THREE.BufferAttribute(particlePositions, 3).setDynamic(true));
    pointCloud = new THREE.Points(particles, pMaterial);
    // scene.add( pointCloud );

    const count = geometry1.attributes.position.count;
    geometry1.setAttribute('color', new THREE.BufferAttribute(new Float32Array(count * 3), 3));

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ReinhardToneMapping;
    container.appendChild(renderer.domElement);
    scene.add(new THREE.AmbientLight(0x404040));

    for (let ii = 0; ii < views.length; ++ii) {
        const view = views[ii];
        const camera = new THREE.PerspectiveCamera(view.fov, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.fromArray(view.eye);
        camera.up.fromArray(view.up);
        camera.lookAt(scene.position);
        view.camera = camera;

        renderScene = new RenderPass(scene, view.camera);
        // setupScene();
        // setupPostprocessing(window.innerWidth, window.innerHeight, camera);
        const controls = new OrbitControls(camera, renderer.domElement);
        const pointLight = new THREE.PointLight(0xffffff, 1);
        camera.add(pointLight);
        controls.update();


        // const hBlur = new THREE.ShaderPass(THREE.HorizontalBlurShader);
        // const vBlur = new THREE.ShaderPass(THREE.VerticalBlurShader);
        //
        // composer = new THREE.EffectComposer(renderer);
        // composer.addPass(new THREE.RenderPass(scene, camera));
        // occRenderTarget = new THREE.WebGLRenderTarget(window.innerWidth * .25, window.innerHeight * .25);
        // occlusionComposer = new THREE.EffectComposer(renderer, occRenderTarget);
        // occlusionComposer.addPass(new THREE.RenderPass(scene, camera));
        // occlusionComposer.addPass(hBlur);
        // occlusionComposer.addPass(vBlur);
        // occlusionComposer.addPass(hBlur);
        // occlusionComposer.addPass(vBlur);
        // occlusionComposer.addPass(hBlur);
    }

    const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 2.5, 1, 0.1);
    bloomPass.threshold = params.bloomThreshold;
    bloomPass.strength = params.bloomStrength;
    bloomPass.radius = params.bloomRadius;

    composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    // renderer.toneMappingExposure = Math.pow( 2, 4.0 );
    // bloomPass.threshold = Number( 1 );
    // bloomPass.strength = Number( 0 );
    // bloomPass.radius = Number( 1 );

    const loader = new GLTFLoader();
    loader.load(head, function (gltf) {
        const model = gltf.scene;

        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                roughnessMipmapper.generateMipmaps(child.material);

                // if (child.name.includes('others')) {
                //     child.material.transparent = true;
                //     child.material.opacity = 0.0;
                //     console.log(child.name);
                // }
            }
        })
        mixer = new THREE.AnimationMixer(gltf.scene);
        initAnimations(gltf)
        console.log(actions);
        activeAction = actions["Idle"];

        // setTimeout(() => {
        //     fadeToAction("idle", 0.2)
        // }, 12000)

        // setInterval(() => {
        //     fadeToAction("KeyAction", 0.2)
        // }, 60000)

        setInterval(() => {
            fadeToAction("Idle", .1)
        }, 62000)
        setInterval(() => {
            fadeToAction("Blinking", .1)
        }, 60000)

        // playAnimationOnce("Take 001_right_finger1");
        model.position.set(0, 60, 0);
        // model.scale.set(75, 75, 75);
        model.scale.set(130, 130, 130);
        // model.scale.set(1.5, 1.5, 1.5);
        //model.position.set(2, 5, 0);
        model.rotation.set(0, 0, Math.PI);

        scene.add(model);


        // let blockASprite = createInfoBlock( "A BLOCK" );
        // blockASprite.position.set(-30, 130, -80);
        // blockASprite.rotation.set(0, 0, Math.PI);
        // scene.add( blockASprite );
        //
        // let blockBSprite = createInfoBlock( "B BLOCK" );
        // blockBSprite.position.set(-10, 50, -80);
        // blockBSprite.rotation.set(0, 0, Math.PI);
        // scene.add( blockBSprite );
        //
        // let gymSprite = createInfoBlock( "GYM" );
        // gymSprite.position.set(60, 40, -80);
        // gymSprite.rotation.set(0, 0, Math.PI);
        // scene.add( gymSprite );
        //
        // let blockCSprite = createInfoBlock( "C BLOCK" );
        // blockCSprite.position.set(55, 135, -80);
        // blockCSprite.rotation.set(0, 0, Math.PI);
        // scene.add( blockCSprite );
        //
        // let cafeSprite = createInfoBlock( "CAFE" );
        // cafeSprite.position.set(100, 132, -80);
        // cafeSprite.rotation.set(0, 0, Math.PI);
        // scene.add( cafeSprite );
        //
        // let fieldSprite = createInfoBlock( "FIELDS" );
        // fieldSprite.position.set(90, 55, -80);
        // fieldSprite.rotation.set(0, 0, Math.PI);
        // scene.add( fieldSprite );
        //
        // let restZoneSprite = createInfoBlock( "REST ZONE" );
        // restZoneSprite.position.set(90, 20, -80);
        // restZoneSprite.rotation.set(0, 0, Math.PI);
        // scene.add( restZoneSprite );
        //
        // let blockDSprite = createInfoBlock( "D BLOCK" );
        // blockDSprite.position.set(50, -90, -80);
        // blockDSprite.rotation.set(0, 0, Math.PI);
        // scene.add( blockDSprite );


    }, undefined, function (error) {
    }, undefined, function (error) {
        console.error(error);
    });


    // const gui = new GUI();
    //
    // gui.add( params, 'exposure', 0.1, 2 ).onChange( function ( value ) {
    //
    //     renderer.toneMappingExposure = Math.pow( value, 4.0 );
    //
    // } );
    //
    // gui.add( params, 'bloomThreshold', 0.0, 1.0 ).onChange( function ( value ) {
    //
    //     bloomPass.threshold = Number( value );
    //
    // } );
    //
    // gui.add( params, 'bloomStrength', 0.0, 3.0 ).onChange( function ( value ) {
    //
    //     bloomPass.strength = Number( value );
    //
    // } );
    //
    // gui.add( params, 'bloomRadius', 0.0, 1.0 ).step( 0.01 ).onChange( function ( value ) {
    //
    //     bloomPass.radius = Number( value );
    //
    // } );
    let faculties = ["ФАКУЛЬТЕТ ИНЖЕНЕРИИ И ИНФОРМАТИКИ", "ФАКУЛЬТЕТ МЕДИЦИНЫ", "ГУМАНИТАРНЫЙ ФАКУЛЬТЕТ", "ФАКУЛЬТЕТ МЕНЕДЖМЕНТА И ЭКОНОМИКИ"];
    // let app = ["ПОГОДА", "ВРЕМЯ", "НОВОСТИ", "ВИРТУАЛЬНЫЙ ТУР", "ЖАЛОБА", "МУЗЫКА", "ПЕСНЯ"]


    document.addEventListener('mousemove', onDocumentMouseMove);
}

function fadeToAction(name, duration) {
    previousAction = activeAction;
    activeAction = actions[name];
    if (previousAction !== activeAction) {
        previousAction.fadeOut(duration);
    }
    activeAction
        .reset()
        .setEffectiveTimeScale(1)
        .setEffectiveWeight(1)
        .fadeIn(duration)
        // .setLoop(THREE.LoopOnce, 1)
        .play();
}

function initAnimations(gltf) {
    actions = {};
    gltf.animations.forEach(i => {
        actions[i.name] = mixer.clipAction(i)
    })
}

function playAnimationOnce(animName, animationStopCallback = () => {
}, reverse = false) {
    let action = actions[animName]
    if (action !== null && action !== undefined) {
        try {
            action.loop = 2200
            action.enabled = true;
            action.clampWhenFinished = true;
            action.paused = false;
            if (reverse) {
                action.timeScale = -1;
            }
            action.play();
            let action = actions["Blinking"]
            action.clampWhenFinished = true;
            action.enabled = true;
            action.loop = THREE.LoopOnce;
            action.paused = false;
            action.play();
            setTimeout(() => {
                animationStopCallback()
            }, action.duration * 1000)
        } catch (e) {
            console.error(e)
        }
    } else {
        console.error("animation play error! animName => " + animName);
    }
}

function startAnimation(animName) {
    let g = actions[animName]
    if (g !== null && g !== undefined) {
        try {
            g.play();
        } catch (e) {
            console.error(e)
        }
    } else {
        console.error("animation play error! animName => " + animName);
    }
}

function stopAnimation(animName) {
    let g = actions[animName]
    if (g !== null && g !== undefined) {
        try {
            g.stop();
        } catch (e) {
            console.error(e)
        }
    } else {
        console.error("animation play error! animName => " + animName);
    }
}

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowWidth / 2);
    mouseY = (event.clientY - windowHeight / 2);
}

function updateSize() {
    if (windowWidth != window.innerWidth || windowHeight != window.innerHeight) {
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
        renderer.setSize(windowWidth, windowHeight);
    }
}


function animate() {
    // let time = Date.now() * 0.001;
    // for (let i= 0; i < particleNum; i++ ) {
    //     particlePositions[i*3+1] += 1;
    //     if (particlePositions[i*3+1] > range/2 ){
    //         particlePositions[i*3+1] = -range/2
    //     }
    // }
    //
    // pointCloud.geometry.attributes.position.needsUpdate = true;
    TWEEN.update();

    if (isInfoShowing <= 1 && appear && rotAngle > 0) {
        rotateAboutPoint(curvedRectangle, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0), THREE.Math.degToRad(rotSpeed));
        curvedRectangle.material.opacity = evenTextMessage % 2 == 0 ? 0.7 - (rotAngle / 180) : 0.7 * (rotAngle / 180);
        rotAngle += rotSpeed;
    } else {
        if (rotAngle <= 0 && appear) {
            appear = false;
            disapearTimer = setTimeout(() => {
                evenTextMessage++;
                rotSpeed = -4;
                rotAngle = 180;
                appear = true;
                isInfoShowing++;
            }, 10 * 1000); // SECONDS TO WAIT BEFORE PANE WILL DISAPPEAR

        }
    }


    render();
    requestAnimationFrame(animate);
    // update();

    updateSize()
    // composer.render();
    // controls.update();
}

function update() {
    const timeDelta = clock.getDelta();
    const elapsed = clock.getElapsedTime();

    if (itemMesh) {
        itemMesh.rotation.y = Math.sin(elapsed / 2) / 15;
        itemMesh.rotation.z = Math.cos(elapsed / 2) / 50;
        occMesh.rotation.copy(itemMesh.rotation);
    }
}

function render() {
    // for (let ii = 0; ii < views.length; ++ii) {
    //     const view = views[ii];
    //     view.camera.layers.set(1);
    //     //renderer.setClearColor(0x000000);
    //     occlusionComposer.render();
    //
    //     view.camera.layers.set(0);
    //     //renderer.setClearColor(0x000000);
    //     composer.render();
    // }
    // updateSize();
    let delta = clock.getDelta();
    if (mixer) mixer.update(delta);

    for (let ii = 0; ii < views.length; ++ii) {

        const view = views[ii];
        const left = Math.floor(windowWidth * view.left);
        const bottom = Math.floor(windowHeight * view.bottom);
        const width = Math.floor(windowWidth * view.width);
        const height = Math.floor(windowHeight * view.height);

        renderer.setViewport(left, bottom, width, height);
        renderer.setScissor(left, bottom, width, height);
        renderer.setScissorTest(true);

        renderer.render(scene, view.camera);

    }

}

// https://manu.ninja/webgl-three-js-annotations/
// https://stemkoski.github.io/Three.js/Labeled-Geometry.html
// https://stemkoski.github.io/Three.js/
// https://threejs.org/examples/#webgl_postprocessing_unreal_bloom
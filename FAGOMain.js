import { STARTING_BLOCKS, BLOCK_SIZE, AUTOSAVE_INTERVAL } from './config.js';

import * as THREE from 'three';

import { OrbitControls } from 'OrbitControls';



let blockCount = STARTING_BLOCKS;

const placedBlocks = new Map();



const container = document.getElementById('gameContainer');



// Set up the Three.js scene, camera, and renderer

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x1a1a1a); // dark gray background



const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.set(10, 15, 20);

camera.lookAt(0, 0, 0);



const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);

container.appendChild(renderer.domElement);



// OrbitControls for easy camera movement

const controls = new OrbitControls(camera, renderer.domElement);

controls.target.set(0, 0, 0);

controls.update();



// Lighting

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);

scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);

dirLight.position.set(10, 20, 10);

scene.add(dirLight);



// Create an invisible ground plane for raycasting

const groundGeo = new THREE.PlaneGeometry(100, 100);

const groundMat = new THREE.MeshBasicMaterial({ visible: false });

const ground = new THREE.Mesh(groundGeo, groundMat);

ground.rotateX(-Math.PI / 2);

scene.add(ground);



// Add a grid helper for visual reference

const gridHelper = new THREE.GridHelper(100, 100, 0x4a9eff, 0x2a2a2a);

scene.add(gridHelper);



// Raycaster setup

const raycaster = new THREE.Raycaster();

const mouse = new THREE.Vector2();



// Update the on-screen block count display

function updateBlockCount() {

  document.getElementById('blockCount').textContent = `Осталось блоков: ${blockCount}`;

}



// Handle left-click: add a block if available

function onClick(event) {

  event.preventDefault();

  if (blockCount <= 0) return;

  

  // Calculate mouse position in normalized device coordinates (-1 to +1)

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;

  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  

  raycaster.setFromCamera(mouse, camera);

  

  // Check intersections with the ground and any placed blocks

  const intersectableObjects = [ground, ...Array.from(placedBlocks.values())];

  const intersects = raycaster.intersectObjects(intersectableObjects);

  

  if (intersects.length > 0) {

    const intersect = intersects[0];

    const newPos = new THREE.Vector3();

    

    if (intersect.object === ground) {

      // Clicking on the ground places a block with its bottom face on the ground.

      newPos.set(

        Math.round(intersect.point.x / BLOCK_SIZE) * BLOCK_SIZE,

        BLOCK_SIZE / 2,

        Math.round(intersect.point.z / BLOCK_SIZE) * BLOCK_SIZE

      );

    } else {

      // Clicking on an existing block: place the new block adjacent to that block.

      const clickedBlock = intersect.object;

      const origin = clickedBlock.userData.gridPosition;

      const normal = intersect.face.normal;

      newPos.set(

        origin.x + normal.x * BLOCK_SIZE,

        origin.y + normal.y * BLOCK_SIZE,

        origin.z + normal.z * BLOCK_SIZE

      );

      // Ensure values are snapped to the grid

      newPos.set(

        Math.round(newPos.x),

        Math.round(newPos.y),

        Math.round(newPos.z)

      );

    }

    

    const key = `${newPos.x},${newPos.y},${newPos.z}`;

    if (placedBlocks.has(key)) return; // Do not add if a block already exists here

    

    // Create the new block

    const geometry = new THREE.BoxGeometry(BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);

    const material = new THREE.MeshLambertMaterial({ color: 0x8B4513 });

    const block = new THREE.Mesh(geometry, material);

    block.position.copy(newPos);

    block.userData.gridPosition = { x: newPos.x, y: newPos.y, z: newPos.z };

    

    scene.add(block);

    placedBlocks.set(key, block);

    

    blockCount--;

    updateBlockCount();

  }

}



// Handle right-click: remove a block and refund a block count

function onRightClick(event) {

  event.preventDefault();

  

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;

  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(Array.from(placedBlocks.values()));

  

  if (intersects.length > 0) {

    const block = intersects[0].object;

    const pos = block.userData.gridPosition;

    const key = `${pos.x},${pos.y},${pos.z}`;

    scene.remove(block);

    placedBlocks.delete(key);

    

    blockCount++;

    updateBlockCount();

  }

}



// Event listeners for block placement and removal

renderer.domElement.addEventListener('click', onClick, false);

renderer.domElement.addEventListener('contextmenu', onRightClick, false);



// Handle window resizing

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

}

window.addEventListener('resize', onWindowResize, false);



// Animation loop

function animate() {

  requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);

}

animate();



// Load saved data when the page loads

function loadSavedData() {

  const savedData = localStorage.getItem('fagoGameState');

  if (savedData) {

    const data = JSON.parse(savedData);

    

    // Restore block count

    blockCount = data.blockCount;

    updateBlockCount();

    

    // Restore placed blocks

    data.placedBlocks.forEach(blockData => {

      const geometry = new THREE.BoxGeometry(BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);

      const material = new THREE.MeshLambertMaterial({ color: 0x8B4513 });

      const block = new THREE.Mesh(geometry, material);

      

      block.position.set(blockData.position.x, blockData.position.y, blockData.position.z);

      block.userData.gridPosition = blockData.position;

      

      scene.add(block);

      placedBlocks.set(

        `${blockData.position.x},${blockData.position.y},${blockData.position.z}`,

        block

      );

    });

  }

}



// Save game state

function saveGameState() {

  const gameState = {

    blockCount: blockCount,

    placedBlocks: Array.from(placedBlocks.values()).map(block => ({

      position: block.userData.gridPosition

    }))

  };

  

  localStorage.setItem('fagoGameState', JSON.stringify(gameState));

  showNotification('Игра сохранена', 2000);

}



// Set up auto-save interval

setInterval(saveGameState, AUTOSAVE_INTERVAL);



// Add save before user leaves page

window.addEventListener('beforeunload', saveGameState);



// Hide the loading screen once the window is loaded

window.addEventListener('load', () => {

  const loading = document.getElementById('loading');

  if (loading) loading.style.display = 'none';

  loadSavedData();

});



// Function to show notification

function showNotification(message, duration = 3000) {

  const notification = document.getElementById('notification');

  notification.textContent = message;

  notification.style.display = 'block';

  

  setTimeout(() => {

    notification.style.display = 'none';

  }, duration);

}



// Add finish building functionality

const finishBuildBtn = document.getElementById('finishBuildBtn');

finishBuildBtn.addEventListener('click', () => {

  if (placedBlocks.size === 0) {

    showNotification("Вы ничего не построили. Пожалуйста, постройте что-нибудь.");

    return;

  }

  

  showNotification("Строительство завершено! Проверьте вашу сумку, чтобы увидеть свое творение.");

  updateBagTab(); // Update the bag tab with the latest build

  

  // Switch to the bag tab

  document.querySelector('[data-tab="bag"]').click();

});



/* --- New Tab Functionality --- */



// Function to update the Bag tab with the list of built blocks.

function updateBagTab() {

  const bagList = document.getElementById('bagList');

  bagList.innerHTML = '';

  

  if (placedBlocks.size === 0) {

    const li = document.createElement('li');

    li.textContent = 'У вас пока нет построек';

    li.classList.add('empty-bag');

    bagList.appendChild(li);

    return;

  }



  const buildingContainer = document.createElement('div');

  buildingContainer.classList.add('building-item');

  

  const blockCount = placedBlocks.size;

  const sellPrice = Math.ceil(blockCount * 1.1);

  

  buildingContainer.innerHTML = `

    <div class="building-info">

      <span>Текущая постройка</span>

      <span>Использовано блоков: ${blockCount}</span>

    </div>

    <button class="sell-btn" data-blocks="${blockCount}">

      Продать за ${sellPrice} блоков

    </button>

  `;

  

  bagList.appendChild(buildingContainer);



  // Add event listener for sell button

  const sellBtn = buildingContainer.querySelector('.sell-btn');

  sellBtn.addEventListener('click', () => {

    const blocks = parseInt(sellBtn.getAttribute('data-blocks'));

    sellBuilding(blocks);

  });

}



function sellBuilding(blocks) {

  // Calculate price: original blocks plus 10% bonus

  const price = Math.ceil(blocks * 1.1);

  blockCount += price;

  updateBlockCount();

  

  // Clear all blocks from the scene

  placedBlocks.forEach(block => {

    scene.remove(block);

  });

  placedBlocks.clear();

  

  showNotification(`Постройка продана за ${price} блоков!`);

  updateBagTab();

}



// Event listeners for tab switching

document.querySelectorAll('#tabsNav button').forEach(btn => {

  btn.addEventListener('click', () => {

    const tab = btn.getAttribute('data-tab');

    // Remove active classes from all buttons and panels

    document.querySelectorAll('#tabsNav button').forEach(b => b.classList.remove('active'));

    document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));

    

    // Activate the selected tab and its panel

    btn.classList.add('active');

    document.getElementById('tab-' + tab).classList.add('active');



    // Toggle the visibility of the 3D build scene based on the active tab.

    const gameContainer = document.getElementById('gameContainer');

    if (tab === 'build') {

      gameContainer.style.display = 'block';

    } else {

      gameContainer.style.display = 'none';

    }

    

    if (tab === 'bag') {

      updateBagTab();

    }

  });

});



// Setup the Copy Link functionality for Friends tab.

const copyLinkBtn = document.getElementById('copyLink');

if (copyLinkBtn) {

  copyLinkBtn.addEventListener('click', () => {

    navigator.clipboard.writeText(window.location.href)

      .then(() => {

        const copyMsg = document.getElementById('copyMsg');

        copyMsg.style.display = 'inline';

        setTimeout(() => {

          copyMsg.style.display = 'none';

        }, 2000);

      })

      .catch(err => {

        console.error('Could not copy text: ', err);

      });

  });

}


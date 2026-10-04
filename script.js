/**
 * ==========================================================================
 * APLICACIÓN DE MATEMÁTICAS EN PIZARRA ESCOLAR (SUMAS Y RESTAS CON DIBUJOS)
 * Desarrollado con JavaScript nativo para alto rendimiento táctil en PDI,
 * tablets y móviles. Web Audio API integrado para sonidos 100% offline.
 * ==========================================================================
 */

// ==========================================================================
// 1. CATÁLOGO EXTENSO DE DIBUJOS INFANTILES (ANIMALES, FRUTAS, JUGUETES, ETC.)
// ==========================================================================
const DRAWING_CATALOG = [
  // Animales
  { id: 'lion', name: 'Leoncitos', emoji: '🦁', category: 'animales' },
  { id: 'elephant', name: 'Elefantitos', emoji: '🐘', category: 'animales' },
  { id: 'giraffe', name: 'Jirafitas', emoji: '🦒', category: 'animales' },
  { id: 'monkey', name: 'Monitos', emoji: '🐒', category: 'animales' },
  { id: 'panda', name: 'Panditas', emoji: '🐼', category: 'animales' },
  { id: 'dog', name: 'Perritos', emoji: '🐶', category: 'animales' },
  { id: 'cat', name: 'Gatitos', emoji: '🐱', category: 'animales' },
  { id: 'frog', name: 'Ranitas', emoji: '🐸', category: 'animales' },
  { id: 'duck', name: 'Patitos', emoji: '🦆', category: 'animales' },
  { id: 'penguin', name: 'Pingüinitos', emoji: '🐧', category: 'animales' },
  { id: 'bee', name: 'Abejitas', emoji: '🐝', category: 'animales' },
  { id: 'butterfly', name: 'Mariposas', emoji: '🦋', category: 'animales' },
  { id: 'turtle', name: 'Tortuguitas', emoji: '🐢', category: 'animales' },
  { id: 'dolphin', name: 'Delfines', emoji: '🐬', category: 'animales' },
  { id: 'rabbit', name: 'Conejitos', emoji: '🐰', category: 'animales' },
  { id: 'owl', name: 'Búhos', emoji: '🦉', category: 'animales' },
  { id: 'chick', name: 'Pollitos', emoji: '🐥', category: 'animales' },
  { id: 'ladybug', name: 'Mariquitas', emoji: '🐞', category: 'animales' },

  // Frutas y Alimentos
  { id: 'apple', name: 'Manzanas', emoji: '🍎', category: 'frutas' },
  { id: 'banana', name: 'Plátanos', emoji: '🍌', category: 'frutas' },
  { id: 'strawberry', name: 'Fresas', emoji: '🍓', category: 'frutas' },
  { id: 'orange', name: 'Naranjas', emoji: '🍊', category: 'frutas' },
  { id: 'watermelon', name: 'Sandías', emoji: '🍉', category: 'frutas' },
  { id: 'grapes', name: 'Uvas', emoji: '🍇', category: 'frutas' },
  { id: 'cherries', name: 'Cerezas', emoji: '🍒', category: 'frutas' },
  { id: 'carrot', name: 'Zanahorias', emoji: '🥕', category: 'frutas' },
  { id: 'icecream', name: 'Helados', emoji: '🍦', category: 'frutas' },
  { id: 'cupcake', name: 'Pastelitos', emoji: '🧁', category: 'frutas' },

  // Juguetes, Objetos y Vehículos
  { id: 'star', name: 'Estrellas', emoji: '⭐', category: 'objetos' },
  { id: 'rocket', name: 'Cohetes', emoji: '🚀', category: 'objetos' },
  { id: 'car', name: 'Coches', emoji: '🚗', category: 'objetos' },
  { id: 'train', name: 'Trencitos', emoji: '🚂', category: 'objetos' },
  { id: 'boat', name: 'Barquitos', emoji: '⛵', category: 'objetos' },
  { id: 'plane', name: 'Avioncitos', emoji: '✈️', category: 'objetos' },
  { id: 'balloon', name: 'Globos', emoji: '🎈', category: 'objetos' },
  { id: 'ball', name: 'Balones', emoji: '⚽', category: 'objetos' },
  { id: 'gift', name: 'Regalos', emoji: '🎁', category: 'objetos' },
  { id: 'pencil', name: 'Lápices', emoji: '✏️', category: 'objetos' },
  { id: 'flower', name: 'Flores', emoji: '🌸', category: 'objetos' },
  { id: 'sun', name: 'Soles', emoji: '☀️', category: 'objetos' }
];

// ==========================================================================
// 2. SISTEMA DE SONIDOS SINTETIZADOS CON WEB AUDIO API (100% OFFLINE)
// ==========================================================================
class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playChalkTap() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(450, t);
    osc.frequency.exponentialRampToValueAtTime(150, t + 0.04);

    gain.gain.setValueAtTime(0.18, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.04);
  }

  playPop() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, t);
    osc.frequency.exponentialRampToValueAtTime(780, t + 0.09);

    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.09);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.09);
  }

  playTachado() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    
    // Simulación de tiza roja raspando la pizarra
    const bufferSize = this.ctx.sampleRate * 0.12;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.45));
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1300, t);
    filter.Q.setValueAtTime(2.2, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.35, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.12);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    whiteNoise.start(t);
  }

  playSuccess() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    // Arpegio brillante y alegre: Do5 -> Mi5 -> Sol5 -> Do6
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t + idx * 0.09);

      gain.gain.setValueAtTime(0.001, t + idx * 0.09);
      gain.gain.linearRampToValueAtTime(0.26, t + idx * 0.09 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.09 + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t + idx * 0.09);
      osc.stop(t + idx * 0.09 + 0.5);
    });

    // Campana final armónica
    setTimeout(() => {
      if (!this.enabled || !this.ctx) return;
      const tBell = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1318.51, tBell);
      gain.gain.setValueAtTime(0.3, tBell);
      gain.gain.exponentialRampToValueAtTime(0.001, tBell + 0.75);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(tBell);
      osc.stop(tBell + 0.8);
    }, 380);
  }

  playError() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(280, t);
    osc.frequency.exponentialRampToValueAtTime(130, t + 0.28);

    gain.gain.setValueAtTime(0.24, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.28);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.3);
  }
}

const sounds = new SoundFX();

// ==========================================================================
// 3. ESTADO GLOBAL DE LA APLICACIÓN
// ==========================================================================
const AppState = {
  operation: 'add',        // 'add' (Suma) o 'sub' (Resta)
  maxLimit: 10,            // 10 o 19
  summandsCount: 2,        // 2 o 3 (solo en suma)
  isManualMode: false,     // Modo manual activado por docente

  // Datos de la operación actual
  currentProblem: {
    type: 'add',
    operands: [3, 4],      // Sumandos o [Minuendo, Sustraendo]
    expectedResult: 7,
    themes: []             // Temas visuales para los dibujos
  },

  // Estado de interacción
  crossedIndices: new Set(), // En resta: índices tachados
  
  // Respuestas introducidas en los recuadros
  // En resta: userAnswers[2] es el único editable (resultado)
  // En suma: userAnswers contiene [sumando1, sumando2, (sumando3), resultado]
  userAnswers: [],
  activeBoxIndex: null,     // Cuál recuadro está activo en el teclado

  // Estado de validación
  checkedState: null        // null, 'success', 'error'
};

// ==========================================================================
// 4. GENERACIÓN DE OPERACIONES MATEMÁTICAS
// ==========================================================================
function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomThemes(count) {
  const shuffled = [...DRAWING_CATALOG].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generateNewProblem() {
  AppState.isManualMode = false;
  document.getElementById('manual-banner').classList.remove('show');

  const { operation, maxLimit, summandsCount } = AppState;

  if (operation === 'add') {
    let addends = [];
    let total = 0;

    if (maxLimit === 10) {
      if (summandsCount === 2) {
        total = getRandomInt(2, 10);
        const a = getRandomInt(1, total - 1);
        const b = total - a;
        addends = [a, b];
      } else {
        total = getRandomInt(3, 10);
        const a = getRandomInt(1, total - 2);
        const b = getRandomInt(1, total - a - 1);
        const c = total - a - b;
        addends = [a, b, c];
      }
    } else {
      // Máximo 19 (Iniciación a las llevadas: total entre 11 y 19)
      if (summandsCount === 2) {
        total = getRandomInt(11, 19);
        const a = getRandomInt(Math.max(2, total - 9), Math.min(9, total - 2));
        const b = total - a;
        addends = [a, b];
      } else {
        total = getRandomInt(11, 19);
        const a = getRandomInt(2, 7);
        const b = getRandomInt(2, 7);
        const c = total - a - b;
        addends = [a, b, c];
      }
    }

    AppState.currentProblem = {
      type: 'add',
      operands: addends,
      expectedResult: total,
      themes: getRandomThemes(summandsCount)
    };

    // En suma, casillas para cada sumando y el resultado
    AppState.userAnswers = new Array(addends.length + 1).fill('');

  } else {
    // Modo Resta:
    // REQUISITO CLAVE: El alumno NO escribe minuendo ni sustraendo.
    // Solo tacha en los dibujos y escribe el resultado.
    let minuend = 0;
    let subtrahend = 0;

    if (maxLimit === 10) {
      minuend = getRandomInt(3, 10);
      subtrahend = getRandomInt(1, minuend - 1);
    } else {
      // Resta hasta 19 con iniciación a llevadas
      minuend = getRandomInt(11, 19);
      const minSub = (minuend % 10) + 1; // Para cruzar la decena
      subtrahend = getRandomInt(Math.max(2, minSub), Math.min(9, minuend - 1));
    }

    const difference = minuend - subtrahend;

    AppState.currentProblem = {
      type: 'sub',
      operands: [minuend, subtrahend],
      expectedResult: difference,
      themes: getRandomThemes(1)
    };

    // En resta, minuendo y sustraendo están fijos; solo el resultado (índice 2) está vacío
    AppState.userAnswers = [String(minuend), String(subtrahend), ''];
  }

  // Resetear estados visuales
  AppState.crossedIndices.clear();
  AppState.checkedState = null;
  AppState.activeBoxIndex = null;

  renderBlackboard();
}

// ==========================================================================
// 5. RENDERIZADO DEL ESCENARIO DE DIBUJOS Y MATEMÁTICAS
// ==========================================================================
function renderBlackboard() {
  renderDrawingsArea();
  renderEquationBoxes();
  updateFeedbackUI();
  closeKeypad();
}

/**
 * Renderiza la zona de dibujos con máximo protagonismo visual
 */
function renderDrawingsArea() {
  const container = document.getElementById('drawings-stage');
  container.innerHTML = '';

  const { type, operands, themes } = AppState.currentProblem;
  container.className = 'drawings-stage ' + (type === 'add' ? 'mode-add' : 'mode-sub');

  if (type === 'add') {
    // MODO SUMA: Mostrar grupos de dibujos separados por '+' (sin textos spoiler de conteo)
    operands.forEach((count, groupIdx) => {
      const theme = themes[groupIdx] || DRAWING_CATALOG[0];

      const groupEl = document.createElement('div');
      groupEl.className = 'drawings-group';

      const gridEl = document.createElement('div');
      gridEl.className = 'group-items-grid';

      for (let i = 0; i < count; i++) {
        const card = document.createElement('div');
        card.className = 'drawing-card';
        card.title = `Toca para contar`;
        card.innerHTML = `
          <span>${theme.emoji}</span>
          <span class="count-badge">✓</span>
        `;

        card.addEventListener('pointerdown', (e) => {
          e.preventDefault();
          sounds.playPop();
          card.classList.toggle('counted');
        });

        gridEl.appendChild(card);
      }

      groupEl.appendChild(gridEl);
      container.appendChild(groupEl);

      // Signo '+' entre grupos
      if (groupIdx < operands.length - 1) {
        const signEl = document.createElement('div');
        signEl.className = 'math-operator-sign';
        signEl.textContent = '+';
        container.appendChild(signEl);
      }
    });

  } else {
    // MODO RESTA:
    // Minuendo dibujos mostrados a gran tamaño sin textos spoiler.
    // El alumno tacha tocando los dibujos.
    const minuend = operands[0];
    const subtrahend = operands[1];
    const theme = themes[0] || DRAWING_CATALOG[0];

    const groupEl = document.createElement('div');
    groupEl.className = 'drawings-group';

    const gridEl = document.createElement('div');
    gridEl.className = 'group-items-grid';

    for (let i = 0; i < minuend; i++) {
      const isCrossed = AppState.crossedIndices.has(i);

      const card = document.createElement('div');
      card.className = `drawing-card ${isCrossed ? 'crossed' : ''}`;
      card.dataset.index = i;
      card.title = isCrossed ? 'Tachado (toca para quitar la cruz)' : 'Toca para tachar';
      card.innerHTML = `
        <span>${theme.emoji}</span>
        ${isCrossed ? `
          <div class="chalk-cross-overlay">
            <svg viewBox="0 0 40 40">
              <line x1="6" y1="6" x2="34" y2="34" />
              <line x1="34" y1="6" x2="6" y2="34" />
            </svg>
          </div>
        ` : ''}
      `;

      card.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        if (AppState.crossedIndices.has(i)) {
          AppState.crossedIndices.delete(i);
          sounds.playChalkTap();
        } else {
          AppState.crossedIndices.add(i);
          sounds.playTachado();
        }
        renderDrawingsArea();
      });

      gridEl.appendChild(card);
    }

    groupEl.appendChild(gridEl);

    // Botón discreto para reiniciar tachas si el alumno desea
    const helperBar = document.createElement('div');
    helperBar.className = 'subtraction-counter-helper';
    helperBar.innerHTML = `
      <button type="button" class="btn-small-wood" id="btn-clear-crosses" title="Quitar todos los tachados">🧹 Deshacer tachados</button>
    `;

    groupEl.appendChild(helperBar);
    container.appendChild(groupEl);

    const clearBtn = helperBar.querySelector('#btn-clear-crosses');
    if (clearBtn) {
      clearBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        sounds.playChalkTap();
        AppState.crossedIndices.clear();
        renderDrawingsArea();
      });
    }
  }
}

/**
 * Renderiza los recuadros de la ecuación matemática
 * En resta: minuendo y sustraendo están dados en tiza; solo el resultado es recuadro.
 * En suma: sumandos y resultado son recuadros.
 */
function renderEquationBoxes() {
  const container = document.getElementById('equation-stage');
  container.innerHTML = '';

  const { type, operands } = AppState.currentProblem;

  if (type === 'add') {
    // Suma: [Sumando 1] + [Sumando 2] (+ [Sumando 3]) = [Resultado]
    operands.forEach((_, idx) => {
      container.appendChild(createSlotElement(idx, `Sumando ${idx + 1}`));

      if (idx < operands.length - 1) {
        const plus = document.createElement('span');
        plus.className = 'math-symbol';
        plus.textContent = '+';
        container.appendChild(plus);
      }
    });

    const equal = document.createElement('span');
    equal.className = 'math-symbol';
    equal.textContent = '=';
    container.appendChild(equal);

    const resultIdx = operands.length;
    container.appendChild(createSlotElement(resultIdx, 'Total'));

  } else {
    // RESTA: Minuendo y Sustraendo vienen ya escritos en tiza.
    // El alumno NO tiene que escribirlos, solo escribe el resultado.
    const minuend = operands[0];
    const subtrahend = operands[1];

    // Minuendo fijo
    const slotMin = document.createElement('div');
    slotMin.className = 'chalk-static-slot';
    slotMin.innerHTML = `
      <div class="slot-label">Había</div>
      <div class="chalk-static-number">${formatColoredDigits(minuend)}</div>
    `;
    container.appendChild(slotMin);

    // Signo menos
    const minus = document.createElement('span');
    minus.className = 'math-symbol';
    minus.textContent = '−';
    container.appendChild(minus);

    // Sustraendo fijo
    const slotSub = document.createElement('div');
    slotSub.className = 'chalk-static-slot';
    slotSub.innerHTML = `
      <div class="slot-label">Tachamos</div>
      <div class="chalk-static-number">${formatColoredDigits(subtrahend)}</div>
    `;
    container.appendChild(slotSub);

    // Signo igual
    const equal = document.createElement('span');
    equal.className = 'math-symbol';
    equal.textContent = '=';
    container.appendChild(equal);

    // Resultado: ÚNICO recuadro interactivo (índice 2)
    container.appendChild(createSlotElement(2, 'Quedan'));
  }
}

/**
 * Crea un recuadro individual para escribir números
 */
function createSlotElement(boxIndex, labelText) {
  const slot = document.createElement('div');
  slot.className = 'number-slot';

  const label = document.createElement('div');
  label.className = 'slot-label';
  label.textContent = labelText;
  slot.appendChild(label);

  const box = document.createElement('div');
  box.className = 'number-box';
  box.dataset.boxIndex = boxIndex;

  const val = AppState.userAnswers[boxIndex];

  // Aplicar formato de colores de cifras (Decenas en Rojo, Unidades en Azul)
  if (val !== undefined && val !== '') {
    box.innerHTML = formatColoredDigits(val);
  } else {
    box.innerHTML = `<span class="box-placeholder">?</span>`;
  }

  // Clases según estado activo o de validación
  if (AppState.activeBoxIndex === boxIndex) {
    box.classList.add('active');
  }

  if (AppState.checkedState === 'success') {
    box.classList.add('correct');
  } else if (AppState.checkedState === 'error') {
    const isBoxWrong = checkSingleBox(boxIndex);
    if (isBoxWrong) {
      box.classList.add('error');
    } else {
      box.classList.add('correct');
    }
  }

  // Al tocar el recuadro, abrir el teclado flotante
  box.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    sounds.playChalkTap();
    openKeypad(boxIndex);
  });

  slot.appendChild(box);
  return slot;
}

/**
 * REQUISITO ESENCIAL:
 * "todo lo que sea cifra de unidades se irá viendo de color azul,
 * mientras que si se generán decenas se verán de color rojo"
 */
function formatColoredDigits(numberStr) {
  const str = String(numberStr).trim();
  if (!str) return '';

  if (str.length === 1) {
    // 1 sola cifra: es unidad -> AZUL
    return `<span class="digit-unit">${str}</span>`;
  } else if (str.length >= 2) {
    // 2 cifras: primera decena (ROJO), segunda unidad (AZUL)
    const decenas = str.slice(0, -1);
    const unidades = str.slice(-1);
    return `<span class="digit-ten">${decenas}</span><span class="digit-unit">${unidades}</span>`;
  }
  return str;
}

// ==========================================================================
// 6. TECLADO FLOTANTE TÁCTIL (CORREGIDO Y GARANTIZADO DE CERRAR)
// ==========================================================================
const Keypad = {
  keypadEl: null,
  backdropEl: null,
  displayEl: null,
  titleEl: null,
  isNewBoxFocus: false,

  init() {
    this.keypadEl = document.getElementById('floating-keypad');
    this.backdropEl = document.getElementById('keypad-backdrop');
    this.displayEl = document.getElementById('keypad-display');
    this.titleEl = document.getElementById('keypad-title');

    // Teclas numéricas 0-9
    document.querySelectorAll('.key-num').forEach(btn => {
      btn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        e.stopPropagation();
        sounds.playChalkTap();
        const digit = btn.dataset.key;
        Keypad.appendDigit(digit);
      });
    });

    // Tecla borrar (backspace)
    const btnBack = document.getElementById('key-backspace');
    if (btnBack) {
      btnBack.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        e.stopPropagation();
        sounds.playChalkTap();
        Keypad.backspace();
      });
    }

    // Tecla confirmar / OK (cierra el teclado de inmediato sin saltos automáticos)
    const btnDone = document.getElementById('key-confirm');
    if (btnDone) {
      const handleDone = (e) => {
        e.preventDefault();
        e.stopPropagation();
        sounds.playChalkTap();
        Keypad.confirmAndClose();
      };
      btnDone.addEventListener('pointerdown', handleDone);
      btnDone.addEventListener('click', handleDone);
    }

    // BOTÓN CERRAR TECLADO (✕) CON DOBLE LISTENER PARA PDI Y MÓVILES
    const btnClose = document.getElementById('keypad-close-btn');
    if (btnClose) {
      const handleClose = (e) => {
        e.preventDefault();
        e.stopPropagation();
        sounds.playChalkTap();
        closeKeypad();
      };
      btnClose.addEventListener('pointerdown', handleClose);
      btnClose.addEventListener('click', handleClose);
    }

    // Cerrar al tocar el telón de fondo (backdrop)
    if (this.backdropEl) {
      this.backdropEl.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        sounds.playChalkTap();
        closeKeypad();
      });
    }

    // Cerrar si se toca en cualquier lugar fuera del teclado
    document.addEventListener('pointerdown', (e) => {
      if (AppState.activeBoxIndex === null) return;
      if (!this.keypadEl || !this.keypadEl.classList.contains('show')) return;

      const isInsideKeypad = this.keypadEl.contains(e.target);
      const isInsideNumberBox = e.target.closest('.number-box');

      if (!isInsideKeypad && !isInsideNumberBox) {
        closeKeypad();
      }
    });

    // Configuración arrastrable (evitando interceptar el botón de cerrar)
    this.setupDraggable();
  },

  appendDigit(digit) {
    if (AppState.activeBoxIndex === null) return;
    let currentVal = AppState.userAnswers[AppState.activeBoxIndex] || '';

    // Si acabamos de seleccionar la casilla, el primer dígito la reemplaza limpiamente
    if (this.isNewBoxFocus) {
      currentVal = '';
      this.isNewBoxFocus = false;
    }

    const newVal = currentVal + digit;
    // Limitar a máximo 2 cifras y valor máximo 19
    if (newVal.length > 2) return;
    if (parseInt(newVal, 10) > 19) return;

    AppState.userAnswers[AppState.activeBoxIndex] = newVal;
    AppState.checkedState = null;

    this.updateDisplay();
    renderEquationBoxes();
  },

  backspace() {
    if (AppState.activeBoxIndex === null) return;
    this.isNewBoxFocus = false;
    const currentVal = AppState.userAnswers[AppState.activeBoxIndex] || '';
    if (currentVal.length > 0) {
      AppState.userAnswers[AppState.activeBoxIndex] = currentVal.slice(0, -1);
      AppState.checkedState = null;
      this.updateDisplay();
      renderEquationBoxes();
    }
  },

  confirmAndClose() {
    this.isNewBoxFocus = false;
    closeKeypad();
  },

  updateDisplay() {
    if (AppState.activeBoxIndex === null) return;
    const currentVal = AppState.userAnswers[AppState.activeBoxIndex] || '';

    if (currentVal) {
      this.displayEl.innerHTML = formatColoredDigits(currentVal);
    } else {
      this.displayEl.innerHTML = `<span class="box-placeholder" style="color: rgba(255,255,255,0.3)">_</span>`;
    }
  },

  setupDraggable() {
    const header = document.getElementById('keypad-drag-header');
    if (!header || !this.keypadEl) return;

    let isDragging = false;
    let startX = 0, startY = 0;
    let initialLeft = 0, initialTop = 0;

    const onPointerDown = (e) => {
      // Si tocó el botón de cerrar, NO arrastrar
      if (e.target.closest('#keypad-close-btn') || e.target.closest('.keypad-close')) {
        return;
      }
      if (window.innerWidth <= 600) return;

      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      const rect = this.keypadEl.getBoundingClientRect();
      initialLeft = rect.left;
      initialTop = rect.top;
      header.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      let newLeft = initialLeft + dx;
      let newTop = initialTop + dy;

      const padWidth = this.keypadEl.offsetWidth;
      const padHeight = this.keypadEl.offsetHeight;
      newLeft = Math.max(10, Math.min(window.innerWidth - padWidth - 10, newLeft));
      newTop = Math.max(10, Math.min(window.innerHeight - padHeight - 10, newTop));

      this.keypadEl.style.left = `${newLeft}px`;
      this.keypadEl.style.top = `${newTop}px`;
      this.keypadEl.style.bottom = 'auto';
      this.keypadEl.style.right = 'auto';
      this.keypadEl.style.transform = 'none';
    };

    const onPointerUp = (e) => {
      if (isDragging) {
        isDragging = false;
        try {
          header.releasePointerCapture(e.pointerId);
        } catch (_) {}
      }
    };

    header.addEventListener('pointerdown', onPointerDown);
    header.addEventListener('pointermove', onPointerMove);
    header.addEventListener('pointerup', onPointerUp);
    header.addEventListener('pointercancel', onPointerUp);
  }
};

function openKeypad(boxIndex) {
  AppState.activeBoxIndex = boxIndex;
  Keypad.isNewBoxFocus = true;

  const keypad = document.getElementById('floating-keypad');
  const backdrop = document.getElementById('keypad-backdrop');
  const title = document.getElementById('keypad-title');

  if (!keypad) return;

  const { type, operands } = AppState.currentProblem;
  if (type === 'add') {
    if (boxIndex < operands.length) {
      title.innerHTML = `✏️ Sumando ${boxIndex + 1}`;
    } else {
      title.innerHTML = `✏️ Total (Resultado)`;
    }
  } else {
    title.innerHTML = `✏️ ¿Cuántos quedan?`;
  }

  Keypad.updateDisplay();

  // Posicionamiento inteligente del teclado: colocado a los laterales para NO tapar nunca los dibujos superiores
  if (window.innerWidth > 600) {
    const targetBox = document.querySelector(`.number-box[data-box-index="${boxIndex}"]`);
    if (targetBox) {
      const rect = targetBox.getBoundingClientRect();
      const padWidth = 250;
      const padHeight = 260;

      // 1. Preferencia: ubicar a la derecha de la casilla activa
      let left = rect.right + 12;
      let top = Math.max(16, Math.min(window.innerHeight - padHeight - 16, rect.top - 10));

      // 2. Si no cabe a la derecha, probar al lateral izquierdo
      if (left + padWidth > window.innerWidth - 16) {
        if (rect.left - padWidth - 12 >= 16) {
          left = rect.left - padWidth - 12;
        } else {
          // Si no cabe en los laterales, centrarlo respecto a la casilla
          left = Math.max(16, Math.min(window.innerWidth - padWidth - 16, rect.left + rect.width / 2 - padWidth / 2));
          // Y colocarlo en la parte inferior para despejar los dibujos
          top = rect.bottom + 8;
          if (top + padHeight > window.innerHeight - 10) {
            top = Math.max(10, window.innerHeight - padHeight - 10);
          }
        }
      }

      keypad.style.left = `${left}px`;
      keypad.style.top = `${top}px`;
      keypad.style.bottom = 'auto';
      keypad.style.right = 'auto';
      keypad.style.transform = 'none';
    }
  }

  keypad.classList.add('show');
  if (backdrop) {
    backdrop.classList.add('show');
  }

  renderEquationBoxes();
}

function closeKeypad() {
  AppState.activeBoxIndex = null;
  const keypad = document.getElementById('floating-keypad');
  const backdrop = document.getElementById('keypad-backdrop');

  if (keypad) keypad.classList.remove('show');
  if (backdrop) backdrop.classList.remove('show');

  renderEquationBoxes();
}

// ==========================================================================
// 7. COMPROBACIÓN, ANIMACIONES Y REINTENTOS
// ==========================================================================
function checkSingleBox(boxIndex) {
  const { type, operands, expectedResult } = AppState.currentProblem;
  const userVal = parseInt(AppState.userAnswers[boxIndex], 10);

  if (isNaN(userVal)) return true; // Casilla vacía -> incorrecto

  if (type === 'add') {
    if (boxIndex < operands.length) {
      return userVal !== operands[boxIndex];
    } else {
      return userVal !== expectedResult;
    }
  } else {
    // Resta: solo el resultado está en boxIndex 2
    return userVal !== expectedResult;
  }
}

function checkAnswers() {
  const { type, operands, expectedResult } = AppState.currentProblem;

  if (type === 'sub') {
    // EN RESTA: Comprobar el resultado
    const userResultStr = AppState.userAnswers[2];
    if (userResultStr === '' || userResultStr === undefined) {
      AppState.checkedState = 'error';
      sounds.playError();
      const banner = document.getElementById('feedback-banner');
      banner.className = 'feedback-banner error';
      banner.innerHTML = `⚠️ Toca el recuadro con el signo '?' para escribir cuántos quedan.`;
      renderEquationBoxes();
      openKeypad(2);
      return;
    }

    const userResult = parseInt(userResultStr, 10);
    const crossedCount = AppState.crossedIndices.size;
    const subtrahend = operands[1];

    if (userResult === expectedResult) {
      AppState.checkedState = 'success';
      closeKeypad();
      sounds.playSuccess();
      triggerCelebrationConfetti();
    } else {
      AppState.checkedState = 'error';
      sounds.playError();
    }

    renderEquationBoxes();
    updateFeedbackUI();
    return;
  }

  // EN SUMA: Comprobar que todos los recuadros sean correctos
  const totalBoxes = AppState.userAnswers.length;
  let allCorrect = true;

  for (let i = 0; i < totalBoxes; i++) {
    const val = AppState.userAnswers[i];
    if (val === '' || val === undefined || checkSingleBox(i)) {
      allCorrect = false;
      break;
    }
  }

  if (allCorrect) {
    AppState.checkedState = 'success';
    closeKeypad();
    sounds.playSuccess();
    triggerCelebrationConfetti();
  } else {
    AppState.checkedState = 'error';
    sounds.playError();
  }

  renderEquationBoxes();
  updateFeedbackUI();
}

/**
 * Actualiza botones y mensajes de feedback
 */
function updateFeedbackUI() {
  const banner = document.getElementById('feedback-banner');
  const btnCheck = document.getElementById('btn-check');
  const btnRetry = document.getElementById('btn-retry');
  const btnNext = document.getElementById('btn-next');
  const { type, operands, expectedResult } = AppState.currentProblem;

  banner.className = 'feedback-banner';

  if (AppState.checkedState === 'success') {
    banner.classList.add('success');
    if (type === 'sub') {
      banner.innerHTML = `🌟 ¡Excelente! Había ${operands[0]}, tachamos ${operands[1]} y quedan ${expectedResult}. ¡Muy bien! 🎉`;
    } else {
      banner.innerHTML = `🌟 ¡Excelente! ¡Has acertado todos los números! 🎉`;
    }

    btnCheck.style.display = 'none';
    btnRetry.classList.remove('show');
    btnNext.classList.add('show');

  } else if (AppState.checkedState === 'error') {
    banner.classList.add('error');
    if (type === 'sub') {
      banner.innerHTML = `🤔 ¡Casi! Fíjate bien en cuántos quedan sin tachar e inténtalo otra vez.`;
    } else {
      banner.innerHTML = `🤔 ¡Casi! Revisa los números en rojo e inténtalo otra vez.`;
    }

    btnCheck.style.display = 'none';
    btnRetry.classList.add('show');
    btnNext.classList.remove('show');

  } else {
    banner.innerHTML = ``;
    btnCheck.style.display = 'inline-flex';
    btnRetry.classList.remove('show');
    btnNext.classList.remove('show');
  }
}

/**
 * Botón "Intentar de nuevo":
 * Permite corregir sin perder los números ni la operación
 */
function handleRetry() {
  sounds.playChalkTap();
  AppState.checkedState = null;

  if (AppState.currentProblem.type === 'sub') {
    updateFeedbackUI();
    openKeypad(2); // Abrir teclado directamente en el resultado
    return;
  }

  // En suma, buscar el primer recuadro incorrecto
  const totalBoxes = AppState.userAnswers.length;
  let firstWrongIdx = 0;
  for (let i = 0; i < totalBoxes; i++) {
    if (checkSingleBox(i)) {
      firstWrongIdx = i;
      break;
    }
  }

  updateFeedbackUI();
  openKeypad(firstWrongIdx);
}

// ==========================================================================
// 8. EFECTO DE CONFETI PARA CELEBRACIÓN DE ACIERTOS
// ==========================================================================
function triggerCelebrationConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#fde047', '#38bdf8', '#f87171', '#4ade80', '#fb923c', '#ffffff'];

  for (let i = 0; i < 95; i++) {
    particles.push({
      x: canvas.width / 2 + (Math.random() - 0.5) * 120,
      y: canvas.height * 0.42,
      vx: (Math.random() - 0.5) * 15,
      vy: Math.random() * -13 - 4,
      size: Math.random() * 8 + 5,
      color: getRandomItem(colors),
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 10,
      opacity: 1
    });
  }

  let animationFrame;
  let startTime = Date.now();

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const elapsed = Date.now() - startTime;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35;
      p.rotation += p.vRot;
      if (elapsed > 1200) {
        p.opacity -= 0.02;
      }

      if (p.opacity > 0) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }
    });

    if (elapsed < 2500) {
      animationFrame = requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  animate();
}

// ==========================================================================
// 9. MODO MANUAL (CONFIGURACIÓN DOCENTE OCULTA)
// ==========================================================================
const ManualMode = {
  modalEl: null,
  opAddBtn: null,
  opSubBtn: null,
  sum2Btn: null,
  sum3Btn: null,
  sumCountGroup: null,
  inputsContainer: null,
  themeSelect: null,

  state: {
    operation: 'add',
    summandsCount: 2,
    num1: 4,
    num2: 3,
    num3: 2
  },

  init() {
    this.modalEl = document.getElementById('manual-modal');
    this.opAddBtn = document.getElementById('manual-op-add');
    this.opSubBtn = document.getElementById('manual-op-sub');
    this.sum2Btn = document.getElementById('manual-sum-2');
    this.sum3Btn = document.getElementById('manual-sum-3');
    this.sumCountGroup = document.getElementById('manual-sum-count-group');
    this.inputsContainer = document.getElementById('manual-inputs-container');
    this.themeSelect = document.getElementById('manual-theme-select');

    this.populateThemes();

    this.opAddBtn.addEventListener('click', () => this.setOperation('add'));
    this.opSubBtn.addEventListener('click', () => this.setOperation('sub'));
    this.sum2Btn.addEventListener('click', () => this.setSummandsCount(2));
    this.sum3Btn.addEventListener('click', () => this.setSummandsCount(3));

    document.getElementById('btn-close-modal').addEventListener('click', () => this.close());
    document.getElementById('btn-cancel-modal').addEventListener('click', () => this.close());
    document.getElementById('btn-apply-manual').addEventListener('click', () => this.apply());

    document.getElementById('btn-exit-manual').addEventListener('click', () => {
      generateNewProblem();
    });

    this.renderInputs();
  },

  populateThemes() {
    if (!this.themeSelect) return;
    this.themeSelect.innerHTML = `<option value="random">🎲 Dibujos Aleatorios</option>`;
    DRAWING_CATALOG.forEach(item => {
      const opt = document.createElement('option');
      opt.value = item.id;
      opt.textContent = `${item.emoji} ${item.name}`;
      this.themeSelect.appendChild(opt);
    });
  },

  open() {
    sounds.playChalkTap();
    this.modalEl.classList.add('show');
    this.renderInputs();
  },

  close() {
    sounds.playChalkTap();
    this.modalEl.classList.remove('show');
  },

  setOperation(op) {
    sounds.playChalkTap();
    this.state.operation = op;
    this.opAddBtn.classList.toggle('active', op === 'add');
    this.opSubBtn.classList.toggle('active', op === 'sub');
    this.sumCountGroup.style.display = op === 'add' ? 'block' : 'none';
    this.renderInputs();
  },

  setSummandsCount(count) {
    sounds.playChalkTap();
    this.state.summandsCount = count;
    this.sum2Btn.classList.toggle('active', count === 2);
    this.sum3Btn.classList.toggle('active', count === 3);
    this.renderInputs();
  },

  renderInputs() {
    this.inputsContainer.innerHTML = '';
    const { operation, summandsCount } = this.state;

    if (operation === 'add') {
      const in1 = this.createNumberInput('man-n1', this.state.num1 || 4, 1, 15);
      this.inputsContainer.appendChild(in1);

      const plus1 = document.createElement('span');
      plus1.className = 'math-symbol';
      plus1.style.fontSize = '1.8rem';
      plus1.textContent = '+';
      this.inputsContainer.appendChild(plus1);

      const in2 = this.createNumberInput('man-n2', this.state.num2 || 3, 1, 15);
      this.inputsContainer.appendChild(in2);

      if (summandsCount === 3) {
        const plus2 = document.createElement('span');
        plus2.className = 'math-symbol';
        plus2.style.fontSize = '1.8rem';
        plus2.textContent = '+';
        this.inputsContainer.appendChild(plus2);

        const in3 = this.createNumberInput('man-n3', this.state.num3 || 2, 1, 10);
        this.inputsContainer.appendChild(in3);
      }
    } else {
      // Resta
      const inMin = this.createNumberInput('man-min', this.state.num1 || 9, 2, 19);
      this.inputsContainer.appendChild(inMin);

      const minus = document.createElement('span');
      minus.className = 'math-symbol';
      minus.style.fontSize = '1.8rem';
      minus.textContent = '−';
      this.inputsContainer.appendChild(minus);

      const inSub = this.createNumberInput('man-sub', this.state.num2 || 6, 1, 18);
      this.inputsContainer.appendChild(inSub);
    }
  },

  createNumberInput(id, val, min, max) {
    const input = document.createElement('input');
    input.type = 'number';
    input.id = id;
    input.className = 'manual-input-box';
    input.value = val;
    input.min = min;
    input.max = max;
    return input;
  },

  apply() {
    const { operation, summandsCount } = this.state;
    let operands = [];
    let expectedResult = 0;

    if (operation === 'add') {
      const n1 = parseInt(document.getElementById('man-n1').value, 10) || 1;
      const n2 = parseInt(document.getElementById('man-n2').value, 10) || 1;
      if (summandsCount === 3) {
        const n3 = parseInt(document.getElementById('man-n3').value, 10) || 1;
        operands = [n1, n2, n3];
        expectedResult = n1 + n2 + n3;
      } else {
        operands = [n1, n2];
        expectedResult = n1 + n2;
      }
    } else {
      let min = parseInt(document.getElementById('man-min').value, 10) || 5;
      let sub = parseInt(document.getElementById('man-sub').value, 10) || 2;
      if (sub >= min) {
        sub = Math.max(1, min - 1);
      }
      operands = [min, sub];
      expectedResult = min - sub;
    }

    if (expectedResult > 20) {
      alert('Por favor, ajusta los números para que el resultado no supere 20.');
      return;
    }

    let chosenThemes = [];
    const selectedThemeId = this.themeSelect.value;
    if (selectedThemeId === 'random') {
      chosenThemes = getRandomThemes(operands.length);
    } else {
      const themeObj = DRAWING_CATALOG.find(t => t.id === selectedThemeId) || DRAWING_CATALOG[0];
      chosenThemes = new Array(operands.length).fill(themeObj);
    }

    AppState.operation = operation;
    AppState.summandsCount = summandsCount;
    AppState.isManualMode = true;

    updateSettingsBarButtons();

    AppState.currentProblem = {
      type: operation,
      operands: operands,
      expectedResult: expectedResult,
      themes: chosenThemes
    };

    if (operation === 'sub') {
      AppState.userAnswers = [String(operands[0]), String(operands[1]), ''];
    } else {
      AppState.userAnswers = new Array(operands.length + 1).fill('');
    }

    AppState.crossedIndices.clear();
    AppState.checkedState = null;
    AppState.activeBoxIndex = null;

    document.getElementById('manual-banner').classList.add('show');

    this.close();
    renderBlackboard();
    sounds.playSuccess();
  }
};

// ==========================================================================
// 10. GESTIÓN DE PANTALLA COMPLETA Y EVENTOS
// ==========================================================================
function toggleFullScreen() {
  sounds.playChalkTap();
  const doc = document;
  const docEl = document.documentElement;

  const requestFs = docEl.requestFullscreen || docEl.webkitRequestFullscreen || docEl.mozRequestFullScreen || docEl.msRequestFullscreen;
  const exitFs = doc.exitFullscreen || doc.webkitExitFullscreen || doc.mozCancelFullScreen || doc.msExitFullscreen;
  const isFs = doc.fullscreenElement || doc.webkitFullscreenElement || doc.mozFullScreenElement || doc.msFullscreenElement;

  if (!isFs) {
    if (requestFs) requestFs.call(docEl).catch(() => {});
  } else {
    if (exitFs) exitFs.call(doc).catch(() => {});
  }
}

function updateFullscreenBtn() {
  const btn = document.getElementById('btn-fullscreen');
  if (!btn) return;
  const isFs = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
  if (isFs) {
    btn.innerHTML = `<span>🗗</span>`;
    btn.title = "Salir de pantalla completa";
  } else {
    btn.innerHTML = `<span>🖥️</span>`;
    btn.title = "Pantalla completa";
  }
}

function updateSettingsBarButtons() {
  // Operación
  document.getElementById('btn-op-add').classList.toggle('active', AppState.operation === 'add');
  document.getElementById('btn-op-sub').classList.toggle('active', AppState.operation === 'sub');

  // Límite máximo
  document.getElementById('btn-max-10').classList.toggle('active', AppState.maxLimit === 10);
  document.getElementById('btn-max-19').classList.toggle('active', AppState.maxLimit === 19);

  // Selector de sumandos (solo visible en modo suma)
  const sumGroup = document.getElementById('group-summands');
  if (sumGroup) {
    sumGroup.style.display = AppState.operation === 'add' ? 'inline-flex' : 'none';
    document.getElementById('btn-sum-2').classList.toggle('active', AppState.summandsCount === 2);
    document.getElementById('btn-sum-3').classList.toggle('active', AppState.summandsCount === 3);
  }
}

// Soporte para teclado físico (para PC / Laptops)
function handlePhysicalKeyboard(e) {
  if (AppState.activeBoxIndex === null) return;

  if (e.key >= '0' && e.key <= '9') {
    e.preventDefault();
    sounds.playChalkTap();
    Keypad.appendDigit(e.key);
  } else if (e.key === 'Backspace') {
    e.preventDefault();
    sounds.playChalkTap();
    Keypad.backspace();
  } else if (e.key === 'Enter') {
    e.preventDefault();
    sounds.playChalkTap();
    Keypad.confirmAndClose();
  } else if (e.key === 'Escape') {
    closeKeypad();
  }
}

// ==========================================================================
// 11. INICIALIZACIÓN PRINCIPAL AL CARGAR EL DOM
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar teclado flotante y modal docente
  Keypad.init();
  ManualMode.init();

  // Eventos de barra de control
  document.getElementById('btn-sound').addEventListener('click', () => {
    sounds.enabled = !sounds.enabled;
    const btn = document.getElementById('btn-sound');
    btn.innerHTML = sounds.enabled ? '🔊' : '🔇';
    btn.title = sounds.enabled ? 'Silenciar sonidos' : 'Activar sonidos';
  });

  document.getElementById('btn-fullscreen').addEventListener('click', toggleFullScreen);
  ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(evt => {
    document.addEventListener(evt, updateFullscreenBtn);
  });

  document.getElementById('btn-manual-mode').addEventListener('click', () => {
    ManualMode.open();
  });

  // Botón nueva operación aleatoria
  document.getElementById('btn-random-problem').addEventListener('click', () => {
    sounds.playChalkTap();
    generateNewProblem();
  });

  // Selectores de configuración rápida
  document.getElementById('btn-op-add').addEventListener('click', () => {
    sounds.playChalkTap();
    AppState.operation = 'add';
    updateSettingsBarButtons();
    generateNewProblem();
  });

  document.getElementById('btn-op-sub').addEventListener('click', () => {
    sounds.playChalkTap();
    AppState.operation = 'sub';
    updateSettingsBarButtons();
    generateNewProblem();
  });

  document.getElementById('btn-max-10').addEventListener('click', () => {
    sounds.playChalkTap();
    AppState.maxLimit = 10;
    updateSettingsBarButtons();
    generateNewProblem();
  });

  document.getElementById('btn-max-19').addEventListener('click', () => {
    sounds.playChalkTap();
    AppState.maxLimit = 19;
    updateSettingsBarButtons();
    generateNewProblem();
  });

  document.getElementById('btn-sum-2').addEventListener('click', () => {
    sounds.playChalkTap();
    AppState.summandsCount = 2;
    updateSettingsBarButtons();
    generateNewProblem();
  });

  document.getElementById('btn-sum-3').addEventListener('click', () => {
    sounds.playChalkTap();
    AppState.summandsCount = 3;
    updateSettingsBarButtons();
    generateNewProblem();
  });

  // Botones de acción principales
  document.getElementById('btn-check').addEventListener('click', () => {
    checkAnswers();
  });

  document.getElementById('btn-retry').addEventListener('click', () => {
    handleRetry();
  });

  document.getElementById('btn-next').addEventListener('click', () => {
    sounds.playChalkTap();
    generateNewProblem();
  });

  // Listener para teclado físico
  window.addEventListener('keydown', handlePhysicalKeyboard);

  // Inicializar estado de botones y generar primer problema
  updateSettingsBarButtons();
  generateNewProblem();
});

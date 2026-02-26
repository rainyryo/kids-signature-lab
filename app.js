const nameInput = document.getElementById('nameInput');
const fontSelect = document.getElementById('fontSelect');
const sizeRange = document.getElementById('sizeRange');
const colorInput = document.getElementById('colorInput');
const guideText = document.getElementById('guideText');
const worksheetGrid = document.getElementById('worksheetGrid');
const canvas = document.getElementById('drawCanvas');
const ctx = canvas.getContext('2d');

const applyBtn = document.getElementById('applyBtn');
const clearBtn = document.getElementById('clearBtn');
const printBtn = document.getElementById('printBtn');
const pdfBtn = document.getElementById('pdfBtn');
const pngBtn = document.getElementById('pngBtn');

let drawing = false;

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#111827';
}

function updatePreview() {
  const text = (nameInput.value || 'Your Name').trim();
  const font = fontSelect.value;
  const size = Number(sizeRange.value);
  const color = colorInput.value;

  guideText.textContent = text;
  guideText.style.fontFamily = font;
  guideText.style.fontSize = `${size}px`;
  guideText.style.color = color;

  worksheetGrid.innerHTML = '';
  for (let i = 0; i < 12; i++) {
    const row = document.createElement('div');
    row.className = 'ws-line';
    row.textContent = text;
    row.style.fontFamily = font;
    row.style.fontSize = `${Math.max(30, size * 0.55)}px`;
    worksheetGrid.appendChild(row);
  }
}

function pos(e) {
  const r = canvas.getBoundingClientRect();
  return { x: e.clientX - r.left, y: e.clientY - r.top };
}

canvas.addEventListener('pointerdown', (e) => {
  drawing = true;
  canvas.setPointerCapture(e.pointerId);
  const p = pos(e);
  ctx.beginPath();
  ctx.moveTo(p.x, p.y);
});

canvas.addEventListener('pointermove', (e) => {
  if (!drawing) return;
  const p = pos(e);
  ctx.lineTo(p.x, p.y);
  ctx.stroke();
});

canvas.addEventListener('pointerup', () => {
  drawing = false;
  ctx.closePath();
});

canvas.addEventListener('pointercancel', () => {
  drawing = false;
  ctx.closePath();
});

clearBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

applyBtn.addEventListener('click', updatePreview);
printBtn.addEventListener('click', () => window.print());

pdfBtn.addEventListener('click', async () => {
  const { jsPDF } = window.jspdf || {};
  if (!jsPDF) {
    alert('PDFライブラリの読み込みに失敗しました。ブラウザ印刷を使ってください。');
    return;
  }

  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  doc.setFontSize(18);
  doc.text('Kids Signature Practice Sheet', 40, 40);

  const text = (nameInput.value || 'Your Name').trim();
  const fontSize = Math.max(22, Number(sizeRange.value) * 0.45);

  let y = 90;
  for (let i = 0; i < 13; i++) {
    doc.setTextColor(170);
    doc.setFontSize(fontSize);
    doc.text(text, 56, y);
    doc.setDrawColor(180);
    doc.setLineWidth(0.5);
    doc.line(40, y + 6, 555, y + 6);
    y += 48;
  }

  doc.setTextColor(90);
  doc.setFontSize(10);
  doc.text(`Generated at: ${new Date().toLocaleString()}`, 40, 810);
  doc.save(`signature-practice-${text}.pdf`);
});

pngBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = `signature-trace-${(nameInput.value || 'name').trim()}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
});

window.addEventListener('resize', () => {
  resizeCanvas();
});

resizeCanvas();
updatePreview();

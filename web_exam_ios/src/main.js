// ==========================================
// SPA ROUTER & VIEW MANAGEMENT
// ==========================================

const views = {
  login: document.getElementById('login-view'),
  dashboard: document.getElementById('dashboard-view'),
  exam: document.getElementById('exam-view')
};

function navigateTo(viewName) {
  // Hide all views
  Object.values(views).forEach(view => {
    view.classList.remove('active');
  });
  // Show target view
  if (views[viewName]) {
    views[viewName].classList.add('active');
  }
}

// ==========================================
// LOGIN LOGIC
// ==========================================
window.handleLogin = () => {
  const nim = document.getElementById('input-nim').value;
  const dob = document.getElementById('input-dob').value;

  if (nim.trim() === '' || dob.trim() === '') {
    alert('Harap isi NIM dan Tanggal Lahir.');
    return;
  }

  // Simulate authentication success
  navigateTo('dashboard');
};

window.handleLogout = () => {
  if (confirm('Apakah Anda yakin ingin keluar?')) {
    // Clear inputs
    document.getElementById('input-nim').value = '';
    document.getElementById('input-dob').value = '';
    navigateTo('login');
  }
};

// ==========================================
// DASHBOARD LOGIC (TABS)
// ==========================================
const tabs = {
  home: document.getElementById('tab-home'),
  ujian: document.getElementById('tab-ujian'),
  riwayat: document.getElementById('tab-riwayat'),
  profile: document.getElementById('tab-profile')
};

const navItems = {
  home: document.getElementById('nav-item-home'),
  ujian: document.getElementById('nav-item-ujian'),
  riwayat: document.getElementById('nav-item-riwayat'),
  profile: document.getElementById('nav-item-profile')
};

window.switchTab = (tabName) => {
  // Hide all tabs
  Object.values(tabs).forEach(tab => tab.classList.remove('active'));
  // Remove active state from nav items
  Object.values(navItems).forEach(nav => nav.classList.remove('active'));

  // Activate target tab
  if (tabs[tabName] && navItems[tabName]) {
    tabs[tabName].classList.add('active');
    navItems[tabName].classList.add('active');
  }
};

// ==========================================
// FILTER MODAL LOGIC
// ==========================================
window.openFilterModal = () => {
  document.getElementById('filter-modal').classList.remove('hidden');
};

window.toggleFlag = () => {
  const btn = document.getElementById('btn-flag');
  btn.classList.toggle('text-red');
};

// ==========================================
// MODAL PENGUMPULAN UJIAN
// ==========================================
window.showSubmitModal = () => {
  const modalContent = document.getElementById('modal-content');
  modalContent.innerHTML = `
    <h3 class="modal-title">Kumpulkan Jawaban?</h3>
    <p class="modal-text">Apakah Anda yakin ingin mengumpulkan ujian ini? Jawaban tidak dapat diubah setelah dikumpulkan.</p>
    <div class="modal-actions">
      <button class="btn-text" onclick="closeModal()">Batal</button>
      <button class="btn-navy rounded-pill px-4" onclick="submitExam()">Ya, Kumpulkan</button>
    </div>
  `;
  document.getElementById('modal-overlay').classList.remove('hidden');
};

window.closeModal = () => {
  document.getElementById('modal-overlay').classList.add('hidden');
};

window.submitExam = () => {
  closeModal();
  // Simulate loading and submission
  setTimeout(() => {
    alert("Ujian berhasil dikumpulkan!");
    
    // Return to dashboard
    document.getElementById('exam-view').classList.remove('active');
    document.getElementById('dashboard-view').classList.add('active');
    
    // Refresh to riwayat or home tab
    switchTab('home');
  }, 500);
};

window.closeFilterModal = () => {
  document.getElementById('filter-modal').classList.add('hidden');
};

window.applyFilter = () => {
  // Simulate delay
  closeFilterModal();
  setTimeout(() => {
    alert('Filter Berhasil Diterapkan!');
  }, 300);
};

// ==========================================
// SEMESTER MODAL LOGIC (Riwayat)
// ==========================================
window.openSemesterModal = () => {
  document.getElementById('semester-modal').classList.remove('hidden');
};

window.closeSemesterModal = (e) => {
  if (e) e.stopPropagation();
  document.getElementById('semester-modal').classList.add('hidden');
};

window.selectSemester = (semesterName) => {
  // Update button text
  document.getElementById('btn-semester-riwayat').innerHTML = `${semesterName} <span class="material-icons">expand_more</span>`;
  
  // Update active state in list
  const listItems = document.querySelectorAll('.semester-list li');
  listItems.forEach(li => {
    if (li.innerText.includes(semesterName)) {
      li.classList.add('active');
    } else {
      li.classList.remove('active');
    }
  });

  window.closeSemesterModal();
  
  // Simulate loading new data
  setTimeout(() => {
    alert(`Menampilkan riwayat untuk ${semesterName}`);
  }, 300);
};

window.startExam = () => {
  // Initialize exam state
  initExam();
  navigateTo('exam');
};


// ==========================================
// EXAM LOGIC (From previous implementation)
// ==========================================
const EXAM_DATA = {
  courseCode: 'AKT301',
  durationMinutes: 120, // 2 hours
  questions: [
    {
      id: 1,
      points: 20,
      text: 'Jelaskan perbedaan antara akuntansi keuangan dan akuntansi manajemen, serta berikan contoh penggunaan masing-masing dalam konteks perusahaan manufaktur.'
    },
    {
      id: 2,
      points: 20,
      text: 'Uraikan konsep nilai waktu dari uang (time value of money) dan bagaimana konsep tersebut diterapkan dalam keputusan investasi jangka panjang perusahaan.'
    },
    {
      id: 3,
      points: 20,
      text: 'Berdasarkan data laporan keuangan PT ABC tahun 2025, analisislah rasio likuiditas perusahaan dan berikan rekomendasi strategis untuk meningkatkan posisi keuangan perusahaan di tahun 2026.'
    },
    {
      id: 4,
      points: 20,
      text: 'Evaluasi dampak kebijakan dividen terhadap nilai perusahaan berdasarkan teori Modigliani-Miller dan relevansinya dalam kondisi pasar tidak sempurna.'
    },
    {
      id: 5,
      points: 20,
      text: 'Susun analisis SWOT keuangan dari data yang disediakan dan rekomendasikan strategi keuangan terbaik untuk periode 2026–2028.'
    }
  ]
};

let currentQuestionIndex = 0;
const answers = {};
const flagged = new Set();

const elQuestionCounter = document.getElementById('question-counter');
const elQuestionNumberDisplay = document.getElementById('question-number-display');
const elQuestionText = document.getElementById('question-text');
const elAnswerInput = document.getElementById('answer-input');
const elBtnPrev = document.getElementById('btn-prev');
const elBtnNext = document.getElementById('btn-next');
const elBtnFlag = document.getElementById('btn-flag');
const elModalOverlay = document.getElementById('modal-overlay');
const elModalContent = document.getElementById('modal-content');

function initExam() {
  // Pre-fill answers with empty string if not exists
  EXAM_DATA.questions.forEach(q => {
    if (answers[q.id] === undefined) {
      answers[q.id] = '';
    }
  });

  // Attach event listener for text area auto-save (only once)
  if (!elAnswerInput.hasAttribute('data-listener')) {
    elAnswerInput.addEventListener('input', (e) => {
      const qId = EXAM_DATA.questions[currentQuestionIndex].id;
      answers[qId] = e.target.value;
    });
    elAnswerInput.setAttribute('data-listener', 'true');
  }

  // Prevent copying question text (only once)
  if (!elQuestionText.hasAttribute('data-listener')) {
    elQuestionText.addEventListener('copy', (e) => {
      e.preventDefault();
      return false;
    });
    elQuestionText.setAttribute('data-listener', 'true');
  }

  currentQuestionIndex = 0;
  renderQuestion();
}

function renderQuestion() {
  const total = EXAM_DATA.questions.length;
  const q = EXAM_DATA.questions[currentQuestionIndex];

  // Update Header
  elQuestionCounter.textContent = `${currentQuestionIndex + 1} / ${total}`;
  elQuestionNumberDisplay.textContent = `SOAL ${currentQuestionIndex + 1}`;
  
  // Update Body
  elQuestionText.textContent = q.text;
  elAnswerInput.value = answers[q.id] || '';

  // Update Buttons
  elBtnPrev.disabled = currentQuestionIndex === 0;
  elBtnNext.disabled = currentQuestionIndex === total - 1;

  // Update Flag Icon
  if (flagged.has(q.id)) {
    elBtnFlag.classList.add('flagged');
    elBtnFlag.querySelector('.material-icons').style.color = '#F97316';
  } else {
    elBtnFlag.classList.remove('flagged');
    elBtnFlag.querySelector('.material-icons').style.color = 'white';
  }
}

window.prevQuestion = () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    renderQuestion();
  }
};

window.nextQuestion = () => {
  if (currentQuestionIndex < EXAM_DATA.questions.length - 1) {
    currentQuestionIndex++;
    renderQuestion();
  }
};

window.toggleFlag = () => {
  const qId = EXAM_DATA.questions[currentQuestionIndex].id;
  if (flagged.has(qId)) {
    flagged.delete(qId);
  } else {
    flagged.add(qId);
  }
  renderQuestion();
};

function showModal(htmlContent) {
  elModalContent.innerHTML = htmlContent;
  elModalOverlay.classList.remove('hidden');
}

window.closeModal = () => {
  elModalOverlay.classList.add('hidden');
};

window.showSubmitModal = () => {
  showModal(`
    <div class="modal-title">Kumpulkan Jawaban?</div>
    <div class="modal-text">Apakah Anda yakin ingin mengumpulkan ujian ini? Jawaban tidak dapat diubah setelah dikumpulkan.</div>
    <div class="modal-actions">
      <button class="btn-text" onclick="closeModal()">Batal</button>
      <button class="btn-primary" onclick="submitExam()">Ya, Kumpulkan</button>
    </div>
  `);
};

window.showExitModal = () => {
  showModal(`
    <div class="modal-title">Keluar dari Ujian?</div>
    <div class="modal-text">Progress Anda tersimpan. Sesi akan ditandai sebagai belum selesai.</div>
    <div class="modal-actions">
      <button class="btn-text" onclick="closeModal()">Batal</button>
      <button class="btn-text text-red" onclick="exitExam()">Keluar</button>
    </div>
  `);
};

window.submitExam = () => {
  closeModal();
  console.log('SUBMITTING PAYLOAD TO BACKEND:', answers);
  alert('Ujian berhasil dikumpulkan! Anda akan dialihkan ke Dashboard.');
  navigateTo('dashboard');
  switchTab('home');
};

window.exitExam = () => {
  closeModal();
  alert('Keluar dari ujian. Progress disimpan di lokal.');
  navigateTo('dashboard');
  switchTab('home');
};

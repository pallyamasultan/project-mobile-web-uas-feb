// ==========================================
// SPA ROUTER & VIEW MANAGEMENT
// ==========================================

const views = {
  splash: document.getElementById('splash-view'),
  security: document.getElementById('security-view'),
  login: document.getElementById('login-view'),
  biometric: document.getElementById('biometric-view'),
  geofence: document.getElementById('geofence-view'),
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

  // Simulate authentication success, go to Biometric Phase
  navigateTo('biometric');
  
  // Simulate native Biometric Prompt after a short delay
  setTimeout(() => {
    const status = document.getElementById('biometric-status');
    if (status) status.innerText = 'Memindai...';
    
    // Auto simulate success after 2 seconds
    setTimeout(() => {
      if (views.biometric.classList.contains('active')) {
        skipBiometricForNow();
      }
    }, 2000);
  }, 500);
};

window.skipBiometricForNow = () => {
  // Go to Geofence Phase
  navigateTo('geofence');
  
  // Simulate Geofence Scanning
  setTimeout(() => {
    const geoStatus = document.getElementById('geo-status-title');
    const geoDesc = document.getElementById('geo-status-desc');
    const geoIcon = document.getElementById('geo-icon');
    
    if (geoStatus) {
      geoStatus.innerText = 'Lokasi Ditemukan';
      geoStatus.style.color = '#22c55e';
      geoDesc.innerText = 'Akurasi: 12m (Area Kampus)';
      geoIcon.innerText = 'check_circle';
      geoIcon.classList.replace('text-blue-500', 'text-green-500');
    }
    
    // Proceed to Dashboard after success
    setTimeout(() => {
      navigateTo('dashboard');
    }, 1500);
  }, 2500);
};

window.handleLogout = () => {
  if (confirm('Apakah Anda yakin ingin keluar?')) {
    // Clear inputs
    document.getElementById('input-nim').value = '';
    document.getElementById('input-dob').value = '';
    navigateTo('login');
  }
};

// INITIALIZATION FLOW
function initApp() {
  // Start with splash screen
  navigateTo('splash');
  
  // Simulate loading progress
  let progress = 0;
  const progressFill = document.getElementById('splash-progress');
  
  const interval = setInterval(() => {
    progress += Math.random() * 20;
    if (progress > 100) progress = 100;
    if (progressFill) progressFill.style.width = `${progress}%`;
    
    if (progress === 100) {
      clearInterval(interval);
      // Move to Security check
      setTimeout(runSecurityCheck, 500);
    }
  }, 300);
}

function runSecurityCheck() {
  navigateTo('security');
  
  const checks = [
    { id: 1, text: 'Aman', delay: 1000 },
    { id: 2, text: 'Aman', delay: 2000 },
    { id: 3, text: 'Aman', delay: 3000 }
  ];
  
  checks.forEach(check => {
    setTimeout(() => {
      const desc = document.getElementById(`sec-desc-${check.id}`);
      const icon = document.getElementById(`sec-icon-${check.id}`);
      if (desc && icon) {
        desc.innerText = check.text;
        desc.style.color = '#22c55e';
        icon.innerText = 'check_circle';
        icon.classList.replace('text-gray-400', 'text-green-500');
      }
    }, check.delay);
  });
  
  // Finish security check and go to Login
  setTimeout(() => {
    navigateTo('login');
  }, 4000);
}

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

window.closeFilterModal = () => {
  document.getElementById('filter-modal').classList.add('hidden');
};

// ==========================================
// NOTIFICATION MODAL LOGIC
// ==========================================
window.openNotifModal = () => {
  document.getElementById('notif-modal').classList.remove('hidden');
};

window.closeNotifModal = () => {
  document.getElementById('notif-modal').classList.add('hidden');
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
  
  // ANTI-CHEAT: Set flag to false
  isExamRunning = false;
  if (document.exitFullscreen) {
    document.exitFullscreen().catch(e => console.log(e));
  }

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
  document.getElementById('dashboard-view').classList.remove('active');
  document.getElementById('exam-view').classList.add('active');
  
  // ANTI-CHEAT: Set flag to true
  isExamRunning = true;
  violationCount = 0; // reset
  
  // Enter full screen if possible (deterrent)
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen().catch(e => console.log(e));
  }
};

initApp();

// ==========================================
// ANTI-CHEAT ENGINE (WEB iOS)
// ==========================================
let isExamRunning = false;
let violationCount = 0;
let blurInterval = null;

// 1. Deteksi Ganti Tab / Minimize
document.addEventListener('visibilitychange', () => {
  if (isExamRunning && document.visibilityState === 'hidden') {
    handleViolation('Tab Switch / Minimize');
  }
});

// 2. Cegah Klik Kanan (Context Menu)
document.addEventListener('contextmenu', (e) => {
  if (isExamRunning) {
    e.preventDefault();
  }
});

// 3. Cegah Copy, Cut, Paste
document.addEventListener('copy', (e) => { if (isExamRunning) e.preventDefault(); });
document.addEventListener('cut', (e) => { if (isExamRunning) e.preventDefault(); });
document.addEventListener('paste', (e) => { if (isExamRunning) e.preventDefault(); });

// 4. Cegah Keyboard Shortcuts (Deterrent: F12, Ctrl+C, dll)
document.addEventListener('keydown', (e) => {
  if (!isExamRunning) return;
  // Prevent F12
  if (e.key === 'F12') e.preventDefault();
  // Prevent Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+S, Ctrl+P
  if ((e.ctrlKey || e.metaKey) && ['c', 'v', 'x', 's', 'p'].includes(e.key.toLowerCase())) {
    e.preventDefault();
  }
});

function handleViolation(reason) {
  violationCount++;
  console.warn(`Pelanggaran terdeteksi: ${reason}. Total pelanggaran: ${violationCount}`);

  if (violationCount === 1) {
    // Hukuman 1: Warning Popup (OVR-P1)
    document.getElementById('warning-overlay').classList.remove('hidden');
    // Hilang otomatis setelah 10 detik jika tidak di-dismiss
    setTimeout(() => {
      document.getElementById('warning-overlay').classList.add('hidden');
    }, 10000);
  } else if (violationCount === 2) {
    // Hukuman 2: Blur 60s (OVR-P2)
    triggerBlurPenalty();
  } else if (violationCount >= 3) {
    // Hukuman 3: Kill Switch (OVR-P3)
    triggerKillSwitch();
  }
}

window.dismissWarning = () => {
  document.getElementById('warning-overlay').classList.add('hidden');
};

function triggerBlurPenalty() {
  const blurOverlay = document.getElementById('blur-overlay');
  const mainContent = document.querySelector('.content-area');
  const appBar = document.querySelector('.app-bar');
  const bottomBar = document.querySelector('.bottom-bar');
  
  blurOverlay.classList.remove('hidden');
  mainContent.classList.add('is-blurred');
  appBar.classList.add('is-blurred');
  bottomBar.classList.add('is-blurred');

  let timeLeft = 60;
  document.getElementById('blur-countdown').innerText = timeLeft;

  if (blurInterval) clearInterval(blurInterval);
  blurInterval = setInterval(() => {
    timeLeft--;
    document.getElementById('blur-countdown').innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(blurInterval);
      blurOverlay.classList.add('hidden');
      mainContent.classList.remove('is-blurred');
      appBar.classList.remove('is-blurred');
      bottomBar.classList.remove('is-blurred');
    }
  }, 1000);
}

function triggerKillSwitch() {
  // Matikan ujian
  isExamRunning = false;
  if (blurInterval) clearInterval(blurInterval);

  // Tampilkan layar merah permanen
  document.getElementById('kill-overlay').classList.remove('hidden');
  
  // Submit paksa apa yang sudah dijawab (Simulasi)
  console.log("Submit paksa jawaban karena Kill Switch...");
}


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

// Board Exam Prep & Revision Portal Main Application Logic

// Application State
const AppState = {
  user: {
    email: localStorage.getItem('board_user_email') || 'student@boardprep.in',
    goalScore: parseInt(localStorage.getItem('board_user_goal') || '92', 10),
    isLoggedIn: false // set only after the server confirms the OTP (see checkSession)
  },
  currentBoard: localStorage.getItem('board_user_board') || 'cbse',
  currentClass: localStorage.getItem('board_user_class') || 'class12',
  currentStream: localStorage.getItem('board_user_stream') || 'science_pcm',
  selectedAnswers: {},
  syllabusProgress: JSON.parse(localStorage.getItem('board_syllabus_progress') || '{}'),
  timer: {
    intervalId: null,
    remainingSeconds: 50 * 60,
    isRunning: false,
    mode: 'study' // 'study' or 'break'
  },
  breathing: {
    intervalId: null,
    isActive: false,
    phase: 'idle'
  }
};

// --- Web Audio API Alarm Synthesizer ---
class AlarmSoundSystem {
  constructor() {
    this.audioCtx = null;
  }

  init() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  playAlarmBuzzer() {
    this.init();
    if (!this.audioCtx) return;

    const ctx = this.audioCtx;
    const now = ctx.currentTime;

    // Sequence of 4 rhythmic alarm beeps
    for (let i = 0; i < 4; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880, now + i * 0.35); // A5 note
      osc.frequency.exponentialRampToValueAtTime(1760, now + i * 0.35 + 0.15);

      gain.gain.setValueAtTime(0.3, now + i * 0.35);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.35 + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + i * 0.35);
      osc.stop(now + i * 0.35 + 0.25);
    }
  }

  playZenChime() {
    this.init();
    if (!this.audioCtx) return;

    const ctx = this.audioCtx;
    const now = ctx.currentTime;
    const freqs = [528, 660, 792]; // Harmonious relaxing chord (Solfeggio 528Hz frequency)

    freqs.forEach(freq => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 2.5);
    });
  }
}

const alarmAudio = new AlarmSoundSystem();

// --- DOM References ---
const DOM = {
  boardSelect: document.getElementById('boardSelect'),
  classSelect: document.getElementById('classSelect'),
  streamSelect: document.getElementById('streamSelect'),
  authBtn: document.getElementById('authBtn'),
  userEmailBadge: document.getElementById('userEmailBadge'),
  authModal: document.getElementById('authModal'),
  closeAuthModal: document.getElementById('closeAuthModal'),
  authForm: document.getElementById('authForm'),
  userEmailInput: document.getElementById('userEmailInput'),
  userGoalInput: document.getElementById('userGoalInput'),
  sendOtpBtn: document.getElementById('sendOtpBtn'),
  otpForm: document.getElementById('otpForm'),
  otpInput: document.getElementById('otpInput'),
  otpSentTo: document.getElementById('otpSentTo'),
  verifyOtpBtn: document.getElementById('verifyOtpBtn'),
  otpBackBtn: document.getElementById('otpBackBtn'),
  loggedInBox: document.getElementById('loggedInBox'),
  loggedInEmail: document.getElementById('loggedInEmail'),
  logoutBtn: document.getElementById('logoutBtn'),
  authMessage: document.getElementById('authMessage'),

  // Report card upload
  reportLoggedOut: document.getElementById('reportLoggedOut'),
  reportLoggedIn: document.getElementById('reportLoggedIn'),
  reportLoginBtn: document.getElementById('reportLoginBtn'),
  reportFileInput: document.getElementById('reportFileInput'),
  uploadReportBtn: document.getElementById('uploadReportBtn'),
  reportMsg: document.getElementById('reportMsg'),
  reportList: document.getElementById('reportList'),
  openPanicBtn: document.getElementById('openPanicBtn'),
  tabBtns: document.querySelectorAll('.tab-btn'),
  tabPanes: document.querySelectorAll('.tab-pane'),

  // Planner
  plannerScoreBracket: document.getElementById('plannerScoreBracket'),
  plannerDaysLeft: document.getElementById('plannerDaysLeft'),
  calculatePlanBtn: document.getElementById('calculatePlanBtn'),
  plannerOutputCard: document.getElementById('plannerOutputCard'),

  // Syllabus
  syllabusSubjectFilter: document.getElementById('syllabusSubjectFilter'),
  syllabusListContainer: document.getElementById('syllabusListContainer'),
  syllCompletedCount: document.getElementById('syllCompletedCount'),
  syllInProgressCount: document.getElementById('syllInProgressCount'),
  syllPendingCount: document.getElementById('syllPendingCount'),

  // Dashboard
  dashSyllabusPct: document.getElementById('dashSyllabusPct'),
  dashSyllabusBar: document.getElementById('dashSyllabusBar'),
  dashSyllabusRemaining: document.getElementById('dashSyllabusRemaining'),
  dashMockScore: document.getElementById('dashMockScore'),
  dashEstimatedAir: document.getElementById('dashEstimatedAir'),
  dashStudyHrs: document.getElementById('dashStudyHrs'),
  weeklyTableBody: document.getElementById('weeklyTableBody'),
  syncReportBtn: document.getElementById('syncReportBtn'),

  // Mock Test
  mockSubjectFilter: document.getElementById('mockSubjectFilter'),
  mockTypeFilter: document.getElementById('mockTypeFilter'),
  quizContainer: document.getElementById('quizContainer'),
  submitQuizBtn: document.getElementById('submitQuizBtn'),
  resetQuizBtn: document.getElementById('resetQuizBtn'),
  quizResultArea: document.getElementById('quizResultArea'),
  resultAirRank: document.getElementById('resultAirRank'),
  resultPercentile: document.getElementById('resultPercentile'),
  resultRawScore: document.getElementById('resultRawScore'),
  resultFeedback: document.getElementById('resultFeedback'),

  // Subjective
  subjectiveQuestionSelect: document.getElementById('subjectiveQuestionSelect'),
  subqSubjectBadge: document.getElementById('subqSubjectBadge'),
  subqMarksBadge: document.getElementById('subqMarksBadge'),
  subqText: document.getElementById('subqText'),
  studentSubjectiveInput: document.getElementById('studentSubjectiveInput'),
  evaluateAnswerBtn: document.getElementById('evaluateAnswerBtn'),
  showModelAnswerBtn: document.getElementById('showModelAnswerBtn'),
  evalResultContainer: document.getElementById('evalResultContainer'),

  // PYQs & Videos
  pyqYearFilter: document.getElementById('pyqYearFilter'),
  pyqGrid: document.getElementById('pyqGrid'),
  videoGrid: document.getElementById('videoGrid'),

  // Timer & Alarm
  timerDisplay: document.getElementById('timerDisplay'),
  startTimerBtn: document.getElementById('startTimerBtn'),
  breakTimerBtn: document.getElementById('breakTimerBtn'),
  stopTimerBtn: document.getElementById('stopTimerBtn'),
  testAlarmSoundBtn: document.getElementById('testAlarmSoundBtn'),
  timerStatusLabel: document.getElementById('timerStatusLabel'),
  examCountdownTicker: document.getElementById('examCountdownTicker'),

  // Motivation & Panic
  breathingBubble: document.getElementById('breathingBubble'),
  toggleBreathingBtn: document.getElementById('toggleBreathingBtn'),
  dailyQuoteText: document.getElementById('dailyQuoteText'),
  dailyQuoteAuthor: document.getElementById('dailyQuoteAuthor'),
  nextQuoteBtn: document.getElementById('nextQuoteBtn')
};

// --- Initialization ---
function initApp() {
  populateBoardSelect();
  updateStreamOptions();
  DOM.boardSelect.value = AppState.currentBoard;
  DOM.classSelect.value = AppState.currentClass;
  DOM.streamSelect.value = AppState.currentStream;

  updateUserEmailBadge();
  setupTabNavigation();
  setupEventListeners();

  // Load modules
  renderStudyPlanner();
  renderWeeklyDashboard();
  renderSyllabusList();
  renderQuizQuestions();
  populateSubjectiveQuestions();
  renderPyqVault();
  renderVideos();
  startExamCountdown();
  showRandomQuote();
  checkSession(); // is the student already logged in on the server?
}

// Populate Board Select options
function populateBoardSelect() {
  DOM.boardSelect.innerHTML = PORTAL_DATA.boards
    .map(b => `<option value="${b.id}">${b.name}</option>`)
    .join('');
}

// Update Stream select based on Class (Class 10 vs Class 12)
function updateStreamOptions() {
  const cls = DOM.classSelect.value;
  const streams = PORTAL_DATA.streams[cls] || [];

  DOM.streamSelect.innerHTML = streams
    .map(s => `<option value="${s.id}">${s.name}</option>`)
    .join('');

  if (cls === 'class10') {
    AppState.currentStream = 'general';
  } else if (!streams.find(s => s.id === AppState.currentStream)) {
    AppState.currentStream = streams[0]?.id || 'science_pcm';
  }
  DOM.streamSelect.value = AppState.currentStream;
  updateSubjectFilters();
}

function updateSubjectFilters() {
  const cls = AppState.currentClass;
  const subjectsMap = PORTAL_DATA.syllabi[cls] || {};
  const subjects = Object.keys(subjectsMap);

  // Update Syllabus Subject filter
  DOM.syllabusSubjectFilter.innerHTML = subjects
    .map(sub => `<option value="${sub}">${sub}</option>`)
    .join('');

  // Update Mock Test Subject filter
  DOM.mockSubjectFilter.innerHTML = `<option value="all">All Subjects</option>` +
    subjects.map(sub => `<option value="${sub}">${sub}</option>`).join('');
}

function updateUserEmailBadge() {
  if (AppState.user.isLoggedIn) {
    DOM.userEmailBadge.textContent = `👤 ${AppState.user.email} (${AppState.user.goalScore}%)`;
    DOM.authBtn.classList.remove('btn-primary');
    DOM.authBtn.classList.add('btn-outline');
  } else {
    DOM.userEmailBadge.innerHTML = `👤 Login with Email`;
    DOM.authBtn.classList.add('btn-primary');
  }
}

// Tab navigation handler
function setupTabNavigation() {
  DOM.tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      DOM.tabBtns.forEach(b => b.classList.remove('active'));
      DOM.tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(`tab-${targetTab}`);
      if (targetPane) targetPane.classList.add('active');
    });
  });
}

function switchTab(tabName) {
  const targetBtn = document.querySelector(`.tab-btn[data-tab="${tabName}"]`);
  if (targetBtn) targetBtn.click();
}

// --- Event Listeners ---
function setupEventListeners() {
  // Board / Class / Stream changes
  DOM.boardSelect.addEventListener('change', (e) => {
    AppState.currentBoard = e.target.value;
    localStorage.setItem('board_user_board', AppState.currentBoard);
    renderPyqVault();
  });

  DOM.classSelect.addEventListener('change', (e) => {
    AppState.currentClass = e.target.value;
    localStorage.setItem('board_user_class', AppState.currentClass);
    updateStreamOptions();
    renderSyllabusList();
    renderQuizQuestions();
    populateSubjectiveQuestions();
    renderVideos();
    renderStudyPlanner();
  });

  DOM.streamSelect.addEventListener('change', (e) => {
    AppState.currentStream = e.target.value;
    localStorage.setItem('board_user_stream', AppState.currentStream);
    renderSyllabusList();
    renderQuizQuestions();
    populateSubjectiveQuestions();
    renderVideos();
  });

  // Auth Modal
  DOM.authBtn.addEventListener('click', openAuthModal);

  DOM.closeAuthModal.addEventListener('click', () => {
    DOM.authModal.style.display = 'none';
  });

  // Email OTP login (handled by the backend in /api)
  DOM.authForm.addEventListener('submit', handleSendOtp);
  DOM.otpForm.addEventListener('submit', handleVerifyOtp);
  DOM.otpBackBtn.addEventListener('click', () => showAuthView('email'));
  DOM.logoutBtn.addEventListener('click', handleLogout);

  // Report card upload
  DOM.reportLoginBtn.addEventListener('click', openAuthModal);
  DOM.uploadReportBtn.addEventListener('click', handleUploadReport);

  // Quick Panic Button
  DOM.openPanicBtn.addEventListener('click', () => {
    switchTab('motivation');
    startBreathingExercise();
    alarmAudio.playZenChime();
  });

  // Planner
  DOM.calculatePlanBtn.addEventListener('click', renderStudyPlanner);

  // Syllabus Subject change
  DOM.syllabusSubjectFilter.addEventListener('change', renderSyllabusList);

  // Mock Test filters & actions
  DOM.mockSubjectFilter.addEventListener('change', renderQuizQuestions);
  DOM.mockTypeFilter.addEventListener('change', renderQuizQuestions);
  DOM.submitQuizBtn.addEventListener('click', submitQuizAndCalculateAir);
  DOM.resetQuizBtn.addEventListener('click', () => {
    AppState.selectedAnswers = {};
    DOM.quizResultArea.style.display = 'none';
    renderQuizQuestions();
  });

  // Subjective Evaluator
  DOM.subjectiveQuestionSelect.addEventListener('change', updateActiveSubjectiveQuestion);
  DOM.evaluateAnswerBtn.addEventListener('click', evaluateSubjectiveAnswer);
  DOM.showModelAnswerBtn.addEventListener('click', toggleModelAnswer);

  // PYQ filter
  DOM.pyqYearFilter.addEventListener('change', renderPyqVault);

  // Timer controls
  DOM.startTimerBtn.addEventListener('click', startStudyTimer);
  DOM.breakTimerBtn.addEventListener('click', startBreakTimer);
  DOM.stopTimerBtn.addEventListener('click', stopTimer);
  DOM.testAlarmSoundBtn.addEventListener('click', () => {
    alarmAudio.playAlarmBuzzer();
  });

  // Panic & Breathing
  DOM.toggleBreathingBtn.addEventListener('click', toggleBreathingExercise);
  DOM.nextQuoteBtn.addEventListener('click', showRandomQuote);

  // Sync dashboard
  DOM.syncReportBtn.addEventListener('click', () => {
    renderWeeklyDashboard();
    alert('✅ Weekly performance, mock test scores, and syllabus backlogs refreshed!');
  });
}

// --- MODULE 1: STUDY & SLEEP CALCULATOR ---
function renderStudyPlanner() {
  const bracket = DOM.plannerScoreBracket.value;
  const daysLeft = parseInt(DOM.plannerDaysLeft.value, 10) || 90;

  let plan = {};

  if (bracket === 'tier1') {
    // Below 60%
    plan = {
      title: "Rebuild & Accelerate Plan (Current: < 60%)",
      studyHours: "6.0 Hours / Day",
      sleepHours: "7.5 to 8 Hours (Mandatory)",
      revisionRatio: "50% Core Theory + 30% Solved Examples + 20% Formula Sheets",
      strategy: "Stop running after hard reference books. 85% of board questions are direct NCERT derivatives. Prioritize high-weightage chapters first to secure passing and 75%+ boundary quickly.",
      timetable: [
        { time: "06:30 AM - 07:00 AM", activity: "Wake up, hydrate, 5-minute sunlight exposure (sets circadian rhythm)" },
        { time: "07:00 AM - 09:00 AM", activity: "Session 1 (Fresh Mind): Hardest Subject / Numerical Practice" },
        { time: "09:00 AM - 10:00 AM", activity: "Nutritious breakfast & school/routine buffer" },
        { time: "03:30 PM - 05:00 PM", activity: "Session 2: NCERT Back-exercise questions & direct derivations" },
        { time: "05:00 PM - 05:45 PM", activity: "Outdoor walk or exercise (burns off cortisol / reduces stress)" },
        { time: "06:00 PM - 07:30 PM", activity: "Session 3: Second Core Subject (Concept building + summary notes)" },
        { time: "08:30 PM - 09:30 PM", activity: "Session 4: Revision of today's formulas & flashcards" },
        { time: "10:30 PM - 06:30 AM", activity: "Deep Restful Sleep (8 Hours - essential for memory consolidation)" }
      ]
    };
  } else if (bracket === 'tier2') {
    // 60% - 80%
    plan = {
      title: "Consolidation & Score Booster Plan (Current: 60% - 80%)",
      studyHours: "7.0 Hours / Day",
      sleepHours: "7 Hours (Non-negotiable)",
      revisionRatio: "40% PYQ Solving + 30% Weak Concept Fixing + 30% Timed Quizzes",
      strategy: "You understand the basics, but you lose marks on tricky application questions, careless arithmetic errors, or incomplete subjective phrasing. Drill 10 years of past board questions under 3-hour exam conditions.",
      timetable: [
        { time: "06:00 AM - 06:30 AM", activity: "Wake up, fresh routine & 10m meditation/breathing" },
        { time: "06:30 AM - 08:30 AM", activity: "Session 1: High-weightage Subject PYQs & derivation drills" },
        { time: "02:00 PM - 04:00 PM", activity: "Session 2: Weak-Spot Repair (Re-do questions missed in pre-boards)" },
        { time: "04:00 PM - 04:45 PM", activity: "Rest & healthy snack (almonds, fruits, tea)" },
        { time: "05:00 PM - 07:00 PM", activity: "Session 3: Second Major Subject (Speed writing & diagram practice)" },
        { time: "08:30 PM - 09:30 PM", activity: "Session 4: Active Recall & Mock test error-log review" },
        { time: "11:00 PM - 06:00 AM", activity: "Continuous 7 Hours Sleep (Consolidates long-term memory)" }
      ]
    };
  } else {
    // 80%+ High Achiever
    plan = {
      title: "Topper Rank & 98%+ Precision Plan (Current: 80%+)",
      studyHours: "8.0 Hours / Day",
      sleepHours: "7 Hours (Strictly maintained)",
      revisionRatio: "50% Full-Length 3-Hr Sample Papers + 30% Step-Marking Fine Tuning + 20% Rapid Mind Maps",
      strategy: "At your stage, passive reading is a trap. Solve sample papers strictly between 10:30 AM to 01:30 PM (matching actual board exam timing) to train your brain's biological peak alertness.",
      timetable: [
        { time: "06:30 AM - 07:00 AM", activity: "Wake up & quick physical stretch" },
        { time: "07:30 AM - 09:30 AM", activity: "Session 1: Advanced Case-Studies & Assertion-Reasoning Mastery" },
        { time: "10:30 AM - 01:30 PM", activity: "Session 2: Strict 3-Hour Timed Mock Paper (Board conditions)" },
        { time: "03:30 PM - 05:00 PM", activity: "Session 3: Detailed Self-Audit against Official Marking Scheme" },
        { time: "06:00 PM - 08:00 PM", activity: "Session 4: Subjective formatting, presentation & keyword polishing" },
        { time: "09:00 PM - 09:45 PM", activity: "Session 5: Day wrap-up & Formula sheet review" },
        { time: "11:15 PM - 06:30 AM", activity: "7 Hours 15 Mins Sound Sleep" }
      ]
    };
  }

  DOM.plannerOutputCard.innerHTML = `
    <div style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.75rem; margin-bottom: 1rem;">
      <span class="badge badge-expected" style="font-size: 0.85rem;">RECOMMENDED FOR ${daysLeft} DAYS LEFT</span>
      <h3 style="color: #fff; font-size: 1.25rem; margin-top: 0.5rem;">${plan.title}</h3>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 1rem;">
      <div style="background: rgba(99, 102, 241, 0.15); padding: 0.75rem; border-radius: 8px;">
        <div style="font-size: 0.75rem; color: #818cf8;">DAILY SELF-STUDY</div>
        <div style="font-size: 1.2rem; font-weight: 700; color: #fff;">${plan.studyHours}</div>
      </div>
      <div style="background: rgba(16, 185, 129, 0.15); padding: 0.75rem; border-radius: 8px;">
        <div style="font-size: 0.75rem; color: #34d399;">MANDATORY SLEEP</div>
        <div style="font-size: 1.2rem; font-weight: 700; color: #fff;">${plan.sleepHours}</div>
      </div>
    </div>

    <div style="margin-bottom: 1rem; font-size: 0.9rem; color: #cbd5e1;">
      <strong style="color: #38bdf8;">Revision Formula:</strong> ${plan.revisionRatio}
    </div>

    <div style="margin-bottom: 1.25rem; font-size: 0.85rem; color: #94a3b8; line-height: 1.5; background: rgba(0,0,0,0.25); padding: 0.75rem; border-radius: 6px;">
      💡 <strong style="color: #fbbf24;">Exam Specialist Note:</strong> ${plan.strategy}
    </div>

    <h4 style="font-size: 0.95rem; color: #fff; margin-bottom: 0.5rem;">📅 Daily Optimal Timetable</h4>
    <div style="max-height: 220px; overflow-y: auto; font-size: 0.85rem;">
      ${plan.timetable.map(slot => `
        <div style="display: flex; gap: 0.75rem; padding: 0.4rem 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
          <span style="color: #38bdf8; min-width: 130px; font-weight: 600;">${slot.time}</span>
          <span style="color: #e2e8f0;">${slot.activity}</span>
        </div>
      `).join('')}
    </div>
  `;
}

// --- MODULE 2: WEEKLY DASHBOARD & ANALYTICS ---
function renderWeeklyDashboard() {
  const cls = AppState.currentClass;
  const subjectsMap = PORTAL_DATA.syllabi[cls] || {};
  let totalChapters = 0;
  let completedChapters = 0;

  Object.values(subjectsMap).forEach(chapList => {
    chapList.forEach(ch => {
      totalChapters++;
      const currentStatus = AppState.syllabusProgress[ch.id] || ch.status;
      if (currentStatus === 'completed') completedChapters++;
    });
  });

  const pct = totalChapters > 0 ? Math.round((completedChapters / totalChapters) * 100) : 58;
  const leftPct = 100 - pct;

  DOM.dashSyllabusPct.innerText = `${pct}%`;
  DOM.dashSyllabusBar.style.width = `${pct}%`;
  DOM.dashSyllabusRemaining.innerText = `${leftPct}% syllabus left to revise`;

  // Weekly study data simulation
  const days = [
    { day: "Monday", study: "6.5 hrs", sleep: "7.5 hrs", test: "Physics Unit Test", score: "88%", topics: "Electrostatics & Gauss Law", status: "On Track" },
    { day: "Tuesday", study: "7.0 hrs", sleep: "7.0 hrs", test: "Chemistry PYQ Drill", score: "82%", topics: "Solutions & Kinetics", status: "On Track" },
    { day: "Wednesday", study: "5.5 hrs", sleep: "8.0 hrs", test: "Maths Integrals Quiz", score: "76%", topics: "Definite Integrals", status: "Needs Practice" },
    { day: "Thursday", study: "6.8 hrs", sleep: "7.0 hrs", test: "English & Elective", score: "92%", topics: "Writing Skills & Articles", status: "Excellent" },
    { day: "Friday", study: "7.2 hrs", sleep: "7.5 hrs", test: "Board Full Mock 1", score: "85%", topics: "Full Half-Syllabus", status: "On Track" },
    { day: "Saturday", study: "8.0 hrs", sleep: "7.0 hrs", test: "Past Year 2024 Paper", score: "89%", topics: "Complete Model Paper", status: "Top Tier" },
    { day: "Sunday (Today)", study: "6.0 hrs", sleep: "8.0 hrs", test: "Revision & Error Log", score: "90%", topics: "Formulas & Weak Chapters", status: "Active" }
  ];

  DOM.weeklyTableBody.innerHTML = days.map(d => `
    <tr>
      <td><strong>${d.day}</strong></td>
      <td><span style="color: #38bdf8; font-weight: 600;">${d.study}</span></td>
      <td><span style="color: #34d399;">${d.sleep}</span></td>
      <td>${d.test}</td>
      <td><strong>${d.score}</strong></td>
      <td style="color: #94a3b8; font-size: 0.85rem;">${d.topics}</td>
      <td><span class="badge ${d.status === 'Needs Practice' ? 'badge-pyq' : 'badge-expected'}">${d.status}</span></td>
    </tr>
  `).join('');
}

// --- MODULE 3: SYLLABUS LEFT TRACKER ---
function renderSyllabusList() {
  const cls = AppState.currentClass;
  const currentSub = DOM.syllabusSubjectFilter.value || Object.keys(PORTAL_DATA.syllabi[cls] || {})[0];
  const chapters = PORTAL_DATA.syllabi[cls]?.[currentSub] || [];

  let completed = 0;
  let inProgress = 0;
  let pending = 0;

  const html = chapters.map(ch => {
    const status = AppState.syllabusProgress[ch.id] || ch.status;
    if (status === 'completed') completed++;
    else if (status === 'in_progress') inProgress++;
    else pending++;

    return `
      <div class="syllabus-item ${status}" id="syll-item-${ch.id}">
        <div style="flex: 1;">
          <div style="font-weight: 600; font-size: 0.95rem; color: #fff;">${ch.name}</div>
          <div style="font-size: 0.75rem; color: #38bdf8; margin-top: 0.2rem;">Board Weightage: ${ch.weightage}</div>
        </div>
        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <select class="control-select" onchange="updateChapterStatus('${ch.id}', this.value)" style="font-size: 0.8rem; padding: 0.3rem 0.6rem;">
            <option value="completed" ${status === 'completed' ? 'selected' : ''}>✅ Completed</option>
            <option value="in_progress" ${status === 'in_progress' ? 'selected' : ''}>⏳ In Progress</option>
            <option value="pending" ${status === 'pending' ? 'selected' : ''}>❌ Syllabus Left</option>
          </select>
        </div>
      </div>
    `;
  }).join('');

  DOM.syllabusListContainer.innerHTML = html || `<p style="padding: 1.5rem; color: #94a3b8;">No syllabus data for this subject.</p>`;

  DOM.syllCompletedCount.innerText = completed;
  DOM.syllInProgressCount.innerText = inProgress;
  DOM.syllPendingCount.innerText = pending;

  renderWeeklyDashboard();
}

window.updateChapterStatus = function(chapId, newStatus) {
  AppState.syllabusProgress[chapId] = newStatus;
  localStorage.setItem('board_syllabus_progress', JSON.stringify(AppState.syllabusProgress));
  renderSyllabusList();
};

// --- MODULE 4: MOCK TEST & REVISION QUIZ WITH ALL INDIA RANK ---
function renderQuizQuestions() {
  const cls = AppState.currentClass;
  const stream = AppState.currentStream;
  const subFilter = DOM.mockSubjectFilter.value;
  const typeFilter = DOM.mockTypeFilter.value;

  // Filter questions matching class, stream, subject, and type
  let questions = PORTAL_DATA.questions.filter(q => q.class === cls);

  if (cls === 'class12') {
    questions = questions.filter(q => q.stream === stream || stream.includes(q.subject.toLowerCase()));
  }

  if (subFilter !== 'all') {
    questions = questions.filter(q => q.subject.toLowerCase() === subFilter.toLowerCase());
  }

  if (typeFilter !== 'all') {
    questions = questions.filter(q => q.type === typeFilter);
  }

  // Fallback to all class questions if stream-filter produces no items
  if (questions.length === 0) {
    questions = PORTAL_DATA.questions.filter(q => q.class === cls);
  }

  DOM.quizContainer.innerHTML = questions.map((q, idx) => {
    const isPyq = q.type === 'pyq';
    return `
      <div class="question-card" id="qcard-${q.id}">
        <div class="question-header">
          <div style="display: flex; gap: 0.5rem; align-items: center;">
            <span style="font-weight: 700; color: #38bdf8;">Question ${idx + 1}</span>
            <span class="badge ${isPyq ? 'badge-pyq' : 'badge-expected'}">
              ${isPyq ? '📜 ' + q.yearBadge : '🔮 ' + q.yearBadge}
            </span>
            <span class="badge badge-stream">${q.subject}</span>
          </div>
          <span style="font-size: 0.8rem; color: #94a3b8;">Difficulty: ${q.difficulty}</span>
        </div>

        <div class="question-text">${q.question}</div>

        <div class="options-grid">
          ${q.options.map((opt, optIdx) => `
            <button class="option-btn" data-qid="${q.id}" data-idx="${optIdx}" onclick="selectQuizOption(${q.id}, ${optIdx})">
              <span style="font-weight: 700; color: #818cf8;">${String.fromCharCode(65 + optIdx)}.</span>
              <span>${opt}</span>
            </button>
          `).join('')}
        </div>

        <div class="explanation-box" id="expl-${q.id}">
          <strong style="color: #38bdf8;">Official Board Solution:</strong><br>
          ${q.explanation}
        </div>
      </div>
    `;
  }).join('');
}

window.selectQuizOption = function(qid, optIdx) {
  AppState.selectedAnswers[qid] = optIdx;
  const qcard = document.getElementById(`qcard-${qid}`);
  if (qcard) {
    const btns = qcard.querySelectorAll('.option-btn');
    btns.forEach(b => b.classList.remove('selected'));
    const chosenBtn = qcard.querySelector(`.option-btn[data-idx="${optIdx}"]`);
    if (chosenBtn) chosenBtn.classList.add('selected');
  }
};

function submitQuizAndCalculateAir() {
  const cls = AppState.currentClass;
  const stream = AppState.currentStream;
  let questions = PORTAL_DATA.questions.filter(q => q.class === cls);
  if (cls === 'class12') {
    questions = questions.filter(q => q.stream === stream || stream.includes(q.subject.toLowerCase()));
  }
  if (questions.length === 0) questions = PORTAL_DATA.questions.filter(q => q.class === cls);

  let correctCount = 0;
  let attempted = 0;

  questions.forEach(q => {
    const selected = AppState.selectedAnswers[q.id];
    const qcard = document.getElementById(`qcard-${q.id}`);
    const explBox = document.getElementById(`expl-${q.id}`);

    if (explBox) explBox.style.display = 'block';

    if (selected !== undefined) {
      attempted++;
      if (selected === q.answer) {
        correctCount++;
        if (qcard) {
          const btn = qcard.querySelector(`.option-btn[data-idx="${selected}"]`);
          if (btn) btn.classList.add('correct');
        }
      } else {
        if (qcard) {
          const wrongBtn = qcard.querySelector(`.option-btn[data-idx="${selected}"]`);
          if (wrongBtn) wrongBtn.classList.add('incorrect');
          const correctBtn = qcard.querySelector(`.option-btn[data-idx="${q.answer}"]`);
          if (correctBtn) correctBtn.classList.add('correct');
        }
      }
    } else {
      if (qcard) {
        const correctBtn = qcard.querySelector(`.option-btn[data-idx="${q.answer}"]`);
        if (correctBtn) correctBtn.classList.add('correct');
      }
    }
  });

  const total = questions.length;
  const scorePct = total > 0 ? Math.round((correctCount / total) * 100) : 0;

  // Realistic All India Rank Simulation
  // Assuming a cohort of 180,000 board aspirants nationwide
  const totalCompetitors = 180000;
  let percentile = 0;
  let simulatedAir = 0;

  if (scorePct >= 95) {
    percentile = (98.5 + (Math.random() * 1.2)).toFixed(2);
    simulatedAir = Math.floor(totalCompetitors * (1 - percentile / 100)) + 45;
  } else if (scorePct >= 80) {
    percentile = (92.0 + (Math.random() * 5.5)).toFixed(2);
    simulatedAir = Math.floor(totalCompetitors * (1 - percentile / 100)) + 300;
  } else if (scorePct >= 60) {
    percentile = (75.0 + (Math.random() * 14)).toFixed(2);
    simulatedAir = Math.floor(totalCompetitors * (1 - percentile / 100));
  } else {
    percentile = (45.0 + (Math.random() * 20)).toFixed(2);
    simulatedAir = Math.floor(totalCompetitors * (1 - percentile / 100));
  }

  // Reveal AIR box
  DOM.quizResultArea.style.display = 'block';
  DOM.resultAirRank.innerText = `AIR #${simulatedAir.toLocaleString()}`;
  DOM.resultPercentile.innerHTML = `Simulated Percentile: <strong>${percentile}%</strong> among 180,000 nationwide candidates`;
  DOM.resultRawScore.innerText = `Accuracy: ${correctCount} / ${total} Correct (${scorePct}%)`;

  let feedback = '';
  if (scorePct >= 85) {
    feedback = "🌟 Outstanding Performance! You're in the top 5% bracket. Keep practicing full-length papers under strict 3-hour exam timing to protect this high All India Rank!";
  } else if (scorePct >= 65) {
    feedback = "👍 Good solid foundation! You have clear core concepts, but missed subtle tricks on PYQs and predicted questions. Review the highlighted green board solutions above and re-attempt.";
  } else {
    feedback = "⚠️ Syllabus gaps detected. Don't panic: this mock test showed you exactly what to revise today. Head over to the 'YouTube Revision' tab and watch the One-Shot lectures for these topics.";
  }
  DOM.resultFeedback.innerText = feedback;

  // Smooth scroll down to result
  DOM.quizResultArea.scrollIntoView({ behavior: 'smooth' });
}

// --- MODULE 5: WRITTEN / SUBJECTIVE TEST EVALUATOR ---
function populateSubjectiveQuestions() {
  const cls = AppState.currentClass;
  const questions = PORTAL_DATA.subjectiveQuestions.filter(q => q.class === cls);
  const activeQuestions = questions.length > 0 ? questions : PORTAL_DATA.subjectiveQuestions;

  DOM.subjectiveQuestionSelect.innerHTML = activeQuestions
    .map(q => `<option value="${q.id}">[${q.subject}] ${q.question.substring(0, 75)}...</option>`)
    .join('');

  updateActiveSubjectiveQuestion();
}

function updateActiveSubjectiveQuestion() {
  const qid = DOM.subjectiveQuestionSelect.value;
  const q = PORTAL_DATA.subjectiveQuestions.find(item => item.id === qid) || PORTAL_DATA.subjectiveQuestions[0];
  if (!q) return;

  DOM.subqSubjectBadge.innerText = `${q.subject} (${q.class === 'class10' ? 'Class 10th' : 'Class 12th'})`;
  DOM.subqMarksBadge.innerText = `${q.maxMarks} Marks Board Question`;
  DOM.subqText.innerText = q.question;
  DOM.evalResultContainer.style.display = 'none';
  DOM.studentSubjectiveInput.value = '';
}

function evaluateSubjectiveAnswer() {
  const text = DOM.studentSubjectiveInput.value.trim();
  if (text.length < 20) {
    alert('Please write at least a few sentences (minimum 20 characters) so our evaluator can analyze your keywords and step-marking!');
    return;
  }

  const qid = DOM.subjectiveQuestionSelect.value;
  const q = PORTAL_DATA.subjectiveQuestions.find(item => item.id === qid) || PORTAL_DATA.subjectiveQuestions[0];

  const lowerText = text.toLowerCase();

  // Evaluate keywords
  const matchedKeywords = [];
  const missingKeywords = [];

  q.keywords.forEach(kw => {
    if (lowerText.includes(kw.toLowerCase())) {
      matchedKeywords.push(kw);
    } else {
      missingKeywords.push(kw);
    }
  });

  // Calculate Marks Breakdown
  const keywordRatio = matchedKeywords.length / q.keywords.length;
  let wordCountScore = text.split(/\s+/).length > 35 ? 1 : 0.5;
  let rawMarks = (keywordRatio * 2) + (wordCountScore * 1);
  if (rawMarks > q.maxMarks) rawMarks = q.maxMarks;
  const awardedMarks = (Math.round(rawMarks * 2) / 2).toFixed(1); // round to 0.5 step

  DOM.evalResultContainer.style.display = 'block';
  DOM.evalResultContainer.innerHTML = `
    <div class="eval-result-card">
      <div class="score-ribbon">
        <div>
          <span style="font-size: 0.85rem; color: #94a3b8; text-transform: uppercase;">Step Marking Awarded</span>
          <div style="font-size: 1.6rem; font-weight: 800; color: #38bdf8;">${awardedMarks} / ${q.maxMarks} Marks</div>
        </div>
        <span class="badge ${awardedMarks >= 2.5 ? 'badge-expected' : 'badge-pyq'}" style="font-size: 0.9rem;">
          ${awardedMarks >= 2.5 ? '🌟 Excellent Board Presentation' : '⚠️ Missing Board Keywords'}
        </span>
      </div>

      <div style="margin-bottom: 1rem;">
        <h4 style="font-size: 0.9rem; color: #fff; margin-bottom: 0.4rem;">🔑 Examiner Keyword Analysis:</h4>
        <div>
          ${matchedKeywords.map(k => `<span class="rubric-pill rubric-found">✓ ${k}</span>`).join('')}
          ${missingKeywords.map(k => `<span class="rubric-pill rubric-missing">✗ Missing: ${k}</span>`).join('')}
        </div>
      </div>

      <div style="margin-bottom: 1rem; background: rgba(0,0,0,0.25); padding: 0.85rem; border-radius: 8px;">
        <h4 style="font-size: 0.9rem; color: #fbbf24; margin-bottom: 0.3rem;">📋 Official Marking Scheme Breakdown:</h4>
        <ul style="font-size: 0.85rem; color: #cbd5e1; padding-left: 1.25rem; line-height: 1.5;">
          ${q.rubric.map(r => `<li>${r.criterion} (<strong>${r.marks} Mark</strong>)</li>`).join('')}
        </ul>
      </div>

      <div style="margin-bottom: 1rem; background: rgba(99, 102, 241, 0.1); border-left: 3px solid #6366f1; padding: 0.85rem; border-radius: 6px;">
        <h4 style="font-size: 0.9rem; color: #fff; margin-bottom: 0.3rem;">💡 Suggestions for Full Marks:</h4>
        <p style="font-size: 0.85rem; color: #cbd5e1; line-height: 1.5;">
          ${missingKeywords.length > 0 
            ? `Board examiners scan for terms like <strong>${missingKeywords.slice(0, 3).join(', ')}</strong>. Underline these terms in your actual answer sheet with a pencil to catch the invigilator's eye immediately!` 
            : 'Outstanding! Your phrasing directly matches the official answer key with complete terminology.'}
        </p>
      </div>

      <div style="margin-top: 1rem;">
        <button class="btn btn-outline" onclick="toggleModelAnswer()" style="width: 100%;">
          📖 Compare with Official Model Answer
        </button>
        <div id="modelAnswerTextContainer" style="display: none; margin-top: 0.75rem; padding: 1rem; background: rgba(15, 23, 42, 0.95); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; font-size: 0.9rem; line-height: 1.6; color: #a7f3d0;">
          <strong style="color: #34d399;">Official 100% Ideal Answer:</strong><br>
          ${q.modelAnswer.replace(/\n/g, '<br>')}
        </div>
      </div>
    </div>
  `;

  DOM.evalResultContainer.scrollIntoView({ behavior: 'smooth' });
}

window.toggleModelAnswer = function() {
  const container = document.getElementById('modelAnswerTextContainer');
  if (container) {
    container.style.display = container.style.display === 'block' ? 'none' : 'block';
  } else {
    // If user clicked top button directly
    const qid = DOM.subjectiveQuestionSelect.value;
    const q = PORTAL_DATA.subjectiveQuestions.find(item => item.id === qid);
    if (q) {
      alert(`📖 Official Model Answer:\n\n${q.modelAnswer}`);
    }
  }
};

// --- MODULE 6: PREVIOUS YEAR PAPERS (PYQ) VAULT ---
function renderPyqVault() {
  const currentBoard = AppState.currentBoard;
  const currentClass = AppState.currentClass;
  const yearFilter = DOM.pyqYearFilter.value;

  let papers = PORTAL_DATA.pyqVault.filter(p => p.class === currentClass);

  if (yearFilter !== 'all') {
    papers = papers.filter(p => p.year === yearFilter);
  }

  DOM.pyqGrid.innerHTML = papers.map(p => `
    <div class="card" style="margin-bottom: 0;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
        <span class="badge badge-pyq">${p.board.toUpperCase()} • ${p.year} Board Exam</span>
        <span class="badge badge-stream">${p.subject}</span>
      </div>
      <h3 style="font-size: 1.1rem; color: #fff; margin-bottom: 0.5rem; line-height: 1.4;">${p.title}</h3>
      <p style="font-size: 0.85rem; color: #94a3b8; line-height: 1.5; margin-bottom: 1rem;">${p.highlights}</p>
      
      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 0.75rem;">
        <span style="font-size: 0.8rem; color: #64748b;">Paper Size: ${p.fileSize}</span>
        <button class="btn btn-outline" onclick="simulatePyqDownload('${p.title}')">
          📥 View & Solve Online
        </button>
      </div>
    </div>
  `).join('');
}

window.simulatePyqDownload = function(title) {
  alert(`📄 Opening: ${title}\n\nFeatures Included:\n1. 3-Hour Exam Paper Blueprint\n2. Section A (MCQs) to Section E (Case Studies)\n3. Step-by-step marking rubrics\n\nStarting practice mode!`);
};

// --- MODULE 7: YOUTUBE REVISION HUB ---
function renderVideos() {
  const cls = AppState.currentClass;
  const stream = AppState.currentStream;

  let vids = PORTAL_DATA.videos.filter(v => v.class === cls);
  if (cls === 'class12') {
    vids = vids.filter(v => v.stream === stream || stream.includes(v.subject.toLowerCase()));
  }
  if (vids.length === 0) vids = PORTAL_DATA.videos.filter(v => v.class === cls);

  DOM.videoGrid.innerHTML = vids.map(v => `
    <div class="video-card">
      <div class="video-wrapper">
        <iframe 
          src="https://www.youtube.com/embed/${v.embedId}?rel=0" 
          title="${v.title}" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      </div>
      <div class="video-info">
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
          <span class="badge badge-stream">${v.subject}</span>
          <span style="font-size: 0.75rem; color: #38bdf8;">⏳ ${v.duration}</span>
        </div>
        <h4 style="font-size: 0.95rem; color: #fff; margin-bottom: 0.3rem; line-height: 1.4;">${v.title}</h4>
        <p style="font-size: 0.8rem; color: #94a3b8; line-height: 1.4;">${v.summary}</p>
        <div style="font-size: 0.75rem; color: #64748b; margin-top: 0.5rem;">Channel: ${v.channel}</div>
      </div>
    </div>
  `).join('');
}

// --- MODULE 8: ALARM & COUNTDOWN ---
function startExamCountdown() {
  // Target: Spring Board Exams (approx Feb 15, 2027)
  const targetDate = new Date("2027-02-15T09:00:00").getTime();

  function update() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      DOM.examCountdownTicker.innerText = "EXAM COMMENCED!";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    DOM.examCountdownTicker.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  update();
  setInterval(update, 1000);
}

function formatTimer(totalSecs) {
  const m = Math.floor(totalSecs / 60).toString().padStart(2, '0');
  const s = (totalSecs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function startStudyTimer() {
  stopTimer();
  AppState.timer.mode = 'study';
  AppState.timer.remainingSeconds = 50 * 60;
  AppState.timer.isRunning = true;
  DOM.timerStatusLabel.innerText = "📖 Deep Study Session Active! Stay focused.";

  AppState.timer.intervalId = setInterval(() => {
    AppState.timer.remainingSeconds--;
    DOM.timerDisplay.innerText = formatTimer(AppState.timer.remainingSeconds);

    if (AppState.timer.remainingSeconds <= 0) {
      stopTimer();
      alarmAudio.playAlarmBuzzer();
      alert("⏰ TIME IS UP! Great study sprint! Stand up, stretch, and take a 10-minute break.");
      DOM.timerStatusLabel.innerText = "Session complete! Time for a break.";
    }
  }, 1000);
}

function startBreakTimer() {
  stopTimer();
  AppState.timer.mode = 'break';
  AppState.timer.remainingSeconds = 10 * 60;
  AppState.timer.isRunning = true;
  DOM.timerStatusLabel.innerText = "☕ Relax, drink water, do not look at screens.";

  AppState.timer.intervalId = setInterval(() => {
    AppState.timer.remainingSeconds--;
    DOM.timerDisplay.innerText = formatTimer(AppState.timer.remainingSeconds);

    if (AppState.timer.remainingSeconds <= 0) {
      stopTimer();
      alarmAudio.playAlarmBuzzer();
      alert("🔔 Break over! Ready to resume your board revision session?");
      DOM.timerStatusLabel.innerText = "Break finished. Start next study sprint.";
    }
  }, 1000);
}

function stopTimer() {
  if (AppState.timer.intervalId) {
    clearInterval(AppState.timer.intervalId);
    AppState.timer.intervalId = null;
  }
  AppState.timer.isRunning = false;
  AppState.timer.remainingSeconds = 50 * 60;
  DOM.timerDisplay.innerText = formatTimer(AppState.timer.remainingSeconds);
  DOM.timerStatusLabel.innerText = "Timer stopped.";
}

// --- MODULE 9: PANIC RELIEF & 4-7-8 BREATHING ---
let breathTimer = null;
function toggleBreathingExercise() {
  if (AppState.breathing.isActive) {
    stopBreathingExercise();
  } else {
    startBreathingExercise();
  }
}

function startBreathingExercise() {
  AppState.breathing.isActive = true;
  DOM.toggleBreathingBtn.innerText = "⏹️ Stop Breathing Reset";
  DOM.breathingBubble.innerText = "Inhale...";
  DOM.breathingBubble.className = "breathing-circle inhale";

  function cycle() {
    if (!AppState.breathing.isActive) return;

    // 1. Inhale (4s)
    DOM.breathingBubble.innerText = "Inhale (4s)";
    DOM.breathingBubble.className = "breathing-circle inhale";

    breathTimer = setTimeout(() => {
      if (!AppState.breathing.isActive) return;
      // 2. Hold (7s)
      DOM.breathingBubble.innerText = "Hold (7s)";
      DOM.breathingBubble.className = "breathing-circle hold";

      breathTimer = setTimeout(() => {
        if (!AppState.breathing.isActive) return;
        // 3. Exhale (8s)
        DOM.breathingBubble.innerText = "Exhale (8s)";
        DOM.breathingBubble.className = "breathing-circle exhale";

        breathTimer = setTimeout(() => {
          if (AppState.breathing.isActive) {
            cycle();
          }
        }, 8000);
      }, 7000);
    }, 4000);
  }

  cycle();
}

function stopBreathingExercise() {
  AppState.breathing.isActive = false;
  if (breathTimer) clearTimeout(breathTimer);
  DOM.toggleBreathingBtn.innerText = "▶️ Begin 2-Minute Panic Reset";
  DOM.breathingBubble.innerText = "Ready";
  DOM.breathingBubble.className = "breathing-circle";
}

let quoteIndex = 0;
function showRandomQuote() {
  quoteIndex = (quoteIndex + 1) % PORTAL_DATA.quotes.length;
  const q = PORTAL_DATA.quotes[quoteIndex];
  DOM.dailyQuoteText.innerText = `"${q.text}"`;
  DOM.dailyQuoteAuthor.innerText = `— ${q.author}`;
}

// --- MODULE 10: BACKEND — EMAIL OTP LOGIN & REPORT CARD UPLOAD ---
async function apiCall(path, options = {}) {
  const res = await fetch(path, { credentials: 'same-origin', ...options });
  let data = {};
  try { data = await res.json(); } catch (e) { /* non-JSON response */ }
  if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
  return data;
}

function setAuthMessage(text, kind) {
  DOM.authMessage.textContent = text || '';
  DOM.authMessage.style.color = kind === 'err' ? '#f87171' : kind === 'ok' ? '#34d399' : '#94a3b8';
}

function setReportMessage(text, kind) {
  DOM.reportMsg.textContent = text || '';
  DOM.reportMsg.style.color = kind === 'err' ? '#f87171' : kind === 'ok' ? '#34d399' : '#94a3b8';
}

// view: 'email' | 'otp' | 'done'
function showAuthView(view) {
  DOM.authForm.style.display = view === 'email' ? 'block' : 'none';
  DOM.otpForm.style.display = view === 'otp' ? 'block' : 'none';
  DOM.loggedInBox.style.display = view === 'done' ? 'block' : 'none';
  if (view !== 'otp') DOM.otpInput.value = '';
  setAuthMessage('');
}

function openAuthModal() {
  DOM.userEmailInput.value = AppState.user.isLoggedIn ? AppState.user.email : (localStorage.getItem('board_user_email') || '');
  DOM.userGoalInput.value = AppState.user.goalScore;
  if (AppState.user.isLoggedIn) {
    DOM.loggedInEmail.textContent = AppState.user.email;
    showAuthView('done');
  } else {
    showAuthView('email');
  }
  DOM.authModal.style.display = 'flex';
}

function applyLoggedInState(email) {
  AppState.user.email = email;
  AppState.user.isLoggedIn = true;
  localStorage.setItem('board_user_email', email);
  updateUserEmailBadge();
  renderWeeklyDashboard();
  DOM.reportLoggedOut.style.display = 'none';
  DOM.reportLoggedIn.style.display = 'block';
  loadReports();
}

function applyLoggedOutState() {
  AppState.user.isLoggedIn = false;
  updateUserEmailBadge();
  DOM.reportLoggedOut.style.display = 'block';
  DOM.reportLoggedIn.style.display = 'none';
  DOM.reportList.innerHTML = '';
}

async function checkSession() {
  try {
    const { email } = await apiCall('/api/me');
    applyLoggedInState(email);
  } catch (e) {
    applyLoggedOutState(); // not logged in (or backend not reachable, e.g. opened as a plain file)
  }
}

async function handleSendOtp(e) {
  e.preventDefault();
  const email = DOM.userEmailInput.value.trim();
  const goal = parseInt(DOM.userGoalInput.value, 10);
  if (!email) return;

  AppState.user.goalScore = goal || 90;
  localStorage.setItem('board_user_goal', String(AppState.user.goalScore));

  DOM.sendOtpBtn.disabled = true;
  setAuthMessage('Sending OTP…');
  try {
    await apiCall('/api/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    DOM.otpSentTo.textContent = email;
    showAuthView('otp');
    setAuthMessage('OTP sent! Check your inbox (and spam folder). It is valid for 10 minutes.', 'ok');
    DOM.otpInput.focus();
  } catch (err) {
    setAuthMessage(err.message, 'err');
  }
  DOM.sendOtpBtn.disabled = false;
}

async function handleVerifyOtp(e) {
  e.preventDefault();
  DOM.verifyOtpBtn.disabled = true;
  setAuthMessage('Verifying…');
  try {
    const { email } = await apiCall('/api/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: DOM.otpSentTo.textContent, otp: DOM.otpInput.value.trim() })
    });
    applyLoggedInState(email);
    DOM.authModal.style.display = 'none';
    showAuthView('email');
    switchTab('report');
  } catch (err) {
    setAuthMessage(err.message, 'err');
  }
  DOM.verifyOtpBtn.disabled = false;
}

async function handleLogout() {
  try { await apiCall('/api/me', { method: 'POST' }); } catch (err) { /* ignore */ }
  applyLoggedOutState();
  DOM.authModal.style.display = 'none';
}

async function loadReports() {
  try {
    const { reports } = await apiCall('/api/reports');
    DOM.reportList.innerHTML = '';
    if (!reports.length) {
      DOM.reportList.textContent = 'Nothing uploaded yet.';
      return;
    }
    reports.forEach((r) => {
      const row = document.createElement('div');
      row.style.cssText = 'display:flex; justify-content:space-between; gap:1rem; padding:0.6rem 0; border-bottom:1px solid rgba(255,255,255,0.07);';
      const link = document.createElement('a');
      link.href = r.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.style.color = '#38bdf8';
      link.textContent = '📎 Open report card';
      const meta = document.createElement('span');
      meta.style.color = '#94a3b8';
      meta.textContent = `${Math.max(1, Math.round(r.size / 1024))} KB • ${new Date(r.uploadedAt).toLocaleString()}`;
      row.append(link, meta);
      DOM.reportList.appendChild(row);
    });
  } catch (err) {
    DOM.reportList.textContent = err.message;
  }
}

async function handleUploadReport() {
  const file = DOM.reportFileInput.files[0];
  if (!file) return setReportMessage('Please choose a file first.', 'err');
  if (file.size > 4 * 1024 * 1024) return setReportMessage('File is larger than 4 MB.', 'err');

  DOM.uploadReportBtn.disabled = true;
  setReportMessage('Uploading…');
  try {
    await apiCall('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/octet-stream' },
      body: file
    });
    DOM.reportFileInput.value = '';
    setReportMessage('✅ Report card uploaded successfully.', 'ok');
    await loadReports();
  } catch (err) {
    setReportMessage(err.message, 'err');
    if (/log in/i.test(err.message)) applyLoggedOutState();
  }
  DOM.uploadReportBtn.disabled = false;
}

// Run on page load
window.addEventListener('DOMContentLoaded', initApp);

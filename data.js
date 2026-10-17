// Board Exam Prep Portal Data Engine
const PORTAL_DATA = {
  boards: [
    { id: 'cbse', name: 'CBSE (Central Board of Secondary Education)' },
    { id: 'icse', name: 'CISCE (ICSE Class 10 / ISC Class 12)' },
    { id: 'mh', name: 'Maharashtra State Board (HSC/SSC)' },
    { id: 'up', name: 'UP Board (Madhyamik / Intermediate)' },
    { id: 'bihar', name: 'BSEB (Bihar School Examination Board)' },
    { id: 'karnataka', name: 'KSEEB / Karnataka Pre-University' },
    { id: 'all_state', name: 'Other State / Regional Board' }
  ],

  classes: [
    { id: 'class10', name: 'Class 10th (Secondary Board)' },
    { id: 'class12', name: 'Class 12th (Senior Secondary)' }
  ],

  streams: {
    class10: [
      { id: 'general', name: 'Standard Board Curriculum (All Subjects)' }
    ],
    class12: [
      { id: 'science_pcm', name: 'Science (Physics, Chemistry, Maths, English, Comp. Sci/PE)' },
      { id: 'science_pcb', name: 'Science (Physics, Chemistry, Biology, English, PE/Psychology)' },
      { id: 'commerce', name: 'Commerce (Accountancy, Business Studies, Economics, Maths/PE)' },
      { id: 'humanities', name: 'Humanities / Arts (History, Political Science, Geography/Econ, Psychology)' }
    ]
  },

  syllabi: {
    class10: {
      'Science': [
        { id: 'sc1', name: 'Chemical Reactions & Equations', weightage: '6 Marks', status: 'completed' },
        { id: 'sc2', name: 'Acids, Bases & Salts', weightage: '6 Marks', status: 'completed' },
        { id: 'sc3', name: 'Metals & Non-Metals', weightage: '7 Marks', status: 'in_progress' },
        { id: 'sc4', name: 'Carbon & its Compounds', weightage: '8 Marks', status: 'pending' },
        { id: 'sc5', name: 'Life Processes', weightage: '9 Marks', status: 'completed' },
        { id: 'sc6', name: 'Control & Coordination', weightage: '6 Marks', status: 'in_progress' },
        { id: 'sc7', name: 'How do Organisms Reproduce?', weightage: '7 Marks', status: 'pending' },
        { id: 'sc8', name: 'Heredity & Evolution', weightage: '5 Marks', status: 'pending' },
        { id: 'sc9', name: 'Light - Reflection & Refraction', weightage: '10 Marks', status: 'in_progress' },
        { id: 'sc10', name: 'The Human Eye & Colourful World', weightage: '5 Marks', status: 'completed' },
        { id: 'sc11', name: 'Electricity', weightage: '8 Marks', status: 'pending' },
        { id: 'sc12', name: 'Magnetic Effects of Electric Current', weightage: '6 Marks', status: 'pending' },
        { id: 'sc13', name: 'Our Environment', weightage: '5 Marks', status: 'completed' }
      ],
      'Mathematics': [
        { id: 'm1', name: 'Real Numbers', weightage: '6 Marks', status: 'completed' },
        { id: 'm2', name: 'Polynomials', weightage: '5 Marks', status: 'completed' },
        { id: 'm3', name: 'Pair of Linear Equations in 2 Variables', weightage: '6 Marks', status: 'completed' },
        { id: 'm4', name: 'Quadratic Equations', weightage: '6 Marks', status: 'in_progress' },
        { id: 'm5', name: 'Arithmetic Progressions', weightage: '6 Marks', status: 'in_progress' },
        { id: 'm6', name: 'Triangles', weightage: '9 Marks', status: 'pending' },
        { id: 'm7', name: 'Coordinate Geometry', weightage: '6 Marks', status: 'completed' },
        { id: 'm8', name: 'Introduction to Trigonometry', weightage: '8 Marks', status: 'in_progress' },
        { id: 'm9', name: 'Applications of Trigonometry (Heights & Distances)', weightage: '4 Marks', status: 'pending' },
        { id: 'm10', name: 'Circles', weightage: '6 Marks', status: 'pending' },
        { id: 'm11', name: 'Areas Related to Circles', weightage: '5 Marks', status: 'pending' },
        { id: 'm12', name: 'Surface Areas & Volumes', weightage: '6 Marks', status: 'pending' },
        { id: 'm13', name: 'Statistics & Probability', weightage: '11 Marks', status: 'completed' }
      ],
      'Social Science': [
        { id: 'sst1', name: 'Rise of Nationalism in Europe', weightage: '6 Marks', status: 'completed' },
        { id: 'sst2', name: 'Nationalism in India', weightage: '7 Marks', status: 'completed' },
        { id: 'sst3', name: 'Resources & Development', weightage: '4 Marks', status: 'completed' },
        { id: 'sst4', name: 'Agriculture & Mineral Resources', weightage: '6 Marks', status: 'in_progress' },
        { id: 'sst5', name: 'Power Sharing & Federalism', weightage: '6 Marks', status: 'completed' },
        { id: 'sst6', name: 'Money and Credit', weightage: '5 Marks', status: 'in_progress' },
        { id: 'sst7', name: 'Globalisation and the Indian Economy', weightage: '5 Marks', status: 'pending' }
      ]
    },
    class12: {
      'Physics': [
        { id: 'ph1', name: 'Electrostatics & Electric Potential', weightage: '9 Marks', status: 'completed' },
        { id: 'ph2', name: 'Current Electricity', weightage: '7 Marks', status: 'completed' },
        { id: 'ph3', name: 'Magnetic Effects of Current & Magnetism', weightage: '9 Marks', status: 'in_progress' },
        { id: 'ph4', name: 'Electromagnetic Induction & Alternating Currents', weightage: '8 Marks', status: 'in_progress' },
        { id: 'ph5', name: 'Electromagnetic Waves', weightage: '3 Marks', status: 'completed' },
        { id: 'ph6', name: 'Ray Optics & Wave Optics', weightage: '14 Marks', status: 'pending' },
        { id: 'ph7', name: 'Dual Nature of Radiation & Matter', weightage: '6 Marks', status: 'completed' },
        { id: 'ph8', name: 'Atoms and Nuclei', weightage: '8 Marks', status: 'pending' },
        { id: 'ph9', name: 'Semiconductor Electronics & Logic Gates', weightage: '7 Marks', status: 'pending' }
      ],
      'Chemistry': [
        { id: 'ch1', name: 'Solutions', weightage: '7 Marks', status: 'completed' },
        { id: 'ch2', name: 'Electrochemistry', weightage: '9 Marks', status: 'completed' },
        { id: 'ch3', name: 'Chemical Kinetics', weightage: '7 Marks', status: 'in_progress' },
        { id: 'ch4', name: 'd and f Block Elements', weightage: '7 Marks', status: 'pending' },
        { id: 'ch5', name: 'Coordination Compounds', weightage: '7 Marks', status: 'pending' },
        { id: 'ch6', name: 'Haloalkanes and Haloarenes', weightage: '6 Marks', status: 'completed' },
        { id: 'ch7', name: 'Alcohols, Phenols and Ethers', weightage: '6 Marks', status: 'in_progress' },
        { id: 'ch8', name: 'Aldehydes, Ketones and Carboxylic Acids', weightage: '8 Marks', status: 'pending' },
        { id: 'ch9', name: 'Amines & Biomolecules', weightage: '13 Marks', status: 'pending' }
      ],
      'Mathematics': [
        { id: 'mt1', name: 'Relations and Functions', weightage: '5 Marks', status: 'completed' },
        { id: 'mt2', name: 'Matrices & Determinants', weightage: '10 Marks', status: 'completed' },
        { id: 'mt3', name: 'Continuity & Differentiability', weightage: '9 Marks', status: 'in_progress' },
        { id: 'mt4', name: 'Application of Derivatives (AOD)', weightage: '8 Marks', status: 'pending' },
        { id: 'mt5', name: 'Integrals (Definite & Indefinite)', weightage: '12 Marks', status: 'pending' },
        { id: 'mt6', name: 'Differential Equations', weightage: '7 Marks', status: 'pending' },
        { id: 'mt7', name: 'Vectors & 3D Geometry', weightage: '14 Marks', status: 'in_progress' },
        { id: 'mt8', name: 'Linear Programming & Probability', weightage: '15 Marks', status: 'completed' }
      ],
      'Biology': [
        { id: 'bio1', name: 'Sexual Reproduction in Flowering Plants', weightage: '7 Marks', status: 'completed' },
        { id: 'bio2', name: 'Human Reproduction & Reproductive Health', weightage: '9 Marks', status: 'completed' },
        { id: 'bio3', name: 'Principles of Inheritance and Variation', weightage: '10 Marks', status: 'in_progress' },
        { id: 'bio4', name: 'Molecular Basis of Inheritance', weightage: '12 Marks', status: 'pending' },
        { id: 'bio5', name: 'Human Health and Diseases', weightage: '7 Marks', status: 'completed' },
        { id: 'bio6', name: 'Biotechnology: Principles and Processes', weightage: '11 Marks', status: 'pending' },
        { id: 'bio7', name: 'Ecology & Environment Chapters', weightage: '14 Marks', status: 'pending' }
      ],
      'Accountancy': [
        { id: 'acc1', name: 'Accounting for Partnership: Fundamentals', weightage: '8 Marks', status: 'completed' },
        { id: 'acc2', name: 'Admission & Retirement of a Partner', weightage: '14 Marks', status: 'in_progress' },
        { id: 'acc3', name: 'Dissolution of Partnership Firm', weightage: '8 Marks', status: 'pending' },
        { id: 'acc4', name: 'Accounting for Share Capital & Debentures', weightage: '20 Marks', status: 'pending' },
        { id: 'acc5', name: 'Financial Statements Analysis & Ratios', weightage: '12 Marks', status: 'completed' },
        { id: 'acc6', name: 'Cash Flow Statement (AS-3)', weightage: '8 Marks', status: 'pending' }
      ],
      'Business Studies': [
        { id: 'bst1', name: 'Nature and Significance of Management', weightage: '6 Marks', status: 'completed' },
        { id: 'bst2', name: 'Principles of Management (Fayol & Taylor)', weightage: '7 Marks', status: 'completed' },
        { id: 'bst3', name: 'Business Environment & Planning', weightage: '11 Marks', status: 'completed' },
        { id: 'bst4', name: 'Organising & Staffing', weightage: '16 Marks', status: 'in_progress' },
        { id: 'bst5', name: 'Directing & Controlling', weightage: '15 Marks', status: 'pending' },
        { id: 'bst6', name: 'Financial Management & Markets', weightage: '15 Marks', status: 'pending' },
        { id: 'bst7', name: 'Marketing Management & Consumer Protection', weightage: '15 Marks', status: 'pending' }
      ],
      'Economics': [
        { id: 'eco1', name: 'Macroeconomics: National Income & Aggregates', weightage: '10 Marks', status: 'completed' },
        { id: 'eco2', name: 'Money and Banking', weightage: '6 Marks', status: 'completed' },
        { id: 'eco3', name: 'Determination of Income and Employment', weightage: '12 Marks', status: 'in_progress' },
        { id: 'eco4', name: 'Government Budget & Balance of Payments', weightage: '12 Marks', status: 'pending' },
        { id: 'eco5', name: 'Indian Economic Development: 1947-1990 & 1991 Reforms', weightage: '12 Marks', status: 'completed' },
        { id: 'eco6', name: 'Current Challenges Facing Indian Economy', weightage: '20 Marks', status: 'pending' },
        { id: 'eco7', name: 'Development Experiences with Neighbours', weightage: '8 Marks', status: 'pending' }
      ],
      'Political Science': [
        { id: 'pol1', name: 'The End of Bipolarity', weightage: '6 Marks', status: 'completed' },
        { id: 'pol2', name: 'Contemporary Centres of Power', weightage: '6 Marks', status: 'completed' },
        { id: 'pol3', name: 'International Organisations & Global Security', weightage: '10 Marks', status: 'in_progress' },
        { id: 'pol4', name: 'Challenges of Nation Building', weightage: '8 Marks', status: 'completed' },
        { id: 'pol5', name: 'India\'s External Relations & Parties', weightage: '10 Marks', status: 'pending' },
        { id: 'pol6', name: 'Recent Developments in Indian Politics', weightage: '8 Marks', status: 'pending' }
      ],
      'History': [
        { id: 'his1', name: 'Bricks, Beads and Bones (Harappan Civilisation)', weightage: '7 Marks', status: 'completed' },
        { id: 'his2', name: 'Kings, Farmers and Towns (Early States & Economies)', weightage: '8 Marks', status: 'completed' },
        { id: 'his3', name: 'Kinship, Caste and Class', weightage: '7 Marks', status: 'in_progress' },
        { id: 'his4', name: 'Thinkers, Beliefs and Buildings (Sanchi Stupa)', weightage: '8 Marks', status: 'pending' },
        { id: 'his5', name: 'Bhakti-Sufi Traditions & Imperial Vijayanagara', weightage: '15 Marks', status: 'pending' },
        { id: 'his6', name: 'Mahatma Gandhi & the Nationalist Movement', weightage: '10 Marks', status: 'pending' },
        { id: 'his7', name: 'Framing the Constitution', weightage: '8 Marks', status: 'pending' }
      ]
    }
  },

  // Rich Bank of Previous Year & Upcoming Expected Questions
  questions: [
    // CLASS 10 SCIENCE
    {
      id: 101,
      class: 'class10',
      subject: 'Science',
      stream: 'general',
      type: 'pyq',
      yearBadge: 'CBSE 2024 / ICSE 2023 Repeated',
      difficulty: 'Medium',
      question: 'Which of the following reaction represents a thermal decomposition reaction?',
      options: [
        '2H2 + O2 → 2H2O',
        '2FeSO4 (s) —[Heat]→ Fe2O3 (s) + SO2 (g) + SO3 (g)',
        'Zn + CuSO4 → ZnSO4 + Cu',
        'NaOH + HCl → NaCl + H2O'
      ],
      answer: 1,
      explanation: 'Ferrous sulphate crystals break down upon heating into ferric oxide, sulphur dioxide, and sulphur trioxide with a distinct burning sulphur smell. This is a classic thermal decomposition question asked repeatedly in board exams.'
    },
    {
      id: 102,
      class: 'class10',
      subject: 'Science',
      stream: 'general',
      type: 'expected',
      yearBadge: 'High Probability for Upcoming 2027 Boards',
      difficulty: 'Hard',
      question: 'A convex lens forms a real, inverted and same sized image of an object. If the focal length is 15 cm, where is the object placed and what is the magnification?',
      options: [
        'Object at 15 cm, Magnification = +1',
        'Object at 30 cm, Magnification = -1',
        'Object at 30 cm, Magnification = +1',
        'Object at 45 cm, Magnification = -0.5'
      ],
      answer: 1,
      explanation: 'For a convex lens, when an object is placed at 2F (2 × 15 = 30 cm), the image is formed at 2F on the other side, inverted and equal in size. Hence m = -v/u or image size / object size = -1.'
    },
    {
      id: 103,
      class: 'class10',
      subject: 'Science',
      stream: 'general',
      type: 'pyq',
      yearBadge: 'CBSE 2023 / State Boards',
      difficulty: 'Medium',
      question: 'Which enzyme present in saliva initiates the digestion of carbohydrates in the human digestive system?',
      options: [
        'Pepsin',
        'Salivary Amylase (Ptyalin)',
        'Trypsin',
        'Lipase'
      ],
      answer: 1,
      explanation: 'Salivary Amylase breaks down complex starch molecules into maltose sugars in the mouth cavity at pH around 6.8.'
    },
    {
      id: 104,
      class: 'class10',
      subject: 'Mathematics',
      stream: 'general',
      type: 'pyq',
      yearBadge: 'CBSE 2022 / 2024 Exam',
      difficulty: 'Easy',
      question: 'If the HCF of 65 and 117 is expressible in the form 65m - 117, then find the value of m:',
      options: ['4', '2', '1', '3'],
      answer: 1,
      explanation: 'HCF(65, 117) = 13. Given 65m - 117 = 13 => 65m = 130 => m = 2.'
    },
    {
      id: 105,
      class: 'class10',
      subject: 'Mathematics',
      stream: 'general',
      type: 'expected',
      yearBadge: 'Expected 2027 Case-Study Pattern',
      difficulty: 'Hard',
      question: 'In an AP, if S_n = 3n^2 + 5n, what is the 10th term (a_10)?',
      options: ['62', '58', '60', '64'],
      answer: 0,
      explanation: 'a_n = S_n - S_{n-1} = 6n + 2. For n = 10, a_10 = 6(10) + 2 = 62.'
    },

    // CLASS 12 SCIENCE (PHYSICS, CHEMISTRY, MATHS, BIOLOGY)
    {
      id: 201,
      class: 'class12',
      subject: 'Physics',
      stream: 'science_pcm',
      type: 'pyq',
      yearBadge: 'CBSE 2024 / ISC 2023',
      difficulty: 'Hard',
      question: 'An electric dipole of moment p is kept in an electric field E. The torque τ and potential energy U when dipole is aligned anti-parallel to the field (θ = 180°) are:',
      options: [
        'τ = 0, U = +pE (Unstable equilibrium)',
        'τ = pE, U = 0',
        'τ = 0, U = -pE (Stable equilibrium)',
        'τ = pE sin 90°, U = -pE'
      ],
      answer: 0,
      explanation: 'τ = p × E = pE sin(180°) = 0. Potential energy U = -p·E = -pE cos(180°) = +pE. Since U is maximum, it is in unstable equilibrium.'
    },
    {
      id: 202,
      class: 'class12',
      subject: 'Physics',
      stream: 'science_pcm',
      type: 'expected',
      yearBadge: 'High Yield Predicted for Upcoming Boards',
      difficulty: 'Medium',
      question: 'In Young\'s Double Slit Experiment, if the distance between the slits is halved and the distance of the screen from slits is doubled, the fringe width β becomes:',
      options: [
        'Halved',
        'Remains unchanged',
        'Quadrupled (4 times)',
        'Doubled'
      ],
      answer: 2,
      explanation: 'Fringe width β = λD/d. If D becomes 2D and d becomes d/2, β\' = λ(2D)/(d/2) = 4 (λD/d) = 4β.'
    },
    {
      id: 203,
      class: 'class12',
      subject: 'Chemistry',
      stream: 'science_pcm',
      type: 'pyq',
      yearBadge: 'CBSE 2023 All India',
      difficulty: 'Medium',
      question: 'Which of the following solutions will have the highest boiling point elevation assuming complete dissociation/association?',
      options: [
        '0.1 M Glucose',
        '0.1 M NaCl',
        '0.1 M BaCl2',
        '0.1 M Al2(SO4)3'
      ],
      answer: 3,
      explanation: 'ΔTb = i × Kb × m. Al2(SO4)3 dissociates into 2 Al³⁺ + 3 SO4²⁻, giving van\'t Hoff factor i = 5, producing the greatest colligative effect.'
    },
    {
      id: 204,
      class: 'class12',
      subject: 'Chemistry',
      stream: 'science_pcm',
      type: 'expected',
      yearBadge: 'Expected Organic Mechanism Focus',
      difficulty: 'Hard',
      question: 'When anisole reacts with concentrated HI at 373 K, the major products formed are:',
      options: [
        'Phenol + Methyl Iodide',
        'Iodobenzene + Methanol',
        'Benzene + Methyl alcohol',
        'o-Iodoanisole + p-Iodoanisole'
      ],
      answer: 0,
      explanation: 'Because the phenyl-oxygen bond has partial double bond character due to resonance, it does not break. The CH3-O bond cleaves via SN2 yielding Phenol and CH3I.'
    },
    {
      id: 205,
      class: 'class12',
      subject: 'Biology',
      stream: 'science_pcb',
      type: 'pyq',
      yearBadge: 'CBSE 2024 / NEET / Boards',
      difficulty: 'Medium',
      question: 'Which of the following codons acts as the universal initiator codon and also codes for Methionine?',
      options: ['UAA', 'AUG', 'UAG', 'UGA'],
      answer: 1,
      explanation: 'AUG functions as the start/initiator codon during polypeptide synthesis and specifically codes for Methionine in eukaryotes.'
    },
    {
      id: 206,
      class: 'class12',
      subject: 'Biology',
      stream: 'science_pcb',
      type: 'expected',
      yearBadge: 'Predicted Biotechnology Core Question',
      difficulty: 'Hard',
      question: 'In gel electrophoresis, DNA fragments separate according to their size because:',
      options: [
        'DNA has positive charge and smaller fragments move faster towards anode',
        'DNA is negatively charged and smaller fragments experience less sieving resistance through agarose matrix towards anode',
        'Larger fragments move faster towards cathode',
        'Charge density depends on nucleotide sequence'
      ],
      answer: 1,
      explanation: 'Phosphate groups grant DNA uniform negative charge. Under electric current, they migrate towards the positive anode; smaller fragments weave faster through the agarose pores.'
    },

    // CLASS 12 COMMERCE
    {
      id: 301,
      class: 'class12',
      subject: 'Accountancy',
      stream: 'commerce',
      type: 'pyq',
      yearBadge: 'CBSE 2024 Board Paper',
      difficulty: 'Medium',
      question: 'In the absence of a Partnership Deed, what is the rate of interest allowed on a partner\'s loan to the firm?',
      options: ['No interest is allowed', '6% per annum simple interest', '10% per annum', '12% per annum compound interest'],
      answer: 1,
      explanation: 'As per the Indian Partnership Act 1932 (Section 13d), in the absence of an agreement, partners are entitled to 6% p.a. interest on advances/loans made to the firm.'
    },
    {
      id: 302,
      class: 'class12',
      subject: 'Accountancy',
      stream: 'commerce',
      type: 'expected',
      yearBadge: 'Expected 2027 Cash Flow Question',
      difficulty: 'Hard',
      question: 'Which of the following transactions is classified as an "Operating Activity" for a manufacturing company in a Cash Flow Statement?',
      options: [
        'Purchase of Patents & Machinery',
        'Payment of cash to suppliers for raw materials and trade payables',
        'Proceeds from issuance of 10% Debentures',
        'Dividend paid on Equity Shares'
      ],
      answer: 1,
      explanation: 'Payments to suppliers for goods/services directly pertain to principal revenue-producing activities, hence categorized as Operating Activities under AS-3.'
    },
    {
      id: 303,
      class: 'class12',
      subject: 'Business Studies',
      stream: 'commerce',
      type: 'pyq',
      yearBadge: 'CBSE 2023 / ISC',
      difficulty: 'Medium',
      question: 'Which principle of Fayol advocates that "an employee should receive orders from one superior only"?',
      options: ['Unity of Direction', 'Unity of Command', 'Order', 'Scalar Chain'],
      answer: 1,
      explanation: 'Unity of Command avoids dual subordination and conflicts. Unity of Direction on the other hand focuses on "one head, one plan" for a group of activities having the same objective.'
    },
    {
      id: 304,
      class: 'class12',
      subject: 'Economics',
      stream: 'commerce',
      type: 'expected',
      yearBadge: 'Expected Macroeconomics Analytical MCQ',
      difficulty: 'Hard',
      question: 'If Marginal Propensity to Consume (MPC) is 0.8, what is the value of the Investment Multiplier (k)?',
      options: ['2.5', '4', '5', '8'],
      answer: 2,
      explanation: 'Multiplier k = 1 / (1 - MPC) = 1 / (1 - 0.8) = 1 / 0.2 = 5.'
    },

    // CLASS 12 HUMANITIES / ARTS
    {
      id: 401,
      class: 'class12',
      subject: 'History',
      stream: 'humanities',
      type: 'pyq',
      yearBadge: 'CBSE 2024 / State Boards',
      difficulty: 'Medium',
      question: 'The famous "Great Bath" was discovered in which of the following Harappan sites?',
      options: ['Harappa', 'Kalibangan', 'Mohenjodaro', 'Lothal'],
      answer: 2,
      explanation: 'The Great Bath, a rectangular tank in a courtyard lined with bricks and gypsum mortar, was uncovered at Mohenjodaro and likely used for ritual bathing.'
    },
    {
      id: 402,
      class: 'class12',
      subject: 'Political Science',
      stream: 'humanities',
      type: 'expected',
      yearBadge: 'Predicted 2027 International Relations Question',
      difficulty: 'Medium',
      question: 'The "Shock Therapy" in post-communist regimes of Eastern Europe and Russia was guided by:',
      options: [
        'World Bank and International Monetary Fund (IMF)',
        'European Union alone',
        'Warsaw Treaty Organization',
        'NAM Coalition'
      ],
      answer: 0,
      explanation: 'Shock Therapy was a painful transition model from a socialist authoritarian system to a democratic capitalist system influenced by the World Bank and the IMF.'
    }
  ],

  // Subjective / Written Mock Test Questions with Evaluation Rubric
  subjectiveQuestions: [
    {
      id: 'sub1',
      class: 'class10',
      subject: 'Science',
      stream: 'general',
      question: 'Explain the mechanism of transport of water and minerals in plants through xylem. What is the role of transpiration pull? (3 Marks)',
      maxMarks: 3,
      keywords: ['xylem vessels', 'tracheids', 'root pressure', 'transpiration pull', 'continuous water column', 'stomata', 'cohesion'],
      rubric: [
        { criterion: 'Mentioning xylem vessels & root absorption', marks: 1 },
        { criterion: 'Explaining evaporation of water through stomata creating suction (transpiration pull)', marks: 1 },
        { criterion: 'Formation of continuous water column & upward movement during day', marks: 1 }
      ],
      modelAnswer: 'Water and soluble minerals are absorbed by root hairs from the soil through active ion uptake creating osmotic root pressure. In leaves, water evaporates through stomatal apertures in a process called transpiration. This evaporation creates a suction pressure known as the "transpiration pull", drawing water upwards through the continuous column formed by interconnected xylem tracheids and vessels from roots to leaves during daytime.'
    },
    {
      id: 'sub2',
      class: 'class12',
      subject: 'Physics',
      stream: 'science_pcm',
      question: 'State Lenz\'s law of electromagnetic induction. Show that it is in accordance with the law of conservation of energy. (3 Marks)',
      maxMarks: 3,
      keywords: ['direction of induced current', 'opposes the cause', 'conservation of energy', 'mechanical work', 'magnetic flux', 'induced emf'],
      rubric: [
        { criterion: 'Correct formal statement of Lenz\'s law', marks: 1 },
        { criterion: 'Explanation of work done against repulsive/attractive magnetic forces', marks: 1 },
        { criterion: 'Equivalence of mechanical work into electrical/thermal energy', marks: 1 }
      ],
      modelAnswer: 'Lenz\'s law states that the polarity of induced emf and the direction of induced current in a circuit is such that it opposes the change in magnetic flux producing it (ε = -dΦ/dt). Conservation of energy: When a magnet\'s North pole is moved towards a closed coil, the induced current creates a North pole facing the magnet, repelling it. Mechanical work must be done against this opposing magnetic force. This mechanical work is converted into electrical energy and dissipated as heat, strictly satisfying energy conservation.'
    },
    {
      id: 'sub3',
      class: 'class12',
      subject: 'Chemistry',
      stream: 'science_pcm',
      question: 'Differentiate between order and molecularity of a chemical reaction with at least three key distinctions. (3 Marks)',
      maxMarks: 3,
      keywords: ['experimental', 'theoretical', 'zero or fractional', 'integer only', 'elementary reaction', 'rate law'],
      rubric: [
        { criterion: 'Point 1: Experimental vs Theoretical derivation', marks: 1 },
        { criterion: 'Point 2: Values allowed (Zero/Fractional vs Non-zero Positive Integers)', marks: 1 },
        { criterion: 'Point 3: Applicability (Complex & elementary vs Elementary only)', marks: 1 }
      ],
      modelAnswer: '1. Order is experimentally determined from the rate law expression; Molecularity is a theoretical concept based on the reaction mechanism.\n2. Order can be zero, fractional, or negative; Molecularity is always a positive whole integer (1, 2, or 3) and cannot be zero or fractional.\n3. Order applies to both elementary and complex multi-step reactions; Molecularity has physical significance only for single-step elementary reactions.'
    },
    {
      id: 'sub4',
      class: 'class12',
      subject: 'Commerce',
      stream: 'commerce',
      question: 'Explain the concept of "Working Capital" and mention two factors that influence the working capital requirements of a business enterprise. (3 Marks)',
      maxMarks: 3,
      keywords: ['current assets', 'current liabilities', 'operating cycle', 'scale of operations', 'nature of business', 'credit allowed'],
      rubric: [
        { criterion: 'Definition of Working Capital (Gross vs Net = CA - CL)', marks: 1 },
        { criterion: 'Factor 1: Nature of business / Length of Operating cycle explained', marks: 1 },
        { criterion: 'Factor 2: Scale of operations or Credit policy explained', marks: 1 }
      ],
      modelAnswer: 'Working Capital represents the excess of Current Assets over Current Liabilities (Net Working Capital = CA - CL), required to fund day-to-day business operations. Two influencing factors are:\n1. Nature of Business: A trading or service concern requires less working capital because of short inventory cycles, whereas manufacturing firms require large working capital for raw materials.\n2. Length of Operating Cycle: Businesses with longer production and collection timelines require more working capital.'
    },
    {
      id: 'sub5',
      class: 'class12',
      subject: 'Humanities',
      stream: 'humanities',
      question: 'What were the three key challenges India faced immediately after Independence in 1947? Briefly describe them. (3 Marks)',
      maxMarks: 3,
      keywords: ['national integration', 'princely states', 'democracy', 'socio-economic development', 'poverty', 'partition violence'],
      rubric: [
        { criterion: 'Challenge 1: National Unity & Integration of 565 Princely States', marks: 1 },
        { criterion: 'Challenge 2: Establishing a functioning constitutional democracy', marks: 1 },
        { criterion: 'Challenge 3: Economic development, eradicating poverty & inequality', marks: 1 }
      ],
      modelAnswer: 'India faced three colossal challenges in 1947:\n1. Unity and Integration: Accommodating immense linguistic, religious, and cultural diversity while integrating over 565 princely states after the trauma of Partition.\n2. Establishing Democracy: Developing democratic practices, universal adult franchise, and representative institutions under a fledgling constitution.\n3. Socio-Economic Development: Overcoming rampant poverty, illiteracy, and inequality through targeted economic planning and land reforms.'
    }
  ],

  // Previous Years Question Papers (PYQs)
  pyqVault: [
    {
      id: 'pyq-cbse-10-sci-2024',
      board: 'cbse',
      class: 'class10',
      subject: 'Science',
      stream: 'general',
      year: '2024',
      title: 'CBSE Class 10 Science Official Board Question Paper (Set 1, 2, 3)',
      downloadUrl: '#',
      fileSize: '3.4 MB',
      highlights: 'Contains 39 questions: 20 MCQs, Assertion-Reasoning, 6 Short Answers, 3 Case Studies with complete official CBSE marking scheme.'
    },
    {
      id: 'pyq-cbse-10-math-2024',
      board: 'cbse',
      class: 'class10',
      subject: 'Mathematics',
      stream: 'general',
      year: '2024',
      title: 'CBSE Class 10 Standard & Basic Mathematics Board Paper',
      downloadUrl: '#',
      fileSize: '2.8 MB',
      highlights: 'Standard vs Basic solved solutions, stepwise marking breakdown for coordinate geometry and surface areas.'
    },
    {
      id: 'pyq-cbse-12-phy-2024',
      board: 'cbse',
      class: 'class12',
      subject: 'Physics',
      stream: 'science_pcm',
      year: '2024',
      title: 'CBSE Class 12 Physics Theory Board Paper (55/1/1)',
      downloadUrl: '#',
      fileSize: '4.1 MB',
      highlights: 'In-depth derivation answers for Gauss Theorem, AC circuits, and Ray Optics wave diagrams with official answer keys.'
    },
    {
      id: 'pyq-cbse-12-chem-2024',
      board: 'cbse',
      class: 'class12',
      subject: 'Chemistry',
      stream: 'science_pcm',
      year: '2024',
      title: 'CBSE Class 12 Chemistry Theory Board Paper',
      downloadUrl: '#',
      fileSize: '3.9 MB',
      highlights: 'Electrochemical cell calculations, Aldehydes & Ketones conversions, named reactions checklist.'
    },
    {
      id: 'pyq-cbse-12-acc-2024',
      board: 'cbse',
      class: 'class12',
      subject: 'Accountancy',
      stream: 'commerce',
      year: '2024',
      title: 'CBSE Class 12 Accountancy Board Paper & Balance Sheet Working',
      downloadUrl: '#',
      fileSize: '3.1 MB',
      highlights: 'Pro-rata allotment numerical solutions, Cash Flow operating adjustments, partnership revaluation entries.'
    },
    {
      id: 'pyq-cbse-12-pol-2024',
      board: 'cbse',
      class: 'class12',
      subject: 'Political Science',
      stream: 'humanities',
      year: '2024',
      title: 'CBSE Class 12 Political Science Paper & Model Answers',
      downloadUrl: '#',
      fileSize: '2.9 MB',
      highlights: 'Map-based questions, cartoon analysis solutions, long essay structuring for contemporary world politics.'
    },
    {
      id: 'pyq-icse-10-sci-2023',
      board: 'icse',
      class: 'class10',
      subject: 'Science',
      stream: 'general',
      year: '2023',
      title: 'ICSE Class 10 Physics & Chemistry Solved Specimen Paper',
      downloadUrl: '#',
      fileSize: '3.5 MB',
      highlights: 'Strict CISCE format numericals, calorimetry problems, organic chemistry IUPAC nomenclature.'
    },
    {
      id: 'pyq-state-12-phy-2023',
      board: 'mh',
      class: 'class12',
      subject: 'Physics',
      stream: 'science_pcm',
      year: '2023',
      title: 'Maharashtra HSC Board Class 12 Physics Question Paper',
      downloadUrl: '#',
      fileSize: '3.0 MB',
      highlights: 'Rotational dynamics, thermodynamics and semiconductor diagrams with state board marking rubrics.'
    }
  ],

  // Curated High Yield YouTube Video Lectures
  videos: [
    {
      id: 'v1',
      title: 'Class 10 Science Complete Chemical Reactions & Equations (One Shot Revision)',
      channel: 'Next Toppers / Board Mentors',
      class: 'class10',
      subject: 'Science',
      stream: 'general',
      duration: '1 hr 45 min',
      embedId: '8h7Mv0w4o9Y', // Sample educational ID placeholder
      summary: 'Covers balancing equations, exothermic/endothermic types, displacement & redox with 10 board exam PYQs.'
    },
    {
      id: 'v2',
      title: 'Class 10 Maths: Complete Trigonometry in 90 Minutes with PYQs',
      channel: 'Exam Champions',
      class: 'class10',
      subject: 'Mathematics',
      stream: 'general',
      duration: '1 hr 30 min',
      embedId: 'E_nC3v7jR1g',
      summary: 'Trig ratios table mnemonic, proof identities (sin²θ+cos²θ=1), heights and distances board traps.'
    },
    {
      id: 'v3',
      title: 'Class 12 Physics: Electrostatics & Gauss Law in One Shot (Top Derivations)',
      channel: 'Physics Masterclass',
      class: 'class12',
      subject: 'Physics',
      stream: 'science_pcm',
      duration: '2 hr 15 min',
      embedId: 'm1U6r4K6F1U',
      summary: 'All 7 mandatory derivations of Electrostatics for CBSE/State/ISC boards with step marks tips.'
    },
    {
      id: 'v4',
      title: 'Class 12 Chemistry: Organic Name Reactions & Conversions Roadmap',
      channel: 'Board Chemistry Toppers',
      class: 'class12',
      subject: 'Chemistry',
      stream: 'science_pcm',
      duration: '2 hr 05 min',
      embedId: 'dQw4w9WgXcQ',
      summary: 'Aldol, Cannizzaro, Reimer-Tiemann, Kolbe, Rosenmund & Sandmeyer reactions mapped on a single revision sheet.'
    },
    {
      id: 'v5',
      title: 'Class 12 Accountancy: Cash Flow Statement Full Chapter Revision & Formats',
      channel: 'Commerce Adda',
      class: 'class12',
      subject: 'Accountancy',
      stream: 'commerce',
      duration: '1 hr 55 min',
      embedId: 'k1p4R5aB9v0',
      summary: 'Step-by-step indirect method operating profit calculation, provision for tax, and accumulated depreciation account.'
    },
    {
      id: 'v6',
      title: 'Class 12 History: Complete Nationalist Movement & Gandhi Era Fast Track',
      channel: 'Humanities Hub',
      class: 'class12',
      subject: 'History',
      stream: 'humanities',
      duration: '1 hr 40 min',
      embedId: 'p2w9F4aB7v1',
      summary: 'Non-cooperation, Civil Disobedience, Quit India, Round Table Conferences & Salt March board source questions.'
    }
  ],

  // Motivational Quotes & Panic Relief
  quotes: [
    { text: "Your board exam score is a measure of your preparation for this specific test, not a measure of your worth or your future destiny.", author: "Board Mentor" },
    { text: "One page at a time, one concept at a time. The mountain is climbed in small, steady steps.", author: "Mindset Coach" },
    { text: "When panic kicks in, your brain is just asking for oxygen. Take 3 deep breaths and remember: you know more than you think.", author: "Exam Psychologist" },
    { text: "Doubt kills more dreams than failure ever will. Believe in the hours you have put in.", author: "Topper Mantra" },
    { text: "Rest is not a waste of time; sleep is when your hippocampus consolidates what you revised into permanent memory.", author: "Cognitive Science" }
  ]
};

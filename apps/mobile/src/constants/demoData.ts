export const demoStudentData = {
  fullName: 'Arjun Kumar',
  role: 'ST Student',
  mobile: '9999999999',
  state: 'Tamil Nadu',
  district: 'Coimbatore',
  profileCompletion: 92,
  readinessScore: 88,
  bankVerified: true,
  dbtActive: true,
  aadhaarMasked: 'XXXX XXXX 4821',
  bankAccountMasked: '****4521',
  bankName: 'State Bank of India',
  academic: {
    institution: 'Government Arts and Science College, Coimbatore',
    course: 'B.Sc. Computer Science',
    year: '3rd Year (Final)',
    cgpa: 8.4,
  },
  activeApplication: {
    id: 'app-post-matric-1',
    scheme: 'Post-Matric Scholarship for ST Students',
    shortName: 'Post-Matric ST',
    status: 'DEPARTMENT_VERIFICATION',
    stageName: 'Department Verification',
    lastUpdate: 'Application scrutinized and forwarded to District Welfare Officer.',
    daysAgo: '2 days ago',
  },
  nextAction: {
    title: 'Income Certificate Renewal',
    desc: 'Income certificate expires on 15 Nov 2024. Submit renewal application to prevent DBT delay.',
    daysRemaining: 48,
  },
  opportunity: {
    title: 'Top Class Higher Education Scheme',
    desc: 'Your college is recognized under Section 2(f). Check if your department qualifies for enhanced funding.',
  },
  recentPayment: {
    amount: 42000,
    scheme: 'Post-Matric Scholarship',
    cycle: 'Academic Year 2023-2024',
    date: '15 Mar 2024',
    status: 'PAID',
    ref: 'JSS***4124',
  },
  documents: [
    { id: '1', name: 'ST Community Certificate', status: 'VERIFIED', source: 'State e-District Demo', reusable: true },
    { id: '2', name: 'Annual Income Certificate (₹1.8L)', status: 'VERIFIED', source: 'Revenue Dept Demo', reusable: true },
    { id: '3', name: 'Semester Marksheet (82.5%)', status: 'VERIFIED', source: 'APAAR Demo', reusable: true },
    { id: '4', name: 'Aadhaar Identity Card', status: 'VERIFIED', source: 'UIDAI Demo', reusable: true },
    { id: '5', name: 'Bank Account Mandate (SBI)', status: 'VERIFIED', source: 'PFMS / DBT Demo', reusable: true },
    { id: '6', name: 'Nativity / Domicile Certificate', status: 'PENDING', source: 'Demo Integration', reusable: false },
  ],
  schemes: [
    {
      id: 'pre_matric',
      name: 'Pre-Matric Scholarship for ST Students',
      short: 'Pre-Matric ST',
      desc: 'Financial support for ST students enrolled in Classes 9 and 10.',
      amount: '₹3,500 - ₹7,000 / yr',
      maxAmount: '₹7,000 / annum',
      status: 'NOT_APPLICABLE',
      statusLabel: 'Completed / College Student',
      deadline: '31 October 2026',
      eligibility: [
        'Must belong to a notified Scheduled Tribe (ST) community.',
        'Enrolled as a full-time student in Class IX or X in a recognized government/aided school.',
        'Annual parental/family income must not exceed ₹2,50,000 per annum.',
        'Aadhaar number linked with an active bank account for DBT payment.'
      ],
      benefits: [
        'Day Scholar Grant: ₹3,500 per academic year.',
        'Hosteller Allowance: ₹7,000 per academic year.',
        'Additional book and equipment assistance grant.'
      ]
    },
    {
      id: 'post_matric',
      name: 'Post-Matric Scholarship for ST Students',
      short: 'Post-Matric ST',
      desc: 'Central & State assistance for 11th, 12th, ITI, Degree, and Professional courses.',
      amount: 'Up to ₹45,000 / yr',
      maxAmount: 'Up to ₹45,000 / annum',
      status: 'ACTIVE_APPLICATION',
      statusLabel: 'Under Verification',
      deadline: '15 November 2026',
      eligibility: [
        'Must belong to a notified Scheduled Tribe (ST) community.',
        'Pursuing post-matriculation or post-secondary courses (Class XI, XII, ITI, Diploma, Undergraduate, or Postgraduate).',
        'Annual family income ceiling of ₹2,50,000 from all sources.',
        'Directly enrolled in an accredited institution recognized by UGC/AICTE/State Board.'
      ],
      benefits: [
        'Complete compulsory non-refundable fees reimbursed by DBT.',
        'Monthly maintenance allowance ranging from ₹2,300 to ₹12,000/yr.',
        'Study tour allowances, thesis typing/printing charges for postgraduates.'
      ]
    },
    {
      id: 'top_class',
      name: 'National Scholarship for Higher Education (Top Class)',
      short: 'Top Class Education',
      desc: 'Full fee coverage and stipends in notified premier national institutes.',
      amount: 'Up to ₹2,00,000 / yr',
      maxAmount: 'Up to ₹2,00,000 / annum',
      status: 'LIKELY_ELIGIBLE',
      statusLabel: 'Likely Eligible',
      deadline: '30 November 2026',
      eligibility: [
        'ST student admitted to notified Top Class institutes (IITs, NITs, IIMs, AIIMS, NLUs, etc.).',
        'Total annual family income must not exceed ₹6,00,000 per annum.',
        'Must secure admission based on national entrance exams (JEE, NEET, CAT, CLAT).'
      ],
      benefits: [
        'Full tuition fee and non-refundable charges paid directly to the institute.',
        'Living expenses allowance of ₹3,000 per month (₹36,000 / annum).',
        'Books & stationery grant of ₹5,000 per annum.',
        'One-time computer/laptop grant up to ₹45,000.'
      ]
    },
    {
      id: 'nfst',
      name: 'National Fellowship for ST Students (NFST)',
      short: 'NFST Fellowship',
      desc: 'M.Phil and Ph.D. full-time fellowship for ST scholars.',
      amount: '₹28,000 - ₹35,000 / mo',
      maxAmount: 'Up to ₹35,000 / month + HRA',
      status: 'NEEDS_REQUIREMENTS',
      statusLabel: 'For Research Scholars',
      deadline: '15 December 2026',
      eligibility: [
        'ST candidates registered in regular, full-time M.Phil or Ph.D. degree courses.',
        'Qualified UGC-NET or CSIR-NET examinations.',
        'Must not be holding any other fellowship or salary.'
      ],
      benefits: [
        'Junior Research Fellowship (JRF): ₹31,000 per month for initial 2 years.',
        'Senior Research Fellowship (SRF): ₹35,000 per month for remaining tenure.',
        'Contingency grant of ₹10,000 to ₹25,000 per year + HRA.'
      ]
    },
    {
      id: 'nos',
      name: 'National Overseas Scholarship (NOS)',
      short: 'National Overseas',
      desc: 'Financial aid for overseas Masters and Ph.D. studies in top foreign universities.',
      amount: 'Up to ₹20,00,000',
      maxAmount: 'Full Tuition + £9,900 / $15,400 Annual Allowance',
      status: 'NOT_ELIGIBLE',
      statusLabel: 'Overseas Studies Only',
      deadline: '31 January 2027',
      eligibility: [
        'ST student admitted to top 500 QS/Times Higher Education ranked foreign universities.',
        'Minimum 55% marks or equivalent grade in bachelor / master degree.',
        'Annual family income must not exceed ₹8,00,000 per annum.'
      ],
      benefits: [
        '100% foreign university tuition fee coverage.',
        'Annual living maintenance allowance (US$ 15,400 / £ 9,900).',
        'Economy class return airfare, visa fee, medical insurance, and book allowance.'
      ]
    },
  ],
  family: [
    { id: 'f1', name: 'Priya Kumar', relation: 'Sister', scheme: 'Pre-Matric ST', status: 'Disbursed', amount: 3500 },
    { id: 'f2', name: 'Ravi Kumar', relation: 'Brother', scheme: 'Pre-Matric Candidate', status: 'Potential Gap', amount: 0 },
  ],
};

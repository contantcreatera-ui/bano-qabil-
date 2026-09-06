import { FAQItem, VerifiedStatistic } from '../types';

export const VERIFIED_STATISTICS: VerifiedStatistic[] = [
  {
    id: 'students-trained',
    label: 'Youth Empowered in Sindh',
    value: '25,000+',
    verifiedSource: 'Official Alkhidmat Foundation Sindh & Bano Qabil Hyderabad Reports',
    detail: 'Over 25,000 aspiring young men and women registered and trained across modern digital tracks.'
  },
  {
    id: 'course-tracks',
    label: 'Official IT Tracks in Hyderabad',
    value: '8 Tracks',
    verifiedSource: 'Official Bano Qabil Hyderabad Curriculum',
    detail: 'Industry-standard courses in Web, Flutter, AI/Python, SEO, Graphics, E-Commerce, Cyber & Freelancing.'
  },
  {
    id: 'training-duration',
    label: 'Curriculum Duration',
    value: '3 Months',
    verifiedSource: 'Official Bano Qabil Course Guidelines',
    detail: 'Intensive hands-on computer lab training focusing on real-world practical skills and projects.'
  },
  {
    id: 'tuition-fee',
    label: 'Tuition Fee For Students',
    value: '100% Free',
    verifiedSource: 'Alkhidmat Foundation Youth Empowerment Mandate',
    detail: 'Fully funded scholarship initiative by Alkhidmat Foundation for deserving youth of Hyderabad & Sindh.'
  }
];

export const OFFICIAL_CONTACT_INFO = {
  generalEmail: 'hyderabad@banoqabil.pk',
  centralEmail: 'info@banoqabil.org',
  generalHelpline: '+92 32 8888 8515',
  hyderabadChapter: {
    title: 'Bano Qabil — Hyderabad Chapter Regional Head Office',
    address: 'Alkhidmat Markaz, Autobahn Road, Latifabad Unit 7, Hyderabad, Sindh',
    phone: '022-3811194 / 022-3812195',
    whatsapp: '+92 317 8226242',
    email: 'hyderabad@banoqabil.pk',
    hours: 'Monday – Saturday: 9:00 AM – 6:00 PM',
    campuses: [
      {
        name: 'Hyderabad Main Center (Latifabad Unit 7)',
        address: 'Alkhidmat Complex, Main Autobahn Road, Latifabad Unit 7, Hyderabad'
      },
      {
        name: 'Hyderabad Qasimabad Campus',
        address: 'Alkhidmat Education Center, Naseem Nagar Chowk / Citizen Colony, Qasimabad'
      },
      {
        name: 'Hyderabad City Center (Station Road)',
        address: 'Near Tilak Incline, Station Road, Hyderabad City'
      },
      {
        name: 'Hyderabad Kohsar Center (Unit 2)',
        address: 'Daman-e-Kohsar, Unit 2, Latifabad, Hyderabad'
      }
    ]
  },
  sindhSecretariat: {
    address: 'Alkhidmat Sindh Secretariat, 501 Quaideen Colony, Karachi, Sindh',
    phone: '021-111-503-504 (Ext 194)',
    email: 'sindh@alkhidmat.org'
  }
};

export const LEADERSHIP_INFO = {
  name: 'Hafiz Naeem ur Rahman',
  title: 'Central Ameer of Jamaat-e-Islami Pakistan & Patron-in-Chief of Bano Qabil',
  profession: 'Professional Engineer & Socio-Political Leader',
  roleDescription: 'Spearheaded the launch of Bano Qabil in July 2022 under the Alkhidmat Foundation umbrella, envisioned to combat youth unemployment by providing high-quality, completely free IT education and vocational guidance across Pakistan, with dedicated regional chapters including Hyderabad, Sindh.'
};

export const VERIFIED_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'What is Bano Qabil Hyderabad Chapter?',
    answer: 'Bano Qabil Hyderabad Chapter is the dedicated youth empowerment and IT skill development program under Alkhidmat Foundation Sindh. It delivers 100% free, certified training across 8 in-demand technology tracks to prepare youth in Hyderabad, Latifabad, Qasimabad, and neighboring areas for rewarding tech careers and global freelancing.'
  },
  {
    id: 'faq-2',
    category: 'Admissions',
    question: 'Are Bano Qabil Hyderabad courses completely free of tuition fee?',
    answer: 'Yes. All 8 certified courses are 100% free of any tuition charges. Bano Qabil is funded by Alkhidmat Foundation and community benefactors as a public welfare initiative.'
  },
  {
    id: 'faq-3',
    category: 'Admissions',
    question: 'What is the standard selection and admission process?',
    answer: 'The process includes: 1) Online registration through the official Hyderabad Chapter portal, 2) Aptitude test / screening at designated Hyderabad assessment centers, 3) Campus & batch allocation, 4) 3 months of hands-on physical lab training, and 5) Final capstone evaluation and certification.'
  },
  {
    id: 'faq-4',
    category: 'Courses',
    question: 'Are the training classes conducted in-person or online?',
    answer: 'Bano Qabil courses are held exclusively in physical, air-conditioned computer laboratories in Hyderabad with high-speed internet, dedicated computers, and backup power to ensure comprehensive practical learning.'
  },
  {
    id: 'faq-5',
    category: 'Eligibility',
    question: 'Are there separate sessions for male and female students?',
    answer: 'Yes. Bano Qabil maintains dedicated, separate class timings and lab batches for male and female students across all Hyderabad training centers to guarantee a comfortable and safe learning environment.'
  },
  {
    id: 'faq-6',
    category: 'Eligibility',
    question: 'Who is eligible to apply for Bano Qabil Hyderabad programs?',
    answer: 'Residents of Hyderabad and interior Sindh holding a valid Pakistani CNIC or B-Form, who have passed Matriculation, Intermediate, or are currently enrolled in college/university are eligible to apply. Specific courses like AI / Python or Cybersecurity recommend intermediate pre-engineering or basic computer logic.'
  },
  {
    id: 'faq-7',
    category: 'Campuses',
    question: 'Where are the Bano Qabil training centers located in Hyderabad?',
    answer: 'Training centers are situated at accessible hubs in Hyderabad: Latifabad Unit 7 (Autobahn Road), Qasimabad (Naseem Nagar / Citizen Colony), and Hyderabad City (Station Road / Tilak Incline). Applicants choose their preferred center during admission.'
  },
  {
    id: 'faq-8',
    category: 'Curriculum',
    question: 'What courses are offered by Bano Qabil in Hyderabad?',
    answer: 'Bano Qabil Hyderabad offers 8 official real tracks: Web Development, Mobile App Development (Flutter), Artificial Intelligence / Python, Digital Marketing & SEO, Graphic Designing, Amazon Virtual Assistant / E-Commerce, Cybersecurity, and Freelancing / IT Essentials.'
  }
];

export const ADMISSION_STEPS = [
  {
    step: '01',
    title: 'Online Application',
    description: 'Submit your personal details, education level, and preferred course and Hyderabad campus via the official admission portal.'
  },
  {
    step: '02',
    title: 'Aptitude Test / Screening',
    description: 'Attend the Hyderabad regional aptitude assessment to evaluate logical reasoning, basic computer literacy, and course fit.'
  },
  {
    step: '03',
    title: 'Campus & Batch Allotment',
    description: 'Successful candidates receive admission slips and lab slot allotments (with separate shifts for male and female students).'
  },
  {
    step: '04',
    title: '3-Month Hands-on Labs',
    description: 'Engage in intensive hands-on lab training under certified industry mentors with live code reviews and practical assignments.'
  },
  {
    step: '05',
    title: 'Certification & Career Support',
    description: 'Present your capstone project, receive verified certification, and gain access to the Bano Qabil job placement and freelancing network.'
  }
];

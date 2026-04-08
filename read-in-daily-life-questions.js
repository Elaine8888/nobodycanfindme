window.dailyLifePassages = [

  // ===== Set 1（你原来的，保留）=====
  {
    id: 1,
    testDate: "20260121",
    type: "daily-life",
    title: "Community Notice",
    heading: "Join the Mechanicsburg Clean-Up Day!",
    passage: `Date: October 5
Time: 9:00 A.M.–1:00 P.M.

Meeting Point: Town Hall Plaza.

Volunteers of all ages are welcome. Help us keep our city beautiful by picking up litter and planting flowers. Refreshments will be provided.

Register at www.mechanicsburg.org/cleanup.

Call 555-0190 for inquiries only.`,
    questions: [
      {
        q: "What is the main purpose of the poster?",
        options: [
          "To announce the reopening of Town Hall Plaza",
          "To recruit volunteers for a community event in Mechanicsburg",
          "To promote a gardening workshop in Mechanicsburg",
          "To advertise an opportunity for paid employment with a cleaning service"
        ],
        answer: 1,
        explanation:
          "题干问主要目的。文中出现 Join…Clean-Up Day 和 Volunteers…welcome，核心是号召大家参与活动，即招募志愿者，因此选 B。"
      },
      {
        q: "According to the poster, what will be provided?",
        options: [
          "Gardening tools",
          "Cleaning supplies",
          "Food and drinks",
          "Trash bags"
        ],
        answer: 2,
        explanation:
          "原文 Refreshments will be provided，其中 refreshments 指餐饮，因此选 C。"
      }
    ]
  },

  // ===== Set 2 =====
  {
    id: 2,
    testDate: "20260121",
    title: "Library Notice",
    heading: "Library Schedule Update",
    passage: `The city library will operate on reduced hours next week.

Monday–Friday: 10 A.M.–4 P.M.
Saturday: Closed

The change is due to building maintenance. Regular hours will resume the following week.`,
    questions: [
      {
        q: "Why will the library operate on reduced hours?",
        options: [
          "Staff shortage",
          "Public holidays",
          "Building maintenance",
          "Low visitor numbers"
        ],
        answer: 2,
        explanation:
          "原文直接说明 The change is due to building maintenance，因此选 C。"
      },
      {
        q: "When will normal hours return?",
        options: [
          "Next Monday",
          "After next week",
          "In two weeks",
          "At the end of the month"
        ],
        answer: 1,
        explanation:
          "原文 Regular hours will resume the following week，指的是下周之后恢复，因此选 B。"
      }
    ]
  },

  // ===== Set 3 =====
  {
    id: 3,
    testDate: "20260121",
    title: "Course Email",
    heading: "Assignment Reminder",
    passage: `Dear Students,

This is a reminder that your final project is due this Friday at 5 P.M. Late submissions will not be accepted unless prior approval has been granted.

Please upload your work through the course website.

Best,
Professor Lee`,
    questions: [
      {
        q: "What is the purpose of the email?",
        options: [
          "To cancel an assignment",
          "To remind students about a deadline",
          "To provide feedback",
          "To announce a new project"
        ],
        answer: 1,
        explanation:
          "开头 This is a reminder…，明确是提醒截止日期，因此选 B。"
      },
      {
        q: "How should students submit their work?",
        options: [
          "By email",
          "In person",
          "Through the course website",
          "By mail"
        ],
        answer: 2,
        explanation:
          "原文 Please upload your work through the course website，因此选 C。"
      },
      {
        q: "What happens if students submit late?",
        options: [
          "They lose points",
          "They must resubmit",
          "They need permission",
          "They get extra time"
        ],
        answer: 2,
        explanation:
          "原文 Late submissions…unless prior approval，因此需要提前批准，即选 C。"
      }
    ]
  },

  // ===== Set 4 =====
  {
    id: 4,
    testDate: "20260121",
    title: "Gym Notice",
    heading: "Temporary Closure",
    passage: `The fitness center will be closed this weekend for equipment upgrades.

Members are encouraged to use partner facilities nearby.

We apologize for any inconvenience.`,
    questions: [
      {
        q: "Why will the gym be closed?",
        options: [
          "Cleaning",
          "Renovation",
          "Equipment upgrades",
          "Staff training"
        ],
        answer: 2,
        explanation:
          "原文 for equipment upgrades，因此选 C。"
      },
      {
        q: "What can members do during the closure?",
        options: [
          "Cancel membership",
          "Use other facilities",
          "Get refunds",
          "Attend online classes"
        ],
        answer: 1,
        explanation:
          "原文 use partner facilities nearby，因此选 B。"
      }
    ]
  },

  // ===== Set 5 =====
  {
    id: 5,
    testDate: "20260121",
    title: "Restaurant Ad",
    heading: "New Menu Launch",
    passage: `We are excited to introduce our new seasonal menu featuring fresh, locally sourced ingredients.

Visit us this weekend and enjoy a 10% discount on all dishes.`,
    questions: [
      {
        q: "What is being announced?",
        options: [
          "A price increase",
          "A new menu",
          "A new location",
          "A cooking class"
        ],
        answer: 1,
        explanation:
          "introduce our new seasonal menu，明确是新菜单，因此选 B。"
      },
      {
        q: "What benefit is offered?",
        options: [
          "Free drinks",
          "Discount",
          "Free dessert",
          "Membership points"
        ],
        answer: 1,
        explanation:
          "enjoy a 10% discount，因此选 B。"
      }
    ]
  },

  // ===== Set 6 =====
  {
    id: 6,
    testDate: "20260121",
    title: "Campus Notice",
    heading: "Parking Update",
    passage: `Due to construction, parking Lot B will be unavailable starting next Monday.

Students should use Lot C instead.

Thank you for your cooperation.`,
    questions: [
      {
        q: "Why is Lot B unavailable?",
        options: [
          "Cleaning",
          "Event",
          "Construction",
          "Maintenance"
        ],
        answer: 2,
        explanation:
          "Due to construction，因此选 C。"
      },
      {
        q: "Where should students park?",
        options: [
          "Lot A",
          "Lot B",
          "Lot C",
          "Street parking"
        ],
        answer: 2,
        explanation:
          "Students should use Lot C，因此选 C。"
      }
    ]
  },
// ===== 新增 =====
{
  id: 7,
  testDate: "20260121",
  title: "Read a Webpage",
  heading: "FitLife Gym Membership",
  passage: `Website: https://www.fitlifegym.com

Monthly plan: $30, equipment access only  
Quarterly plan: $80, includes group classes and swimming pool privileges  
Annual plan: $300, includes personal training discounts plus guest passes  

New member offer: One-week free trial, with a commitment to a minimum three-month membership afterward`,
  questions: [
    {
      q: "What benefits does a quarterly member have that a monthly member lacks?",
      options: [
        "Equipment access and guest passes",
        "Personal training discounts only",
        "Group classes and swimming privileges",
        "Free trial and minimum commitment"
      ],
      answer: 2,
      explanation: "quarterly plan includes group classes and swimming pool privileges，而monthly只有equipment access，因此选C。"
    },
    {
      q: "What is required of new members after the one-week free trial ends?",
      options: [
        "Nothing",
        "A one-month membership",
        "A three-month membership",
        "An annual membership"
      ],
      answer: 2,
      explanation: "原文 a commitment to a minimum three-month membership afterward，因此选C。"
    }
  ]
},
{
  id: 8,
  testDate: "20260121",
  title: "Read an E-mail",
  heading: "",
  passage: `Hi Team,

Blundin University hosted a career fair yesterday. I was able to speak to several promising candidates for summer internships with our company. See their attached resumes. I’d like everyone to give me their feedback no later than Friday.

Thanks,
Ryan`,
  questions: [
    {
      q: "What did Ryan do yesterday?",
      options: [
        "He took a class at a university.",
        "He attended a job fair.",
        "He was interviewed by a manager.",
        "He hired some summer interns."
      ],
      answer: 1,
      explanation: "原文 hosted a career fair yesterday，Ryan参加了招聘会，因此选B。"
    },
    {
      q: "What does Ryan ask his team to do?",
      options: [
        "Share their opinions of some job candidates",
        "Review a summer internship program",
        "Update their résumés by Friday",
        "Introduce themselves to new interns"
      ],
      answer: 0,
      explanation: "原文 give me their feedback，说明让团队提供对候选人的意见，因此选A。"
    }
  ]
}
];

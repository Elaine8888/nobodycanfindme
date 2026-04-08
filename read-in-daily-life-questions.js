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
    title: "Apartment Notice",
    heading: "Water Supply Interruption",
    passage: `Please be advised that water service will be temporarily suspended on Tuesday from 9 A.M. to 2 P.M. due to maintenance work. Residents are encouraged to store water in advance.`,
    questions: [
      {
        q: "Why will the water supply be interrupted?",
        options: [
          "Construction",
          "Maintenance work",
          "Water shortage",
          "Cleaning"
        ],
        answer: 1,
        explanation: "原文 due to maintenance work，因此选 B。"
      },
      {
        q: "What are residents advised to do?",
        options: [
          "Leave the building",
          "Buy bottled water",
          "Store water beforehand",
          "Call the office"
        ],
        answer: 2,
        explanation: "原文 store water in advance，因此选 C。"
      }
    ]
  },

  {
    id: 8,
    testDate: "20260121",
    title: "University Email",
    heading: "Career Fair Reminder",
    passage: `Dear Students,

Blundin University will host its annual career fair this Thursday from 10 A.M. to 3 P.M. in the main hall. Students are encouraged to bring copies of their resumes and dress professionally.`,
    questions: [
      {
        q: "What is the purpose of the email?",
        options: [
          "To cancel an event",
          "To remind students of a career fair",
          "To announce a holiday",
          "To promote a course"
        ],
        answer: 1,
        explanation: "提醒career fair，因此选 B。"
      },
      {
        q: "What should students bring?",
        options: [
          "Books",
          "Resumes",
          "Laptops",
          "ID cards"
        ],
        answer: 1,
        explanation: "bring copies of their resumes，因此选 B。"
      }
    ]
  },

  {
    id: 9,
    testDate: "20260121",
    title: "Store Notice",
    heading: "Holiday Hours",
    passage: `Our store will operate on special hours during the holiday season. We will open from 11 A.M. to 6 P.M. on weekdays and remain closed on Sundays.`,
    questions: [
      {
        q: "What is the notice about?",
        options: [
          "New products",
          "Holiday hours",
          "Store relocation",
          "Staff hiring"
        ],
        answer: 1,
        explanation: "holiday hours，因此选 B。"
      },
      {
        q: "When is the store closed?",
        options: [
          "Weekdays",
          "Saturdays",
          "Sundays",
          "Holidays"
        ],
        answer: 2,
        explanation: "closed on Sundays，因此选 C。"
      }
    ]
  },

  {
    id: 10,
    testDate: "20260121",
    title: "Flight Announcement",
    heading: "Gate Change",
    passage: `Attention passengers: Flight AC203 to Toronto will now depart from Gate 18 instead of Gate 12. Boarding will begin in 20 minutes.`,
    questions: [
      {
        q: "What has changed?",
        options: [
          "Flight time",
          "Destination",
          "Gate number",
          "Airline"
        ],
        answer: 2,
        explanation: "gate change，因此选 C。"
      },
      {
        q: "When will boarding begin?",
        options: [
          "Immediately",
          "In 20 minutes",
          "In one hour",
          "Tomorrow"
        ],
        answer: 1,
        explanation: "in 20 minutes，因此选 B。"
      }
    ]
  },

  {
    id: 11,
    testDate: "20260121",
    title: "School Notice",
    heading: "Exam Schedule",
    passage: `Final exams will take place next week. Students should check the online system for their specific exam times and locations.`,
    questions: [
      {
        q: "What is being announced?",
        options: [
          "Class cancellation",
          "Exam schedule",
          "New course",
          "School trip"
        ],
        answer: 1,
        explanation: "exam schedule，因此选 B。"
      },
      {
        q: "Where can students find details?",
        options: [
          "Notice board",
          "Teacher",
          "Online system",
          "Email"
        ],
        answer: 2,
        explanation: "online system，因此选 C。"
      }
    ]
  },

  {
    id: 12,
    testDate: "20260121",
    title: "Event Poster",
    heading: "Music Festival",
    passage: `Join us this Saturday for a live music festival in Central Park. Multiple bands will perform, and food trucks will be available.`,
    questions: [
      {
        q: "What type of event is this?",
        options: [
          "Sports event",
          "Music festival",
          "Food fair",
          "Conference"
        ],
        answer: 1,
        explanation: "music festival，因此选 B。"
      },
      {
        q: "What can attendees expect?",
        options: [
          "Workshops",
          "Lectures",
          "Live music and food",
          "Games"
        ],
        answer: 2,
        explanation: "bands + food trucks，因此选 C。"
      }
    ]
  },

  {
    id: 13,
    testDate: "20260121",
    title: "Office Email",
    heading: "Meeting Reminder",
    passage: `Dear Team,

This is a reminder that our weekly meeting will take place tomorrow at 10 A.M. Please prepare your updates in advance.`,
    questions: [
      {
        q: "What is the purpose of the email?",
        options: [
          "To cancel a meeting",
          "To remind about a meeting",
          "To schedule a meeting",
          "To announce a holiday"
        ],
        answer: 1,
        explanation: "reminder，因此选 B。"
      },
      {
        q: "What should team members do?",
        options: [
          "Bring food",
          "Prepare updates",
          "Arrive early",
          "Cancel plans"
        ],
        answer: 1,
        explanation: "prepare updates，因此选 B。"
      }
    ]
  }
];

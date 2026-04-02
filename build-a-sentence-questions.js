window.buildSentenceQuestions = [
  // ===== Set 1 =====
  {
    id: 1,
    set: 1,
    speakerA: "I saw a job posting for a part-time position at the student bookstore.",
    segments: [
      { type: "slot" },
      { type: "slot" },
      { type: "slot" },
      { type: "slot" },
      { type: "slot" },
      { type: "text", value: "yet?" }
    ],
    bank: ["for", "you", "have", "it", "applied"],
    answer: ["have", "you", "applied", "for", "it"],
    translation: "你申请了吗？"
  },
  {
    id: 2,
    set: 1,
    speakerA: "I’m thinking of applying for a scholarship.",
    segments: [
      { type: "slot" },
      { type: "slot" },
      { type: "slot" },
      { type: "slot" },
      { type: "slot" },
      { type: "slot" },
      { type: "text", value: "?" }
    ],
    bank: ["application", "started", "you", "have", "the", "process"],
    answer: ["have", "you", "started", "the", "application", "process"],
    translation: "你已经开始申请流程了吗？"
  },
  {
    id: 3,
    set: 1,
    speakerA: "Hannah mentioned the upcoming research conference in her email.",
    segments: [
      { type: "slot" },
      { type: "slot" },
      { type: "text", value: "know" },
      { type: "slot" },
      { type: "slot" },
      { type: "slot" },
      { type: "slot" },
      { type: "text", value: "?" }
    ],
    bank: ["the schedule", "do", "if", "she", "you", "included"],
    answer: ["do", "you", "if", "she", "included", "the schedule"],
    translation: "你知道她有没有附上会议日程吗？"
  },
  {
    id: 4,
    set: 1,
    speakerA: "I have a meeting with my advisor this afternoon.",
    segments: [
      { type: "slot" },
      { type: "slot" },
      { type: "slot" },
      { type: "slot" },
      { type: "slot" },
      { type: "text", value: "?" }
    ],
    bank: ["what", "discussing", "be", "will", "you"],
    answer: ["what", "will", "you", "be", "discussing"],
    translation: "你们会讨论什么？"
  },
  {
    id: 5,
    set: 1,
    speakerA: "I need to finish my essay by Friday.",
    segments: [
      { type: "slot" },
      { type: "slot" },
      { type: "slot" },
      { type: "slot" },
      { type: "slot" },
      { type: "slot" },
      { type: "text", value: "?" }
    ],
    bank: ["writing", "you", "about", "topic", "what", "are"],
    answer: ["what", "topic", "are", "you", "writing", "about"],
    translation: "你在写什么主题的论文？"
  },
  {
    id: 6,
    set: 1,
    speakerA: "Tomorrow is the big game between our school and the rival team.",
    segments: [
      { type: "slot" },
      { type: "slot" },
      { type: "slot" },
      { type: "slot" },
      { type: "slot" },
      { type: "slot" },
      { type: "text", value: "?" }
    ],
    bank: ["the", "what", "game", "start", "time", "does"],
    answer: ["what", "time", "does", "the", "game", "start"],
    translation: "比赛几点开始？"
  },
  {
    id: 7,
    set: 1,
    speakerA: "Did you finish the assignment on time?",
    segments: [
      { type: "slot" },
      { type: "slot" },
      { type: "slot" },
      { type: "slot" },
      { type: "slot" },
      { type: "slot" },
      { type: "slot" },
      { type: "text", value: "the deadline." }
    ],
    bank: ["not", "it", "before", "to complete", "able", "was", "I"],
    answer: ["i", "was", "not", "able", "to complete", "it", "before"],
    translation: "我没能在截止日期前完成它。"
  },
  {
    id: 8,
    set: 1,
    speakerA: "The assignment deadline has been extended.",
    segments: [
      { type: "text", value: "Do" },
      { type: "slot" },
      { type: "slot" },
      { type: "slot" },
      { type: "slot" },
      { type: "slot" },
      { type: "slot" },
      { type: "text", value: "?" }
    ],
    bank: ["the new", "due date", "know", "has been announced", "you", "if"],
    answer: ["you", "know", "if", "the new", "due date", "has been announced"],
    translation: "你知道新的截止日期已经公布了吗？"
  },
  {
    id: 9,
    set: 1,
    speakerA: "Did you get a chance to review the report?",
    segments: [
      { type: "text", value: "Sorry, but I" },
      { type: "slot" },
      { type: "slot" },
      { type: "slot" },
      { type: "slot" },
      { type: "slot" },
      { type: "slot" },
      { type: "slot" },
      { type: "text", value: "yet." }
    ],
    bank: ["to look", "not", "at", "time", "have", "had", "it"],
    answer: ["have", "not", "had", "time", "to look", "at", "it"],
    translation: "抱歉，我还没来得及看它。"
  },
  {
    id: 10,
    set: 1,
    speakerA: "Why aren't you attending the conference?",
    segments: [
      { type: "text", value: "The dates" },
      { type: "slot" },
      { type: "slot" },
      { type: "slot" },
      { type: "slot" },
      { type: "slot" },
      { type: "slot" },
      { type: "text", value: "." }
    ],
    bank: ["it", "conflict with", "other commitments", "when", "is scheduled", "my"],
    answer: ["when", "it", "is scheduled", "conflict with", "my", "other commitments"],
    translation: "会议预定的日期和我其他的安排有冲突。"
  }

  // 以后新增 Set 2，就继续往下加：
  // {
  //   id: 1,
  //   set: 2,
  //   ...
  // }
];

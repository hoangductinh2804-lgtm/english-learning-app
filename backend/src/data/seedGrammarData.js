export const seedGrammarLessons = [
  {
    tense: "present-simple",
    title: "Present Simple",
    summary: "Dien ta thoi quen, su that hien nhien va lich trinh co dinh.",
    level: "beginner",
    rules: [
      "Dung dong tu nguyen mau voi I/You/We/They.",
      "Them -s/-es cho dong tu voi He/She/It.",
      "Dung do/does cho cau phu dinh va cau hoi.",
    ],
    structure: {
      affirmative: "S + V(s/es) + O",
      negative: "S + do/does not + V(base) + O",
      question: "Do/Does + S + V(base) + O?",
    },
    examples: [
      {
        sentence: "She studies English every evening.",
        translation: "Co ay hoc tieng Anh moi toi.",
      },
      {
        sentence: "Do they work on weekends?",
        translation: "Ho co lam viec vao cuoi tuan khong?",
      },
    ],
    exercises: [
      {
        question: "He ____ to school by bus every day.",
        options: ["go", "goes", "is going", "went"],
        answer: "goes",
      },
      {
        question: "We ____ coffee in the morning.",
        options: ["drink", "drinks", "drank", "are drinking"],
        answer: "drink",
      },
    ],
    quiz: [
      {
        question: "Which sentence is correct?",
        options: [
          "She don't like cats.",
          "She doesn't likes cats.",
          "She doesn't like cats.",
          "She not like cats.",
        ],
        answer: "She doesn't like cats.",
        explanation: "Voi She, dung does not + V(base).",
      },
      {
        question: "Choose the correct question form:",
        options: [
          "Does he plays football?",
          "Do he play football?",
          "Does he play football?",
          "He does play football?",
        ],
        answer: "Does he play football?",
        explanation: "Cau hoi voi he/she/it dung Does + S + V(base).",
      },
    ],
  },
  {
    tense: "present-continuous",
    title: "Present Continuous",
    summary: "Dien ta hanh dong dang xay ra o hien tai hoac ke hoach gan.",
    level: "beginner",
    rules: [
      "Dung am/is/are + V-ing.",
      "Them not sau am/is/are de tao phu dinh.",
      "Dao am/is/are len dau cau de tao cau hoi.",
    ],
    structure: {
      affirmative: "S + am/is/are + V-ing + O",
      negative: "S + am/is/are not + V-ing + O",
      question: "Am/Is/Are + S + V-ing + O?",
    },
    examples: [
      {
        sentence: "I am reading a new book now.",
        translation: "Toi dang doc mot quyen sach moi bay gio.",
      },
      {
        sentence: "Are they studying for the exam?",
        translation: "Ho dang hoc cho bai kiem tra phai khong?",
      },
    ],
    exercises: [
      {
        question: "Listen! The baby ____.",
        options: ["cry", "cries", "is crying", "cried"],
        answer: "is crying",
      },
      {
        question: "We ____ dinner at the moment.",
        options: ["cook", "are cooking", "cooked", "cooks"],
        answer: "are cooking",
      },
    ],
    quiz: [
      {
        question: "Choose the correct sentence:",
        options: [
          "She is work now.",
          "She working now.",
          "She is working now.",
          "She works now.",
        ],
        answer: "She is working now.",
        explanation: "Present continuous can am/is/are + V-ing.",
      },
      {
        question: "What is the negative form of 'They are watching TV'?",
        options: [
          "They not watching TV.",
          "They don't watching TV.",
          "They are not watching TV.",
          "They doesn't watch TV.",
        ],
        answer: "They are not watching TV.",
        explanation: "Them not sau are.",
      },
    ],
  },
  {
    tense: "past-simple",
    title: "Past Simple",
    summary: "Dien ta hanh dong da xay ra va ket thuc trong qua khu.",
    level: "intermediate",
    rules: [
      "Dong tu thuong them -ed voi dong tu co quy tac.",
      "Dung did not + V(base) cho cau phu dinh.",
      "Dung Did + S + V(base) cho cau hoi.",
    ],
    structure: {
      affirmative: "S + V2/ed + O",
      negative: "S + did not + V(base) + O",
      question: "Did + S + V(base) + O?",
    },
    examples: [
      {
        sentence: "They visited Da Nang last summer.",
        translation: "Ho da tham Da Nang mua he nam ngoai.",
      },
      {
        sentence: "Did you finish your homework yesterday?",
        translation: "Ban da hoan thanh bai tap hom qua chua?",
      },
    ],
    exercises: [
      {
        question: "She ____ her phone at home yesterday.",
        options: ["leave", "leaves", "left", "is leaving"],
        answer: "left",
      },
      {
        question: "We ____ not go out last night.",
        options: ["did", "do", "were", "are"],
        answer: "did",
      },
    ],
    quiz: [
      {
        question: "Choose the correct question:",
        options: [
          "Did she went to school?",
          "Did she go to school?",
          "Do she go to school?",
          "Was she go to school?",
        ],
        answer: "Did she go to school?",
        explanation: "Sau Did dung dong tu nguyen mau.",
      },
      {
        question: "Which sentence is correct?",
        options: [
          "I didn't saw him.",
          "I didn't see him.",
          "I don't saw him.",
          "I not see him.",
        ],
        answer: "I didn't see him.",
        explanation: "Phu dinh qua khu: did not + V(base).",
      },
    ],
  },
];
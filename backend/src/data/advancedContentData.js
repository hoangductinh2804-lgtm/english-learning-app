export const listeningTracks = [
  {
    id: "listening-1",
    title: "Daily Routine Conversation",
    level: "beginner",
    duration: "01:42",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    transcript:
      "Anna: What time do you wake up? Ben: I wake up at six thirty and go for a short walk.",
    questions: [
      "What time does Ben wake up?",
      "What does he do after waking up?",
    ],
  },
  {
    id: "listening-2",
    title: "At the Coffee Shop",
    level: "beginner",
    duration: "02:10",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    transcript:
      "Customer: Could I have a cappuccino, please? Barista: Sure. Would you like sugar with that?",
    questions: [
      "What drink does the customer order?",
      "What additional option does the barista offer?",
    ],
  },
  {
    id: "listening-3",
    title: "Weekend Plan",
    level: "intermediate",
    duration: "02:35",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    transcript:
      "Linh: I am thinking about visiting my grandparents this weekend. Minh: That sounds great. I might join you.",
    questions: [
      "Who does Linh want to visit?",
      "How does Minh react to the plan?",
    ],
  },
];

export const speakingPrompts = [
  "Introduce yourself in 5-6 sentences.",
  "Describe your favorite place in your city.",
  "Talk about your plan for next weekend.",
  "Explain one habit that helps you learn English better.",
];

export const readingArticles = [
  {
    id: "reading-1",
    title: "Why Reading Aloud Helps Language Learning",
    level: "beginner",
    content:
      "Reading aloud helps learners improve pronunciation, rhythm, and confidence. It also helps your brain connect spelling with sound. If you read aloud for ten minutes every day, your speaking fluency can improve over time.",
    questions: [
      "What does reading aloud improve?",
      "How much daily practice is suggested?",
    ],
  },
  {
    id: "reading-2",
    title: "Small Habits for Better English",
    level: "intermediate",
    content:
      "Many learners fail because they focus only on long study sessions. Small habits are often more effective. For example, learning five words a day and writing one short paragraph can build strong progress after a few months.",
    questions: [
      "Why do many learners fail?",
      "Give two examples of small habits from the article.",
    ],
  },
  {
    id: "reading-3",
    title: "Thinking in English",
    level: "intermediate",
    content:
      "Thinking in English is a practical way to become more fluent. Start with simple thoughts like your daily schedule. Then move to describing what you see around you. This reduces translation time and makes conversation smoother.",
    questions: [
      "What is the first step to start thinking in English?",
      "How does this habit help conversation?",
    ],
  },
];

export const conversations = [
  {
    id: "conv-easy-1",
    title: "Morning Greeting",
    difficulty: "easy",
    dialogues: [
      {
        speaker: "Anna",
        text: "Good morning! How are you today?",
        translation: "Chào buổi sáng! Hôm nay bạn thế nào?",
      },
      {
        speaker: "Ben",
        text: "I'm fine, thank you. And you?",
        translation: "Tôi ổn, cảm ơn. Còn bạn thì sao?",
      },
      {
        speaker: "Anna",
        text: "I'm great! I slept very well last night.",
        translation: "Tôi rất tốt! Tối qua tôi ngủ rất ngon.",
      },
      {
        speaker: "Ben",
        text: "That's good to hear. Have a nice day!",
        translation: "Tốt quá. Chúc bạn một ngày tốt lành!",
      },
    ],
  },
  {
    id: "conv-easy-2",
    title: "Introducing Yourself",
    difficulty: "easy",
    dialogues: [
      {
        speaker: "Linh",
        text: "Hi, my name is Linh. What is your name?",
        translation: "Xin chào, tôi tên là Linh. Bạn tên gì?",
      },
      {
        speaker: "Minh",
        text: "Nice to meet you, Linh. My name is Minh.",
        translation: "Rất vui được gặp bạn, Linh. Tôi tên là Minh.",
      },
      {
        speaker: "Linh",
        text: "Where are you from, Minh?",
        translation: "Bạn đến từ đâu vậy, Minh?",
      },
      {
        speaker: "Minh",
        text: "I am from Hanoi. What about you?",
        translation: "Tôi đến từ Hà Nội. Còn bạn thì sao?",
      },
      {
        speaker: "Linh",
        text: "I am from Ho Chi Minh City.",
        translation: "Tôi đến từ Thành phố Hồ Chí Minh.",
      },
    ],
  },
  {
    id: "conv-medium-1",
    title: "At the Restaurant",
    difficulty: "medium",
    dialogues: [
      {
        speaker: "Waiter",
        text: "Good evening! Do you have a reservation?",
        translation: "Chào buổi tối! Quý khách có đặt bàn trước không?",
      },
      {
        speaker: "Customer",
        text: "No, I don't. Is there a table available for two?",
        translation: "Không, tôi chưa đặt. Còn bàn cho hai người không?",
      },
      {
        speaker: "Waiter",
        text: "Yes, please follow me. Here is your menu.",
        translation: "Có ạ, mời quý khách theo tôi. Đây là thực đơn.",
      },
      {
        speaker: "Customer",
        text: "Thank you. Could you recommend a popular dish?",
        translation: "Cảm ơn. Bạn có thể giới thiệu một món phổ biến không?",
      },
      {
        speaker: "Waiter",
        text: "Our grilled salmon is very popular today.",
        translation: "Cá hồi nướng của chúng tôi rất được yêu thích hôm nay.",
      },
    ],
  },
  {
    id: "conv-medium-2",
    title: "Asking for Directions",
    difficulty: "medium",
    dialogues: [
      {
        speaker: "Tourist",
        text: "Excuse me, could you help me find the train station?",
        translation: "Xin lỗi, bạn có thể chỉ đường đến ga tàu hỏa không?",
      },
      {
        speaker: "Local",
        text: "Of course! Go straight ahead for two blocks, then turn left.",
        translation: "Tất nhiên! Đi thẳng hai dãy nhà, rồi rẽ trái.",
      },
      {
        speaker: "Tourist",
        text: "Is it far from here?",
        translation: "Có xa từ đây không?",
      },
      {
        speaker: "Local",
        text: "It's about a ten-minute walk. You can't miss it.",
        translation: "Khoảng mười phút đi bộ thôi. Bạn sẽ không bị lạc đâu.",
      },
      {
        speaker: "Tourist",
        text: "Thank you so much for your help!",
        translation: "Cảm ơn bạn rất nhiều!",
      },
    ],
  },
  {
    id: "conv-hard-1",
    title: "Job Interview",
    difficulty: "hard",
    dialogues: [
      {
        speaker: "Interviewer",
        text: "Could you tell me a little about your background and experience?",
        translation: "Bạn có thể kể cho tôi nghe một chút về kinh nghiệm và nền tảng của bạn không?",
      },
      {
        speaker: "Candidate",
        text: "Certainly. I have five years of experience in software development, specializing in web applications.",
        translation: "Tất nhiên. Tôi có năm năm kinh nghiệm trong phát triển phần mềm, chuyên về ứng dụng web.",
      },
      {
        speaker: "Interviewer",
        text: "What would you say is your greatest professional strength?",
        translation: "Bạn cho rằng điểm mạnh chuyên nghiệp lớn nhất của bạn là gì?",
      },
      {
        speaker: "Candidate",
        text: "I would say my ability to collaborate effectively with cross-functional teams while delivering results under tight deadlines.",
        translation: "Tôi sẽ nói đó là khả năng cộng tác hiệu quả với các nhóm đa chức năng trong khi vẫn đạt kết quả dưới áp lực thời hạn chặt chẽ.",
      },
      {
        speaker: "Interviewer",
        text: "Excellent. Where do you see yourself in five years?",
        translation: "Xuất sắc. Bạn thấy mình ở đâu sau năm năm nữa?",
      },
      {
        speaker: "Candidate",
        text: "I hope to grow into a leadership role where I can mentor others and contribute to strategic decisions.",
        translation: "Tôi hy vọng phát triển thành vai trò lãnh đạo nơi tôi có thể hướng dẫn người khác và đóng góp vào các quyết định chiến lược.",
      },
    ],
  },
  {
    id: "conv-hard-2",
    title: "Discussing Current Events",
    difficulty: "hard",
    dialogues: [
      {
        speaker: "Alex",
        text: "Have you been following the latest developments in renewable energy?",
        translation: "Bạn có theo dõi những phát triển mới nhất trong lĩnh vực năng lượng tái tạo không?",
      },
      {
        speaker: "Sam",
        text: "Somewhat. I read that solar panel efficiency has reached a new record recently.",
        translation: "Một chút. Tôi đọc thấy hiệu suất tấm pin mặt trời vừa đạt kỷ lục mới.",
      },
      {
        speaker: "Alex",
        text: "That's right. The challenge now is reducing the cost of large-scale energy storage.",
        translation: "Đúng vậy. Thách thức hiện nay là giảm chi phí lưu trữ năng lượng quy mô lớn.",
      },
      {
        speaker: "Sam",
        text: "I believe significant investment in grid infrastructure will be essential to make the transition viable.",
        translation: "Tôi tin rằng đầu tư đáng kể vào cơ sở hạ tầng lưới điện sẽ là điều cần thiết để quá trình chuyển đổi trở nên khả thi.",
      },
    ],
  },
];
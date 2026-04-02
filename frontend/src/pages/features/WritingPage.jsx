import { useState } from "react";

const writingSamples = [
  {
    id: 1,
    title: "My Daily Routine",
    level: "Beginner",
    content: `Every day, I wake up at 6 AM. First, I take a shower and brush my teeth.
Then, I have breakfast with my family.
After breakfast, I prepare my bag and go to school.
At school, I study and play with my friends.
In the evening, I do my homework and have dinner.
Before bed, I read a book for 30 minutes.
Finally, I sleep at 10 PM.`,
    vocabulary: [
      { word: "routine", meaning: "thói quen hàng ngày" },
      { word: "breakfast", meaning: "bữa sáng" },
      { word: "prepare", meaning: "chuẩn bị" },
      { word: "homework", meaning: "bài tập về nhà" },
    ],
    translation: `Mỗi ngày, tôi thức dậy lúc 6 giờ sáng. Đầu tiên, tôi tắm và đánh răng.
Sau đó, tôi ăn sáng với gia đình.
Sau bữa sáng, tôi chuẩn bị ba lô và đi học.
Ở trường, tôi học tập và chơi với bạn bè.
Vào buổi tối, tôi làm bài tập về nhà và ăn cơm.
Trước khi đi ngủ, tôi đọc sách 30 phút.
Cuối cùng, tôi ngủ lúc 10 giờ tối.`,
  },
  {
    id: 2,
    title: "A Holiday Trip",
    level: "Intermediate",
    content: `Last summer, my family and I went to the beach for a wonderful vacation.
We arrived on Saturday morning and checked into a beautiful seaside hotel.
The first day, we swam in the ocean and played volleyball on the sand.
In the afternoon, we explored local markets and tried fresh seafood.
The next day, we took a boat tour to see coral reefs and colorful fish.
We also visited a lighthouse and watched the sunset from the top.
On the last day, we packed our bags with many happy memories.
The trip was unforgettable and we promised to return next year.`,
    vocabulary: [
      { word: "vacation", meaning: "kỳ nghỉ" },
      { word: "seaside", meaning: "bên bờ biển" },
      { word: "explore", meaning: "khám phá" },
      { word: "coral", meaning: "san hô" },
      { word: "unforgettable", meaning: "không thể quên" },
    ],
    translation: `Mùa hè vừa rồi, gia đình tôi đi du lịch biển để có kỳ nghỉ tuyệt vời.
Chúng tôi đến vào sáng thứ Bảy và check in một khách sạn bên bờ biển đẹp.
Ngày đầu tiên, chúng tôi bơi trong đại dương và chơi bóng chuyền trên cát.
Vào buổi chiều, chúng tôi khám phá chợ địa phương và nếm thử hải sản tươi.
Hôm sau, chúng tôi đi du thuyền để xem rạn san hô và những con cá đầy màu sắc.
Chúng tôi cũng ghé thăm một ngọn hải đăng và xem hoàng hôn từ trên đỉnh.
Vào ngày cuối cùng, chúng tôi xếp ba lô với rất nhiều ký ức vui vẻ.
Chuyến đi này không thể quên và chúng tôi hứa sẽ quay lại năm tới.`,
  },
  {
    id: 3,
    title: "My Best Friend",
    level: "Intermediate",
    content: `My best friend's name is Sarah. She is a kind and funny person.
We have been friends since elementary school, so we have many wonderful memories together.
Sarah is very smart and always helps me with my studies.
In her free time, she loves reading books and playing basketball.
We always spend weekends together going to the movies or studying at cafes.
I admire her determination and positive attitude towards life.
She dreams of becoming a doctor in the future.
I believe she will achieve her goals because she is very dedicated.`,
    vocabulary: [
      { word: "determination", meaning: "quyết tâm" },
      { word: "admire", meaning: "ngưỡng mộ" },
      { word: "positive", meaning: "tích cực" },
      { word: "dedicated", meaning: "tận tâm" },
      { word: "achieve", meaning: "đạt được" },
    ],
    translation: `Tên của bạn thân nhất của tôi là Sarah. Cô ấy là một người tốt bụng và vui vẻ.
Chúng tôi là bạn từ thời tiểu học, vì vậy chúng tôi có rất nhiều ký ức tuyệt vời cùng nhau.
Sarah rất thông minh và luôn giúp tôi trong học tập.
Vào lúc rảnh rỗi, cô ấy yêu thích đọc sách và chơi bóng rổ.
Chúng tôi luôn dành thời gian cuối tuần cùng nhau xem phim hoặc học ở quán cà phê.
Tôi ngưỡng mộ sự quyết tâm và thái độ tích cực của cô ấy đối với cuộc sống.
Cô ấy mơ ước trở thành bác sĩ trong tương lai.
Tôi tin rằng cô ấy sẽ đạt được mục tiêu của mình vì cô ấy rất tận tâm.`,
  },
  {
    id: 4,
    title: "My Favorite Food",
    level: "Beginner",
    content: `My favorite food is pizza. It is delicious and easy to eat.
Pizza has fresh vegetables, melted cheese, and tomato sauce on a crispy crust.
I love eating pizza with my family on Friday nights.
There is a pizza restaurant near my house where they make excellent pizza.
The chef always adds fresh ingredients and uses the best quality cheese.
Sometimes, I cook pizza at home with my parents.
Making pizza is fun and we all enjoy eating it together.
Pizza is the best food ever!`,
    vocabulary: [
      { word: "delicious", meaning: "ngon miệng" },
      { word: "ingredient", meaning: "nguyên liệu" },
      { word: "crust", meaning: "vỏ bánh" },
      { word: "crispy", meaning: "giòn" },
      { word: "quality", meaning: "chất lượng" },
    ],
    translation: `Thức ăn yêu thích của tôi là pizza. Nó rất ngon và dễ ăn.
Pizza có rau quả tươi, phô mai tan chảy và nước sốt cà chua trên vỏ bánh giòn.
Tôi yêu thích ăn pizza với gia đình vào tối thứ Sáu.
Có một nhà hàng pizza gần nhà tôi nơi họ làm pizza tuyệt vời.
Đầu bếp luôn thêm nguyên liệu tươi và sử dụng phô mai có chất lượng tốt nhất.
Đôi khi, tôi nấu pizza ở nhà với cha mẹ.
Nấu pizza thật vui và chúng tôi đều thích ăn nó cùng nhau.
Pizza là thức ăn tốt nhất!`,
  },
];

const writingPhrases = {
  introduction: [
    "My name is...",
    "I live in...",
    "I like...",
    "I think...",
  ],
  description: [
    "It is very...",
    "It has...",
    "It is located...",
    "I believe...",
  ],
  connection: [
    "First, ...",
    "Then, ...",
    "After that, ...",
    "Finally, ...",
  ],
  conclusion: [
    "In conclusion, ...",
    "I hope...",
    "I would like...",
    "Thank you for...",
  ],
};

export default function WritingPage() {
  const [userText, setUserText] = useState("");
  const [selectedSample, setSelectedSample] = useState(null);
  const [activeTab, setActiveTab] = useState("write");
  const [showTranslation, setShowTranslation] = useState(false);

  const getTotalWords = () => {
    return userText.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const getSentences = () => {
    return userText.split(/[.!?]/).filter(s => s.trim().length > 0).length;
  };

  const analyzeText = () => {
    const words = userText.toLowerCase().trim().split(/\s+/);
    const uniqueWords = new Set(words);
    return {
      totalWords: words.length,
      uniqueWords: uniqueWords.size,
      sentences: getSentences(),
      avgWordLength: (userText.replace(/\s/g, "").length / words.length || 0).toFixed(1),
    };
  };

  const analysis = analyzeText();

  return (
    <div className="page">
      <h1>✍️ Luyện Viết</h1>

      <div className="tab-nav">
        <button
          className={`tab-btn ${activeTab === "write" ? "active" : ""}`}
          onClick={() => setActiveTab("write")}
        >
          Viết Bài
        </button>
        <button
          className={`tab-btn ${activeTab === "samples" ? "active" : ""}`}
          onClick={() => setActiveTab("samples")}
        >
          Bài Mẫu
        </button>
        <button
          className={`tab-btn ${activeTab === "phrases" ? "active" : ""}`}
          onClick={() => setActiveTab("phrases")}
        >
          Cụm Từ Hữu Ích
        </button>
      </div>

      {activeTab === "write" && (
        <div className="writing-section">
          <div className="writing-container">
            <textarea
              className="writing-textarea"
              value={userText}
              onChange={(e) => setUserText(e.target.value)}
              placeholder="Viết bài của bạn tại đây... (Viết về ngày hôm nay, gia đình, bạn bè, hoặc bất cứ điều gì bạn muốn)"
            />
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">Từ</div>
              <div className="stat-value">{analysis.totalWords}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Câu</div>
              <div className="stat-value">{analysis.sentences}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Từ Độc Lập</div>
              <div className="stat-value">{analysis.uniqueWords}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Độ Dài TB</div>
              <div className="stat-value">{analysis.avgWordLength}</div>
            </div>
          </div>

          {userText.length > 0 && (
            <div className="writing-analysis">
              <h3>📝 Phân Tích Văn Bản</h3>
              <div className="analysis-box">
                <p><strong>Văn bản của bạn:</strong></p>
                <p className="user-text-display">{userText}</p>
              </div>

              <div className="suggestions-box">
                <p><strong>💡 Gợi Ý:</strong></p>
                {analysis.totalWords < 20 && (
                  <p>✓ Hãy cố gắng viết thêm. Mục tiêu là 50+ từ.</p>
                )}
                {analysis.sentences < 3 && (
                  <p>✓ Sử dụng nhiều câu khác nhau để bài viết phong phú hơn.</p>
                )}
                {analysis.uniqueWords < 10 && (
                  <p>✓ Thử sử dụng những từ vựng đa dạng hơn.</p>
                )}
                {analysis.totalWords >= 50 && analysis.sentences >= 3 && analysis.uniqueWords >= 10 && (
                  <p>🎉 Tuyệt vời! Bài viết của bạn rất tốt. Hãy tiếp tục cải thiện!</p>
                )}
              </div>

              <div className="vocabulary-from-text">
                <h4>📚 Từ Vựng Trong Bài Viết</h4>
                <div className="vocab-tag-cloud">
                  {[...new Set(userText.toLowerCase().match(/\b[a-z]+\b/g) || [])].slice(0, 10).map((word) => (
                    <span key={word} className="vocab-tag">{word}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "samples" && (
        <div className="samples-section">
          <div className="samples-list">
            {writingSamples.map((sample) => (
              <div
                key={sample.id}
                className={`sample-card ${selectedSample?.id === sample.id ? "active" : ""}`}
                onClick={() => setSelectedSample(selectedSample?.id === sample.id ? null : sample)}
              >
                <h3>{sample.title}</h3>
                <p className="sample-level">{sample.level}</p>
                {selectedSample?.id === sample.id && (
                  <p className="sample-preview">{sample.content.substring(0, 60)}...</p>
                )}
              </div>
            ))}
          </div>

          {selectedSample && (
            <div className="sample-detail">
              <h2>{selectedSample.title}</h2>
              <p className="level-badge">📊 {selectedSample.level}</p>

              <div className="sample-content">
                <p>{selectedSample.content}</p>
              </div>

              <button
                className="translation-toggle"
                onClick={() => setShowTranslation(!showTranslation)}
              >
                {showTranslation ? "Ẩn Bản Dịch" : "Xem Bản Dịch"}
              </button>

              {showTranslation && (
                <div className="sample-translation">
                  <h4>Bản Dịch Tiếng Việt:</h4>
                  <p>{selectedSample.translation}</p>
                </div>
              )}

              <div className="sample-vocabulary">
                <h4>📖 Từ Vựng Quan Trọng</h4>
                <div className="vocab-list">
                  {selectedSample.vocabulary.map((word, idx) => (
                    <div key={idx} className="vocab-item">
                      <div className="vocab-word">{word.word}</div>
                      <div className="vocab-meaning">{word.meaning}</div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className="copy-btn"
                onClick={() => {
                  navigator.clipboard.writeText(selectedSample.content);
                  alert("Đã sao chép bài mẫu!");
                }}
              >
                📋 Sao Chép Bài Mẫu
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === "phrases" && (
        <div className="phrases-section">
          <div className="phrases-grid">
            {Object.entries(writingPhrases).map(([category, phrases]) => (
              <div key={category} className="phrase-category">
                <h3>
                  {category === "introduction" && "🎯 Mở Bài"}
                  {category === "description" && "📝 Mô Tả"}
                  {category === "connection" && "🔗 Liên Kết Ý Tưởng"}
                  {category === "conclusion" && "🏁 Kết Luận"}
                </h3>
                <div className="phrase-list">
                  {phrases.map((phrase, idx) => (
                    <div
                      key={idx}
                      className="phrase-item"
                      onClick={() => {
                        setUserText(userText + (userText ? " " : "") + phrase);
                        setActiveTab("write");
                      }}
                    >
                      {phrase}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="phrases-tips">
            <h3>💡 Mẹo Viết Bài Tiếng Anh</h3>
            <ul>
              <li>✓ Bắt đầu với ý tưởng chính</li>
              <li>✓ Sử dụng các từ nối (first, then, finally)</li>
              <li>✓ Kiểm tra lỗi chính tả và ngữ pháp</li>
              <li>✓ Viết lại bài nhiều lần để cải thiện</li>
              <li>✓ Đọc bài viết của bạn to tiếng</li>
              <li>✓ So sánh với bài mẫu</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

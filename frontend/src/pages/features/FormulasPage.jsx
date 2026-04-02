import { useState } from "react";

const grammarFormulas = [
  {
    id: "verb-forms",
    title: "Dạng Động Từ",
    content: "Động từ tiếng Anh có 3 dạng chính:",
    items: [
      {
        formula: "V + -ing = Gerund / Present Participle",
        meaning: "Danh động từ / Hiện tại phân từ",
        examples: [
          { english: "I enjoy reading books.", vietnamese: "Tôi thích đọc sách." },
          { english: "She is running fast.", vietnamese: "Cô ấy đang chạy nhanh." },
        ],
      },
      {
        formula: "V + -ed = Past Participle",
        meaning: "Quá khứ phân từ",
        examples: [
          { english: "I walked to school yesterday.", vietnamese: "Tôi đi bộ tới trường hôm qua." },
          { english: "The broken glass is on the floor.", vietnamese: "Kính bị vỡ nằm trên sàn." },
        ],
      },
      {
        formula: "to + V = Infinitive",
        meaning: "Động từ nguyên mẫu",
        examples: [
          { english: "I want to study English.", vietnamese: "Tôi muốn học tiếng Anh." },
          { english: "She likes to swim.", vietnamese: "Cô ấy thích bơi." },
        ],
      },
    ],
  },
  {
    id: "sentence-patterns",
    title: "Mẫu Câu Cơ Bản",
    content: "Cấu trúc câu phổ biến nhất:",
    items: [
      {
        formula: "S + V + O",
        meaning: "Chủ ngữ + Động từ + Tân ngữ",
        examples: [
          { english: "She reads a book.", vietnamese: "Cô ấy đọc một cuốn sách." },
          { english: "I like cats.", vietnamese: "Tôi thích mèo." },
        ],
      },
      {
        formula: "S + Be + Adj",
        meaning: "Chủ ngữ + Tính từ liên kết + Tính từ",
        examples: [
          { english: "The weather is nice.", vietnamese: "Thời tiết rất đẹp." },
          { english: "She is happy.", vietnamese: "Cô ấy vui vẻ." },
        ],
      },
      {
        formula: "S + Be + N",
        meaning: "Chủ ngữ + Tính từ liên kết + Danh từ",
        examples: [
          { english: "He is a teacher.", vietnamese: "Anh ấy là giáo viên." },
          { english: "She is a doctor.", vietnamese: "Cô ấy là bác sĩ." },
        ],
      },
    ],
  },
  {
    id: "question-patterns",
    title: "Mẫu Câu Hỏi",
    content: "Cách hỏi trong tiếng Anh:",
    items: [
      {
        formula: "Do/Does + S + V?",
        meaning: "Câu hỏi Yes/No với hiện tại đơn",
        examples: [
          { english: "Do you like coffee?", vietnamese: "Bạn có thích cà phê không?" },
          { english: "Does she work here?", vietnamese: "Cô ấy có làm việc ở đây không?" },
        ],
      },
      {
        formula: "Wh- + Do/Does + S + V?",
        meaning: "Câu hỏi từ để hỏi thông tin",
        examples: [
          { english: "What do you like?", vietnamese: "Bạn thích cái gì?" },
          { english: "Where does she live?", vietnamese: "Cô ấy sống ở đâu?" },
        ],
      },
      {
        formula: "Is/Are + S + V-ing?",
        meaning: "Câu hỏi hiện tại tiếp diễn",
        examples: [
          { english: "Are you studying?", vietnamese: "Bạn đang học tập không?" },
          { english: "Is he playing?", vietnamese: "Anh ấy đang chơi không?" },
        ],
      },
    ],
  },
  {
    id: "tenses",
    title: "Các Thì Tiếng Anh",
    content: "12 thì chính trong tiếng Anh:",
    items: [
      {
        formula: "Simple Present: S + V/Vs",
        meaning: "Hiện tại đơn (thói quen, sự thật)",
        examples: [
          { english: "I work every day.", vietnamese: "Tôi làm việc mỗi ngày." },
          { english: "She lives in Hanoi.", vietnamese: "Cô ấy sống ở Hà Nội." },
        ],
      },
      {
        formula: "Present Continuous: S + Am/Is/Are + V-ing",
        meaning: "Hiện tại tiếp diễn (đang xảy ra)",
        examples: [
          { english: "I am reading now.", vietnamese: "Tôi đang đọc bây giờ." },
          { english: "She is working.", vietnamese: "Cô ấy đang làm việc." },
        ],
      },
      {
        formula: "Simple Past: S + V-ed",
        meaning: "Quá khứ đơn (đã xảy ra)",
        examples: [
          { english: "I walked yesterday.", vietnamese: "Tôi đi bộ hôm qua." },
          { english: "She worked there.", vietnamese: "Cô ấy đã làm việc ở đó." },
        ],
      },
      {
        formula: "Simple Future: S + Will/Shall + V",
        meaning: "Tương lai đơn (sẽ xảy ra)",
        examples: [
          { english: "I will come tomorrow.", vietnamese: "Tôi sẽ đến vào ngày mai." },
          { english: "She will study.", vietnamese: "Cô ấy sẽ học tập." },
        ],
      },
    ],
  },
];

export default function FormulasPage() {
  const [selectedFormula, setSelectedFormula] = useState(0);
  const formula = grammarFormulas[selectedFormula];

  return (
    <main className="page feature-page">
      <h1 className="feature-title">📐 Công Thức Ngữ Pháp</h1>
      <p className="feature-intro">Các mẫu câu và công thức tiếng Anh quan trọng</p>

      <div className="formula-tabs">
        {grammarFormulas.map((item, idx) => (
          <button
            key={item.id}
            className={`formula-tab ${selectedFormula === idx ? "active" : ""}`}
            onClick={() => setSelectedFormula(idx)}
            type="button"
          >
            {item.title}
          </button>
        ))}
      </div>

      <section className="content-card formula-section">
        <h2>{formula.title}</h2>
        <p className="formula-intro-text">{formula.content}</p>

        <div className="formula-items">
          {formula.items.map((item, idx) => (
            <div key={idx} className="formula-item">
              <div className="formula-header">
                <code className="formula-code">{item.formula}</code>
                <span className="formula-meaning">{item.meaning}</span>
              </div>

              <div className="formula-examples">
                <h4>Ví dụ:</h4>
                {item.examples.map((example, exIdx) => (
                  <div key={exIdx} className="example-pair">
                    <p className="english">
                      <strong>E:</strong> {example.english}
                    </p>
                    <p className="vietnamese">
                      <strong>V:</strong> {example.vietnamese}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="content-card grammar-tips">
        <h3>💡 Lưu Ý Quan Trọng</h3>
        <ul className="tips-bullet-list">
          <li>Nắm vững các mẫu câu cơ bản trước</li>
          <li>Thực hành với các ví dụ thực tế</li>
          <li>Ghi nhớ quy tắc thay đổi động từ</li>
          <li>Sử dụng công thức để kiểm tra lại</li>
          <li>Viết lại các ví dụ theo công thức</li>
          <li>Nói to lên khi học công thức</li>
        </ul>
      </section>
    </main>
  );
}

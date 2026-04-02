import { useState } from "react";

const documentations = [
  {
    id: "english-basics",
    title: "Cơ Bản Tiếng Anh",
    category: "Foundations",
    level: "Beginner",
    content: `
      <h3>Tiếng Anh Là Gì?</h3>
      <p>Tiếng Anh là ngôn ngữ toàn cầu được sử dụng bởi hơn 1 tỷ người trên thế giới. Nó là ngôn ngữ chính thức của hơn 50 quốc gia.</p>
      
      <h3>Tại Sao Học Tiếng Anh?</h3>
      <ul>
        <li>Cơ hội việc làm tốt hơn</li>
        <li>Du lịch dễ dàng hơn</li>
        <li>Tiếp cận kiến thức toàn cầu</li>
        <li>Giao tiếp quốc tế</li>
        <li>Phát triển sự nghiệp</li>
      </ul>
      
      <h3>Các Kỹ Năng Chính</h3>
      <p>Để học tiếng Anh tốt, bạn cần phát triển 4 kỹ năng:</p>
      <ol>
        <li><strong>Listening (Nghe):</strong> Nghe hiểu tiếng Anh tự nhiên</li>
        <li><strong>Speaking (Nói):</strong> Giao tiếp tự tin</li>
        <li><strong>Reading (Đọc):</strong> Đọc hiểu văn bản</li>
        <li><strong>Writing (Viết):</strong> Viết thành thạo</li>
      </ol>
    `,
  },
  {
    id: "pronunciation-guide",
    title: "Hướng Dẫn Phát Âm",
    category: "Pronunciation",
    level: "Beginner",
    content: `
      <h3>Âm Vị Tiếng Anh</h3>
      <p>Tiếng Anh có 44 âm vị (phonemes). Là những âm đơn lẻ nhất định được sử dụng để hình thành từ vựng.</p>
      
      <h3>Phí Âm Consonants (24)</h3>
      <p>Các âm phụ âm được tạo ra bằng cách cản trở dòng khí.</p>
      
      <h3>Nguyên Âm Vowels (20)</h3>
      <p>Các âm nguyên âm được tạo ra mà không cản trở dòng khí.</p>
      
      <h3>Dấu Nhấn (Stress)</h3>
      <p>Tiếng Anh sử dụng dấu nhấn. Sai dấu nhấn có thể thay đổi ý nghĩa từ.</p>
      <ul>
        <li>PREsent (danh từ) vs. preSENT (động từ)</li>
        <li>REcord vs. reCORD</li>
      </ul>
    `,
  },
  {
    id: "vocabulary-building",
    title: "Xây Dựng Từ Vựng",
    category: "Vocabulary",
    level: "Intermediate",
    content: `
      <h3>Mẹo Học Từ Vựng Hiệu Quả</h3>
      
      <h4>1. Học Từ Trong Ngữ Cảnh</h4>
      <p>Không học từ riêng lẻ. Học từ trong câu hoặc đoạn văn.</p>
      
      <h4>2. Sử Dụng Flashcards</h4>
      <p>Tạo thẻ với từ trên một mặt và nghĩa trên mặt kia.</p>
      
      <h4>3. Nhóm Từ Cùng Chủ Đề</h4>
      <p>Nhóm từ theo chủ đề (gia đình, thực phẩm, công việc, v.v.)</p>
      
      <h4>4. Sử Dụng Từ Thường Xuyên</h4>
      <p>Luyện nói và viết các từ mới hàng ngày.</p>
      
      <h4>5. Xây Dựng Từ Dẫn xuất</h4>
      <ul>
        <li>happy → unhappy → happiness</li>
        <li>create → create → creating → created</li>
      </ul>
    `,
  },
  {
    id: "grammar-essentials",
    title: "Ngữ Pháp Thiết Yếu",
    category: "Grammar",
    level: "Intermediate",
    content: `
      <h3>Các Phần Của Câu</h3>
      
      <h4>1. Chủ Ngữ (Subject)</h4>
      <p>Phần thực hiện hành động. "I" "She" "The cat"</p>
      
      <h4>2. Động Từ (Verb)</h4>
      <p>Từ chỉ hành động hoặc trạng thái. "run" "be" "study"</p>
      
      <h4>3. Tân Ngữ (Object)</h4>
      <p>Phần chịu tác động từ hành động. "the book" "me"</p>
      
      <h4>4. Tính Từ (Adjective)</h4>
      <p>Mô tả danh từ. "beautiful" "big" "red"</p>
      
      <h3>Thứ Tự Từ</h3>
      <p>Tiếng Anh thường tuân theo thứ tự: S + V + O</p>
      
      <h3>Động Từ Tìn Từ</h3>
      <p>Động từ chỉ trạng thái: be, seem, appear, become, feel, taste, smell, sound, look</p>
    `,
  },
  {
    id: "conversation-tips",
    title: "Mẹo Giao Tiếp",
    category: "Speaking",
    level: "Intermediate",
    content: `
      <h3>Cách Bắt Đầu Cuộc Trò Chuyện</h3>
      <ul>
        <li>Hi! How are you?</li>
        <li>What's new?</li>
        <li>Have you been here before?</li>
        <li>What do you do?</li>
      </ul>
      
      <h3>Cách Giữ Cuộc Trò Chuyện</h3>
      <ul>
        <li>That's interesting, tell me more.</li>
        <li>What happened next?</li>
        <li>How did that make you feel?</li>
        <li>I totally agree with you.</li>
      </ul>
      
      <h3>Cách Kết Thúc Cuộc Trò Chuyện</h3>
      <ul>
        <li>It was nice talking to you.</li>
        <li>I hope we can talk again soon.</li>
        <li>Have a great day!</li>
        <li>Take care!</li>
      </ul>
      
      <h3>Các Câu Để Bạn Không Hiểu</h3>
      <ul>
        <li>Sorry, can you repeat that?</li>
        <li>Could you speak more slowly?</li>
        <li>What does that word mean?</li>
        <li>Can you spell that for me?</li>
      </ul>
    `,
  },
];

export default function DocumentationPage() {
  const [selectedDoc, setSelectedDoc] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const doc = documentations[selectedDoc];

  const filteredDocs = documentations.filter(
    (d) =>
      d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="page feature-page">
      <h1 className="feature-title">📖 Tài Liệu & Hướng Dẫn</h1>
      <p className="feature-intro">Đọc các bài viết giáo dục về tiếng Anh</p>

      <div className="search-box plain">
        <span>🔍</span>
        <input
          type="text"
          placeholder="Tìm kiếm bài viết..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="doc-tabs">
        {filteredDocs.map((item, idx) => (
          <button
            key={item.id}
            className={`doc-tab ${
              item.id === doc.id ? "active" : ""
            }`}
            onClick={() => {
              setSelectedDoc(documentations.indexOf(item));
            }}
            type="button"
          >
            <span className="doc-title">{item.title}</span>
            <span className="doc-level">{item.level}</span>
          </button>
        ))}
      </div>

      <section className="content-card doc-content">
        <div className="doc-header">
          <h2>{doc.title}</h2>
          <span className="doc-badge">{doc.level}</span>
          <span className="doc-category">{doc.category}</span>
        </div>

        <div
          className="doc-body"
          dangerouslySetInnerHTML={{ __html: doc.content }}
        />

        <div className="doc-footer">
          <p className="doc-note">
            💡 <strong>Mẹo:</strong> In hoặc lưu bài viết này để tham khảo lại.
          </p>
          <button
            className="primary-btn"
            onClick={() => window.print()}
            type="button"
          >
            🖨 In Bài Viết
          </button>
        </div>
      </section>
    </main>
  );
}

import { pronunciationPairs } from "../../data/featureContent";

export default function PronunciationPage() {
  function speak(text) {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  return (
    <main className="page feature-page">
      <h1 className="feature-title">📣 Ngu am</h1>
      <p className="feature-intro">Tap phat am cac canh khong va kho phan biet trong tieng Anh</p>
      
      {pronunciationPairs.map((item) => (
        <section className="content-card pronunciation-section" key={item.pair}>
          <div className="pronunciation-header">
            <h2>🔊 {item.pair}</h2>
          </div>
          
          <div className="pronunciation-tip">
            <h3>💡 Huong dan phat am:</h3>
            <p>{item.tip}</p>
          </div>
          
          <div className="sample-box">
            <h3>Cau mau:</h3>
            <p className="article-body">{item.sample}</p>
            <button className="primary-btn" onClick={() => speak(item.sample)} type="button">
              ▶ Nghe cau mau
            </button>
          </div>
          
          <div className="drills-section">
            <h3>🎯 Tap phat am tu rieng le:</h3>
            <div className="number-grid">
              {item.drills.map((drill, idx) => (
                <div key={drill} className="drill-card">
                  <span className="drill-number">{idx + 1}</span>
                  <button 
                    className="drill-button"
                    onClick={() => speak(drill)} 
                    type="button"
                  >
                    <span className="drill-word">{drill}</span>
                    <span className="drill-icon">▶ Nghe</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="content-card pronunciation-guide">
        <h3>📖 He thong phat am Tieng Anh</h3>
        <div className="guide-list">
          <article>
            <h4>/p/ vs /b/</h4>
            <p>Dieu dac biet: /p/ phat am nhe khong bay hoi, /b/ co bay hoi</p>
            <div className="example-items">
              <span>pen - /p/ phat am nhe</span>
              <span>ben - /b/ phat am co bay hoi</span>
            </div>
          </article>
          <article>
            <h4>/t/ vs /d/</h4>
            <p>Dieu dac biet: /t/ phat am nhe, /d/ phat am co bay hoi</p>
            <div className="example-items">
              <span>tea - /t/ phat am nhe</span>
              <span>day - /d/ phat am co bay hoi</span>
            </div>
          </article>
          <article>
            <h4>/l/ vs /r/</h4>
            <p>Dieu dac biet: /l/ dua luoi len tren rang tren, /r/ cuon luoi</p>
            <div className="example-items">
              <span>light - /l/ dua luoi</span>
              <span>right - /r/ cuon luoi</span>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}

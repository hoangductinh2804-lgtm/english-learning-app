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
      <h1 className="feature-title">Ngu am</h1>
      {pronunciationPairs.map((item) => (
        <section className="content-card" key={item.pair}>
          <h2>{item.pair}</h2>
          <p>{item.tip}</p>
          <p className="article-body">{item.sample}</p>
          <button className="primary-btn" onClick={() => speak(item.sample)} type="button">
            Phat am cau mau
          </button>
        </section>
      ))}
    </main>
  );
}

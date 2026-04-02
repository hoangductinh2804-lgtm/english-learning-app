import { toolsContent } from "../../data/featureContent";

export default function ToolsPage() {
  return (
    <main className="page feature-page">
      <h1 className="feature-title">Cong cu hoc tap</h1>

      <section className="content-card">
        <h2>Writing Checklist</h2>
        <ul className="script-list">
          {toolsContent.writingChecklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="content-card">
        <h2>Speaking Routine 10 phut</h2>
        <ul className="script-list">
          {toolsContent.speakingRoutine.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="content-card">
        <h2>Core Vocabulary Library</h2>
        <div className="vocab-list">
          {toolsContent.coreVocabulary.map((item) => (
            <article className="vocab-item" key={item.word}>
              <p className="vocab-head">
                <strong>{item.word}</strong>
                <span>{item.category}</span>
              </p>
              <p className="vocab-meaning">{item.meaning}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

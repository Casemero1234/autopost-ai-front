import React, { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateContent = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://ia-backend-brt5.onrender.com/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ texte: input }),
      });
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error("Erreur de génération :", error);
      setResult({ erreur: "Échec de la génération." });
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "2rem" }}>
      <h1 style={{ textAlign: "center" }}>🚀 AutoPost AI</h1>
      <p style={{ textAlign: "center", color: "#555" }}>
        Colle un texte, clique, génère Résumé + Post + Plan.
      </p>

      <textarea
        placeholder="Collez votre texte ici..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{
          width: "100%",
          height: "150px",
          marginTop: "1rem",
          padding: "0.5rem",
        }}
      />

      <button
        onClick={generateContent}
        disabled={loading || !input}
        style={{
          marginTop: "1rem",
          width: "100%",
          padding: "0.75rem",
          backgroundColor: "#333",
          color: "#fff",
          border: "none",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        {loading ? "Génération en cours..." : "✨ Générer avec AutoPost AI"}
      </button>

      {result && (
        <div style={{ marginTop: "2rem" }}>
          {result.résumé && (
            <div style={{ marginBottom: "1rem" }}>
              <h2>🧠 Résumé</h2>
              <pre>{result.résumé}</pre>
            </div>
          )}
          {result.post && (
            <div style={{ marginBottom: "1rem" }}>
              <h2>✍️ Post LinkedIn</h2>
              <pre>{result.post}</pre>
            </div>
          )}
          {result.plan && (
            <div style={{ marginBottom: "1rem" }}>
              <h2>📋 Plan de publication</h2>
              <pre>{result.plan}</pre>
            </div>
          )}
          {result.erreur && (
            <div style={{ color: "red" }}>
              ⚠️ {result.erreur}
            </div>
          )}
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: "3rem" }}>
        <h3>⚡ Payez pour soutenir AutoPost AI</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            💳 <a href="https://buy.stripe.com/9AQ4gA6oxab71Qk7ss" target="_blank" rel="noopener noreferrer">
              Payer 3€ avec Stripe
            </a>
          </li>
          <li>
            ☕ <a href="https://ko-fi.com/casemero" target="_blank" rel="noopener noreferrer">
              Soutenir via Ko-fi
            </a>
          </li>
          <li>
            🧾 <a href="https://www.paypal.com/paypalme/loopbot96" target="_blank" rel="noopener noreferrer">
              Faire un don via PayPal
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;

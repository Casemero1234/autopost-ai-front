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
        placeholder="Colle ton texte ici..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "100%", height: "150px", marginTop: "1rem", padding: "0.5rem" }}
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

      {/* 🔽 BOUTONS DE PAIEMENT ICI 🔽 */}
      <div style={{ marginTop: "3rem", textAlign: "center" }}>
        <h3>💳 Accès Premium – 10 Générations IA pour 3 €</h3>
        
        {/* Stripe Button */}
        <a href="https://buy.stripe.com/9AQ4gA6oxab71Qk7ss" target="_blank" rel="noreferrer">
          <button style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#635BFF",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            marginBottom: "15px"
          }}>
            Payer avec Stripe
          </button>
        </a>

        {/* Ko-fi Button */}
        <div style={{ marginBottom: "10px" }}>
          <a href="https://ko-fi.com/casemero" target="_blank" rel="noreferrer">
            <img 
              height="36" 
              style={{ border: 0 }} 
              src="https://cdn.ko-fi.com/cdn/kofi5.png?v=3" 
              alt="Soutiens-nous sur Ko-fi"
            />
          </a>
        </div>

        {/* PayPal */}
        <p style={{ fontSize: "13px", color: "#555" }}>
          💰 Ou PayPal direct : <strong>loopbot96@gmail.com</strong>
        </p>
      </div>
    </div>
  );
}

export default App;


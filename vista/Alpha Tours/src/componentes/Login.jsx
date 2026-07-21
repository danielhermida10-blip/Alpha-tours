import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@300;400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .at-root {
    min-height: 100vh;
    display: flex;
    font-family: 'DM Sans', sans-serif;
    background: #0a0e1a;
    color: #f0ece4;
    overflow: hidden;
  }

  /* LEFT PANEL */
  .at-left {
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 48px;
    overflow: hidden;
  }
  .at-left-bg {
    position: absolute;
    inset: 0;
    background: url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=900&q=80') center/cover no-repeat;
    filter: brightness(0.45) saturate(1.2);
    z-index: 0;
  }
  .at-left-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 30%, #0a0e1a 100%);
    z-index: 1;
  }
  .at-left-content { position: relative; z-index: 2; }
  .at-brand {
    font-family: 'Playfair Display', serif;
    font-size: 42px;
    font-weight: 700;
    letter-spacing: -1px;
    color: #fff;
    line-height: 1.1;
  }
  .at-brand span { color: #d4a853; }
  .at-tagline {
    margin-top: 12px;
    font-size: 14px;
    color: rgba(255,255,255,0.55);
    letter-spacing: 3px;
    text-transform: uppercase;
    font-weight: 300;
  }
  .at-deco-line {
    width: 48px;
    height: 2px;
    background: #d4a853;
    margin-bottom: 20px;
  }

  /* RIGHT PANEL */
  .at-right {
    width: 440px;
    background: #0f1320;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 56px 48px;
    position: relative;
    border-left: 1px solid rgba(212,168,83,0.12);
  }
  .at-right::before {
    content: '';
    position: absolute;
    top: -120px;
    right: -80px;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(212,168,83,0.08) 0%, transparent 70%);
    pointer-events: none;
  }

  .at-form-title {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 6px;
  }
  .at-form-sub {
    font-size: 13px;
    color: rgba(240,236,228,0.45);
    margin-bottom: 36px;
    font-weight: 300;
  }

  /* ROLE SELECTOR */
  .at-roles {
    display: flex;
    gap: 8px;
    margin-bottom: 28px;
  }
  .at-role-btn {
    flex: 1;
    padding: 9px 4px;
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.1);
    background: transparent;
    color: rgba(240,236,228,0.5);
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: 0.5px;
  }
  .at-role-btn.active {
    background: rgba(212,168,83,0.15);
    border-color: #d4a853;
    color: #d4a853;
  }
  .at-role-btn:hover:not(.active) {
    border-color: rgba(255,255,255,0.25);
    color: rgba(240,236,228,0.8);
  }

  /* INPUTS */
  .at-field { margin-bottom: 18px; position: relative; }
  .at-label {
    display: block;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: rgba(240,236,228,0.45);
    margin-bottom: 8px;
  }
  .at-input {
    width: 100%;
    padding: 13px 16px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    color: #f0ece4;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s, background 0.2s;
  }
  .at-input:focus {
    border-color: #d4a853;
    background: rgba(212,168,83,0.05);
  }
  .at-input::placeholder { color: rgba(240,236,228,0.2); }

  .at-forgot {
    display: block;
    text-align: right;
    font-size: 12px;
    color: #d4a853;
    margin-top: -10px;
    margin-bottom: 28px;
    cursor: pointer;
    background: none;
    border: none;
    font-family: 'DM Sans', sans-serif;
    text-decoration: underline;
    text-underline-offset: 3px;
    opacity: 0.8;
    transition: opacity 0.2s;
  }
  .at-forgot:hover { opacity: 1; }

  .at-btn-primary {
    width: 100%;
    padding: 14px;
    background: #d4a853;
    color: #0a0e1a;
    border: none;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s, transform 0.1s;
  }
  .at-btn-primary:hover { background: #e0b96a; }
  .at-btn-primary:active { transform: scale(0.98); }

  .at-error {
    background: rgba(220,70,70,0.1);
    border: 1px solid rgba(220,70,70,0.3);
    color: #e07070;
    border-radius: 8px;
    padding: 10px 14px;
    font-size: 12px;
    margin-bottom: 18px;
  }
  .at-success {
    background: rgba(70,180,120,0.1);
    border: 1px solid rgba(70,180,120,0.3);
    color: #70e0a8;
    border-radius: 8px;
    padding: 10px 14px;
    font-size: 12px;
    margin-bottom: 18px;
  }

  .at-divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 24px 0 0;
    color: rgba(240,236,228,0.2);
    font-size: 11px;
  }
  .at-divider::before, .at-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.08);
  }

  /* RECOVERY MODAL */
  .at-modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(10,14,26,0.85);
    backdrop-filter: blur(6px);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.2s;
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  .at-modal {
    background: #0f1320;
    border: 1px solid rgba(212,168,83,0.2);
    border-radius: 16px;
    padding: 40px;
    width: 380px;
    animation: slideUp 0.25s;
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .at-modal-title {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 8px;
  }
  .at-modal-sub {
    font-size: 13px;
    color: rgba(240,236,228,0.45);
    margin-bottom: 28px;
    line-height: 1.6;
  }
  .at-modal-actions {
    display: flex;
    gap: 10px;
    margin-top: 20px;
  }
  .at-btn-ghost {
    flex: 1;
    padding: 12px;
    background: transparent;
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 10px;
    color: rgba(240,236,228,0.6);
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    cursor: pointer;
    transition: border-color 0.2s, color 0.2s;
  }
  .at-btn-ghost:hover { border-color: rgba(255,255,255,0.3); color: #f0ece4; }
  .at-btn-secondary {
    flex: 1;
    padding: 12px;
    background: rgba(212,168,83,0.15);
    border: 1px solid #d4a853;
    border-radius: 10px;
    color: #d4a853;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
  }
  .at-btn-secondary:hover { background: rgba(212,168,83,0.25); }
`;

const ROLES = ["Gerente", "Empleado", "Cliente"];

export default function Login({ onLogin }) {
  const [role, setRole] = useState("Cliente");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showRecovery, setShowRecovery] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [recoveryMsg, setRecoveryMsg] = useState("");

  // RF 1.1 — Login con correo y contraseña
  const handleLogin = () => {
    setError("");
    const usuariocorrecto="admin"
    const passwordcorrecto="12345"
    if(usuariocorrecto===email&&passwordcorrecto===password){
      alert("elsusarioingresocorrectamente")
    }
    else{
      alert("contraseñaincorrecta")
    }
    if (!email.trim() || !password.trim()) {
      setError("Por favor completa todos los campos.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("El correo electrónico no es válido.");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    // RF 1.3 — Validar rol
    if (onLogin) onLogin({ email, role });
    else alert(`Acceso concedido como ${role}`);
  };

  // RF 1.2 — Recuperación de contraseña
  const handleRecovery = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(recoveryEmail)) {
      setRecoveryMsg("error");
      return;
    }
    setRecoveryMsg("success");
  };

  return (
    <>
      <style>{styles}</style>
      <div className="at-root">
        {/* Panel izquierdo — imagen */}
        <div className="at-left">
          <div className="at-left-bg" />
          <div className="at-left-overlay" />
          <div className="at-left-content">
            <div className="at-deco-line" />
            <div className="at-brand">Alpha<span>Tours</span></div>
            <div className="at-tagline">Descubre el mundo contigo</div>
          </div>
        </div>

        {/* Panel derecho — formulario */}
        <div className="at-right">
          <div className="at-form-title">Bienvenido</div>
          <div className="at-form-sub">Inicia sesión para continuar tu aventura</div>

          {/* RF 1.3 — Selector de rol */}
          <div className="at-roles">
            {ROLES.map((r) => (
              <button
                key={r}
                className={`at-role-btn ${role === r ? "active" : ""}`}
                onClick={() => setRole(r)}
              >
                {r}
              </button>
            ))}
          </div>

          {error && <div className="at-error">{error}</div>}

          {/* RF 1.1 — Email */}
          <div className="at-field">
            <label className="at-label">Correo electrónico</label>
            <input
              className="at-input"
              type="email"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* RF 1.1 — Contraseña */}
          <div className="at-field">
            <label className="at-label">Contraseña</label>
            <input
              className="at-input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>

          {/* RF 1.2 — Recuperar contraseña */}
          <button className="at-forgot" onClick={() => { setShowRecovery(true); setRecoveryMsg(""); setRecoveryEmail(""); }}>
            ¿Olvidaste tu contraseña?
          </button>

          <button className="at-btn-primary" onClick={handleLogin}>
            Iniciar Sesión
          </button>

          <div className="at-divider">Alpha Tours © 2025</div>
        </div>
      </div>

      {/* RF 1.2 — Modal recuperación */}
      {showRecovery && (
        <div className="at-modal-backdrop" onClick={() => setShowRecovery(false)}>
          <div className="at-modal" onClick={(e) => e.stopPropagation()}>
            <div className="at-modal-title">Recuperar contraseña</div>
            <div className="at-modal-sub">
              Ingresa el correo electrónico registrado y te enviaremos un enlace para restablecer tu contraseña.
            </div>

            {recoveryMsg === "error" && (
              <div className="at-error">Por favor ingresa un correo válido.</div>
            )}
            {recoveryMsg === "success" && (
              <div className="at-success">
                Enlace enviado. Revisa tu bandeja de entrada.
              </div>
            )}

            {recoveryMsg !== "success" && (
              <>
                <label className="at-label">Correo electrónico</label>
                <input
                  className="at-input"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={recoveryEmail}
                  onChange={(e) => setRecoveryEmail(e.target.value)}
                  style={{ marginTop: 8 }}
                />
              </>
            )}

            <div className="at-modal-actions">
              <button className="at-btn-ghost" onClick={() => setShowRecovery(false)}>
                Cancelar
              </button>
              {recoveryMsg !== "success" && (
                <button className="at-btn-secondary" onClick={handleRecovery}>
                  Enviar enlace
                </button>
              )}
              {recoveryMsg === "success" && (
                <button className="at-btn-secondary" onClick={() => setShowRecovery(false)}>
                  Cerrar
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import { useState } from "react";

const mockPQRs = [
  { id: "PQR-001", tipo: "Queja", asunto: "Retraso en servicio de tours", estado: "En revisión", prioridad: "Alta", fecha: "2026-05-01", respuesta: "" },
  { id: "PQR-002", tipo: "Petición", asunto: "Solicitud de información de paquetes", estado: "Respondida", prioridad: "Media", fecha: "2026-04-28", respuesta: "Hemos enviado el catálogo a su correo." },
  { id: "PQR-003", tipo: "Reclamo", asunto: "Cobro incorrecto en factura", estado: "Pendiente", prioridad: "Alta", fecha: "2026-05-05", respuesta: "" },
];

const TIPOS = ["Petición", "Queja", "Reclamo"];
const PRIORIDADES = ["Baja", "Media", "Alta"];
const ESTADOS = ["Pendiente", "En revisión", "Respondida", "Cerrada"];

const estadoColor = {
  "Pendiente": { bg: "#FFF3E0", text: "#E65100", dot: "#FF9800" },
  "En revisión": { bg: "#E3F2FD", text: "#0D47A1", dot: "#2196F3" },
  "Respondida": { bg: "#E8F5E9", text: "#1B5E20", dot: "#4CAF50" },
  "Cerrada": { bg: "#F3E5F5", text: "#4A148C", dot: "#9C27B0" },
};

const prioridadColor = {
  "Baja": "#4CAF50",
  "Media": "#FF9800",
  "Alta": "#F44336",
};

export default function PQRAlphaTours() {
  const [vista, setVista] = useState("lista"); // lista | nueva | detalle | gestionar
  const [pqrs, setPqrs] = useState(mockPQRs);
  const [seleccionado, setSeleccionado] = useState(null);
  const [form, setForm] = useState({ tipo: "Petición", asunto: "", descripcion: "", prioridad: "Media" });
  const [respuestaTexto, setRespuestaTexto] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const [filtroTipo, setFiltroTipo] = useState("Todos");
  const [enviado, setEnviado] = useState(false);
  const [busqueda, setBusqueda] = useState("");

  const pqrsFiltrados = pqrs.filter(p => {
    const matchEstado = filtroEstado === "Todos" || p.estado === filtroEstado;
    const matchTipo = filtroTipo === "Todos" || p.tipo === filtroTipo;
    const matchBusqueda = p.asunto.toLowerCase().includes(busqueda.toLowerCase()) || p.id.toLowerCase().includes(busqueda.toLowerCase());
    return matchEstado && matchTipo && matchBusqueda;
  });

  const handleEnviar = () => {
    if (!form.asunto || !form.descripcion) return;
    const nuevo = {
      id: `PQR-00${pqrs.length + 1}`,
      tipo: form.tipo,
      asunto: form.asunto,
      estado: "Pendiente",
      prioridad: form.prioridad,
      fecha: new Date().toISOString().split("T")[0],
      respuesta: "",
    };
    setPqrs([...pqrs, nuevo]);
    setEnviado(true);
    setTimeout(() => { setEnviado(false); setVista("lista"); setForm({ tipo: "Petición", asunto: "", descripcion: "", prioridad: "Media" }); }, 2000);
  };

  const handleResponder = () => {
    setPqrs(pqrs.map(p => p.id === seleccionado.id ? { ...p, estado: "Respondida", respuesta: respuestaTexto } : p));
    setSeleccionado({ ...seleccionado, estado: "Respondida", respuesta: respuestaTexto });
    setRespuestaTexto("");
  };

  const handleCambiarEstado = (nuevoEstado) => {
    setPqrs(pqrs.map(p => p.id === seleccionado.id ? { ...p, estado: nuevoEstado } : p));
    setSeleccionado({ ...seleccionado, estado: nuevoEstado });
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0a0a1a 0%, #1a1a3e 50%, #0d2137 100%)", fontFamily: "'Georgia', 'Times New Roman', serif", color: "#e8e0d0" }}>
      {/* Header */}
      <header style={{ borderBottom: "1px solid rgba(212,175,55,0.3)", padding: "0 2.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg, #D4AF37, #F5D77E)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>✈</div>
          <div>
            <div style={{ fontSize: 18, fontWeight: "bold", letterSpacing: 2, color: "#D4AF37" }}>ALPHA TOURS</div>
            <div style={{ fontSize: 10, letterSpacing: 3, color: "#a89060", textTransform: "uppercase" }}>Gestión PQR</div>
          </div>
        </div>
        <nav style={{ display: "flex", gap: 8 }}>
          {[{ label: "Mis Solicitudes", v: "lista" }, { label: "Nueva PQR", v: "nueva" }, { label: "Administrar", v: "gestionar" }].map(({ label, v }) => (
            <button key={v} onClick={() => setVista(v)} style={{ padding: "8px 18px", borderRadius: 6, border: vista === v ? "1px solid #D4AF37" : "1px solid rgba(255,255,255,0.1)", background: vista === v ? "rgba(212,175,55,0.15)" : "transparent", color: vista === v ? "#D4AF37" : "#a89060", cursor: "pointer", fontSize: 13, letterSpacing: 0.5, transition: "all 0.2s" }}>
              {label}
            </button>
          ))}
        </nav>
      </header>

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "2.5rem 1.5rem" }}>

        {/* ── LISTA ── */}
        {vista === "lista" && (
          <div>
            <div style={{ marginBottom: "2rem" }}>
              <h1 style={{ fontSize: 28, fontWeight: "normal", color: "#D4AF37", letterSpacing: 1, marginBottom: 6 }}>Mis Solicitudes PQR</h1>
              <p style={{ color: "#a89060", fontSize: 14 }}>Consulta el estado de tus peticiones, quejas y reclamos — RF 3.2</p>
            </div>

            {/* Filtros */}
            <div style={{ display: "flex", gap: 12, marginBottom: "1.5rem", flexWrap: "wrap", alignItems: "center" }}>
              <input value={busqueda} onChange={e => setBusqueda(e.target.value)} placeholder="🔍  Buscar por ID o asunto..." style={{ flex: 1, minWidth: 200, padding: "10px 14px", borderRadius: 8, border: "1px solid rgba(212,175,55,0.3)", background: "rgba(255,255,255,0.05)", color: "#e8e0d0", fontSize: 14, outline: "none" }} />
              {["Todos", ...ESTADOS].map(e => (
                <button key={e} onClick={() => setFiltroEstado(e)} style={{ padding: "8px 14px", borderRadius: 6, border: filtroEstado === e ? "1px solid #D4AF37" : "1px solid rgba(255,255,255,0.1)", background: filtroEstado === e ? "rgba(212,175,55,0.15)" : "transparent", color: filtroEstado === e ? "#D4AF37" : "#a89060", cursor: "pointer", fontSize: 12, whiteSpace: "nowrap" }}>
                  {e}
                </button>
              ))}
              <select value={filtroTipo} onChange={e => setFiltroTipo(e.target.value)} style={{ padding: "8px 12px", borderRadius: 6, border: "1px solid rgba(212,175,55,0.3)", background: "#1a1a3e", color: "#e8e0d0", fontSize: 13, cursor: "pointer", outline: "none" }}>
                <option value="Todos">Todos los tipos</option>
                {TIPOS.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>

            {/* Tabla */}
            <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, border: "1px solid rgba(212,175,55,0.15)", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(212,175,55,0.2)", background: "rgba(212,175,55,0.05)" }}>
                    {["ID", "Tipo", "Asunto", "Prioridad", "Estado", "Fecha", ""].map(h => (
                      <th key={h} style={{ padding: "14px 16px", textAlign: "left", fontSize: 11, letterSpacing: 1.5, color: "#a89060", textTransform: "uppercase", fontWeight: "normal" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pqrsFiltrados.length === 0 && (
                    <tr><td colSpan={7} style={{ padding: "3rem", textAlign: "center", color: "#a89060", fontSize: 14 }}>No se encontraron solicitudes</td></tr>
                  )}
                  {pqrsFiltrados.map((p, i) => {
                    const ec = estadoColor[p.estado];
                    return (
                      <tr key={p.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)", transition: "background 0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.background = "rgba(212,175,55,0.05)"}
                        onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)"}>
                        <td style={{ padding: "14px 16px", fontSize: 13, color: "#D4AF37", fontFamily: "monospace" }}>{p.id}</td>
                        <td style={{ padding: "14px 16px", fontSize: 13 }}>{p.tipo}</td>
                        <td style={{ padding: "14px 16px", fontSize: 13, maxWidth: 260 }}>{p.asunto}</td>
                        <td style={{ padding: "14px 16px" }}>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12 }}>
                            <span style={{ width: 7, height: 7, borderRadius: "50%", background: prioridadColor[p.prioridad] }}></span>
                            {p.prioridad}
                          </span>
                        </td>
                        <td style={{ padding: "14px 16px" }}>
                          <span style={{ padding: "4px 10px", borderRadius: 20, fontSize: 11, background: ec.bg, color: ec.text, display: "inline-flex", alignItems: "center", gap: 5 }}>
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: ec.dot }}></span>
                            {p.estado}
                          </span>
                        </td>
                        <td style={{ padding: "14px 16px", fontSize: 12, color: "#a89060" }}>{p.fecha}</td>
                        <td style={{ padding: "14px 16px" }}>
                          <button onClick={() => { setSeleccionado(p); setVista("detalle"); }} style={{ padding: "6px 14px", borderRadius: 6, border: "1px solid rgba(212,175,55,0.4)", background: "transparent", color: "#D4AF37", cursor: "pointer", fontSize: 12 }}>Ver</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "flex-end" }}>
              <button onClick={() => setVista("nueva")} style={{ padding: "12px 28px", borderRadius: 8, border: "none", background: "linear-gradient(135deg, #D4AF37, #F5D77E)", color: "#0a0a1a", cursor: "pointer", fontSize: 14, fontWeight: "bold", letterSpacing: 0.5 }}>
                + Nueva Solicitud PQR
              </button>
            </div>
          </div>
        )}

        {/* ── NUEVA PQR ── */}
        {vista === "nueva" && (
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <div style={{ marginBottom: "2rem" }}>
              <h1 style={{ fontSize: 28, fontWeight: "normal", color: "#D4AF37", letterSpacing: 1, marginBottom: 6 }}>Registrar Solicitud PQR</h1>
              <p style={{ color: "#a89060", fontSize: 14 }}>Cuéntanos tu inquietud o reclamo — RF 3.1</p>
            </div>

            {enviado && (
              <div style={{ padding: "16px 20px", borderRadius: 10, background: "rgba(76,175,80,0.15)", border: "1px solid rgba(76,175,80,0.4)", color: "#81C784", marginBottom: "1.5rem", textAlign: "center", fontSize: 15 }}>
                ✓ Solicitud registrada exitosamente
              </div>
            )}

            <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 14, border: "1px solid rgba(212,175,55,0.2)", padding: "2rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem", marginBottom: "1.2rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: 11, letterSpacing: 1.5, color: "#a89060", textTransform: "uppercase", marginBottom: 8 }}>Tipo de Solicitud — RF 3.4</label>
                  <select value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value })} style={{ width: "100%", padding: "12px 14px", borderRadius: 8, border: "1px solid rgba(212,175,55,0.3)", background: "#1a1a3e", color: "#e8e0d0", fontSize: 14, outline: "none" }}>
                    {TIPOS.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 11, letterSpacing: 1.5, color: "#a89060", textTransform: "uppercase", marginBottom: 8 }}>Prioridad — RF 3.4</label>
                  <select value={form.prioridad} onChange={e => setForm({ ...form, prioridad: e.target.value })} style={{ width: "100%", padding: "12px 14px", borderRadius: 8, border: "1px solid rgba(212,175,55,0.3)", background: "#1a1a3e", color: "#e8e0d0", fontSize: 14, outline: "none" }}>
                    {PRIORIDADES.map(p => <option key={p}>{p}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: "1.2rem" }}>
                <label style={{ display: "block", fontSize: 11, letterSpacing: 1.5, color: "#a89060", textTransform: "uppercase", marginBottom: 8 }}>Asunto</label>
                <input value={form.asunto} onChange={e => setForm({ ...form, asunto: e.target.value })} placeholder="Resumen breve de tu solicitud..." style={{ width: "100%", padding: "12px 14px", borderRadius: 8, border: "1px solid rgba(212,175,55,0.3)", background: "rgba(255,255,255,0.05)", color: "#e8e0d0", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", fontSize: 11, letterSpacing: 1.5, color: "#a89060", textTransform: "uppercase", marginBottom: 8 }}>Descripción detallada</label>
                <textarea value={form.descripcion} onChange={e => setForm({ ...form, descripcion: e.target.value })} placeholder="Describe con detalle tu petición, queja o reclamo..." rows={6} style={{ width: "100%", padding: "12px 14px", borderRadius: 8, border: "1px solid rgba(212,175,55,0.3)", background: "rgba(255,255,255,0.05)", color: "#e8e0d0", fontSize: 14, outline: "none", resize: "vertical", boxSizing: "border-box" }} />
              </div>

              <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
                <button onClick={() => setVista("lista")} style={{ padding: "12px 24px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.15)", background: "transparent", color: "#a89060", cursor: "pointer", fontSize: 14 }}>Cancelar</button>
                <button onClick={handleEnviar} style={{ padding: "12px 28px", borderRadius: 8, border: "none", background: "linear-gradient(135deg, #D4AF37, #F5D77E)", color: "#0a0a1a", cursor: "pointer", fontSize: 14, fontWeight: "bold" }}>Enviar Solicitud</button>
              </div>
            </div>
          </div>
        )}

        {/* ── DETALLE ── */}
        {vista === "detalle" && seleccionado && (
          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            <button onClick={() => setVista("lista")} style={{ marginBottom: "1.5rem", padding: "8px 16px", borderRadius: 6, border: "1px solid rgba(212,175,55,0.3)", background: "transparent", color: "#D4AF37", cursor: "pointer", fontSize: 13 }}>← Volver</button>
            <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 14, border: "1px solid rgba(212,175,55,0.2)", padding: "2rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
                <div>
                  <div style={{ fontSize: 13, color: "#D4AF37", fontFamily: "monospace", marginBottom: 4 }}>{seleccionado.id}</div>
                  <h2 style={{ fontSize: 22, fontWeight: "normal", margin: 0, marginBottom: 6 }}>{seleccionado.asunto}</h2>
                  <div style={{ fontSize: 12, color: "#a89060" }}>{seleccionado.fecha} · {seleccionado.tipo}</div>
                </div>
                <span style={{ padding: "6px 14px", borderRadius: 20, fontSize: 12, background: estadoColor[seleccionado.estado].bg, color: estadoColor[seleccionado.estado].text }}>{seleccionado.estado}</span>
              </div>
              <div style={{ padding: "16px", borderRadius: 8, background: "rgba(255,255,255,0.03)", marginBottom: "1.5rem", fontSize: 14, lineHeight: 1.7, color: "#c8c0b0" }}>
                Solicitud de tipo <strong style={{ color: "#D4AF37" }}>{seleccionado.tipo}</strong> con prioridad <strong style={{ color: prioridadColor[seleccionado.prioridad] }}>{seleccionado.prioridad}</strong>. Esta solicitud fue registrada y está siendo gestionada por el equipo de Alpha Tours.
              </div>
              {seleccionado.respuesta && (
                <div style={{ padding: "16px", borderRadius: 8, background: "rgba(76,175,80,0.08)", border: "1px solid rgba(76,175,80,0.2)", color: "#c8e6c9" }}>
                  <div style={{ fontSize: 11, letterSpacing: 1.5, color: "#81C784", textTransform: "uppercase", marginBottom: 8 }}>Respuesta del equipo</div>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7 }}>{seleccionado.respuesta}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── GESTIONAR (Personal autorizado) ── */}
        {vista === "gestionar" && (
          <div>
            <div style={{ marginBottom: "2rem" }}>
              <h1 style={{ fontSize: 28, fontWeight: "normal", color: "#D4AF37", letterSpacing: 1, marginBottom: 6 }}>Gestión de Solicitudes PQR</h1>
              <p style={{ color: "#a89060", fontSize: 14 }}>Panel de administración para personal autorizado — RF 3.3</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: seleccionado ? "1fr 1fr" : "1fr", gap: "1.5rem" }}>
              {/* Lista gestión */}
              <div>
                {pqrs.map(p => {
                  const ec = estadoColor[p.estado];
                  const isSelected = seleccionado?.id === p.id;
                  return (
                    <div key={p.id} onClick={() => { setSeleccionado(p); setRespuestaTexto(""); }} style={{ padding: "16px 20px", borderRadius: 10, border: isSelected ? "1px solid #D4AF37" : "1px solid rgba(255,255,255,0.08)", background: isSelected ? "rgba(212,175,55,0.08)" : "rgba(255,255,255,0.03)", marginBottom: 10, cursor: "pointer", transition: "all 0.2s" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <span style={{ fontSize: 12, color: "#D4AF37", fontFamily: "monospace" }}>{p.id}</span>
                        <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, background: ec.bg, color: ec.text }}>{p.estado}</span>
                      </div>
                      <div style={{ fontSize: 14, marginBottom: 4 }}>{p.asunto}</div>
                      <div style={{ fontSize: 12, color: "#a89060" }}>{p.tipo} · Prioridad <span style={{ color: prioridadColor[p.prioridad] }}>{p.prioridad}</span></div>
                    </div>
                  );
                })}
              </div>

              {/* Panel de respuesta */}
              {seleccionado && (
                <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 14, border: "1px solid rgba(212,175,55,0.2)", padding: "1.5rem", height: "fit-content" }}>
                  <h3 style={{ fontSize: 16, fontWeight: "normal", color: "#D4AF37", marginTop: 0, marginBottom: 4 }}>{seleccionado.asunto}</h3>
                  <div style={{ fontSize: 12, color: "#a89060", marginBottom: "1.5rem" }}>{seleccionado.id} · {seleccionado.tipo}</div>

                  <div style={{ marginBottom: "1rem" }}>
                    <label style={{ display: "block", fontSize: 11, letterSpacing: 1.5, color: "#a89060", textTransform: "uppercase", marginBottom: 8 }}>Cambiar Estado</label>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {ESTADOS.map(e => (
                        <button key={e} onClick={() => handleCambiarEstado(e)} style={{ padding: "6px 12px", borderRadius: 6, border: seleccionado.estado === e ? "1px solid #D4AF37" : "1px solid rgba(255,255,255,0.1)", background: seleccionado.estado === e ? "rgba(212,175,55,0.2)" : "transparent", color: seleccionado.estado === e ? "#D4AF37" : "#a89060", cursor: "pointer", fontSize: 11 }}>
                          {e}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: "1rem" }}>
                    <label style={{ display: "block", fontSize: 11, letterSpacing: 1.5, color: "#a89060", textTransform: "uppercase", marginBottom: 8 }}>Responder al Cliente</label>
                    <textarea value={respuestaTexto} onChange={e => setRespuestaTexto(e.target.value)} placeholder="Escribe la respuesta para el cliente..." rows={5} style={{ width: "100%", padding: "12px 14px", borderRadius: 8, border: "1px solid rgba(212,175,55,0.3)", background: "rgba(255,255,255,0.05)", color: "#e8e0d0", fontSize: 13, outline: "none", resize: "vertical", boxSizing: "border-box" }} />
                  </div>

                  {seleccionado.respuesta && (
                    <div style={{ padding: "12px", borderRadius: 8, background: "rgba(76,175,80,0.08)", border: "1px solid rgba(76,175,80,0.2)", marginBottom: "1rem", fontSize: 13, color: "#c8e6c9" }}>
                      <div style={{ fontSize: 10, color: "#81C784", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>Respuesta actual</div>
                      {seleccionado.respuesta}
                    </div>
                  )}

                  <button onClick={handleResponder} disabled={!respuestaTexto} style={{ width: "100%", padding: "12px", borderRadius: 8, border: "none", background: respuestaTexto ? "linear-gradient(135deg, #D4AF37, #F5D77E)" : "rgba(255,255,255,0.08)", color: respuestaTexto ? "#0a0a1a" : "#a89060", cursor: respuestaTexto ? "pointer" : "not-allowed", fontSize: 14, fontWeight: "bold" }}>
                    Enviar Respuesta
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

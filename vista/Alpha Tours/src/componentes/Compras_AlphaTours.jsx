import { useState } from "react";

const SERVICIOS = [
  { id: "s1", nombre: "Módulo Tours Nacionales", descripcion: "Gestión completa de tours dentro del país", precio: 299000, categoria: "Módulo", icono: "🗺️" },
  { id: "s2", nombre: "Módulo Tours Internacionales", descripcion: "Gestión de paquetes turísticos al exterior", precio: 599000, categoria: "Módulo", icono: "✈️" },
  { id: "s3", nombre: "Licencia Básica (1 usuario)", descripcion: "Acceso individual a la plataforma Alpha", precio: 89000, categoria: "Licencia", icono: "👤" },
  { id: "s4", nombre: "Licencia Empresarial (10 usuarios)", descripcion: "Acceso multiusuario con roles avanzados", precio: 590000, categoria: "Licencia", icono: "🏢" },
  { id: "s5", nombre: "Desarrollo a Medida — Sprint 1", descripcion: "Servicio de desarrollo personalizado (2 semanas)", precio: 1800000, categoria: "Desarrollo", icono: "⚙️" },
  { id: "s6", nombre: "Soporte Premium 24/7", descripcion: "Atención prioritaria y SLA garantizado", precio: 199000, categoria: "Servicio", icono: "🛡️" },
  { id: "s7", nombre: "Módulo PQR Avanzado", descripcion: "Gestión de peticiones, quejas y reclamos", precio: 149000, categoria: "Módulo", icono: "📋" },
  { id: "s8", nombre: "Módulo Reportes & Analytics", descripcion: "Dashboards e indicadores de negocio", precio: 249000, categoria: "Módulo", icono: "📊" },
];

const METODOS_PAGO = [
  { id: "tarjeta", label: "Tarjeta de crédito/débito", icono: "💳" },
  { id: "pse", label: "PSE — Débito bancario", icono: "🏦" },
  { id: "nequi", label: "Nequi", icono: "📱" },
  { id: "efecty", label: "Efecty / Baloto", icono: "🏪" },
];

const CATEGORIAS = ["Todos", "Módulo", "Licencia", "Desarrollo", "Servicio"];

const fmt = n => new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(n);

export default function ComprasAlphaTours() {
  const [paso, setPaso] = useState(1); // 1=catalogo 2=carrito 3=pago 4=confirmacion
  const [carrito, setCarrito] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState("Todos");
  const [metodoPago, setMetodoPago] = useState(null);
  const [procesando, setProcesando] = useState(false);
  const [compraFinalizada, setCompraFinalizada] = useState(null);
  const [historial, setHistorial] = useState([]);
  const [vistaHistorial, setVistaHistorial] = useState(false);
  const [datosPago, setDatosPago] = useState({ nombre: "", numero: "", vencimiento: "", cvv: "" });

  const serviciosFiltrados = SERVICIOS.filter(s => filtroCategoria === "Todos" || s.categoria === filtroCategoria);

  const agregarAlCarrito = (servicio) => {
    setCarrito(prev => {
      const existe = prev.find(i => i.id === servicio.id);
      if (existe) return prev.map(i => i.id === servicio.id ? { ...i, cantidad: i.cantidad + 1 } : i);
      return [...prev, { ...servicio, cantidad: 1 }];
    });
  };

  const cambiarCantidad = (id, delta) => {
    setCarrito(prev => prev.map(i => i.id === id ? { ...i, cantidad: Math.max(1, i.cantidad + delta) } : i));
  };

  const eliminarItem = (id) => setCarrito(prev => prev.filter(i => i.id !== id));

  const totalCarrito = carrito.reduce((acc, i) => acc + i.precio * i.cantidad, 0);
  const iva = totalCarrito * 0.19;
  const totalConIva = totalCarrito + iva;
  const itemsEnCarrito = carrito.reduce((acc, i) => acc + i.cantidad, 0);

  const procesarPago = () => {
    setProcesando(true);
    setTimeout(() => {
      const transaccion = {
        id: `TXN-${Date.now()}`,
        fecha: new Date().toLocaleDateString("es-CO"),
        hora: new Date().toLocaleTimeString("es-CO"),
        items: [...carrito],
        total: totalConIva,
        metodo: metodoPago,
      };
      setCompraFinalizada(transaccion);
      setHistorial(prev => [transaccion, ...prev]);
      setProcesando(false);
      setPaso(4);
    }, 2200);
  };

  const reiniciar = () => {
    setCarrito([]);
    setMetodoPago(null);
    setCompraFinalizada(null);
    setDatosPago({ nombre: "", numero: "", vencimiento: "", cvv: "" });
    setPaso(1);
  };

  const PASOS = ["Catálogo", "Carrito", "Pago", "Confirmación"];

  return (
    <div style={{ minHeight: "100vh", background: "#F7F5F0", fontFamily: "'Helvetica Neue', Arial, sans-serif", color: "#1a1a2e" }}>

      {/* Header */}
      <header style={{ background: "#1a1a2e", borderBottom: "3px solid #E8C547", padding: "0 2.5rem", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontSize: 22 }}>✈</span>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: 2, color: "#E8C547" }}>ALPHA TOURS</div>
            <div style={{ fontSize: 9, letterSpacing: 3, color: "#8899aa", textTransform: "uppercase" }}>Tienda de Servicios</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <button onClick={() => setVistaHistorial(!vistaHistorial)} style={{ padding: "8px 16px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.15)", background: "transparent", color: "#ccd", cursor: "pointer", fontSize: 13 }}>
            📜 Historial ({historial.length})
          </button>
          <button onClick={() => { setVistaHistorial(false); setPaso(2); }} style={{ position: "relative", padding: "8px 18px", borderRadius: 6, border: "1px solid #E8C547", background: "rgba(232,197,71,0.1)", color: "#E8C547", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
            🛒 Carrito
            {itemsEnCarrito > 0 && <span style={{ position: "absolute", top: -6, right: -6, width: 18, height: 18, borderRadius: "50%", background: "#E8C547", color: "#1a1a2e", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{itemsEnCarrito}</span>}
          </button>
        </div>
      </header>

      {/* Progress bar */}
      {!vistaHistorial && paso < 4 && (
        <div style={{ background: "#fff", borderBottom: "1px solid #e8e0d0", padding: "0 2.5rem", display: "flex", alignItems: "center", gap: 0, height: 52 }}>
          {PASOS.map((s, i) => {
            const num = i + 1;
            const activo = num === paso;
            const completado = num < paso;
            return (
              <div key={s} style={{ display: "flex", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 16px" }}>
                  <div style={{ width: 24, height: 24, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, background: completado ? "#E8C547" : activo ? "#1a1a2e" : "#e8e0d0", color: completado ? "#1a1a2e" : activo ? "#E8C547" : "#999", border: activo ? "2px solid #E8C547" : "none" }}>
                    {completado ? "✓" : num}
                  </div>
                  <span style={{ fontSize: 13, color: activo ? "#1a1a2e" : completado ? "#666" : "#bbb", fontWeight: activo ? 600 : 400 }}>{s}</span>
                </div>
                {i < PASOS.length - 1 && <div style={{ width: 40, height: 1, background: completado ? "#E8C547" : "#e8e0d0" }}></div>}
              </div>
            );
          })}
        </div>
      )}

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 1.5rem" }}>

        {/* ── HISTORIAL ── */}
        {vistaHistorial && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>Historial de Compras — RF 5.13</h2>
              <button onClick={() => setVistaHistorial(false)} style={{ padding: "8px 16px", borderRadius: 6, border: "1px solid #ddd", background: "transparent", cursor: "pointer", fontSize: 13 }}>✕ Cerrar</button>
            </div>
            {historial.length === 0 ? (
              <div style={{ textAlign: "center", padding: "4rem", color: "#999" }}>No hay compras registradas aún.</div>
            ) : historial.map(h => (
              <div key={h.id} style={{ background: "#fff", borderRadius: 12, border: "1px solid #e8e0d0", padding: "1.5rem", marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <div>
                    <div style={{ fontFamily: "monospace", fontSize: 13, color: "#E8C547", fontWeight: 700 }}>{h.id}</div>
                    <div style={{ fontSize: 12, color: "#999" }}>{h.fecha} — {h.hora}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "#1a1a2e" }}>{fmt(h.total)}</div>
                    <div style={{ fontSize: 12, color: "#999" }}>Método: {h.metodo}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {h.items.map(i => <span key={i.id} style={{ padding: "4px 10px", borderRadius: 20, background: "#f0f0f0", fontSize: 12 }}>{i.icono} {i.nombre} ×{i.cantidad}</span>)}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── CATÁLOGO — PASO 1 ── */}
        {!vistaHistorial && paso === 1 && (
          <div>
            <div style={{ marginBottom: "1.5rem" }}>
              <h2 style={{ fontSize: 26, fontWeight: 700, margin: 0, marginBottom: 6 }}>Catálogo de Servicios — RF 5.2</h2>
              <p style={{ color: "#666", fontSize: 14, margin: 0 }}>Selecciona los módulos, licencias y servicios que necesitas para tu operación</p>
            </div>

            <div style={{ display: "flex", gap: 8, marginBottom: "1.5rem" }}>
              {CATEGORIAS.map(c => (
                <button key={c} onClick={() => setFiltroCategoria(c)} style={{ padding: "8px 16px", borderRadius: 20, border: filtroCategoria === c ? "2px solid #1a1a2e" : "1px solid #ddd", background: filtroCategoria === c ? "#1a1a2e" : "#fff", color: filtroCategoria === c ? "#E8C547" : "#666", cursor: "pointer", fontSize: 13, fontWeight: filtroCategoria === c ? 600 : 400, transition: "all 0.2s" }}>
                  {c}
                </button>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
              {serviciosFiltrados.map(s => {
                const enCarrito = carrito.find(i => i.id === s.id);
                return (
                  <div key={s.id} style={{ background: "#fff", borderRadius: 14, border: "1px solid #e8e0d0", padding: "1.5rem", display: "flex", flexDirection: "column", transition: "box-shadow 0.2s, transform 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                    <div style={{ fontSize: 32, marginBottom: "0.75rem" }}>{s.icono}</div>
                    <div style={{ fontSize: 10, letterSpacing: 1.5, color: "#E8C547", textTransform: "uppercase", fontWeight: 700, marginBottom: 4 }}>{s.categoria}</div>
                    <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{s.nombre}</div>
                    <div style={{ fontSize: 13, color: "#666", lineHeight: 1.5, flex: 1, marginBottom: "1rem" }}>{s.descripcion}</div>
                    <div style={{ fontSize: 20, fontWeight: 700, color: "#1a1a2e", marginBottom: "1rem" }}>{fmt(s.precio)}<span style={{ fontSize: 12, color: "#999", fontWeight: 400 }}>/mes</span></div>
                    <button onClick={() => agregarAlCarrito(s)} style={{ padding: "10px", borderRadius: 8, border: enCarrito ? "2px solid #1a1a2e" : "1px solid #ddd", background: enCarrito ? "#1a1a2e" : "#fff", color: enCarrito ? "#E8C547" : "#333", cursor: "pointer", fontSize: 13, fontWeight: 600, transition: "all 0.2s" }}>
                      {enCarrito ? `✓ En carrito (${enCarrito.cantidad})` : "Agregar al carrito"}
                    </button>
                  </div>
                );
              })}
            </div>

            {carrito.length > 0 && (
              <div style={{ position: "fixed", bottom: 24, right: 24, background: "#1a1a2e", color: "#E8C547", padding: "14px 24px", borderRadius: 12, boxShadow: "0 8px 32px rgba(0,0,0,0.3)", display: "flex", alignItems: "center", gap: 16, fontSize: 14, fontWeight: 600 }}>
                <span>🛒 {itemsEnCarrito} items · {fmt(totalCarrito)}</span>
                <button onClick={() => setPaso(2)} style={{ padding: "8px 20px", borderRadius: 8, border: "none", background: "#E8C547", color: "#1a1a2e", cursor: "pointer", fontWeight: 700, fontSize: 13 }}>Ver carrito →</button>
              </div>
            )}
          </div>
        )}

        {/* ── CARRITO — PASO 2 ── */}
        {!vistaHistorial && paso === 2 && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "2rem" }}>
            <div>
              <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 0, marginBottom: "1.5rem" }}>Carrito de Compra — RF 5.3/5.4/5.5</h2>
              {carrito.length === 0 && (
                <div style={{ textAlign: "center", padding: "4rem", color: "#999", background: "#fff", borderRadius: 12, border: "1px dashed #ddd" }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>🛒</div>
                  <div>Tu carrito está vacío</div>
                  <button onClick={() => setPaso(1)} style={{ marginTop: 16, padding: "10px 24px", borderRadius: 8, border: "1px solid #1a1a2e", background: "transparent", cursor: "pointer", fontSize: 13 }}>Ver catálogo</button>
                </div>
              )}
              {carrito.map(item => (
                <div key={item.id} style={{ background: "#fff", borderRadius: 12, border: "1px solid #e8e0d0", padding: "1.25rem", marginBottom: 10, display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ fontSize: 28 }}>{item.icono}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 3 }}>{item.nombre}</div>
                    <div style={{ fontSize: 12, color: "#999" }}>{item.categoria}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <button onClick={() => cambiarCantidad(item.id, -1)} style={{ width: 28, height: 28, borderRadius: 6, border: "1px solid #ddd", background: "#f5f5f5", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                    <span style={{ fontSize: 15, fontWeight: 600, minWidth: 20, textAlign: "center" }}>{item.cantidad}</span>
                    <button onClick={() => cambiarCantidad(item.id, 1)} style={{ width: 28, height: 28, borderRadius: 6, border: "1px solid #ddd", background: "#f5f5f5", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                  </div>
                  <div style={{ minWidth: 110, textAlign: "right", fontWeight: 700, fontSize: 15 }}>{fmt(item.precio * item.cantidad)}</div>
                  <button onClick={() => eliminarItem(item.id)} style={{ padding: "6px 10px", borderRadius: 6, border: "1px solid #ffcdd2", background: "#fff5f5", color: "#c62828", cursor: "pointer", fontSize: 12 }}>✕</button>
                </div>
              ))}
              {carrito.length > 0 && <button onClick={() => setPaso(1)} style={{ marginTop: 8, padding: "10px 20px", borderRadius: 8, border: "1px solid #ddd", background: "transparent", cursor: "pointer", fontSize: 13, color: "#666" }}>+ Agregar más servicios</button>}
            </div>

            {/* Resumen */}
            <div>
              <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e8e0d0", padding: "1.5rem", position: "sticky", top: 120 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginTop: 0, marginBottom: "1.25rem" }}>Resumen — RF 5.6</h3>
                <div style={{ borderBottom: "1px solid #f0f0f0", paddingBottom: "1rem", marginBottom: "1rem" }}>
                  {carrito.map(i => (
                    <div key={i.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#555", marginBottom: 8 }}>
                      <span>{i.nombre} ×{i.cantidad}</span>
                      <span>{fmt(i.precio * i.cantidad)}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#777", marginBottom: 6 }}>
                  <span>Subtotal</span><span>{fmt(totalCarrito)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#777", marginBottom: "1rem" }}>
                  <span>IVA (19%)</span><span>{fmt(iva)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, fontWeight: 700, borderTop: "2px solid #1a1a2e", paddingTop: "1rem", marginBottom: "1.25rem" }}>
                  <span>Total</span><span>{fmt(totalConIva)}</span>
                </div>
                <button onClick={() => setPaso(3)} disabled={carrito.length === 0} style={{ width: "100%", padding: "14px", borderRadius: 10, border: "none", background: carrito.length > 0 ? "#1a1a2e" : "#e0e0e0", color: carrito.length > 0 ? "#E8C547" : "#999", cursor: carrito.length > 0 ? "pointer" : "not-allowed", fontSize: 15, fontWeight: 700 }}>
                  Proceder al pago →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── PAGO — PASO 3 ── */}
        {!vistaHistorial && paso === 3 && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "2rem" }}>
            <div>
              <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 0, marginBottom: "1.5rem" }}>Método de Pago — RF 5.8/5.9</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: "1.5rem" }}>
                {METODOS_PAGO.map(m => (
                  <div key={m.id} onClick={() => setMetodoPago(m.id)} style={{ padding: "1.25rem", borderRadius: 12, border: metodoPago === m.id ? "2px solid #1a1a2e" : "1px solid #ddd", background: metodoPago === m.id ? "#f0f4ff" : "#fff", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, transition: "all 0.2s" }}>
                    <span style={{ fontSize: 24 }}>{m.icono}</span>
                    <span style={{ fontSize: 14, fontWeight: metodoPago === m.id ? 600 : 400 }}>{m.label}</span>
                  </div>
                ))}
              </div>

              {metodoPago === "tarjeta" && (
                <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e8e0d0", padding: "1.5rem" }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 0, marginBottom: "1rem" }}>Datos de la tarjeta</h3>
                  <div style={{ marginBottom: "1rem" }}>
                    <label style={{ display: "block", fontSize: 11, color: "#999", letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Nombre en la tarjeta</label>
                    <input value={datosPago.nombre} onChange={e => setDatosPago({ ...datosPago, nombre: e.target.value })} placeholder="NOMBRE APELLIDO" style={{ width: "100%", padding: "12px 14px", borderRadius: 8, border: "1px solid #ddd", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                  </div>
                  <div style={{ marginBottom: "1rem" }}>
                    <label style={{ display: "block", fontSize: 11, color: "#999", letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Número de tarjeta</label>
                    <input value={datosPago.numero} onChange={e => setDatosPago({ ...datosPago, numero: e.target.value })} placeholder="1234 5678 9012 3456" maxLength={19} style={{ width: "100%", padding: "12px 14px", borderRadius: 8, border: "1px solid #ddd", fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "monospace" }} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 11, color: "#999", letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Vencimiento</label>
                      <input value={datosPago.vencimiento} onChange={e => setDatosPago({ ...datosPago, vencimiento: e.target.value })} placeholder="MM/AA" maxLength={5} style={{ width: "100%", padding: "12px 14px", borderRadius: 8, border: "1px solid #ddd", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 11, color: "#999", letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>CVV</label>
                      <input value={datosPago.cvv} onChange={e => setDatosPago({ ...datosPago, cvv: e.target.value })} placeholder="123" maxLength={3} type="password" style={{ width: "100%", padding: "12px 14px", borderRadius: 8, border: "1px solid #ddd", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                    </div>
                  </div>
                </div>
              )}

              {metodoPago && metodoPago !== "tarjeta" && (
                <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e8e0d0", padding: "2rem", textAlign: "center", color: "#666" }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>{METODOS_PAGO.find(m => m.id === metodoPago)?.icono}</div>
                  <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>Serás redirigido a {METODOS_PAGO.find(m => m.id === metodoPago)?.label}</div>
                  <div style={{ fontSize: 13 }}>Al confirmar, se abrirá la pasarela de pago segura.</div>
                </div>
              )}
            </div>

            {/* Panel resumen compra */}
            <div>
              <div style={{ background: "#1a1a2e", color: "#e8e0d0", borderRadius: 14, padding: "1.5rem", position: "sticky", top: 120 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 0, marginBottom: "1rem", color: "#E8C547" }}>Resumen de compra</h3>
                {carrito.map(i => (
                  <div key={i.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 8 }}>
                    <span style={{ color: "#aaa" }}>{i.icono} {i.nombre} ×{i.cantidad}</span>
                    <span>{fmt(i.precio * i.cantidad)}</span>
                  </div>
                ))}
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1rem", marginTop: "1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#888", marginBottom: 6 }}>
                    <span>IVA (19%)</span><span>{fmt(iva)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, fontWeight: 700, color: "#E8C547", marginTop: "0.75rem" }}>
                    <span>Total</span><span>{fmt(totalConIva)}</span>
                  </div>
                </div>
                <button onClick={procesarPago} disabled={!metodoPago || procesando} style={{ marginTop: "1.25rem", width: "100%", padding: "14px", borderRadius: 10, border: "none", background: metodoPago && !procesando ? "#E8C547" : "rgba(255,255,255,0.1)", color: metodoPago && !procesando ? "#1a1a2e" : "#666", cursor: metodoPago && !procesando ? "pointer" : "not-allowed", fontSize: 15, fontWeight: 700, transition: "all 0.2s" }}>
                  {procesando ? "Procesando pago..." : "Confirmar y pagar"}
                </button>
                <div style={{ textAlign: "center", fontSize: 11, color: "#555", marginTop: "0.75rem" }}>🔒 Pago 100% seguro — RF 5.9</div>
                <button onClick={() => setPaso(2)} style={{ marginTop: 10, width: "100%", padding: "10px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "#888", cursor: "pointer", fontSize: 12 }}>← Volver al carrito</button>
              </div>
            </div>
          </div>
        )}

        {/* ── CONFIRMACIÓN — PASO 4 ── */}
        {!vistaHistorial && paso === 4 && compraFinalizada && (
          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg, #E8C547, #f5d77e)", margin: "0 auto 1rem", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>✓</div>
              <h2 style={{ fontSize: 26, fontWeight: 700, margin: 0, marginBottom: 8 }}>¡Compra exitosa! — RF 5.10</h2>
              <p style={{ color: "#666", margin: 0 }}>Los módulos adquiridos han sido habilitados en tu cuenta — RF 5.12</p>
            </div>

            {/* Comprobante — RF 5.11 */}
            <div style={{ background: "#fff", borderRadius: 16, border: "2px solid #e8e0d0", padding: "2rem", marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "1px dashed #e0e0e0" }}>
                <div>
                  <div style={{ fontSize: 11, letterSpacing: 2, color: "#999", textTransform: "uppercase", marginBottom: 4 }}>Comprobante Digital</div>
                  <div style={{ fontSize: 18, fontWeight: 700 }}>Alpha Tours SAS</div>
                  <div style={{ fontSize: 13, color: "#666" }}>NIT: 900.123.456-7</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "monospace", fontWeight: 700, color: "#E8C547", fontSize: 14 }}>{compraFinalizada.id}</div>
                  <div style={{ fontSize: 12, color: "#999" }}>{compraFinalizada.fecha} · {compraFinalizada.hora}</div>
                </div>
              </div>

              {compraFinalizada.items.map(i => (
                <div key={i.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f5f5f5" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 20 }}>{i.icono}</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{i.nombre}</div>
                      <div style={{ fontSize: 12, color: "#999" }}>{i.categoria} · ×{i.cantidad}</div>
                    </div>
                  </div>
                  <div style={{ fontWeight: 600 }}>{fmt(i.precio * i.cantidad)}</div>
                </div>
              ))}

              <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #f5f5f5" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#777", marginBottom: 6 }}><span>Subtotal</span><span>{fmt(compraFinalizada.total / 1.19)}</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#777", marginBottom: "1rem" }}><span>IVA (19%)</span><span>{fmt(compraFinalizada.total - compraFinalizada.total / 1.19)}</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, fontWeight: 700 }}><span>Total pagado</span><span style={{ color: "#1a1a2e" }}>{fmt(compraFinalizada.total)}</span></div>
              </div>

              <div style={{ marginTop: "1rem", padding: "12px", borderRadius: 8, background: "#f0f4ff", display: "flex", alignItems: "center", gap: 10, fontSize: 13 }}>
                <span>💳</span>
                <span>Pago procesado mediante <strong>{METODOS_PAGO.find(m => m.id === compraFinalizada.metodo)?.label || compraFinalizada.metodo}</strong></span>
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button onClick={() => { setVistaHistorial(true); setPaso(1); }} style={{ padding: "12px 24px", borderRadius: 10, border: "1px solid #ddd", background: "#fff", cursor: "pointer", fontSize: 14 }}>Ver historial</button>
              <button onClick={reiniciar} style={{ padding: "12px 28px", borderRadius: 10, border: "none", background: "#1a1a2e", color: "#E8C547", cursor: "pointer", fontSize: 14, fontWeight: 700 }}>Nueva compra</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

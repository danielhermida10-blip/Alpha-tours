import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .p-root {
    min-height: 100vh;
    background: #08090f;
    font-family: 'DM Sans', sans-serif;
    color: #e8e4dc;
  }

  /* HEADER */
  .p-header {
    background: #0d0f1a;
    border-bottom: 1px solid rgba(212,168,83,0.15);
    padding: 0 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
    position: sticky;
    top: 0;
    z-index: 10;
  }
  .p-logo {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 700;
    color: #fff;
  }
  .p-logo span { color: #d4a853; }
  .p-logout {
    background: none;
    border: 1px solid rgba(255,255,255,0.12);
    color: rgba(232,228,220,0.5);
    padding: 7px 16px;
    border-radius: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: 0.5px;
  }
  .p-logout:hover { border-color: rgba(212,168,83,0.5); color: #d4a853; }

  /* LAYOUT */
  .p-body {
    display: flex;
    gap: 28px;
    max-width: 1140px;
    margin: 0 auto;
    padding: 36px 24px;
  }

  /* LEFT SIDEBAR */
  .p-sidebar {
    width: 280px;
    flex-shrink: 0;
  }

  /* RF 4.1 — Tarjeta de perfil */
  .p-profile-card {
    background: #0d0f1a;
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 16px;
    overflow: hidden;
    margin-bottom: 16px;
  }
  .p-profile-banner {
    height: 72px;
    background: linear-gradient(135deg, #1a2a1a 0%, #2a1a0a 50%, #0a1a2a 100%);
    position: relative;
  }
  .p-profile-banner::after {
    content: '';
    position: absolute;
    inset: 0;
    background: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Ccircle cx='20' cy='20' r='1' fill='%23d4a853' opacity='0.15'/%3E%3C/g%3E%3C/svg%3E");
  }
  .p-avatar-wrap {
    display: flex;
    justify-content: center;
    margin-top: -28px;
    position: relative;
    z-index: 1;
  }
  .p-avatar {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: linear-gradient(135deg, #d4a853, #a07020);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 700;
    color: #0a0e1a;
    border: 3px solid #08090f;
  }
  .p-profile-info {
    padding: 12px 20px 20px;
    text-align: center;
  }
  .p-profile-name {
    font-family: 'Playfair Display', serif;
    font-size: 18px;
    font-weight: 600;
    color: #fff;
    margin-bottom: 4px;
  }
  .p-profile-email {
    font-size: 12px;
    color: rgba(232,228,220,0.4);
    margin-bottom: 10px;
  }
  .p-badge {
    display: inline-block;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    background: rgba(212,168,83,0.15);
    color: #d4a853;
    border: 1px solid rgba(212,168,83,0.3);
    margin-bottom: 14px;
  }
  .p-stats {
    display: flex;
    border-top: 1px solid rgba(255,255,255,0.06);
    padding-top: 14px;
    gap: 8px;
  }
  .p-stat {
    flex: 1;
    text-align: center;
  }
  .p-stat-val {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    font-weight: 700;
    color: #fff;
  }
  .p-stat-lbl {
    font-size: 10px;
    color: rgba(232,228,220,0.35);
    letter-spacing: 0.5px;
    margin-top: 1px;
  }
  .p-stat + .p-stat { border-left: 1px solid rgba(255,255,255,0.06); }

  /* NAV */
  .p-nav {
    background: #0d0f1a;
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 16px;
    padding: 8px;
  }
  .p-nav-btn {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    border-radius: 10px;
    background: none;
    border: none;
    color: rgba(232,228,220,0.5);
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.18s;
    text-align: left;
  }
  .p-nav-btn .icon { font-size: 16px; }
  .p-nav-btn:hover { background: rgba(255,255,255,0.04); color: #e8e4dc; }
  .p-nav-btn.active { background: rgba(212,168,83,0.12); color: #d4a853; }

  /* MAIN CONTENT */
  .p-main { flex: 1; min-width: 0; }

  .p-section-title {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 600;
    color: #fff;
    margin-bottom: 6px;
  }
  .p-section-sub {
    font-size: 13px;
    color: rgba(232,228,220,0.4);
    margin-bottom: 22px;
  }

  /* RF 4.2 — Tabs */
  .p-tabs {
    display: flex;
    gap: 4px;
    background: #0d0f1a;
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 12px;
    padding: 4px;
    margin-bottom: 22px;
  }
  .p-tab {
    flex: 1;
    padding: 9px 8px;
    border-radius: 9px;
    background: none;
    border: none;
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    font-weight: 500;
    color: rgba(232,228,220,0.4);
    cursor: pointer;
    transition: all 0.18s;
    letter-spacing: 0.3px;
  }
  .p-tab.active { background: rgba(212,168,83,0.15); color: #d4a853; }
  .p-tab:hover:not(.active) { color: rgba(232,228,220,0.7); }

  /* CARDS GRID */
  .p-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  /* PACKAGE CARD */
  .p-pkg-card {
    background: #0d0f1a;
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 14px;
    overflow: hidden;
    transition: border-color 0.2s;
    position: relative;
  }
  .p-pkg-card:hover { border-color: rgba(212,168,83,0.2); }
  .p-pkg-img {
    width: 100%;
    height: 110px;
    object-fit: cover;
    display: block;
    background: linear-gradient(135deg, #1a1a2a, #2a1a1a);
  }
  .p-pkg-body { padding: 14px; }
  .p-pkg-name {
    font-family: 'Playfair Display', serif;
    font-size: 15px;
    font-weight: 600;
    color: #fff;
    margin-bottom: 4px;
  }
  .p-pkg-dest {
    font-size: 11px;
    color: rgba(232,228,220,0.4);
    margin-bottom: 10px;
    letter-spacing: 0.5px;
  }

  /* RF 4.4 — Fecha de viaje */
  .p-pkg-date {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    color: #d4a853;
    margin-bottom: 4px;
  }
  .p-pkg-purchase {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    color: rgba(232,228,220,0.3);
    margin-bottom: 12px;
  }

  /* Status badge */
  .p-status {
    display: inline-block;
    padding: 3px 9px;
    border-radius: 20px;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
  .p-status.confirmada { background: rgba(70,180,120,0.12); color: #60d090; border: 1px solid rgba(70,180,120,0.3); }
  .p-status.pendiente  { background: rgba(212,168,83,0.12);  color: #d4a853; border: 1px solid rgba(212,168,83,0.3); }
  .p-status.cancelada  { background: rgba(220,70,70,0.1);    color: #e07070; border: 1px solid rgba(220,70,70,0.25); }

  /* RF 4.3 — Botón cancelar */
  .p-btn-cancel {
    width: 100%;
    padding: 8px;
    background: transparent;
    border: 1px solid rgba(220,70,70,0.3);
    border-radius: 8px;
    color: rgba(220,100,100,0.7);
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.18s;
    letter-spacing: 0.5px;
  }
  .p-btn-cancel:hover { background: rgba(220,70,70,0.08); color: #e07070; border-color: rgba(220,70,70,0.5); }

  .p-fav-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 18px;
    filter: drop-shadow(0 1px 3px rgba(0,0,0,0.6));
  }

  /* MODAL CANCELAR */
  .p-modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(8,9,15,0.88);
    backdrop-filter: blur(6px);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.2s;
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  .p-modal {
    background: #0d0f1a;
    border: 1px solid rgba(220,70,70,0.25);
    border-radius: 16px;
    padding: 36px;
    width: 360px;
    animation: slideUp 0.22s;
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(14px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .p-modal-icon { font-size: 32px; margin-bottom: 14px; }
  .p-modal-title {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    color: #fff;
    margin-bottom: 8px;
  }
  .p-modal-sub {
    font-size: 13px;
    color: rgba(232,228,220,0.45);
    margin-bottom: 24px;
    line-height: 1.6;
  }
  .p-modal-actions { display: flex; gap: 10px; }
  .p-btn-ghost {
    flex: 1;
    padding: 11px;
    background: transparent;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 9px;
    color: rgba(232,228,220,0.5);
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.18s;
  }
  .p-btn-ghost:hover { border-color: rgba(255,255,255,0.25); color: #e8e4dc; }
  .p-btn-danger {
    flex: 1;
    padding: 11px;
    background: rgba(220,70,70,0.15);
    border: 1px solid rgba(220,70,70,0.4);
    border-radius: 9px;
    color: #e07070;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.18s;
  }
  .p-btn-danger:hover { background: rgba(220,70,70,0.25); }

  .p-empty {
    text-align: center;
    padding: 60px 20px;
    color: rgba(232,228,220,0.25);
    font-size: 13px;
  }
  .p-empty-icon { font-size: 36px; display: block; margin-bottom: 10px; }
`;

const IMAGES = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=70",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=70",
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&q=70",
  "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=400&q=70",
];

const INITIAL_PACKAGES = [
  { id: 1, name: "Aventura en Patagonia", dest: "🇨🇱 Chile", status: "confirmada", travelDate: "2025-08-14", purchaseDate: "2025-03-02", price: "$1,850", fav: false, img: 0 },
  { id: 2, name: "Caribe Colombiano", dest: "🇨🇴 Colombia", status: "confirmada", travelDate: "2025-07-20", purchaseDate: "2025-04-10", price: "$980", fav: true, img: 1 },
  { id: 3, name: "Ruta Maya México", dest: "🇲🇽 México", status: "pendiente", travelDate: "2025-09-05", purchaseDate: "2025-05-01", price: "$1,200", fav: false, img: 2 },
  { id: 4, name: "Torres del Paine", dest: "🇦🇷 Argentina", status: "cancelada", travelDate: "2025-06-10", purchaseDate: "2025-02-14", price: "$2,100", fav: false, img: 3 },
];

const NAV_ITEMS = [
  { id: "paquetes", label: "Mis Reservas", icon: "🗺️" },
  { id: "favoritos", label: "Favoritos", icon: "❤️" },
  { id: "perfil", label: "Mi Perfil", icon: "👤" },
];

const TABS = ["Todos", "Confirmadas", "Pendientes", "Canceladas"];

function formatDate(d) {
  const [y, m, day] = d.split("-");
  const months = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
  return `${parseInt(day)} ${months[parseInt(m)-1]} ${y}`;
}

export default function UserProfile({ user }) {
  const userData = user || { email: "daniel@alphatours.com", role: "Cliente", name: "Daniel Felipe Hermida" };
  const initials = userData.name.split(" ").slice(0,2).map(w => w[0]).join("").toUpperCase();

  const [packages, setPackages] = useState(INITIAL_PACKAGES);
  const [tab, setTab] = useState("Todos");
  const [nav, setNav] = useState("paquetes");
  const [cancelTarget, setCancelTarget] = useState(null);

  // RF 4.2 — Filtrar por tab
  const filtered = packages.filter(p => {
    if (nav === "favoritos") return p.fav;
    if (tab === "Todos") return true;
    return p.status === tab.toLowerCase().slice(0, -1) + (tab === "Canceladas" ? "da" : tab === "Confirmadas" ? "da" : "te");
  });

  const statusMap = { "Todos": null, "Confirmadas": "confirmada", "Pendientes": "pendiente", "Canceladas": "cancelada" };
  const filteredByTab = nav === "favoritos"
    ? packages.filter(p => p.fav)
    : packages.filter(p => !statusMap[tab] || p.status === statusMap[tab]);

  // RF 4.3 — Cancelar reserva
  const confirmCancel = () => {
    setPackages(prev => prev.map(p => p.id === cancelTarget.id ? { ...p, status: "cancelada" } : p));
    setCancelTarget(null);
  };

  const stats = {
    total: packages.length,
    active: packages.filter(p => p.status === "confirmada").length,
    fav: packages.filter(p => p.fav).length,
  };

  return (
    <>
      <style>{styles}</style>
      <div className="p-root">
        <header className="p-header">
          <div className="p-logo">Alpha<span>Tours</span></div>
          <button className="p-logout">Cerrar sesión</button>
        </header>

        <div className="p-body">
          {/* SIDEBAR */}
          <aside className="p-sidebar">
            {/* RF 4.1 — Perfil */}
            <div className="p-profile-card">
              <div className="p-profile-banner" />
              <div className="p-avatar-wrap">
                <div className="p-avatar">{initials}</div>
              </div>
              <div className="p-profile-info">
                <div className="p-profile-name">{userData.name}</div>
                <div className="p-profile-email">{userData.email}</div>
                <div className="p-badge">{userData.role}</div>
                <div className="p-stats">
                  <div className="p-stat">
                    <div className="p-stat-val">{stats.total}</div>
                    <div className="p-stat-lbl">Viajes</div>
                  </div>
                  <div className="p-stat">
                    <div className="p-stat-val">{stats.active}</div>
                    <div className="p-stat-lbl">Activas</div>
                  </div>
                  <div className="p-stat">
                    <div className="p-stat-val">{stats.fav}</div>
                    <div className="p-stat-lbl">Favoritos</div>
                  </div>
                </div>
              </div>
            </div>

            <nav className="p-nav">
              {NAV_ITEMS.map(n => (
                <button key={n.id} className={`p-nav-btn ${nav === n.id ? "active" : ""}`} onClick={() => setNav(n.id)}>
                  <span className="icon">{n.icon}</span> {n.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* MAIN */}
          <main className="p-main">
            {nav === "perfil" ? (
              <>
                <div className="p-section-title">Mi Perfil</div>
                <div className="p-section-sub">RF 4.1 — Información del usuario registrado</div>
                <div style={{ background: "#0d0f1a", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: 28 }}>
                  {[["Nombre completo", userData.name], ["Correo electrónico", userData.email], ["Rol asignado", userData.role], ["Miembro desde", "Enero 2024"]].map(([label, val]) => (
                    <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <span style={{ fontSize: 12, color: "rgba(232,228,220,0.4)", letterSpacing: 1, textTransform: "uppercase", fontWeight: 500 }}>{label}</span>
                      <span style={{ fontSize: 14, color: "#e8e4dc" }}>{val}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="p-section-title">
                  {nav === "favoritos" ? "Paquetes Favoritos" : "Mis Reservas"}
                </div>
                <div className="p-section-sub">
                  {nav === "favoritos" ? "RF 4.2 — Paquetes marcados como favoritos" : "RF 4.2, 4.3, 4.4 — Reservas, estado y fechas de viaje"}
                </div>

                {/* RF 4.2 — Tabs de estado */}
                {nav !== "favoritos" && (
                  <div className="p-tabs">
                    {TABS.map(t => (
                      <button key={t} className={`p-tab ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>{t}</button>
                    ))}
                  </div>
                )}

                {filteredByTab.length === 0 ? (
                  <div className="p-empty">
                    <span className="p-empty-icon">🌍</span>
                    No hay paquetes en esta categoría.
                  </div>
                ) : (
                  <div className="p-grid">
                    {filteredByTab.map(pkg => (
                      <div className="p-pkg-card" key={pkg.id}>
                        <img className="p-pkg-img" src={IMAGES[pkg.img]} alt={pkg.name} />
                        {pkg.fav && <span className="p-fav-icon">❤️</span>}
                        <div className="p-pkg-body">
                          <div className="p-pkg-name">{pkg.name}</div>
                          <div className="p-pkg-dest">{pkg.dest}</div>
                          <span className={`p-status ${pkg.status}`}>{pkg.status}</span>
                          {/* RF 4.4 — Fecha de viaje */}
                          <div className="p-pkg-date">
                            <span>✈️</span> Viaje: {formatDate(pkg.travelDate)}
                          </div>
                          {/* RF 4.2 — Fecha de compra */}
                          <div className="p-pkg-purchase">
                            <span>🛒</span> Compra: {formatDate(pkg.purchaseDate)} · {pkg.price}
                          </div>
                          {/* RF 4.3 — Cancelar (solo reservas activas/pendientes) */}
                          {(pkg.status === "confirmada" || pkg.status === "pendiente") && (
                            <button className="p-btn-cancel" onClick={() => setCancelTarget(pkg)}>
                              Cancelar reserva
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      {/* RF 4.3 — Modal confirmación cancelación */}
      {cancelTarget && (
        <div className="p-modal-backdrop" onClick={() => setCancelTarget(null)}>
          <div className="p-modal" onClick={e => e.stopPropagation()}>
            <div className="p-modal-icon">⚠️</div>
            <div className="p-modal-title">Cancelar reserva</div>
            <div className="p-modal-sub">
              ¿Estás seguro de que deseas cancelar <strong style={{ color: "#e8e4dc" }}>{cancelTarget.name}</strong>?<br />
              Esta acción no se puede deshacer.
            </div>
            <div className="p-modal-actions">
              <button className="p-btn-ghost" onClick={() => setCancelTarget(null)}>Conservar</button>
              <button className="p-btn-danger" onClick={confirmCancel}>Sí, cancelar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

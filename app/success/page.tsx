export default function Success() {
  return (
    <div className="page-shell">
      <div className="header-bar">
        <h1>My Print Shop</h1>
        <p>fine art prints &middot; shipped right to your door!</p>
      </div>
      <div className="content" style={{ textAlign: "center", padding: "50px 28px" }}>
        <div className="badge" style={{ fontSize: 13, padding: "4px 14px", marginBottom: 16 }}>
          ORDER CONFIRMED
        </div>
        <h2 style={{ color: "#2a5ba8" }}>Thanks for your order!</h2>
        <p style={{ color: "#556", fontSize: 13 }}>
          A confirmation email is on its way. Your print will ship soon.
        </p>
      </div>
      <div className="footer-note">&copy; {new Date().getFullYear()} My Print Shop — all rights reserved</div>
    </div>
  );
}

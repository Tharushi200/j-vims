import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { reviewService } from "../../services/reviewService";
import {
  Star, MessageSquare, CheckCircle2, EyeOff, Eye, Trash2,
  RefreshCw, Award, Users, ArrowLeft
} from "lucide-react";

const ReviewsAdmin = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");
  const [actionLoading, setActionLoading] = useState({});

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const data = await reviewService.getAllReviews();
      setReviews(data);
    } catch (err) {
      console.error("Failed to load reviews", err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleApprove = async (id) => {
    setActionLoading(prev => ({ ...prev, [id]: true }));
    try {
      const updated = await reviewService.toggleApproveReview(id);
      setReviews(prev =>
        prev.map(r => r.id === id ? { ...r, status: updated?.status || (r.status === "APPROVED" ? "HIDDEN" : "APPROVED") } : r)
      );
    } catch (err) {
      console.error("Toggle failed", err);
    } finally {
      setActionLoading(prev => ({ ...prev, [id]: false }));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this review permanently?")) return;
    setActionLoading(prev => ({ ...prev, [id]: true }));
    try {
      await reviewService.deleteReview(id);
      setReviews(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    } finally {
      setActionLoading(prev => ({ ...prev, [id]: false }));
    }
  };

  const filtered = reviews.filter(r => filter === "ALL" ? true : r.status === filter);
  const stats = {
    total: reviews.length,
    approved: reviews.filter(r => r.status === "APPROVED").length,
    hidden: reviews.filter(r => r.status === "HIDDEN").length,
    avgRating: reviews.length
      ? (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length).toFixed(1)
      : "0.0"
  };

  const renderStars = (rating) =>
    [1, 2, 3, 4, 5].map(s => (
      <Star key={s} size={14} style={{ color: s <= rating ? "#fbbf24" : "rgba(255,255,255,0.15)", fill: s <= rating ? "#fbbf24" : "none" }} />
    ));

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-LK", { year: "numeric", month: "short", day: "numeric" });
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "2rem auto", padding: "0 2rem" }} className="animate-fade-in">
      <button 
        type="button" 
        onClick={() => navigate('/admin/dashboard')} 
        className="btn btn-secondary" 
        style={{ marginBottom: '1.25rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 0.9rem' }}
      >
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "2rem", marginBottom: "0.25rem", color: "var(--accent-amber)" }}>Reviews & Feedback</h1>
          <p style={{ color: "var(--text-secondary)" }}>Manage customer reviews — approve, hide or delete inappropriate feedback</p>
        </div>
        <button onClick={fetchReviews} className="btn btn-secondary" style={{ gap: "0.5rem" }}>
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1.25rem", marginBottom: "2rem" }}>
        {[
          { label: "Total Reviews", value: stats.total, icon: <MessageSquare size={20} />, color: "#60a5fa" },
          { label: "Approved", value: stats.approved, icon: <CheckCircle2 size={20} />, color: "#34d399" },
          { label: "Hidden", value: stats.hidden, icon: <EyeOff size={20} />, color: "#f87171" },
          { label: "Avg Rating", value: `${stats.avgRating} ★`, icon: <Star size={20} />, color: "#fbbf24" },
        ].map((card, i) => (
          <div key={i} className="glass-panel" style={{ padding: "1.25rem", display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ padding: "0.65rem", borderRadius: "10px", background: `${card.color}20`, color: card.color }}>{card.icon}</div>
            <div>
              <div style={{ fontSize: "1.5rem", fontWeight: "800" }}>{card.value}</div>
              <div style={{ color: "var(--text-secondary)", fontSize: "0.78rem" }}>{card.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
        {["ALL", "APPROVED", "HIDDEN"].map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={filter === tab ? "btn btn-crimson" : "btn btn-secondary"}
            style={{ fontSize: "0.85rem", padding: "0.4rem 1rem" }}
          >
            {tab === "ALL" ? `All (${stats.total})` : tab === "APPROVED" ? `Approved (${stats.approved})` : `Hidden (${stats.hidden})`}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "4rem", color: "var(--text-secondary)" }}>Loading reviews...</div>
      ) : filtered.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: "center", padding: "4rem" }}>
          <MessageSquare size={48} style={{ color: "var(--text-muted)", marginBottom: "1rem" }} />
          <h3>No Reviews Found</h3>
          <p style={{ color: "var(--text-secondary)", marginTop: "0.5rem" }}>No {filter !== "ALL" ? filter.toLowerCase() : ""} reviews at the moment.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {filtered.map(review => (
            <div
              key={review.id}
              className="glass-panel"
              style={{ padding: "1.5rem", borderLeft: `4px solid ${review.status === "APPROVED" ? "var(--accent-emerald)" : "var(--accent-red)"}`, opacity: review.status === "HIDDEN" ? 0.7 : 1, transition: "opacity 0.3s" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      <Users size={14} style={{ color: "var(--text-muted)" }} />
                      <span style={{ fontWeight: "700", fontSize: "0.95rem" }}>{review.customerName}</span>
                    </div>
                    {review.verifiedBuyer && (
                      <span className="badge badge-emerald" style={{ fontSize: "0.72rem", gap: "0.3rem" }}>
                        <Award size={11} /> Verified Buyer
                      </span>
                    )}
                    <span className={`badge ${review.status === "APPROVED" ? "badge-emerald" : "badge-navy"}`} style={{ fontSize: "0.72rem" }}>
                      {review.status}
                    </span>
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "0.6rem" }}>
                    <span style={{ color: "var(--accent-amber)" }}>{review.vehicleName}</span>
                    {" · "}
                    <span>{review.orderNumber}</span>
                    {" · "}
                    <span>{formatDate(review.createdAt)}</span>
                  </div>
                  <div style={{ display: "flex", gap: "0.2rem", marginBottom: "0.75rem" }}>
                    {renderStars(review.rating)}
                    <span style={{ marginLeft: "0.4rem", fontSize: "0.8rem", color: "#fbbf24", fontWeight: "700" }}>{review.rating}/5</span>
                  </div>
                  <p style={{ fontSize: "0.9rem", color: "var(--text-primary)", lineHeight: "1.6", maxWidth: "680px" }}>"{review.comment}"</p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", minWidth: "160px" }}>
                  <button
                    onClick={() => handleToggleApprove(review.id)}
                    disabled={actionLoading[review.id]}
                    className={review.status === "APPROVED" ? "btn btn-secondary" : "btn btn-primary"}
                    style={{ fontSize: "0.82rem", padding: "0.4rem 0.85rem", gap: "0.4rem", width: "100%" }}
                  >
                    {review.status === "APPROVED" ? (<><EyeOff size={14} /> Hide Review</>) : (<><Eye size={14} /> Approve</>)}
                  </button>
                  <button
                    onClick={() => handleDelete(review.id)}
                    disabled={actionLoading[review.id]}
                    className="btn"
                    style={{ fontSize: "0.82rem", padding: "0.4rem 0.85rem", gap: "0.4rem", width: "100%", background: "rgba(239, 68, 68, 0.12)", border: "1px solid rgba(239, 68, 68, 0.35)", color: "#f87171" }}
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewsAdmin;

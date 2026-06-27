import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import api from '../../services/api';
import { StarIcon, ClockIcon, ArrowLeftIcon, ArrowRightIcon, PencilIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

const Testimonials = () => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ nama: '', role: '', perusahaan: '', teks: '', rating: 5 });
    const [submitLoading, setSubmitLoading] = useState(false);
    const [submitMessage, setSubmitMessage] = useState(null);

    const isAuthenticated = !!localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    const canSubmit = isAuthenticated && (userRole === 'Pelamar' || userRole === 'Perusahaan');

    const colors = {
        cardBg: isDark ? '#120b06' : '#ffffff',
        border: isDark ? '1px solid #262626' : '1px solid #e5e5e5',
        textMain: isDark ? '#fef3c7' : '#1c1917',
        accent: '#ea580c',
        textMuted: isDark ? '#a3a3a3' : '#57534e',
        bg: isDark ? '#080402' : '#f5f5f4'
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const res = await api.get('/testimonials');
            setTestimonials(res.data);
        } catch (err) {
            console.error('Gagal memuat testimonial', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (testimonials.length > 0 && activeIndex >= testimonials.length) {
            setActiveIndex(0);
        }
    }, [testimonials, activeIndex]);

    const prevTestimonial = () => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const nextTestimonial = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.nama.trim() || !formData.teks.trim()) return;

        setSubmitLoading(true);
        setSubmitMessage(null);
        try {
            await api.post('/testimonials', formData);
            setSubmitMessage({ type: 'success', text: 'Testimonial berhasil dikirim! Menunggu persetujuan admin.' });
            setFormData({ nama: '', role: '', perusahaan: '', teks: '', rating: 5 });
            setShowForm(false);
        } catch (err) {
            setSubmitMessage({ type: 'error', text: err.response?.data?.message || 'Gagal mengirim testimonial' });
        } finally {
            setSubmitLoading(false);
        }
    };

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <span key={i} style={{ color: i < rating ? '#f59e0b' : (isDark ? '#262626' : '#d4d4d4'), cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
                onClick={() => setFormData(prev => ({ ...prev, rating: i + 1 }))}>
                <StarIcon style={{ width: '18px', height: '18px' }} />
            </span>
        ));
    };

    return (
        <section style={{
            padding: '80px 20px',
            background: colors.bg,
            borderTop: colors.border,
            transition: 'all 0.3s ease'
        }}>
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                <span style={{ color: colors.accent, fontSize: '13px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase' }}>Testimonial</span>
                <h2 style={{
                    color: colors.textMain,
                    fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
                    marginTop: '12px',
                    fontWeight: '800',
                    letterSpacing: '-0.02em'
                }}>
                    Apa Kata <span style={{ color: colors.accent }}>Mereka?</span>
                </h2>
                <p style={{ color: colors.textMuted, marginTop: '12px', fontSize: 'clamp(14px, 4vw, 16px)', padding: '0 15px' }}>
                    {testimonials.length > 0
                        ? `${testimonials.length} testimonial dari pengguna setia kami`
                        : 'Belum ada testimonial. Jadilah yang pertama!'}
                </p>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '40px', color: colors.textMuted }}>
                    <ClockIcon style={{width: '1em', height: '1em', verticalAlign: 'middle', marginRight: '4px'}} /> Memuat testimonial...
                </div>
            ) : testimonials.length > 0 ? (
                <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative', padding: '0 15px' }}>
                    <button
                        onClick={prevTestimonial}
                        style={{
                            position: 'absolute',
                            left: '-60px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: colors.cardBg,
                            border: colors.border,
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            color: colors.textMain,
                            cursor: 'pointer',
                            fontSize: '18px',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = colors.accent; e.currentTarget.style.color = colors.accent; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = isDark ? '#262626' : '#e5e5e5'; e.currentTarget.style.color = colors.textMain; }}
                    >
                        <ArrowLeftIcon style={{width: '18px', height: '18px'}} />
                    </button>

                    <div style={{
                        padding: 'clamp(30px, 5vw, 40px)',
                        background: colors.cardBg,
                        border: colors.border,
                        borderRadius: '24px',
                        textAlign: 'center',
                        transition: 'all 0.3s ease',
                        position: 'relative'
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: '20px',
                            right: '30px',
                            fontSize: '60px',
                            opacity: 0.1,
                            color: colors.accent,
                            fontFamily: 'serif'
                        }}>
                            ❝
                        </div>

                        {(() => {
                            const t = testimonials[activeIndex];
                            const initials = t.nama.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
                            return (
                                <>
                                    <div style={{
                                        width: '70px',
                                        height: '70px',
                                        background: `linear-gradient(135deg, ${colors.accent} 0%, #f59e0b 100%)`,
                                        borderRadius: '50%',
                                        margin: '0 auto 20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#fff',
                                        fontWeight: '800',
                                        fontSize: '22px',
                                        boxShadow: '0 8px 20px rgba(234,88,12,0.3)'
                                    }}>
                                        {initials}
                                    </div>

                                    <div style={{ marginBottom: '16px' }}>
                                        {[...Array(t.rating || 5)].map((_, i) => (
                                            <StarIcon key={i} style={{ width: '18px', height: '18px', color: '#f59e0b', marginRight: '4px' }} />
                                        ))}
                                    </div>

                                    <p style={{
                                        color: colors.textMuted,
                                        fontStyle: 'italic',
                                        lineHeight: '1.7',
                                        fontSize: 'clamp(14px, 4vw, 16px)',
                                        marginBottom: '24px'
                                    }}>
                                        "{t.teks}"
                                    </p>

                                    <p style={{ fontWeight: '800', color: colors.accent, marginBottom: '4px', fontSize: 'clamp(14px, 4vw, 16px)' }}>
                                        {t.nama}
                                    </p>
                                    <p style={{ color: colors.textMuted, fontSize: 'clamp(12px, 3.5vw, 13px)' }}>
                                        {t.role}{t.role && t.perusahaan ? ' • ' : ''}{t.perusahaan || ''}
                                    </p>
                                </>
                            );
                        })()}
                    </div>

                    <button
                        onClick={nextTestimonial}
                        style={{
                            position: 'absolute',
                            right: '-60px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: colors.cardBg,
                            border: colors.border,
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            color: colors.textMain,
                            cursor: 'pointer',
                            fontSize: '18px',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = colors.accent; e.currentTarget.style.color = colors.accent; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = isDark ? '#262626' : '#e5e5e5'; e.currentTarget.style.color = colors.textMain; }}
                    >
                        <ArrowRightIcon style={{width: '18px', height: '18px'}} />
                    </button>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '30px', flexWrap: 'wrap' }}>
                        {testimonials.map((_, idx) => (
                            <div
                                key={idx}
                                onClick={() => setActiveIndex(idx)}
                                style={{
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    background: idx === activeIndex ? colors.accent : (isDark ? '#262626' : '#d4d4d4'),
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: '40px', color: colors.textMuted, fontSize: '16px' }}>
                    Belum ada testimonial yang ditampilkan.
                </div>
            )}

            {canSubmit && (
                <div style={{ maxWidth: '600px', margin: '40px auto 0', textAlign: 'center' }}>
                    {!showForm ? (
                        <button
                            onClick={() => setShowForm(true)}
                            style={{
                                padding: '14px 32px',
                                borderRadius: '30px',
                                border: 'none',
                                background: `linear-gradient(135deg, ${colors.accent}, #f59e0b)`,
                                color: '#fff',
                                fontWeight: '700',
                                fontSize: '15px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 4px 15px rgba(234,88,12,0.3)'
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(234,88,12,0.4)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(234,88,12,0.3)'; }}
                        >
                            <PencilIcon style={{width: '1em', height: '1em', verticalAlign: 'middle', marginRight: '8px'}} /> Tulis Testimonial
                        </button>
                    ) : (
                        <form onSubmit={handleSubmit} style={{
                            background: colors.cardBg,
                            border: colors.border,
                            borderRadius: '20px',
                            padding: 'clamp(24px, 4vw, 32px)',
                            textAlign: 'left'
                        }}>
                            <h3 style={{ color: colors.textMain, fontSize: '18px', fontWeight: '800', marginBottom: '20px', textAlign: 'center' }}>
                                Bagikan Pengalaman Anda
                            </h3>

                            {submitMessage && (
                                <div style={{
                                    padding: '12px 16px',
                                    borderRadius: '10px',
                                    marginBottom: '16px',
                                    background: submitMessage.type === 'success' ? (isDark ? '#064e3b' : '#d1fae5') : (isDark ? '#7f1d1d' : '#fee2e2'),
                                    color: submitMessage.type === 'success' ? '#10b981' : '#ef4444',
                                    fontSize: '13px',
                                    fontWeight: '600'
                                }}>
                                    {submitMessage.text}
                                </div>
                            )}

                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ color: colors.textMuted, fontSize: '12px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Nama Lengkap *</label>
                                <input
                                    type="text" name="nama" value={formData.nama} onChange={handleInputChange} required
                                    style={{
                                        width: '100%', padding: '12px', borderRadius: '10px',
                                        border: colors.border, background: isDark ? '#1c1917' : '#f5f5f4',
                                        color: colors.textMain, fontSize: '14px', outline: 'none',
                                        boxSizing: 'border-box'
                                    }}
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                                <div>
                                    <label style={{ color: colors.textMuted, fontSize: '12px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Posisi/Pekerjaan</label>
                                    <input
                                        type="text" name="role" value={formData.role} onChange={handleInputChange}
                                        placeholder="Contoh: Fullstack Developer"
                                        style={{
                                            width: '100%', padding: '12px', borderRadius: '10px', boxSizing: 'border-box',
                                            border: colors.border, background: isDark ? '#1c1917' : '#f5f5f4',
                                            color: colors.textMain, fontSize: '14px', outline: 'none'
                                        }}
                                    />
                                </div>
                                <div>
                                    <label style={{ color: colors.textMuted, fontSize: '12px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Perusahaan</label>
                                    <input
                                        type="text" name="perusahaan" value={formData.perusahaan} onChange={handleInputChange}
                                        placeholder="Nama perusahaan"
                                        style={{
                                            width: '100%', padding: '12px', borderRadius: '10px', boxSizing: 'border-box',
                                            border: colors.border, background: isDark ? '#1c1917' : '#f5f5f4',
                                            color: colors.textMain, fontSize: '14px', outline: 'none'
                                        }}
                                    />
                                </div>
                            </div>

                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ color: colors.textMuted, fontSize: '12px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Rating</label>
                                <div style={{ fontSize: '24px' }}>{renderStars(formData.rating)}</div>
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ color: colors.textMuted, fontSize: '12px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Testimonial *</label>
                                <textarea
                                    name="teks" value={formData.teks} onChange={handleInputChange} required
                                    rows="4"
                                    placeholder="Ceritakan pengalaman Anda menggunakan platform ini..."
                                    style={{
                                        width: '100%', padding: '12px', borderRadius: '10px', boxSizing: 'border-box',
                                        border: colors.border, background: isDark ? '#1c1917' : '#f5f5f4',
                                        color: colors.textMain, fontSize: '14px', outline: 'none', resize: 'vertical',
                                        fontFamily: 'inherit'
                                    }}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                                <button type="button" onClick={() => { setShowForm(false); setSubmitMessage(null); }}
                                    style={{
                                        padding: '12px 24px', borderRadius: '30px', border: `1px solid ${isDark ? '#262626' : '#e5e5e5'}`,
                                        background: 'transparent', color: colors.textMuted, cursor: 'pointer', fontWeight: '600', fontSize: '14px'
                                    }}>
                                    Batal
                                </button>
                                <button type="submit" disabled={submitLoading}
                                    style={{
                                        padding: '12px 24px', borderRadius: '30px', border: 'none',
                                        background: `linear-gradient(135deg, ${colors.accent}, #f59e0b)`,
                                        color: '#fff', cursor: 'pointer', fontWeight: '700', fontSize: '14px',
                                        opacity: submitLoading ? 0.7 : 1
                                    }}>
                                    {submitLoading ? <><ClockIcon style={{width: '1em', height: '1em', verticalAlign: 'middle', marginRight: '4px'}} /> Mengirim...</> : <><RocketLaunchIcon style={{width: '1em', height: '1em', verticalAlign: 'middle', marginRight: '4px'}} /> Kirim Testimonial</>}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            )}

            <style>{`
                @media (max-width: 768px) {
                    button[style*="position: absolute"] {
                        display: none !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default Testimonials;

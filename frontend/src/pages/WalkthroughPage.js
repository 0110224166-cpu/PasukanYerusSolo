import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { PencilSquareIcon, MagnifyingGlassIcon, DocumentIcon, RocketLaunchIcon, ArrowRightIcon, ForwardIcon } from '@heroicons/react/24/outline';

const stepIcons = [PencilSquareIcon, MagnifyingGlassIcon, DocumentIcon];

const steps = [
    {
        title: 'Daftar Akun Gratis',
        desc: 'Isi data diri dan buat profil profesionalmu dalam 2 menit',
        color: '#ea580c'
    },
    {
        title: 'Temukan Lowongan Ideal',
        desc: 'Filter berdasarkan skill, lokasi, dan gaji yang kamu inginkan',
        color: '#f59e0b'
    },
    {
        title: 'Kirim Lamaran Cepat',
        desc: 'Lamar pekerjaan impian dengan sekali klik, pantau status secara real-time',
        color: '#10b981'
    },
];

const WalkthroughPage = () => {
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/home', { replace: true });
        }
    }, []);

    const bg = isDark ? '#0c0a09' : '#f5f5f4';
    const cardBg = isDark ? '#1c1917' : '#ffffff';
    const textMain = isDark ? '#fef3c7' : '#1c1917';
    const textMuted = isDark ? '#a8a29e' : '#57534e';
    const border = isDark ? '#262626' : '#e5e5e5';

    const slide = steps[currentSlide];
    const isLastSlide = currentSlide === steps.length - 1;

    const handleNext = () => {
        if (isLastSlide) {
            navigate('/home');
        } else {
            setCurrentSlide(prev => prev + 1);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            background: bg,
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Skip button */}
            <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                zIndex: 10,
            }}>
                <button
                    onClick={() => navigate('/home')}
                    style={{
                        background: 'transparent',
                        border: `1px solid ${border}`,
                        borderRadius: '30px',
                        padding: '10px 24px',
                        color: textMuted,
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = isDark ? '#292524' : '#e5e5e5';
                        e.currentTarget.style.color = textMain;
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = textMuted;
                    }}
                >
                    <ForwardIcon style={{ width: '14px', height: '14px', marginRight: '6px', verticalAlign: 'middle' }} /> Skip
                </button>
            </div>

            {/* Slide content */}
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '40px 24px 20px',
            }}>
                {/* Step number badge */}
                <div style={{
                    marginBottom: '12px',
                    fontSize: '13px',
                    fontWeight: '700',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: slide.color,
                }}>
                    Langkah {currentSlide + 1} dari {steps.length}
                </div>

                {/* Icon */}
                <div style={{
                    width: '120px',
                    height: '120px',
                    background: `linear-gradient(135deg, ${slide.color}, ${slide.color}dd)`,
                    borderRadius: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '40px',
                    boxShadow: `0 20px 60px ${slide.color}33`,
                    transform: 'scale(1)',
                    transition: 'all 0.5s ease',
                }}>
                    {React.createElement(stepIcons[currentSlide], { style: { width: '52px', height: '52px', color: '#fff' } })}
                </div>

                {/* Title */}
                <h2 style={{
                    color: textMain,
                    fontSize: 'clamp(24px, 6vw, 32px)',
                    fontWeight: '800',
                    textAlign: 'center',
                    marginBottom: '16px',
                    letterSpacing: '-0.02em',
                    lineHeight: '1.3',
                }}>
                    {slide.title}
                </h2>

                {/* Description */}
                <p style={{
                    color: textMuted,
                    fontSize: 'clamp(15px, 4vw, 17px)',
                    textAlign: 'center',
                    maxWidth: '400px',
                    lineHeight: '1.7',
                    margin: '0 auto',
                }}>
                    {slide.desc}
                </p>
            </div>

            {/* Bottom section */}
            <div style={{
                padding: '20px 24px 40px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '24px',
            }}>
                {/* Dots */}
                <div style={{
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'center',
                }}>
                    {steps.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentSlide(i)}
                            style={{
                                width: i === currentSlide ? '28px' : '10px',
                                height: '10px',
                                borderRadius: '10px',
                                border: 'none',
                                background: i === currentSlide ? slide.color : (isDark ? '#444' : '#d4d4d4'),
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                padding: 0,
                            }}
                        />
                    ))}
                </div>

                {/* Next / Start button */}
                <button
                    onClick={handleNext}
                    style={{
                        width: '100%',
                        maxWidth: '320px',
                        padding: '16px 32px',
                        borderRadius: '50px',
                        border: 'none',
                        background: `linear-gradient(135deg, ${slide.color}, ${slide.color}cc)`,
                        color: '#fff',
                        fontSize: '17px',
                        fontWeight: '800',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: `0 8px 30px ${slide.color}40`,
                        letterSpacing: '0.3px',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-3px)';
                        e.currentTarget.style.boxShadow = `0 12px 40px ${slide.color}60`;
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = `0 8px 30px ${slide.color}40`;
                    }}
                >
                    {isLastSlide ? (
                        <span><RocketLaunchIcon style={{ width: '1em', height: '1em', verticalAlign: 'middle', marginRight: '6px' }} /> Mulai Jelajahi</span>
                    ) : (
                        <span>Lanjut <ArrowRightIcon style={{ width: '1em', height: '1em', verticalAlign: 'middle', marginLeft: '4px' }} /></span>
                    )}
                </button>


            </div>
        </div>
    );
};

export default WalkthroughPage;

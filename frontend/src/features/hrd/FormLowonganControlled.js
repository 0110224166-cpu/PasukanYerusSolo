import React, { useState, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { formatInputRupiah, parseRupiah } from '../../utils/formatRupiah';
import { MegaphoneIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

const kategoriOptions = [
    'Teknologi / Informasi',
    'Keuangan / Akuntansi',
    'Pemasaran / Sales',
    'Sumber Daya Manusia',
    'Administrasi',
    'Pendidikan / Pelatihan',
    'Kesehatan',
    'Manufaktur / Engineering',
    'Desain / Kreatif',
    'Hospitality / Pariwisata',
    'Hukum',
    'Logistik / Supply Chain',
    'Media / Komunikasi',
];

const FormLowonganControlled = ({ onSaveJob, isMobile }) => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';
    const [jobData, setJobData] = useState({
        judul_posisi: '', 
        kategori: '', 
        tipe_pekerjaan: 'Full-time', 
        gaji: '', 
        lokasi: '', 
        deskripsi_pekerjaan: ''
    });
    const [kategoriLain, setKategoriLain] = useState('');
    const [isKategoriLain, setIsKategoriLain] = useState(false);

    const colors = {
        cardBg: isDark ? '#120b06' : '#ffffff',
        border: isDark ? '1px solid #291a0e' : '1px solid #ebdcd0',
        inputBg: isDark ? '#080402' : '#fdfdfd',
        textMain: isDark ? '#fef3c7' : '#291107',
        textMuted: isDark ? '#9e8476' : '#735b4e',
        accent: '#ea580c'
    };

    const handleChange = (e) => {
        setJobData({ ...jobData, [e.target.name]: e.target.value });
    };

    const handleKategoriChange = (e) => {
        const val = e.target.value;
        if (val === 'Lainnya') {
            setIsKategoriLain(true);
            setJobData({ ...jobData, kategori: '' });
        } else {
            setIsKategoriLain(false);
            setJobData({ ...jobData, kategori: val });
            setKategoriLain('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = { ...jobData };
        if (isKategoriLain && kategoriLain.trim()) {
            payload.kategori = kategoriLain.trim();
        }
        onSaveJob(payload);
        setJobData({ judul_posisi: '', kategori: '', tipe_pekerjaan: 'Full-time', gaji: '', lokasi: '', deskripsi_pekerjaan: '' });
        setKategoriLain('');
        setIsKategoriLain(false);
    };

    const inputFocusStyle = {
        borderColor: '#ea580c',
        boxShadow: '0 0 0 2px rgba(234, 88, 12, 0.2)'
    };

    const styles = {
        formCard: {
            background: colors.cardBg,
            border: colors.border,
            borderRadius: '24px',
            padding: isMobile ? '20px' : '32px',
            transition: 'all 0.3s ease'
        },
        title: { fontSize: isMobile ? '20px' : '24px', fontWeight: '800', color: '#ea580c', margin: '0 0 6px 0' },
        subtitle: { color: colors.textMuted, fontSize: '13px', margin: '0 0 28px 0', lineHeight: '1.5' },
        gridContainer: {
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '20px',
            marginBottom: '20px'
        },
        formGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
        fullWidth: { gridColumn: isMobile ? 'span 1' : 'span 2', display: 'flex', flexDirection: 'column', gap: '6px' },
        label: { fontSize: '12px', fontWeight: '800', color: colors.accent, textTransform: 'uppercase', letterSpacing: '0.5px' },
        input: {
            width: '100%',
            padding: '12px 16px',
            borderRadius: '12px',
            border: colors.border,
            backgroundColor: colors.inputBg,
            color: colors.textMain,
            fontSize: '14px',
            outline: 'none',
            fontWeight: '500',
            boxSizing: 'border-box',
            transition: 'all 0.3s ease'
        },
        textarea: {
            width: '100%',
            padding: '14px 16px',
            borderRadius: '12px',
            border: colors.border,
            backgroundColor: colors.inputBg,
            color: colors.textMain,
            fontSize: '14px',
            outline: 'none',
            fontWeight: '500',
            minHeight: '120px',
            resize: 'vertical',
            boxSizing: 'border-box',
            lineHeight: '1.5',
            transition: 'all 0.3s ease'
        },
        submitBtn: {
            width: '100%',
            padding: '14px',
            borderRadius: '12px',
            border: 'none',
            background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
            color: '#ffffff',
            fontWeight: '700',
            fontSize: '14px',
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(234, 88, 12, 0.15)',
            transition: 'all 0.3s ease'
        }
    };

    return (
        <div style={styles.formCard}>
            <h2 style={styles.title}><MegaphoneIcon style={{width: '1em', height: '1em', verticalAlign: 'middle', marginRight: '4px'}} /> Publikasikan Lowongan</h2>
            <p style={styles.subtitle}>Buat dan terbitkan berkas kualifikasi pekerjaan baru ke dalam sistem portal pencarian kerja.</p>
            
            <form onSubmit={handleSubmit}>
                <div style={styles.gridContainer}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Judul Posisi</label>
                        <input 
                            type="text" 
                            name="judul_posisi" 
                            placeholder="Contoh: Senior Fullstack Engineer" 
                            value={jobData.judul_posisi} 
                            onChange={handleChange} 
                            required 
                            style={styles.input}
                            onFocus={(e) => Object.assign(e.currentTarget.style, inputFocusStyle)}
                            onBlur={(e) => {
                                e.currentTarget.style.borderColor = colors.border;
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Kategori</label>
                        <select 
                            name="kategori" 
                            value={jobData.kategori || ''} 
                            onChange={handleKategoriChange} 
                            required={!isKategoriLain}
                            style={{
                                ...styles.input,
                                color: !jobData.kategori && !isKategoriLain ? (isDark ? '#6b7280' : '#9ca3af') : colors.textMain
                            }}
                            onFocus={(e) => Object.assign(e.currentTarget.style, inputFocusStyle)}
                            onBlur={(e) => {
                                e.currentTarget.style.borderColor = colors.border;
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <option value="" disabled hidden>Pilih kategori</option>
                            {kategoriOptions.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                            <option value="Lainnya">Lainnya</option>
                        </select>
                        {isKategoriLain && (
                            <input 
                                type="text" 
                                placeholder="Tulis kategori Anda..." 
                                value={kategoriLain} 
                                onChange={(e) => setKategoriLain(e.target.value)}
                                style={{
                                    ...styles.input,
                                    marginTop: '8px',
                                    fontWeight: '400'
                                }}
                                onFocus={(e) => Object.assign(e.currentTarget.style, inputFocusStyle)}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = colors.border;
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            />
                        )}
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Tipe Pekerjaan</label>
                        <select 
                            name="tipe_pekerjaan" 
                            value={jobData.tipe_pekerjaan} 
                            onChange={handleChange} 
                            style={styles.input}
                            onFocus={(e) => Object.assign(e.currentTarget.style, inputFocusStyle)}
                            onBlur={(e) => {
                                e.currentTarget.style.borderColor = colors.border;
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Remote">Remote</option>
                            <option value="Contract">Contract</option>
                        </select>
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Estimasi Gaji</label>
                        <input 
                            type="text" 
                            name="gaji" 
                            placeholder="Rp 12.000.000" 
                            value={formatInputRupiah(jobData.gaji)}
                            onChange={(e) => {
                                const raw = parseRupiah(e.target.value);
                                setJobData({ ...jobData, gaji: raw });
                            }}
                            style={styles.input}
                            onFocus={(e) => Object.assign(e.currentTarget.style, inputFocusStyle)}
                            onBlur={(e) => {
                                e.currentTarget.style.borderColor = colors.border;
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        />
                    </div>
                    <div style={styles.fullWidth}>
                        <label style={styles.label}>Lokasi Penempatan</label>
                        <input 
                            type="text" 
                            name="lokasi" 
                            placeholder="Contoh: Surakarta, Jawa Tengah (Hybrid)" 
                            value={jobData.lokasi} 
                            onChange={handleChange} 
                            required 
                            style={styles.input}
                            onFocus={(e) => Object.assign(e.currentTarget.style, inputFocusStyle)}
                            onBlur={(e) => {
                                e.currentTarget.style.borderColor = colors.border;
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        />
                    </div>
                    <div style={styles.fullWidth}>
                        <label style={styles.label}>Deskripsi & Spesifikasi Pekerjaan</label>
                        <textarea 
                            name="deskripsi_pekerjaan" 
                            placeholder="Tuliskan deskripsi tugas pokok, kualifikasi wajib, serta benefit yang didapatkan..." 
                            value={jobData.deskripsi_pekerjaan} 
                            onChange={handleChange} 
                            required 
                            style={styles.textarea}
                            onFocus={(e) => Object.assign(e.currentTarget.style, inputFocusStyle)}
                            onBlur={(e) => {
                                e.currentTarget.style.borderColor = colors.border;
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        />
                    </div>
                </div>
                <button 
                    type="submit" 
                    style={styles.submitBtn}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(234,88,12,0.3)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 16px rgba(234, 88, 12, 0.15)';
                    }}
                >
                    <RocketLaunchIcon style={{width: '1em', height: '1em', verticalAlign: 'middle', marginRight: '4px'}} /> Simpan & Publikasikan Lowongan
                </button>
            </form>
        </div>
    );
};

export default FormLowonganControlled;

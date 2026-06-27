import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import { formatRupiah } from '../../utils/formatRupiah';
import { BuildingOfficeIcon, FolderOpenIcon, CurrencyDollarIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
const JobCard = ({ job, isFull }) => {
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';

    const getBadgeStyle = (type) => {
        const colors = {
            'Full-time': { bg: '#16a34a', text: '#fff' },
            'Remote': { bg: '#8b5cf6', text: '#fff' },
            'Contract': { bg: '#ea580c', text: '#fff' }
        };
        const style = colors[type] || { bg: isDark ? '#475569' : '#94a3b8', text: isDark ? '#d4d4d8' : '#fff' };
        
        return {
            background: style.bg,
            color: style.text,
            fontSize: '10px',
            padding: '4px 8px',
            borderRadius: '6px',
            position: 'absolute',
            top: '12px',
            right: '12px',
            fontWeight: 'bold',
            transition: 'all 0.3s ease'
        };
    };

    const cardStyles = {
        position: 'relative',
        background: isDark ? '#120b06' : '#ffffff',
        borderRadius: '16px',
        padding: '20px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        border: `1px solid ${isDark ? '#262626' : '#e5e5e5'}`,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: isDark ? '0 4px 6px -1px rgba(0, 0, 0, 0.2)' : '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
    };

    const titleStyles = {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '12px',
        marginTop: '8px',
        color: isDark ? '#fef3c7' : '#1c1917',
        transition: 'color 0.3s ease'
    };

    const categoryStyles = {
        fontSize: '13px',
        color: isDark ? '#a3a3a3' : '#57534e',
        marginBottom: '8px'
    };

    const salaryStyles = {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#ea580c',
        marginBottom: '12px'
    };

    const detailSectionStyles = {
        marginTop: '12px',
        paddingTop: '12px',
        borderTop: `1px solid ${isDark ? '#262626' : '#e5e5e5'}`
    };

    const descStyles = {
        fontSize: '13px',
        color: isDark ? '#a3a3a3' : '#57534e',
        lineHeight: '1.5',
        marginBottom: '12px'
    };

    const applyBtnStyles = {
        width: '100%',
        padding: '10px',
        background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'all 0.3s ease'
    };

    return (
        <div 
            onClick={() => navigate(`/job/${job.id}`)} 
            style={cardStyles}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = '#ea580c';
                e.currentTarget.style.boxShadow = isDark ? '0 20px 25px -12px rgba(0, 0, 0, 0.4)' : '0 20px 25px -12px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = isDark ? '#262626' : '#e5e5e5';
                e.currentTarget.style.boxShadow = isDark ? '0 4px 6px -1px rgba(0, 0, 0, 0.2)' : '0 4px 6px -1px rgba(0, 0, 0, 0.05)';
            }}
        >
            {job.type && <span style={getBadgeStyle(job.type)}>{job.type}</span>}

            {/* Company Branding */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '10px'
            }}>
                <div style={{ position: 'relative', width: '36px', height: '36px', flexShrink: 0 }}>
                    {job.logo && (
                        <img 
                            src={`http://localhost:5005/uploads/${job.logo}`}
                            alt={job.nama_perusahaan || 'Perusahaan'}
                            style={{
                                position: 'absolute', inset: 0,
                                width: '100%', height: '100%',
                                borderRadius: '10px', objectFit: 'cover',
                                border: `1px solid ${isDark ? '#262626' : '#e5e5e5'}`,
                                zIndex: 1
                            }}
                            onError={(e) => { e.target.style.display = 'none'; }}
                        />
                    )}
                    <div style={{
                        width: '36px', height: '36px',
                        borderRadius: '10px',
                        background: 'linear-gradient(135deg, #ea580c, #f59e0b)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '16px', color: '#fff'
                    }}>
                        <BuildingOfficeIcon style={{width: '16px', height: '16px'}} />
                    </div>
                </div>
                <span style={{
                    fontSize: '13px', fontWeight: '600',
                    color: isDark ? '#d4d4d8' : '#57534e'
                }}>
                    {job.nama_perusahaan || 'Perusahaan'}
                </span>
            </div>

            <h3 style={titleStyles}>{job.title || "Posisi Tidak Diketahui"}</h3>
            
            <p style={categoryStyles}><FolderOpenIcon style={{width: '1em', height: '1em', verticalAlign: 'middle', marginRight: '4px'}} /> Kategori: {job.kategori || "Umum"}</p>
            <p style={salaryStyles}><CurrencyDollarIcon style={{width: '1em', height: '1em', verticalAlign: 'middle', marginRight: '4px'}} /> {formatRupiah(job.gaji)}</p>
            
            {isFull && (
                <div style={detailSectionStyles}>
                    <p style={descStyles}>{job.deskripsi || "Deskripsi tidak tersedia."}</p>
                    <button 
                        style={applyBtnStyles}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(234, 88, 12, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        Lamar Sekarang <ArrowRightIcon style={{width: '1em', height: '1em', verticalAlign: 'middle', marginLeft: '4px'}} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default JobCard;
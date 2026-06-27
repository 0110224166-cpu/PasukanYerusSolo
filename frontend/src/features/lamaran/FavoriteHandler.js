import React, { useState } from 'react';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';

const FavoriteHandler = ({ jobId, onAddToFavoriteServer, appTheme }) => {
    const [isFavorited, setIsFavorited] = useState(false);
    const isDark = appTheme === 'dark';

    const handleToggleFavorite = () => {
        const nextState = !isFavorited;
        setIsFavorited(nextState);
        
        // Memastikan fungsi callback dari server tereksekusi dengan aman saat ditambahkan
        if (nextState && typeof onAddToFavoriteServer === 'function') {
            onAddToFavoriteServer(jobId);
        }
    };

    // Desain Tombol Kustom Modern (Pengganti ActionButton agar tidak terjadi error import)
    const buttonStyle = {
        width: '100%',
        padding: '12px',
        borderRadius: '12px',
        fontWeight: '700',
        fontSize: '13px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        boxSizing: 'border-box',
        marginTop: '8px',
        border: isFavorited 
            ? '1px solid #16a34a' 
            : (isDark ? '1px solid #3d2514' : '1px solid #eaddd3'),
        background: isFavorited 
            ? (isDark ? '#062f17' : '#f0fdf4') 
            : 'transparent',
        color: isFavorited 
            ? (isDark ? '#4ade80' : '#16a34a') 
            : (isDark ? '#9e8476' : '#6b7280')
    };

    return (
        <button 
            type="button"
            onClick={handleToggleFavorite} 
            style={buttonStyle}
            onMouseEnter={(e) => {
                if (!isFavorited) {
                    e.currentTarget.style.background = isDark ? '#1c1007' : '#fcf8f5';
                }
            }}
            onMouseLeave={(e) => {
                if (!isFavorited) {
                    e.currentTarget.style.background = 'transparent';
                }
            }}
        >
            {isFavorited ? <StarIcon style={{ width: '1em', height: '1em', verticalAlign: 'middle' }} /> : <StarOutlineIcon style={{ width: '1em', height: '1em', verticalAlign: 'middle' }} />}
            {isFavorited ? 'Tersimpan di Favorit' : 'Tambah ke Favorit'}
        </button>
    );
};

export default FavoriteHandler;

import React, { useState } from 'react';
import api from '../../services/api';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';

const FavoriteService = ({ jobId }) => {
    const [isFavorited, setIsFavorited] = useState(false);

    const sendFavoriteToBackend = async () => {
        try {
            const response = await api.post('/favorit', { id_lowongan: jobId });
            alert(response.data.message || 'Berhasil disimpan ke favorit!');
            setIsFavorited(true);
        } catch (err) {
            alert(err.response?.data?.message || 'Gagal menyimpan favorit');
        }
    };

    return (
        <div style={{ marginTop: '2px', marginBottom: '6px' }}>
            <button
                onClick={sendFavoriteToBackend}
                style={{
                    display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 14px', borderRadius: '10px',
                    fontSize: '13px', fontWeight: '700', border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                    background: isFavorited ? 'rgba(34, 197, 94, 0.15)' : 'rgba(234, 88, 12, 0.1)',
                    color: isFavorited ? '#22c55e' : '#ea580c',
                    width: '100%', justifyContent: 'center'
                }}
            >
                {isFavorited ? <span><StarSolid style={{ width: '1em', height: '1em', verticalAlign: 'middle', marginRight: '4px', color: '#22c55e' }} /> Tersimpan di Favorit</span> : <span><StarOutline style={{ width: '1em', height: '1em', verticalAlign: 'middle', marginRight: '4px' }} /> Tambah ke Favorit</span>}
            </button>
        </div>
    );
};

export default FavoriteService;
export const formatRupiah = (angka) => {
    if (!angka && angka !== 0) return 'Tidak disebutkan';
    const str = String(angka).replace(/[^\d]/g, '');
    const num = parseInt(str);
    if (isNaN(num)) return angka;
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(num);
};

export const formatInputRupiah = (value) => {
    if (!value) return '';
    const num = value.replace(/\D/g, '');
    if (!num) return '';
    return 'Rp ' + num.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const parseRupiah = (formatted) => {
    if (!formatted) return '';
    return formatted.replace(/[^\d]/g, '');
};

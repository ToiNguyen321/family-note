export const formatDateVN = (dateString?: string) => {
  if (!dateString) return 'Chưa có thông tin';
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN');
};

export const formatDateVNShort = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export const lunarSuffix = (isLunar?: boolean) => (isLunar ? ' (Âm lịch)' : '');

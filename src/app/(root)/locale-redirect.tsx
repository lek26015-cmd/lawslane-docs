'use client';

import { useEffect } from 'react';

// หน้า static ไม่มี server redirect — เลือกภาษาจากที่ผู้อ่านเคยเลือก หรือภาษาของเบราว์เซอร์ ไม่เจอใช้ไทย
export function LocaleRedirect() {
  useEffect(() => {
    let l: string | null = null;
    try {
      l = localStorage.getItem('docs-locale');
    } catch {}
    if (!l || !['th', 'en', 'zh'].includes(l)) {
      const n = (navigator.language || '').toLowerCase();
      l = n.startsWith('zh') ? 'zh' : n.startsWith('en') ? 'en' : 'th';
    }
    location.replace(`/${l}${location.hash}`);
  }, []);
  return null;
}

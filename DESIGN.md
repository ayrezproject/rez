# DESIGN.md: Sistem Desain & Token Visual (Hallmark & Anti-Slop Compliant)

/* Hallmark · genre: modern-minimal · theme: cobalt-clean · pre-emit critique: P5 H5 E5 S5 R5 V5 */

Dokumen ini mendefinisikan sistem token desain, aturan tipografi, palet warna, dan disiplin interaksi untuk antarmuka formulir triase lapangan SPPG BGN.

---

## 1. Prinsip Desain (Design Principles)
* **Karakter Resmi & Fungsional (Modern-Minimalis Instansi):** Mengadopsi bahasa visual institusional resmi BGN: bersih, tegas, dengan keterbacaan tinggi di bawah sinar matahari saat inspeksi lapangan.
* **Bukan Template AI Generik (Anti-AI Slop):**
  * Dilarang menggunakan tajuk miring (*italic headers*). Semua heading tegak (roman).
  * Dilarang menggambar mock chrome browser palsu (traffic light dots, fake URL bar).
  * Hindari kartu seragam membosankan: gunakan ritme visual yang bervariasi dengan penanda nomor urut seksi yang tegas.
* **Disiplin Sentuhan Mobile (Touch-First):** Target sentuh minimal 44×44px untuk semua tombol radio, dropzone, dan pemilih opsi.
* **Ukuran Maksimal Kolom Teks (Measure):** Panjang baris teks bacaan dibatasi di bawah 80 karakter untuk kenyamanan membaca.

---

## 2. Token Tipografi (Typography Tokens)
* **Font Utama:** `Inter`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `Roboto`, `sans-serif`.
* **Skala Tipografi:**
  * **H1 (Judul Formulir):** `24px` (mobile) / `28px` (desktop) · Weight `700` (Bold) · Line-height `1.25`
  * **H2 (Judul Seksi 01–14):** `18px` · Weight `600` (Semibold) · Line-height `1.35`
  * **Label Input:** `14px` · Weight `500` (Medium) · Line-height `1.4`
  * **Teks Bantuan / Hint:** `12px` · Weight `400` (Normal) · Text-slate-500
  * **Nilai Skor / Badge:** `14px` · Weight `700` (Bold) · Monospace / Tabular numbers

---

## 3. Token Warna (Color Tokens)

```css
:root {
  /* Brand & Primer BGN */
  --color-primary: #2563eb;         /* oklch(55% 0.22 255) - Biru resmi instansi */
  --color-primary-hover: #1d4ed8;   /* Biru lebih dalam */
  --color-primary-light: #eff6ff;   /* Latar highlight pilihan aktif */

  /* Permukaan & Latar */
  --color-paper: #ffffff;           /* Latar kartu formulir */
  --color-surface-subtle: #f8fafc;  /* Latar belakang halaman luar */
  --color-border: #e2e8f0;          /* Border elemen input netral */
  --color-border-hover: #cbd5e1;    /* Border saat hover */
  --color-border-focus: #3b82f6;    /* Ring fokus aksesibilitas */

  /* Teks */
  --color-text-main: #0f172a;       /* Slate 900 - Kontras maksimal */
  --color-text-muted: #64748b;      /* Slate 500 - Penjelasan & hint */
  --color-text-inverse: #ffffff;

  /* Status & Rekomendasi Kelayakan */
  --color-grade-a: #16a34a;         /* Emerald 600 - Layak Dilanjutkan */
  --color-grade-a-bg: #f0fdf4;
  --color-grade-b: #d97706;         /* Amber 600 - Layak dg Perbaikan */
  --color-grade-b-bg: #fffbeb;
  --color-grade-d: #dc2626;         /* Red 600 - Tidak Layak Dilanjutkan */
  --color-grade-d-bg: #fef2f2;

  /* Peringatan & Validasi */
  --color-error-asterisk: #ef4444;  /* Tanda bintang field wajib */
}
```

---

## 4. Disiplin Interaksi 8 Status (8-State Checklist)
Setiap elemen kontrol (tombol, input teks, radio card) memiliki deklarasi visual untuk 8 status:
1. **Default:** Border `--color-border`, latar putih, teks kontras.
2. **Hover:** Border `--color-border-hover`, transisi halus 150ms.
3. **Focus-Visible:** `outline: 2px solid var(--color-border-focus); outline-offset: 2px`.
4. **Active (Pressed):** Sedikit transform skala `scale(0.99)` untuk tactile feedback.
5. **Disabled:** Opacity 50%, kursor `not-allowed`.
6. **Loading:** Animasi shimmer / spinner transparan.
7. **Error:** Border `--color-grade-d`, teks pesan kesalahan merah di bawah kolom.
8. **Success:** Border `--color-grade-a`, ikon centang hijau jika validasi terpenuhi.

---

## 5. Standar Responsivitas & Tampilan Mobile
* **Root Safety:** Atribut `overflow-x: clip` pada tag `html` dan `body` untuk mengeliminasi horizontal scrolling di smartphone.
* **Breakpoints:**
  * **320px (Small Smartphone):** Padding kontainer `16px`, tombol radio full-width bertumpuk.
  * **375px–414px (Standard Mobile):** Tata letak satu kolom nyaman, grid kompor 1 kolom.
  * **768px (Tablet):** Grid 2 kolom untuk data pendukung, preview uploader berdampingan.
  * **1024px+ (Desktop):** Kontainer formulir terpusat `max-w-4xl` dengan floating score panel di kanan atau atas.

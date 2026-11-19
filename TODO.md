# TODO.md: Rencana Kerja Kloning & Penilaian Kelayakan SPPG

Daftar tugas implementasi terstruktur untuk sistem checklist dan penilaian kelayakan operasional SPPG.

---

### Fase 1: Inisialisasi & Fondasi Proyek
- [x] Analisis antarmuka dan komponen `form.bgn.go.id`.
- [x] Ekstraksi rumus dan bobot penilaian dari [Paparan.pdf](file:///c:/Users/Ayrez/Documents/rez/Paparan.pdf).
- [x] Pembuatan dokumen panduan teknis: [PRD.md](file:///c:/Users/Ayrez/Documents/rez/PRD.md), [AGENTS.md](file:///c:/Users/Ayrez/Documents/rez/AGENTS.md), [ARCHITECTURE.md](file:///c:/Users/Ayrez/Documents/rez/ARCHITECTURE.md), [DESIGN.md](file:///c:/Users/Ayrez/Documents/rez/DESIGN.md), [SKILL.md](file:///c:/Users/Ayrez/Documents/rez/SKILL.md), [WORKFLOW.md](file:///c:/Users/Ayrez/Documents/rez/WORKFLOW.md).
- [ ] Konfirmasi dan persetujuan Bos sebelum penulisan kode sumber.

---

### Fase 2: Desain Sistem & Token UI
- [ ] Implementasi token Tailwind CSS v4 / custom CSS `:root` (`--color-primary`, `--color-paper`, dsb).
- [ ] Penyiapan tipografi standar BGN (Font Inter, heading semibold, measure < 80 karakter).
- [ ] Pembuatan komponen UI dasar ramah sentuhan (Radio Cards, Accessible Dropdowns, Input Fields, Badges).
- [ ] Penyiapan 8 status interaktif (default, hover, focus, active, disabled, loading, error, success).

---

### Fase 3: Mesin Hitung Skor (Scoring Engine)
- [ ] Implementasi fungsi `calcLegalitas` (Bobot 12%).
- [ ] Implementasi fungsi `calcStaff` & `calcChef` (Bobot 5% & 6%).
- [ ] Implementasi fungsi `calcAirMinum` & `calcAirMasak` (Bobot 7% & 9%).
- [ ] Implementasi fungsi `calcColdChain` (Chiller 5%, Freezer 6%).
- [ ] Implementasi fungsi `calcKompor` dengan kalkulasi rasio otomatis $Kompor \times 450 / PM$ (Bobot 4%).
- [ ] Implementasi fungsi `calcSanitasi` (5 Wastafel 6%, IPAL 4%, Grease Trap 2%).
- [ ] Implementasi fungsi `calcAPAR` (5%) & `calcLabelOmpreng` (3%).
- [ ] Implementasi fungsi `calcLuasan` terhadap ambang batas PM (7%).
- [ ] Implementasi fungsi `calcGudang` (Rak & Palet Stainless/Besi/Kayu 8%).
- [ ] Implementasi fungsi `calcAlurProduksi` (Sekat penuh/catatan 8%).
- [ ] Implementasi fungsi `calcCCTV` & internet speed test (3%).
- [ ] Pengujian logika perhitungan dengan skenario sampel skor 100%, 75%, dan <60%.

---

### Fase 4: Implementasi Formulir 14 Seksi
- [ ] Header resmi instrumen BGN & logo resmi.
- [ ] Seksi Identitas SPPG & Petugas (ID SPPG, Nama, PM, Dropdown Kab/Kota, Petugas, Tanggal).
- [ ] Seksi 01–05: Legalitas, Personel SPPG, Chef, Sumber Air.
- [ ] Seksi 06–10: Rantai Dingin, Kompor, Sanitasi, APAR, Label Ompreng.
- [ ] Seksi 11–14: Lahan/Bangunan, Gudang, Alur Produksi Video, CCTV & Koneksi.
- [ ] Komponen drag-and-drop berkas dengan tombol trigger kamera HP dan simulasi timestamp.
- [ ] Banner peringatan penguncian data (Callout merah) dan tombol navigasi wizard.

---

### Fase 5: Panel Rekomendasi, TTD Digital & Pengesahan
- [ ] Floating HUD bar (Skor real-time, cluster Keamanan Pangan 65%, Legalitas 23%, Lahan 12%).
- [ ] Panel rekomendasi kelayakan (Grade A Hijau, Grade B Kuning, Grade D Merah).
- [ ] Input area alasan singkat rekomendasi (maks 2 baris).
- [ ] Kanvas tanda tangan digital interaktif (Ketua Satgas MBG Kab/Kota) dengan tombol clear/reset.

---

### Fase 6: Penyimpanan & Ekspor Berita Acara
- [ ] Modul auto-save ke `localStorage`.
- [ ] Modul cetak format resmi Berita Acara Triase Lapangan sesuai halaman 3 [Paparan.pdf](file:///c:/Users/Ayrez/Documents/rez/Paparan.pdf).

---

### Fase 7: Verifikasi & Audit Kualitas
- [ ] Pengujian responsivitas mobile (320px, 375px, 414px, 768px).
- [ ] Audit aksesibilitas form (WCAG AA).
- [ ] Demonstrasi hasil kepada Bos untuk review dan evaluasi akhir.

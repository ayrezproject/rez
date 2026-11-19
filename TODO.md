# TODO.md: Rencana Kerja Kloning & Penilaian Kelayakan SPPG

Daftar status progres pengerjaan sistem checklist dan penilaian kelayakan operasional SPPG.

---

### Fase 1: Inisialisasi & Fondasi Proyek
- [x] Analisis antarmuka dan komponen `form.bgn.go.id`.
- [x] Ekstraksi rumus dan bobot penilaian dari [Paparan.pdf](file:///c:/Users/Ayrez/Documents/rez/Paparan.pdf).
- [x] Pembuatan dokumen panduan teknis: [PRD.md](file:///c:/Users/Ayrez/Documents/rez/PRD.md), [AGENTS.md](file:///c:/Users/Ayrez/Documents/rez/AGENTS.md), [ARCHITECTURE.md](file:///c:/Users/Ayrez/Documents/rez/ARCHITECTURE.md), [DESIGN.md](file:///c:/Users/Ayrez/Documents/rez/DESIGN.md), [SKILL.md](file:///c:/Users/Ayrez/Documents/rez/SKILL.md), [WORKFLOW.md](file:///c:/Users/Ayrez/Documents/rez/WORKFLOW.md).
- [x] Konfigurasi `.gitignore` dan inisialisasi repositori Git untuk perekaman kode.
- [x] Persetujuan dan perintah resmi pengerjaan dari Bos.

---

### Fase 2: Desain Sistem & Token UI
- [x] Implementasi token CSS & variabel visual BGN (`--color-primary`, `--color-paper`, dsb).
- [x] Integrasi tipografi Google Fonts Inter (Display roman, measure nyaman, anti-slop).
- [x] Pembuatan komponen kartu radio, custom searchable dropdown, dan dropzone berkas.
- [x] Penanganan 8 status interaktif (default, hover, focus, active, disabled, loading, error, success).

---

### Fase 3: Mesin Hitung Skor (Scoring Engine)
- [x] Implementasi modul [scoring.js](file:///c:/Users/Ayrez/Documents/rez/scoring.js) mencakup 14 fungsi kalkulator indikator.
- [x] Implementasi formula rasio kompor otomatis $Kompor \times 450 / Target\_PM$.
- [x] Agregasi 3 klaster bobot: Keamanan Pangan (65%), Legalitas & SDM (23%), Lahan & K3 (12%).
- [x] Penentuan grade otomatis: Grade A (≥80%), Grade B (60–79.9%), Grade D (<60%).
- [x] Pengujian unit test perhitungan matematika scoring engine lolos 100%.

---

### Fase 4: Implementasi Formulir 14 Seksi
- [x] Pembuatan berkas [index.html](file:///c:/Users/Ayrez/Documents/rez/index.html) dan [app.js](file:///c:/Users/Ayrez/Documents/rez/app.js).
- [x] Header resmi lambang instansi BGN dan petunjuk pengerjaan 1–5.
- [x] Seksi identitas SPPG & pemilihan Kabupaten/Kota se-Indonesia.
- [x] Seksi 01–05: Legalitas dokumen, staf SPPG, chef, dan sumber air minum/masak.
- [x] Seksi 06–10: Rantai dingin (chiller/freezer), kompor, sanitasi wastafel 5 titik & limbah, APAR, dan label ompreng.
- [x] Seksi 11–14: Lahan & kesesuaian luasan, gudang kering/basah, video alur produksi, dan CCTV pengawasan.
- [x] Dropzone berkas bukti dengan batasan ukuran 50MB/200MB dan tombol pemicu kamera perangkat.
- [x] Kotak peringatan penguncian data resmi BGN.

---

### Fase 5: Panel Rekomendasi, TTD Digital & Pengesahan
- [x] Floating HUD bar kalkulator skor reaktif (real-time live update).
- [x] Modal popup rekomendasi kelayakan operasional dengan badge Grade A/B/D.
- [x] Kolom catatan pertimbangan tertulis (maksimal 2 baris) dengan penghitung karakter.
- [x] Kanvas tanda tangan digital (HTML5 Canvas) Ketua Satgas MBG dengan fungsi goresan mouse/touch dan tombol bersihkan.

---

### Fase 6: Penyimpanan & Ekspor Berita Acara
- [x] Auto-save draft otomatis ke `localStorage` browser.
- [x] Fitur reset draft formulir.
- [x] Tombol cetak Berita Acara Triase Lapangan dengan print stylesheet resmi.
- [x] Tombol routing pengiriman hasil ke `https://s.bgn.go.id/satgas-mbg`.

---

### Fase 7: Verifikasi & Audit Kualitas
- [x] Pengujian live di browser headless via server lokal.
- [x] Pengujian reaktivitas skor: SLHS, Chiller, Freezer terbukti mengubah nilai total dan grade secara real-time.
- [x] Pengujian responsivitas mobile (viewport 390x844): bebas scroll horizontal, tata letak rapi 100%.
- [x] Pengujian modal rekomendasi dan kanvas tanda tangan interaktif terbukti berfungsi sempurna.
- [ ] Laporan akhir dan demonstrasi kepada Bos.

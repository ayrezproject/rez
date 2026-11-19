# Checklist Kelayakan Operasional SPPG — Satgas BGN

Aplikasi web standalone instrumen triase lapangan Satuan Tugas (Satgas) Percepatan Program Makan Bergizi Gratis (MBG) Badan Gizi Nasional (BGN).

Aplikasi ini merupakan kloning antarmuka 1:1 dari formulir resmi [form.bgn.go.id](https://form.bgn.go.id/forms/form-checklist-kelayakan-operasional-sppg-satgas-fqv9nk) yang diintegrasikan langsung dengan formula kalkulasi skor kelayakan triase lapangan (14 indikator teknis) bersumber dari dokumen resmi `Paparan.pdf` BGN.

---

## Fitur Utama

- **Antarmuka Presisi 1:1:** Replika formulir inspeksi BGN dengan 14 seksi penilaian, penanganan 8 status interaktif, dan desain ramah mobile/tablet.
- **Scoring Engine 14 Indikator:** Perhitungan skor kelayakan real-time berbasis formula matematis resmi total bobot 100%.
- **Klasifikasi Kelayakan Otomatis:**
  - **Grade A (Skor ≥ 80.0%):** Memenuhi Standar Kelayakan Operasional (Rekomendasi Operasional Penuh).
  - **Grade B (Skor 60.0% – 79.9%):** Layak dengan Catatan Perbaikan Maksimal 1 Bulan.
  - **Grade D (Skor < 60.0%):** Tidak Layak Dilanjutkan.
- **Pengesahan & Berita Acara:** Modal rekomendasi dengan resume skor 3 klaster, catatan pertimbangan perbaikan, dan kanvas tanda tangan digital Ketua Satgas.
- **Format Cetak Resmi A4:** Print stylesheet otomatis saat tombol "Cetak Berita Acara Triase" ditekan.
- **PWA & Offline-First:** Dilengkapi Web App Manifest (`manifest.json`) dan Service Worker (`sw.js`) untuk operasional di lapangan tanpa sinyal internet.
- **Tombol Reset Total:** Membersihkan seluruh isian form, menetralkan pilihan, dan mengembalikan skor ke kondisi awal 0.0%.

---

## 14 Indikator Penilaian & Bobot

### 1. Keamanan Pangan (Bobot: 65%)
1. **Air Minum (7%):** Uji lab berkala atau air minum kemasan berizin.
2. **Air Masak (9%):** PDAM / sumur bor terlindung layak pakai.
3. **Rantai Dingin (11%):** Chiller (5%, suhu ≤ 5°C) dan Freezer (6%, suhu ≤ -18°C).
4. **Kompor Masak (4%):** Rasio kapasitas $(Kompor \times 450) / Target\_PM \ge 1.0$.
5. **Sanitasi Dasar (12%):** Wastafel 5 titik (6%), Saluran IPAL (4%), Grease Trap (2%).
6. **Label Ompreng (3%):** Batas waktu konsumsi (1.5%) dan larangan bawa pulang (1.5%).
7. **Gudang Rak & Palet (8%):** Rak dan palet stainless steel/besi di gudang kering dan basah.
8. **Sekat Ruang & Alur Kerja (8%):** Pembagian zonasi bersih-kotor dapur.
9. **CCTV & Konektivitas (3%):** CCTV 10 titik kritis (1.5%) dan kecepatan internet (1.5%).

### 2. Legalitas Dokumen & SDM (Bobot: 23%)
10. **Legalitas Dokumen (12%):** SLHS aktif (6%), Sertifikat Halal (2%), PBG (2%), SLF (2%).
11. **Personel Inti SPPG (5%):** Kepala SPPG (2%), Pengawas Gizi bersertifikat (2%), Pengawas Keuangan (1%).
12. **Chef / Jurutama Masak (6%):** Kehadiran chef di lokasi (3%) dan paklaring kerja ≥ 1 tahun (3%).

### 3. Lahan & K3 (Bobot: 12%)
13. **Proteksi Kebakaran / APAR (5%):** Ketersediaan tabung APAR dengan masa berlaku aktif.
14. **Luasan Dapur vs Target PM (7%):** Kesesuaian luas tanah & bangunan dengan kapasitas porsi.

---

## Struktur Berkas

```text
├── index.html          # Antarmuka utama formulir 14 seksi & modal berita acara
├── app.js              # State reaktif, event handling, kanvas ttd, & reset bersih
├── scoring.js          # Mesin hitung matematis murni 14 indikator BGN
├── style.css           # Stylesheet produksi mandiri & print format A4
├── manifest.json       # Konfigurasi PWA untuk instalasi di layar beranda
├── sw.js               # Service Worker caching offline
├── Paparan.pdf         # Dokumen acuan resmi kriteria & rumus bobot BGN
├── PRD.md              # Product Requirements Document
├── ARCHITECTURE.md     # Arsitektur sistem & spesifikasi JSON
├── DESIGN.md           # Token desain & pedoman komponen
└── .github/
    └── workflows/
        └── deploy.yml  # Otomasi deploy ke GitHub Pages
```

---

## Cara Menjalankan Secara Lokal

1. Buka terminal pada folder proyek:
   ```bash
   python -m http.server 8085
   ```
2. Buka browser dan akses:
   ```text
   http://localhost:8085/index.html
   ```

---

## Panduan Deploy ke GitHub Pages

### Langkah 1: Hubungkan Repositori Lokal ke GitHub
Buat repositori baru di GitHub (misal: `sppg-checklist`), lalu jalankan perintah:
```bash
git remote add origin https://github.com/<USERNAME>/<REPO_NAME>.git
git branch -M main
git push -u origin main
```

### Langkah 2: Aktifkan GitHub Pages
1. Masuk ke halaman repositori di GitHub.
2. Buka tab **Settings** > **Pages**.
3. Pada bagian **Build and deployment** > **Source**, pilih **GitHub Actions**.
4. Workflow `.github/workflows/deploy.yml` akan otomatis mempublikasikan aplikasi ke URL:
   ```text
   https://<USERNAME>.github.io/<REPO_NAME>/
   ```

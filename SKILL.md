---
name: sppg-assessment-engine
description: >
  Spesifikasi keahlian evaluasi dan kalkulator checklist kelayakan operasional
  Satuan Pelayanan Program Gizi (SPPG) Satgas MBG Badan Gizi Nasional (BGN).
  Digunakan untuk mengaudit formulir, menghitung 14 indikator bobot 100%, dan
  menentukan rekomendasi kelayakan (Grade A, B, D).
version: 1.0.0
---

# SPPG Assessment Engine (Skill)

Keahlian ini mendefinisikan aturan pemrosesan data, validasi lapangan, dan algoritma skoring untuk instrumen triase kelayakan operasional SPPG Satuan Tugas Percepatan Program Makan Bergizi Gratis (MBG) Kabupaten/Kota berdasarkan pedoman resmi Badan Gizi Nasional (BGN).

---

## 1. Perintah & Kemampuan Utama

| Perintah | Deskripsi |
|---|---|
| `evaluate-form <payload>` | Mengaudit isian form 14 seksi, menghitung skor tiap indikator, dan menghasilkan skor total 0–100%. |
| `determine-grade <skor>` | Menentukan rekomendasi status kelayakan: **Grade A** (≥80%), **Grade B** (60–79.9%), atau **Grade D** (<60%). |
| `validate-checklist <data>` | Memvalidasi integritas data: 16 digit NIK, nomor telepon +62, ketersediaan dokumentasi foto/video ber-timestamp. |
| `calc-stove-ratio <kompor, target_pm>` | Menghitung rasio kecukupan kompor: $Rasio = (Kompor \times 450) / Target\_PM$. |

---

## 2. Definisi Indikator & Algoritma Skor

### Klaster 1: Keamanan Pangan (Bobot Kumulatif: 65%)
1. **Sumber Air Minum (7%):**
   * Filter: RO = 7%, Galon berizin edar = 6%, PDAM = 4%, Sumur = 0%. Ambil nilai tertinggi jika lebih dari satu.
2. **Sumber Air Masak (9%):**
   * Filter: RO = 9%, Galon berizin edar = 8%, PDAM = 6%, Sumur = 2%. Ambil nilai tertinggi.
3. **Rantai Dingin (11%):**
   * Chiller (5%): Suhu ≤ 5°C = 5%, Suhu > 5°C = 3%, Rusak/Tdk tampak = 0%.
   * Freezer (6%): Suhu ≤ -18°C = 6%, Suhu > -18°C = 3%, Rusak/Tdk tampak = 0%.
4. **Kompor (4%):**
   * Hitung rasio $R = (\text{Jumlah Kompor Berfungsi} \times 450) / \text{Target PM}$.
   * Jika $R \ge 1$ dan High Pressure ada: skor 4% (semua baik) atau 2% (ada rusak).
   * Jika $R \ge 1$ tanpa High Pressure: skor 1%.
   * Jika $R < 1$: skor 0%.
5. **Sanitasi Dasar (12%):**
   * 5 Lokasi Wastafel Cuci Tangan: 1.2% per titik aktif + sabun (Persiapan, Pemorsian, Pengolahan, KM, Masuk). Maks 6%.
   * IPAL Berfungsi: 4%.
   * Grease Trap Berfungsi: 2%.
6. **Label Kemasan Ompreng (3%):**
   * Info Batas Waktu Konsumsi: 1.5%.
   * Info Larangan Bawa Pulang: 1.5%.
7. **Gudang Kering & Basah (8%):**
   * Rak Gudang Kering: Stainless (2%), Besi/Plastik (1.75%), Kayu (0%).
   * Palet Gudang Kering: Stainless (2%), Besi/Plastik (1.75%), Kayu dilarang (0%).
   * Rak Gudang Basah: Stainless (2%), Besi/Plastik (1.75%), Kayu (0%).
   * Palet Gudang Basah: Stainless (2%), Besi/Plastik (1.75%), Kayu dilarang (0%).
8. **Video Alur Produksi (8%):**
   * Sekat penuh antara ruang masak dan pemorsian: 8%.
   * Tanpa sekat penuh (dengan catatan): 6%.
   * Tidak sesuai ketentuan (dengan catatan): 4%.
9. **CCTV Pengawasan Dapur (3%):**
   * Terpasang di 10 titik kritis: 1.5%.
   * Speed test internet (download/upload) terlampir: 1.5%.

### Klaster 2: Legalitas & SDM (Bobot Kumulatif: 23%)
1. **Legalitas Dokumen (12%):**
   * Sertifikat Laik Higiene Sanitasi (SLHS): 6%.
   * Sertifikat Halal: 2%.
   * Persetujuan Bangunan Gedung (PBG): 2%.
   * Sertifikat Layak Fungsi (SLF): 2%.
2. **Staff di SPPG (5%):**
   * Kepala SPPG ada di lokasi: 2%.
   * Pengawas Gizi: Ahli Gizi (2%), Jurusan relevan (1%), Tidak ada (0%).
   * Pengawas Keuangan ada di lokasi: 1%.
3. **Chef (6%):**
   * Kehadiran Chef di lokasi: 3%.
   * Paklaring / Pengalaman kerja ≥ 1 tahun: 3%.

### Klaster 3: Lahan & Keselamatan Kerja (Bobot Kumulatif: 12%)
1. **APAR (5%):**
   * APAR tersedia dan masa kedaluwarsa masih aktif: 5%.
   * Tidak ada / kadaluarsa: 0%.
2. **Jenis & Luasan SPPG (7%):**
   * Kesesuaian luas bangunan terhadap kapasitas PM: Sesuai range (7%), Di bawah standar (3%), Tidak dapat dinilai (0%).

---

## 3. Matriks Rekomendasi Kelayakan
| Skor Total | Grade | Rekomendasi Resmi | Tindak Lanjut Satgas |
|---|---|---|---|
| **≥ 80.0%** | **A** | **Layak Dilanjutkan** | Rekomendasi operasional penuh diterbitkan. |
| **60.0% – 79.9%** | **B** | **Layak Dilanjutkan dengan Perbaikan** | Masa perbaikan diberikan (misal: lengkapi izin/apar/sekat). |
| **< 60.0%** | **D** | **Tidak Layak Dilanjutkan** | Penundaan operasional sampai perbaikan menyeluruh selesai. |

# PRD: Sistem Checklist & Penilaian Kelayakan Operasional SPPG
**Satgas Percepatan Program Makan Bergizi Gratis (MBG) Kabupaten/Kota**
*Dokumen Kebutuhan Produk (Product Requirements Document)*

---

## 1. Ringkasan Eksekutif & Latar Belakang
Badan Gizi Nasional (BGN) Republik Indonesia meluncurkan Program Makan Bergizi Gratis (MBG) yang dijalankan melalui unit dapur sentral bernama **Satuan Pelayanan Program Gizi (SPPG)**. Untuk memastikan kelayakan operasional, keamanan pangan, keabsahan legalitas, dan kesiapan fasilitas sebelum maupun saat beroperasi, dibentuk **Satuan Tugas (Satgas) MBG Kabupaten/Kota** yang bertugas melakukan audit triase lapangan.

Aplikasi ini adalah sistem terpadu yang menggabungkan:
1. **Kloning Formulir Digital Resmi (1:1 UI/UX):** Mereplikasi antarmuka inspeksi web resmi `form.bgn.go.id/forms/form-checklist-kelayakan-operasional-sppg-satgas-fqv9nk`.
2. **Mesin Penilaian Otomatis (Real-time Scoring Engine):** Mengimplementasikan seluruh kriteria, bobot persentase, dan formula kalkulasi resmi dari materi paparan Deputi Bidang Sistem dan Tata Kelola BGN (`Paparan.pdf`).
3. **Instrumen Rekomendasi & Legalitas:** Menghasilkan rekomendasi kelayakan (Layak Dilanjutkan, Layak dengan Perbaikan, Tidak Layak), kolom pertimbangan, tanda tangan digital (e-signature), dan fungsi cetak/ekspor instrumen triase lapangan.

---

## 2. Tujuan & Sasaran Produk
* **Akurasi Penilaian:** Mencegah kesalahan hitung manual skor kelayakan dari 14 indikator penilaian.
* **Kecepatan di Lapangan:** Memungkinkan petugas Satgas mengisi checklist secara mobile-friendly langsung dari ponsel pintar di lokasi dapur SPPG.
* **Transparansi Hasil:** Memberikan umpan balik langsung (real-time feedback) kepada inspektur mengenai total skor dan batas kelayakan saat checklist diisi.
* **Bukti Otentik (Verifiable):** Mendukung unggah foto/video dokumentasi dengan kewajiban timestamp, serta penandatanganan digital oleh Ketua Satgas MBG Kabupaten/Kota.

---

## 3. Pengguna Sasaran (Target Audience)
1. **Petugas Lapangan / Auditor Satgas MBG:** Mengisi data inspeksi, mencatat kondisi fisik, dan mengambil dokumentasi foto/video.
2. **Ketua Satgas MBG Kabupaten/Kota:** Meninjau skor akumulasi, memberikan catatan/rekomendasi, dan menandatangani instrumen triase secara digital.
3. **Kepala & Manajemen SPPG:** Menerima laporan hasil audit dan poin perbaikan yang harus dipenuhi.

---

## 4. Kriteria Kelayakan & Bobot Penilaian (Acuan Paparan.pdf)
Total bobot kumulatif adalah **100%**, terbagi ke dalam 3 klaster besar:
* **Keamanan Pangan (65%):** Indikator 04, 05, 06, 07, 08, 10, 12, 13, 14.
* **Legalitas & SDM (23%):** Indikator 01, 02, 03.
* **Lahan & Keselamatan Kerja (12%):** Indikator 09, 11.

### Rincian 14 Indikator Penilaian
| No | Indikator | Bobot | Kriteria & Formula Skor |
|---|---|---|---|
| 01 | **Legalitas Dokumen** | 12% | SLHS (6%), Halal (2%), PBG (2%), SLF (2%). Tiap dokumen: Ada & Berlaku = skor penuh, Tidak ada = 0. |
| 02 | **Staff di SPPG** | 5% | • Kepala SPPG di lokasi (2%)<br>• Pengawas Gizi di lokasi (2%): Ahli Gizi = 2%, Non-ahli gizi relevan (Tekpang/Kesmas/dll) = 1%, Tidak ada = 0%<br>• Pengawas Keuangan di lokasi (1%) |
| 03 | **Chef** | 6% | • Kehadiran Chef di lokasi (3%)<br>• Paklaring / Bukti kerja ≥ 1 tahun (3%) |
| 04 | **Sumber Air Minum** | 7% | RO (7%), Galon izin edar (6%), PDAM (4%), Sumur (0%). Jika >1 sumber, ambil skor tertinggi. |
| 05 | **Sumber Air Masak** | 9% | RO (9%), Galon izin edar (8%), PDAM (6%), Sumur (2%). Jika >1 sumber, ambil skor tertinggi. |
| 06 | **Rantai Dingin** | 11% | • Chiller (5%): Berfungsi & Suhu ≤ 5°C (5%), Berfungsi & Suhu > 5°C (3%), Rusak/Tdk tampak (0%)<br>• Freezer (6%): Berfungsi & Suhu ≤ -18°C (6%), Berfungsi & Suhu > -18°C (3%), Rusak/Tdk tampak (0%) |
| 07 | **Kompor** | 4% | Formula Rasio: `Rasio = (Kompor Berfungsi × 450 PM) / Target PM`.<br>• Semua baik + Ada High Pressure (Rasio ≥ 1): 4%<br>• Ada rusak + Ada High Pressure (Rasio ≥ 1): 2%<br>• Semua baik + Tanpa High Pressure (Rasio ≥ 1): 1%<br>• Rasio < 1 atau tanpa High Pressure rusak: 0% |
| 08 | **Sanitasi Dasar** | 12% | • Wastafel 5 lokasi (6%): 1.2% per lokasi (Ruang Persiapan, Pemorsian, Pengolahan, KM, Pintu Masuk).<br>• Saluran IPAL berfungsi (4%)<br>• Saluran Grease Trap berfungsi (2%) |
| 09 | **APAR** | 5% | Tersedia & Masa berlaku aktif (5%), Tersedia tdk ada/kadaluarsa (0%), Tidak tersedia (0%). |
| 10 | **Label Kemasan Ompreng** | 3% | • Info "Batas Waktu Konsumsi" (1.5%)<br>• Info "Tidak Boleh Dibawa Pulang" (1.5%) |
| 11 | **Jenis & Luas SPPG** | 7% | Standar Luas Bangunan vs PM:<br>• ≤160 m² (maks 500 PM)<br>• 161–240 m² (maks 1.500 PM)<br>• 241–320 m² (maks 2.500 PM)<br>• 321–400 m² (maks 3.000 PM)<br>Sesuai standar = 7%, Di bawah standar = 3%, Tidak dapat dinilai = 0%. |
| 12 | **Gudang Kering & Basah** | 8% | Masing-masing gudang dinilai Rak (2%) dan Palet (2%):<br>• Stainless Steel = 2%<br>• Besi / Plastik / Baja Ringan = 1.75%<br>• Kayu / Tidak ada = 0% (Palet kayu dilarang keras). Total = 8%. |
| 13 | **Video Alur Produksi** | 8% | • Sesuai ketentuan, tanpa pengecualian (ada sekat penuh antara pengolahan dan pemorsian): 8%<br>• Sesuai ketentuan, dengan catatan (tanpa sekat penuh): 6%<br>• Tidak sesuai ketentuan, dengan catatan: 4% |
| 14 | **CCTV & Internet** | 3% | • CCTV terpasang di 10 titik kritis (1.5%)<br>• Bukti speed test download & upload tercatat (1.5%) |

---

## 5. Standar Rekomendasi Kelayakan (Passing Grade)
Berdasarkan akumulasi skor akhir 0–100%:
* **Grade A (Layak Dilanjutkan):** Skor **≥ 80%** (Lolos standar operasional).
* **Grade B (Layak Dilanjutkan dengan Perbaikan):** Skor **60.0% – 79.9%** (Memerlukan pemenuhan catatan perbaikan sebelum deadline operasi).
* **Grade D (Tidak Layak Dilanjutkan):** Skor **< 60%** (Operasional harus ditangguhkan sampai renovasi/penyesuaian total).

---

## 6. Kebutuhan Fungsional (Functional Requirements)
* **FR-01 (Kloning UI):** Tampilan header, banner BGN, petunjuk pengerjaan, 14 seksi form, card radio button, dropdown Kab/Kota se-Indonesia, dan dropzone file persis 1:1.
* **FR-02 (Live Scoring Engine):** Nilai indikator terhitung seketika (reaktif) saat pengguna memilih opsi atau mengisi angka.
* **FR-03 (Floating Summary Badge):** Skor total, klaster bobot, dan grade sementara selalu terlihat tanpa mengganggu pengisian.
* **FR-04 (Pemberkasan Dokumentasi):** File uploader drag-and-drop dengan simulasi pratinjau foto/video, validasi ukuran file (50MB / 200MB), dan integrasi tombol kamera ponsel (`capture="environment"`).
* **FR-05 (Validasi Lapangan):** Validasi NIK 16 digit, nomor telepon standar Indonesia (`+62`), dan rasio kapasitas kompor.
* **FR-06 (Digital Signature & Pengesahan):** Canvas tanda tangan digital untuk Ketua Satgas MBG Kabupaten/Kota serta kolom alasan ringkas.
* **FR-07 (Cetak & Ekspor Hasil):** Tombol cetak langsung (Print-ready view) format Berita Acara Triase Lapangan sesuai halaman 3 & 7 Paparan.pdf.

---

## 7. Kebutuhan Non-Fungsional (Non-Functional Requirements)
* **Kompabilitas & Kecepatan:** Standalone (zero-build, single-file HTML5/JS/Tailwind), loading < 1 detik.
* **Responsivitas:** Mendukung layar mobile penuh (320px, 375px, 414px) hingga desktop widescreen.
* **Ketahanan Input:** Form auto-save ke `localStorage` browser agar data tidak hilang jika tab tidak sengaja tertutup saat inspeksi di lapangan.

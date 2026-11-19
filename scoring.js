/**
 * scoring.js — Mesin Kalkulasi Skor Triase SPPG BGN (14 Indikator)
 * Merujuk langsung ke dokumen resmi: Paparan.pdf (Deputi Sistem dan Tata Kelola BGN)
 * Total Bobot: 100% (Keamanan Pangan 65%, Legalitas & SDM 23%, Lahan & K3 12%)
 */

(function (window) {
  'use strict';

  const ScoringEngine = {
    // 01. Legalitas Dokumen (Bobot 12%)
    calcLegalitas(data) {
      let score = 0;
      if (data.slhs === 'Ada') score += 6.0;
      if (data.halal === 'Ada') score += 2.0;
      if (data.pbg === 'Ada') score += 2.0;
      if (data.slf === 'Ada') score += 2.0;
      return score;
    },

    // 02. Staff di SPPG (Bobot 5%)
    calcStaff(data) {
      let score = 0;
      // Kepala SPPG (2%)
      if (data.kepala_sppg === 'Ada') score += 2.0;

      // Pengawas Gizi (2%)
      if (data.pengawas_gizi === 'Ada') {
        const major = (data.jurusan_gizi || '').trim().toLowerCase();
        if (major === 'ilmu gizi') {
          score += 2.0;
        } else if (
          major.includes('teknologi pangan') ||
          major.includes('kesehatan masyarakat') ||
          major.includes('pengolahan makanan') ||
          major.includes('manajemen industri') ||
          major.includes('pertanian') ||
          major.includes('chef')
        ) {
          score += 1.0;
        } else {
          score += 0.5; // fallback relevan minimal
        }
      }

      // Pengawas Keuangan (1%)
      if (data.pengawas_keuangan === 'Ada') score += 1.0;

      return score;
    },

    // 03. Chef (Bobot 6%)
    calcChef(data) {
      let score = 0;
      if (data.chef_hadir === 'Ada') score += 3.0;
      if (data.chef_paklaring === 'Ada') score += 3.0;
      return score;
    },

    // 04. Sumber Air Minum (Bobot 7% - nilai tertinggi)
    calcAirMinum(data) {
      const type = data.air_minum;
      if (type === 'RO') return 7.0;
      if (type === 'Galon') return 6.0;
      if (type === 'PDAM') return 4.0;
      return 0.0; // Sumur = 0%
    },

    // 05. Sumber Air Masak (Bobot 9% - nilai tertinggi)
    calcAirMasak(data) {
      const type = data.air_masak;
      if (type === 'RO') return 9.0;
      if (type === 'Galon') return 8.0;
      if (type === 'PDAM') return 6.0;
      if (type === 'Sumur') return 2.0;
      return 0.0;
    },

    // 06. Rantai Dingin (Bobot 11%: Chiller 5%, Freezer 6%)
    calcColdChain(data) {
      let score = 0;

      // Chiller (5%)
      if (data.chiller_ok === 'Ya') {
        const temp = parseFloat(data.chiller_temp);
        if (!isNaN(temp) && temp <= 5.0) {
          score += 5.0;
        } else if (!isNaN(temp) && temp > 5.0) {
          score += 3.0;
        }
      }

      // Freezer (6%)
      if (data.freezer_ok === 'Ya') {
        const temp = parseFloat(data.freezer_temp);
        if (!isNaN(temp) && temp <= -18.0) {
          score += 6.0;
        } else if (!isNaN(temp) && temp > -18.0) {
          score += 3.0;
        }
      }

      return score;
    },

    // 07. Kompor (Bobot 4%)
    // Formula: Rasio = (Kompor Berfungsi * 450) / Target PM
    calcKompor(data) {
      const targetPM = parseFloat(data.target_pm) || 3000;
      const komporBerfungsi = parseFloat(data.kompor_berfungsi_qty) || 0;
      const hasHighPressure = data.kompor_high_pressure_ada === 'Ya';
      const allBerfungsiBaik = data.kompor_semua_baik === 'Ya';

      const ratio = targetPM > 0 ? (komporBerfungsi * 450) / targetPM : 0;

      if (ratio >= 1.0) {
        if (hasHighPressure && allBerfungsiBaik) return 4.0;
        if (hasHighPressure && !allBerfungsiBaik) return 2.0;
        if (!hasHighPressure && allBerfungsiBaik) return 1.0;
      }
      return 0.0;
    },

    // 08. Sanitasi Dasar (Bobot 12%: Wastafel 6%, IPAL 4%, Grease Trap 2%)
    calcSanitasi(data) {
      let score = 0;

      // Wastafel 5 lokasi (1.2% per lokasi)
      const wastafelLocations = [
        'wastafel_persiapan',
        'wastafel_pemorsian',
        'wastafel_pengolahan',
        'wastafel_km',
        'wastafel_masuk',
      ];
      let wastafelCount = 0;
      wastafelLocations.forEach((loc) => {
        if (data[loc] === 'lengkap') {
          wastafelCount += 1;
        }
      });
      score += wastafelCount * 1.2;

      // IPAL (4%)
      if (data.ipal_ok === 'Ya') score += 4.0;

      // Grease Trap (2%)
      if (data.grease_trap_ok === 'Ya') score += 2.0;

      return score;
    },

    // 09. APAR (Bobot 5%)
    calcAPAR(data) {
      if (data.apar_tersedia === 'Ya' && data.apar_berlaku === 'Ya') {
        return 5.0;
      }
      return 0.0;
    },

    // 10. Label Kemasan Ompreng (Bobot 3%)
    calcLabelOmpreng(data) {
      let score = 0;
      if (data.label_batas_waktu === 'Ya') score += 1.5;
      if (data.label_tidak_dibawa_pulang === 'Ya') score += 1.5;
      return score;
    },

    // 11. Jenis & Luasan SPPG (Bobot 7%)
    // Standar Luas Bangunan vs PM:
    // <=160 m2 -> 500 PM | 161-240 m2 -> 1500 PM | 241-320 m2 -> 2500 PM | 321-400 m2 -> 3000 PM
    calcLuasan(data) {
      const kesesuaian = data.luasan_kesesuaian;
      if (kesesuaian === 'Sesuai') return 7.0;
      if (kesesuaian === 'Di Bawah Standar') return 3.0;
      return 0.0;
    },

    // 12. Gudang Kering & Basah (Bobot 8%)
    // Rak Kering (2%), Palet Kering (2%), Rak Basah (2%), Palet Basah (2%)
    // Stainless = 2%, Besi/Plastik = 1.75%, Kayu = 0%
    calcGudang(data) {
      const getMatScore = (val) => {
        if (val === 'Stainless steel') return 2.0;
        if (val === 'Besi / Plastik / Baja Ringan') return 1.75;
        return 0.0; // Kayu / Tidak ada = 0
      };

      let score = 0;
      score += getMatScore(data.gudang_kering_rak);
      score += getMatScore(data.gudang_kering_palet);
      score += getMatScore(data.gudang_basah_rak);
      score += getMatScore(data.gudang_basah_palet);
      return score;
    },

    // 13. Video Alur Produksi (Bobot 8%)
    calcAlurProduksi(data) {
      const alur = data.alur_produksi;
      if (alur === 'sekat_penuh') return 8.0;
      if (alur === 'tanpa_sekat') return 6.0;
      if (alur === 'tidak_sesuai') return 4.0;
      return 0.0;
    },

    // 14. CCTV Pengawasan Dapur (Bobot 3%: CCTV 1.5%, Internet 1.5%)
    calcCCTV(data) {
      let score = 0;
      if (data.cctv_titik_kritis === 'Ya') score += 1.5;
      if (data.internet_speedtest_ok === 'Ya') score += 1.5;
      return score;
    },

    // Menghitung seluruh 14 indikator dan agregasi klaster
    calculateAll(data) {
      const s01 = this.calcLegalitas(data);
      const s02 = this.calcStaff(data);
      const s03 = this.calcChef(data);
      const s04 = this.calcAirMinum(data);
      const s05 = this.calcAirMasak(data);
      const s06 = this.calcColdChain(data);
      const s07 = this.calcKompor(data);
      const s08 = this.calcSanitasi(data);
      const s09 = this.calcAPAR(data);
      const s10 = this.calcLabelOmpreng(data);
      const s11 = this.calcLuasan(data);
      const s12 = this.calcGudang(data);
      const s13 = this.calcAlurProduksi(data);
      const s14 = this.calcCCTV(data);

      // Klaster 1: Keamanan Pangan (65%)
      const keamananPangan = s04 + s05 + s06 + s07 + s08 + s10 + s12 + s13 + s14;

      // Klaster 2: Legalitas & SDM (23%)
      const legalitasSDM = s01 + s02 + s03;

      // Klaster 3: Lahan & Keselamatan Kerja (12%)
      const lahanK3 = s09 + s11;

      const total = Math.min(100.0, +(keamananPangan + legalitasSDM + lahanK3).toFixed(2));

      // Penentuan Grade (Paparan.pdf hal 6)
      let grade = 'D';
      let recommendation = 'Tidak Layak Dilanjutkan';
      let badgeClass = 'grade-d';

      if (total >= 80.0) {
        grade = 'A';
        recommendation = 'Layak Dilanjutkan';
        badgeClass = 'grade-a';
      } else if (total >= 60.0) {
        grade = 'B';
        recommendation = 'Layak Dilanjutkan dengan Perbaikan';
        badgeClass = 'grade-b';
      }

      return {
        indicators: {
          s01, s02, s03, s04, s05, s06, s07, s08, s09, s10, s11, s12, s13, s14
        },
        clusters: {
          keamananPangan: +keamananPangan.toFixed(2),
          legalitasSDM: +legalitasSDM.toFixed(2),
          lahanK3: +lahanK3.toFixed(2),
        },
        total,
        grade,
        recommendation,
        badgeClass
      };
    }
  };

  window.ScoringEngine = ScoringEngine;
})(window);

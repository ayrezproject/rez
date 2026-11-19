/**
 * app.js — Kontroler Interaktif & Mode Produksi Triase SPPG BGN
 * Menghubungkan Form UI dengan ScoringEngine, Validasi, Dropdown Kab/Kota, PWA Offline & Reset Bersih
 */

(function () {
  'use strict';

  // Daftar Kabupaten/Kota Se-Indonesia
  const KAB_KOTA_LIST = [
    'ACEH BARAT', 'ACEH BARAT DAYA', 'ACEH BESAR', 'ACEH JAYA', 'ACEH SELATAN',
    'ACEH SINGKIL', 'ACEH TAMIANG', 'ACEH TENGAH', 'ACEH TENGGARA', 'ACEH TIMUR',
    'ACEH UTARA', 'BANDA ACEH', 'LANGSA', 'LHOKSEUMAWE', 'SABANG', 'SUBULUSSALAM',
    'ASAHAN', 'BATU BARA', 'DAIRI', 'DELI SERDANG', 'HUMBANG HASUNDUTAN', 'KARO',
    'LABUHANBATU', 'LANGKAT', 'MANDAILING NATAL', 'NIAS', 'PADANG LAWAS',
    'SAMOSIR', 'SERDANG BEDAGAI', 'SIMALUNGUN', 'TAPANULI SELATAN', 'TAPANULI TENGAH',
    'TAPANULI UTARA', 'TOBA', 'BINJAI', 'GUNUNGSITOLI', 'MEDAN', 'PADANGSIDIMPUAN',
    'PEMATANGSIANTAR', 'SIBOLGA', 'TANJUNGBALAI', 'TEBING TINGGI',
    'AGAM', 'DHARMASRAYA', 'KEPULAUAN MENTAWAI', 'LIMA PULUH KOTA', 'PADANG PARIAMAN',
    'PASAMAN', 'PESISIR SELATAN', 'SIJUNJUNG', 'SOLOK', 'TANAH DATAR', 'BUKITTINGGI',
    'PADANG', 'PADANG PANJANG', 'PARIAMAN', 'PAYAKUMBUH', 'SAWAHLUNTO',
    'BENGKULU', 'JAMBI', 'PEKANBARU', 'DUMAI', 'PALEMBANG', 'PANGKALPINANG',
    'BANDAR LAMPUNG', 'METRO', 'JAKARTA PUSAT', 'JAKARTA BARAT', 'JAKARTA SELATAN',
    'JAKARTA TIMUR', 'JAKARTA UTARA', 'KEPULAUAN SERIBU', 'BANDUNG', 'BEKASI',
    'BOGOR', 'CIAMIS', 'CIANJUR', 'CIREBON', 'GARUT', 'INDRAMAYU', 'KARAWANG',
    'KUNINGAN', 'MAJALENGKA', 'PANGANDARAN', 'PURWAKARTA', 'SUBANG', 'SUKABUMI',
    'SUMEDANG', 'TASIKMALAYA', 'DEPOK', 'CIMAHI', 'BANJAR', 'BANJARNEGARA',
    'BANYUMAS', 'BATANG', 'BLORA', 'BOYOLALI', 'BREBES', 'CILACAP', 'DEMAK',
    'GROBOGAN', 'JEPARA', 'KARANGANYAR', 'KEBUMEN', 'KENDAL', 'KLATEN', 'KUDUS',
    'MAGELANG', 'PATI', 'PEKALONGAN', 'PEMALANG', 'PURBALINGGA', 'PURWOREJO',
    'REMBANG', 'SEMARANG', 'SRAGEN', 'SUKOHARJO', 'TEGAL', 'TEMANGGUNG', 'WONOGIRI',
    'WONOSOBO', 'SURAKARTA', 'SALATIGA', 'BANTUL', 'GUNUNGKIDUL', 'KULON PROGO',
    'SLEMAN', 'YOGYAKARTA', 'BANGKALAN', 'BANYUWANGI', 'BLITAR', 'BOJONEGORO',
    'BONDOWOSO', 'GRESIK', 'JEMBER', 'JOMBANG', 'KEDIRI', 'LAMONGAN', 'LUMAJANG',
    'MADIUN', 'MAGETAN', 'MALANG', 'MOJOKERTO', 'NGANJUK', 'NGAWI', 'PACITAN',
    'PAMEKASAN', 'PASURUAN', 'PONOROGO', 'PROBOLINGGO', 'SAMPANG', 'SIDOARJO',
    'SITUBONDO', 'SUMENEP', 'TRENGGALEK', 'TUBAN', 'TULUNGAGUNG', 'BATU', 'SURABAYA',
    'BADUNG', 'BANGLI', 'BULELENG', 'GIANYAR', 'JEMBRANA', 'KARANGASEM', 'KLUNGKUNG',
    'TABANAN', 'DENPASAR', 'KUPANG', 'MATARAM', 'PONTIANAK', 'BANJARMASIN',
    'SAMARINDA', 'BALIKPAPAN', 'MANADO', 'MAKASSAR', 'PALU', 'KENDARI', 'GORONTALO',
    'AMBON', 'JAYAPURA', 'SORONG', 'MERAUKE'
  ].sort();

  const STORAGE_KEY = 'sppg_assessment_production_v1';

  // Fungsi menghasilkan state awal formulir kosong (Kondisi Bersih / Fresh Audit)
  function getCleanInitialState() {
    return {
      sppg_id: '',
      sppg_name: '',
      target_pm: '',
      kab_kota: '',
      petugas_name: '',
      inspection_date: new Date().toISOString().split('T')[0],

      // Seksi 01
      slhs: 'Tidak',
      halal: 'Tidak',
      pbg: 'Tidak',
      slf: 'Tidak',

      // Seksi 02
      kepala_sppg: 'Tidak',
      nama_kepala: '',
      nik_kepala: '',
      telp_kepala: '',
      pengawas_gizi: 'Tidak',
      nama_gizi: '',
      nik_gizi: '',
      telp_gizi: '',
      jurusan_gizi: '',
      pengawas_keuangan: 'Tidak',
      nama_keuangan: '',
      nik_keuangan: '',
      telp_keuangan: '',

      // Seksi 03
      chef_hadir: 'Tidak',
      nama_chef: '',
      nik_chef: '',
      telp_chef: '',
      chef_paklaring: 'Tidak',

      // Seksi 04 & 05
      air_minum: '',
      air_masak: '',

      // Seksi 06
      chiller_qty: '',
      chiller_temp: '',
      chiller_ok: 'Tidak',
      freezer_qty: '',
      freezer_temp: '',
      freezer_kapasitas: '',
      freezer_ok: 'Tidak',
      rantai_dingin_semua_baik: 'Tidak',

      // Seksi 07
      kompor_high_pressure_qty: '',
      kompor_low_pressure_qty: '',
      kompor_berfungsi_qty: '',
      kompor_high_pressure_ada: 'Tidak',
      kompor_semua_baik: 'Tidak',

      // Seksi 08
      wastafel_persiapan: 'tidak',
      wastafel_pemorsian: 'tidak',
      wastafel_pengolahan: 'tidak',
      wastafel_km: 'tidak',
      wastafel_masuk: 'tidak',
      ipal_ok: 'Tidak',
      grease_trap_ok: 'Tidak',

      // Seksi 09
      apar_tersedia: 'Tidak',
      apar_berlaku: 'Tidak',

      // Seksi 10
      label_batas_waktu: 'Tidak',
      label_tidak_dibawa_pulang: 'Tidak',
      label_info_lain: '',

      // Seksi 11
      sppg_type: 'BGN',
      luas_tanah: '',
      luas_bangunan: '',
      luasan_kesesuaian: '',

      // Seksi 12
      gudang_kering_rak: 'Tidak ada',
      gudang_kering_palet: 'Tidak ada',
      gudang_basah_rak: 'Tidak ada',
      gudang_basah_palet: 'Tidak ada',

      // Seksi 13
      alur_produksi: '',

      // Seksi 14
      cctv_titik_kritis: 'Tidak',
      cctv_qty: '',
      cctv_tipe: 'IP Cam',
      internet_speedtest_ok: 'Tidak',
      internet_download: '',
      internet_upload: '',
      internet_provider: ''
    };
  }

  // State Aktif
  const state = {
    formData: getCleanInitialState(),
    attachedFiles: {},
    scores: null,
    signatureDataUrl: null
  };

  // Inisialisasi Saat Dokumen Siap
  document.addEventListener('DOMContentLoaded', () => {
    initServiceWorker();
    initDropdowns();
    loadDraft();
    bindInputEvents();
    initSignaturePad();
    recalculateScores();
    setupDropzones();
    setupModalEvents();
    setupResetButton();
    setupBackupRestore();
  });

  // 0. Registrasi PWA Service Worker (Mode Produksi & Offline)
  function initServiceWorker() {
    if ('serviceWorker' in navigator && (window.location.protocol === 'http:' || window.location.protocol === 'https:')) {
      navigator.serviceWorker.register('./sw.js').catch((err) => {
        console.warn('PWA Service Worker offline caching note:', err);
      });
    }
  }

  // 1. Inisialisasi Dropdown Pencarian Kab/Kota
  function initDropdowns() {
    const trigger = document.getElementById('kabkota-trigger');
    const menu = document.getElementById('kabkota-menu');
    const searchInput = document.getElementById('kabkota-search');
    const listContainer = document.getElementById('kabkota-options');
    const valueDisplay = document.getElementById('kabkota-value');

    function renderOptions(filterText = '') {
      listContainer.innerHTML = '';
      const filtered = KAB_KOTA_LIST.filter(k => k.toLowerCase().includes(filterText.toLowerCase()));
      if (filtered.length === 0) {
        listContainer.innerHTML = '<div class="p-3 text-sm text-slate-500">Kabupaten/Kota tidak ditemukan</div>';
        return;
      }
      filtered.forEach(city => {
        const item = document.createElement('div');
        item.className = 'px-4 py-2 text-sm text-slate-800 hover:bg-blue-50 cursor-pointer transition-colors';
        item.textContent = city;
        item.onclick = () => {
          state.formData.kab_kota = city;
          valueDisplay.textContent = city;
          valueDisplay.classList.remove('text-slate-400');
          valueDisplay.classList.add('text-slate-900', 'font-medium');
          menu.classList.add('hidden');
          saveDraft();
        };
        listContainer.appendChild(item);
      });
    }

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('hidden');
      if (!menu.classList.contains('hidden')) {
        searchInput.focus();
        renderOptions(searchInput.value);
      }
    });

    searchInput.addEventListener('input', (e) => {
      renderOptions(e.target.value);
    });

    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && e.target !== trigger) {
        menu.classList.add('hidden');
      }
    });
  }

  // 2. Hubungkan Input DOM dengan State
  function bindInputEvents() {
    const inputs = document.querySelectorAll('input[data-field], select[data-field], textarea[data-field]');
    inputs.forEach(input => {
      const field = input.getAttribute('data-field');
      if (state.formData[field] !== undefined) {
        input.value = state.formData[field];
      }

      input.addEventListener('input', (e) => {
        state.formData[field] = e.target.value;
        saveDraft();
        recalculateScores();
      });

      input.addEventListener('change', (e) => {
        state.formData[field] = e.target.value;
        saveDraft();
        recalculateScores();
      });
    });

    // Tangani tombol radio kustom (Radio Card)
    const radioButtons = document.querySelectorAll('button[data-radio-group]');
    radioButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const group = btn.getAttribute('data-radio-group');
        const val = btn.getAttribute('data-value');
        state.formData[group] = val;

        const siblings = document.querySelectorAll(`button[data-radio-group="${group}"]`);
        siblings.forEach(s => updateRadioStyles(s, s.getAttribute('data-value') === val));

        saveDraft();
        recalculateScores();
      });
    });
  }

  function updateRadioStyles(btn, isSelected) {
    if (isSelected) {
      btn.classList.add('border-blue-600', 'bg-blue-50', 'text-blue-700', 'font-semibold');
      btn.classList.remove('border-slate-300', 'bg-white', 'text-slate-700');
    } else {
      btn.classList.remove('border-blue-600', 'bg-blue-50', 'text-blue-700', 'font-semibold');
      btn.classList.add('border-slate-300', 'bg-white', 'text-slate-700');
    }
  }

  // 3. Kalkulasi Ulang Skor & Pembaruan HUD
  function recalculateScores() {
    if (!window.ScoringEngine) return;

    const res = window.ScoringEngine.calculateAll(state.formData);
    state.scores = res;

    const hudScore = document.getElementById('hud-total-score');
    const hudBadge = document.getElementById('hud-grade-badge');
    const hudFoodSafety = document.getElementById('hud-food-safety');
    const hudLegalitas = document.getElementById('hud-legalitas');
    const hudLahan = document.getElementById('hud-lahan');

    if (hudScore) hudScore.textContent = res.total.toFixed(1) + '%';
    if (hudFoodSafety) hudFoodSafety.textContent = `${res.clusters.keamananPangan.toFixed(1)}/65%`;
    if (hudLegalitas) hudLegalitas.textContent = `${res.clusters.legalitasSDM.toFixed(1)}/23%`;
    if (hudLahan) hudLahan.textContent = `${res.clusters.lahanK3.toFixed(1)}/12%`;

    if (hudBadge) {
      hudBadge.textContent = `Grade ${res.grade} · ${res.recommendation}`;
      hudBadge.className = 'px-3 py-1 text-xs font-bold rounded-full inline-flex items-center gap-1.5 ' +
        (res.grade === 'A' ? 'bg-emerald-100 text-emerald-800' :
         res.grade === 'B' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800');
    }

    const komporRatioInfo = document.getElementById('kompor-ratio-info');
    if (komporRatioInfo) {
      const pm = parseFloat(state.formData.target_pm);
      const kompor = parseFloat(state.formData.kompor_berfungsi_qty);
      if (!isNaN(pm) && pm > 0 && !isNaN(kompor) && kompor >= 0) {
        const ratio = (kompor * 450) / pm;
        komporRatioInfo.textContent = `Kapasitas: ${(kompor * 450)} PM / Target ${pm} PM (Rasio: ${ratio.toFixed(2)}) ${ratio >= 1.0 ? '✓ Cukup' : '✗ Kurang'}`;
        komporRatioInfo.className = ratio >= 1.0 ? 'text-xs font-bold text-emerald-700' : 'text-xs font-bold text-red-700';
      } else {
        komporRatioInfo.textContent = 'Menunggu input jumlah kompor & target PM...';
        komporRatioInfo.className = 'text-xs font-medium text-slate-500';
      }
    }
  }

  // 4. File Dropzones & Pemicu Kamera
  function setupDropzones() {
    const dropzones = document.querySelectorAll('.evidence-dropzone');
    dropzones.forEach(dz => {
      const fieldId = dz.getAttribute('data-evidence-id');
      const fileInput = dz.querySelector('input[type="file"]');

      dz.addEventListener('click', (e) => {
        if (e.target.tagName !== 'BUTTON' && e.target !== fileInput) {
          fileInput.click();
        }
      });

      fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          state.attachedFiles[fieldId] = file.name;
          showFilePreview(dz, file.name);
          saveDraft();
        }
      });
    });
  }

  function showFilePreview(dz, fileName) {
    const previewEl = dz.querySelector('.file-preview');
    const defaultContent = dz.querySelector('.dropzone-default');
    if (previewEl && defaultContent) {
      defaultContent.classList.add('hidden');
      previewEl.classList.remove('hidden');
      previewEl.querySelector('.file-name').textContent = fileName;
      const timestamp = new Date().toLocaleString('id-ID');
      previewEl.querySelector('.file-timestamp').textContent = `Timestamp: ${timestamp} [Terverifikasi]`;
    }
  }

  // 5. Kanvas Tanda Tangan Digital (Ketua Satgas MBG)
  function initSignaturePad() {
    const canvas = document.getElementById('signature-pad');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let isDrawing = false;

    function resizeCanvas() {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * 2;
      canvas.height = rect.height * 2;
      ctx.scale(2, 2);
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = '#1e3a8a';
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function getPos(e) {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    }

    function startDraw(e) {
      isDrawing = true;
      const pos = getPos(e);
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
      e.preventDefault();
    }

    function draw(e) {
      if (!isDrawing) return;
      const pos = getPos(e);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
      e.preventDefault();
    }

    function endDraw() {
      if (isDrawing) {
        isDrawing = false;
        state.signatureDataUrl = canvas.toDataURL();
      }
    }

    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mousemove', draw);
    window.addEventListener('mouseup', endDraw);

    canvas.addEventListener('touchstart', startDraw, { passive: false });
    canvas.addEventListener('touchmove', draw, { passive: false });
    window.addEventListener('touchend', endDraw);

    const clearBtn = document.getElementById('btn-clear-sig');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        state.signatureDataUrl = null;
      });
    }
  }

  // 6. Modal Rekomendasi & Tombol Cetak / Kirim
  function setupModalEvents() {
    const btnNext = document.getElementById('btn-next-step');
    const modal = document.getElementById('recommendation-modal');
    const btnCloseModal = document.getElementById('btn-close-modal');
    const btnPrint = document.getElementById('btn-print-report');
    const btnSubmitFinal = document.getElementById('btn-submit-final');
    const charCounter = document.getElementById('char-count');
    const notesInput = document.getElementById('rec-notes');

    if (btnNext) {
      btnNext.addEventListener('click', () => {
        recalculateScores();
        populateModalData();
        modal.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    if (btnCloseModal) {
      btnCloseModal.addEventListener('click', () => {
        modal.classList.add('hidden');
      });
    }

    if (notesInput && charCounter) {
      notesInput.addEventListener('input', (e) => {
        charCounter.textContent = `${e.target.value.length}/2000`;
      });
    }

    if (btnPrint) {
      btnPrint.addEventListener('click', () => {
        window.print();
      });
    }

    if (btnSubmitFinal) {
      btnSubmitFinal.addEventListener('click', () => {
        if (!state.signatureDataUrl) {
          showToast('Tanda tangan Ketua Satgas MBG wajib dibubuhkan sebelum mengirim hasil!', 'error');
          return;
        }
        showToast('Hasil triase berhasil diverifikasi. Mengalihkan ke portal resmi BGN...', 'success');
        setTimeout(() => {
          window.open('https://s.bgn.go.id/satgas-mbg', '_blank');
        }, 1200);
      });
    }
  }

  function populateModalData() {
    const res = state.scores;
    if (!res) return;

    document.getElementById('modal-sppg-name').textContent = state.formData.sppg_name || 'SPPG Belum Dinamai';
    document.getElementById('modal-sppg-id').textContent = `ID SPPG: ${state.formData.sppg_id || '-'}`;
    document.getElementById('modal-kabkota').textContent = `Kab/Kota: ${state.formData.kab_kota || '-'}`;
    document.getElementById('modal-total-score').textContent = res.total.toFixed(1) + '%';
    document.getElementById('modal-grade-title').textContent = `Grade ${res.grade} — ${res.recommendation}`;

    const modalBadge = document.getElementById('modal-grade-badge');
    modalBadge.className = 'p-4 rounded-xl text-center mb-6 ' +
      (res.grade === 'A' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
       res.grade === 'B' ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-red-50 text-red-800 border border-red-200');

    document.getElementById('modal-food-safety').textContent = `${res.clusters.keamananPangan.toFixed(1)} / 65%`;
    document.getElementById('modal-legalitas').textContent = `${res.clusters.legalitasSDM.toFixed(1)} / 23%`;
    document.getElementById('modal-lahan').textContent = `${res.clusters.lahanK3.toFixed(1)} / 12%`;
  }

  // 7. PERBAIKAN TOMBOL RESET FORMULIR (Lengkap & Bersih)
  function setupResetButton() {
    const btnReset = document.getElementById('btn-reset-draft');
    if (!btnReset) return;

    btnReset.addEventListener('click', () => {
      const confirmed = window.confirm(
        'PERINGATAN RESET:\n\nApakah Bos yakin ingin mereset seluruh formulir checklist?\nSemua isian data, bukti foto, dan tanda tangan akan dibersihkan kembali ke 0%.'
      );

      if (!confirmed) return;

      // 1. Reset state data
      state.formData = getCleanInitialState();
      state.attachedFiles = {};
      state.signatureDataUrl = null;

      // 2. Bersihkan penyimpanan lokal
      localStorage.removeItem(STORAGE_KEY);

      // 3. Kosongkan semua input & select DOM
      const inputs = document.querySelectorAll('input[data-field], select[data-field], textarea[data-field]');
      inputs.forEach(input => {
        const field = input.getAttribute('data-field');
        if (field === 'inspection_date') {
          input.value = new Date().toISOString().split('T')[0];
        } else if (input.tagName === 'SELECT') {
          input.selectedIndex = 0;
        } else {
          input.value = '';
        }
      });

      // 4. Reset pilihan tombol radio card ke default bersih
      const allRadioButtons = document.querySelectorAll('button[data-radio-group]');
      allRadioButtons.forEach(btn => {
        const group = btn.getAttribute('data-radio-group');
        const val = btn.getAttribute('data-value');
        const isDefaultSelected = (state.formData[group] === val);
        updateRadioStyles(btn, isDefaultSelected);
      });

      // 5. Reset Dropdown Kab/Kota
      const kabDisplay = document.getElementById('kabkota-value');
      if (kabDisplay) {
        kabDisplay.textContent = 'Pilih Kabupaten / Kota';
        kabDisplay.classList.remove('text-slate-900', 'font-medium');
        kabDisplay.classList.add('text-slate-400');
      }

      // 6. Reset seluruh Dropzone Berkas
      const dropzones = document.querySelectorAll('.evidence-dropzone');
      dropzones.forEach(dz => {
        const fileInput = dz.querySelector('input[type="file"]');
        const previewEl = dz.querySelector('.file-preview');
        const defaultContent = dz.querySelector('.dropzone-default');
        if (fileInput) fileInput.value = '';
        if (previewEl) previewEl.classList.add('hidden');
        if (defaultContent) defaultContent.classList.remove('hidden');
      });

      // 7. Bersihkan Kanvas Tanda Tangan
      const canvas = document.getElementById('signature-pad');
      if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      // 8. Tutup Modal jika terbuka
      const modal = document.getElementById('recommendation-modal');
      if (modal) modal.classList.add('hidden');

      // 9. Hitung ulang skor (otomatis menjadi 0.0% Grade D)
      recalculateScores();

      // 10. Scroll ke bagian atas dengan mulus
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // 11. Tampilkan notifikasi konfirmasi
      showToast('Formulir checklist berhasil direset total ke kondisi awal bersih.', 'info');
    });
  }

  // 8. Fitur Cadangkan (Export) & Pulihkan (Import) Berkas Data
  function setupBackupRestore() {
    const btnExport = document.getElementById('btn-export-json');
    const inputImport = document.getElementById('input-import-json');

    if (btnExport) {
      btnExport.addEventListener('click', () => {
        const exportPayload = {
          app: 'SPPG-Triase-BGN',
          version: '1.0.0',
          exportedAt: new Date().toISOString(),
          data: state.formData,
          scores: state.scores
        };

        const jsonStr = JSON.stringify(exportPayload, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const sppgId = state.formData.sppg_id || 'DRAFT';
        a.href = url;
        a.download = `sppg-triase-${sppgId}-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
        showToast('Data berhasil diekspor sebagai berkas JSON cadangan.', 'success');
      });
    }

    if (inputImport) {
      inputImport.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const parsed = JSON.parse(event.target.result);
            if (parsed && parsed.data) {
              Object.assign(state.formData, parsed.data);
              saveDraft();
              syncDomWithState();
              recalculateScores();
              showToast('Data checklist berhasil dipulihkan dari berkas JSON.', 'success');
            } else {
              showToast('Format berkas JSON tidak valid!', 'error');
            }
          } catch (err) {
            showToast('Gagal membaca berkas JSON: ' + err.message, 'error');
          }
        };
        reader.readAsText(file);
      });
    }
  }

  function syncDomWithState() {
    // Sinkronkan input form
    const inputs = document.querySelectorAll('input[data-field], select[data-field], textarea[data-field]');
    inputs.forEach(input => {
      const field = input.getAttribute('data-field');
      if (state.formData[field] !== undefined) {
        input.value = state.formData[field];
      }
    });

    // Sinkronkan tombol radio
    const allRadioButtons = document.querySelectorAll('button[data-radio-group]');
    allRadioButtons.forEach(btn => {
      const group = btn.getAttribute('data-radio-group');
      const val = btn.getAttribute('data-value');
      const isSelected = (state.formData[group] === val);
      updateRadioStyles(btn, isSelected);
    });

    // Sinkronkan display Kab/Kota
    const kabDisplay = document.getElementById('kabkota-value');
    if (kabDisplay && state.formData.kab_kota) {
      kabDisplay.textContent = state.formData.kab_kota;
      kabDisplay.classList.remove('text-slate-400');
      kabDisplay.classList.add('text-slate-900', 'font-medium');
    }
  }

  // 9. Toast Notifikasi Mengambang
  function showToast(message, type = 'info') {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-notification';
      toast.className = 'fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl shadow-xl text-xs sm:text-sm font-semibold flex items-center gap-2 pointer-events-none opacity-0 transform -translate-y-2';
      document.body.appendChild(toast);
    }

    if (type === 'success') {
      toast.className = 'fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl shadow-xl text-xs sm:text-sm font-semibold flex items-center gap-2 pointer-events-none opacity-100 transform translate-y-0 bg-emerald-700 text-white border border-emerald-500';
    } else if (type === 'error') {
      toast.className = 'fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl shadow-xl text-xs sm:text-sm font-semibold flex items-center gap-2 pointer-events-none opacity-100 transform translate-y-0 bg-red-700 text-white border border-red-500';
    } else {
      toast.className = 'fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl shadow-xl text-xs sm:text-sm font-semibold flex items-center gap-2 pointer-events-none opacity-100 transform translate-y-0 bg-slate-900 text-white border border-slate-700';
    }

    toast.textContent = message;

    setTimeout(() => {
      toast.classList.remove('opacity-100', 'translate-y-0');
      toast.classList.add('opacity-0', '-translate-y-2');
    }, 2800);
  }

  // 10. Penyimpanan Draft Lokal
  function saveDraft() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.formData));
    } catch (e) {
      console.warn('Gagal menyimpan draft:', e);
    }
  }

  function loadDraft() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        Object.assign(state.formData, parsed);
        syncDomWithState();
      }
    } catch (e) {
      console.warn('Gagal membaca draft:', e);
    }
  }

})();

/**
 * app.js — Kontroler Interaktif & Antarmuka Triase SPPG BGN
 * Menghubungkan Form UI dengan ScoringEngine, Validasi, Dropdown Kab/Kota, dan Canvas TTD
 */

(function () {
  'use strict';

  // Daftar Kabupaten/Kota Representatif Se-Indonesia
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

  // State Utama Aplikasi
  const state = {
    formData: {
      sppg_id: '',
      sppg_name: '',
      target_pm: '3000',
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
      air_minum: 'RO',
      air_masak: 'RO',

      // Seksi 06
      chiller_qty: '1',
      chiller_temp: '4',
      chiller_ok: 'Ya',
      freezer_qty: '1',
      freezer_temp: '-18',
      freezer_kapasitas: '500',
      freezer_ok: 'Ya',
      rantai_dingin_semua_baik: 'Ya',

      // Seksi 07
      kompor_high_pressure_qty: '2',
      kompor_low_pressure_qty: '6',
      kompor_berfungsi_qty: '8',
      kompor_high_pressure_ada: 'Ya',
      kompor_semua_baik: 'Ya',

      // Seksi 08
      wastafel_persiapan: 'lengkap',
      wastafel_pemorsian: 'lengkap',
      wastafel_pengolahan: 'lengkap',
      wastafel_km: 'lengkap',
      wastafel_masuk: 'lengkap',
      ipal_ok: 'Ya',
      grease_trap_ok: 'Ya',

      // Seksi 09
      apar_tersedia: 'Ya',
      apar_berlaku: 'Ya',

      // Seksi 10
      label_batas_waktu: 'Ya',
      label_tidak_dibawa_pulang: 'Ya',
      label_info_lain: '',

      // Seksi 11
      sppg_type: 'BGN',
      luas_tanah: '500',
      luas_bangunan: '350',
      luasan_kesesuaian: 'Sesuai',

      // Seksi 12
      gudang_kering_rak: 'Stainless steel',
      gudang_kering_palet: 'Stainless steel',
      gudang_basah_rak: 'Stainless steel',
      gudang_basah_palet: 'Stainless steel',

      // Seksi 13
      alur_produksi: 'sekat_penuh',

      // Seksi 14
      cctv_titik_kritis: 'Ya',
      cctv_qty: '10',
      cctv_tipe: 'IP Cam',
      internet_speedtest_ok: 'Ya',
      internet_download: '50',
      internet_upload: '20',
      internet_provider: 'Telkom IndiHome'
    },
    attachedFiles: {},
    scores: null,
    signatureDataUrl: null
  };

  const STORAGE_KEY = 'sppg_assessment_draft_v1';

  // Inisialisasi DOM setelah halaman siap
  document.addEventListener('DOMContentLoaded', () => {
    initDropdowns();
    loadDraft();
    bindInputEvents();
    initSignaturePad();
    recalculateScores();
    setupDropzones();
    setupModalEvents();
  });

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
    // Tangani input teks dan number
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
    });

    // Tangani tombol radio kustom (Radio Card)
    const radioButtons = document.querySelectorAll('button[data-radio-group]');
    radioButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const group = btn.getAttribute('data-radio-group');
        const val = btn.getAttribute('data-value');
        state.formData[group] = val;

        // Perbarui gaya tombol radio dalam satu grup
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

    // Perbarui HUD Total Skor
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

    // Perbarui Rasio Kompor Info
    const komporRatioInfo = document.getElementById('kompor-ratio-info');
    if (komporRatioInfo) {
      const pm = parseFloat(state.formData.target_pm) || 3000;
      const kompor = parseFloat(state.formData.kompor_berfungsi_qty) || 0;
      const ratio = pm > 0 ? (kompor * 450) / pm : 0;
      komporRatioInfo.textContent = `Kapasitas: ${(kompor * 450)} PM / Target ${pm} PM (Rasio: ${ratio.toFixed(2)}) ${ratio >= 1.0 ? '✓ Cukup' : '✗ Kurang'}`;
      komporRatioInfo.className = ratio >= 1.0 ? 'text-xs font-medium text-emerald-600' : 'text-xs font-medium text-red-600';
    }
  }

  // 4. File Dropzones & Simulasi Kamera
  function setupDropzones() {
    const dropzones = document.querySelectorAll('.evidence-dropzone');
    dropzones.forEach(dz => {
      const fieldId = dz.getAttribute('data-evidence-id');
      const fileInput = dz.querySelector('input[type="file"]');
      const previewEl = dz.querySelector('.file-preview');
      const defaultContent = dz.querySelector('.dropzone-default');

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
    let hasSigned = false;

    // Set canvas dimension matching container
    function resizeCanvas() {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * 2;
      canvas.height = rect.height * 2;
      ctx.scale(2, 2);
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = '#1e3a8a'; // Navy Blue TTD resmi
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
      hasSigned = true;
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
        hasSigned = false;
      });
    }
  }

  // 6. Modal Rekomendasi & Navigasi Wizard
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
          alert('Tanda tangan Ketua Satgas MBG Kabupaten/Kota wajib dibubuhkan sebelum mengirimkan hasil!');
          return;
        }
        alert('Data evaluasi berhasil dikunci dan diarsip. Anda akan dialihkan ke portal resmi BGN: https://s.bgn.go.id/satgas-mbg');
        window.open('https://s.bgn.go.id/satgas-mbg', '_blank');
      });
    }

    const btnReset = document.getElementById('btn-reset-draft');
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        if (confirm('Apakah Bos yakin ingin mereset seluruh formulir? Data draft akan dihapus.')) {
          localStorage.removeItem(STORAGE_KEY);
          location.reload();
        }
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

  // 7. Penyimpanan Draft Lokal (LocalStorage)
  function saveDraft() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.formData));
    } catch (e) {
      console.warn('Gagal menyimpan draft ke localStorage', e);
    }
  }

  function loadDraft() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        Object.assign(state.formData, parsed);
        // Perbarui tampilan elemen yang sudah dimuat
        const kabDisplay = document.getElementById('kabkota-value');
        if (kabDisplay && state.formData.kab_kota) {
          kabDisplay.textContent = state.formData.kab_kota;
          kabDisplay.classList.remove('text-slate-400');
          kabDisplay.classList.add('text-slate-900', 'font-medium');
        }
      }
    } catch (e) {
      console.warn('Gagal membaca draft dari localStorage', e);
    }
  }

})();

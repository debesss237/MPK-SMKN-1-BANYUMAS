// ==================== SCROLL REVEAL ====================
const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const index = Array.from(reveals).indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, (index % 4) * 100);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

reveals.forEach((el) => observer.observe(el));

// ==================== ACTIVE NAV LINK ====================
// Tandai link aktif berdasarkan halaman saat ini
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach((a) => {
  const href = a.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});

// ==================== TABS (pengurus.html) ====================
const tabBtns = document.querySelectorAll('.tab-btn');
if (tabBtns.length) {
  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      tabBtns.forEach((b) => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach((c) => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(target).classList.add('active');
    });
  });
}

// ==================== GALERI FILTER ====================
const filterBtns = document.querySelectorAll('.filter-btn');
if (filterBtns.length) {
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.galeri-item').forEach((item) => {
        if (filter === 'semua' || item.dataset.kategori === filter) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// ==================== FORM KONTAK ====================
const formKontak = document.querySelector('.form-kontak');
if (formKontak) {
  formKontak.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validasi
    const nama = document.getElementById('nama').value.trim();
    const kelas = document.getElementById('kelas').value.trim();
    const email = document.getElementById('email').value.trim();
    const subjek = document.getElementById('subjek').value.trim();
    const pesan = document.getElementById('pesan').value.trim();

    if (!nama || !kelas || !email || !subjek || !pesan) {
      alert('Semua field harus diisi!');
      return;
    }

    try {
      // Import Firebase functions (assuming window.db is set from module)
      const { collection, addDoc, serverTimestamp } = await import('https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js');

      // Simpan ke Firestore
      await addDoc(collection(window.db, 'messages'), {
        nama,
        kelas,
        email,
        subjek,
        pesan,
        timestamp: serverTimestamp()
      });

      alert('Pesan berhasil dikirim! Kami akan menghubungi Anda segera.');
      formKontak.reset();
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Terjadi kesalahan. Silakan coba lagi.');
    }
  });
}

// ==================== HAMBURGER MENU ====================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

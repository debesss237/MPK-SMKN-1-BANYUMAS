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
// Removed tab functionality since only MPK content remains

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
  formKontak.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validasi
    const nama = document.getElementById('nama').value.trim();
    const kelas = document.getElementById('kelas').value.trim();
    const email = document.getElementById('email').value.trim();
    const subjek = document.getElementById('subjek').value.trim();
    const pesan = document.getElementById('pesan').value.trim();

    if (!nama || !kelas || !subjek || !pesan) {
      alert('Semua field harus diisi!');
      return;
    }

    // Nomor WhatsApp (ganti dengan nomor asli)
    const whatsappNumber = '6285747529407'; // 62xxxxxxxxx

    // Buat pesan
    const emailLine = email ? `\nEmail: ${email}` : '';
    const message = `Halo, saya ${nama} dari ${kelas}.${emailLine}\nSubjek: ${subjek}\nPesan: ${pesan}`;

    // URL WhatsApp
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    // Buka WhatsApp
    window.open(url, '_blank');

    alert('Pesan akan dibuka di WhatsApp. Pastikan WhatsApp terinstall dan nomor sudah benar.');
    formKontak.reset();
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

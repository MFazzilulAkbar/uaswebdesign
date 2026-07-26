/* ==========================================================================
   IMMORTAL ESPORTS ARENA - Combined Script (Home, Paket, Tentang, Kontak)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------------------------
    // 1. NAVIGASI UTAMA (Single Page Application - SPA)
    // ----------------------------------------------------------------------
    const navTriggers = document.querySelectorAll('[data-page]');
    const pageViews = document.querySelectorAll('.page-view');

    function switchPage(pageId) {
        if (!pageId) return;

        const targetPageId = pageId.toLowerCase();

        // Sembunyikan semua halaman
        pageViews.forEach(view => {
            view.classList.remove('active');
        });

        // Tampilkan halaman tujuan (page-home, page-paket, page-tentang, page-kontak)
        const targetView = document.getElementById(`page-${targetPageId}`);
        if (targetView) {
            targetView.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            console.warn(`Halaman dengan ID "page-${targetPageId}" tidak ditemukan.`);
        }

        // Perbarui status menu aktif di Navbar
        const navPageLinks = document.querySelectorAll('.navbar-nav .nav-link-page');
        navPageLinks.forEach(link => {
            const linkPage = link.getAttribute('data-page');
            if (linkPage && linkPage.toLowerCase() === targetPageId) {
                link.classList.add('active', 'text-white');
                link.classList.remove('text-white-50');
            } else {
                link.classList.remove('active', 'text-white');
                link.classList.add('text-white-50');
            }
        });

        // Tutup otomatis menu navbar versi mobile setelah diklik
        const navbarCollapse = document.getElementById('navbarLinks');
        if (navbarCollapse && typeof $ !== 'undefined' && $(navbarCollapse).hasClass('show')) {
            $(navbarCollapse).collapse('hide');
        }
    }

    // Pasang event listener ke seluruh tombol & link yang memiliki data-page
    navTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = trigger.getAttribute('data-page');
            switchPage(pageId);
        });
    });

    // ----------------------------------------------------------------------
    // 2. INTERAKSI HALAMAN PAKET (Booking via WA)
    // ----------------------------------------------------------------------
    const packageCards = document.querySelectorAll('#page-paket .card-custom');

    packageCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.cursor = 'pointer';
        });

        card.addEventListener('click', (e) => {
            // Jika area kartu diklik (bukan tombolnya langsung), jalankan tautan WA
            if (!e.target.classList.contains('btn-booking')) {
                const bookingBtn = card.querySelector('.btn-booking');
                if (bookingBtn) {
                    window.open(bookingBtn.getAttribute('href'), '_blank');
                }
            }
        });
    });

    // ----------------------------------------------------------------------
    // 3. INTERAKSI HALAMAN TENTANG & FASILITAS
    // ----------------------------------------------------------------------
    const facilityCards = document.querySelectorAll('#page-tentang .row .p-4');
    facilityCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.cursor = 'default';
        });
    });

    // ----------------------------------------------------------------------
    // 4. INTERAKSI HALAMAN KONTAK (Form Submit via WA)
    // ----------------------------------------------------------------------
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Ambil data dari field input form kontak
            const name = document.getElementById('name')?.value || '';
            const email = document.getElementById('email')?.value || '';
            const subject = document.getElementById('subject')?.value || '';
            const message = document.getElementById('message')?.value || '';

            // Nomor Tujuan WhatsApp Admin Arena (Disamakan dengan tombol booking)
            const phoneNumber = "6281280027111";

            // Format Pesan WhatsApp
            const waText = `Halo Immortal Arena!%0A` +
                `*Nama:* ${encodeURIComponent(name)}%0A` +
                `*Email/HP:* ${encodeURIComponent(email)}%0A` +
                `*Topik:* ${encodeURIComponent(subject)}%0A` +
                `*Pesan:* ${encodeURIComponent(message)}`;

            // Redirect langsung ke WhatsApp
            window.open(`https://wa.me/${phoneNumber}?text=${waText}`, '_blank');

            // Reset form setelah dikirim
            contactForm.reset();
        });
    }

});

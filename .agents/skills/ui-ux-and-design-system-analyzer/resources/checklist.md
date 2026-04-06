# Design System Audit Checklist

Gunakan checklist ini saat menjalankan FASE 1 — DISCOVERY & AUDIT.
Periksa setiap poin dan tandai statusnya: ✅ OK | ⚠️ Perlu perhatian | ❌ Tidak ada/Bermasalah

---

## 🎨 COLOR SYSTEM (Bobot: 25%)

### Token & Struktur
- [ ] Apakah ada primary/secondary/neutral palette yang terdefinisi (bukan hardcoded)?
- [ ] Apakah warna menggunakan semantic naming? (misal: `--color-primary`, `--color-surface`, bukan `--color-blue-500`)
- [ ] Apakah ada skala warna lengkap (50–900 atau light/default/dark)?

### Aksesibilitas & Semantik
- [ ] Apakah kontras teks pada background memenuhi **WCAG AA** (4.5:1 untuk teks normal, 3:1 untuk teks besar)?
- [ ] Apakah warna status (error/warning/success/info) konsisten di seluruh aplikasi?
- [ ] Apakah warna tidak menjadi **satu-satunya** pembeda informasi (untuk pengguna buta warna)?

### Dark Mode
- [ ] Apakah dark mode dipertimbangkan?
- [ ] Jika ada, apakah token warna menggunakan `light-dark()` atau variabel yang bisa di-override?

---

## 🔤 TYPOGRAPHY (Bobot: 20%)

### Font Family
- [ ] Apakah jumlah font family **maksimal 2** (satu untuk heading, satu untuk body)?
- [ ] Apakah font dimuat dengan benar dan ada fallback yang sesuai?

### Type Scale
- [ ] Apakah ada **type scale** yang konsisten? (misal: 12/14/16/20/24/32/40/48px)
- [ ] Apakah font-weight menggunakan variabel/token? (bukan nilai angka raw di tiap komponen)
- [ ] Apakah line-height konsisten per kategori teks?
- [ ] Apakah letter-spacing diatur untuk heading?

### Hierarchy
- [ ] Apakah heading hierarchy jelas (H1 > H2 > H3 > H4)?
- [ ] Apakah hanya ada **satu H1** per halaman?
- [ ] Apakah body text mudah dibaca di berbagai ukuran layar (min 14–16px)?

---

## 📐 SPACING & LAYOUT (Bobot: 20%)

### Spacing System
- [ ] Apakah spacing menggunakan **sistem kelipatan**? (4px, 8px, 12px, 16px, 24px, 32px, 48px, dll.)
- [ ] Apakah spacing didefinisikan sebagai token/variabel (bukan nilai arbitrary)?
- [ ] Apakah whitespace antar komponen konsisten?

### Grid & Layout
- [ ] Apakah **grid system** terdefinisi? (misal: 12-column, 4-column untuk mobile)
- [ ] Apakah container max-width ditetapkan?
- [ ] Apakah layout menggunakan Flexbox/Grid secara konsisten?

### Responsif
- [ ] Apakah **breakpoint** terdefinisi dan konsisten? (misal: sm:640px, md:768px, lg:1024px)
- [ ] Apakah komponen berperilaku benar di setiap breakpoint?
- [ ] Apakah pendekatan **mobile-first** diterapkan?

---

## 🧩 COMPONENT CONSISTENCY (Bobot: 25%)

### Tombol (Button)
- [ ] Apakah tombol memiliki **semua state**: default, hover, active, focus, disabled, loading?
- [ ] Apakah ada variant yang konsisten? (primary, secondary, ghost, danger)
- [ ] Apakah ukuran tombol menggunakan token spacing?

### Form & Input
- [ ] Apakah form input konsisten di semua form? (label, placeholder, helper text, error state)
- [ ] Apakah ada visual focus indicator yang jelas?
- [ ] Apakah error state menggunakan warna dan icon (bukan hanya warna)?

### Icon
- [ ] Apakah menggunakan **satu icon library** (bukan campuran beberapa library)?
- [ ] Apakah ukuran icon konsisten?
- [ ] Apakah icon memiliki `aria-label` atau teks tersembunyi untuk screen reader?

### Modularitas
- [ ] Apakah komponen **reusable** (tidak copy-paste kode yang sama di banyak tempat)?
- [ ] Apakah ada komponen yang terlalu besar dan perlu dipecah?
- [ ] Apakah naming komponen konsisten (PascalCase, kebab-case)?

---

## 🎬 MOTION & INTERACTION (Bobot: 10%)

### Animasi
- [ ] Apakah durasi animasi konsisten? (misal: `150ms` untuk micro, `300ms` untuk modal, `500ms` untuk page transition)
- [ ] Apakah **easing function** konsisten? (misal: selalu `ease-out` untuk elemen masuk)
- [ ] Apakah animasi dapat dimatikan dengan `prefers-reduced-motion`?

### Feedback Interaksi
- [ ] Apakah ada visual feedback untuk setiap aksi pengguna (click, submit, loading)?
- [ ] Apakah transisi halaman/view terasa mulus?

---

## ♿ AKSESIBILITAS (Tambahan)

- [ ] Apakah semua gambar memiliki `alt` yang deskriptif?
- [ ] Apakah keyboard navigation berfungsi dengan benar (Tab order logis)?
- [ ] Apakah komponen interaktif menggunakan ARIA role yang sesuai?
- [ ] Apakah ada skip-to-content link untuk keyboard users?

---

## Cara Mengisi Hasil

Sajikan hasil dalam tabel seperti ini:

| Kategori | Status | Temuan Utama | Prioritas |
|---|---|---|---|
| Color System | ⚠️ | 3 warna hardcoded, tidak ada semantic token | Tinggi |
| Typography | ❌ | 4 font family berbeda, tidak ada type scale | Kritis |
| Spacing | ✅ | Sudah menggunakan Tailwind spacing | Rendah |
| Components | ⚠️ | Button tidak punya state disabled | Sedang |
| Motion | ✅ | Transisi konsisten | Rendah |

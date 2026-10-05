# Assets Folder

Simpan file gambar kamu di folder ini. Struktur yang disarankan:

```
assets/
  hero/         → Foto besar kamu untuk halaman depan (1 foto, portrait 3:4)
  about/        → Foto portrait untuk section "tentang saya" (1 foto, portrait 3:4)
  photography/  → Hasil hunting foto (6+ foto)
  video/        → Thumbnail video editing (3 thumbnail, 16:9)
  design/       → Hasil desain grafis (4+ gambar, landscape 4:3)
```

## Cara mengganti placeholder

1. Taruh file gambar kamu di folder yang sesuai
2. Buka `index.html`
3. Ganti `<span class="placeholder-label">...</span>` dengan `<img src="assets/hero/nama-file.jpg" alt="deskripsi">`

Contoh:
```html
<!-- Sebelum -->
<div class="hero__photo" id="hero-photo">
  <span class="placeholder-label">Your Photo</span>
</div>

<!-- Sesudah -->
<div class="hero__photo" id="hero-photo">
  <img src="assets/hero/foto-saya.jpg" alt="Foto portrait saya">
</div>
```

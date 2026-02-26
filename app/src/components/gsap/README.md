# GSAP Components untuk Portfolio

Koleksi komponen GSAP yang telah ditambahkan ke portfolio untuk meningkatkan interaktivitas dan visual appeal.

## 🎯 Komponen yang Sudah Diimplementasikan

### 1. Custom Cursor
**File:** `CustomCursor.tsx`

Kursor custom yang mengikuti mouse dengan efek hover pada elemen interaktif.

```tsx
import { CustomCursor } from '@/components/gsap'

// Penggunaan di App.tsx
<CustomCursor color="#0084ff" size={24} hoverScale={1.5} />
```

**Props:**
- `color` - Warna kursor (default: #0084ff)
- `size` - Ukuran kursor (default: 20)
- `hoverScale` - Skala saat hover (default: 2)
- `blendMode` - Blend mode (default: 'difference')

**Fitur tambahan:**
- `CursorFollower` - Elemen yang mengikuti kursor dengan delay
- `SpotlightCursor` - Efek spotlight yang mengikuti kursor
- `TrailCursor` - Jejak kursor yang mengikuti

---

### 2. Scroll Progress
**File:** `ScrollProgress.tsx`

Indikator progress scroll di bagian atas halaman.

```tsx
import { ScrollProgress } from '@/components/gsap'

// Penggunaan
<ScrollProgress color="#0084ff" height={4} position="top" />
```

**Props:**
- `color` - Warna progress bar
- `height` - Tinggi progress bar
- `position` - Posisi ('top' | 'bottom')

**Fitur tambahan:**
- `CircularScrollProgress` - Progress bar bentuk lingkaran
- `DotProgress` - Indikator progress dengan dots

---

### 3. Magnetic Button
**File:** `MagneticButton.tsx`

Tombol yang "menarik" kursor saat mendekat.

```tsx
import { MagneticButton } from '@/components/gsap'

// Penggunaan
<MagneticButton 
  onClick={() => console.log('clicked')}
  className="btn-primary"
  strength={0.3}
>
  Klik Saya
</MagneticButton>
```

**Props:**
- `strength` - Kekuatan magnet (0-1)
- `children` - Konten tombol
- `onClick` - Handler klik
- `className` - Class CSS

**Fitur tambahan:**
- `MagneticElement` - Versi untuk div/element lain
- `RippleButton` - Tombol dengan efek ripple
- `GlowButton` - Tombol dengan efek glow

---

### 4. Text Scramble
**File:** `TextScramble.tsx`

Efek teks yang berubah-ubah seperti hacker/matrix saat hover.

```tsx
import { TextScramble } from '@/components/gsap'

// Penggunaan
<TextScramble text="Portfolio" triggerOnHover={true} />
```

**Props:**
- `text` - Teks yang akan di-scramble
- `triggerOnHover` - Trigger saat hover (default: true)
- `className` - Class CSS

**Fitur tambahan:**
- `TextReveal` - Teks yang terungkap per kata saat scroll
- `SplitText` - Animasi per huruf (wave, bounce, fade, rotate)
- `Typewriter` - Efek mengetik

---

### 5. Tilt Card
**File:** `Card3D.tsx`

Kartu yang tilt/condong mengikuti posisi kursor (3D effect).

```tsx
import { TiltCard } from '@/components/gsap'

// Penggunaan
<TiltCard maxTilt={15} glareEnable={true}>
  <div className="card-content">
    <h3>Judul Kartu</h3>
    <p>Deskripsi kartu...</p>
  </div>
</TiltCard>
```

**Props:**
- `maxTilt` - Sudut tilt maksimum (default: 15)
- `scale` - Skala saat hover (default: 1.02)
- `glareEnable` - Enable efek glare (default: true)
- `perspective` - Perspective value (default: 1000)

**Fitur tambahan:**
- `Card3D` - Kartu dengan efek flip 3D
- `StackedCards` - Kartu yang ditumpuk
- `HoverExpandCard` - Kartu yang expand saat hover
- `AccordionCard` - Kartu accordion horizontal

---

### 6. Parallax Image
**File:** `ParallaxImage.tsx`

Gambar dengan efek parallax saat scroll.

```tsx
import { ParallaxImage } from '@/components/gsap'

// Penggunaan
<ParallaxImage 
  src="/image.jpg" 
  alt="Deskripsi"
  speed={0.5}
  direction="up"
/>
```

**Props:**
- `src` - URL gambar
- `alt` - Alt text
- `speed` - Kecepatan parallax
- `direction` - Arah ('up' | 'down' | 'left' | 'right')
- `scale` - Enable scale effect

**Fitur tambahan:**
- `ParallaxContainer` - Container dengan multiple layers
- `ParallaxText` - Teks dengan efek parallax
- `RevealImage` - Gambar yang terungkap dengan mask
- `ZoomImage` - Gambar yang zoom saat scroll

---

### 7. Stagger Animation
**File:** `StaggerAnimation.tsx`

Animasi stagger untuk multiple elements.

```tsx
import { StaggerContainer, BounceIn, SlideIn } from '@/components/gsap'

// Penggunaan StaggerContainer
<StaggerContainer staggerDelay={0.1} animation="fadeUp">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</StaggerContainer>

// Penggunaan SlideIn
<SlideIn direction="left" distance={100}>
  <div>Konten yang slide dari kiri</div>
</SlideIn>

// Penggunaan BounceIn
<BounceIn delay={0.5}>
  <div>Konten dengan efek bounce</div>
</BounceIn>
```

**Animations:**
- `fadeUp`, `fadeDown`, `fadeLeft`, `fadeRight`
- `scale`, `rotate`

**Fitur tambahan:**
- `StaggerGrid` - Grid dengan animasi stagger
- `CascadeAnimation` - Animasi cascade/wave
- `FlipAnimation` - Animasi flip
- `MaskReveal` - Animasi reveal dengan mask
- `CounterAnimation` - Animasi angka counting

---

### 8. Particle Background
**File:** `ParticleBackground.tsx`

Background dengan partikel yang bergerak dan terhubung.

```tsx
import { ParticleBackground, GradientOrbs, NoiseTexture } from '@/components/gsap'

// Penggunaan Particle Background
<ParticleBackground 
  particleCount={50}
  particleColor="#0084ff"
  connectionDistance={150}
/>

// Penggunaan Gradient Orbs
<GradientOrbs orbCount={5} className="opacity-50" />

// Penggunaan Noise Texture
<NoiseTexture opacity={0.03} />
```

**Props ParticleBackground:**
- `particleCount` - Jumlah partikel
- `particleColor` - Warna partikel
- `particleSize` - Ukuran partikel
- `connectionDistance` - Jarak koneksi antar partikel
- `connectionColor` - Warna garis koneksi
- `speed` - Kecepatan partikel

**Fitur tambahan:**
- `FloatingParticles` - Partikel yang melayang
- `ConstellationBackground` - Background seperti konstelasi bintang
- `GradientOrbs` - Orbs gradient yang melayang
- `NoiseTexture` - Tekstur noise overlay

---

## 📁 Struktur File

```
src/components/gsap/
├── index.ts              # Export semua komponen
├── TextScramble.tsx      # Efek teks
├── MagneticButton.tsx    # Efek tombol magnetic
├── CustomCursor.tsx      # Kursor custom
├── ScrollProgress.tsx    # Progress scroll
├── ParallaxImage.tsx     # Efek parallax
├── Card3D.tsx            # Kartu 3D
├── ParticleBackground.tsx # Background partikel
├── StaggerAnimation.tsx  # Animasi stagger
└── README.md             # Dokumentasi ini
```

## 🚀 Cara Menggunakan

1. **Import komponen yang diinginkan:**
```tsx
import { CustomCursor, MagneticButton, TextScramble } from '@/components/gsap'
```

2. **Tambahkan ke komponen utama (App.tsx):**
```tsx
function App() {
  return (
    <div>
      <CustomCursor />
      <ScrollProgress />
      
      {/* Konten website */}
      <MagneticButton>
        Klik Saya
      </MagneticButton>
      
      <TextScramble text="Portfolio" />
    </div>
  )
}
```

3. **Untuk efek hover pada elemen, tambahkan attribute:**
```tsx
<button data-cursor-hover>Klik Saya</button>
<a data-cursor-text="View">Link</a>
```

## 🎨 Kustomisasi

Semua komponen memiliki props yang bisa dikustomisasi. Lihat dokumentasi masing-masing komponen untuk detail props yang tersedia.

## 📱 Responsive

- Custom cursor otomatis disabled di touch devices
- Semua komponen responsive dan mobile-friendly
- Gunakan `hidden md:block` untuk menyembunyikan efek di mobile

## ⚡ Performance

- Semua animasi menggunakan `will-change` untuk optimasi
- GSAP menggunakan hardware acceleration
- Particle background bisa dikurangi jumlahnya untuk performa lebih baik

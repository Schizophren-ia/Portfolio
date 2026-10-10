# LÊ ĐẶNG ĐÀI TRANG — Cinematic Film Producer Portfolio

A high-end, award-level portfolio website for Vietnamese Feature Film Producer **Lê Đặng Đài Trang**, built with **React 19**, **Vite**, **Tailwind CSS**, **GSAP (ScrollTrigger)**, and **Lenis** smooth scrolling. Designed around the aesthetic concept: *"The Page is a Film."*

---

## 🎬 Featured Films

1. **Nhắm mắt thấy mùa hè** (2018) — *Romance · Drama · Indie Feature*
   - **Đạo diễn**: Cao Thúy Nhi
   - **Diễn viên**: Phương Anh Đào, Takafumi Akutsu
   - [Xem Trailer](https://www.youtube.com/watch?v=tlNtE3IW6bE)

2. **Trời sáng rồi, ta ngủ đi thôi** (2019) — *Indie Musical Drama · Youth Romance*
   - **Đạo diễn**: Chung Chí Công
   - **Diễn viên**: Hà Quốc Hoàng, Trần Lê Thúy Vy
   - [Xem Trailer](https://www.youtube.com/watch?v=pKE389nMnk8)

3. **Sài Gòn trong cơn mưa** (2020) — *Romance · Music · Youth Drama*
   - **Đạo diễn**: Lê Minh Hoàng
   - **Diễn viên**: Avin Lu, Hồ Thu Anh
   - [Xem Trailer](https://www.youtube.com/watch?v=Eyju5ODfd-g)

4. **Trái tim quái vật** (2020) — *Mystery · Psychological Thriller · Crime*
   - **Đạo diễn**: Tạ Nguyên Hiệp
   - **Diễn viên**: Hoàng Thùy Linh, B Trần, Hứa Vĩ Văn, Quang Trung
   - [Xem Trailer](https://www.youtube.com/watch?v=qgVg0xh_ogQ)

5. **Giao lộ 8675** (2023) — *Anthology Adventure · Youth · Action*
   - **Đạo diễn**: Tân DS
   - **Diễn viên**: Isaac, Rocker Nguyễn, Lợi Trần, Emma Lê, La Thành
   - [Xem Trailer](https://www.youtube.com/watch?v=wrOLqdg54Bo)

---

## ✨ Cinematic Highlights & Technical Architecture

- **Preloader**: Đồng hồ đếm 000% → 100% kèm hiệu ứng tách 2 cánh cửa màn bạc điện ảnh.
- **Hero Presentation**: Khung ngắm camera 4 góc `┌ ┐ └ ┘`, Typography nhận diện *LÊ ĐẶNG ĐÀI TRANG · FILM PRODUCER · HCMC*, nền video điện ảnh.
- **About Me**:
  - Bố cục trượt ngang 2 slide: Slide 01 (Văn bản tâm huyết *"Since I was young..."* với hiệu ứng word scrub brightening) & Slide 02 (4 thẻ Stats số liệu + 5 khối Dossier chuyên nghiệp: Học vấn, Ngôn ngữ, Kỹ năng, Hộ chiếu, Sở thích).
  - Điều hướng tinh giản với mũi tên nhỏ 2 bên (`←` và `→`) cùng bộ đếm `01 / 02`.
  - Khung ảnh chân dung sắc nét tự nhiên, căn chỉnh cân bằng hoàn hảo giữa 2 cột.
- **Filmmaking Section**:
  - **GSAP ScrollTrigger Pinned Horizontal Scroll with Scrubbed Parallax Layers** đa tầng (Ambient Typography, Film Track, Inner Image Counter-Parallax, Floating Badges, Golden Cine Scrubber).
  - Tích hợp nút xem trailer YouTube chính thức và Lightbox Video Modal hiển thị thông tin phim tinh gọn (Thể loại, Đạo diễn, Diễn viên).
- **Experiences / Timeline**: Dòng thời gian kinh nghiệm sản xuất phim và dấu ấn quốc tế.
- **Contact**: Biểu mẫu liên hệ & thông tin kết nối trực tiếp.

---

## 🎨 Color Tokens & Design System

- `--noble-black` (`#1E2524`): Dominant cinematic dark background
- `--solo` (`#CCD4D0`): Primary crisp typography & borders
- `--wainscot-green` (`#9D9F87`): Secondary muted labels & metadata
- `--hive-delight` (`#F1C34C`): Primary gold accent (headings, buttons, timecode)
- `--stone-ground` (`#D39730`): Secondary warm accent
- `--olivia` (`#986626`): Viewfinder lines & subtle glows
- `--deep-bronze` (`#504530`): Elevated surfaces & panels

---

## 🚀 Getting Started Locally

### Yêu cầu
- [Node.js](https://nodejs.org/) v18+

### Cài đặt và Chạy thử
```bash
# Cài đặt thư viện dependencies
npm install

# Khởi chạy môi trường phát triển (Dev server)
npm run dev
```

Truy cập `http://localhost:5173` trên trình duyệt.

### Đóng gói Production (Build)
```bash
npm run build
```
Mã nguồn tối ưu sẽ được tạo trong thư mục `dist/`.

---

## 🌐 Deploy (Vercel / Netlify)

1. Đẩy mã nguồn lên kho lưu trữ GitHub.
2. Kết nối với **Vercel** hoặc **Netlify**.
3. Khung thiết lập sẽ tự nhận diện Vite:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Bấm **Deploy**.

# Kế Hoạch Phát Triển Dự Án Portfolio (plan.md)
**Dự án**: Cinematic Portfolio Website — Film Producer Lê Đặng Đài Trang  
**Tech Stack**: Vite, React 19, Tailwind CSS v4, GSAP (ScrollTrigger), Lenis Smooth Scroll  
**Local Dev URL**: `http://localhost:5173/`

---

## 1. Quy Trình Làm Việc Chuẩn (Workflow)

Mọi thay đổi từ thời điểm này sẽ tuân thủ nghiêm ngặt theo 4 bước sau:

1. **Bước 1 — Tiếp nhận ý tưởng**: Bạn (User) nêu ý tưởng, yêu cầu tính năng hoặc thay đổi giao diện.
2. **Bước 2 — Đề xuất giải pháp**: Antigravity trình bày chi tiết:
   - Ý tưởng thiết kế & bố cục UI/UX.
   - Cách áp dụng hiệu ứng (animations, tương tác, transition).
   - Tác động tới mã nguồn & các thành phần liên quan.
3. **Bước 3 — Chờ duyệt (Approval Gate)**: Antigravity **dừng lại và chờ bạn xác nhận/đồng ý** trước khi viết hay sửa bất kỳ dòng mã nào.
4. **Bước 4 — Triển khai & Cập nhật**: Sau khi được duyệt:
   - Tiến hành code và kiểm thử (build test, snapshot preview).
   - Trình bày kết quả trực quan và cập nhật lịch sử thay đổi vào file `plan.md`.

---

## 2. Tổng Quan Hiện Trạng Website

| Khu vực | Trạng thái hiện tại | Ghi chú kỹ thuật |
| :--- | :--- | :--- |
| **Preloader** | Hoàn thành | Đếm số 000% -> 100%, tách cửa 2 cánh điện ảnh |
| **Hero Section** | Hoàn thành | Khung ngắm camera 4 góc `┌ ┐ └ ┘`, Typography: *LÊ ĐẶNG ĐÀI TRANG*, *PRODUCER*, *HCMC*, video background |
| **About Me** | Hoàn thành | Bố cục 2 slide trượt ngang tinh giản cao cấp: <br>• **Tiêu đề ABOUT ME**: Khóa cố định trên 1 dòng đơn (`whitespace-nowrap`), triệt tiêu hoàn toàn lỗi chập nháy xuống dòng.<br>• **Điều hướng tinh gọn**: Đã loại bỏ ô tab Statement và các nút bấm thô cồng kềnh; sử dụng cụm mũi tên nhỏ 2 bên (`←` và `→`) cùng bộ đếm `01 / 02` ở tiêu đề và nút chuyển trực quan hai bên cạnh nội dung.<br>• **Nội dung thuần túy**: Slide 01 giữ trọn vẹn văn bản tâm huyết (*"Since I was young..."*) với hiệu ứng scroll scrub brightening; Slide 02 hiển thị 4 thẻ Stats & 5 khối Dossier.<br>• **Ảnh chân dung sắc nét**: Căn chỉnh tỷ lệ tự nhiên (`object-[center_15%]`, bỏ phóng đại `scale: 1.15`), giữ trọn 100% độ sắc nét gốc và cân bằng hoàn hảo chiều cao giữa 2 cột, không còn cảm giác lồi lõm. |
| **Filmmaking Section** | Hoàn thành | • **GSAP ScrollTrigger Pinned Horizontal Scroll with Scrubbed Parallax Layers** đa tầng (Ambient Typography, Film Track, Inner Image Counter-Parallax, Floating Badges, Golden Cine Scrubber).<br>• Tích hợp link trailer YouTube chính thức cho cả 5 tác phẩm.<br>• **Bảng Thông Tin Phim (Modal Credits) tinh gọn**: Đã cấu hình chỉ hiển thị đúng 3 mục cốt lõi: **Thể loại**, **Đạo diễn**, **Diễn viên**; loại bỏ hoàn toàn các trường máy móc camera hay định dạng cũ. |
| **Experiences / Timeline** | Hoàn thành | Dòng thời gian kinh nghiệm và thành tựu |
| **Contact Section** | Hoàn thành | Thông tin liên hệ, form và mạng xã hội |

---

## 3. Nhật Ký Thay Đổi (Changelog)

### [2026-10-10 - Cập nhật 4]
- **Đẩy Toàn Bộ Mã Nguồn Dự Án Lên GitHub Repository**:
  - **Kho lưu trữ chính thức**: [https://github.com/Schizophren-ia/Portfolio](https://github.com/Schizophren-ia/Portfolio)
  - **Khởi tạo & Đồng bộ Git**:
    - Khởi tạo Git repository trên nhánh `main`.
    - Cập nhật `.gitignore` loại trừ hoàn toàn các file ảnh chụp test tạm thời, file cache, script automation kiểm thử nhằm đảm bảo repo sạch sẽ, gọn nhẹ, chuyên nghiệp.
    - Cập nhật tài liệu [README.md](file:///d:/test/README.md) đầy đủ thông tin về Portfolio Nhà sản xuất điện ảnh **Lê Đặng Đài Trang**, 5 tác phẩm điện ảnh, công nghệ GSAP Parallax và hướng dẫn deploy.
    - Tạo root commit: `feat: Cinematic Portfolio Website - Film Producer Le Dang Dai Trang` (47 files sạch, 6484 dòng code).
    - Đẩy thành công toàn bộ mã nguồn lên GitHub nhánh `main`.

### [2026-10-09 - Cập nhật 3]
- **Tối ưu Section About Me (Giao diện tinh giản & Fix lỗi layout)**:
  - **Loại bỏ ô Statement thô vướng**: Gỡ bỏ thanh tabs lớn `01. STATEMENT / 02. DOSSIER & STATS` cùng các nút chuyển slide cồng kềnh ở chân nội dung, trả lại không gian tối giản, thanh lịch chuẩn portfolio điện ảnh.
  - **Sửa dứt điểm lỗi chữ "ABOUT ME" nhấp nháy xuống dòng**:
    - Thêm thuộc tính `whitespace-nowrap shrink-0` cho khối tiêu đề và tên vị trí.
    - Giảm tải không gian chiếm dụng ở thanh header từ ~320px xuống còn ~90px, giúp tiêu đề luôn có đủ độ rộng hiển thị ổn định trên mọi kích thước màn hình mà không bị giật dòng hay chập reflow.
  - **Điều hướng bằng mũi tên nhỏ 2 bên**:
    - Trang bị cặp nút mũi tên nhỏ `←` và `→` cùng chỉ số `01 / 02` trên góc header.
    - Bổ sung nút mũi tên nhỏ nổi hai bên lề (`←` bên trái khi xem Dossier và `→` bên phải khi xem Statement) để chuyển đổi nhanh 1-click mượt mà giữa 2 slide.
  - **Cân đối khung hình đại diện & giữ nét tối đa (Tránh lồi lõm)**:
    - Loại bỏ độ phóng to `scale: 1.15` trong animation GSAP để giữ nguyên vẹn độ sắc nét gốc của bức ảnh chân dung 960x960.
    - Căn chỉnh điểm nhìn `object-[center_15%]` để giữ trọn vẹn khuôn mặt, tóc và bờ vai tự nhiên.
    - Giới hạn chiều cao khung ảnh tối ưu (`max-h-[480px]`) đồng bộ nhịp nhàng với chiều cao khối nội dung bên phải, xóa bỏ hoàn toàn hiện tượng lệch độ cao hay lồi lõm.

- **Tinh giản Bảng Credits trong Filmmaking Modal**:
  - Tái cấu trúc bảng thông tin phim trong Lightbox Modal, chỉ hiển thị đúng 3 trường thông tin:
    1. **Thể loại** (Genre)
    2. **Đạo diễn** (Director)
    3. **Diễn viên** (Starring / Cast)
  - Loại bỏ toàn bộ các mục thừa: Camera & Tools, Aspect Ratio, Release Year, Shooting Locations trong bảng credits.
  - Bổ sung dữ liệu đạo diễn và diễn viên chính xác cho toàn bộ 5 tác phẩm:
    - *Nhắm mắt thấy mùa hè*: Đạo diễn Cao Bá Dung / Diễn viên: Phương Anh Đào, Takafumi Akutsu
    - *Trời sáng rồi, ta ngủ đi thôi*: Đạo diễn Chung Chí Công / Diễn viên: Hà Quốc Hoàng, Trần Lê Thúy Vy
    - *Sài Gòn trong cơn mưa*: Đạo diễn Lê Minh Hoàng / Diễn viên: Avin Lu, Hồ Thu Anh
    - *Trái tim quái vật*: Đạo diễn Tạ Nguyên Hiệp / Diễn viên: Hoàng Thùy Linh, B Trần, Hứa Vĩ Văn, Quang Trung
    - *Giao lộ 8675*: Đạo diễn Tân DS / Diễn viên: Isaac, Rocker Nguyễn, Lợi Trần, Emma Lê, La Thành
  - Bổ sung hàm ánh xạ fallback an toàn đảm bảo luôn hiển thị chuẩn xác 100% kể cả trong môi trường cache.

---

## 4. Kế Hoạch & Ý Tưởng Tiếp Theo (Roadmap)

*(Đang chờ ý tưởng tiếp theo từ bạn)*


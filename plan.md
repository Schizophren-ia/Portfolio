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
| **About Me** | Hoàn thành | Bố cục 2 slide trượt ngang tinh giản cao cấp: <br>• **Tiêu đề ABOUT ME**: Khóa cố định trên 1 dòng đơn (`whitespace-nowrap`), triệt tiêu hoàn toàn lỗi chập nháy xuống dòng.<br>• **Điều hướng tinh gọn**: Cụm mũi tên nhỏ 2 bên (`←` và `→`) cùng bộ đếm `01 / 02`.<br>• **Nội dung thuần túy**: Slide 01 giữ trọn văn bản tâm huyết với scroll scrub brightening; Slide 02 hiển thị 4 thẻ Stats & 5 khối Dossier.<br>• **Ảnh chân dung sắc nét**: Giữ 100% độ sắc nét gốc tự nhiên, zoom 1.03x êm dịu, khung ngắm camera 4 góc `┌ ┐ └ ┘` kèm REC HUD.<br>• **Hiệu ứng Khí Quyển Gió Vàng Ánh Kim (Golden Shimmering Breeze)**: Luồng gió cong khí động học ôm sát viền ngoài, 14 hạt bụi kim loại vàng và các điểm lóe sáng quang học (lens glint) tinh tế ở 4 góc, hoàn toàn không che mặt. |
| **Filmmaking Section** | Hoàn thành | • **GSAP ScrollTrigger Pinned Horizontal Scroll with Scrubbed Parallax Layers** đa tầng (Ambient Typography, Film Track, Inner Image Counter-Parallax, Floating Badges, Golden Cine Scrubber).<br>• Tích hợp link trailer YouTube chính thức cho cả 5 tác phẩm.<br>• **Bảng Thông Tin Phim (Modal Credits) tinh gọn**: Đã cấu hình chỉ hiển thị đúng 3 mục cốt lõi: **Thể loại**, **Đạo diễn**, **Diễn viên**; loại bỏ hoàn toàn các trường máy móc camera hay định dạng cũ. |
| **Experiences / Timeline** | Hoàn thành | Dòng thời gian kinh nghiệm và thành tựu |
| **Contact Section** | Hoàn thành | Thông tin liên hệ, form và mạng xã hội |

---

## 3. Nhật Ký Thay Đổi (Changelog)

### [2026-10-10 - Cập nhật 6]
- **Tích Hợp Hiệu Ứng Khí Quyển Gió Vàng Ánh Kim (Subtle Golden Shimmering Breeze)** quanh khung chân dung:
  - **Dòng chảy gió uốn lượn (Curved Wind Streamlines)**:
    - Xây dựng thành phần chuyên biệt `GoldenBreezeAtmosphere.tsx` sử dụng đồ họa vector SVG với các đường cong Bezier khí động học mềm mại ôm sát viền ngoài khung ngắm máy quay.
    - Animation chu kỳ dài liên tục `breezeFlow` (10s - 14s) xuôi và ngược chiều tạo cảm giác luồng gió tự nhiên, thanh thoát và thoáng đãng (airy & refined).
  - **Phối màu chuẩn bảng màu điện ảnh (Palette-Based Tones)**:
    - Stone Ground `#D39730`
    - Hive Delight `#F1C34C`
    - Olivia `#986626`
    - Phối màu chuyển sắc mượt mà (linear gradients) từ trong suốt sang ánh vàng ấm và tan vào không gian điện ảnh.
  - **Hạt bụi kim loại vi mô (Perimeter Metallic Particles)**:
    - 14 hạt bụi vàng kim loại siêu nhỏ (1.5px - 2.4px) phân bổ dọc theo 4 cạnh viền ngoài khung hình.
    - Chuyển động lệch pha (staggered delay & drift vectors) mô phỏng những hạt bụi vàng bay lơ lửng theo làn gió ấm.
  - **Điểm lóe sáng quang học tinh tế (Delicate Sparkles / Lens Glints)**:
    - Bố trí 4 điểm lóe sáng quang học dạng dấu chữ thập siêu mảnh 4 tia tại 4 góc khung ngắm camera.
    - Chu kỳ xuất hiện thưa thớt (mỗi 6 - 8 giây chỉ chớp nhẹ một lần), mô phỏng ống kính máy quay điện ảnh bắt tia sáng vàng le lói chứ không hề dày đặc hay ma thuật kiểu hoạt hình (not magical or glitter-heavy).
  - **Khuôn mặt & ảnh chân dung nguyên vẹn tuyệt đối**:
    - Khu vực trung tâm chiếm 70% khung hình hoàn toàn rỗng và trong suốt (`transparent`).
    - Khuôn mặt, ánh mắt, nụ cười và trang phục của nhà sản xuất Lê Đặng Đài Trang giữ nguyên 100% độ tương phản, màu sắc tự nhiên và sắc nét, không bị bất kỳ lớp sương hay filter nào che khuất.
  - **Trạng thái tương tác (Idle vs. Hover)**:
    - Trạng thái nghỉ (Idle): Luồng gió và bụi kim loại chuyển động nhẹ nhàng, ẩn hiện với độ mờ tinh tế (`opacity: 0.40`).
    - Trạng thái di chuột / chạm (Hover / Touch): Toàn bộ luồng gió và hạt bụi bừng sáng mượt mà (`opacity: 0.90`), kết hợp nhịp nhàng với micro-zoom `1.03x` của khung ảnh và âm thanh lấy nét màn trập êm dịu.
  - **Khả năng tiếp cận & Tương thích**:
    - Hỗ trợ đầy đủ `@media (prefers-reduced-motion: reduce)` dừng animation mượt mà.
    - Thao tác cảm ứng nhạy bén trên màn hình cảm ứng di động (`onTouchStart` / `onTouchEnd`).

### [2026-10-10 - Cập nhật 5]
- **Tối ưu Ảnh Đại Diện: Bỏ Bộ Lọc Đen Trắng & Nâng Cấp Hiệu Ứng Điện Ảnh Cao Cấp (Subtle & Premium)**:
  - **Màu sắc tự nhiên (Natural Full Color)**: Bỏ hoàn toàn bộ lọc `grayscale`, hiển thị trung thực màu sắc da ấm, nền lá xanh dịu mắt và áo sơ mi trắng tinh tế của ảnh chân dung gốc.
  - **Zoom Smoothness**: Micro-zoom siêu êm ái `1.03x` (chỉ 3%), đảm bảo hình ảnh luôn giữ 100% độ sắc nét nguyên bản mà không bị vỡ hay phóng đại quá mức.
  - **Hover Timing**: Chuyển động với thời gian lý tưởng `800ms` trên đường cong `cubic-bezier(0.16, 1, 0.3, 1)` cinematic mượt mà cả khi đưa chuột vào và rời đi.
  - **Camera Frame Elegance (Khung ngắm máy quay)**:
    - 4 góc khung ngắm quang học `┌ ┐ └ ┘` bằng kim loại vàng nhạt `border-hive-delight/50` chuyển `border-hive-delight`.
    - Viền ngắm tự động co giãn vi mô (từ `inset-3` sang `inset-3.5`) khi hover tạo hiệu ứng lấy nét ống kính (lens focus).
    - Tích hợp 2 thẻ chỉ số quang học tinh tế: đèn đỏ nhấp nháy `[● REC]` góc trên và thông số `35MM · F/1.4 PRIME` góc dưới.
  - **Particle Density (Hạt bụi ánh sáng điện ảnh)**: 12 hạt bụi vàng siêu nhỏ (fine golden cine particles) lơ lửng nhẹ nhàng, tăng chiều sâu quang học mà không làm rối mắt hay che mặt.
  - **Sound Trigger Behavior**: Tích hợp âm thanh click màn trập cơ học / lấy nét quang học siêu êm (~0.05 volume) thông qua Web Audio API không phụ thuộc asset ngoài; có cơ chế throttle chống spam âm thanh.
  - **Reduced-Motion Fallback**: Tự động tắt zoom và hạt bụi chuyển động khi hệ điều hành bật chế độ `prefers-reduced-motion`.
  - **Mobile Behavior**: Tương thích hoàn toàn với màn hình cảm ứng di động (hỗ trợ `onTouchStart`), không bị kẹt hover và không vi phạm chính sách autoplay âm thanh.

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


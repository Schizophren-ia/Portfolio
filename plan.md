# Kế Hoạch Phát Triển Dự Án Portfolio (plan.md)
**Dự án**: Cinematic Portfolio Website — Film Producer Lê Đặng Đài Trang  
**Tech Stack**: Vite, React 19, Tailwind CSS v4, GSAP (ScrollTrigger), Lenis Smooth Scroll  
**Local Dev URL**: `http://localhost:5173/`

---

## 1. Quy Trình Làm Việc Chuẩn (Workflow)

Theo yêu cầu được cập nhật ngày 23.10.2026, mọi thay đổi tuân thủ 6 bước:

1. **Ý tưởng**: Người dùng nêu yêu cầu hoặc ý tưởng.
2. **Đề xuất**: Trợ lý trình bày phương án, cách làm, phạm vi và ảnh hưởng tới giao diện/mã nguồn.
3. **Duyệt**: Chờ người dùng duyệt phương án trước khi triển khai. Yêu cầu đề xuất mới chưa được duyệt chỉ được ghi nhận, không tự áp dụng vào website.
4. **Thực hiện**: Triển khai và kiểm tra phương án đã được duyệt.
5. **Cập nhật GitHub và website**: Commit, push và xác nhận triển khai thành công trên website công khai.
6. **Báo cáo**: Sau khi triển khai, ghi thay đổi, file liên quan, kết quả kiểm tra, mã commit và trạng thái xuất bản vào `plan.md`; đồng bộ báo cáo lên GitHub.

---

## 2. Tổng Quan Hiện Trạng Website

| Khu vực | Trạng thái hiện tại | Ghi chú kỹ thuật |
| :--- | :--- | :--- |
| **Preloader** | Hoàn thành | Đếm số 000% -> 100% vàng Hive Delight, loại bỏ hoàn toàn các dòng chữ kỹ thuật thừa gây chèn lấn (Frame rate, Color, Aspect, Subtitle). Hai cánh cửa letterbox điện ảnh đen tuyền tách mở mượt mà khi vào web. |
| **Hero Section** | Hoàn thành | Typography: *LÊ ĐẶNG ĐÀI TRANG* trên 1 dòng duy nhất (#F1C34C). Nội dung (tên, chức danh, nhãn, nút CTA) căn giữa toán học 100% (dead center) tuyệt đối. Khung ngắm 4 góc ┌ ┐ └ ┘ nới rộng sát mép trái/phải nhưng hạ an toàn xuống dưới thanh tác vụ (`top-20` đến `top-28`), loại bỏ hoàn toàn việc đè lấn navbar hay Logo/INQUIRE. Cụm 'SCROLL TO BEGIN' neo độc lập đáy viewport. |
| **About Me** | Hoàn thành | Bố cục 2 slide trượt ngang tinh giản cao cấp: <br>• **Ảnh chân dung tự nhiên, sắc nét**: Giữ trọn tỷ lệ đứng dọc điện ảnh `aspect-[4/5] max-h-[480px]`, đã gỡ bỏ hoàn toàn dải khí vàng và các hạt bụi lấp lánh để giữ ảnh nguyên bản, trong trẻo và thanh lịch.<br>• **Khối PROFILE không khung**: Đầy đủ 3 trường thông tin, typography sang trọng.<br>• **Hiệu ứng đếm số Slide 2 (3.5s)**: Đã nâng cấp thời gian chạy lên đúng 3.5s với độ trễ siêu nhạy 0.1s. Cập nhật trực tiếp qua DOM ref loại bỏ hoàn toàn giật lag; tích hợp animation cuộn số động liên tục (rolling digits ticker) cho cả số nhỏ (5, 7, 10) và cuộn mượt mà 0 -> 1991, đảm bảo người xem nhìn thấy rõ ràng 100% từng nấc số đếm sống động suốt 3.5 giây mỗi lần bấm sang Slide 2. |
| **Filmmaking Section** | Hoàn thành | • **GSAP ScrollTrigger Pinned Horizontal Scroll with Scrubbed Parallax Layers** đa tầng.<br>• Thay thế 100% bằng 5 ảnh poster phim chính thức chuẩn 16:9 full-frame nội bộ.<br>• **Sửa triệt để căn lề thẻ nổi**: Gỡ bỏ chuyển động dịch chuyển `x: 45` giúp thẻ số thứ tự (01/05 -> 05/05) neo chuẩn xác sát góc trái (`top-3 left-3`), không bị thụt lề; thẻ danh hiệu (laurel) neo chuẩn xác góc phải (`top-3 right-3`) mở rộng hiển thị 100% văn bản, hoàn toàn không bị khuất chữ.<br>• Mũi tên chéo (↗) click mở ngay trailer YouTube trên tab mới.<br>• **Modal Credits tinh gọn 3 mục**: Thể loại, Đạo diễn, Diễn viên. |
| **Experiences / Timeline** | Hoàn thành | Dòng thời gian hành trình Producer Journey (`ACT III — EXPERIENCES`). Đã gỡ bỏ hoàn toàn khối giải thưởng `ACCOLADES & FESTIVAL LAURELS / RECOGNITION IN EXCELLENCE` theo đúng yêu cầu, timeline kết thúc tinh gọn, chuyên nghiệp. |
| **Contact Section** | Hoàn thành | • Gỡ bỏ hoàn toàn trường chọn dropdown `PROJECT SCOPE & TYPE`, form liên hệ tinh giản với 3 trường trọng tâm: Tên, Email, Ghi chú/Tóm tắt dự án.<br>• Nút Facebook liên kết chính xác tới trang cá nhân chính thức của Nhà sản xuất Lê Đặng Đài Trang: [https://www.facebook.com/ledangdaitrang](https://www.facebook.com/ledangdaitrang). |

---

## 3. Nhật Ký Thay Đổi (Changelog)

### [2026-10-24 — Tinh chỉnh menu Mist Blue, sửa nhận diện mục và tối ưu cuộn]

**Phê duyệt:** Người dùng duyệt phương án đã điều chỉnh: giữ menu Mist Blue, tăng chữ 2px, bỏ nhãn đếm Works/Selected Works và khung EN/VI; sửa menu bị đứng ở Giới thiệu/Liên hệ, tối ưu cuộn nhưng giữ nội dung, bố cục và phong cách.

**Thay đổi đã triển khai:**

- Giữ nền menu/drawer Mist Blue `#E1E8F0` và chữ navy. Link desktop tăng 12→14px, link drawer 14→16px; các chữ header khác tăng 2px tương ứng. Điều chỉnh gutter/gap ở điện thoại nhỏ để nút không tràn khung.
- Mục đang xem dùng chữ semibold, gạch chân navy rõ hơn và `aria-current="location"`. Dành sẵn chiều rộng chữ đậm để link không xê dịch khi chuyển trạng thái. EN/VI bỏ viền/nền thường trực; giữ gạch chân ngôn ngữ đang chọn, vùng bấm cao 44px và viền focus chỉ khi dùng bàn phím.
- Bỏ badge tổng Selected Works và nhãn Works của cả sáu nhóm trong Filmmaking, áp dụng EN/VI. Không xóa tác phẩm, chỉ số trên thẻ hoặc nhãn trợ năng của carousel; tổng vẫn 36, Short Film 13/TVC 11, thứ tự và media giữ nguyên.
- Sửa nguyên nhân menu đứng: bỏ IntersectionObserver yêu cầu 25% chiều cao toàn section (không phù hợp section Tác phẩm rất dài). Dùng vị trí bắt đầu các section và đường đọc dưới header; đo lại khi section/header đổi kích thước, gồm đổi ngôn ngữ, resize, font/ảnh reflow. Theo dõi đúng khi cuộn xuống/lên và tại cuối trang.
- Chuyển trạng thái mục vào Navigation để không render lại toàn bộ App/archive khi đổi mục. Gộp scroll event vào một requestAnimationFrame, cache phép đo layout, dùng `scaleX` cho thanh tiến trình và cập nhật text timecode trực tiếp tối đa 24Hz thay vì React state mỗi sự kiện cuộn. React chỉ cập nhật khi mục/trạng thái thu gọn/menu thay đổi.
- Đồng bộ menu và hai nút Hero qua cùng tiện ích Lenis, dùng lerp 0.12, nhập CSS hỗ trợ chính thức của phiên bản đang cài và bỏ CSS smooth toàn trang. Giữ vuốt/quán tính native trên điện thoại; hỗ trợ đổi reduced-motion trực tiếp. Drawer có vùng cuộn riêng không truyền wheel/touch sang Lenis nền; modal tiếp tục khóa và khôi phục cuộn.
- Giữ Lora + Be Vietnam Pro, sửa cắt dấu Hero, nội dung, màu navy phần dưới, video và carousel. Cập nhật design-system. Dùng checklist điều hướng/hiệu năng/focus của skill `ui-ux-pro-max`; công cụ tra cứu Python không khả dụng nên không sử dụng kết quả tra cứu chưa xác minh.

**File liên quan:** `src/App.tsx`, `src/components/Navigation.tsx`, `src/components/LanguageSwitch.tsx`, `src/components/FilmmakingSection.tsx`, `src/components/HeroSection.tsx`, `src/utils/smoothScroll.ts`, `src/index.css`, `design-system/filmmaker-portfolio/MASTER.md`.

**Kiểm tra:**

- Production build, lint, `git diff --check`: đạt; lint chỉ còn cảnh báo có sẵn tại `TimecodeHUD.tsx:13`. Build/deploy CI, bao gồm kiểm tra dependency, thành công.
- Chrome: 14 tổ hợp 320×740, 375×812, 768×1024, 1024×768, 1280×900, 1440×900, 844×390 × EN/VI đạt về màu Mist Blue, cỡ chữ, EN/VI không viền/nền, focus và không tràn điều khiển. Nhãn đếm đã bỏ; menu theo đúng mọi mục cả hai chiều và tại 20/50/80% section Filmmaking.
- Đạt cuộn wheel thực, bấm chuyển mục liên tiếp có thể ngắt, offset header, mobile drawer, hai nút Hero, modal khóa nền/đóng Escape/khôi phục wheel, reduced-motion thay đổi trực tiếp và endpoint thanh tiến trình/timecode. Chuỗi touch trên chế độ điện thoại cuộn native 465px, không bị preventDefault; không thay thế kiểm thử trên thiết bị vật lý.
- Hồi quy màu/category ở 375/1440px × EN/VI đạt; các node chữ được đo ở menu/About/Journey/Contact vẫn đạt tối thiểu 5.07:1. Media gốc, thứ tự cuối TVC và Next Reel Short Film giữ đúng. 12 tổ hợp kiểm tra font/bố cục và 12 tổ hợp header/form đạt; không gửi email.
- Đối chiếu bản cũ/mới cùng chạy local bằng cùng chuỗi 30 wheel event, lặp lại sau lượt làm nóng: LayoutCount About 131→49, Filmmaking 133→54; LayoutDuration tương ứng 50.93→21.76ms và 31.42→23.35ms. Frame interval p95 headless About 16.8→16.8ms, Filmmaking 33.3→16.8ms. Tổng thời gian tác vụ còn dao động giữa các lượt; các số đo này chỉ xác nhận giảm công việc layout trong kịch bản thử, không phải cam kết FPS/CPU trên mọi thiết bị.
- Sau triển khai, chạy lại trực tiếp tên miền thật ở 375×812 và 1440×900 × EN/VI: cả bốn tổ hợp đạt cùng kiểm tra wheel, chuyển mục liên tiếp, modal và reduced-motion; không có lỗi JavaScript.

**GitHub và website:** Commit mã nguồn `8909e2781f76571f7c32c930ac92c4960ce65614` — `Refine Mist Blue navigation and fix scroll tracking and smoothness`. Build/deploy thành công: https://github.com/Schizophren-ia/Portfolio/actions/runs/40105105302. Đã xác nhận bản mới tại https://xuongphimmuahe.com/ trước khi ghi báo cáo này; đồng bộ báo cáo bằng commit tài liệu riêng `[skip ci]`.

### [2026-10-24 — Menu sáng, nền navy đồng bộ và chuyển hai phim sang Short Film]

**Phê duyệt:** Người dùng duyệt menu sáng theo palette, toàn bộ phần bên dưới trở về navy; đồng thời duyệt chuyển “Gói nỗi nhớ vào những cuộc gọi” và “Con thuyền chở cả ước mơ” từ TVC sang Short Film, giữ nguyên media/thông tin và xếp theo năm dưới hai poster đầu mục.

**Thay đổi đã triển khai:**

- Menu desktop và ngăn điều hướng mobile dùng Mist Blue `#E1E8F0`, chữ/icon Deep Navy `#0A1B2E`; trạng thái ngôn ngữ được gạch chân, focus bàn phím có viền navy rõ ràng. Thanh tiến trình dùng Cloud Blue/Storm Blue.
- Hero, About, Filmmaking, Journey, Contact và footer đồng bộ Deep Navy `#0A1B2E`; thẻ nội dung Midnight Blue `#112A46`, chữ sáng. Bỏ các hook section sáng/thẻ trắng cũ, giới hạn token sáng trong điều hướng.
- Form liên hệ dùng ô nhập navy, chữ sáng, placeholder Foggy Blue và viền Dusk Blue đủ tương phản; nút gửi Mist Blue, hover Cloud Blue. Không đổi xử lý form hoặc gửi email trong quá trình kiểm tra.
- Hai phim được đổi category/genre trong dữ liệu dùng chung EN/VI. Kết quả: 13 Short Film, 11 TVC, tổng tác phẩm vẫn 36. Giữ nguyên năm, ảnh, video YouTube, thời lượng và mô tả; Short Film tiếp tục sắp mới tới cũ dưới hai poster đầu mục. Bốn TVC cuối vẫn là hai Hack Tết rồi hai X-Men; Next Reel của phim đã chuyển nằm trong Short Film.
- Giữ nguyên Lora + Be Vietnam Pro, nội dung, bố cục, hiệu ứng và sửa lỗi cắt dấu Hero. Cập nhật design-system theo palette được duyệt. Skill `ui-ux-pro-max` hỗ trợ kiểm tra tương phản, focus, responsive và tính nhất quán màu.

**File liên quan:** `src/index.css`, `src/components/Navigation.tsx`, `src/components/LanguageSwitch.tsx`, `src/components/AboutSection.tsx`, `src/components/ExperienceSection.tsx`, `src/components/ContactSection.tsx`, `src/data/archiveData.ts`, `design-system/filmmaker-portfolio/MASTER.md`.

**Kiểm tra:**

- Production build, lint và `git diff --check`: đạt; lint chỉ còn cảnh báo có sẵn tại `TimecodeHUD.tsx:13`.
- Chrome local: 12 tổ hợp 320/375/768/1024/1280/1440px × EN/VI đạt về màu menu/section/thẻ/form, mobile drawer, focus, không tràn ngang và thứ tự/category phim. Các node chữ được đo ở menu/About/Journey/Contact đạt tương phản tối thiểu 5.07:1.
- Kiểm tra font/bố cục và menu/form ở 12 tổ hợp: đúng hai font, glyph Việt/nghiêng, các nút trong khung; Profile/Sứ mệnh khớp mép dưới ở desktop; nhập liệu giữ nguyên khi chuyển ngôn ngữ. Không thực hiện gửi form.
- Hồi quy Hero: 36 tổ hợp kích thước × EN/VI × reduced/normal motion đạt kiểm tra giới hạn nét chữ; không cắt dấu hoặc phát sinh lỗi JavaScript.
- Sau deploy, kiểm tra trực tiếp website tại 375/1440px × EN/VI: cả bốn tổ hợp đạt; xác nhận 13 Short Film/11 TVC, đúng thứ tự cuối, media gốc và Next Reel; không có lỗi runtime.

**GitHub và website:** Commit mã nguồn `423e9262e90cd1677768cc903de1484c0960a708` — `Use light navigation over navy sections and reclassify two short films`. Build/deploy thành công: https://github.com/Schizophren-ia/Portfolio/actions/runs/40099515296. Đã xác nhận bản mới trên https://xuongphimmuahe.com/ trước khi ghi báo cáo này; đồng bộ báo cáo bằng commit tài liệu riêng `[skip ci]`.

### [2026-10-24 — Sửa cắt dấu tiếng Việt trong tên Hero]

**Phê duyệt:** Người dùng duyệt phương án nới chiều cao dòng và khoảng đệm của khung Hero, giữ nguyên Lora, cỡ chữ và hiệu ứng.

**Nguyên nhân đã xác nhận:** Khung reveal dùng `overflow-hidden`, `leading-none` và padding dọc cố định 4px. Ở desktop 1288–1920px, nét dấu Lora vượt khung khoảng 5–7px phía trên và 0.6–2px phía dưới. Kiểm tra tràn ngang trước đó không phát hiện được lỗi cắt nét dọc.

**Thay đổi đã triển khai:**

- Đặt chiều cao dòng của `.hero-title` là 1.2; thay mask dùng padding cố định bằng `.hero-title-mask` với padding dọc `0.16em`, ngang `0.08em` để vùng an toàn tăng cùng cỡ font.
- Giữ `overflow: hidden` phục vụ hiệu ứng chữ xuất hiện; không đổi GSAP timeline, font Lora, độ đậm, biểu thức cỡ chữ responsive hay quy tắc một dòng.
- Chỉ nới khung và khoảng đệm của tiêu đề Hero; giữ nội dung, màu sắc và các section khác. Cập nhật quy tắc kiểm tra glyph trong design-system.

**File liên quan:** `src/components/HeroSection.tsx`, `src/index.css`, `design-system/filmmaker-portfolio/MASTER.md`.

**Kiểm tra:**

- Production build, lint và `git diff --check`: đạt. Lint còn cảnh báo có sẵn tại `TimecodeHUD.tsx:13`.
- Đo baseline DOM và giới hạn nét chữ thực tế bằng Canvas TextMetrics, có tính chữ hoa, độ đậm và tracking; đối chiếu cả bốn mép mask, vùng Hero và viewport, không chỉ dùng `scrollWidth`.
- Đạt 36 tổ hợp: 320×740, 375×667, 768×1024, 1024×768, 1288×900, 1440×900, 1920×1080, 2560×1440, 844×390 × EN/VI × reduced motion/chuyển động bình thường sau khi entrance kết thúc. Bao gồm màn hình mật độ 2x và điện thoại xoay ngang.
- Dấu Việt nằm trọn khung: tại cỡ chữ 24px còn khoảng 1.83px trên / 5.63px dưới; tại cỡ chữ 104px còn khoảng 15.63px trên / 21.42px dưới. Cỡ chữ giữ đúng biểu thức cũ, tên vẫn một dòng và không tràn ngang.
- Kiểm tra hồi quy font/bố cục ở 6 độ rộng × EN/VI: đúng Lora + Be Vietnam Pro, glyph Việt/chữ nghiêng và modal đúng; Profile/Sứ mệnh vẫn khớp mép dưới ở desktop 1280/1440px.
- Sau triển khai, HTTPS và CSS mới trả HTTP 200; chạy lại đầy đủ 36 tổ hợp trên tên miền thật đều đạt, không có lỗi JavaScript.

**GitHub và website:** Commit mã nguồn `d8b8903a907283fee8bd5fa18e2cfff766123830` — `Prevent Vietnamese Lora accents clipping in hero reveal mask`. Build/deploy thành công: https://github.com/Schizophren-ia/Portfolio/actions/runs/40087439331. Đã xác nhận bản sửa tại https://xuongphimmuahe.com/ trước khi ghi báo cáo này; đồng bộ báo cáo bằng commit tài liệu riêng `[skip ci]`.

### [2026-10-24 — Chốt và áp dụng Lora + Be Vietnam Pro]

**Phê duyệt:** Sau khi xem bản so sánh Playfair Display, Lora và Fraunces bằng font thật, người dùng chọn “Chốt Lora”. Áp dụng Lora cho hệ tiêu đề, giữ Be Vietnam Pro cho nội dung/giao diện; tiếp tục đúng hai font cho cả EN/VI.

**Thay đổi đã triển khai:**

- Thay Cormorant Garamond bằng Lora ở token heading, serif, editorial và các utility tiêu đề cũ; áp dụng cho tên tác giả, tiêu đề section, tên phim, quote và cửa sổ chi tiết phim.
- Tự lưu 6 file Lora WOFF2, gồm thường/nghiêng với độ đậm biến thiên 400–700 và ba bộ Latin, Latin Extended, Vietnamese; kèm giấy phép SIL OFL. Giữ `font-display: swap`.
- Preload Lora thường Latin/Vietnamese thay font tiêu đề cũ; giữ hai preload Be Vietnam Pro. Không gọi Google Fonts khi mở website.
- Không đổi nội dung, màu navy thống nhất, gạch chân, nền sáng/tối, bố cục, video, thứ tự tác phẩm hay carousel.
- Cập nhật design-system theo lựa chọn Lora. Các asset Cormorant cũ không bị xóa nhưng không còn khai báo, preload hoặc được trình duyệt yêu cầu.

**File liên quan:** `src/fonts.css`, `src/index.css`, `tailwind.config.js`, `index.html`, `public/fonts/lora-400-700-*.woff2`, `public/fonts/Lora-OFL.txt`, `design-system/filmmaker-portfolio/MASTER.md`.

**Kiểm tra:**

- Production build, lint và `git diff --check`: đạt; chỉ còn cảnh báo có sẵn tại `TimecodeHUD.tsx:13`.
- Chrome: đạt 12 tổ hợp 320/375/768/1024/1280/1440px × EN/VI. Xác nhận glyph thực tế dùng Lora cho Hero, Be Vietnam Pro cho nội dung; chữ nghiêng và dải ký tự có dấu Việt dùng font tự lưu, không fallback sang font hệ thống.
- Không tràn ngang ở các vùng kiểm tra. Profile/Sứ mệnh khớp mép dưới ở desktop 1280/1440px; tiêu đề modal dùng đúng Lora.
- Hồi quy màu ở 375/768/1440px × EN/VI: tiêu đề/nhấn mạnh vẫn navy đồng nhất, các node chữ vùng sáng đã đo đạt tối thiểu 6.76:1; focus/hover, nền section/thẻ/nút và modal tối giữ đúng. Không phát sinh lỗi JavaScript.
- Tất cả 6 asset font mới có chữ ký WOFF2 hợp lệ. Chrome trên tên miền thật ở 375/1440px × EN/VI xác nhận Lora được render thực tế; cả 6 file font trả HTTP 200 qua HTTPS. Không có request Cormorant, Google Fonts hoặc font bên thứ ba.

**GitHub và website:**

- Commit mã nguồn: `c800a600fb178be7be98383f5d422eb8e0a5c227` — `Apply approved self-hosted Lora heading typography`.
- Workflow build/deploy thành công: https://github.com/Schizophren-ia/Portfolio/actions/runs/40085936344.
- Đã xác nhận xuất bản tại https://xuongphimmuahe.com/ trước khi ghi báo cáo này. Đồng bộ báo cáo bằng commit tài liệu riêng `[skip ci]`.

### [2026-10-23 — Đồng bộ chữ nhấn mạnh navy, giữ nguyên gạch chân]

**Phê duyệt:** Người dùng duyệt phương án dùng navy đậm `#0A1B2E` cho tên, tiêu đề và chữ nhấn mạnh trên nền sáng; sau đó làm rõ chỉ bỏ highlight bằng màu chữ khác, không bỏ gạch chân.

**Thay đổi đã triển khai:**

- Token nhấn mạnh trong `.section-light` dùng cùng navy `#0A1B2E` với chữ chính, thay Storm Blue; áp dụng đồng nhất cho tiêu đề About, Journey, Contact, tên nhóm nghề, nhãn nhấn mạnh và các tiêu đề hồ sơ.
- Phần tiểu sử dùng một màu navy cố định; bỏ hiệu ứng đổi màu từng từ khi cuộn để không tạo lại sự khác biệt màu chữ.
- Giữ nguyên điều kiện nhấn mạnh, gạch chân và độ đậm hiện có; màu gạch chân kế thừa màu chữ. Không đổi nội dung, hai font, bố cục, nền sáng/navy, video hay carousel.
- Hero, điều hướng, Filmmaking, modal phim, clapperboard và footer tiếp tục dùng token tối, không chịu ảnh hưởng của thay đổi token sáng.

**File liên quan:** `src/index.css`, `src/components/AboutSection.tsx`, `design-system/filmmaker-portfolio/MASTER.md`.

**Kiểm tra:**

- Production build, lint và `git diff --check`: đạt; lint còn cảnh báo có sẵn ở `TimecodeHUD.tsx:13`, không có lỗi.
- Chrome 375/768/1440px × EN/VI: 35 phần tử tiêu đề/nhấn mạnh được kiểm tra trong mỗi tổ hợp có cùng màu navy; các node chữ vùng sáng đã đo đạt tương phản tối thiểu 6.76:1. Nền section, thẻ, nút, focus, hover và modal tối giữ đúng; không tràn ngang hoặc lỗi JavaScript.
- Kiểm tra motion bình thường và reduced motion: tiểu sử không còn đổi màu từng từ.
- Kiểm tra hồi quy font/bố cục ở 320/375/768/1024/1280/1440px × EN/VI: đúng hai font, glyph Việt và chữ nghiêng; Profile/Sứ mệnh khớp mép dưới ở 1280/1440px.
- Website thật HTTPS trả HTTP 200, CSS/JS mới đã tải. Chrome trực tiếp EN/VI xác nhận tiêu đề/nhấn mạnh/tiểu sử cùng navy; kiểm tra mẫu CSS nhấn mạnh xác nhận `underline` còn nguyên và màu gạch chân cùng navy.

**GitHub và website:** Commit mã nguồn `f14c41281abb1a4519b4a794a21c555d11a76200` — `Unify light-section emphasis in deep navy and preserve underlines`. Build và deploy thành công: https://github.com/Schizophren-ia/Portfolio/actions/runs/39991211549. Đã xác nhận bản mới tại https://xuongphimmuahe.com/ trước khi ghi báo cáo này; đồng bộ báo cáo bằng commit tài liệu riêng `[skip ci]`.

### [2026-10-23 — Phối nền trắng pha xanh và navy theo phương án đã duyệt]

**Phê duyệt:** Người dùng trả lời “Duyệt” cho phương án xen kẽ nền sáng/navy; triển khai theo workflow 6 bước, xuất bản trước khi viết báo cáo này.

**Thay đổi đã triển khai:**

- About Me và Journey: nền Arctic Haze `#F2F6FB`, tiêu đề navy `#0A1B2E`, nội dung Storm Blue `#34506D`.
- Profile, Triết lý, Sứ mệnh và hồ sơ sản xuất: thẻ trắng `#FFFFFF`, viền Cloud Blue `#C4D2E1`, bóng nhẹ; giữ mép dưới Profile/Sứ mệnh cân bằng trên desktop.
- Contact: nền Mist Blue `#E1E8F0`, biểu mẫu và ô nhập trắng; nút gửi navy, hover Ocean Depth `#1B3B5A`. Viền ô nhập và placeholder Blue Slate `#557392`, trạng thái focus bàn phím rõ ràng.
- Tách footer khỏi vùng nền Contact để giữ một dải navy toàn chiều ngang. Hero, thanh điều hướng, Filmmaking và cửa sổ chi tiết phim tiếp tục dùng giao diện tối.
- Token màu được giới hạn trong `.section-light`; `.theme-navy` giữ clapperboard và overlay ảnh chân dung tối. Hiệu ứng chữ tiểu sử chuyển Storm Blue → navy ở opacity 1, không còn chữ nhạt mất trên nền sáng.
- Giữ nguyên nội dung, EN/VI, hai font Cormorant Garamond + Be Vietnam Pro, poster/video, thứ tự kho phim và cơ chế carousel.

**File liên quan:** `src/index.css`, `src/components/AboutSection.tsx`, `src/components/ExperienceSection.tsx`, `src/components/ContactSection.tsx`, `design-system/filmmaker-portfolio/MASTER.md`.

**Kiểm tra:**

- Production build và `git diff --check`: đạt. Lint không có lỗi; còn cảnh báo có sẵn tại `TimecodeHUD.tsx:13`.
- Chrome: 12 tổ hợp 320/375/768/1024/1280/1440px × EN/VI đạt kiểm tra hai font thực tế, chữ Việt, không tràn ngang; Profile/Sứ mệnh khớp mép dưới ở 1280/1440px.
- Đo màu và tương phản ở 375/768/1440px × EN/VI: đúng nền section/thẻ/nút; các node chữ đã kiểm tra trong vùng sáng đạt tối thiểu **6.76:1**, không tính ảnh và các vùng navy lồng bên trong. Focus bàn phím và hover nút gửi đạt.
- Kiểm tra cả reduced motion và hiệu ứng chữ tiểu sử bình thường; cửa sổ phim vẫn dùng bảng màu tối, không phát sinh lỗi JavaScript.
- Kiểm tra hồi quy 13 TVC, thứ tự bốn video cuối, thumbnail, About xếp dọc; EP1 và nút chuyển EP2 đúng. Không gửi biểu mẫu hay email thật trong quá trình kiểm tra.
- GitHub Actions: bước lint, kiểm tra lỗ hổng dependency, build và deploy đều thành công.
- Website công khai HTTPS trả HTTP 200; CSS mới có đủ theme sáng, thẻ trắng, Contact Mist Blue và CTA navy. Kiểm tra Chrome trực tiếp tên miền thật ở EN/VI xác nhận đúng màu và không tràn ngang.

**GitHub và website:**

- Commit mã nguồn: `be425d320f0fba222e70fb854851c90912b7563c` — `Introduce alternating paper-white and navy portfolio sections`.
- Workflow thành công: https://github.com/Schizophren-ia/Portfolio/actions/runs/39980993083.
- Đã xuất bản và xác nhận tại https://xuongphimmuahe.com/ trước khi ghi báo cáo này. Báo cáo được đồng bộ bằng commit tài liệu riêng với `[skip ci]`.

### [2026-10-23 — Áp dụng hai font đã duyệt]

**Phê duyệt:** Người dùng duyệt phương án ưu tiên Cormorant Garamond + Be Vietnam Pro; dùng hai font cố định cho cả tiếng Anh và tiếng Việt.

**Thay đổi đã triển khai:**

- Cormorant Garamond cho tên ở Hero, tiêu đề, tên phim và các đoạn trích dẫn có sẵn; Be Vietnam Pro cho nội dung, menu, biểu mẫu, email và các nhãn thông tin.
- Tự lưu 21 file WOFF2 chính thức, gồm Latin, Latin Extended và Vietnamese; Cormorant có kiểu thường/nghiêng và Be Vietnam Pro có các độ đậm 300–700. Kèm đủ hai giấy phép SIL OFL 1.1.
- Dùng `font-display: swap`, preload bốn file font quan trọng. Website không gọi Google Fonts khi hiển thị.
- Các utility font cũ được ánh xạ về đúng hai họ font mới; không thêm họ monospace thứ ba.
- Tăng cỡ tiêu đề nhỏ và tên phim cho phù hợp nét chữ Cormorant; giữ bố cục hai ô Triết lý/Sứ mệnh xếp dọc. Ở desktop 1280/1440px, mép dưới Sứ mệnh và Profile khớp nhau trong cả hai ngôn ngữ.

**File liên quan:** `src/fonts.css`, `public/fonts/` (font và giấy phép), `src/index.css`, `tailwind.config.js`, `index.html`, `src/components/AboutSection.tsx`, `src/components/ContactSection.tsx`, `design-system/filmmaker-portfolio/MASTER.md`.

**Kiểm tra:**

- Production build: đạt. Lint: không có lỗi; còn một cảnh báo có sẵn ở `TimecodeHUD.tsx:13`.
- Chrome: đạt 12 tổ hợp 320, 375, 768, 1024, 1280, 1440px × EN/VI; không tràn ngang hoặc cắt chữ ở các vùng kiểm tra.
- Kiểm tra font thực tế bằng trình duyệt: Hero dùng Cormorant; đoạn văn và email dùng Be Vietnam Pro; các glyph có dấu Việt và chữ nghiêng dùng font tải về, không rơi về font hệ thống.
- Cửa sổ chi tiết phim: tiêu đề dùng đúng font; không có lỗi JavaScript khi kiểm tra.
- Kiểm tra website công khai sau triển khai: CSS chứa đúng hai font; năm file WOFF2 đại diện cho Latin, Vietnamese và chữ nghiêng trả HTTP 200, đúng định dạng WOFF2 qua HTTPS.

**GitHub và website:**

- Commit mã nguồn: `2d92eaa6fd6e245635dc1315a052c33e615a6254` — `Apply self-hosted Cormorant Garamond and Be Vietnam Pro typography`.
- Workflow build và deploy: thành công — https://github.com/Schizophren-ia/Portfolio/actions/runs/39978751696.
- Đã xuất bản tại https://xuongphimmuahe.com/ trước khi viết báo cáo này.

**Yêu cầu phối màu tiếp theo:** Đã được người dùng duyệt và triển khai trong bản phối nền trắng/navy ghi ở mục nhật ký phía trên.

### [2026-10-10 - Cập nhật 15]
- **Sửa Lỗi Khuất Thẻ Danh Hiệu, Căn Chuẩn Lề Thẻ Số Thứ Tự (Filmmaking), Bỏ Mục Scope & Gắn Link Facebook Chính Thức (Contact)**:
  1. **Khắc phục lỗi khuất chữ và thụt lề ở Filmmaking Section**:
     - Gỡ bỏ chuyển động trượt ngang `x: 45` của GSAP lên `.film-floating-badge`.
     - **Thẻ số thứ tự (01/05, 05/05)**: Neo chuẩn xác tuyệt đối tại góc trên bên trái (`top-3 left-3`), không còn bị thụt lùi vào trong lòng ảnh, thẳng hàng và đối xứng hoàn hảo với lề phải.
     - **Thẻ danh hiệu (Laurel)**: Neo chuẩn xác ở góc trên bên phải (`top-3 right-3`), mở rộng kích thước hiển thị `max-w-[340px]` và loại bỏ việc cắt cụt chữ (`truncate`), đảm bảo dòng chữ danh hiệu (ví dụ: `★ High-Profile Vietnamese Theatrical Thriller Release`) hiển thị trọn vẹn 100%, không bị khuất hay tràn ra ngoài mép khung hình.
  2. **Gỡ bỏ mục PROJECT SCOPE & TYPE ở Contact Section**:
     - Xóa hoàn toàn trường chọn dropdown `PROJECT SCOPE & TYPE` khỏi form liên hệ [ContactSection.tsx](file:///d:/test/src/components/ContactSection.tsx).
     - Form liên hệ trở nên tinh gọn, thanh lịch chuẩn portfolio điện ảnh với 3 trường thông tin: `YOUR NAME *`, `EMAIL ADDRESS *`, `SYNOPSIS / COLLABORATION NOTES *` cùng nút `SEND MESSAGE`.
  3. **Gắn link Facebook chính thức của Nhà sản xuất Lê Đặng Đài Trang**:
     - Cập nhật đường link trong [src/data/content.ts](file:///d:/test/src/data/content.ts) ở mục `socials`:
       `{ name: "Facebook", url: "https://www.facebook.com/ledangdaitrang", handle: "Lê Đặng Đài Trang" }`.
     - Nút Facebook trong Contact khi click sẽ mở trực tiếp trang cá nhân Facebook chính thức trên tab mới (`target="_blank"`).
  4. **Bảo toàn 100% tất cả các section, ảnh phim chất lượng cao và hiệu ứng số chạy 3.5s**.

### [2026-10-10 - Cập nhật 14]
- **Tích Hợp 5 Ảnh Bìa Phim Chính Thức (Filmmaking Section) & Nâng Cấp Hiệu Ứng Số Chạy Slide 2 Lên 3.5s (About Me)**:
  1. **Thay thế và tối ưu hóa 5 ảnh poster phim chính thức**:
     - Tiếp nhận 5 hình ảnh phim thực tế do bạn cung cấp, xử lý kỹ thuật và lưu trữ trực tiếp vào thư mục nội bộ `public/images/`:
       - *Nhắm mắt thấy mùa hè*: Poster chàng trai góc nghiêng trên cánh đồng hoa Hokkaido (`/images/nham-mat-thay-mua-he.jpg`).
       - *Trời sáng rồi ta ngủ đi thôi*: Poster đôi bạn trẻ ôm đàn hát trên nền trời xanh pastel (`/images/troi-sang-roi.jpg`).
       - *Sài Gòn trong cơn mưa*: Poster cặp đôi che ô đỏ rực rỡ dưới cơn mưa đêm (`/images/saigon-trong-con-mua.jpg`).
       - *Trái tim quái vật*: Poster án mạng 4 nhân vật chính khu chung cư WePro (`/images/trai-tim-quai-vat.jpg`).
       - *Giao lộ 8675*: Poster 3 nhân vật hành trình giữa non nước hùng vĩ (`/images/giao-lo-8675.jpg`), đã xử lý cắt bỏ hoàn toàn 2 dải đen letterbox ở trên/dưới và nâng cấp chất lượng cao chuẩn tỷ lệ 16:9 full-frame.
     - Căn chỉnh khung hình `w-full h-full` không còn cắt xén 12.5% hai bên mép thẻ, giúp toàn bộ tiêu đề phim và thông tin trên poster hiển thị sắc nét, nguyên vẹn 100%.
     - Xóa bỏ file `src/data/content.js` cũ bị xung đột cache, đồng bộ toàn bộ hệ thống sang `src/data/content.ts`.
  2. **Nâng cấp toàn diện hiệu ứng đếm số Slide 2 lên 3.5s**:
     - Kéo dài thời lượng hiệu ứng số chạy chính xác lên **3.5s** theo hàm gia tốc điện ảnh `power2.out`.
     - Giảm độ trễ kích hoạt xuống tức thì (`delay: 0.1s + index * 0.08s`), ngay khi bấm chuyển sang Slide 2 là các con số lập tức chuyển động lăn bánh, không còn bị đơ hay đứng im ở số 0.
     - Chuyển cơ chế sang can thiệp DOM trực tiếp (`spanRef.current.textContent`), loại bỏ hoàn toàn hiện tượng nghẽn render/batching của React 19, đảm bảo độ mượt 120fps.
     - Tích hợp animation cuộn số động liên tục (rolling digits ticker) cho cả các số nhỏ (5, 7, 10): trong suốt 3.5s các con số liên tục xoay vần sống động trước khi hãm tốc và neo chuẩn xác về giá trị đích; số 1991 cuộn nhịp nhàng từ 0 đến 1991.
     - Tự động reset về 0 khi quay về Slide 1, và kích hoạt lại trọn vẹn hiệu ứng 3.5s mỗi khi người dùng bấm mở lại Slide 2.
  3. **Bảo toàn 100% các thành phần khác**: Hero Section, Preloader, Experiences, Contact, v.v.

### [2026-10-10 - Cập nhật 13]
- **Cân Bằng Đối Xứng Tuyệt Đối Hero Section, Hạ Khung 4 Góc Tránh Navbar, Cập Nhật Thumbnail Trailer Gốc & Click Mũi Tên Chéo Mở Trailer (Filmmaking)**:
  1. **Căn giữa hoàn mỹ nội dung Hero Section (Dead-Center Alignment)**:
     - Tách rời cụm "SCROLL TO BEGIN" ra khỏi flex container trung tâm và neo độc lập ở `absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2`.
     - Toàn bộ nội dung chính (tiêu đề `LÊ ĐẶNG ĐÀI TRANG`, chức danh, nhãn định vị, các nút CTA) nằm chính xác 100% tại tâm điểm khung nhìn (trùng khớp với tâm ngắm `+`), tạo sự cân đối thị giác hoàn hảo cả theo phương ngang lẫn phương dọc.
  2. **Hạ khung ngắm 4 góc Hero Section tránh hoàn toàn thanh tác vụ**:
     - Điều chỉnh tọa độ đỉnh của khung ngắm máy quay thành `top-20 sm:top-24 md:top-28`, đáy `bottom-6 sm:bottom-8` và mở rộng hai bên `left-4 sm:left-6 md:left-8 lg:left-10 right-4 sm:right-6 md:right-8 lg:right-10`.
     - Triệt tiêu 100% hiện tượng 2 góc trên `┌` và `┐` đè lên Logo hoặc nút `INQUIRE` của thanh tác vụ, đồng thời duy trì không gian mở rộng thoáng đãng sát mép màn hình đúng như nét vẽ tay phác thảo.
  3. **Cập nhật Thumbnail 5 tác phẩm điện ảnh chuẩn xác theo trailer YouTube chính thức**:
     - Thay thế toàn bộ ảnh thumbnail của 5 bộ phim sang ảnh đại diện gốc độ phân giải cao `maxresdefault.jpg` từ các đường link trailer chính thức được cung cấp:
       - *Nhắm mắt thấy mùa hè*: `https://img.youtube.com/vi/tlNtE3IW6bE/maxresdefault.jpg`
       - *Trời sáng rồi ta ngủ đi thôi*: `https://img.youtube.com/vi/pKE389nMnk8/maxresdefault.jpg`
       - *Sài Gòn trong cơn mưa*: `https://img.youtube.com/vi/Eyju5ODfd-g/maxresdefault.jpg`
       - *Trái tim quái vật*: `https://img.youtube.com/vi/qgVg0xh_ogQ/maxresdefault.jpg`
       - *Giao lộ 8675*: `https://img.youtube.com/vi/wrOLqdg54Bo/maxresdefault.jpg`
     - Bỏ bộ lọc `grayscale`, hiển thị hình ảnh với màu sắc điện ảnh nguyên bản, sống động và sắc nét tự nhiên.
  4. **Kích hoạt Mũi tên chéo (↗) mở trực tiếp link trailer YouTube**:
     - Biến biểu tượng mũi tên chéo `ArrowUpRight` trên mỗi thẻ phim (cả bản Desktop lẫn Mobile) thành liên kết trực tiếp `<a>` mở đường link trailer YouTube trên tab mới (`target="_blank"` và `rel="noopener noreferrer"`).
     - Thêm `e.stopPropagation()` để khi click vào mũi tên sẽ chuyển ngay tới trailer mà không gây xung đột với thao tác click mở bảng chi tiết phim (Modal Credits).
  5. **Giữ nguyên 100% tất cả các section, logic đếm số Slide 2 About Me (2.8s) và các thành phần khác**.

### [2026-10-10 - Cập nhật 12]
- **Tinh Gọn Màn Hình Mở Đầu (Preloader) & Kéo Dài Thời Gian Số Chạy Slide 2 Lên 2.8s (Lựa Chọn 1)**:
  1. **Khắc phục triệt để lỗi chữ chèn lấn ở Preloader**:
     - Gỡ bỏ hoàn toàn các dòng chữ kỹ thuật thừa gây chèn ép lên số 000%: `FRAME RATE: 24.000 • COLOR: ACEScc • ASPECT: 2.39:1` (chân trang), `CINE-REEL SPEC // 35MM ANAMORPHIC` (đỉnh trang) và `INITIALIZING OPTICS & MASTER REEL` (phụ đề).
     - Giữ nguyên vẹn tâm ngắm quang học điện ảnh và bộ đếm số vàng hoàng kim chạy mượt mà từ `000%` $\rightarrow$ `100%` (`#F1C34C`) trên nền 2 cánh cửa letterbox đen tuyền sang trọng, tách mở êm ái khi đếm xong.
  2. **Kéo dài thời gian hiệu ứng số chạy ở Slide 2 lên 2.8s theo Lựa chọn 1**:
     - Căn chỉnh độ trễ bắt đầu `delay: 0.65s`: chờ Slide 2 trượt vào đúng tầm mắt người xem rồi mới bắt đầu kích hoạt chạy số.
     - Thời lượng chạy được kéo dài từ 1.8s lên **2.8s** (so le `0.15s` giữa các cột), giúp mắt người xem nhìn thấy rõ rệt từng bước số nhảy từ 0 lên `5+`, `7`, `10+`, `1991` mà không bị trôi tuột hay bỏ lỡ.

### [2026-10-10 - Cập nhật 11]
- **Bỏ Mục Giải Thưởng Accolades, Bỏ Ánh Vàng Lấp Lánh Ở Intro & Sửa Dứt Điểm Hiệu Ứng Số Chạy Slide 2**:
  1. **Khôi phục hiệu ứng số chạy sống động ở Slide 2 (Intro Section / Dossier & Stats)**:
     - Xóa bỏ triệt để ScrollTrigger cũ gắn ngầm trên `.stat-item` (vốn kích hoạt sớm khi Slide 2 còn ẩn).
     - Xây dựng component chuyên biệt `StatCounter` quản lý chu kỳ sống bằng `React.memo` và GSAP Tween độc lập: mỗi khi người dùng bấm mở Slide 2 (`activeSlide === 1`), con số lập tức reset về 0 và chạy đếm mượt mà (`delay: 0.2s + stagger 0.12s`, `duration: 1.8s`, `ease: power2.out`) ngay khi slide trượt vào tầm nhìn.
     - Khi chuyển về Slide 1, component tự động reset về 0 để mỗi lần bấm xem Slide 2 là một lần chạy lại hiệu ứng số sống động 100%.
  2. **Gỡ bỏ mục ACCOLADES & FESTIVAL LAURELS — RECOGNITION IN EXCELLENCE (Section Experiences)**:
     - Gỡ bỏ hoàn toàn tiêu đề và 5 thẻ giải thưởng/liên hoan phim theo đúng ảnh chụp yêu cầu.
     - Dọn sạch ScrollTrigger liên quan và các import không dùng (`Award`), giúp dòng thời gian kết thúc gọn gàng, liền mạch tại mốc Đào tạo điện ảnh (Academic Foundation).
  3. **Gỡ bỏ hiệu ứng ánh vàng lấp lánh ở Intro Section**:
     - Gỡ bỏ dải sóng lụa khí vàng `GoldenBreezeAtmosphere` và 12 hạt bụi vàng lấp lánh `Cine Dust Particles` trên bề mặt ảnh chân dung.
     - Đưa ảnh đại diện về trạng thái nhiếp ảnh điện ảnh thuần khiết, trong trẻo, chân thực và sắc nét 100%, giữ nguyên khung ngắm máy quay tinh tế và khối PROFILE bên dưới.

### [2026-10-10 - Cập nhật 10]
- **Tối Ưu 3 Điểm Trọng Yếu Theo Góp Ý: Khôi Phục Chạy Số Slide 2, Chuyển Động Gió Vàng Khi Hover & Khung 4 Góc Hero Sát Mép Ngoài**:
  1. **Khôi phục hiệu ứng đếm số chạy sống động ở Slide 2 (Intro Section Stats Count-Up)**:
     - Khắc phục triệt để hiện tượng số đứng yên do trigger ban đầu khi slide còn ẩn.
     - Tích hợp `useEffect` lắng nghe trực tiếp sự kiện kích hoạt Slide 2 (`activeSlide === 1`), kích hoạt lại hiệu ứng đếm số GSAP từ 0 lên giá trị thực tế: `5+` Dự án điện ảnh, `7` Quốc gia, `10+` Năm kinh nghiệm, `1991` Năm sinh.
     - Thời gian chạy số 1.8s mượt mà theo hàm gia tốc điện ảnh `power2.out`, chạy lệch nhịp nhẹ (staggered) giữa các chỉ số giúp mang lại trải nghiệm thị giác sống động và cuốn hút.
  2. **Chuyển động nhẹ nhàng cho Dải Lụa Khí Vàng & Hạt Bụi Kim Loại khi di chuột (Interactive Breeze Motion on Hover)**:
     - Giữ nguyên thiết kế luồng sóng lụa vàng và sương bụi kim loại cao cấp, không dùng viền chữ nhật.
     - Bổ sung cơ chế tăng tốc mượt mà bằng kỹ thuật Lerp (Linear Interpolation) khi di chuột vào ảnh (`isHovered`): tốc độ luồng sóng tăng êm dịu từ `0.009` lên `0.038`, cường độ bừng sáng từ `0.28` lên `0.95`.
     - Các hạt bụi vàng và tia sáng chữ thập chuyển động trôi nhanh hơn một nhịp, sau đó từ từ giảm tốc êm ái khi rời chuột, tạo cảm giác làn gió ấm hữu cơ phản hồi tự nhiên với thao tác của người xem.
  3. **Khung 4 góc Hero Section nới rộng ra sát mép màn hình theo đúng nét vẽ tay (Wide Cinema Viewfinder Margins)**:
     - Tách biệt độc lập 4 góc khung ngắm `┌ ┐ └ ┘` ra lớp phủ viền màn hình (`absolute inset-4 sm:inset-6 md:inset-8 lg:inset-10 z-20 pointer-events-none`), ôm sát mép ngoài viewport giống chính xác với các nét vẽ tay màu trắng của bạn.
     - Khối nội dung Typography *LÊ ĐẶNG ĐÀI TRANG*, nhãn định vị và cụm nút tương tác được đặt trọn vẹn ở chính giữa khung hình (`my-auto text-center items-center justify-center`), mở ra trường nhìn bao la, khoáng đạt, triệt tiêu hoàn toàn cảm giác chật chội và không chạm vào thanh tác vụ.
  4. **Giữ nguyên 100% tất cả các chi tiết và tính năng còn lại của website**.

### [2026-10-10 - Cập nhật 9]
- **Tối Ưu Vị Trí Khung 4 Góc Hero Section & Đặt Nội Dung Chính Xác Ở Chính Giữa Khung**:
  1. **Khung 4 góc không bị lấn lên thanh tác vụ (Below Navbar Clearance)**:
     - Hạ cạnh trên của khung ngắm máy quay 4 góc xuống khoảng an toàn bên dưới thanh tác vụ (`mt-24 sm:mt-28 md:mt-30`), triệt tiêu hoàn toàn hiện tượng 2 góc trên `┌` và `┐` đè lên Logo hoặc nút `INQUIRE`.
     - 4 góc ôm trọn không gian nhìn bên dưới thanh điều hướng, mở rộng thoáng đãng `max-w-[94vw] 2xl:max-w-7xl` với viền dưới cách đáy màn hình an toàn (`mb-8 sm:mb-10`).
  2. **Căn chỉnh nội dung chính xác 100% ở chính giữa khung (Dead-Center Alignment)**:
     - Tích hợp nội dung typography và 4 góc camera vào chung một hệ trục tọa độ (`flex flex-col items-center justify-center text-center`).
     - Tên *LÊ ĐẶNG ĐÀI TRANG*, chức danh, nhãn câu chuyện, các nút hành động và tâm ngắm `+` (crosshair marker) được căn giữa tuyệt đối cả theo phương ngang lẫn phương dọc của khung ngắm, tạo sự cân bằng và uy nghiêm hoàn mỹ về mặt thị giác.

### [2026-10-10 - Cập nhật 8]
- **Tái Hiện Dải Lụa Sóng Vàng (Volumetric Golden Ribbons), Bụi Kim Loại Đa Tầng Theo Ảnh Tham Chiếu & Khôi Phục Khung Ảnh Dài**:
  1. **Tái hiện luồng khí vàng theo ảnh tham chiếu điện ảnh**:
     - **Dải lụa sóng vàng đa tầng (Volumetric Silky Waves)**: Sử dụng các đường cong tham số điều hòa đa tần số mô phỏng dải lụa ánh sáng vàng uốn lượn có độ dày khối (`4px` – `14px`), phối màu chuẩn chuyển sắc từ hổ phách sâu Olivia (`#986626`) $\rightarrow$ vàng ấm Stone Ground (`#D39730`) $\rightarrow$ gờ sóng bắt sáng Hive Delight (`#F1C34C`).
     - **Làn sương bụi kim loại (Dense Metallic Dust Mist)**: Bổ sung hơn 100 hạt bụi vàng siêu mịn (`0.6px` – `1.3px`) tụ tự nhiên dọc theo thân luồng sóng lụa, kết hợp hơn 20 hạt kim loại lớn hơn (`1.8px` – `3.2px`) phản xạ ánh sáng lấp lánh (specular glints).
     - **Bảo vệ tuyệt đối vùng mặt**: Tích hợp thuật toán triệt tiêu độ mờ (radial clearance attenuation), đảm bảo khuôn mặt luôn trong suốt và sắc nét 100%.
  2. **Khôi phục khung ảnh chân dung đứng dài (Không bị vuông)**:
     - Khôi phục tỷ lệ `aspect-[4/5] max-h-[480px]`, giữ nguyên vẹn dáng đứng thanh thoát, cao ráo chuẩn khung hình điện ảnh, hoàn toàn không bị co ngắn hay vuông.
  3. **Khối PROFILE không khung viền & Phóng to chữ vừa phải**:
     - Gỡ bỏ hoàn toàn hộp viền chữ nhật bao quanh (`borderless`), biến thông tin thành khối typography thanh lịch đặt ngay dưới chân ảnh.
     - Phóng to cỡ chữ (`text-sm sm:text-base` cho nội dung, `text-xs sm:text-sm` cho danh mục), tăng khoảng cách dòng `space-y-2.5` thoáng mắt và sang trọng.

### [2026-10-10 - Cập nhật 7]
- **Nâng Cấp Toàn Diện: Khí Quyển Gió Vàng Tự Nhiên (Organic Free-Flowing Breeze), Profile Thẻ Dưới Chân Dung & Tối Ưu Hero Section**:
  1. **Tái thiết kế hoàn toàn hiệu ứng Golden Breeze (Organic Canvas 2D Flow)**:
     - **Gỡ bỏ triệt để viền chữ nhật (No Glowing Border)**: Xóa toàn bộ các đường path SVG chạy theo cạnh ảnh, quỹ đạo hạt hình chữ nhật và hiệu ứng bo viền.
     - **Dòng khí tự nhiên quét chéo (Diagonal Vector Field)**: 3 dải luồng khí động học Bezier độc lập uốn lượn mềm mại dạng sóng S, quét tự do từ góc dưới-trái (lower-left) lên góc trên-phải (upper-right) xuyên qua không gian âm xung quanh ảnh.
     - **Bụi kim loại vàng điện ảnh**: 32 hạt bụi vàng siêu nhỏ (0.9px - 2.2px) trôi êm ái theo dòng khí, phối màu Stone Ground (`#D39730`), Hive Delight (`#F1C34C`) và Olivia (`#986626`).
     - **Lóe sáng quang học thưa thớt**: Các hạt thỉnh thoảng phản xạ tia sáng chữ thập siêu mảnh (micro lens glint) như hạt bụi kim loại bắt sáng.
     - **Tách biệt hoàn toàn khung camera**: Khung ngắm camera 4 góc ┌ ┐ └ ┘ và luồng gió là 2 thực thể thị giác độc lập; vùng khuôn mặt luôn được bảo vệ trong suốt 100%.
  2. **Thêm khối PROFILE dưới ảnh chân dung & Cân bằng đối xứng 2 cột**:
     - Bổ sung khối hồ sơ tinh gọn dưới ảnh: `Name: Le Dang Dai Trang`, `Birthday: 15.10.1991`, `Occupation: Producer`.
     - Điều chỉnh chiều cao cột trái (~540px) chạm đáy ngang bằng hoàn hảo với cột phải khi xem Slide 2 (Dossier & Stats ~540px), xóa bỏ hoàn toàn hiện tượng lệch lồi lõm.
  3. **Tối giản tiêu đề ABOUT ME**:
     - Bỏ dòng chữ phụ `"Ho Chi Minh City, Vietnam · Film Producer"` dưới `ABOUT ME` để tránh trùng lặp thông tin với khối PROFILE.
  4. **Tối ưu Hero Section (Widescreen Cinema Viewfinder & Single-Line Name)**:
     - Typography `LÊ ĐẶNG ĐÀI TRANG` đặt trọn vẹn trên 1 dòng đơn duy nhất (`whitespace-nowrap`), thống nhất chung 1 màu vàng Hive Delight (`#F1C34C`) kèm `text-glow`.
     - 4 góc khung máy quay điện ảnh `┌ ┐ └ ┘` nới rộng ra sát mép màn hình (`inset-3 sm:inset-6 md:inset-8 lg:inset-10`), tạo cảm giác màn ảnh rộng thoáng đãng, phóng khoáng, triệt tiêu hoàn toàn cảm giác chật chội gò bó.

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
    - *Nhắm mắt thấy mùa hè*: Đạo diễn Cao Thúy Nhi / Diễn viên: Phương Anh Đào, Takafumi Akutsu
    - *Trời sáng rồi, ta ngủ đi thôi*: Đạo diễn Chung Chí Công / Diễn viên: Hà Quốc Hoàng, Trần Lê Thúy Vy
    - *Sài Gòn trong cơn mưa*: Đạo diễn Lê Minh Hoàng / Diễn viên: Avin Lu, Hồ Thu Anh
    - *Trái tim quái vật*: Đạo diễn Tạ Nguyên Hiệp / Diễn viên: Hoàng Thùy Linh, B Trần, Hứa Vĩ Văn, Quang Trung
    - *Giao lộ 8675*: Đạo diễn Tân DS / Diễn viên: Isaac, Rocker Nguyễn, Lợi Trần, Emma Lê, La Thành
  - Bổ sung hàm ánh xạ fallback an toàn đảm bảo luôn hiển thị chuẩn xác 100% kể cả trong môi trường cache.

### [2026-10-10 - Cập nhật 8]
- **Đính Chính Thông Tin Đạo Diễn Phim 'Nhắm Mắt Thấy Mùa Hè'**:
  - Sửa lại chính xác tên đạo diễn thành **Cao Thúy Nhi** trong:
    - [src/data/content.ts](file:///d:/test/src/data/content.ts)
    - [src/components/FilmModal.tsx](file:///d:/test/src/components/FilmModal.tsx)
    - [README.md](file:///d:/test/README.md)
  - Đồng bộ và kích hoạt cập nhật tự động lên GitHub Pages.

---

## 4. Kế Hoạch & Ý Tưởng Tiếp Theo (Roadmap)

*(Đang chờ ý tưởng tiếp theo từ bạn)*
# Cập nhật 14.10.2026 — Mở rộng Filmmaking Archive theo danh mục

## Kết quả triển khai

- Phân bổ Filmmaking Archive thành 6 danh mục có bộ đếm riêng: **Movie (05), Short Film (08), TVC (08), House Rule (02), MV (03), AI Film (00)**.
- Bổ sung đầy đủ 21 tác phẩm mới từ các liên kết được cung cấp; tổng archive hiện có **26 tác phẩm**.
- Giữ nguyên ngôn ngữ thiết kế cinematic của mục Movie: card 16:9, horizontal pinned gallery trên desktop, vertical gallery trên mobile, modal chi tiết và liên kết nguồn chính thức.
- Bộ đếm reel, index card, progress HUD và điểm đầu/cuối archive tự cập nhật theo danh mục đang chọn.
- Thêm empty state **“New work in development”** cho AI Film để sẵn sàng bổ sung tác phẩm sau này.
- Lưu 15 thumbnail YouTube trong `public/images`; tạo artwork cục bộ đồng nhất cho 6 nội dung Generali không cho tải trực tiếp ảnh Open Graph.
- Modal hỗ trợ cả video YouTube nhúng và preview dẫn tới trang nguồn Generali.

## Kiểm thử

- `npm run build`: **Passed**.
- `npm run lint`: **Passed**, còn 3 cảnh báo React có sẵn tại `TimecodeHUD.tsx` và `FilmModal.tsx`, không có lỗi lint.

---
# Cập nhật 14.10.2026 — Chuyển nguồn Generali sang YouTube

## Kết quả triển khai

- Đã kiểm tra và thay thế 6 liên kết trang Generali bằng video chính thức trên kênh **Generali Vietnam**.
- Short Film cập nhật 5 video: *Ngày của Cha*, *Sống Như Ý — Tết 2020*, *Sống Như Ý — Tết 2021*, *Chẳng Cần Như Ai, Chỉ Cần Như Ý*, *Tựa Vào Nhau Cho Đời Như Ý*.
- TVC cập nhật video *Hãy Yêu Nhau Đi Cho Đời Như Ý*.
- Cả 6 tác phẩm hiện phát trực tiếp bằng YouTube embed trong modal và mở đúng nguồn YouTube từ card/action link.
- Tải 6 thumbnail YouTube riêng về `public/images`; loại bỏ artwork Generali dùng chung không còn cần thiết.
- Số lượng archive được giữ nguyên: **8 Short Film, 8 TVC, tổng 26 tác phẩm**.

## Kiểm thử

- Đối chiếu metadata qua YouTube oEmbed: **6/6 link hợp lệ**, đúng kênh Generali Vietnam.
- `npm run build`: **Passed**.
- `npm run lint`: **Passed**, còn 3 cảnh báo React có sẵn, không phát sinh lỗi lint.

---
# Cập nhật 14.10.2026 — Filmmaking Infinite Shelves & About Clapperboard Dossier

## Filmmaking Archive

- Thay gallery pinned một hàng và hệ tab bằng **6 category shelf hiển thị liên tiếp**: Movie, Short Film, TVC, House Rule, MV và AI Film.
- Các nhóm từ 4 tác phẩm trở lên được chia thành **lưới hai hàng ngang**, giúp tăng số thumbnail nhìn thấy đồng thời và cải thiện độ nhận diện tác phẩm.
- Mỗi hàng sử dụng **infinite horizontal scroll** liền mạch; hàng thứ hai chạy ngược chiều để tạo nhịp chuyển động cinematic.
- Animation tự dừng khi hover/focus; chế độ `prefers-reduced-motion` chuyển thành danh sách cuộn ngang thủ công và loại bỏ bản sao nội dung.
- Card được thu gọn, ưu tiên thumbnail, tên phim, năm và thể loại; click vẫn mở modal video và Next Reel chỉ chuyển trong cùng danh mục.
- Không trộn nội dung giữa các danh mục; toàn bộ archive được nhìn thấy khi cuộn dọc thay vì phải chuyển tab.

## About Me

- Loại bỏ hoàn toàn slider, bộ đếm `01 / 02` và nút điều hướng slide.
- Khối trên giữ nguyên quan hệ **ảnh chân dung độc lập + Profile + Bio** trong cùng một composition; ảnh không nằm trong clapperboard.
- Philosophy và Mission được trình bày thành hai production-note card đi cùng bio.
- Đưa toàn bộ nội dung slide 2 xuống khối **Behind the Clapperboard** riêng bên dưới.
- Clapperboard được dựng bằng HTML/CSS, có thanh clap tương tác và chuyển động nhẹ khi đi vào viewport.
- Bốn chỉ số thống kê nằm cùng clapperboard và giữ hiệu ứng count-up.
- Education, Languages, Skills, Passport và Hobbies được bố trí trong lưới dossier responsive bên cạnh clapperboard; mobile tự chuyển thành một cột.

## Kiểm thử

- `npm run build`: **Passed**.
- `npm run lint`: **Passed**, còn 3 cảnh báo React tồn tại từ trước, không có lỗi lint.
- Kiểm tra TypeScript và production bundle: **Passed**.

---
# Cập nhật 14.10.2026 — Deep Navy Minimal Redesign & AI Film

## Design system

- Cài đặt và áp dụng skill **UI UX Pro Max**; lưu source of truth tại `design-system/filmmaker-portfolio/MASTER.md`.
- Art direction: **Editorial Minimalism · Deep Navy Cinema**, variance 3/10, motion 5/10, density 3/10.
- Chuyển toàn bộ semantic color tokens sang palette người dùng cung cấp, với **Deep Navy `#0A1B2E`** làm background chủ đạo.
- Hệ màu hỗ trợ: Midnight Blue `#112A46`, Ocean Depth `#1B3B5A`, Storm Blue `#34506D`, Blue Slate `#557392`, Dusk Blue `#7A8CA6`, Foggy Blue `#A1B2C4`, Cloud Blue `#C4D2E1`, Mist Blue `#E1E8F0`, Arctic Haze `#F2F6FB`.
- Typography mới: **Cormorant Garamond** cho display/editorial heading và **Inter** cho body/UI.
- Loại bỏ cảm giác vàng/bronze và glow mạnh; chuyển shadow, selection, scrollbar, border và focus state sang hệ xanh trung tính.
- Bổ sung focus ring 2px, touch target tối thiểu 44px, `scroll-padding-top` cho fixed navigation và giữ hỗ trợ `prefers-reduced-motion`.

## AI Film

- Thêm `public/videos/ai-film.mp4` từ file `260710_FINAL_AI FILM.mp4` vào danh mục **AI FILM**.
- Metadata đã xác nhận: 50 giây, 1440×1920, 30fps, tỷ lệ 3:4 dọc.
- Kiểm tra SHA-256: file trong dự án khớp hoàn toàn với file nguồn.
- Bổ sung poster SVG Deep Navy, preview video khi hover và HTML5 player trong modal.
- Player dùng `controls`, `playsInline`, `preload="metadata"`; không tự phát âm thanh và không tải toàn bộ video khi trang vừa mở.
- Mở rộng `FilmItem` với `mediaType` để hỗ trợ song song YouTube iframe và MP4 nội bộ.

## Filmmaking & interaction

- Giữ Infinite Horizontal Scroll theo từng category shelf.
- AI Film hiển thị như một featured card riêng thay vì lặp lại một tác phẩm để giả marquee.
- Card archive hỗ trợ bàn phím bằng Enter/Space, có `role`, `tabIndex`, `aria-label`; bản sao marquee bị loại khỏi tab order.
- Hover/focus tạm dừng marquee và reduced-motion chuyển về cuộn ngang thủ công.

## Kiểm thử

- `npm run build`: **Passed**; video được sao chép đúng vào production bundle.
- `npm run lint`: **Passed**, còn 3 cảnh báo React tồn tại từ trước, không phát sinh lint error.
- Kiểm tra responsive theo code tại 375/768/1024/1440 và audit tĩnh theo checklist UI UX Pro Max.
- Screenshot headless không khả dụng do GPU process của Chrome/Edge trong môi trường kiểm thử; không ảnh hưởng production build.

---
# Cập nhật 15.10.2026 — Đổi Brand sang "Portfolio", Căn Giữa Profile & Căn Chuẩn Lề Filmmaking

## 1. Thanh điều hướng (Navigation / Taskbar)
- Gỡ bỏ hoàn toàn khung logo/initials `DT` và các góc ngắm máy quay trên taskbar.
- Thay thế dòng chữ họ tên `Lê Đặng Đài Trang` và `PRODUCER · FILMMAKER` thành từ duy nhất **"Portfolio"** với typography `Playfair Display` đen tuyền/vàng kim, khoảng cách ký tự thoáng đãng (`tracking-[0.22em]`).

## 2. Phần Giới thiệu (About Me)
- **Căn giữa khối Profile**: Khối Profile được căn lề giữa toán học, nằm ngay chính diện bên dưới ảnh chân dung (`max-w-md mx-auto flex flex-col items-center`).
- **Nội dung thông tin thông thoáng, không dính chèn**: Khoảng cách giữa các dòng thông tin (Name, Birthday, Occupation) được nới rộng thoáng đãng (`space-y-3.5`), có đường viền phân tách tinh tế và bullet vàng Hive Delight.
- **Căn lề 2 bên đối xứng**:
  - Nhãn (Name, Birthday, Occupation) neo sát lề trái, giá trị thông tin neo sát lề phải trong khung thẻ.
  - Đoạn văn giới thiệu bản thân (Biography) và 2 khối triết lý (My Philosophy / The Mission) được căn đều 2 bên (`text-justify`), triệt tiêu mép lởm chởm, tạo sự cân đối thị giác hoàn hảo.

## 3. Phần Điện ảnh (Filmmaking Archive)
- **Sửa triệt để lỗi phim bị lệch sang trái & bị khuất**:
  - Loại bỏ hoàn toàn hiệu ứng marquee tự động trôi lệch trái và dải gradient che mờ (`mask-image`) làm mất chữ/khuất thẻ phim.
  - Cố định toàn bộ danh sách phim bên trong khung chuẩn `mx-auto max-w-7xl px-6 sm:px-8`, đảm bảo cạnh trái và cạnh phải của thẻ phim thẳng hàng tuyệt đối với tiêu đề và căn lề 2 bên cân đối.
- **Hiển thị 5 phim chiếu rạp (Category: Movie)**:
  - Bố cục lưới responsive (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`), hiển thị đầy đủ 5 phim theo đúng thứ tự 01/05 đến 05/05 mà không bị che khuất.
  - Cập nhật 100% ảnh thumbnail của 5 bộ phim sang hình ảnh gốc từ trailer YouTube chính thức (`maxresdefault.jpg` kèm fallback `hqdefault.jpg`):
    - *Nhắm mắt thấy mùa hè*: `https://img.youtube.com/vi/tlNtE3IW6bE/maxresdefault.jpg`
    - *Trời sáng rồi ta ngủ đi thôi*: `https://img.youtube.com/vi/pKE389nMnk8/maxresdefault.jpg`
    - *Sài Gòn trong cơn mưa*: `https://img.youtube.com/vi/Eyju5ODfd-g/maxresdefault.jpg`
    - *Trái tim quái vật*: `https://img.youtube.com/vi/qgVg0xh_ogQ/maxresdefault.jpg`
    - *Giao lộ 8675*: `https://img.youtube.com/vi/wrOLqdg54Bo/maxresdefault.jpg`
- **Các hạng mục khác**: Được neo chuẩn lề 2 bên; các danh mục nhiều tác phẩm (Short Film, TVC) có nút điều hướng cuộn ngang mượt mà (`ChevronLeft` / `ChevronRight`).

## 4. Bảo toàn hệ thống
- Giữ nguyên 100% tất cả các section, logic phát video, preloader và âm thanh môi trường.

---
# Cập nhật 18.10.2026 — Gỡ ảnh đại diện và mô tả photo journal

## Kết quả triển khai

- Gỡ ảnh đại diện và dòng "A personal photo journal" khỏi phần đầu mục MY JOURNEY trong `src/components/ExperienceSection.tsx`.
- Giữ tên Lê Đặng Đài Trang, tiêu đề, lời giới thiệu, toàn bộ ảnh hành trình theo năm và hiệu ứng hiện có.
- Đổi phần tên thành đoạn văn bản độc lập để không còn `figcaption` khi ảnh đại diện đã được gỡ; bỏ import `journeyPortrait` khỏi component.

## Kiểm thử

- `npm run build`: **Passed**.
- `npm run lint`: **Passed**, còn 3 cảnh báo có sẵn tại `TimecodeHUD.tsx` và `FilmModal.tsx`.

## GitHub

- Repo đích: `https://github.com/Schizophren-ia/Portfolio`, nhánh `main`.
- Người dùng đã duyệt đưa toàn bộ thay đổi hiện có lên GitHub, gồm các chỉnh sửa có sẵn về Profile/Bio, thông tin liên hệ, Filmmaking Archive, tiêu đề trang, bố cục dùng chung và bộ ảnh/dữ liệu MY JOURNEY.
- Commit nội dung: `9dd2e89` — `Update portfolio content and journey gallery; simplify journal header`.
- Hợp nhất lịch sử mới nhất từ `origin/main` (`0486fc5`), giữ các chỉnh sửa căn hàng phim trên GitHub và phần Bio tại local; giải quyết xung đột MY JOURNEY theo yêu cầu bỏ ảnh đại diện và dòng mô tả.
- Build/lint được chạy lại sau khi hợp nhất; bản bàn giao dùng nhánh `main` tại repo nêu trên.

---
# Cập nhật 18.10.2026 — Bỏ dòng tên ở đầu MY JOURNEY

- Đã được người dùng duyệt: xóa dòng "Lê Đặng Đài Trang" ở đầu mục MY JOURNEY trong `src/components/ExperienceSection.tsx`.
- Giữ nguyên tiêu đề, lời giới thiệu, ảnh hành trình, thông tin năm/địa điểm và hiệu ứng.
- `npm run build`: **Passed**.
- `npm run lint`: **Passed**, còn 3 cảnh báo có sẵn tại `TimecodeHUD.tsx` và `FilmModal.tsx`.
- GitHub: `Schizophren-ia/Portfolio`, nhánh `main`; commit `Remove name from Journey header`.

---
# Cập nhật 18.10.2026 — Ưu tiên 3 TVC và sửa thumbnail video

## Kết quả triển khai

- Đưa 3 TVC lên vị trí 01/08–03/08 theo thứ tự đã duyệt: **Khát vọng vì một Việt Nam mai sau**, **Hãy yêu nhau đi cho đời như ý**, **Sống như ý — Bumper Ads**. Giữ thứ tự tương đối của 5 TVC còn lại.
- Archive dùng ảnh đã lưu trong `public/images` làm thumbnail chính, với đường dẫn hỗ trợ cả local và GitHub Pages `/Portfolio/`.
- Dùng chung component `FilmThumbnail` cho card và ảnh preview trong modal: khi tải lỗi, thử ảnh YouTube maxres/HQ/MQ rồi ảnh dự phòng local.
- Phát hiện ảnh giữ chỗ YouTube rộng tối đa 120px kể cả khi HTTP trả về 200; dừng ở nguồn cuối để tránh lặp tải lỗi.
- Thêm `public/images/film-placeholder.svg`, giữ nguyên bố cục card, liên kết video và điều khiển marquee.

## Kiểm thử

- `npm run build`: **Passed**.
- `npm run lint`: **Passed**, còn 3 cảnh báo có sẵn tại `TimecodeHUD.tsx` và `FilmModal.tsx`.
- Đọc/giải mã ảnh local: **21/21 thumbnail archive hợp lệ**, gồm **8/8 TVC**.
- Chrome headless trên production preview `/Portfolio/`: **Passed** cho thứ tự cả 8 TVC, chỉ số 01/08–08/08, tải ảnh local, mở video và Next Reel đúng thứ tự.
- Giả lập ảnh local lỗi, YouTube trả ảnh giữ chỗ HTTP 200, và toàn bộ nguồn ảnh lỗi: **Passed**, fallback tới HQ hoặc ảnh local cuối cùng, không lặp tải.
- Mobile 390px: **Passed**, ảnh TVC tải đúng và trang không tràn ngang.
- GitHub: `Schizophren-ia/Portfolio`, nhánh `main`; commit `Prioritize featured TVCs and fix video thumbnail fallbacks`.


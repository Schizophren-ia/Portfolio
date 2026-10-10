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
| **Preloader** | Hoàn thành | Đếm số 000% -> 100% vàng Hive Delight, loại bỏ hoàn toàn các dòng chữ kỹ thuật thừa gây chèn lấn (Frame rate, Color, Aspect, Subtitle). Hai cánh cửa letterbox điện ảnh đen tuyền tách mở mượt mà khi vào web. |
| **Hero Section** | Hoàn thành | Typography: *LÊ ĐẶNG ĐÀI TRANG* trên 1 dòng duy nhất (#F1C34C). Nội dung (tên, chức danh, nhãn, nút CTA) căn giữa toán học 100% (dead center) tuyệt đối. Khung ngắm 4 góc ┌ ┐ └ ┘ nới rộng sát mép trái/phải nhưng hạ an toàn xuống dưới thanh tác vụ (`top-20` đến `top-28`), loại bỏ hoàn toàn việc đè lấn navbar hay Logo/INQUIRE. Cụm 'SCROLL TO BEGIN' neo độc lập đáy viewport. |
| **About Me** | Hoàn thành | Bố cục 2 slide trượt ngang tinh giản cao cấp: <br>• **Ảnh chân dung tự nhiên, sắc nét**: Giữ trọn tỷ lệ đứng dọc điện ảnh `aspect-[4/5] max-h-[480px]`, đã gỡ bỏ hoàn toàn dải khí vàng và các hạt bụi lấp lánh để giữ ảnh nguyên bản, trong trẻo và thanh lịch.<br>• **Khối PROFILE không khung**: Đầy đủ 3 trường thông tin, typography sang trọng.<br>• **Hiệu ứng đếm số Slide 2 (3.5s)**: Đã nâng cấp thời gian chạy lên đúng 3.5s với độ trễ siêu nhạy 0.1s. Cập nhật trực tiếp qua DOM ref loại bỏ hoàn toàn giật lag; tích hợp animation cuộn số động liên tục (rolling digits ticker) cho cả số nhỏ (5, 7, 10) và cuộn mượt mà 0 -> 1991, đảm bảo người xem nhìn thấy rõ ràng 100% từng nấc số đếm sống động suốt 3.5 giây mỗi lần bấm sang Slide 2. |
| **Filmmaking Section** | Hoàn thành | • **GSAP ScrollTrigger Pinned Horizontal Scroll with Scrubbed Parallax Layers** đa tầng.<br>• Thay thế 100% bằng 5 ảnh poster phim chính thức chuẩn 16:9 full-frame nội bộ.<br>• **Sửa triệt để căn lề thẻ nổi**: Gỡ bỏ chuyển động dịch chuyển `x: 45` giúp thẻ số thứ tự (01/05 -> 05/05) neo chuẩn xác sát góc trái (`top-3 left-3`), không bị thụt lề; thẻ danh hiệu (laurel) neo chuẩn xác góc phải (`top-3 right-3`) mở rộng hiển thị 100% văn bản, hoàn toàn không bị khuất chữ.<br>• Mũi tên chéo (↗) click mở ngay trailer YouTube trên tab mới.<br>• **Modal Credits tinh gọn 3 mục**: Thể loại, Đạo diễn, Diễn viên. |
| **Experiences / Timeline** | Hoàn thành | Dòng thời gian hành trình Producer Journey (`ACT III — EXPERIENCES`). Đã gỡ bỏ hoàn toàn khối giải thưởng `ACCOLADES & FESTIVAL LAURELS / RECOGNITION IN EXCELLENCE` theo đúng yêu cầu, timeline kết thúc tinh gọn, chuyên nghiệp. |
| **Contact Section** | Hoàn thành | • Gỡ bỏ hoàn toàn trường chọn dropdown `PROJECT SCOPE & TYPE`, form liên hệ tinh giản với 3 trường trọng tâm: Tên, Email, Ghi chú/Tóm tắt dự án.<br>• Nút Facebook liên kết chính xác tới trang cá nhân chính thức của Nhà sản xuất Lê Đặng Đài Trang: [https://www.facebook.com/ledangdaitrang](https://www.facebook.com/ledangdaitrang). |

---

## 3. Nhật Ký Thay Đổi (Changelog)

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
    - *Nhắm mắt thấy mùa hè*: Đạo diễn Cao Bá Dung / Diễn viên: Phương Anh Đào, Takafumi Akutsu
    - *Trời sáng rồi, ta ngủ đi thôi*: Đạo diễn Chung Chí Công / Diễn viên: Hà Quốc Hoàng, Trần Lê Thúy Vy
    - *Sài Gòn trong cơn mưa*: Đạo diễn Lê Minh Hoàng / Diễn viên: Avin Lu, Hồ Thu Anh
    - *Trái tim quái vật*: Đạo diễn Tạ Nguyên Hiệp / Diễn viên: Hoàng Thùy Linh, B Trần, Hứa Vĩ Văn, Quang Trung
    - *Giao lộ 8675*: Đạo diễn Tân DS / Diễn viên: Isaac, Rocker Nguyễn, Lợi Trần, Emma Lê, La Thành
  - Bổ sung hàm ánh xạ fallback an toàn đảm bảo luôn hiển thị chuẩn xác 100% kể cả trong môi trường cache.

### [2026-10-10 - Cập nhật 6]
- **Thiết Lập Tự Động Triển Khai GitHub Pages (GitHub Actions Workflow & Vite Base)**:
  - **Cấu hình `vite.config.ts`**: Đặt `base: process.env.NODE_ENV === 'production' ? '/Portfolio/' : '/'` để các đường dẫn CSS, JS, favicon và assets được định tuyến chính xác trên tên miền phụ repository `https://schizophren-ia.github.io/Portfolio/`.
  - **Tạo Quy Trình Tự Động Triển Khai `.github/workflows/deploy.yml`**:
    - Sử dụng GitHub Actions chính thức (`actions/configure-pages@v5`, `actions/upload-pages-artifact@v3`, `actions/deploy-pages@v4`).
    - Mỗi khi có mã nguồn mới được push lên nhánh `main`, hệ thống sẽ tự động cài đặt gói thư viện, biên dịch dự án Vite sang thư mục `dist/` và phát hành lên GitHub Pages.
  - **Kiểm thử biên dịch**: Build production thành công trong 5.35s với đầy đủ bundles tối ưu hóa.

### [2026-10-10 - Cập nhật 7]
- **Khắc Phục Lỗi Hiển Thị Ảnh Trên GitHub Pages (Assets Base Subpath Resolution)**:
  - **Nguyên nhân**: Khi chạy trên GitHub Pages tại địa chỉ `https://schizophren-ia.github.io/Portfolio/`, các đường dẫn ảnh tĩnh trước đó là `/images/...` bị trình duyệt hiểu lầm là dẫn về gốc domain `schizophren-ia.github.io/images/...` (dẫn tới mã lỗi HTTP 404 Not Found), khiến ảnh chân dung About Me và poster các phim không hiển thị.
  - **Khắc phục**:
    - Tích hợp tiện ích `getAssetUrl` sử dụng `import.meta.env.BASE_URL` trong [content.ts](file:///d:/test/src/data/content.ts) và [portfolioData.ts](file:///d:/test/src/data/portfolioData.ts).
    - Toàn bộ đường dẫn ảnh chân dung (`profile-portrait.jpg`) cùng 5 poster phim chính thức (`nham-mat-thay-mua-he.jpg`, `troi-sang-roi.jpg`, `saigon-trong-con-mua.jpg`, `trai-tim-quai-vat.jpg`, `giao-lo-8675.jpg`) được tự động gắn tiền tố `/Portfolio/images/...` chuẩn xác trên môi trường production.
    - Đồng thời vẫn tương thích hoàn hảo 100% khi chạy kiểm thử local (`localhost:5173`).

---

## 4. Kế Hoạch & Ý Tưởng Tiếp Theo (Roadmap)

*(Đang chờ ý tưởng tiếp theo từ bạn)*


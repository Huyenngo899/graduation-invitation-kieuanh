
(() => {
  "use strict";

  const config = window.INVITATION_CONFIG;
  if (!config) {
    console.error("Không tìm thấy INVITATION_CONFIG.");
    return;
  }

  const $ = (selector) => document.querySelector(selector);

  const stage = $("#stage");
  const frame = $("#frame");
  const cover = $("#cover");
  const overlay = $("#overlay");
  const form = $("#rsvp");
  const formStatus = $("#formStatus");

  // ==========================================
  // 1. SCALE KHUNG 1080 × 1920 VỪA MÀN HÌNH
  // ==========================================

  function scaleFrame() {
    if (!frame) return;

    const designWidth = 1080;
    const designHeight = 1920;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Chừa một khoảng nhỏ để tránh sát mép màn hình
    const scaleX = screenWidth / designWidth;
    const scaleY = screenHeight / designHeight;
    const scale = Math.min(scaleX, scaleY);

    frame.style.transformOrigin = "center center";
    frame.style.transform = `scale(${scale})`;

    if (stage) {
      stage.style.width = `${designWidth}px`;
      stage.style.height = `${designHeight}px`;
    }
  }

  scaleFrame();

  window.addEventListener("resize", scaleFrame);
  window.addEventListener("orientationchange", scaleFrame);

  // ==========================================
  // 2. ĐỔ DỮ LIỆU VÀO HTML
  // ==========================================

  document.querySelectorAll("[data-bind]").forEach((element) => {
    const key = element.dataset.bind;
    element.textContent = config[key] ?? "";
  });

  const mapLink = $("#mapLink");
  if (mapLink) {
    mapLink.href = config.mapUrl || "https://www.google.com/maps";
  }

  const contactLink = $("#contactLink");
  if (contactLink) {
    if (config.contactEmail) {
      contactLink.href = `mailto:${config.contactEmail}`;
      contactLink.title = config.contactEmail;
    } else {
      contactLink.removeAttribute("href");
    }
  }

  // ==========================================
  // 3. HIỂN THỊ CHƯƠNG TRÌNH
  // ==========================================

  const timeline = $("#timeline");

  if (timeline) {
    timeline.replaceChildren();

    (Array.isArray(config.timeline) ? config.timeline : [])
      .forEach((item) => {
        const li = document.createElement("li");

        const time = document.createElement("span");
        time.className = "timeline-time";
        time.textContent = item.time || "";

        const title = document.createElement("span");
        title.className = "timeline-title";
        title.textContent = item.title || "";

        const description = document.createElement("span");
        description.className = "timeline-desc";
        description.textContent = item.description || "";

        li.append(time, title, description);
        timeline.appendChild(li);
      });
  }

  // ==========================================
  // 4. ĐẾM NGƯỢC
  // ==========================================

  const eventTimestamp = Date.parse(config.eventDate);
  const countdown = $("#countdown");

  const daysEl = $("#cd-d");
  const hoursEl = $("#cd-h");
  const minutesEl = $("#cd-m");
  const secondsEl = $("#cd-s");

  let countdownTimer = null;

  function pad(value) {
    return String(value).padStart(2, "0");
  }

  function updateCountdown() {
    if (!Number.isFinite(eventTimestamp)) {
      if (countdown) countdown.hidden = true;
      return;
    }

    if (countdown) countdown.hidden = false;

    const remaining = eventTimestamp - Date.now();

    if (remaining <= 0) {
      if (daysEl) daysEl.textContent = "00";
      if (hoursEl) hoursEl.textContent = "00";
      if (minutesEl) minutesEl.textContent = "00";
      if (secondsEl) secondsEl.textContent = "00";

      if (countdownTimer !== null) {
        clearInterval(countdownTimer);
        countdownTimer = null;
      }
      return;
    }

    const totalSeconds = Math.floor(remaining / 1000);

    if (daysEl) {
      daysEl.textContent = pad(Math.floor(totalSeconds / 86400));
    }

    if (hoursEl) {
      hoursEl.textContent = pad(
        Math.floor((totalSeconds % 86400) / 3600)
      );
    }

    if (minutesEl) {
      minutesEl.textContent = pad(
        Math.floor((totalSeconds % 3600) / 60)
      );
    }

    if (secondsEl) {
      secondsEl.textContent = pad(totalSeconds % 60);
    }
  }

  updateCountdown();

  if (Number.isFinite(eventTimestamp) &&
      eventTimestamp > Date.now()) {
    countdownTimer = setInterval(updateCountdown, 1000);
  }

  // ==========================================
  // 5. MỞ BÌA: ẢNH TRƯỚC LÊN, ẢNH SAU XUỐNG
  // ==========================================

  let isOpened = false;
  let autoOpenTimer = null;

  function openInvitation() {
    if (!cover || isOpened) return;

    isOpened = true;

    if (autoOpenTimer !== null) {
      clearTimeout(autoOpenTimer);
      autoOpenTimer = null;
    }

    // CSS xử lý chuyển động hai ảnh
    cover.classList.add("open");
    cover.setAttribute("aria-expanded", "true");

    // Ẩn hẳn lớp bìa sau khi hiệu ứng hoàn tất
    window.setTimeout(() => {
      cover.classList.add("gone");
      cover.setAttribute("aria-hidden", "true");
      cover.setAttribute("tabindex", "-1");
    }, 1350);
  }

  if (cover) {
    cover.addEventListener("click", openInvitation);

    cover.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openInvitation();
      }
    });

    const seconds = Number(config.autoOpenSeconds);
    const delay = Number.isFinite(seconds)
      ? Math.max(0, seconds)
      : 5;

    autoOpenTimer = setTimeout(openInvitation, delay * 1000);
  }

  // ==========================================
  // 6. FORM XÁC NHẬN THAM DỰ
  // ==========================================

  const openRsvpButton = $("#openRsvp");
  const closeRsvpButton = $("#closeRsvp");
  const cancelRsvpButton = $("#cancelRsvp");

  let lastFocusedElement = null;

  function openRsvp() {
    if (!overlay) return;

    lastFocusedElement = document.activeElement;
    overlay.hidden = false;
    document.body.classList.add("modal-open");

    if (formStatus) formStatus.textContent = "";

    $("#guestName")?.focus();
  }

  function closeRsvp() {
    if (!overlay) return;

    overlay.hidden = true;
    document.body.classList.remove("modal-open");

    if (lastFocusedElement?.focus) {
      lastFocusedElement.focus();
    }
  }

  openRsvpButton?.addEventListener("click", openRsvp);
  closeRsvpButton?.addEventListener("click", closeRsvp);
  cancelRsvpButton?.addEventListener("click", closeRsvp);

  overlay?.addEventListener("click", (event) => {
    if (event.target === overlay) closeRsvp();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && overlay && !overlay.hidden) {
      closeRsvp();
    }
  });

  // ==========================================
  // 7. GỬI RSVP QUA EMAIL
  // ==========================================

  form?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const guests = String(formData.get("guests") || "1");
    const message = String(formData.get("message") || "").trim();

    if (!name) return;

    if (!config.contactEmail) {
      if (formStatus) {
        formStatus.textContent =
          "Chưa cấu hình email nhận xác nhận. " +
          "Vui lòng cập nhật contactEmail trong config.js.";
      }
      return;
    }

    const subject = "Xác nhận tham dự lễ tốt nghiệp";

    const body = [
      "XÁC NHẬN THAM DỰ LỄ TỐT NGHIỆP",
      "",
      `Họ và tên: ${name}`,
      `Số người tham dự: ${guests}`,
      `Lời nhắn: ${message || "(Không có)"}`,
    ].join("\n");

    const mailto =
      `mailto:${config.contactEmail}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    if (formStatus) {
      formStatus.textContent =
        "Đang mở ứng dụng email để bạn gửi xác nhận.";
    }

    window.location.href = mailto;
  });

  // Dọn bộ đếm và timer
  window.addEventListener("pagehide", () => {
    if (countdownTimer !== null) clearInterval(countdownTimer);
    if (autoOpenTimer !== null) clearTimeout(autoOpenTimer);
  });
})();

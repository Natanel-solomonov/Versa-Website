// API Configuration
// Use production API URL when deployed, local for development
const API_BASE_URL =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://172.20.10.8:8000/api" // Local development
    : "https://versa-backend-production.up.railway.app/api"; // Production API

// Modal Management
function showWaitlistModal() {
  const modal = document.getElementById("waitlistModal");
  modal.classList.add("show");
  document.body.style.overflow = "hidden";

  // Reset form
  const form = document.getElementById("waitlistForm");
  const successMessage = document.getElementById("successMessage");
  form.style.display = "block";
  successMessage.style.display = "none";
  form.reset();
}

function closeWaitlistModal() {
  const modal = document.getElementById("waitlistModal");
  modal.classList.remove("show");
  document.body.style.overflow = "auto";
}

function showHowItWorks() {
  // Hide the main content and show the how it works screen
  document.querySelector(".main-content").style.display = "none";
  document.getElementById("howItWorksScreen").style.display = "block";

  // Show the back button in header
  document.getElementById("headerBackBtn").style.display = "block";

  // Hide the "How does it work" button when on that screen
  document.querySelector(".how-it-works-btn").style.display = "none";

  // Show "How Does Versa Work" content by default but don't scroll
  switchTab("how-it-works", false);
}

function closeHowItWorksModal() {
  const modal = document.getElementById("howItWorksModal");
  modal.classList.remove("show");
  document.body.style.overflow = "auto";
}

function closeModal(event) {
  if (event.target.classList.contains("modal-overlay")) {
    closeWaitlistModal();
    closeHowItWorksModal();
  }
}

// Form Handling
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("waitlistForm");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const submitBtn = form.querySelector(".submit-btn");
    const originalText = submitBtn.textContent;

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = "Joining...";

    // Get form data
    const formData = new FormData(form);
    const data = {
      first_name: formData.get("firstName"),
      last_name: formData.get("lastName"),
      email: formData.get("email"),
      phone_number: formData.get("phone"),
    };

    try {
      const response = await fetch(`${API_BASE_URL}/waitlist/join/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        // Show success message
        form.style.display = "none";
        document.getElementById("successMessage").style.display = "block";

        // Track conversion (you can add analytics here)
        console.log("User joined waitlist:", result.user);

        // Auto-close modal after 3 seconds
        setTimeout(() => {
          closeWaitlistModal();
        }, 3000);
      } else {
        // Handle validation errors
        let errorMessage = "Something went wrong. Please try again.";

        if (result.errors) {
          if (result.errors.email) {
            errorMessage = result.errors.email[0];
          } else {
            errorMessage = Object.values(result.errors)[0][0];
          }
        }

        alert(errorMessage);
      }
    } catch (error) {
      console.error("Error joining waitlist:", error);
      alert("Network error. Please check your connection and try again.");
    } finally {
      // Reset button
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
});

// Keyboard Navigation
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeWaitlistModal();
    closeHowItWorksModal();
  }
});

// Smooth scroll for future sections
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Scroll to top function for logo click
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Tab switching functionality
function switchTab(tabName, shouldScroll = true) {
  // Remove active class from all tabs
  document.querySelectorAll(".tab-btn").forEach((tab) => {
    tab.classList.remove("active");
  });

  // Add active class to clicked tab
  document.querySelector(`[data-tab="${tabName}"]`).classList.add("active");

  // Hide all tab content
  document.querySelectorAll(".tab-content").forEach((content) => {
    content.style.display = "none";
  });

  // Show selected tab content
  document.getElementById(`${tabName}-content`).style.display = "block";

  // Only scroll if explicitly requested (when user clicks)
  if (shouldScroll) {
    setTimeout(() => {
      const contentElement = document.getElementById(`${tabName}-content`);
      if (contentElement) {
        contentElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  }
}

// Navigation functions
function goBackToHome() {
  document.getElementById("howItWorksScreen").style.display = "none";
  document.querySelector(".main-content").style.display = "block";

  // Hide the back button in header
  document.getElementById("headerBackBtn").style.display = "none";

  // Show the "How does it work" button again
  document.querySelector(".how-it-works-btn").style.display = "block";

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function goToWaitlistPage() {
  window.location.href = "waitlist.html";
}

// Modal functions
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

// Close modal when clicking outside of it
window.onclick = function (event) {
  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
    document.body.style.overflow = "auto";
  }
};

// Header scroll effect (optional enhancement)
let lastScrollTop = 0;
window.addEventListener(
  "scroll",
  function () {
    const header = document.querySelector(".sticky-header");
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add shadow on scroll
    if (scrollTop > 0) {
      header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.15)";
    } else {
      header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    }

    lastScrollTop = scrollTop;
  },
  false
);

// Analytics tracking (placeholder for future implementation)
function trackEvent(eventName, properties = {}) {
  console.log("Track Event:", eventName, properties);
  // Implement analytics tracking here (Google Analytics, Mixpanel, etc.)
}

// Track page view
trackEvent("page_view", {
  page: "landing",
  timestamp: new Date().toISOString(),
});

// Arrow navigation functionality
function scrollToNextStep(stepNumber) {
  const nextStep = document.getElementById(`step-${stepNumber}`);
  if (nextStep) {
    const rect = nextStep.getBoundingClientRect();
    const offset = window.pageYOffset + rect.top - window.innerHeight * 0.05;

    window.scrollTo({
      top: offset,
      behavior: "smooth",
    });

    // Track navigation event
    trackEvent("step_navigation", {
      from_step: stepNumber - 1,
      to_step: stepNumber,
      timestamp: new Date().toISOString(),
    });
  }
}

// FAQ dropdown functionality
function toggleFaqItem(questionElement) {
  const faqItem = questionElement.parentElement;
  const isActive = faqItem.classList.contains("active");

  // Close all other FAQ items
  document.querySelectorAll(".faq-item").forEach((item) => {
    item.classList.remove("active");
  });

  // Toggle current item
  if (!isActive) {
    faqItem.classList.add("active");

    // Track FAQ interaction
    trackEvent("faq_question_opened", {
      question: questionElement.querySelector("span").textContent,
      timestamp: new Date().toISOString(),
    });
  }
}

// Form validation helpers
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone) {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ""));
}

// Real-time form validation (optional enhancement)
document.addEventListener("DOMContentLoaded", function () {
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");

  if (emailInput) {
    emailInput.addEventListener("blur", function () {
      if (this.value && !validateEmail(this.value)) {
        this.style.borderColor = "#ef4444";
      } else {
        this.style.borderColor = "#e5e7eb";
      }
    });
  }

  if (phoneInput) {
    phoneInput.addEventListener("blur", function () {
      if (this.value && !validatePhone(this.value)) {
        this.style.borderColor = "#ef4444";
      } else {
        this.style.borderColor = "#e5e7eb";
      }
    });
  }
});

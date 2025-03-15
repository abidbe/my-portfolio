<template>
  <div class="contact-page">
    <div class="container">
      <!-- Page Header -->
      <div class="page-header animate">
        <h1 class="page-title">Get In Touch</h1>
        <p class="page-subtitle">Let's discuss your project and see how I can help</p>
      </div>

      <div class="contact-content">
        <!-- Contact Info -->
        <div class="contact-info animate animate-from-left">
          <div class="info-card">
            <h2 class="info-title">Contact Information</h2>
            <p class="info-description">Feel free to reach out to me using your preferred method of communication.</p>

            <div class="info-items">
              <div class="info-item">
                <div class="info-icon">
                  <span>✉️</span>
                </div>
                <div class="info-details">
                  <h3>Email</h3>
                  <a :href="`mailto:${contact.email}`">{{ contact.email }}</a>
                </div>
              </div>

              <div class="info-item">
                <div class="info-icon">
                  <span>📍</span>
                </div>
                <div class="info-details">
                  <h3>Location</h3>
                  <p>{{ contact.location }}</p>
                </div>
              </div>
            </div>

            <div class="social-links">
              <h3 class="social-title">Connect With Me</h3>
              <div class="social-icons">
                <a v-for="social in contact.socialMedia" :key="social.name" :href="social.url" target="_blank" rel="noopener noreferrer" class="social-icon" :aria-label="social.name">
                  <i :class="`fab fa-${social.icon}`"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="contact-form animate animate-from-right">
          <form @submit.prevent="handleSubmit" class="form">
            <input type="text" name="_honey" style="display: none" />
            <input type="hidden" name="_captcha" value="false" />
            <div class="form-header">
              <h2 class="form-title">Send Me a Message</h2>
              <p class="form-description">I'll get back to you as soon as possible.</p>
            </div>

            <div class="form-group">
              <label for="name">Full Name</label>
              <input type="text" id="name" v-model="formData.name" placeholder="Your name" required />
              <span v-if="formErrors.name" class="error-message">{{ formErrors.name }}</span>
            </div>

            <div class="form-group">
              <label for="email">Email Address</label>
              <input type="email" id="email" v-model="formData.email" placeholder="Your email address" required />
              <span v-if="formErrors.email" class="error-message">{{ formErrors.email }}</span>
            </div>

            <div class="form-group">
              <label for="subject">Subject</label>
              <input type="text" id="subject" v-model="formData.subject" placeholder="What is this regarding?" required />
              <span v-if="formErrors.subject" class="error-message">{{ formErrors.subject }}</span>
            </div>

            <div class="form-group">
              <label for="message">Message</label>
              <textarea id="message" v-model="formData.message" placeholder="Your message here..." rows="5" required></textarea>
              <span v-if="formErrors.message" class="error-message">{{ formErrors.message }}</span>
            </div>

            <button type="submit" class="submit-btn" :disabled="isSubmitting">
              <span v-if="isSubmitting">Sending...</span>
              <span v-else>Send Message</span>
            </button>

            <div v-if="formSuccess" class="success-message">Thank you! Your message has been sent successfully.</div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useDataStore } from "../stores/dataStore";
import { useScrollAnimation } from "../composables/useScrollAnimation";

const dataStore = useDataStore();
const { contact } = dataStore;
const { initAnimations } = useScrollAnimation();

// Form data
const formData = reactive({
  name: "",
  email: "",
  subject: "",
  message: "",
});

// Form state
const formErrors = reactive({});
const formSuccess = ref(false);
const isSubmitting = ref(false);

// Validate form
const validateForm = () => {
  const errors = {};

  if (!formData.name.trim()) {
    errors.name = "Name is required";
  }

  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!formData.subject.trim()) {
    errors.subject = "Subject is required";
  }

  if (!formData.message.trim()) {
    errors.message = "Message is required";
  } else if (formData.message.trim().length < 10) {
    errors.message = "Message should be at least 10 characters";
  }

  return errors;
};

// Handle form submission
const handleSubmit = async () => {
  // Reset errors
  Object.keys(formErrors).forEach((key) => delete formErrors[key]);

  // Validate form
  const errors = validateForm();

  if (Object.keys(errors).length > 0) {
    // If there are errors, add them to formErrors
    Object.assign(formErrors, errors);
    return;
  }

  // Set submitting state
  isSubmitting.value = true;

  try {
    // Prepare form data for submission
    const formSubmitData = new FormData();
    formSubmitData.append("name", formData.name);
    formSubmitData.append("email", formData.email);
    formSubmitData.append("subject", formData.subject);
    formSubmitData.append("message", formData.message);
    formSubmitData.append("_captcha", "false");
    formSubmitData.append("_next", "https://abidbe.com");

    // Submit data to FormSubmit - ganti dengan email Anda
    await fetch("https://formsubmit.co/abidbe.123@gmail.com", {
      method: "POST",
      body: formSubmitData,
      headers: {
        Accept: "application/json",
      },
    });

    // Reset form
    formData.name = "";
    formData.email = "";
    formData.subject = "";
    formData.message = "";

    // Show success message
    formSuccess.value = true;

    // Reset submitting state
    isSubmitting.value = false;

    // Hide success message after 5 seconds
    setTimeout(() => {
      formSuccess.value = false;
    }, 5000);
  } catch (error) {
    console.error("Error sending email:", error);
    isSubmitting.value = false;
    // Opsional: tambahkan penanganan error disini
  }
};
onMounted(() => {
  initAnimations();
});
</script>

<style lang="scss" scoped>
.contact-page {
  padding: 8rem 0 4rem;
}

.page-header {
  text-align: center;
  margin-bottom: 4rem;

  .page-title {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .page-subtitle {
    font-size: 1.25rem;
    color: var(--color-text-dim);
    max-width: 600px;
    margin: 0 auto;
  }
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;

  @media (min-width: 992px) {
    grid-template-columns: 1fr 2fr;
  }
}

.contact-info {
  .info-card {
    background-color: var(--color-bg-alt);
    border-radius: 12px;
    padding: 2.5rem;
    height: 100%;

    .info-title {
      font-size: 1.8rem;
      margin-bottom: 1rem;
    }

    .info-description {
      color: var(--color-text-dim);
      margin-bottom: 2.5rem;
      line-height: 1.6;
    }
  }

  .info-items {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 3rem;
  }

  .info-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;

    .info-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      background-color: rgba(97, 218, 251, 0.1);
      border-radius: 50%;
      font-size: 1.25rem;
    }

    .info-details {
      h3 {
        font-size: 1.1rem;
        margin-bottom: 0.25rem;
      }

      a,
      p {
        color: var(--color-text-dim);
        font-size: 0.95rem;
        transition: color 0.3s ease;
      }

      a:hover {
        color: var(--color-primary);
      }
    }
  }

  .social-links {
    .social-title {
      font-size: 1.1rem;
      margin-bottom: 1rem;
    }

    .social-icons {
      display: flex;
      gap: 1rem;
    }

    .social-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background-color: rgba(97, 218, 251, 0.1);
      border-radius: 50%;
      transition: all 0.3s ease;

      &:hover {
        background-color: var(--color-primary);
        color: var(--color-bg);
        transform: translateY(-5px);
      }
    }
  }
}

.contact-form {
  .form {
    background-color: var(--color-bg-alt);
    border-radius: 12px;
    padding: 2.5rem;

    .form-header {
      margin-bottom: 2rem;

      .form-title {
        font-size: 1.8rem;
        margin-bottom: 0.5rem;
      }

      .form-description {
        color: var(--color-text-dim);
      }
    }
  }

  .form-group {
    margin-bottom: 1.5rem;

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }

    input,
    textarea {
      width: 100%;
      padding: 1rem;
      background-color: var(--color-bg);
      border: 1px solid var(--color-border);
      border-radius: 6px;
      color: var(--color-text);
      font-family: var(--font-body);
      font-size: 1rem;
      transition: border-color 0.3s ease;

      &:focus {
        outline: none;
        border-color: var(--color-primary);
      }

      &::placeholder {
        color: rgba(255, 255, 255, 0.3);
      }
    }

    textarea {
      resize: vertical;
    }

    .error-message {
      display: block;
      color: #ff4d4d;
      font-size: 0.85rem;
      margin-top: 0.5rem;
    }
  }

  .submit-btn {
    display: inline-block;
    padding: 1rem 2rem;
    background: var(--gradient-primary);
    border: none;
    border-radius: 6px;
    color: var(--color-bg);
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
      transform: none;
    }
  }

  .success-message {
    margin-top: 1.5rem;
    padding: 1rem;
    background-color: rgba(39, 174, 96, 0.1);
    border-left: 3px solid #27ae60;
    border-radius: 3px;
    color: #2ecc71;
  }
}
</style>

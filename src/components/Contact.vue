<template>
  <div class="contact-card">
    <!-- Header -->
    <div class="contact-header">
      <span class="contact-label">{{t('contact.header.label')}}</span>

      <h2 class="contact-title">{{t('contact.header.title')}}</h2>
    </div>

    <!-- Form -->
    <form class="contact-form" @submit.prevent="submitForm">
      <input v-model="form.name" type="text" class="input-field" :placeholder="t('contact.form.namePlaceholder')" required />

      <input v-model="form.email" type="email" class="input-field" :placeholder="t('contact.form.emailPlaceholder')" required />

      <textarea
        v-model="form.message"
        class="input-field textarea-field"
        :placeholder="t('contact.form.messagePlaceholder')"
        rows="3"
        required
      />

      <button type="submit" class="submit-btn" :title="t('contact.form.submitButton')">
        ⬢ {{ t('contact.form.submitButton') }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import emailjs from '@emailjs/browser'
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const form = reactive({
  name: '',
  email: '',
  message: '',
})

async function submitForm() {
  try {
    await emailjs.send(
      'service_yypfx98',
      'template_wl6rvot',
      {
        name: form.name,
        email: form.email,
        message: form.message,
      },
      '_XmH3qbW7D88177oP',
    )


    form.name = ''
    form.email = ''
    form.message = ''
  } catch (error) {
    console.error(error)

  }
}
</script>

<style scoped>
.contact-card {
  width: 90%;

  background: rgba(0, 0, 0, 0.45);

  color: #fff;

  clip-path: polygon(0% 0%, 103% 5%, 95% 100%, 5% 95%);

  padding: 1rem 1.2rem;

  position: relative;

  overflow: hidden;
}

/* ── Overlay ── */
.contact-card::before {
  content: '';

  position: absolute;
  inset: 0;

  background: linear-gradient(135deg, rgba(255, 107, 107, 0.06), transparent 45%);

  pointer-events: none;
}

/* ── Header ── */
.contact-header {
  margin-bottom: 0.8rem;

  display: flex;
  flex-direction: column;

  gap: 0.15rem;
}

.contact-label {
  font-family: 'Courier New', monospace;

  font-size: 0.6rem;

  letter-spacing: 0.18em;

  color: #ff6b6b;

  opacity: 0.8;
}

.contact-title {
  font-family: 'Pricedown', cursive;

  font-size: 1.5rem;

  margin: 0;

  line-height: 1;

  color: #fff;

  text-shadow: 0 0 10px rgba(255, 107, 107, 0.35);
}

/* ── Form ── */
.contact-form {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  gap: 0.7rem;
}

/* ── Inputs ── */
.input-field {
  width: 100%;

  background: rgba(255, 255, 255, 0.04);

  border: 1px solid rgba(255, 107, 107, 0.25);

  color: #fff;

  padding: 0.65rem 0.8rem;

  font-family: 'Courier New', monospace;

  font-size: 0.7rem;

  outline: none;

  clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);

  transition:
    border-color 0.25s ease,
    background 0.25s ease;
}

.input-field::placeholder {
  color: rgba(255, 255, 255, 0.35);
}

.input-field:focus {
  border-color: #ff6b6b;

  background: rgba(255, 107, 107, 0.08);
}

/* ── Textarea ── */
.textarea-field {
  resize: none;

  min-height: 75px;
}

/* ── Button ── */
.submit-btn {
  background: rgba(255, 107, 107, 0.12);

  border: 1px solid rgba(255, 107, 107, 0.4);

  color: #ff6b6b;

  padding: 0.7rem;

  cursor: pointer;

  font-family: 'Courier New', monospace;

  font-size: 0.68rem;

  letter-spacing: 0.12em;

  text-transform: uppercase;

  clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);

  transition:
    transform 0.2s ease,
    background 0.25s ease,
    color 0.25s ease;
}

.submit-btn:hover {
  transform: translateY(-1px);

  background: rgba(255, 107, 107, 0.18);

  color: #fff;
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .contact-card {
    width: 100%;

    clip-path: none;

    padding: 0.9rem;
  }

  .contact-title {
    font-size: 1.2rem;
  }
}
</style>

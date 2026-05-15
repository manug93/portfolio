// src/plugins/analytics.ts

// Déclaration des types globaux pour GA4
declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

export function loadGA(measurementId: string): void {
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []

  window.gtag = function (...args: unknown[]) {
    window.dataLayer.push(args)
  }

  window.gtag('js', new Date())
  window.gtag('config', measurementId, {
    anonymize_ip: true,
    send_page_view: true,
  })
}

// Helper pour envoyer des événements custom
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number>
): void {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params)
  }
}

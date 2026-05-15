// src/plugins/analytics.ts
// Remplace G-XXXXXXXXXX par ton Measurement ID dans Google Analytics

export function loadGA(measurementId: string) {
  // Injection du script GA4
  const script1 = document.createElement('script')
  script1.async = true
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(script1)

  // Initialisation
  window.dataLayer = window.dataLayer || []
  function gtag(...args: any[]) {
    window.dataLayer.push(args)
  }
  window.gtag = gtag

  gtag('js', new Date())
  gtag('config', measurementId, {
    // Anonymise les IPs (bonne pratique RGPD)
    anonymize_ip: true,
    // Envoie automatiquement les page_view
    send_page_view: true,
  })
}

// Helper pour envoyer des événements custom
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number>
) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params)
  }
}

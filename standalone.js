// ========================================
// NAVIGATION FUNCTIONALITY
// ========================================

// Mobile menu toggle
const navToggle = document.getElementById('navToggle')
const navMenu = document.getElementById('navMenu')

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active')
    })
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link')
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active')
    })
})

// Sticky navigation on scroll
const nav = document.getElementById('mainNav')
let lastScroll = 0

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset

    if (currentScroll > 100) {
        nav.classList.add('scrolled')
    } else {
        nav.classList.remove('scrolled')
    }

    lastScroll = currentScroll
})

// ========================================
// THEATRE.JS INITIALIZATION (CDN VERSION)
// ========================================

window.addEventListener('DOMContentLoaded', () => {
    // Check if Theatre.js is loaded
    if (typeof window.Theatre === 'undefined') {
        console.error('Theatre.js no se cargó correctamente desde el CDN')
        initializeFallbackAnimations()
        return
    }

    const { core, studio } = window.Theatre

    // Initialize Theatre.js Studio (for live editing)
    studio.initialize()

    // Create a Theatre.js project
    const project = core.getProject('BNN Agency Animations')

    // Create animation sheet
    const sheet = project.sheet('Main Animations')

    // ========================================
    // HERO SECTION ANIMATIONS
    // ========================================

    const heroTitle = document.getElementById('heroTitle')
    if (heroTitle) {
        const heroTitleObj = sheet.object('Hero Title', {
            opacity: 0,
            translateY: 50,
            scale: 0.95
        })

        heroTitleObj.onValuesChange((values) => {
            heroTitle.style.opacity = values.opacity
            heroTitle.style.transform = `translateY(${values.translateY}px) scale(${values.scale})`
        })
    }

    const heroSubheadline = document.getElementById('heroSubheadline')
    if (heroSubheadline) {
        const heroSubheadlineObj = sheet.object('Hero Subheadline', {
            opacity: 0,
            translateY: 30
        })

        heroSubheadlineObj.onValuesChange((values) => {
            heroSubheadline.style.opacity = values.opacity
            heroSubheadline.style.transform = `translateY(${values.translateY}px)`
        })
    }

    const heroCopy = document.getElementById('heroCopy')
    if (heroCopy) {
        const heroCopyObj = sheet.object('Hero Copy', {
            opacity: 0,
            translateY: 20
        })

        heroCopyObj.onValuesChange((values) => {
            heroCopy.style.opacity = values.opacity
            heroCopy.style.transform = `translateY(${values.translateY}px)`
        })
    }

    const heroCta = document.getElementById('heroCta')
    if (heroCta) {
        const heroCtaObj = sheet.object('Hero CTA', {
            opacity: 0,
            translateY: 20
        })

        heroCtaObj.onValuesChange((values) => {
            heroCta.style.opacity = values.opacity
            heroCta.style.transform = `translateY(${values.translateY}px)`
        })
    }

    const scrollIndicator = document.getElementById('scrollIndicator')
    if (scrollIndicator) {
        const scrollIndicatorObj = sheet.object('Scroll Indicator', {
            opacity: 0
        })

        scrollIndicatorObj.onValuesChange((values) => {
            scrollIndicator.style.opacity = values.opacity
        })
    }

    // ========================================
    // PILARES ANIMATIONS
    // ========================================

    for (let i = 1; i <= 3; i++) {
        const pilar = document.getElementById(`pilar${i}`)
        if (pilar) {
            const pilarObj = sheet.object(`Pilar ${i}`, {
                opacity: 0,
                translateY: 30,
                scale: 0.95
            })

            pilarObj.onValuesChange((values) => {
                pilar.style.opacity = values.opacity
                pilar.style.transform = `translateY(${values.translateY}px) scale(${values.scale})`
            })
        }
    }

    // ========================================
    // CASOS DE ESTUDIO ANIMATIONS
    // ========================================

    for (let i = 1; i <= 2; i++) {
        const caso = document.getElementById(`caso${i}`)
        if (caso) {
            const casoObj = sheet.object(`Caso ${i}`, {
                opacity: 0,
                translateX: i === 1 ? -30 : 30
            })

            casoObj.onValuesChange((values) => {
                caso.style.opacity = values.opacity
                caso.style.transform = `translateX(${values.translateX}px)`
            })
        }
    }

    // ========================================
    // PLAY ANIMATION SEQUENCE
    // ========================================

    sheet.sequence.play({
        range: [0, 3],
        rate: 1,
        direction: 'normal',
        iterationCount: 1
    })

    console.log('%c🎬 BNN Agency - Theatre.js Loaded!', 'color: #667eea; font-size: 20px; font-weight: bold;')
    console.log('%cUsa el panel de Theatre.js Studio para editar las animaciones en tiempo real.', 'color: #999; font-size: 12px;')
})

// ========================================
// FALLBACK ANIMATIONS (if Theatre.js fails)
// ========================================

function initializeFallbackAnimations() {
    console.log('%c⚠️ Usando animaciones CSS de respaldo', 'color: #f5576c; font-size: 14px;')

    const elements = [
        { id: 'heroTitle', delay: 0 },
        { id: 'heroSubheadline', delay: 200 },
        { id: 'heroCopy', delay: 400 },
        { id: 'heroCta', delay: 600 },
        { id: 'scrollIndicator', delay: 800 }
    ]

    elements.forEach(({ id, delay }) => {
        const element = document.getElementById(id)
        if (element) {
            setTimeout(() => {
                element.style.animation = 'fadeInUp 0.8s ease forwards'
            }, delay)
        }
    })

    // Pilares
    for (let i = 1; i <= 3; i++) {
        const pilar = document.getElementById(`pilar${i}`)
        if (pilar) {
            setTimeout(() => {
                pilar.style.animation = 'fadeInUp 0.8s ease forwards'
            }, 1000 + (i * 100))
        }
    }

    // Casos
    for (let i = 1; i <= 2; i++) {
        const caso = document.getElementById(`caso${i}`)
        if (caso) {
            setTimeout(() => {
                caso.style.animation = 'fadeInUp 0.8s ease forwards'
            }, 1200 + (i * 200))
        }
    }
}

// Add CSS animation for fallback
const style = document.createElement('style')
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  #heroTitle,
  #heroSubheadline,
  #heroCopy,
  #heroCta,
  #scrollIndicator {
    opacity: 0;
  }
`
document.head.appendChild(style)

// ========================================
// SCROLL-BASED ANIMATIONS
// ========================================

let ticking = false

function updateScrollAnimations() {
    const scrollY = window.scrollY
    const windowHeight = window.innerHeight

    // Parallax effect on hero background orbs
    const orbs = document.querySelectorAll('.gradient-orb')
    orbs.forEach((orb, index) => {
        const speed = 0.3 + (index * 0.1)
        orb.style.transform = `translateY(${scrollY * speed}px)`
    })

    // Fade out scroll indicator
    const scrollIndicator = document.getElementById('scrollIndicator')
    if (scrollIndicator) {
        const opacity = Math.max(0, 1 - (scrollY / windowHeight) * 2)
        scrollIndicator.style.opacity = opacity
    }

    // Animate elements on scroll into view
    const animateOnScroll = document.querySelectorAll('.pilar-card, .servicio-card, .team-card, .blog-card, .cultura-item')
    animateOnScroll.forEach((element) => {
        const rect = element.getBoundingClientRect()
        const isVisible = rect.top < windowHeight * 0.85

        if (isVisible && !element.classList.contains('animated')) {
            element.classList.add('animated')
            element.style.animation = 'fadeInUp 0.6s ease forwards'
        }
    })

    ticking = false
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateScrollAnimations()
        })
        ticking = true
    }
})

// Initial call
updateScrollAnimations()

// ========================================
// INTERACTIVE HOVER EFFECTS
// ========================================

// Enhanced button hover effects with ripple
const buttons = document.querySelectorAll('.btn')
buttons.forEach((button) => {
    button.addEventListener('mouseenter', (e) => {
        const rect = button.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const ripple = document.createElement('span')
        ripple.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      transform: translate(-50%, -50%);
      pointer-events: none;
      animation: ripple 0.6s ease-out;
    `
        button.appendChild(ripple)

        setTimeout(() => ripple.remove(), 600)
    })
})

// Add ripple animation
const rippleStyle = document.createElement('style')
rippleStyle.textContent = `
  @keyframes ripple {
    to {
      width: 200px;
      height: 200px;
      opacity: 0;
    }
  }
`
document.head.appendChild(rippleStyle)

// ========================================
// CULTURAL POWER TOOLTIP
// ========================================

const culturalPower = document.querySelector('.cultural-power')
if (culturalPower) {
    culturalPower.addEventListener('mouseenter', () => {
        const tooltip = culturalPower.getAttribute('data-tooltip')
        if (tooltip) {
            const tooltipEl = document.createElement('div')
            tooltipEl.className = 'tooltip'
            tooltipEl.textContent = tooltip
            tooltipEl.style.cssText = `
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%) translateY(-8px);
        background: rgba(102, 126, 234, 0.95);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        white-space: nowrap;
        pointer-events: none;
        z-index: 1000;
        animation: tooltipFadeIn 0.2s ease;
      `
            culturalPower.style.position = 'relative'
            culturalPower.appendChild(tooltipEl)
        }
    })

    culturalPower.addEventListener('mouseleave', () => {
        const tooltip = culturalPower.querySelector('.tooltip')
        if (tooltip) {
            tooltip.remove()
        }
    })
}

const tooltipStyle = document.createElement('style')
tooltipStyle.textContent = `
  @keyframes tooltipFadeIn {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(-8px);
    }
  }
`
document.head.appendChild(tooltipStyle)

// ========================================
// FORM HANDLING
// ========================================

const contactForm = document.getElementById('contactForm')
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault()

        // Get form data
        const formData = new FormData(contactForm)
        const data = Object.fromEntries(formData)

        console.log('Form submitted:', data)

        // Show success message
        const successMessage = document.createElement('div')
        successMessage.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
      color: white;
      padding: 2rem 3rem;
      border-radius: 1rem;
      font-size: 1.2rem;
      font-weight: 600;
      z-index: 10000;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      animation: successFadeIn 0.3s ease;
    `
        successMessage.textContent = '¡Gracias! Nos pondremos en contacto pronto.'
        document.body.appendChild(successMessage)

        setTimeout(() => {
            successMessage.style.animation = 'successFadeOut 0.3s ease'
            setTimeout(() => successMessage.remove(), 300)
        }, 3000)

        // Reset form
        contactForm.reset()
    })
}

const successStyle = document.createElement('style')
successStyle.textContent = `
  @keyframes successFadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.9);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
  
  @keyframes successFadeOut {
    from {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
    to {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.9);
    }
  }
`
document.head.appendChild(successStyle)

// ========================================
// SMOOTH SCROLL ENHANCEMENT
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute('href'))

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        }
    })
})

// ========================================
// CONSOLE BRANDING
// ========================================

console.log('%c BNN AGENCY ', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 24px; font-weight: bold; padding: 10px 20px; border-radius: 8px;')
console.log('%c We are READY ', 'color: #667eea; font-size: 16px; font-weight: bold;')
console.log('%c Human to Human Marketing ', 'color: #999; font-size: 12px;')

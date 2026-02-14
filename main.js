import { getProject } from '@theatre/core'
import studio from '@theatre/studio'

// ========================================
// THEATRE.JS INITIALIZATION
// ========================================

// Initialize Theatre.js Studio (for live editing)
studio.initialize()

// Create a Theatre.js project
const project = getProject('Landing Page Animations', {
    state: {
        // Initial animation state
        definitionVersion: '0.4.0',
        revisionHistory: [],
        state: {
            sheetsById: {
                'Hero Animation': {
                    sequence: {
                        tracksByObject: {
                            'Hero Title': {
                                trackData: {
                                    'opacity': {
                                        type: 'BasicKeyframedTrack',
                                        keyframes: [
                                            { position: 0, value: 0 },
                                            { position: 1, value: 1 }
                                        ]
                                    },
                                    'translateY': {
                                        type: 'BasicKeyframedTrack',
                                        keyframes: [
                                            { position: 0, value: 50 },
                                            { position: 1, value: 0 }
                                        ]
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
})

// Create animation sheet
const sheet = project.sheet('Hero Animation')

// ========================================
// HERO SECTION ANIMATIONS
// ========================================

// Animate Hero Title
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

// Animate Hero Subtitle
const heroSubtitle = document.getElementById('heroSubtitle')
if (heroSubtitle) {
    const heroSubtitleObj = sheet.object('Hero Subtitle', {
        opacity: 0,
        translateY: 30
    })

    heroSubtitleObj.onValuesChange((values) => {
        heroSubtitle.style.opacity = values.opacity
        heroSubtitle.style.transform = `translateY(${values.translateY}px)`
    })
}

// Animate Hero CTA
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

// Animate Hero Visual Cards
const heroVisual = document.getElementById('heroVisual')
if (heroVisual) {
    const heroVisualObj = sheet.object('Hero Visual', {
        opacity: 0,
        scale: 0.8,
        rotateZ: -5
    })

    heroVisualObj.onValuesChange((values) => {
        heroVisual.style.opacity = values.opacity
        heroVisual.style.transform = `scale(${values.scale}) rotateZ(${values.rotateZ}deg)`
    })
}

// Animate Scroll Indicator
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
// GALLERY ANIMATIONS
// ========================================

// Animate Gallery Items
for (let i = 1; i <= 4; i++) {
    const galleryItem = document.getElementById(`galleryItem${i}`)
    if (galleryItem) {
        const galleryItemObj = sheet.object(`Gallery Item ${i}`, {
            opacity: 0,
            translateY: 40,
            rotateZ: 0
        })

        galleryItemObj.onValuesChange((values) => {
            galleryItem.style.opacity = values.opacity
            galleryItem.style.transform = `translateY(${values.translateY}px) rotateZ(${values.rotateZ}deg)`
        })
    }
}

// ========================================
// PLAY ANIMATION SEQUENCE
// ========================================

// Play the animation sequence
sheet.sequence.play({
    range: [0, 3],
    rate: 1,
    direction: 'normal',
    iterationCount: 1
})

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
    if (scrollIndicator) {
        const opacity = Math.max(0, 1 - (scrollY / windowHeight) * 2)
        scrollIndicator.style.opacity = opacity
    }

    // Animate elements on scroll into view
    const animateOnScroll = document.querySelectorAll('.feature-card, .gallery-item')
    animateOnScroll.forEach((element) => {
        const rect = element.getBoundingClientRect()
        const isVisible = rect.top < windowHeight * 0.8

        if (isVisible && !element.classList.contains('animated')) {
            element.classList.add('animated')
            element.style.animation = 'fadeInUp 0.6s ease forwards'
        }
    })

    ticking = false
}

// Add CSS animation for scroll-triggered elements
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
  
  .feature-card,
  .gallery-item {
    opacity: 0;
  }
  
  .feature-card.animated,
  .gallery-item.animated {
    opacity: 1;
  }
`
document.head.appendChild(style)

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

// Enhanced button hover effects
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

// Visual card 3D tilt effect
const visualCards = document.querySelectorAll('.visual-card')
visualCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        const rotateX = (y - centerY) / 10
        const rotateY = (centerX - x) / 10

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`
    })

    card.addEventListener('mouseleave', () => {
        card.style.transform = ''
    })
})

// Gallery item hover animations
const galleryItems = document.querySelectorAll('.gallery-item')
galleryItems.forEach((item, index) => {
    item.addEventListener('mouseenter', () => {
        const galleryItemObj = sheet.object(`Gallery Item ${index + 1}`, {
            opacity: 1,
            translateY: 0,
            rotateZ: 0
        })

        // Animate rotation on hover
        const currentValues = galleryItemObj.value
        sheet.sequence.position = 3 + (index * 0.2)
    })
})

// ========================================
// CONSOLE MESSAGE
// ========================================

console.log('%c🎬 Theatre.js Loaded!', 'color: #667eea; font-size: 20px; font-weight: bold;')
console.log('%cUsa el panel de Theatre.js Studio (esquina superior derecha) para editar las animaciones en tiempo real.', 'color: #999; font-size: 12px;')
console.log('%cDocumentación: https://www.theatrejs.com/docs/latest/getting-started', 'color: #999; font-size: 12px;')

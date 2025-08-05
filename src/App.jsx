import { useState, useEffect } from 'react'
import './App.css'
import vfilesLogo from '/assets/vfiles.svg'
import fifaLogo from '/assets/chrome_logo.png'

function App() {
  const [vfilesImages, setVfilesImages] = useState([])
  const [fifaImages, setFifaImages] = useState([])
  const [loadedImages, setLoadedImages] = useState(new Set())
  const [showOverlay, setShowOverlay] = useState(false)

  useEffect(() => {
    // Load VFILES images from public folder
    const loadVfilesImages = () => {
      const imageUrls = []
      for (let i = 1; i <= 20; i++) {
        const imageNumber = i.toString().padStart(2, '0')
        imageUrls.push(`/images/vfiles/VFILES_PicGrid_${imageNumber}.webp`)
      }
      setVfilesImages(imageUrls)
    }

    // Load FIFA images from public folder
    const loadFifaImages = () => {
      const imageUrls = []
      for (let i = 1; i <= 20; i++) {
        const imageNumber = i.toString().padStart(2, '0')
        imageUrls.push(`/images/fifa/FIFA_PicGrid_${imageNumber}.webp`)
      }
      setFifaImages(imageUrls)
    }

    loadVfilesImages()
    loadFifaImages()
  }, [])

  useEffect(() => {
    if (vfilesImages.length > 0 && fifaImages.length > 0) {
      const allImages = [...vfilesImages, ...fifaImages]
      const totalImages = allImages.length
      const loadedSet = new Set()
      
      // Create array of indices and shuffle them
      const indices = Array.from({ length: totalImages }, (_, i) => i)
      const shuffledIndices = indices.sort(() => Math.random() - 0.5)
      
      // Load images one by one randomly over 2 seconds
      shuffledIndices.forEach((index, i) => {
        setTimeout(() => {
          loadedSet.add(index)
          setLoadedImages(new Set(loadedSet))
          
          // Check if all images are loaded
          if (loadedSet.size === totalImages) {
            // Wait a bit more then show overlay
            setTimeout(() => {
              setShowOverlay(true)
            }, 200)
          }
        }, (i / totalImages) * 2000) // Spread over 2 seconds
      })
    }
  }, [vfilesImages, fifaImages])

  return (
    <div className="app-container">
      <div className="app-content">

        <a 
          href="https://www.vfiles.com/" 
          id="vfiles" 
          className="link-container"
        >
          <div className={`overlay ${showOverlay ? 'overlay-visible' : ''}`}>
            <img src={vfilesLogo} alt="VFILES" className="vfiles-logo" />
          </div>
          {vfilesImages.map((image, index) => (
            <div 
              key={index} 
              className={`image-grid-item ${loadedImages.has(index) ? 'image-loaded' : ''}`}
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
        </a>

        <a 
          href="https://fifa1904.vfiles.com/" 
          id="fifa" 
          className="link-container"
        >
          <div className={`overlay ${showOverlay ? 'overlay-visible' : ''}`}>
            <img src={fifaLogo} alt="FIFA" className="fifa-logo" />
          </div>
          {fifaImages.map((image, index) => (
            <div 
              key={index} 
              className={`image-grid-item ${loadedImages.has(vfilesImages.length + index) ? 'image-loaded' : ''}`}
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
        </a>

      </div>
    </div>
  )
}

export default App

class ImageGridApp {
  constructor() {
    this.loadedImages = new Set();
    this.showOverlay = false;
    
    this.init();
  }

  init() {
    this.setupImageLoading();
  }

  setupImageLoading() {
    const allItems = document.querySelectorAll('.image-grid-item');
    const totalImages = allItems.length;
    
    const indices = Array.from({ length: totalImages }, (_, i) => i);
    const shuffledIndices = indices.sort(() => Math.random() - 0.5);
    
    shuffledIndices.forEach((index, i) => {
      setTimeout(() => {
        this.loadedImages.add(index);
        this.updateLoadedImages();
        
        if (this.loadedImages.size === totalImages) {
          setTimeout(() => {
            this.showOverlay = true;
            this.updateOverlays();
          }, 200);
        }
      }, (i / totalImages) * 2000);
    });
  }

  updateLoadedImages() {
    const allItems = document.querySelectorAll('.image-grid-item');
    allItems.forEach(item => {
      const index = parseInt(item.dataset.index);
      if (this.loadedImages.has(index)) {
        item.classList.add('image-loaded');
      }
    });
  }

  updateOverlays() {
    const vfilesOverlay = document.getElementById('vfiles-overlay');
    const fifaOverlay = document.getElementById('fifa-overlay');
    
    if (this.showOverlay) {
      vfilesOverlay.classList.add('overlay-visible');
      fifaOverlay.classList.add('overlay-visible');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ImageGridApp();
});
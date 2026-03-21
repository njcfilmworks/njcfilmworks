/* =====================================================
   NJCFILMWORKS - VIDEO MODAL
   Video lightbox and YouTube integration
   ===================================================== */

document.addEventListener('DOMContentLoaded', function() {
    initVideoModal();
});

/**
 * Initialize video modal
 */
function initVideoModal() {
    const modal = document.getElementById('videoModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const videoPlayer = document.getElementById('videoPlayer');
    const videoTriggers = document.querySelectorAll('.video-trigger');

    if (!modal) return;

    // Open modal on video trigger
    videoTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const videoId = this.getAttribute('data-video-id');
            const title = this.getAttribute('data-title');
            
            if (videoId) {
                openVideoModal(videoId, title);
            }
        });
    });

    // Close modal handlers
    if (modalClose) {
        modalClose.addEventListener('click', closeVideoModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeVideoModal);
    }

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && hasClass(modal, 'active')) {
            closeVideoModal();
        }
    });

    /**
     * Open video modal with YouTube video
     */
    function openVideoModal(videoId, title = '') {
        const youtubeEmbedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&modestbranding=1`;
        
        videoPlayer.setAttribute('src', youtubeEmbedUrl);
        videoPlayer.setAttribute('title', title || 'Video Player');
        
        addClass(modal, 'active');
        document.body.style.overflow = 'hidden';
        
        logStyled(`▶ Playing: ${title || videoId}`);
    }

    /**
     * Close video modal
     */
    function closeVideoModal() {
        removeClass(modal, 'active');
        videoPlayer.setAttribute('src', '');
        document.body.style.overflow = '';
    }
}

logStyled('🎬 Video Modal System Loaded');

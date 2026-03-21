// js/video-modal.js

// Functionality for YouTube video embeds with lightbox controls

// Open video modal
function openVideoModal(videoId) {
    const modal = document.createElement('div');
    modal.classList.add('video-modal');

    // Create iframe for YouTube video
    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1`);
    iframe.setAttribute('allowfullscreen', '');
    modal.appendChild(iframe);

    // Close button
    const closeButton = document.createElement('button');
    closeButton.innerText = 'Close';
    closeButton.classList.add('close-button');
    closeButton.onclick = function() {
        modal.remove();
    };
    modal.appendChild(closeButton);

    document.body.appendChild(modal);
}

// Example usage: openVideoModal('VIDEO_ID');

// Add lightbox controls in CSS
/*
.video-modal { 
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
}

.close-button {
    position: absolute;
    top: 20px;
    right: 20px;
    background-color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
}
*/

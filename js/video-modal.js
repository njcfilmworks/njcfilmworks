// JavaScript code for Video Modal Lightbox Functionality

// Function to open the modal
function openModal(videoId) {
    const modal = document.getElementById('videoModal');
    const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    modal.querySelector('iframe').src = videoSrc;
    modal.style.display = 'block';
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById('videoModal');
    modal.querySelector('iframe').src = '';
    modal.style.display = 'none';
}

// Event listeners for modal controls
document.getElementById('closeModalBtn').addEventListener('click', closeModal);

// Example: Open modal when a video thumbnail is clicked
document.querySelectorAll('.videoThumbnail').forEach(item => {
    item.addEventListener('click', event => {
        const videoId = item.getAttribute('data-video-id');
        openModal(videoId);
    });
});
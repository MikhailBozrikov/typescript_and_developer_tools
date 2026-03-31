// main.js
import Cropper from 'https://cdn.jsdelivr.net/npm/cropperjs@1.5.12/dist/cropper.esm.js';

const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://cdn.jsdelivr.net/npm/cropperjs@1.5.12/dist/cropper.css';
document.head.appendChild(link);

document.addEventListener('DOMContentLoaded', function() {
    const imageUpload = document.getElementById('image-upload');
    const uploadButton = document.getElementById('upload-button');
    const cropButton = document.getElementById('crop-button');
    const downloadButton = document.getElementById('download-button');
    const displayedImage = document.getElementById('displayed-image');
    const imageCropped = document.getElementById('image-cropped');
    const croppedContainer = document.querySelector('.cropped-container');

    let cropper = null;

    uploadButton.addEventListener('click', () => {
        imageUpload.click();
    });

    imageUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 300 * 1024) {
            alert('File size must be less than 300 KB');
            return;
        }

        if (!file.type.match('image.*')) {
            alert('Please select an image file');
            return;
        }

        const reader = new FileReader();
        
        reader.onload = function(event) {
            if (cropper) {
                cropper.destroy();
            }

            displayedImage.src = event.target.result;
            croppedContainer.style.display = 'none';

            displayedImage.onload = function() {
                cropper = new Cropper(displayedImage, {
                    aspectRatio: 16 / 9,
                    viewMode: 1,
                });
            };
        };

        reader.readAsDataURL(file);
    });

    cropButton.addEventListener('click', function() {
        if (!cropper) {
            alert('Please upload an image first');
            return;
        }

        const canvas = cropper.getCroppedCanvas();
        imageCropped.src = canvas.toDataURL('image/png');
        croppedContainer.style.display = 'block';
    });

    downloadButton.addEventListener('click', function() {
        if (!imageCropped.src || imageCropped.src === '#') {
            alert('No cropped image available. Please crop an image first.');
            return;
        }

        const link = document.createElement('a');
        link.download = 'cropped-image.png';
        link.href = imageCropped.src;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});
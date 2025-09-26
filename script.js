window.addEventListener("DOMContentLoaded", () => {
    const videoList = [
        {
            name: "FF best headshot",
            url: "https://drive.google.com/file/d/1uDW9vARHMEhyDZ37x34yEpDmtZpop9F-/view?usp=drive_link"
        }
    ];

    function getDriveDownloadLink(publicUrl) {
        // Example public URL: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
        const match = publicUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)\//);
        if (match && match[1]) {
            const fileId = match[1];
            return `https://drive.google.com/uc?export=download&id=${fileId}`;
        }
        return null; // Invalid URL format
    }

    const videoListsContainer = document.getElementById("video-lists");

    videoList.forEach(video => {
        const videoElement = document.createElement("div");
        videoElement.className = "video";
        videoElement.innerHTML = `
            <p>${video.name}</p>
            <button class="download-btn">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"
                    style="vertical-align:middle;">
                    <rect width="32" height="32" rx="6" fill="#000" />
                    <path d="M16 6v14m0 0l-5-5m5 5l5-5" stroke="#fff" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                    <rect x="8" y="24" width="16" height="2" rx="1" fill="#fff" />
                </svg>
            </button>
        `;
        // Attach event listener instead of using onclick inline
        videoElement.querySelector('.download-btn').addEventListener('click', () => {
            const downloadLink = getDriveDownloadLink(video.url);
            if (!downloadLink) {
                alert('Invalid Google Drive URL!');
                return;
            }
            const link = document.createElement('a');
            link.href = downloadLink;
            link.download = '';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
        videoListsContainer.appendChild(videoElement);
    });

    // Remove global pollution, no need for window.downloadVideo
})
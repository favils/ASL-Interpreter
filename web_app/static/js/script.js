const cameraBtn = document.getElementById('camera-btn');
const captureBtn = document.getElementById('capture-btn');
const video = document.getElementById('camera-feed');
const canvas = document.getElementById('snapshot');
const ctx = canvas.getContext('2d');
const d = document.querySelector('.desc');
const h1 = document.querySelector('.head');
const h2 = document.querySelector('.subtitle');
const results =  document.getElementById('result_section');

let stream;
async function startCamera() {
try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
} catch (err) {
    console.error("Error accessing camera:", err);
}
}

cameraBtn.addEventListener('click', () => {
    startCamera();
    d.style.display = "none";
    cameraBtn.style.display = "none";
    captureBtn.style.display = "block";
    video.style.display = "block";
    canvas.style.display = "none";
    h1.style.display = "none";
    h2.style.display = "none";
    results.style.display = "block"
    //clear result section
    while (results.firstChild) {
        results.removeChild(results.firstChild);
    }
    console.log("Recording started.");
});

captureBtn.addEventListener('click', () => {
    d.textContent = "Click start camera to redo";
    d.style.display = "block";
    cameraBtn.style.display = "block";
    captureBtn.style.display = "none";

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    const imageData = canvas.toDataURL('image/png');
    video.style.display = "none";
    canvas.style.display = "block";
    fetch('/upload_snapshot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({"image": imageData}),
    })
        .then((response) => response.json())
        .then((data) => {
            //console.log("Snapshot saved: ", data);

            const section = document.getElementById('result_section');

            const img = document.createElement('img');
            img.src = 'data:image/png;base64,'+data.output;
            img.alt = 'Processed Image';
            section.appendChild(img);

            const p = document.createElement('p');
            p.textContent = data.translation;
            p.classList.add('translation');
            section.appendChild(p);
        })
        .catch((err) => {
            console.error("Error saving snapshot: ", err);
        });
    console.log("Recording stopped.");
});
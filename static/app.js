const displayImage = document.getElementById('display-image')
function updateImage(url) {
    displayImage.src = url
    predict()
}

const inputImg = document.getElementById('file-input')
function getImgByFile(event){
    const file = event.target.files[0];
    let url = window.URL.createObjectURL(file);
    updateImage(url)
}

inputImg?.addEventListener('change', getImgByFile)

const isValidUrl = urlString=> {
    var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
    '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
    return !!urlPattern.test(urlString);
}

function isImage(url) {
    return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}

const urlBox = document.getElementById('url-box')
const urlSubmit = document.getElementById('url-submit')

url = urlBox.value

urlSubmit.addEventListener('click', () => {
    url = urlBox.value
    updateImage(url)
})

const webcamContainer = document.getElementById('webcam-container')

let webcamBtn = document.querySelector("#webcam-btn");
let video = document.querySelector("#vid");
let canvas = document.querySelector("#canvas");

let webcamIsOn = false

webcamBtn.addEventListener('click', async function() {
    video.style.display = "inline"
    document.getElementById("webcam-btn-title").innerHTML = "Chụp ảnh"

    if(!webcamIsOn) {
        let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        video.srcObject = stream;
        webcamIsOn = true;
    }

    else {
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        // let image_data_url = canvas.toDataURL('image/jpeg');
        updateImage(canvas.toDataURL('image/jpeg'))
 
        // data url of the image
        // console.log(image_data_url);
    }

});

async function predict() {
    const url = "/api";
    let data = new FormData()
    data.append("img", displayImage.src)
    try {
        const response = await fetch(
            url,
            {
                "method": "POST",
                "body": data
            }
        );
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);
    } catch (error) {
        console.error(error.message);
    }
    // console.log(response)
  }
  
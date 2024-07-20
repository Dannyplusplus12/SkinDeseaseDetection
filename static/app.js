
const loadImageBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}
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


const inputImg = document.getElementById('file-input')
async function getImgByFile(event){
    file = event.target.files[0];
    image = await loadImageBase64(file);
    let url = window.URL.createObjectURL(file);
    
    axios({
        method: "POST",
        url: "https://detect.roboflow.com/yolov8-skin-disease-detection/1",
        params: {
            api_key: "kTK0gAawSv3eqEDeXfAs"
        },
        data: image,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
    .then(function(response) {
        updateResult(response.data, url)
    })
    .catch(function(error) {
        console.log(error.message);
    });

}
inputImg?.addEventListener('change', getImgByFile)


const urlBox = document.getElementById('url-box')
const urlSubmit = document.getElementById('url-submit')
urlSubmit.addEventListener('click', () => {
    let url = urlBox.value
    axios({
        method: "POST",
        url: "https://detect.roboflow.com/yolov8-skin-disease-detection/1",
        params: {
            api_key: "kTK0gAawSv3eqEDeXfAs",
            image: url,
        },
    })
    .then(function(response) {
        updateResult(response.data, url)
    })
    .catch(function(error) {
        console.log(error.message);
    });
})

colorList = ["red", "blue", "green", "yellow", "purple", "orange", "cyan", "white", "black"]
trans = {
    "acne": "acne(mụn)",
    "eczema": "eczema(bệnh chàm)",
    "herpes zoster": "herpes zoster(VZV)",
    "hives": "hives(phát ban)",
    "lupus": "lupus(lupus ban đỏ)",
    "vitiligo": "vitiligo(bệnh bạch biến)",
    "raynauds": "raynauds",
    "tinea": "nấm da tinea"
}
link = {
    "acne": "https://nhathuoclongchau.com.vn/benh/mun-719.html",
    "eczema": "https://www.nhathuocankhang.com/benh/cham",
    "herpes zoster": "https://medlatec.vn/tu-dien-benh-ly/benh-herpes-zoster-spzmx",
    "hives": "https://nhathuoclongchau.com.vn/benh/phat-ban-884.html",
    "lupus": "https://www.vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/lupus-ban-do-la-benh-gi-su-nguy-hiem-va-bien-chung-cua-benh/",
    "vitiligo": "https://www.mayoclinic.org/diseases-conditions/vitiligo/symptoms-causes/syc-20355912",
    "raynauds": "https://www.msdmanuals.com/vi-vn/professional/r%E1%BB%91i-lo%E1%BA%A1n-tim-m%E1%BA%A1ch/b%E1%BB%87nh-%C4%91%E1%BB%99ng-m%E1%BA%A1ch-ngo%E1%BA%A1i-vi/h%E1%BB%99i-ch%E1%BB%A9ng-raynaud",
    "tinea": "https://www.vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/suc-khoe-tong-quat/nam-da-tinea-la-benh-gi/"
}


const displayResult = document.getElementById('display-result')
const imageResult = document.getElementById('image-result')
const Result = document.getElementById('result')

updateResult = (result, url) => {
    Result.innerHTML = '';
    document.querySelectorAll('.box').forEach(e => e.remove());

    imageResult.src = url
    imageResult.addEventListener('load', () => {
        if(imageResult.offsetWidth > displayResult.offsetWidth) {
            displayResult.style.scale = `${50 / (imageResult.offsetWidth / displayResult.offsetWidth)}%`
        }
    })
    predictions = result.predictions
    
    color_index = 0
    deseases = {}

    predictions.forEach(function (value, i) {
        if(!(value.class in deseases)) {
            deseases[value.class] = colorList[color_index]
            ++color_index
        }

        box = document.createElement("div")
        box.classList.add("box")
        box.style.cssText = `left:${value.x}px;
                            top:${value.y}px;
                            width:${value.width}px;
                            height:${value.height}px;
                            background-color:${deseases[value.class]}`

        displayResult.appendChild(box)
    });

    for(key in deseases) {
        x = document.createElement("div")
        color_rect = document.createElement("div")
        color_rect.classList.add("color-rect")
        color_rect.style.cssText = `background-color:${deseases[key]}`
        x.appendChild(color_rect)
        predict = document.createElement("div")
        predict.innerHTML = `${trans[key]}  >>  <a href="${link[key]}">Nhấp vào đây để tìm hiểu về ${trans[key]}</a>`
        x.appendChild(predict)
        Result.appendChild(x)
    }
}

const newsAPI = "http://localhost:3000/news";
const listNews = document.querySelector(".list-news");
const formTittle = document.querySelector("input[name='title']");
const formDesc = document.querySelector("input[name='desc']");
const formImg = document.querySelector("input[name='img']");
const btnCreate = document.querySelector(".btn-create");
const btnUpdate = document.querySelector(".btn-update");

async function getNews(url) {
    const promise = await fetch(url);
    const data = await promise.json();
    return data;
}
async function renderListNews() {
    const data = await getNews(newsAPI);
    data.forEach((news, index) => {
        listNews.innerHTML += `<div class="col">
        <div class="card-news">
            <div class="thumb"><img src="${news.img_url}" alt="" /></div>
            <h3 class="title">${news.title}</h3>
            <div class="desc">${news.desc}</div>
            <div class="button" onclick="deleteNews(${news.id})">Delete</div>
            <div class="button" onclick="updateNews(${news.id})">Edit</div>
        </div>
    </div>`;
    });
}
renderListNews();

btnCreate.addEventListener("click", async function () {
    const objNews = {
        title: formTittle.value,
        desc: formDesc.value,
        img_url: formImg.value,
    };
    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objNews),
    };
    await fetch(newsAPI, option);
    renderListNews();
});
async function deleteNews(id) {
    const option = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    };
    await fetch(`${newsAPI}/${id}`, option);
    renderListNews();
}
async function updateNews(id) {
    const data = await getNews(`${newsAPI}/${id}`);
    formTittle.value = data.title;
    formDesc.value = data.desc;
    formImg.value = data.img_url;
    btnCreate.style.display = "none";
    btnUpdate.style.display = "block";
    btnUpdate.setAttribute("data-id", id);
}
btnUpdate.addEventListener("click", async function () {
    const objNews = {
        title: formTittle.value,
        desc: formDesc.value,
        img_url: formImg.value,
    };
    const option = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objNews),
    };
    const id = btnUpdate.getAttribute("data-id");
    await fetch(`${newsAPI}/${id}`, option);
    renderListNews();
});

var data=[];
window.addEventListener("load",()=>fetchNews("india"));

async function fetchNews(query){
fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=479bdad0d3eb4b6fa4555200a757181b`)
.then((respond)=>{return respond.json()})
.then((respond)=>{
    data=respond.articles;
    console.log(data)
    bindData(data)
})
// .catch((error)=>{console.log("error")})

}

function bindData(articles){
   const templetCard=document.getElementById("templet-news-card")
   const card_container=document.getElementsByClassName("cards-container")[0]
   
   card_container.innerHTML="";
   articles.forEach(element => {
    if(element.urlToImage==null){return }
    const clonecard=templetCard.content.cloneNode(true)
           fillDataInCard(clonecard,element);
           card_container.appendChild(clonecard)
   });
}
function fillDataInCard(cardClone,article){
    cardClone.querySelector('.news-img').src=article.urlToImage;
    cardClone.querySelector('.news-title').innerHTML=article.title;
    cardClone.querySelector('.news-source').innerHTML=article.source.name;
    cardClone.querySelector('.news-description').innerHTML=article.description
    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,'blank')
    })
}
function navItemClick(id)
{
    fetchNews(id)
}
document.querySelector('.search-button').addEventListener('click',()=>{
   fetchNews(document.querySelector('.news-input').value)
})

const requisicao_xhr = new XMLHttpRequest();

requisicao_xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');

const templatePost =  document.getElementById('templatePost');
const listaPosts = document.getElementById('listaPosts');

requisicao_xhr.onload = function () {
  if (requisicao_xhr.status >= 200 && requisicao_xhr.status < 300) {
    const posts = JSON.parse(requisicao_xhr.responseText);
      

    posts.forEach(function (posts) {
      const card = templatePost.content.cloneNode(true);
      card.querySelector('.post-titulo').textContent = posts.title
      card.querySelector('.post-conteudo').textContent = posts.body
      listaPosts.appendChild(card);
            
    });

    
  }
};

requisicao_xhr.send();





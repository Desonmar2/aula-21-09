const requisicao_xhr = new XMLHttpRequest();

requisicao_xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');


requisicao_xhr.onload = function () {
  if (requisicao_xhr.status >= 200 && requisicao_xhr.status < 300) {
    const posts = JSON.parse(requisicao_xhr.responseText);
    console.log(posts);
  }
};

requisicao_xhr.send();







const templatePost =  document.getElementById('templatePost');
const listaPosts = document.getElementById('listaPosts');
const mensagemLista = document.getElementById('mensagemLista');
const btnAtualizar = document.getElementById('btnAtualizar');
const formNovoPost = document.getElementById('formNovoPost');
const tituloPost = document.getElementById('tituloPost');
const conteudoPost = document.getElementById('conteudoPost');
const mensagemStatus = document.getElementById('mensagemStatus');





      function add_posts_tela (post){
       
       const card = templatePost.content.cloneNode(true);
       const item = card.querySelector('.post-item');
        
        item.dataset.id = post.id;

        card.querySelector('.post-titulo').textContent = post.title
        card.querySelector('.post-conteudo').textContent = post.body

      
        listaPosts.appendChild(card); 
      }

     function carregarPosts () { 
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');

      mensagemLista.textContent = 'Carregando posts...';
      listaPosts.innerHTML = '';
 
      xhr.onload = function (){ 
        if (xhr.status >= 200 && xhr.status < 300) {
         const posts = JSON.parse(xhr.responseText);
         mensagemLista.textContent = '';

          posts.forEach(function (post) {
           add_posts_tela(post)
           });

        } else {
               mensagemLista.textContent = 'Erro ao carregar os posts.';
             }
      };

      xhr.send();
  
     }


   btnAtualizar.addEventListener('click', carregarPosts);
   carregarPosts();




     formNovoPost.addEventListener('submit', function (evento) {
        evento.preventDefault();
          const novoPost = {
           title: tituloPost.value,
           body: conteudoPost.value,
           userId: 1
          };
 
        const xhr = new XMLHttpRequest();     
        xhr.open('POST', 'https://jsonplaceholder.typicode.com/posts');
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function () {
          if (xhr.status >= 200 && xhr.status < 300) {
           const postCriado = JSON.parse(xhr.responseText);
           add_posts_tela(postCriado);
           
           formNovoPost.reset();
           mensagemStatus.textContent = 'Post publicado com sucesso!';
          }  
           else {mensagemStatus.textContent = 'Erro ao publicar o post.';
           }
        };

      
        xhr.send(JSON.stringify(novoPost));

      });


      listaPosts.addEventListener('click', function (evento) {
       const cliqueFoiNoBotaoExcluir = evento.target.classList.contains('btn-excluir')
        if (cliqueFoiNoBotaoExcluir) {
           const item = evento.target.closest('.post-item');
           const idPost = item.dataset.id;
           const xhr = new XMLHttpRequest();
           xhr.open('DELETE', 'https://jsonplaceholder.typicode.com/posts/' + idPost)
          
           xhr.onload = function () {
           if (xhr.status >= 200 && xhr.status < 300) {
            item.remove();
            mensagemStatus.textContent = 'Post excluído.'
            } else {
                    mensagemStatus.textContent = 'Erro ao excluir o post.';
               }  
            };

            xhr.send();
        
        }
      })
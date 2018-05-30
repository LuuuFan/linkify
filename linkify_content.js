document.addEventListener("DOMContentLoaded", function(){
  const body = document.querySelector('body');
  convertLink(body);
  
  const form = document.querySelector("#blog-input");
  form.addEventListener('submit', function(e){
    e.preventDefault();
    submitForm();
  });

  form.addEventListener('keypress', function(){
    const hint = document.querySelector('.hint');
    if (hint.classList.length < 2) {
      hint.classList.add('hide');
    }
  });
  
  document.addEventListener('DOMNodeInserted', function(e){
    convertLink(e.relatedNode);
  });
});


const convertLink = (el) => {
  if (el.childNodes.length === 1 && el.childNodes[0].nodeType === 3) {
    el.innerHTML = replaceLink(el.innerHTML);
  } else if (el.nodeType === 3 && el.nodeValue.trim()){
    const span = document.createElement('span');
    span.innerHTML = replaceLink(el.nodeValue);
    el.parentElement.replaceChild(span, el);
  } else {
    el.childNodes.forEach(node => {
      convertLink(node);
    });
  }
};


const replaceLink = (text) => {
  const regex = /(^|[^@\w])@(\w{1,15})\b/g;
  const replace = '$1<a href="https://twitter.com/$2" target="_blank">@$2</a>';
  return text.replace(regex, replace);  
  // const handlerList = text.match(regex);
  // if (handlerList && handlerList.length){
  //   handlerList.forEach(handler => {
          // const link = 'https://twitter.com/users/username_available?context=signup&custom=true&email=&full_name=&suggest=1&suggest_on_username=true&username=';
  //     if (checkLink(`${link}${handler.trim().slice(1)}`)) {
  //       const replace = '$1<a href="https://twitter.com/$2" target="_blank">@$2</a>';
  //       text.replace(handler, replace);
  //     }
  //   });
  // } 
  // return text;
};

const checkLink = (url) => {
  const request = new Request(url);
  fetch(request)
    .then((res)=>{
      debugger
    })
    .catch((err)=>{
      debugger
    });  
};

const submitForm = () => {
  const text = document.querySelector("textarea");
  if (text.value) {
    appendBlog(text.value);
    text.value = "";
  } else {
    const hint = document.querySelector('.hint');
    hint.classList.remove('hide');
  }
}; 

const appendBlog = (text) => {
  const blog = document.querySelector(".blog-container");
  const newBlog = document.createElement('div');
  newBlog.innerHTML = text;
  blog.prepend(newBlog);
};

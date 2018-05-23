document.addEventListener("DOMContentLoaded", function(){
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
});

const submitForm = () => {
  const text = document.querySelector("textarea");
  if (text.value) {
    const output = replaceLink(text.value);
    appendBlog(output);
    text.value = "";
  } else {
    const hint = document.querySelector('.hint');
    hint.classList.remove('hide');
  }
};


const replaceLink = (text) => {
  const regex = /(^|[^@\w])@(\w{1,15})\b/g;
  const replace = '$1<a href="http://twitter.com/$2" target="_blank">@$2</a>';
  return text.replace(regex, replace);
};

const appendBlog = (text) => {
  const blog = document.querySelector(".blog-container");
  const newBlog = document.createElement('p');
  newBlog.innerHTML = text;
  blog.prepend(newBlog);
};

const removeHint = () => {
  const hint = document.querySelector('.hint');
  hint.classList.add('hide');
};

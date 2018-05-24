document.addEventListener("DOMContentLoaded", function(){
  const mainDiv = document.querySelector('.main div');
  convertLink(mainDiv);
});

const convertLink = (el) => {
  if (el.childNodes.length === 1 && el.childNodes[0].nodeType === 3) {
    el.innerHTML = replaceLink(el.innerHTML);
  } else if (el.nodeType === 3 && el.nodeValue.trim()){
    const div = document.createElement('p');
    div.innerHTML = replaceLink(el.nodeValue);
    el.parentElement.replaceChild(div, el);
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
};
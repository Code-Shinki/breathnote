(function(){var g="theme";var d="dark";function c(){var j=document.getElementsByTagName("html")[0];j.classList.add(d)}var h="(prefers-color-scheme: dark)";var f=window.matchMedia(h);var a=f.media===h;var e=null;try{e=localStorage.getItem(g)}catch(b){}var i=e!==null;if(i){if(e===d){c()}}else{if(a){c();localStorage.setItem(g,d)}}})();
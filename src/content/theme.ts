// Aplica só a escolha manual salva; sem ela, o CSS segue o tema do aparelho.
export const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}})()`;

const puppeteer = require('puppeteer');


(async () => {
  const browser = await puppeteer.launch(); 

  /* Use o código abaixo dentro de  .launch() para que abra a aba para ver o processo
     Sem esse código o bot rodará as instruções no background
  {headless: false, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'} 
   */


  const page = await browser.newPage();
  await page.goto('https://<numero da sua instancia>.service-now.com/login'); // atentar ao <numero da sua instancia>  e substituir a que irá usar

  await page.type('#user_name', username ) //Substitua username por seu user ou email de login
  await page.type('#user_password', password) //Substitua password por sua senha de login

  await Promise.all([
    page.waitForNavigation(), // promise resolve quando navigation finaliza
    page.click('#sysverb_login') // clicar no link causa uma navigation indireta
  ]);

  await page.screenshot({path: 'confirmation/anything.png'}); //path e nome da screenshot

  console.log('Bot has finalized'); // adicione qualquer mensagem para saber quando a ação for finalizada

  await browser.close();
})();
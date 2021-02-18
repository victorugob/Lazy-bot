const puppeteer = require('puppeteer');

function delay(time) {
  return new Promise(function(resolve) {
    setTimeout(resolve, time)
  });
}

(async () => {
  const browser = await puppeteer.launch( {headless: false} ); 
  

  /* Use o código abaixo dentro de  .launch() para que abra a aba para ver o processo
     Sem esse código o bot rodará as instruções no background
  {headless: false, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'} 
   */


  const page = await browser.newPage();
  await page.goto('https://yourinstance.service-now.com/login'); // atentar ao <numero da sua instancia>  e substituir a que irá usar
  
  // Validate if instance is sleeping, if so, login to wake
  if(await (await page.$$('.instance-hibernating-page')).length > 0) {
    console.log('Instance is sleeping, Bot will redirect and wake your stance')
    await page.goto('https://developer.service-now.com/login')
    await page.type('#username', email)
    await page.click('#usernameSubmitButton') 
    await delay(2000)
    await page.type('#password', password);

    await Promise.all([
      page.waitForNavigation(), 
      page.click('#submitButton')
    ]);
    console.log('Bot awakaned your instance, please wait a few minutes');
  } 
  console.log('Your stance is not sleeping')
  await page.type('#user_name', username ) //Substitua username por seu user ou email de login
  await page.type('#user_password', password ) //Substitua password por sua senha de login

  await Promise.all([
    page.waitForNavigation(), // promise resolve quando navigation finaliza
    page.click('#sysverb_login') // clicar no link causa uma navigation indireta
  ]);

  //await page.screenshot({path: 'confirmation/anything.png'}); //path e nome da screenshot

  console.log('Bot has finalized'); // adicione qualquer mensagem para saber quando a ação for finalizada

  await browser.close();
})();

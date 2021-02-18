const puppeteer = require('puppeteer');
// Change const's value accordingly
const username = "username";
const password = "password";
const devEmail = "email@email.com";
const emailPw = "emailpw";
const myInstance = "";
const instance = "https://" + myInstance + ".service-now.com/login";

function delay(time) {
  return new Promise(function(resolve) {
    setTimeout(resolve, time)
  });
}

(async () => {
  const browser = await puppeteer.launch(); 
  

  /* Use o código abaixo dentro de  .launch() para que abra a aba para ver o processo
     Sem esse código o bot rodará as instruções no background
  {headless: false, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'} 
  ou
  { headless: false, defaultViewport: null, args: [
    '--window-size=1360,768',
  ] } 
   */


  const page = await browser.newPage();
  await page.goto(instance); // atentar ao <numero da sua instancia>  e substituir a que irá usar
  
  // Validate if instance is sleeping, if so, login to wake
  if(await (await page.$$('.instance-hibernating-page')).length > 0) {
    console.log('Instance is sleeping, Bot will redirect and wake your stance')
    await page.goto('https://developer.service-now.com/login')
    await page.type('#username', devEmail)
    await page.click('#usernameSubmitButton') 
    await delay(2000)
    await page.type('#password', emailPw);

    await Promise.all([
      page.waitForNavigation(), 
      page.click('#submitButton')
    ]);

    console.log('Bot awakaned your instance, please wait a few minutes');
  } console.log('Your stance is not sleeping')

  await page.type('#user_name', username ) 
  await page.type('#user_password', password) 

  await Promise.all([
    page.waitForNavigation(), 
    page.click('#sysverb_login') 
  ]);

  //await page.screenshot({path: 'confirmation/anything.png'}); 

  console.log('Bot has finalized'); //

  await browser.close();
  
})();

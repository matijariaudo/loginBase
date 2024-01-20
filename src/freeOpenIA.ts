import puppeteer from "puppeteer";
import * as dotenv from 'dotenv';
dotenv.config();

export const FreeiA=async (search:string) => {
    let puconfig;
    if(process.env.PRODUCCION!="false"){
    puconfig={
        executablePath: '/usr/bin/google-chrome', // Esto puede variar según la configuración específica de Render
        headless:true
      }
    }else{
    puconfig={
        headless:true
        }
    }
    console.log(puconfig)
    const browser = await puppeteer.launch(puconfig);
	const page = await browser.newPage();
     // Set the viewport's width and height
    await page.setViewport({ width: 600, height: 400 });
	await page.goto('https://openchat.team/en');
	//const element = await page.waitForSelector('textarea');
    await page.waitForSelector('textarea.m-0');
    // Escribir texto en el textarea
    const solicitud=search
    await page.type('textarea.m-0', solicitud);
        
    const textareaElement:any = await page.$('textarea.m-0');

    // Encontrar el elemento padre del textarea
    const parentElementFinded:any = await textareaElement.$x('..'); // Obtener el elemento padre
  
    // Buscar el botón entre los hijos del elemento padre del textarea
    const buttonSend:any = await parentElementFinded[0].$$('button'); // Buscar el botón entre los hijos
    
    // Hacer clic en el botón encontrado
    await buttonSend[1].click();
    let stretchButtonText:any = ""
    let encontrado=false;
    let groupElements:any;
    let secondGroupText="";
    let groupSelectors = '.group';
    while(!encontrado){
        groupSelectors = '.group';
        groupElements = await page.$$(groupSelectors);
        if (groupElements.length >= 2) {
            await page.waitForSelector(`${groupSelectors}:nth-child(2)`, { visible: true });
            secondGroupText = await page.evaluate(element => element.innerText, groupElements[1]);
            stretchButtonText = await page.$eval('.stretch button:nth-of-type(1)', element => element.textContent);
            if(stretchButtonText.trim()!="Stop Generating" && stretchButtonText!=""){
            encontrado=true;
            }
        }    
    }
    browser.close()
    return secondGroupText;

}
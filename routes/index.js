var express = require('express');
var router = express.Router();

// puppeteer를 가져온다.
// const puppeteer = require('puppeteer');
// cheerio를 가져온다.
const cheerio = require('cheerio');



import puppeteer from 'puppeteer';
const chromium = require('chrome-aws-lambda');



// fetch모듈 가져오기기
// import fetch from 'node-fetch';
const fetch = require("node-fetch")


const priceScraper = async() => {
        
    const dataset = [
        "AAPL", "ABNB", "ADBE", "ADI", "ADP", "ADSK", "AEP", "ALGN", "AMAT", "AMD",
        "AMGN", "AMZN", "ANSS", "ASML","ATVI","AVGO", "AZN", "BIIB", "BKNG", "BKR",
        "CDNS",  "CEG", "CHTR","CMCSA","COST","CPRT","CRWD", "CSCO", "CSGP", "CSX",
        "CTAS", "CTSH", "DDOG", "DLTR","DXCM", "EA", "EBAY", "ENPH",  "EXC","FANG",
        "FAST", "FISV", "FTNT",  "GFS","GILD","GOOG","GOOGL", "HON", "IDXX","ILMN",
        "INTC", "INTU","ISRG","JD","KDP","KHC","KLAC","LCID","LRCX","LULU","MAR",
        "MCHP","MDLZ","MELI","META","MNST", "MRNA","MRVL","MSFT","MU","NFLX","NVDA",
        "NXPI","ODFL","ORLY","PANW","PAYX","PCAR","PDD","PEP","PYPL","QCOM","REGN",
        "RIVN","ROST","SBUX","SGEN","SIRI","SNPS","TEAM","TMUS","TSLA","TXN","VRSK",
        "VRTX","WBA","WBD","WDAY", "XEL","ZM", "ZS"
        ]

    // Price 가져오기
    const getCheerioPrice = (data) => {
        const content = data
        const $ = cheerio.load(content);
        const lists = $("body > div#root > div#content").children("div");
        const data_list = lists.children("div").children("div")

        let price;
        data_list.each((index, list) => {
            if(index == 0){
                price = $(list).find("strong").text()
            }
        })
        return price
    }

    // 값넣어주기
    const createPrice = async(name, current) => {
        const ticker = name
        const price = current
        await fetch('https://port-0-alltu-toza-6g2llfxqu2r0.sel3.cloudtype.app/stock', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ticker: `${ticker}`, price: `${price}` }),
        });
        return {"ticker" : ticker, "status" : "ok"}
    }

    //browser open
    const browser = await puppeteer.launch({
    headless: true,
    executablePath: await chromium.executablePath,
    args: chromium.args,
    headless: chromium.headless
    });

    //page open
    const page = await browser.newPage();
    


    // price를 못가져오면 다시 요청보내서 가져오기
    for(let i=0; i< dataset.length; i++){
        const ticker = dataset[i]
        const input = ticker
        let resultPrice

        await page.goto(`https://m.stock.naver.com/worldstock/stock/${input}.O/total`);
        const contents = await page.content();

        resultPrice = getCheerioPrice(contents)
        
        while(resultPrice == undefined){
            await page.goto(`https://m.stock.naver.com/worldstock/stock/${input}.O/total`);
            const reContents = await page.content();
            resultPrice = getCheerioPrice(reContents)
            }
        const currentPrice = resultPrice.slice(0,-3)

        await createPrice(input, currentPrice).then(console.log)
    }
    browser.close();
}

  
  
  
  
  /* GET home page. */
  router.get('/', async(req, res, next) => {
    res.send('생성되었습니다.');
    await priceScraper()

  });
  
  module.exports = router;

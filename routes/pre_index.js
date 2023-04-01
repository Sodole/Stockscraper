// var express = require('express');
// var router = express.Router();

// // puppeteer을 가져온다.
// const puppeteer = require('puppeteer');
// // cheerio를 가져온다.
// const cheerio = require('cheerio');


// const dataset = [
//   "AAPL",
//   "ABNB",
//   "ADBE",
//   "ADI",
//   "ADP",
//   "ADSK",
//   "AEP",
//   "ALGN",
//   "AMAT",
//   "AMD",
//   "AMGN",
//   "AMZN",
//   "ANSS",
//   "ASML",
//   "ATVI",
//   "AVGO",
//   "AZN",
//   "BIIB",
//   "BKNG",
//   "BKR",
//   "CDNS",
//   "CEG",
//   "CHTR",
//   "CMCSA",
//   "COST",
//   "CPRT",
//   "CRWD",
//   "CSCO",
//   "CSGP",
//   "CSX",
//   "CTAS",
//   "CTSH",
//   "DDOG",
//   "DLTR",
//   "DXCM",
//   "EA",
//   "EBAY",
//   "ENPH",
//   "EXC",
//   "FANG",
//   "FAST",
//   "FISV",
//   "FTNT",
//   "GFS",
//   "GILD",
//   "GOOG",
//   "GOOGL",
//   "HON",
//   "IDXX",
//   "ILMN",
//   "INTC",
//   "INTU",
//   "ISRG",
//   "JD",
//   "KDP",
//   "KHC",
//   "KLAC",
//   "LCID",
//   "LRCX",
//   "LULU",
//   "MAR",
//   "MCHP",
//   "MDLZ",
//   "MELI",
//   "META",
//   "MNST",
//   "MRNA",
//   "MRVL",
//   "MSFT",
//   "MU",
//   "NFLX",
//   "NVDA",
//   "NXPI",
//   "ODFL",
//   "ORLY",
//   "PANW",
//   "PAYX",
//   "PCAR",
//   "PDD",
//   "PEP",
//   "PYPL",
//   "QCOM",
//   "REGN",
//   "RIVN",
//   "ROST",
//   "SBUX",
//   "SGEN",
//   "SIRI",
//   "SNPS",
//   "TEAM",
//   "TMUS",
//   "TSLA",
//   "TXN",
//   "VRSK",
//   "VRTX",
//   "WBA",
//   "WBD",
//   "WDAY",
//   "XEL",
//   "ZM",
//   "ZS"
//   ]


// const scraper = async(ticker) => {
//   const input = ticker
//   const browser = await puppeteer.launch({
//       headless: true
//   });
//   const page = await browser.newPage();



//   await page.goto(`https://m.stock.naver.com/worldstock/stock/${input}.O/total`);
//   const contents = await page.content();
//   const getCheerio = (data)=> {
//     const content = data
//     const $ = cheerio.load(content);
//     const lists = $("body > div#root > div#content").children("div");
//     const data_list = lists.children("div").children("div")
    
//     let price;
    
//     data_list.each((index, list) => {
//         if(index == 0){
//             price = $(list).find("strong").text()
//         }
//       })
//     return price
//     }
//   let resultCheerio = getCheerio(contents)
//   while(resultCheerio == undefined){
//     await page.goto(`https://m.stock.naver.com/worldstock/stock/${input}.O/total`);
//     const reContents = await page.content();
//     resultCheerio = getCheerio(reContents)
//   }

//   browser.close();
//   return {"ticker" : input, "price" : resultCheerio}    
// }



// const getdata = async() => {
//     for(let i=0; i<dataset.length; i++){
//         const data = dataset[i]
//         const resultSet = await scraper(data)
//         console.log(resultSet)
//     }
// }




// /* GET home page. */
// router.get('/', async(req, res, next) => {
//   await getdata()
//   res.send('생성되었습니다.');
// });

// module.exports = router;

const unirest = require('unirest');
const cheerio = require('cheerio');

function hhVac(){
	unirest
	  .get('https://spb.hh.ru/search/vacancy?L_is_autosearch=false&area=2&clusters=true&enable_snippets=true&text=Frontend+%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%87%D0%B8%D0%BA&page=0')
	  .then((res) => {
	    const body = res.body;
	    const $ = cheerio.load(body);
	    let countPages = 0;
	    //console.log($('.bloko-button-group>.bloko-button').text());

	    let pagList = [];
	    $('.bloko-button').each(function(i, elem) {
		  pagList[i] = $(this).text();
		});
		pagList.join(', ');

		if(pagList[pagList.length - 1] == 'дальше'){
			countPages = pagList[pagList.length - 2];
		}else{
			countPages = pagList[pagList.length - 1];
		}
	    
	    console.log('countPages', countPages);

	    while(countPages >= 0){
	    	unirest
	  		.get('https://spb.hh.ru/search/vacancy?L_is_autosearch=false&area=2&clusters=true&enable_snippets=true&text=Frontend+%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%87%D0%B8%D0%BA&page='+countPages)
	  		.then((res) => {
			    const body = res.body;
			    const $ = cheerio.load(body);
			       let vacancyList = [];
				    $('.bloko-link.HH-LinkModifier').each(function(i, elem) {
					  vacancyList[i] = $(this).text();
					});
					vacancyList.join(', ');
				    console.log(vacancyList);
			});
	  		countPages--;
	    }
	});
};

hhVac();

















// vacancy-serp
// https://spb.hh.ru/search/vacancy?L_is_autosearch=false&area=2&clusters=true&enable_snippets=true&text=Frontend+%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%87%D0%B8%D0%BA&page=0

// function countPage(){

// 	return unirest
// 	  .get('https://spb.hh.ru/search/vacancy?L_is_autosearch=false&area=2&clusters=true&enable_snippets=true&text=Frontend+%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%87%D0%B8%D0%BA&page=0')
// 	  .json;
	
// 	//   .then((response) => {
// 	//     const body = response.body;
// 	//     const $ = cheerio.load(body);

// 	//     //console.log($('.bloko-button-group>.bloko-button').text());

// 	//     let pagList = [];
// 	//     $('.bloko-button').each(function(i, elem) {
// 	// 	  pagList[i] = $(this).text();
// 	// 	});
// 	// 	pagList.join(', ');

// 	// 	if(pagList[pagList.length - 1] == 'дальше'){
// 	// 		// console.log(pagList[pagList.length - 2]);
// 	// 		return pagList[pagList.length - 2];
// 	// 	}else{
// 	// 		// console.log(pagList[pagList.length - 1]);
// 	// 		return pagList[pagList.length - 1];
// 	// 	}
	    
// 	// });

// };

// console.log('count', countPage());


// // unirest
// //   .get('https://spb.hh.ru/search/vacancy?L_is_autosearch=false&area=2&clusters=true&enable_snippets=true&text=Frontend+%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%87%D0%B8%D0%BA&page=' + i)
// //   .then((response) => {
// //     // console.log(response.body);
// //     const body = response.body;
// //     const $ = cheerio.load(body);

// //     if($('.bloko-link.HH-LinkModifier').text()){
// // 		console.log(i);
// //     }else{
// //     	flag = true;
// //     }
// // });

// // let co = countPage();
// //console.log(co);

// // unirest
// //   .get('https://spb.hh.ru/search/vacancy?L_is_autosearch=false&area=2&clusters=true&enable_snippets=true&text=Frontend+%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%87%D0%B8%D0%BA&page=31')
// //   .then((response) => {
// //     // console.log(response.body);
// //     const body = response.body;
// //     const $ = cheerio.load(body);

// //     if($('.bloko-link.HH-LinkModifier').text()){
// // 		console.log('yes');
// //     }else{
// //     	console.log('no');
// //     	//flag = true;
// //     }

// //     //console.log('flag', flag);
    
// //  //    let vacancyList = [];
// //  //    $('.bloko-link.HH-LinkModifier').each(function(i, elem) {
// // 	//   vacancyList[i] = $(this).text();
// // 	// });
// // 	// vacancyList.join(', ');
// //  //    console.log(vacancyList);
// //   });
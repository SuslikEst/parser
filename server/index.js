const unirest = require('unirest');
const cheerio = require('cheerio');

async function hhVac(){

	await unirest
	  .get('https://spb.hh.ru/search/vacancy?L_is_autosearch=false&area=2&clusters=true&enable_snippets=true&text=Frontend+%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%87%D0%B8%D0%BA&page=0')
	  .then(async (res) => {
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
	    	
		    
		let vacancyList = [];

	    while(countPages >= 0){

		   	await unirest
		  		.get('https://spb.hh.ru/search/vacancy?L_is_autosearch=false&area=2&clusters=true&enable_snippets=true&text=Frontend+%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%87%D0%B8%D0%BA&page='+countPages)
		  		.then((res) => {
				    const body = res.body;
				    const $ = cheerio.load(body);
				       
				    $('.bloko-link.HH-LinkModifier').each(function(i, elem) {
					  vacancyList.push($(this).text());
					  //console.log('elem', $(this).text());
					});
						//vacancyList.join(', ');
					    // console.log(vacancyList);
				});

		  		countPages--;
	    }
	    // setTimeout(()=>{
	    // 	console.log(vacancyList);
	    // }, 4000)
	    console.log(vacancyList);
		    
	    
	});

};

hhVac();

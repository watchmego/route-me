import { globalConfig } from '../../../g-Config';

export async function getAddress(address) {
    const uri = encodeURIComponent(address);
    console.log(uri);
    const query = new URLSearchParams({
      q: uri,
    //   locale: 'en',
    //   limit: '5',
    //   reverse: 'false',
    //   debug: 'false',
    //   point: 'string',
     // provider: 'gisgraphy',
      countrycode: 'NZ',
      autocomplete: 'true',
    //  address_only: 1,
    //  abbrv: 1,
      key: globalConfig.GH_API
    }).toString();
  
    const resp = await fetch(`https://graphhopper.com/api/1/geocode?${query}`, {
     //   mode: 'no-cors'
    });
    return resp.json();
    
    //return resp.text();
    // const data = await resp.text();
    // console.log(data);
  }
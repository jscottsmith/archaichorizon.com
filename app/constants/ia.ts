// Internet Archive API

export const IA = {
  collection: {
    baseUrl: `https://archive.org/advancedsearch.php?q=collection:"archaichorizon"&fl[]=cat_no&fl[]=creator&fl[]=title&fl[]=date&fl[]=description&fl[]=downloads&fl[]=identifier&fl[]=licenseurl&fl[]=subject&rows=100&page=1&output=json&sort[]=date+asc"`,
  },
  images: {
    baseUrl: `https://archive.org/services/img`,
    url: `https://archive.org/services/img/{identifier}`,
  },
  metadata: {
    baseUrl: `https://archive.org/metadata`,
    url: `https://archive.org/metadata/{identifier}`,
  },
  serve: {
    baseUrl: `https://archive.org/serve`,
    url: `https://archive.org/serve/{identifier}/{filename}`,
  },
};

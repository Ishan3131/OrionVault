export default async function handler(req,res) {
    const allowedSite = 'orion-vault-two.vercel.app';
    if(req.headers.host !== allowedSite) {
        console.log('fake url: '+req.headers.host);
        return res.status(403).json({error: 'Forbidden'})
    }
    try{
        console.log('try')
        const apiKey = process.env.API_KEY
        console.log(apiKey)
        const endpoint = req.query.endpoint || '';
        const queries = req.query.queries || '';
        console.log('https://api.rawg.io/api/'+endpoint+'?key='+apiKey+queries)
        const resp = await fetch('https://api.rawg.io/api/'+endpoint+'?key='+apiKey+queries);
        const data = await resp.json();
        res.status(200).json(data)
    }
    catch (err) {
        res.status(500).json({error: 'Failed to fetch'});
    }
}
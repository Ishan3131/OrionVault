export default async function handler(req,res) {
    // const allowedSite = 'orion-vault-two.vercel.app';
    const allowedSite = 'localhost:3000'
    if(req.headers.host !== allowedSite) {
        return res.status(403).json({error: 'Forbidden'})
    }
    try{
        const apiKey = process.env.API_KEY
        const endpoint = req.query.endpoint || '';
        const queries = req.query.queries || '';
        const resp = await fetch('https://api.rawg.io/api/'+endpoint+'?key='+apiKey+queries);
        const data = await resp.json();
        if('next' in data) delete data.next;
        res.status(200).json(data)
    }
    catch (err) {
        res.status(500).json({error: 'Failed to fetch'});
    }
}
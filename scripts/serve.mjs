import {createServer} from 'node:http';
import {createReadStream, existsSync, statSync} from 'node:fs';
import {resolve,extname,sep,join} from 'node:path';

const root=resolve('out');
const prefix=process.env.NEXT_PUBLIC_BASE_PATH||'';
const port=Number(process.env.PORT||4173);
if(!existsSync(join(root,'index.html'))) throw new Error('Exécutez npm run build avant npm run preview.');
const types={'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.txt':'text/plain; charset=utf-8','.xml':'application/xml; charset=utf-8','.ico':'image/x-icon','.png':'image/png','.woff2':'font/woff2'};
const server=createServer((request,response)=>{
 if(request.method!=='GET'&&request.method!=='HEAD'){response.writeHead(405,{Allow:'GET, HEAD'}).end();return;}
 let path;
 try{path=decodeURIComponent(new URL(request.url,'http://localhost').pathname);}
 catch{response.writeHead(400).end();return;}
 const validPrefix=path===prefix||path.startsWith(prefix+'/');
 let file=resolve(root,'.'+path.slice(prefix.length));
 const within=file===root||file.startsWith(root+sep);
 if(!within||!validPrefix||path.includes('\\')||path.includes('\0')){response.writeHead(404).end();return;}
 if(existsSync(file)&&statSync(file).isDirectory()) file=join(file,'index.html');
 const found=existsSync(file)&&statSync(file).isFile();
 if(!found) file=join(root,'404.html');
 if(!existsSync(file)){response.writeHead(404).end();return;}
 response.writeHead(found?200:404,{'Content-Type':types[extname(file)]||'application/octet-stream'});
 if(request.method==='HEAD') response.end();
 else createReadStream(file).pipe(response);
});
server.listen(port,'127.0.0.1',()=>console.log('http://127.0.0.1:'+port+prefix+'/'));

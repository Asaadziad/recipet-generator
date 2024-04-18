const http = require('http')
const fs = require('fs')
const path = require('path')

class Server {
	constructor() {
		this.port = 0
		this.server = null  
		this.methods = []
	}	
	get(path, callback) {
		this.methods.push({
			path: path,
			callback: callback,
		})
	}
	callback(req, res, methods) {	
		for(let i = 0 ; i < methods.length; i++){
			if (req.url == methods[i].path) {
				methods[i].callback(req, res)
			}
			if (req.url.split(".")[1] == 'js') {
				
				fs.readFile(path.join(__dirname, req.url), (err, data) => {
					if (err) {
						res.writeHead(500);
						return res.end('Error loading script.js');
					}
					
					res.end(data);
				});
			}
		}
	}	
	listen(port) {
		this.server = http.createServer((req,res) => this.callback(req,res, this.methods))
		this.port = port
		this.server.listen(port, () => {console.log(`server is listeining on port ${port}`)}) 
	}	

}
const server = new Server()


server.get('/', (req, res) => {
	fs.readFile('index.html',(err,data) => {
		if (err) {
			console.log(err)
		}
		res.end(data)	
	})	
})


server.get('/add', (req, res) => {
	if(req.method == 'POST') {
		req.body = ''	
		req.on('data', (chunk) => {
			req.body += chunk.toString()
		})	
		req.on('end', () => {
			console.log(body)	
		})
	}	
    res.writeHead(200, {'Content-Type': 'application/json'})
	res.end(JSON.stringify({message: "User has been created"}))
})

server.listen(8080)




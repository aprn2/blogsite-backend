HOST='localhost'
PORT=3000
SILENT=
ORIGIN='Origin: http://localhost:5173'
SHOW_HEADER=-i
TOKEN='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RVc2VyMDMiLCJpYXQiOjE3NTQyMzM5NDQsImV4cCI6MTc1NDIzOTk0NH0.nvGAExZd6u6yUWwEUhe71XgQP9aa7oehXiJdwTMQptY'

createUser() {
	curl $SHOW_HEADER $SILENT -H "$ORIGIN" -H 'Content-Type: application/json' -X POST \
		http://${HOST}:${PORT}/user \
		-d '{
			"name": "testUser005",
			"userName": "testUser005",
			"password": "Hello1!.",
			"dob": "2000-02-12T04:35:10.227Z",
			"email": "hello@hello.com",
			"address": "hello street, bye, bye bye good"
		}'
}

getUser() {
	curl $SHOW_HEADER $SILENT -H "$ORIGIN" \
		--oauth2-bearer "$TOKEN" \
		http://${HOST}:${PORT}/user/testUser001
}

getAccessToken() {
	curl $SHOW_HEADER $SILENT -H "$ORIGIN" \
		http://${HOST}:${PORT}/token
}


createImage() {
	curl $SILENT $SHOW_HEADER  -H "$ORIGIN" \
		--oauth2-bearer "$TOKEN" \
		http://${HOST}:${PORT}/image \
		-F \
		image=@i.png
}
getImage() {
	curl $SHOW_HEADER $SILENT -H "$ORIGIN" \
		--oauth2-bearer "$TOKEN" \
		http://${HOST}:${PORT}/image/1754233984497-80a6c8c8.png \
		-o received
}
login() {
	curl $SHOW_HEADER $SILENT -H "$ORIGIN" -H 'Content-Type: application/json' -X POST \
		http://${HOST}:${PORT}/auth/login \
		-d '{
			"userName": "testUser003",
			"password": "Hello1!.",
			"remember": "true"
		}'
}


#createUser
#getUser
#createImage
#getImage
#login
getAccessToken

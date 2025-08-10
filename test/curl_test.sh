HOST='localhost'
PORT=3000
SILENT=
SHOW_HEADER=-i
TOKEN='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RVc2VyMDMiLCJpYXQiOjE3NTQyMzM5NDQsImV4cCI6MTc1NDIzOTk0NH0.nvGAExZd6u6yUWwEUhe71XgQP9aa7oehXiJdwTMQptY'

createUser() {
	curl $SHOW_HEADER $SILENT -H 'Content-Type: application/json' -X POST \
		http://${HOST}:${PORT}/user \
		-d '{
			"name": "testUser03",
			"userName": "testUser03",
			"password": "sexHaver001$",
			"dob": "2000-02-12T04:35:10.227Z",
			"email": "lickcoochie@kdf.co",
			"address": "fuck street, suck city"
		}'
}
getUser() {
	curl $SHOW_HEADER $SILENT \
		--oauth2-bearer "$TOKEN" \
		http://${HOST}:${PORT}/user/testUser03
}

createImage() {
	curl $SILENT $SHOW_HEADER \
		--oauth2-bearer "$TOKEN" \
		http://${HOST}:${PORT}/image \
		-F \
		image=@i.png
}
getImage() {
	curl $SHOW_HEADER $SILENT \
		--oauth2-bearer "$TOKEN" \
		http://${HOST}:${PORT}/image/1754233984497-80a6c8c8.png \
		-o received
}
login() {
	curl $SHOW_HEADER $SILENT -H 'Content-Type: application/json' -X POST \
		http://${HOST}:${PORT}/auth/login \
		-d '{
			"userName": "testUser03",
			"password": "sexHaver001$",
			"remember": "true"
		}'
}


#createUser
#getUser
#createImage
#getImage
login

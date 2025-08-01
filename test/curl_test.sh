HOST='localhost'
PORT=3000
SILENT=
SHOW_HEADER=-i
TOKEN='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RVc2VyMDIiLCJpYXQiOjE3NTE4MTk1MTUsImV4cCI6MTc1MTgyMDExNX0._tGmkwSFeq7z9oIuiEVwMT34O2MvmDNoTQj4mjiZqjE'

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
		http://${HOST}:${PORT}/user/fucker001
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
		http://${HOST}:${PORT}/image/7df714b24e53a8c948daf9254eb5496c
}
login() {
	curl $SHOW_HEADER $SILENT -H 'Content-Type: application/json' -X POST \
		http://${HOST}:${PORT}/auth/login \
		-d '{
			"userName": "testUser02",
			"password": "sexHaver001$",
			"remember": "true"
		}'
}


#createUser
getUser
#createImage
#getImage
#login

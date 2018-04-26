# kittens8press
simple blogging platform discuss about kittens, using express JS and VueJs.
Users can see list of article but only could post/edit/remove if users log in firts.

#Build set up to run kittens8press

##Server
```
npm install
npm start /nodemon start

```
##Client

```
npm install
npm run serve

```

#Routing

**Route** | **HTTP** | **Descrition**
----------|----------|---------------
/users/signup | POST | sign up user
/users/signin | GET | login user
/article | GET | Get all articles
/article/getone/:id | GET | get one articles data by article id
/article | POST | Add new article
/article/:id | PUT | Edit caption
/article/:id | DELETE | Remove a article
/article/category | GET | get articles by category

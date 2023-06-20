# Getting started
1. `git clone https://github.com/Teygeta/Project_Start2Impact_NodeJS.git`
2. run `npm i`
3. creates a MySQL database called `planty_of_food`
4. through the file `db_migrations.sql`, copy the contents and run the sql queries in the `planty_of_food` db
5. if you use Postman, use the `api_project.postman_collection.json` file to take advantage of the API calls already written or read the documentation below ("API DOC")
7. run `npm nodemon`
8. run an api call

# API DOC

- [PRODUCTS](#products)
- [USERS](#users)
- [ORDERS](#orders)
## PRODUCTS
### GET:

- Read the list of all products: `/products`
- Read a specific product in the list: `/products/<PRODUCT ID>`
     
### POST:

- Create a product: `/products` and body: 
``` 
{
    "product": "<PRODUCT NAME>"
}
```
### PUT:

- Update a product: `/products/<PRODUCT ID>` and body: 
``` 
{
    "product": "<PRODUCT NAME>"
}
```
### DELETE:

- Delete a product: `/products/<PRODUCT ID>`
  <br/><br/><br/>
## USERS 
### GET:

- Read the list of all users: `/users`
- Read a specific user in the list: `/users/<USER ID>`
     
### POST:

- Create a user: `/users` and body: 
``` 
{
    "name_user":"<USER NAME>",
    "surname_user":"<USER SURNAME>",
    "email_user":"<USER EMAIL>"
}
```
### PUT:

- Update a USER: `/users/<USER ID>` and body: 
``` 
{
    "name_user":"<USER NAME>",
    "surname_user":"<USER SURNAME>",
    "email_user":"<USER EMAIL>"
}
```
### DELETE:

- Delete a user: `/users/<USER ID>`
  <br/><br/><br/>
## ORDERS 
### GET:

- Read the list of all orders: `/orders`
- Read a specific order in the list: `/orders/<ORDER ID>`
     
### POST:

- Create a order: `/orders` and body: 
``` 
{
   "id_user": "<USER ID>"
}
```
### POST:

- Insert product inside a specific order: 
  
  `/orders/<ORDER ID>/add_products?id=<PRODUCT ID>&quantity=<QUANTITY>` 

  example:

  `/orders/3/add_products?id=3&quantity=5`

### PUT:

- Update a order: `/order/<ORDER ID>` and body: 
``` 
{
    "id_product":"<PRODUCT ID>",
    "quantity":"<QUANTITY>"
}
```
### DELETE:

- Delete a order: `/orders/<ORDER ID>`

### DELETE:

- Delete product inside a order: `/orders/<ORDER ID>/delete_products?id=<PRODUCT ID>`

     example:

     `/orders/4/delete_products?id=4`
<br/><br/><br/>

  

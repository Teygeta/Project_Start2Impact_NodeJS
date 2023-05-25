# API DOC
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

  

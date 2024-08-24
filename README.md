## Rest
*BASED_URL = 'localhost:8080/users'*

1. Create user: 
	method: **POST**
	route: `'/create'`
	body: `{firstName:string, lastName:string}`
------------
2.  Read all users 
	method: **GET**
	route: `'/get'`
	body: `NONE`
------------
3.  Read user 
	method: **GET**
	route: `'/get/:userId'`
	body: `NONE`
------------
4.  Update user 
	method: **PATCH**
	route: `'/update/:userId'`
	body: `{firstName:string, lastName:string}`
------------
5.  Delete user
	method: **DELETE**
	route: `'/delete/:userId'`
	body: `{firstName:string, lastName:string}`

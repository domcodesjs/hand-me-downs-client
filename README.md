# Hand Me Downs Client

[Link to Live Site](https://handmedowns-client.herokuapp.com/)

## Summary

Hand Me Downs is a ficticious marketplace where you can buy and sell used clothing. When a user creates an account they'll be able to buy and sell immediately. When your account is created you automatically get a shop setup at /shop/username where users can go to purchase items from you. When a user purchases an item(s) from you you'll see them under your orders. If you purchase an item(s) you'll see the purchase under your orders.

## Important Info

### Test Accounts

- email: testuser1@example.com pw: thinkful
- email: testuser2@example.com pw: thinkful
- email: testuser3@example.com pw: thinkful

### Test Credit Card

- Card #: 4242 4242 4242 4242
- Expiration: Anything after today.
- CVC: Any 3 digit number

## Technologies

The front end of Hand Me Downs uses React and Redux.

## Routes

### Public Routes

- **/** Landing page that displays the most recent listings
- **/search** Search results page
- **/login** Login page
- **/signup** Sign up page
- **/listings** View all listings
- **/shop/:username** View all listings of a specific user by username
- **/cart** View items you've added to the cart
- **/listing/:listingId** View details about a single listing
- **/404** Routed here when a page doesn't exist

### Authenticated Routes

- **/checkout** Checkout page
- **/your/listings/new** Create a new listing
- **/your/orders** View all of your orders
- **/your/order/:orderId** View details about a single order
- **/your/purchase/:purchaseId** View details about a single purchase
- **/your/listings** View all of your own listings
- **/your/purchases** View all of the purchases you've made
- **/your/listings/:listingId/edit** Edit a listing you've made

## How to Video

[![How to use Hand Me Down](http://img.youtube.com/vi/OQu32o0MFpQ/0.jpg)](http://www.youtube.com/watch?v=OQu32o0MFpQ 'How to use Hand Me Down')

## Screenshots

![Screenshot](https://i.postimg.cc/XYjhVcgf/Screenshot-1.png)
![Screenshot](https://i.postimg.cc/j5wmpx4B/Screenshot-2.png)
![Screenshot](https://i.postimg.cc/3N26wt6B/Screenshot-3.png)
![Screenshot](https://i.postimg.cc/qv1Fghm9/Screenshot-4.png)
![Screenshot](https://i.postimg.cc/gch140JZ/Screenshot-5.png)
![Screenshot](https://i.postimg.cc/nctgWtjw/Screenshot-6.png)
![Screenshot](https://i.postimg.cc/kXFz3hWM/Screenshot-7.png)
![Screenshot](https://i.postimg.cc/zff9kSbz/Screenshot-8.png)
![Screenshot](https://i.postimg.cc/VNH2Zrnj/Screenshot-9.png)
![Screenshot](https://i.postimg.cc/ZRG2ZGfn/Screenshot-10.png)

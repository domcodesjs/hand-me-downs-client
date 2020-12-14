# Hand Me Downs Client

[Link to Live Site](https://handmedowns-client.herokuapp.com/)

## Summary

Hand Me Downs is a ficticious marketplace where you can buy and sell used clothing. When a user creates an account they'll be able to buy and sell immediately. When your account is created you automatically get a shop setup at /shop/username where users can go to purchase items from you. When a user purchases an item(s) from you you'll see them under your orders. If you purchase an item(s) you'll see the purchase under your orders.

## Technologies

The front end of Hand Me Downs uses React and Redux.

## Routes

### Public Routes

- **/** landing page that displays the most recent listings
- **/search** search results page
- **/login** login page
- **/signup** sign up page
- **/listings** view all listings
- **/shop/:username** view all listings of a specific user by username
- **/cart** view items you've added to the cart
- **/listing/:listingId** view details about a single listing
- **/404** routed here when a page doesn't exist

### Authenticated Routes

- **/checkout** checkout page
- **/your/listings/new** create a new listing
- **/your/orders** view all of your orders
- **/your/order/:orderId** view details about a single order
- **/your/purchase/:purchaseId** view details about a single purchase
- **/your/listings** view all of your own listings
- **/your/purchases** view all of the purchases you've made
- **/your/listings/:listingId/edit** edit a listing you've made

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

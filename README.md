# Securely Embed Payments in a NodeJS App

This is a Node.js/Express backend application that demonstrates a unified payment session server using [North's Embedded Checkout](https://developer.north.com/products/online/embedded-checkout). The code in this repository acts as the secure server that securely generates checkout sessions and verifies transaction status, protecting API keys and credentials.

It is designed to serve as the backend for both companion React frontend repositories:
- [North-React-Browser-Post-API-With-Shopping-Cart](https://github.com/NorthDevelopers/North-React-Browser-Post-API-With-Shopping-Cart) — React ecommerce shopping cart frontend.
- [North-React-Browser-Post-API-Without-Shopping-Cart](https://github.com/NorthDevelopers/North-React-Browser-Post-API-Without-Shopping-Cart) — React single-item direct purchase frontend.

## Get Sandbox Credentials

To get started, create a free [North Developer Portal account](https://developer.north.com/register). This will allow you to get the sandbox credentials that are required to test the app. Log in to your account to view the official [Embedded Checkout Integration Guide](https://developer.north.com/products/online/embedded-checkout), then [contact](https://developer.north.com/contact) North's Sales Engineering team to get sandbox credentials added to your Developer Portal account.

## Follow Along with the Tutorial

When you're ready to start building your app, you can follow along with [this tutorial](https://developer.north.com/blog/embedded-payments-react-app-shopping-cart) for step-by-step instructions.

## Completed App

Your completed ecommerce app will look similar to the following:

![](/assets/payments-hub-react-browser-post-api-with-cart.png)

Click the "View Details" button to open a product page:

![](/assets/payments-hub-react-browser-post-api-product-with-cart.png)

Click the "Shopping Cart" button to open the cart modal, which displays the items in your cart, the total order amount, and allows users to edit the contents of their cart:

![](/assets/payments-hub-react-browser-post-api-shopping-cart.png)

Click the "Checkout" button to go to the checkout page, where a secure checkout form is embedded directly so customers can enter their payment information and submit an order:

![](/assets/payments-hub-react-browser-post-api-with-cart-checkout-form.png)

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
aim of the project is to cover Modals, Portals, useReducer(), useState(), useContext() and a few tricks like

- catching dynamic props from parent component {...props.attributes}
- managing the .reduce function with an array => conf /src/components/Layout/HeardCartButton.js file
- using forwardRef (React.forwardRef(props, ref) =>{ }) to catch inputs and ref.current.value from another components = conf /src/components/Meals/MealItemForm.js in association with /src/UI/Input.js
- managing numbers with .toFixed(2) method for example
- managing Arrays: .concat() method as an alternative to .push() methods // and also .filter(()=>{}) and .findIndex(()=>{}) methods

# INSTALL PROJECT

git clone git@github.com:mihoadie/React_Food_Order_App.git
cd React_Food_Order_App
npm install

and we fetch into firebase realtime database for this exercice at the end:

getting meals through https://react-food-9e268-default-rtdb.europe-west1.firebasedatabase.app/meals.json
adding orders through https://react-food-9e268-default-rtdb.europe-west1.firebasedatabase.app/orders.json

to do so, you can simply create a firebase project (https://console.firebase.google.com/)
and make sure that you select the 'TEST mode' for the given created database
by changing the links of fetch (in /src/components/Cart/Cart.js file + in /src/components/Meals/AvailableMeals.js) , you will get you own data!

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Component's architecture

                                            index.html      --> main including Portals (for cartModal Management)
                                                |
                                             index.js
                                              app.js      --> useReducer() linked to cartReducer (/store) + CartContext.Provider
                                                |
                                                |__________________________________________ Cart.js
                                               / \                      useContext (CartContext) to get CartList+associated Methods
                                              /   \                                         |
                                             /     \                                        |
                                            /       \                                      Modal.js
                                           /         \                          including Backdrop and Overlay
                                Header.js          Meals.js              both encapsulating CartItem thanks to {props.children}
                                     |                     |                                |
                                     |                     |                                |
                                     |                     |                            CartItem.js
                                     |                     |                    data props: key+name+price+amount
                                     |                     |                method props: onRemove + onAdd
                           HeaderCartButton.js              \                               |
                          useContext + useEffect             \                              |
                                     |                        \                         Checkout.js
                                     |                         \              method props: onConfirmOrder={submitOrderHandler}
                                CartIcon.js                     |\_________________________
                                 (img svg)                      |                          |
                                                                |                          |
                                                         AvailableMeals                MealSummary.js
                                            with Fetch to get Meals from firebase
                                                                |
                                                                |
                                                            Card.js
                                               encaps css component ({props.children})
                                                                |
                                                                |
                                                            MealItem.js
                                                data props: key +name+price+description+id
                                            useContext(CartContext) to access method addCartItem
                                                                |
                                                                |
                                                                |
                                                            MailItemForm.js
                                                    method Props: onAddToCart
                                                          data Props: id
                               amountInputRef = useRef() to catch the forwarded ref of Input.js COmponent
                                            calling Input.js with <Input ref={amountInputRef} /> to catch amountInputRef.current.value
                                                                |
                                                                |
                                                                |
                                        Input.js (const input = React.forwardRef(props, ref) =>{})
                                                        special props: ref={ref}
                                                        data props: label + input

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

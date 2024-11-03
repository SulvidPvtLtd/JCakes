# Project Structure

This is my Frontend Project structure:

    project-root/
    ├── assets/                     # Contains image, font, and other static files
    │   ├── data/                   # Static data used in the app
    │   └── fonts/                  # Custom fonts used in the app
    │
    ├── src/                        # Main source folder for the application
    │   ├── app/                    # App screens and navigation structure
    │   │   ├── (admin)/            # Admin section screens and layout
    │   │   │   ├── _layout.tsx     # Admin tab layout, defines tab navigation for admin views
    │   │   │   ├── menu/           # Admin menu-related screens
    │   │   │   │   ├── create.tsx  # Screen for creating a new menu item
    │   │   │   │   ├── [id].tsx    # Screen for viewing specific menu items based on ID
    │   │   │   │   └── index.tsx   # Default screen displaying the admin menu items
    │   │   │   ├── two.tsx         # Admin "Orders" screen
    │   │   │   └── index.tsx       # Default screen that redirects to /menu
    │   │   ├── (user)/             # User section screens and layout
    │   │   │   ├── _layout.tsx     # User tab layout, defines tab navigation for user views
    │   │   │   ├── orders/         # User orders-related screens
    │   │   │   │   ├── _layout.tsx # Layout for orders section
    │   │   │   │   ├── [id].tsx    # Screen to view a specific order based on ID
    │   │   │   │   └── index.tsx   # Default screen for viewing user orders
    │   │   ├── _layout.tsx         # Main layout for routing between user and admin sections
    │   │   └── index.tsx           # Landing screen with links to User, Admin, and Sign In
    │   │
    │   ├── components/             # Reusable UI components
    │   │   ├── Button.tsx          # Custom button component used in the app
    │   │   ├── EditScreenInfo.tsx  # Example component for editing screen information
    │   │   ├── Themed.tsx          # Themed wrapper components for light/dark mode
    │   │   └── useColorScheme.tsx  # Hook to determine light or dark mode
    │   │
    │   ├── constants/              # App-wide constant definitions
    │   │   └── Colors.ts           # Color constants for theming
    │   │
    │   ├── providers/              # Context providers and global state management
    │   │   └── CartProvider.tsx    # Provides shopping cart context to the app
    │
    ├── tsconfig.json               # TypeScript configuration file
    └── package.json                # Dependencies and project metadata

src/app/: Contains the main app's screen components, organized into admin and user sections with their own layouts and screens.
src/components/: Reusable components like buttons and theme-related helpers.
src/constants/: Stores configuration files such as color schemes for consistent app theming.
src/providers/: Manages the app's global state through context, like the CartProvider.

# Topics Covered in this project:

    1	 This is a full-stack food ordering app built using React Native and Supabase.
    2	 I focused on backend development with Supabase for easy implementation of features like
         authentication, database design, query, mutation, image uploading, and real-time updates.
    3	 By using Expo, it allows you building projects without setting up Android Studio or Xcode
    4	 Running the development server and testing the application on physical and emulator devices
    5	 Using Git to manage project changes
    6	 Understanding the app directory and its relationship to screens.
    7	 Using reusable colors and importing constants for consistent design
    8	 Accessing JavaScript variables inside GSX syntax.
    9	 Creating custom components in React Native
    10	 Creating and using custom components in React Native.
    11	 Moving components to separate files for best practice
    12	 Creating type-safe components with TypeScript
    13	 Using default or fallback image for missing product image
    14	 Enabling TypeScript path AL support in app.json and creating aliases in TS config for mapping
    15	 Easy to render a scrollable list of items using FlatList
    16	 Fixing layout issues and introducing grid layout
    17	 Creating separate screen for product details
    18	 Creating deep links for mobile navigation
    19	 Creating dynamic routes with React Native and Expo Router
    20	 Creating a nested Navigator for grouping screens within the tabs Navigator.
    21	 Adding an index screen inside the folder is essential for navigation.
    22	 Configuring navigation and hiding header
    23	 Working with Expo router and rendering product details
    24	 Handling undefined products and image rendering in React Native
    25	 Rendering a list of items using map operator
    26	 Styling and layout adjustments for views in React Native
    27	 Using conditional styles and state in React Native component rendering
    28	 How to update selected item and use state variables
    29	 Implementing the shopping cart feature with React context for data sharing
    30	 Configuring header and navigation in React Native
    31	 Creating a context provider and consumer in React Native
    32	 Using card provider component to wrap screens in the application.
    33	 Creating and using context in React Native
    34	 Implementing items and add item inside our card provider
    35	 Creating and adding new items to the cart
    36	 Adding functionality to the card list item.
    37	 Implement logic to merge and increment quantity of card items.
    38	 Adding update quantity function to card context for quantity management
    39	 Updating and filtering items in the array.
    40	 Checking and updating cart items based on product and size
    41	 Implementing order creation and management
    42	 Admin side features include product creation, updates, and filtering between active and
        archived items
    43	 Understanding navigation in React Native
    44	 Using segments to redirect to different screens based on user actions.
    45	 Creating a new screen for product creation
    46	 Styling input and label elements
    47	 Adding custom input validation for forms
    48	 Basic input validation and rendering an image
    49	 Implementing image selection, editing, form validation, and setting state in a React Native app.
    50	 Creating and updating item screens navigation and dynamic parameters
    51	 Updating form validation and prefilling input forms
    52	 Using React Native's alert component for confirmation dialogues
    53	 Creating custom components and navigation structure in React Native.
    54	 Implementing backend and authentication with Supabase
    55	 Implementing screen navigation and authentication logic.
    56	 Creating folder structure for wers and updating layout
    57	 Using day.js library to parse and display dates
    58	 Creating the order details page and obtaining the ID from search parameters.
    59	 Rendering order items in a list
    60	 Managing scrolling with flatlist and list header component
    61	 Creating a selector for order status
    62	 Implementing nested Navigator for managing list of orders
    63	 Using SafeAreaView from React Native Safe Area Context
    64	 Implementation of backend with Supabase for mobile app
    65	 Setting up Superbase and configuration
    66	 Creating an account using the sign up flow
    67	 Implementing sign in functionality with Supabase
    68	 Creating an authentication provider for managing user sessions
    69	 Using session imported from Supabase Library for user authentication.
    70	 Implement loading state for session fetch
    71	 Protecting authentication screens and implementing basic authentication flows.
    72	 Setting additional parameters for user profiles and group-based authentication
    73	 Fetching profile information from Superbase and redirecting based on user group
    74	 Setting up admin and user profiles
    75	 Creating and designing the product table for CRUD operations
    76	 Setting up and querying a new table in Superbase
    77	 Protect routes for authenticated users
    78	 Leveraging caching mechanism with react query and query provider
    79	 React Query manages loading, data, error states, and optimizes queries automatically.
    80	 Using the custom hook 'useProductList' for querying and rendering data, making components lean.
    81	 Parsing and processing ID for product retrieval.
    82	 Implementing CRUD operations for products and admin functionality.
    83	 Using the insert product function to save data in the database
    84	 Using on success function to update the UI after creating a new product.
    85	 Using the update product function and passing the ID parameter.
    86	 Updating product details and handling related errors
    87	 Handling routing and error management in Superbase
    88	 Configuring TypeScript integration with Supabase
    89	 Using helper functions and types to integrate with Superbase in TypeScript.
    90	 Implementing CRUD operations for orders in the application.
    91	 Creating table for order items and defining relationships.
    92	 Setting up table relationships and policies for authentication.
    93	 Updating query and regenerating types for superbase integration
    94	 Implementing error handling and data filtering in React Native
    95	 Filtering orders based on archive status and order status
    96	 Using dynamic query keys based on conditions for filtering data
    97	 Creating orders using mutations and typing
    98	 Using session to automatically handle user ID in data mutations
    99	 Creating and linking order items to the order for relationship
    100	 Creating and calling a function to save order items
    101	 Creating and linking cart items with word items and sizes in React Native using TypeScript
    102	 Sorting orders chronologically based on the most recent created date.
    103	 Updating order items and implementing related data queries.
    104	 Adding required ID for table update
    105	 Enable real-time updates for specific tables
    106	 Handling new data insertion and updating state
    107	 Subscribing to order updates using a specific ID
    108	 Real-time functionality for order updates
    109	 Uploading and linking files using Superbase storage
    110	 Troubleshooting issue with image upload and display
    111	 Storing and displaying images using remote image on React Native with Supabase
    112	 Adding payment processing and advanced features
    113	 Updating a product image and implementing logout functionality.
    114	 Creating a profile screen and implementing sign out functionality
    115	 Install and configure Docker desktop for local Superbase setup
    116	 Resetting database password in Supabase
    117	 Setting default values for environment variables and server restart in React Native
        application development.
    118	 Database synchronization issues between local and remote environments.
    119	 Creating and managing admin accounts and permissions
    120	 Integrating stripe as a payment processor
    121	 Server-side processing for secure payment handling.
    122	 Setting up test mode and Stripe integration for development
    123	 Function is watching files and auto-refreshing code
    124	 Using server-side Stripe integration for secure transactions
    125	 Troubleshooting and testing payment intent creation with dynamic amounts
    126	 Deploy function on remote Superbase instance
    127	 Initialize payment sheet on checkout
    128	 Creating and fetching payment sheet parameters using Edge function and Supabase client
    129	 Implementing payment processing and error handling in the app.
    130	 Payments are integrated in the application with dynamic prices and test mode usage
    131	 Creating and applying database migrations
    132	 Interacting with Supabase database from Edge function
    133	 Fetching and handling profile data with error checks
    134	 Saving customer ID from stripe to database
    135	 Understanding the process of initializing and handling payment sheets in React Native.
    136	 Stripe handling payments and card reuse
    137	 Configuring push notifications for iOS and Android
    138	 Expo push notification service simplifies remote notification management for Android and iOS apps
    139	 Setting up configuration for Expo notifications
    140	 Creating a notification provider for Expo push notifications.
    141	 Setting up push notifications in Expo go
    142	 Handling push notifications and notification listeners in React Native
    143	 Using migrations to track changes and apply them to remote database
    144	 The process of storing push notification tokens and sending notifications to users' devices
        using Expo.
    145	 Updating status and notifying user
    146	 Sending push notifications using Expo push token
    147	 Sending remote push notifications using Expo push API
    148	 Setting up Firebase Cloud messaging for Android notifications

# FoodOrdering

This is a food ordering Full Stack Mobile Development project that makes use of

- React Native and Supabase.
- Expo Router for the navigation library
- Supabase for the backend alternative to firebase.

Get started with SUPABASE:

    Unlimited API requests
    50,000 monthly active users
    500 MB database space
    Shared CPU • 500 MB RAM

    5 GB bandwidth
    1 GB file storage
    Community support

Emphasis is on :

UI

- Building and Designing beautiful UI using built in and custom components.
- Data management : Props and State
- Global state management using React Context.
- Navigation using Expo Router: This will have nested navigations and dynamic routes.

BACKEND

- Get started with Supabase https://supabase.com/
- Implementing Authentication System, Creating and account.
- Database Design.
- Query and Mutate the data from the APPLICATION.
- Image uploading to the cloud.
- Image updates in real time.

PRODUCTION

- Animations with Reanimated.
- Build the app in the cloud using EAS (EXPO APPLICATION SERVICES).
- Prepare the app for the stores.

FOR A PROJECT INDEPTH FOR REFER TO THIS LINK BELOW:
https://foodordering.hashnode.space/default-guide/full-stack-mobile-development-with-react-native-and-supabase

# NOTES

STYLING

I had to create structure and style seaparately.
This is because inline styles create a lot of noise around our code, such that the style code can only access the customised properties through objects. eg style = {styles.price} where the object `price` is defined as

    const styles = StyleSheet.create({
        price: {
            A,
            B,
            C,
            etc
        },
    });

Here, styles.price is a reference to a style object defined using StyleSheet

BUIDLING CUSTOM COMPONENT

In this project appreciation of

- Creating components ( a simple javascript function that returns some JSX ) and Render it in the app
- Props: how to send data from the parent component down to the child component.
- Component that will be responsible for rendering one Product Item in a List (ProductListItem).

We need Custom components for basically replicating the same type of elements based on different data. Structure and style remains the same, the ddata is only dynamic.

How can we send data from a parent component to a child component.
In our project's index file: - ProductListItem() : Parent Component. - ProductListItem: Child component.

- We will use props (object placeholder) to send data from a Parent to a Child Component.

assuming a products array is declared somewhere:

Send Data from MenuScreen():

    export default function MenuScreen(){
        return(
            <View>
                <ProductListItem  product = {products[0]} />
                <ProductListItem  product = {products[3]} />
            </View>
        );
    }

Receive Data in ProductListItem():

const ProductListItem( props ) = () {

    // `props` object can be destructured as `{product}`

    return(
        <View>
            console.log(props)
        </View>
    );

}

// Custom Components should have their own file.

    const ProductListItem( props ) = () {
        /*`props` object can be destructured as `{product}`*/
        return(
            <View>
                console.log(props)
            </View>
        );
    };

# Type Safe Components

Typescript helps us catch bugs early, by catching situations where the data that is expected does not match the type of the data that is being sent.
With javascript only, this is a very common source of a lot of bugs, because javascript is an untyped language.

Predefined types:

First, import the file `types.ts` from the Asset Bundle inside the src directory of our app.
It has some predefined types we will need.

The benefit of type safe components, specifically when working with a bigger team, there are components that yu are working on that are not only used by you. They are used by your team mates as well. By specifying what type the properties of a component expects, the other team mates will see that when you use the components.

# Prop Types

To make our component type-safe, and make sure that whoever is using it will send us a valid product object, we need to define the types of our `ProductListItems` Props.

    import { Product } from '../../types';

    type ProductListItemProps = {
    product: Product;
    };

    const ProductListItem = ({ product }: ProductListItemProps) => {}

We will see the benefit of typescript right away.
It should tell us that the image might be null, and that will fail to render the <Image> component. We can fix that by having a fallback url when the product doesn’t have an image.

    source={{ uri: product.image || 'https://yourdomain.s3.us-east-2.amazonaws.com/food/default.png' }}

# Typescript Path Aliasses

Type aliasses help to define path shortcuts to some folders that we often import from, so that our import statements look cleaner.

You can enable this inside the app.json file.

    {
        "expo":{
            "experiments":{
                "tsconfigPaths": true
             }
        }
    }

then define the path aliasses inside tsconfig.json file.

    {
        "extends": "expo/tsconfig.base",
        "compilerOptions": {
            "strict": true,
            "baseUrl": ".",
            "paths": {
            "@/*": [
                "./*"
            ]
            }
        },
        "include": [
            "**/*.ts",
            "**/*.tsx",
            ".expo/types/**/*.ts",
            "expo-env.d.ts"
        ]
    }

# FlatList

It is a component that helps us render either a horizontal or vertical scrollable data list.
It is usually designed for infinite scrollable list.
We have used this to render our products on the home screen.

The Flat list has two required properties:

    <Flatlist
        data={products}
        renderItem={ ( {item} ) => {ProductListItem product={item} } }
    />

    where:
    - data: an array of items. In this case, an array of products.
    - renderItem: a function that tells flatlist how one single item from the data array
        be rendered.
    - item: object of information.

    <FlatList
      data={products}
      renderItem={ ({ item  }) => <ProductListItem product={item} />}
        /* render Flalist in two separate columns.
          The ProductListItem's container's width need to be specified.
          You need to add a `flex: 1` style object so that it will split equally the space
          among it's siblings.
        */
      numColumns={2}
        // rener space btwn container. You can make use of `margin:5`in the container style.
        // You can make use of the gap property in the parent component as well instead
        of `padding` in the child component.
      contentContainerStyle={{gap:10}} // Adds gap between the rows.
      columnWrapperStyle={{gap:10}}    // Adds space between the columns.
    />

# Image Properties

    <View style={styles.container}>

      {/*Always declare a fallback image when rendering images through url*/}
      <Image source={{ uri:product.image || defaultPizzaImage }}  style={styles.image}/>

      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>$ {product.price}</Text>

    </View>

There are situations where, the image size is greater than the container size,
Then we might need to auto resize the image to always fit within the container.
This means the container has a different aspect ratio than the image's.
We can adjsut using the `resizeMode`

    <Image source={{
        uri:product.image || defaultPizzaImage }}
        style={styles.image} resizeMode='contain'
    />

# Separate Screen for the Details of one Product.

To create this, you will need to make use of Expo Router.

- work with dynamic routes.
- Implement nestested Navigators and understand the `_layout` file in Expo Router.

Implementation

Details page and dynamic routes:
1 - Create a new page for the details screen of a product by simply creating a new file `app/product.tsx` and exporting a simple component.
2 - We ca link to this page when we press on a `ProductListItem`
3 - Use a Dynamic path parameter by renaming the `app/product.ts` file to `app/[id].tsx`
4 - When linking to it, send the product id as part of the link.
5 - Read the path parameter inside the Product details screen using
`const { id } = useLocalSearchParams();`

The app/ folder is specifically for expo routing.
This is where all our screen are located.
Expo router is a file based navigation system.
Expo router automatically creates and set up screen for us and navigation between them.

    //app/(tabs)/products.tsx : this page will be linked to the ProductListItem in
    the components folder.

    import { View, Text } from 'react-native'
    import React from 'react'

    const ProductDetailsScreen = () => {
        return (
            <View>
            <Text>ProductDetails</Text>
            </View>
        )
    }
    export default ProductDetailsScreen;

    //components/ProductLitItem.tsx
    import { Link } from 'expo-router';

    const ProductListItem = ({product}: ProductListItemProps) =>{

        return(
            <View style={styles.container}>

                <Text style={styles.price}>$ {product.price}</Text>

                <Link href={"/product"}>Go to details</Link>

            </View>
        );
    }

    export default ProductListItem;

    To use a root View inside a Link it must hallow us to use an `onPress` event, but a however
    a view does not work with onPress event, it only works with a Text element.
    Because of this, we can use `Pressable` instead of a root view.
    Pressable already has an inbuilt `onPress` event.

    const ProductListItem = ({product}: ProductListItemProps) =>{
        return(
            <Link href={"/product"} asChild>
            <Pressable style={styles.container}>
                <Text style={styles.title}>{product.name}</Text>
                <Text style={styles.price}>$ {product.price}</Text>
            </Pressable>
            </Link>
        );
    }

# How do we know to which actual Product are we navigating to.

We will use dynamic route and expo router.

To define a dynamic route, we have to define a variable that corresponse to that dynamic part of a URL.

For example, the file currently named as `product.tsx`in the app/(tabs) folder can be changed to a dynamic one as [].tsx emphasizing that it is dynamic, and then the name `product` replace it with a variable like `id` which represent the key or id of the product we wnat to render (prouct.id), so that it becomes `[id].tsx`.

We therefore needto change the variable object `product` for the link
`<Link href={"/product"} asChild>`
to something like <Link href={"/2"} asChild> where 2 is picking product on the 3 index of the array.

To add a javaScript variable inside a string, we have to use a template string denoted with ` `
instead of " ".
`<Link href={`/${product.id}`} asChild>`
This `id` has to be received on the other end `ProductDetailsScreen` function on the [id].tsx file.

use a hook imported form expo router `const { id } = useLocalSearchParams();`

# Nested Stack Navigator : Structuring and Putting together our screens

We want to make the menu link us to two pages, menu list Screen and Details Screen.
We want the product details page to be displayed under the Menu tab. That means that the menu tab will consist of multiple screen: The list of products and product details.

Let’s group them in a separate folder app/(tabs)/menu with 2 screens (index.tsx and [id].tsx)
and a \_layout.tsx.
The layout can simply export the <Stack /> component, to use a Stack navigator for the child routes.

    import { Stack } from 'expo-router';

    export default function MenuLayout() {
        return <Stack />;
    };

By doing that, our (tabs)/index.tsx should simply redirect to the menu page.

    import { Redirect } from 'expo-router';

    export default function TabIndex () {
    return <Redirect href={'/menu/'} />;
    };

Now, configure the (tabs)/\_layout.tsx and hide the index route, rename the other routes and change the icons.

# Product Details Screen

I will render the product details screen, that will contain more

- information about the product,
- a size selector and
- the Checkout button.

Implementation:

- Started by rendering the Image, price and title
- Rendered the size selector component

Button component

Let’s create a reusable button component inside.
Knowing out product `id` lets get the products by importing its data:

`import products from '@/assets/data/products'`

How do we do that:

- Find the product where the product's id is equal to our knwon product id above.
- Then assign the data to a variable.

`const product = products.find( (p) =>p.id.toString() === id );`

SELECT PIZZA SIZE

We use a dynamic method to display the pizza sizes of `S`, `M`, `L`, and `xl`.

`const sizes = ['S', 'M', 'L', 'L'];`

To access the `sizes` variable inside JSX, you call it using { }.

// Access the sizes array amd map through it, whilst using a function that will look for
// size and return the text data with the size as a value.
// The items that are being mape should contain a unique key.

    <View>
        { sizes.map( (size) => <Text key={size}>{size}</Text>  ) }
    </View>

NB: The key should always be defined in the component being mapped.
In example below, we no longer a mapping the Text elemnet but rather the View element.

    <View style={styles.sizes}>
        {
          sizes.map( (size)=>
            <View style={styles.viewSizes} key={size}>
              <Text style={styles.textSize}>{size}</Text>
            </View> )
        }
    </View>

State

State allows us to keep track of data that changes inside the component.
In this case, i will use a state variable to keep track of the selected size.
And use its value to highlight the selected size.

Import a hook called `useState` from react.

# Shopping Cart

Shopping Cart is a very common feature in a lot of e-commerce applications.
In this project, we will implement a Shopping Cart system using React Context.

The aim is to make use of :

- Use Modals
- use React Context to share data across components
- Implement the Shopping Cart feature

# Implementation

Start by create a new Screen `app/cart.tsx` based on the existing modal

The data about the items in the cart will be needed in the multiple parts of the applications.
For example, we will add items to the cart from the Product Details page,
and will display them on the Cart screen.
That is already something that cannot easily be accomplished with simple `useState`.

We will use a React Context, that will keep track of the cart data on a global level, and other components will be able to access the same data.

Using props or useState in this scenario can be inefficient because data must be manually passed down through multiple components, leading to prop drilling.
This increases complexity and makes the code harder to maintain.
It also limits reusability, as every component that needs access to the cart data must receive the props, potentially leading to duplication.
React Context, on the other hand, allows for global state management, making it easier to access and manage shared data like the cart across various components without manual prop passing

Steps:

- Define a simple Context provider
- Add the items state, and also implement the add to cart functionality
- Call the add to cart function from Product Details
- Consume the cart items array on Cart Screen
- Render the total items in the cart near the shopping cart icon
  `src/providers/CartProvider.tsx`

  const CartProvider = ({ children })=>{
  return(
  <CartContext.Provider value={{items:[], onAddItem: () => {} }}>
  {children}
  </CartContext.Provider>
  );
  };

In the \_layout.tsx, everything between the CartProvider is our children.

    <CartProvider>
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="cart" options={{ presentation: 'modal' }} />
        </Stack>
    </CartProvider>

so we can re-write `src/providers/CartProvider.tsx` as

const CartProvider = ({ children })=>{
return(
<CartContext.Provider value={{items:[], onAddItem: () => {} }}>
<Stack>
<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
<Stack.Screen name="cart" options={{ presentation: 'modal' }} />
</Stack>
</CartContext.Provider>
);
};

However this is happening behin the scene in the context background.

Instead of importing two objects everytime you want to make use of them, for example:

    import { useContext } from 'react';
    import { CartContext } from '../providers/CartProvider';

You can simpley export them from their source component using a custom function:

export const useCart = () => useContext(CartContext);

then import them as:

    import { useCart } from '../providers/CartProvider';

# Admin side

Now that our User side app will be complemented by the Admin side app.

The admin side, will have a lot of common screens like user side, such as:

- list of products,
- product details,
- list of orders,
- order details.

However, it will have some additional screens as well like create Product, etc.

// Remember to enable back the email validation under supadabse/providers/email when you are done testing the app.

# Designing the Table

- Setup the Products database table,
- and will query and mutate the data

Start by creating the products table in the Supabse Dashboard

Based on our types.ts - our products have
export type Product = {
id: number;
image: string | null;
name: string;
price: number;
};
On supabase,

1. Database>>Tables>>Create a new table underpublic
2. Table name: `products`
3. Description: `Product details`
4. Enable Row Level Security
5. Columns
   - id >> int8 >> primary key
   - created_at >> timestamptz >> now()
   - name >> text >> isNullable (remove checkmark)
   - image >> text >> isNullable (leave checkmark to make it assume a null value)
   - price >> float4 >> isNullable (remove checkmark)
6. Save

Now Go back to Table Editor >> products >> Insert >> Rows

In the (user)/menu/index.tsx fetch information from the supabase table you just created above making use of the useEffect() hook.

    useEffect( ()=> {
    const fetchProducts = async () => {
        const {data, error} = await supabase.from('products').select('*');
        //console.log(data, error);
        }
        fetchProducts();
    },[] );

This query should have failed initially, because the data is protected by Row Level Security policies on the PostgreSQL Database layer. By default, nobody has access to the table.

We have to specify rules to give specific users granular access to the data.

On the product table name's breadcrump, select View policies.
Select Create policy.

To manage these queries that are policy controlled, we will use
React Query liabrary: [**React Query**](https://tanstack.com/query/latest) is a powerful state management and data fetching library that helps us query remote data. Besides helping us query data, manage the loading and error states, it also provides a caching mechanism for our local data. That will help us keep all the data in sync when things change in the application.

6:12:00S 

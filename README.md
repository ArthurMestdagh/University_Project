# University_Project
A site capable of calculating the thermal value of a wall using user-defined materials, supported by mongodb
Credits also go to two of my co-students; Wannes C. and Nicolas G.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## About

This app gives the user the ability to construct a wall element and calculate the associated U-value and an estimated price. For doing so, the user can start using the default present materials or add new ones. The calculation comes with a 3D-visualisation of the different layers, their thicknesses and given colors.

## Installation and deployment

To use the app, following modules need to be installed:
###### `npm install`
###### `npm install react`
###### `npm install react-redux`
###### `npm install react-bootstrap bootstrap`
###### `npm install react-color`
###### `npm install axios`
###### `npm install react-router-dom`
###### `npm install three`
###### `npm init -y`
###### `npm install express body-parser cors mongoose`
###### `npm install -g nodemon`

For starting the database server go to src/backend and start the server:

###### `cd src/backend`
###### `nodemon server`


## Usage

On the homepage, two options are given. For starting a calculation, the left option â€˜userâ€™ should be chosen. Thereafter, youâ€™ll arrive on the calculation page of the app, where a first layer is already waiting for the users input.

Additional layers can be added by clicking the plus-symbol in the navigation bar. The arrows left and right of the plus can be used to switch the order of the different layers. This will not affect the outcome of the calculation and is purely for the visualization option.

For each layer, different properties can be chosen. 
First a material type must be chosen between the three options â€˜structureâ€™, â€˜insulationâ€™ and finishing coatâ€™ to obtain the appropriate materials from the database. After doings so, these materials can be selected in the dropdown. In this situation, the default materials will be given. Youâ€™ll be able to add new materials on your own, by using the â€˜producerâ€™-option in the home menu. The app will display the associated lambda-value when a material is selected.
Afterwards, youâ€™ll need to suggest a thickness for the current layer so the app will be able to calculate the U-value. The U-value of the selected layer will be displayed as well. These are all the needed inputs for the calculation of a layer.

In addition, the user can choose a certain color for a layer by clicking the circle in the top right corner of the layer component and choosing from the color picker. This color will appear in the navigation bar for each layer and in the 3D-visualisation. The layer name can be changed by double-clicking the layer in the navigation bar. The layer can be deleted by clicking â€˜delete layerâ€™ which is situated next to the circle for color options.

The last option in the left column is the ability to suggest a surface area for the wall element. This value is not layer-dependent and will be used in the overall calculation. For each layer, the associated estimated price will be displayed while the layer is selected.


In the right column, the 3D-visualisation is given and constantly updated with the userâ€™s input. The visualization gives the user a better idea of the structure of his element. 
Below the visualization, the overall calculation outputs are displayed. This global U-value and estimated price will constantly be updated causing the user to see the impact of changing a certain layer. Finally, the quality of the u-value is shown in a more graphical way for user with less experience with building physics. The Belgian norm for walls of 0,24W/m2K will be positioned in the middle of the bar.

When the â€˜producerâ€™ option is chosen at the homepage, the user will be able to insert new materials. This happens in a similar way as to determine the layersâ€™ properties. The user will be able to choose the material type, name and lambda value. Thereafter, this new option will be added to the dropdown of the associated material type. Since the layersâ€™ properties are stored as a global state, these will not be erased after shifting between the â€˜userâ€™ and â€˜producerâ€™ options of the app

In case of the 3d-visualisation to crash due to too many updates in a very short time, it is suggested to return to the home page followed by choosing the â€˜userâ€™ option again. When returning, the layersâ€™ properties and the visualization will reappear.



## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you canâ€™t go back!**

If you arenâ€™t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point youâ€™re on your own.

You donâ€™t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldnâ€™t feel obligated to use this feature. However we understand that this tool wouldnâ€™t be useful if you couldnâ€™t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

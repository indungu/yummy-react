[![Build Status](https://travis-ci.org/indungu/yummy-react.svg?branch=master)](https://travis-ci.org/indungu/yummy-react) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/2b56aee90f2e4018baf14abe64737855)](https://www.codacy.com/app/indungu/yummy-react?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=indungu/yummy-react&amp;utm_campaign=Badge_Grade) [![Coverage Status](https://coveralls.io/repos/github/indungu/yummy-react/badge.svg?branch=master)](https://coveralls.io/github/indungu/yummy-react?branch=master)

This is a Yummy Recipes project implementation in the ReactJS library. The web app achieved is a front end client that interfaces with the [Yummy Recipes Flask REST API](https://yummy-rest.herokuapp.com).

## Requirements

* ReactJS v16.2.0
* Bootstrap v4-Alpha
* React Bootstrap


## Installation

#### 1. Clone the Github Repositorty'

```bash
$ git clone https://github.com/indungu/yummy-react.git
$ cd yummy-react/

```
### Install dependencies 

use npm or yarn
  using Yarn

         
      $ yarn install
       
   
   using npm
   
     
      $ npm install
  

#### 2. Start the Application

  using yarn

       
        $ yarn start
       
   
  using nspm
   
        
        $ npm start
    
#### 3. Running the Tests

  using yarn

       
         $ yarn test -- --coverage
       
   
  using npm
   
        
        $ npm test -- --coverage

### How it works

When you click the [link](https://yummy-react-indungu.herokuapp.com) in the description or after starting a loc al instance you should see the following screen:

![image](https://user-images.githubusercontent.com/30072633/37879397-0e621d54-3081-11e8-96b6-9e34c4eb930b.png)


On clicking `Signup` you should receive the following SignUp page

![image](https://user-images.githubusercontent.com/30072633/37882837-4ac95856-30af-11e8-9342-ff1a761f35b1.png)

After a successful SignUp you should be redirected to the following login page.

![image](https://user-images.githubusercontent.com/30072633/37882899-b2d85a82-30af-11e8-80a0-5862282f1666.png)

The initial Dashboard view you shall recieve on successful login is as shown below:

![image](https://user-images.githubusercontent.com/30072633/37882953-16bd4d8c-30b0-11e8-8cd5-83629463340f.png)

Clicking the `Add Category` button should launch the following Modal

![image](https://user-images.githubusercontent.com/30072633/37882968-488647f6-30b0-11e8-9c53-e6726b99ecbc.png)

On successful addition of a category, you should see the new category in the categories Table as follows:

![image](https://user-images.githubusercontent.com/30072633/37883000-87703b20-30b0-11e8-86cb-ef023138ceaf.png)

Clicking the `View Recipes` button would then display a recipes table below the categories table for the specific categowy whose recipes you are viewing.
Note that you will receive a prompt for categories that don't have any existing recipes.

![image](https://user-images.githubusercontent.com/30072633/37883283-332f9e78-30b2-11e8-9161-3095fed80142.png)

You can then add new recipes to any category by clicking the `Add Recipe` Button. This will launch a modal as follows:

![image](https://user-images.githubusercontent.com/30072633/37883350-95de7a4e-30b2-11e8-87be-96f443e88726.png)

Both categories and recipes provide for the ability to edit and/or delete any one of them and display the appropriate prompts that effect.

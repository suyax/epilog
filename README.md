# Momento

> A photo-sharing application that centers around intimate relationships.

## Team

  - __Product Owner__: Akash
  - __Scrum Master__: Julien
  - __Development Team Members__: Suya, Alex, Akash, Julien

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

### Signing up
- __Press the Sign Up button__
- __Enter your first name, last name, email, and password__
- __Press the Register button__

### Capturing a Moment
Our application allows you to capture precious moments as they happen. 
- __Press the Camera icon__
- __Take a picture with the Capture button__
- __Press the Gallery button to go to your camera roll__
- __Press any picture in your camera roll__
- __Enter a title for the story your moment belongs to -- Required__
- __Caption your moment -- Required__
- __Tag your moment to make it easier to search for in the future -- Required__
- __Press the Submit button__
  - __If you added a moment to an existing story, you’re taken to the Home page__
  - __If you’re adding a moment to a new story, you’re taken to the New Story page__

### Creating a New Story
- __The New Story page allows you to add to your narrative!__
- __Enter a description for your new story -- Required__
- __Add friends to your story__
  - __If you have friends that use Momento, you can add them to your story by typing their emails in a list separated by commas and spaces (“friend@friend.com, anotherfriend@friend.com” or just “friend@friend.com”)__

### Commenting on Moments
Momento allows you to leave comments on any moment you’ve captured. These comments can be viewed by anyone who’s in the story with you.
- __From the Home view, press any picture__
- __Type a comment at the bottom of the view__
- __Press the submit button__
- __Press the Back button to return to your Home view__

### Reliving your Memories
Each story you’ve created as well as all the moments that belong to them are available in the Library View. 
- __Press the Library button on the bottom nav bar__
- __Press any story you want to look through__
- __You can type a tag in the top search bar to view specific moments__
- __You can also press a moment to comment on it__


## Requirements

###Backend

####Deployment
-Appetize.io
-Docker
-Grunt: 0.4.4

####RESTful API Server
-Express: 4.13.3
-Node: 5.4.1
  -Npm: 3.5.3
    -Bcrypt: 0.0.3
    -Bluebird: 3.1.4
    -Body-parser: 1.14.2
    -Jwt-simple": 0.4.1
-Postgres: 9.5.0.0
-Sequelize: 3.18.0

###Frontend

-Moment: 2.11.2
-React Native: 0.18.1
-React Native Modules
  -Autocomplete: 0.1.3
  -Camera: 0.3.8
  -File-Transfer: 0.0.3
-React-Redux: 4.0.6
-Redux: 3.0.5
-Redux-Thunk: 1.0.3
-XCode: 7.2.1

## Development

### Installing Dependencies

Download XCode from the App store.

From within the root directory:

```sh
sudo npm install -g bower
```

cd into /client:

```sh
npm install
```

cd to root directory, then to /server:

```sh
npm install
```

For seeding the database:
1. cd into /server

```sh
grunt seedDb
```

For photo uploading functionality:
- __Open RCTFileTransfer.m in /client/app/nativeModules/RCTFileTransfer__
- __Copy the contents to the clipboard__
- __Open XCode and open the client project file__
- __Go to the file structure view on the left side__
- __Navigate to Libraries/React.xcodeproj/React__
- __Right-click the Base directory__
- __Click New File, make it type iOS Source__
- __Choose Objective-C File, then click Next__
- __Name the new file RCTFileTransfer, then click Next__
  - __Click Create__
  - __Paste the contents of RCTFileTransfer.m from the nativeModules into the new file__

For autocomplete functionality: 
- __Once you have installed react-native-autocomplete into /client, open XCode__
- __Go to the file structure view on the left side__
- __Right click on Libraries, select Add files to "..." and select node_modules/react-native-autocomplete/RCTAutoComplete.xcodeproj__
- __Select your project and under Build Phases -> Link Binary With Libraries, press the + and select libRCTAutoComplete.a__


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

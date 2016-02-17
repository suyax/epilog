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
> -Press the Sign Up button
> -Enter your first name, last name, email, and password
> -Press the Register button

### Capturing a Moment
> Our application allows you to capture precious moments as they happen. 
> -Press the Camera icon
> -Take a picture with the Capture button
> -Press the Gallery button to go to your camera roll
> -Press any picture in your camera roll
> -Enter a title for the story your moment belongs to -- Required
> -Caption your moment -- Required
> -Tag your moment to make it easier to search for in the future -- Required
> -Press the Submit button
>   -If you added a moment to an existing story, you’re taken to the Home page
>   -If you’re adding a moment to a new story, you’re taken to the New Story page

### Creating a New Story
> The New Story page allows you to add to your narrative!
> -Enter a description for your new story -- Required
> -Add friends to your story
>   -If you have friends that use Momento, you can add them to your story by typing their
>   emails in a list separated by commas and spaces 
>   (“friend@friend.com, anotherfriend@friend.com” or just “friend@friend.com”)

### Commenting on Moments
> Momento allows you to leave comments on any moment you’ve captured. These comments can be viewed by anyone who’s in the story with you.
> -From the Home view, press any picture
> -Type a comment at the bottom of the view
> -Press the submit button
> -Press the Back button to return to your Home view

### Reliving your Memories
> Each story you’ve created as well as all the moments that belong to them are available in the Library View. 
> -Press the Library button on the bottom nav bar
> -Press any story you want to look through
> -You can type a tag in the top search bar to view specific moments
> -You can also press a moment to comment on it


## Requirements

-Node: 5.4.1
-npm: 3.5.3
-XCode: 7.2.1
-Postgres: 9.5.0.0

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
1. Open RCTFileTransfer.m in /client/app/nativeModules/RCTFileTransfer
2. Copy the contents to the clipboard
3. Open XCode and open the client project file
4. Go to the file structure view on the left side
5. Navigate to Libraries/React.xcodeproj/React
6. Right-click the Base directory
7. Click New File, make it type iOS Source
8. Choose Objective-C File, then click Next
9. Name the new file RCTFileTransfer, then click Next
10. Click Create
11. Paste the contents of RCTFileTransfer.m from the nativeModules into the new file


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

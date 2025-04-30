# tower-defense-challenge

```bash
Working prototype of a Tower Defense game using pixi.js. 
The test focuses on rendering, 
modular architecture, game logic, optimization, and UX polish.
```

# Overview of the architecture

Tech Stack involved : 
```bash
- pixi.js version 8
- gsap
- Javascript
- HTML-5
- CSS
- node.js
- Webpack
```

## Pre-requisites

Please ensure you have the following installed:

- Node.js
- Access to the internet to fetch code and download dependencies

## How to run

Step - 1 : Open terminal in the root of your project.

Step - 2 : Run command :
```bash
npm install
```
            
to install all the dependencies.

Step  - 3 : Run command : 
```bash
npm run build
```
to build the project.

Step  - 4 : Run command : 
```bash
npm run start
```
to start the local server.

Step - 5 : Copy the link to the local server that was started to run it in browser.

## How to Play

Step - 1 : The game has UI buttons in the side panel as per the assignment which are namely : 
- PAUSE 
- 2x FPS
- START

Step - 2 : In order to start the game click on START button from the side panel.

Step  - 3 : 1st wave of enemies out of total of 4 waves will start to move towards the predefined path.

Step  - 4 : User can place the defense towers by clicking on the per-defined places in the game area which are marked by a white outline square and a dot centered tile.

Step - 5 : User can upgrade the tower by clicking on it again, if the user have enough coins the tower will get upgraded.

Step - 6 : Just for the 1st wave of enemies the user needs to click on START button but rest of the enemy waves will follow automatically without the need to click on START button again.

Step - 7 : User can also pause/play any time using PAUSE/PLAY button from the side panel.

Step - 8 : For increasing all animation speeds to 2x the user can click on 2x FPS button from the side panel and to make it normal speed can click it again.

## List of known issues : 
- Haven't added slider for changing the values or ranges for enemy damage, tower value etc. Using magic numbers as of now for the above.

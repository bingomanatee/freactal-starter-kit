This is a React starter kit that goes past what most of them do.
It is opinionated, and biased towards Freactal as a store (instead of Redux).

Here are the inclusions and benefits:

## neutrinorc.js

This uses the Neutrino foundation for 
the initial structure, webpackery, and test automation. 
A partial list of the important sub-packages Neutrino brings in are:

* __eslint,AirBnB__: there are yarn scripts for style consistentcy. 
 if for some reason you do NOT want this, remove the first include
 in the `.neutrinorc` config file. 
* __jest__: The tests are separated into a test folder.
* Modular CSS: including `xxx-module.css` (and using its named styles)
 gives you no-sweat css modularity. (including css with other names
 gives you NOT-modular css that names global styles)
 
## Freactal + Freactal-seed

Freactal lets you define stores like Redux without all the bullshit.
Freactal-seed lets you define stores in Freactal with one-stroke,
including a default value, expected type (integer, array, object, etc)
and automatic backup of store values to local storage. 

Like Redux, Freactal lets you define stores at the component level.

## Bottle.js for the lib

Bottle gives you injection; for those used to injection from Angular
it means you can replace constants, utilities and functions in the test
process without a lot of worry, and you can centralize your includes
in a single container. 

Currently only the `lib` folder and its items are bottled. 

## Gulp for spawning components

There is a gulp task you can execute:
 
`gulp comp --name=Foo`

This will spawn a component with:

* a CSS module style sheet 
* its own Freactal store
* A component
* A view

## React Router 

React Router is available; working on a Gulp task to create a route.
The Dom version is included in the root index file. Right now there 
is no automagic about adding routes etc; @TODO. 

## A basic head and scrolling content layout with nav

Almost all my sites have a fixed header and scrolling content region. 
If this is not your desired system adjust the App component to taste.

## Auth0 for user identity

I've been using Auth0 habitually for my personal projects. It gives you
social login for free (subject to their user agreement). @TODO

## React-md for style 

I use the React Material Design(MD) system for quick and pretty 
UI widgets. Its not a 360 degree solution for everything but it saves
a lot of time for basic dropdowns buttons and inputs. @TODO

# Why?

I'm doing a lot of smaller projects (ADD programmer) and I'm doing the same
boilerplate over and over. Its not useful to do this, and I want to share
some of the economies I've found for quick jumpstarting of projects with others.

Also, I think that Freactal and Bottle are two great solutions that have escaped
notice, and I want to do what I can to promote them. 

## Roadmap

Some  of the things I want to do when this is all stable is:
 
* Add a basic grid/REST/ table scaffolding via a wizard to let you do easy
  bootstrapping of admin/list displays. 
* Include internationalization.
* Include test coverage starters for the Freactal stores. 

Feedback and questions welcome in the Issues section on Github. 

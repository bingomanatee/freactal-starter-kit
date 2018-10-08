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
These stores will override any state in the global state (the one defined
in the App component) so should be namespaced accordingly.

Also the App State is set to store state in Local Storage, and the
templated page states do NOT (by default). If your states don't conflict
with global state you _can_ switch on local storage for them.

https://github.com/FormidableLabs/freactal
https://github.com/bingomanatee/freactal-seed

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
The Dom version is included in the root index file.
The Route switch is in content, but as the guide outlines,
you can have sub-switches in other pages in your app as well.

https://reacttraining.com/react-router/core/guides/philosophy

## A basic head and scrolling content layout with nav

Almost all my sites have a fixed header and scrolling content region.
If this is not your desired system adjust the App component to taste.

## Auth0 for user identity

I've been using Auth0 habitually for my personal projects. It gives you
social login for free (subject to their user agreement). @TODO

## React-md for style

I use the React Material Design(MD) system for quick and pretty
UI widgets. Its not a 360 degree solution for everything but it saves
a lot of time for basic dropdowns buttons and inputs.

https://react-md.mlaursen.com/

## A web based runner

In order to do things like create files in the webapp, I've added a small
(hopefully) Koa stack. If you use this stack to launch the dev app, you can run
admin tasks like creating files in the web app and reloading it on the fly.

Its not necessary for everyday use and development but for the activities in
the admin area, its required. Note it is relevant only for desktop development,
and shouldn't be used for deployed/runtime activity or an API server.

# Why?

I'm doing a lot of smaller projects (ADD programmer) and I'm doing the same
boilerplate over and over. Its not useful to do this, and I want to share
some of the economies I've found for quick jumpstarting of projects with others.

Also, I think that Freactal and Bottle are two great solutions that have escaped
notice, and I want to do what I can to promote them.

## Configuration

This starter kit brings some environmental variables into the client.
Maybe its obvious but, since these will ultimately be exposed to public/client side code
don't publish anything that exposes truly secret values!

the dotenv config will respect your NODE_ENV; so you can have a single `.env` file
or `.env.development`, `.env.production` configurations.

see `lib/config.js` and the `.neutrinorc` file for how these are synchronized.

# The Admin Runner

You can do most of your work directly in the Neutrino app. However there are additional features
you must enable by starting the Neutrino process indirectly.

This app features self-generating UI through an Admin interface. However to enable this
feature you have to start it indirectly through a Koa app that starts the hot-loading UI
in a subprocess and enables code-changing actions through the Koa App. It is called the "Runner".

## Starting the Runner Admin UI

To activate it you must type `yarn runner-start`.

At this point you go to `localhost:7777` in your browser. This opens up the control panel for the runner.
Click on `View UI` (or go to localhost:5000) to view your UI app.

The self-generating app processes are found under the "Admin" tab. 
Right now there is one, the "Wizard Generator."

## Stopping the Runner Admin UI *IMPORTANT*

**WARNING** The runner UI starts multiple processes that won't kill off if you just `control-C` the runner process
in your terminal. To kill these processes you must click the "Stop" button in `localhost:7777`
or go to `localhost:7777/api/stop`.

This will gracefully close out of all the processes the runner creates.

## If termination goes wrong

The Admin UI is still in a very raw state. Keep you eye out for stray node processes;
you may end up having to kill some of them manually.

## Roadmap

Some  of the things I want to do when this is all stable is:

* Add a basic grid/REST/ table scaffolding via a wizard to let you do easy
  bootstrapping of admin/list displays.
* Include internationalization.
* Include test coverage starters for the Freactal stores.

Feedback and questions welcome in the Issues section on Github.

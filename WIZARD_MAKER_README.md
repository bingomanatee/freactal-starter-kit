# Wizard Maker

The wizard maker is the first instance of dynamic page creation.
The goal is to make instance sites at least partially self-administering,
and to create a suite of features that allow the pages
to be created (or at least initialized) using an admin frontend.

## Admin Mode and the Runner

Tha Admin depends on a small API to execute, as 
it must call file-changing scripts through the KOA "Runner"
api. The runner changes and creates React files, 
mainly through gulp scripts.

In some situations the runner must kill and restart the UI.
Because of this, instead of calling `yarn start` to initialize
the UI, call `yarn runner-start`. This will launch the 
KOA API the admin needs to run, and will start a cluster
process that in turn launches (and in some cases kills and re-launches)
the React development server/Hot Loader.


The React pages that interface with Admin Mode 
are only accessible when a specific environmental
variable, `ADMIN_MODE`, is set. This is done automatically by the Runner.
In other situations, the admin and its utilities should not be visible. 
In any case, in production, the APIs it calls won't be available.

## The Admin Control panel

Open `localhost:7777` on your browser

![admin mode](doc/admin_screen.png)

This is the control panel for the Runner. 

### Stopping Admin Mode

Because of this clustering do not directly kill the
Runner process in the terminal. ***This will leave orphan process threads*** 
that you will have to then kill manually. 

instead, go to `localhost:7777` which will have on-screen buttons
including one to **stop** the Runner processes, and all their
sub-processes. Use this button to stop Admin Mode. 

If you terminate admin mode (correctly) the admin page will deactivate 
and "freeze up" its control buttons. 

### The React Dev Server in Admin Mode.

Once you boot up in Admin mode, the React dev server
is available on on `localhost:5000`, which is a link on the Admin 
Page mentioned above: **<u>Open React Page</u>**

If you have to make changes that are deeper than Hot Loading can handle
(for instance in the `.neutrinorc` file), use the admin button to
stop and re-launch the React Dev Server. 

## Running out of admin mode

The site should work fine without admin mode - if you don't want to 
use it to admin 

## The Wizard Interface

The Wizard interface is available under the Admin page:

![admin mode](doc/wizard_creator.png)

This allows you to define one or more panels that will comprise the Wizard,
and the Fields that will go into the wizards' state. 

The wizard when created will be written into the path defined by the filename
at the top of the panel. Panels can be moved, renamed, and deleted using this 
interface. 

### Writing the Wizard 

When you write the wizard, it will create source files for the Wizard and each panel
you have defined into the location you have set in the fileName. 
Note this *may be a destructive process* if you have already created the wizard
before, so either git commit your panels and revert them or better yet, only
run the process once and either change the filename of the wizard or 
change the filename of individual panels. 


The wizard will be added to the `src/pageList.json` file and therefore will be
listed in the home page. Remove it or its route if you don't want it there. 
(if you want to embed it on another page or only access it via links). 

### The WizardController

The Wizard uses a WizardController instance to manage navigation; that class
is in the `src/lib/wizard/WizardController` file( and `..WizardControllerPanel`).
That controller is used both by the Admin to create Wizards, and in the runtime
to track data and state for the Wizard. it has a collection of panels that 
track state and values for the panels, and which panel is active 
(via the `index` property of a WizardController instance).

The Wizard and Panel React components are designed to listen to changes to the
controller and manage their navigation from it. 

### The Switch subcomponent

The Switch subcomponent is a dom based equivalent of the JavaScript "switch" 
command - it selects one of its children based on properties. Its designed
to enable the basic mechanic of the 

@TODO: admin pageList with UI. 

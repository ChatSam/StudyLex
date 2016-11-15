# Alexa library with Typescript

This is the first draft of the backend of the Alexa Skill building 
library backend. I envision jeff/kristin writing a front using some 
drag-n-drop magic that hands us a json file that this library will 
build into a ready to run alexa skill.

# System requirements

1. npm/node
2. `npm install` to get project dependencies
3. global typescript (npm install -g typescript). run `tsc -v` to make
sure you have at least 2.0 (i'm running 2.0.9). if you don't 
have >2.0, let me know.

# Running the code

1. `tsc` in the `pongo` folder. this will compile the typescript in 
the `src` folder into javascript that is dumped in the `dist` folder.
2. `node dist/test.js` to run the simple test i've been using.

# Typescript thoughts

As I wrote this out, I saw this task growing in complexity, and I 
wanted an easier way to manage this complexity -- enter typescript.
Since I used this professionally, 2.0+ has been released, which seems
to add a bunch of good stuff (most notably standardizing the 
definition file repositories onto npm (npm/@types)). 

If you handed me this current code in a professional setting, I'd slap
you and tell you to get back to work. I am barely leveraging any of
the typescript features. Most notably (and awfully) I'm typing most
types as `any`, which is basically telling typescript to abandon all
static typing. This is bad. My first attempt at defining these types
lies in `interfaces.ts` (a file I wrote before I ported this to 
typescript). My next step is to actually start using these types, but
I wanted to get something out the door that built and ran first. 

# todos

1. Lots of todos exist in `pongo/todos`. 
2. Find/make a typings file for machina
3. integrate gulp (maybe?)
4. integrate immutable.js


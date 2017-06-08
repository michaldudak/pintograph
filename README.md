# Pintograph simulator

This is a pintograph simulator inspired by [Alfred Hoehn's](https://www.youtube.com/user/alfredhoehn) machines.

## Usage
See it in action on https://michaldudak.github.io/pintograph.
Currently the GUI allows to set several parameters of the drives - radius and rotation speed. More customization options are to come.
To start, simply press the **Run** button. If you'd like to see the pintograph drives and arms, select the **Show overlay** checkbox.
Each subsequent press in the **Run** button speeds up the animation. The **Run faster** button makes it even faster. The **Step** button advances the animation by just one step (the animation has to be paused to be able to see its effect).
The **Pause** and **Clear** buttons are self-explanatory, I guess.
However you may download a copy of the project and change the parameters in JavaScript file (aim for `setup.js`) by yourself. The `examples.md` file contains several exemplary setups.

It looks the best in Firefox. Chrome renders more jagged lines.

## Acknowledgements
Kudos to [Fran McConville](http://www.fxmtech.com/harmonog.html) for a pintograph description and a spreadsheet with calculations. I made several changes to the original calculation methods but it was a huge help for me.

## What's next
The ultimate goal is to allow to build the complete pintograph using the GUI. Hopefully, I'll find some time to achieve this ;)

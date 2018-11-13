/*
** This script is intended to be used with Photoshop to resize images and standarize the size of the images in batches
** cause hell no i ain't doing this to hundreds of images one by one
** the standarized size is 500px X 500px in 72resolution, standrized to the current roots file.
**
** SETUP
** 
** PART 1
** 1) Download this script.
** 2) Put images all in a folder.
** 3) MAKE A COPY OF THE FOLDER. We will be making the changes to images in one folder, the other will be backup.
** 
** PART 2
** 1) Open up an image from the folder of images you intend to change.
** 2) Open the "Actions" window. Window > Action
** 3) "Create new Action" - It is on the bottom of the actions window, the icon looks just like the new layers one.
** 4) Name the action, and press record.
** 5) File > Scripts > Browse...
** 6) Locate this script on that browse menu, and press open. (once you press open, your image should be resized)
** 7) File > Save As
** 8) Format = JPEG
** 9) "save"
** 10) "replace"
** 11) The JPEG options window should pop up,set quality to 12
** 12) "OK"
** 13) Press the little square on the bottom of the action bar, this will stop the action recording.
** 14) ok done! you are now set up and ready to use
**
** TO USE
**
** 1) In Photoshop, File > Automate > Batch...
** 2) Under "Play" on the top left, select the name of the action you recorded eariler
** 3) Underneath that, choose the source folder (This should be the folder with the images you want to change)
** 4) Underneath that, check both options that begins with "suppress", and leave the other two unchecked
** 5) Underneath that, for erros, set log errors to files, and pick a destination of your choice.
** 6) On the center top, for Destination, select "Save and Close"
** 7) Double check everything, and then press "OK". 
** 8) Wait till it finishes and then you're done!
**
** by abchan
*/

//=================================================================
//setting up the ruler as working with pixels

// store current unit value
var userPrefUnits = app.preferences.rulerUnits;

// change to pixels if not pixels
if(userPrefUnits !== Units.PIXELS){
  app.preferences.rulerUnits = Units.PIXELS;
}

//==================================================================
//this makes the active image a square, based on whichever length is the shorter
if(activeDocument.width > activeDocument.height) {
  activeDocument.resizeCanvas(activeDocument.height, activeDocument.height);
}
else {
  activeDocument.resizeCanvas(activeDocument.width, activeDocument.width);
}
activeDocument.resizeImage(500, 500, 72);

//===================================================================
//restoring back to previous ruler preferences
if(userPrefUnits !== Units.PIXELS){
  app.preferences.rulerUnits = userPrefUnits;
}

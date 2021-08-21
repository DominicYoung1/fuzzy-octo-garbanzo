# fuzzy-octo-garbanzo
Recipe book that produces recipes based on user input of given ingredients.


## Planning Development
Question: How do we want to tackle doing the stuff?

### Tasks:

#### Frontend
  + Add a page that shows all recipes. (1.6.9)
  + We need to make a page where you can input recipes. (1)
  + A page where you can input what ingredients you have and submit all at once (5)
  + A page to show what dishes match your ingredients and select a dish. (8)
  + A page to show what ingredients you are missing from selected dishes. (10)

#### Backend
  + We will need to figure out our login/signup system for users (?)
  + We need a way to store recipe data (2)
  + A way to look up the ingredients for a given recipe (4.2.0)
  + A way to tabulate ingredients already owned by the user (6)
  + A way to serve up a list of recipes that satisfy all the inputted ingredients (7)
  + A way to present what ingredients are missing from multiple recipes (9)
  + A way to submit new recipes we want the backend to store and have as options. (3)


// ON THE DOCKET: More cleanup: Populate cookbook page on login, editing and deleting recipes updates backend, add the ability to filter recipes by ingerdient. 

// CLEANUP FOR NEXT: A full run through to search for issues related to
// changing our recipe/RecipePayload types
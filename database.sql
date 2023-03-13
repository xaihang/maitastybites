
CREATE TABLE "user" ( 
    "id" SERIAL PRIMARY KEY, 
    "username" VARCHAR(255), 
    "email" VARCHAR(255), 
    "password" VARCHAR(255) 
    ); 

CREATE TABLE "recipe" (
     "recipeID" SERIAL PRIMARY KEY, 
     "recipename" VARCHAR(255), 
     "description" VARCHAR(255),
     "ingredients" TEXT, 
     "direction" TEXT, 
     "url" TEXT, 
     "id" INT REFERENCES "user"
     ); 

CREATE TABLE "save" (
     "saveID" SERIAL PRIMARY KEY, 
     "id" INT REFERENCES "user", 
     "recipeID" INT REFERENCES "recipe"
     ); 

CREATE TABLE "comments" (
     "commentID" SERIAL PRIMARY KEY, 
     "recipeID" INT REFERENCES "recipe", 
     "id" INT REFERENCES "user", 
     "comment" TEXT 
     );


-- ! the relationships between each table in the ERD:
--     * the user table has a one-to-many relationship with the recipe table. 
--         (means that a user can have many recipes, but each recipe belongs to only one user)

--     * the recipe table has a many-to-many relationship with the user table through the save table. 
--        (means that a recipe can be saved by many users, and a user can save many recipes)

--     * the recipe table has a one-to-many relationship with the comments table. 
--         (means that a recipe can have many comments, but each comment belongs to only one recipe)

--     * the user table has a one-to-many relationship with the comments table. 
--         (means that a user can make many comments, but each comment belongs to only one user)

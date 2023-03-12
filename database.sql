
CREATE TABLE "user" ( 
    "id" SERIAL PRIMARY KEY, 
    "username" VARCHAR(255), 
    "email" VARCHAR(255), 
    "password" VARCHAR(255) 
    ); 

CREATE TABLE "recipe" (
     "recipeID" SERIAL PRIMARY KEY, 
     "title" VARCHAR(255), 
     "ingredients" TEXT, 
     "directions" TEXT, 
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







--! EXPORTED FROM https://dbdesigner.page.link/dPM6zzfTn7E3DeE28  
 CREATE TABLE "public.user" (
	"userID" serial NOT NULL,
	"username" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	CONSTRAINT "user_pk" PRIMARY KEY ("userID")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "public.recipes" (
	"recipeID" serial NOT NULL,
	"userID" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"ingredients" varchar(255) NOT NULL,
	"instructions" varchar(255) NOT NULL,
	"url" TEXT(1000),
	CONSTRAINT "recipes_pk" PRIMARY KEY ("recipeID")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "public.save" (
	"saveID" serial NOT NULL,
	"userID" integer NOT NULL,
	"recipeID" integer NOT NULL,
	CONSTRAINT "save_pk" PRIMARY KEY ("saveID")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public.comments" (
	"commentID" serial NOT NULL,
	"recipeID" integer NOT NULL,
	"userID" integer NOT NULL,
	"comment" TEXT NOT NULL,
	CONSTRAINT "comments_pk" PRIMARY KEY ("commentID")
) WITH (
  OIDS=FALSE
);


ALTER TABLE "recipes" ADD CONSTRAINT "recipes_fk0" FOREIGN KEY ("userID") REFERENCES "user"("userID");

ALTER TABLE "save" ADD CONSTRAINT "save_fk0" FOREIGN KEY ("userID") REFERENCES "user"("userID");
ALTER TABLE "save" ADD CONSTRAINT "save_fk1" FOREIGN KEY ("recipeID") REFERENCES "recipes"("recipeID");

ALTER TABLE "comments" ADD CONSTRAINT "comments_fk0" FOREIGN KEY ("recipeID") REFERENCES "recipes"("recipeID");
ALTER TABLE "comments" ADD CONSTRAINT "comments_fk1" FOREIGN KEY ("userID") REFERENCES "user"("userID");



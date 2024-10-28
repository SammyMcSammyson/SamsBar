Step 1 - Cry 
Step 2 - Planning 
    - Concept and problem domain
    - Wireframe
    - Database Schema
        - Need min 2 tables - Users and posts 
        - one to many - foregin key is in the posts
        - Foregn key should always be in many table 
            - Your foreign key in the many table should refrence the clerk_id column in the one table

Step 3 - Set up Authorisation 
Step 4 - Step up Routes 

🎯 Set up user sign-up and user login using Clerk. Yes
🎯 Create and display an error page if the user visits a user profile that doesn’t exist. No - just could not make it work
🎯 Use 1 or more Radix UI Primitive or something similar (e.g. use of another library to enhance UX). Yeah - alot of help was needed and basically used stackexchange.
🎯 Enable users to create a user profile, and input profile information (such as a user biography) using a form. Users and user information should be stored in their own table in the database and handled with an appropriate route (e.g. /user/[userId]). yeah
🎯 Enable users to create posts associated with their Clerk userId. Posts should be displayed on the user’s profile page. Yeah

🏹 Allow users to view other profiles directly from posts they see on the global timeline. Yeah 
🏹 Let users follow each other by establishing a follower and followee relationship between profiles. NO
🏹 Enable users to like posts by linking their user_id to the liked_post in a junction table. Yeah
🏹 Ensure that a user’s biography cannot be left blank. If a user logs in without one, prompt them to add this information. Yeah.

I spent a lot of time on this since it actually is relevant to my life since I am oppening a pop up hostel in Decemebr for 2 months. I hit the main goals. Will keep changing and adding to this. 
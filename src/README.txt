ECS522U - Graphical User Interfaces
Lab 3 - Group 4
Team Members:

Name             - StudentID - Special Notes

Abdullah Al Asif - 200794417
Lawko Saman	 - 200325473 
Leena Neyazi     - 200201188

Instructions for running the project:

1. Install node from by downloading the installer from https://nodejs.org/en/download/

2. Check if you have node installed by typing the commands below:
	node -v
	npm -v
	
	You should be getting something similar to v16.14.0 for node and 8.3.1 for npm

3. Get an API key from OpenWeatherMap at https://openweathermap.org/ and put the api key at line 37 of App.js as a String

4. Go to your desired destination where you want to make the project and then run the command
	npx create-react-app weather-app

5. Go to the project folder named weather-app, then open the src folder, then delete the existing files
made while creating the project.

6. Copy the contents of our src folder and paste them in the new project's src folder.

7. Open a terminal/command line in the weather app folder. You can do this in Windows 10/11 by going 
back to the folder which contains the weather-app file, then Shift+Right Click on the weather-app folder
and then select option: Open Command Window (or Powershell/other terminal) here.

8. In the terminal, enter the command: npm install react-router-dom@5
and press Enter. This will install the React Router v5 files if required by your system, as our project
uses React Router v5.

9. Then to start the development server (which will run the application), type in the following in the 
terminal: npm start

10. The previous step will open the application in your browser. Since our project is designed based on
the screen size for iPhone 12/13 Pro Max iOS 14.6, to get the best experience, kindly do the following:
- Right click on the browser
- Click on Inspect Element
- Click on the "Responsive Design Mode" icon on Firefox (At the top right of inspect window) and select
  iPhone 12/13 Pro Max iOS 14.6 
  -> or on Chrome click on device toolbar from inspect window and set resulution 428x926px

11. Once previous step is completed, the Application is ready to use!

** If API Key is not given, the program will not work

Thank you.
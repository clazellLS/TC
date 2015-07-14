# TC
The tote calculater runs from the command line.
There are two ways to run the app, the mongoApp will use a mongoDB hosted on mongolab for data persistence.
The normal app will not persist data.

To run it navigate to the folder and use npm to install any dependancies.

	"npm install"
	
then you can run the app:

	"node mongoApp.js"
	
There may be a firewall issue connectiong to the database depending on your systems settings, incase you
are unable to connect to the database just use the normal app.

	"node app.js"

Enter input into the command line, the app will accept input until the result has been read.
Input can be copy and pasted or entered one line at a time.
Accepted input:

#TESTS
Tests are run with.

	"mocha test.js""

# INPUTS
All bet inputs should be in the format:

Bet:<Bet Type>:<selection/s>:<>Stake
Examples:

Place a bet of $3 for the number one horse to place first:

Bet:W:1:3

Place a bet for $31 for the number one horse to place in the top three:

Bet:P:1:31

Place an exacta bet for $51 for the number three horse to place first and the number 2 horse to place second

Bet:E:3,2:51

The result input needs to be the last input and should be formatted:

result:winning number:Second number:Third number

Examples:

Result:2:3:1


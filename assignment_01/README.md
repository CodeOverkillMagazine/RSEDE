# Assignment 1

## CSU Transfer Model Curriculum Importer

The objective is to write a command-line utility that can fetch data via ajax, 
and write that data to a MySQL database and to a JSON file.

### Environment

We are using Node v8 for development and production environments.

### Fetch TMC Data

https://eswlprdp.calstate.edu/tmcp/faces/TmcSchP?_afrWindowMode=0&_afrLoop=6831008501360200&_adf.ctrl-state=wp3wb5hqw_4

The above link goes to a site that displays data we need to download. It fetches 
data via ajax and populates an HTML table. It fetches data in chunks as you 
scroll. We need to weite a server-side utility that can fetch all of this data 
and save it to a database table.

The utility does not need any input parameters; the above URL fetches exactly 
the data we need.

I have no preference what libraries you use for fetching.

### Database Storage

We are using the MySQL database, and we are using the Objection.js and knex 
libraries. We would like you to define the table using migrations.

### Architecture

We would like this to be a command-line utility. When it is run, it should
clear the existing database data, populate the table with fresh data from the
site, then it should write all the data to a JSON file named "TMC.json", then
it should exit.

### Additional note

We would like the "TMC" field to be stored as a string rather than an integer, for compatibility purposes.
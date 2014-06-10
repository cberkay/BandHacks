var express = require("express"),
	app = express(),
	logfmt = require("logfmt"),	
	path = require('path'),
    fs = require('fs'),
    pg = require('pg');
	passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy;

	
app.use(logfmt.requestLogger());

passport.use(new FacebookStrategy({
	clientID: "654765054608952",
	clientSecret: "32f8a00e838b2c8aa722eafb936b684c",
	callbackURL: "http://localhost:5000/auth/facebook/callback"
	},
	function(accessToken, refreshToken, profile, done) {
//		client.query('SELECT id FROM "Users"', function (err, result) {
//			for (var i = 0; i < result.rows.length; i++) {
				//var row = result.rows[i];
				//console.log(row.name);
//			}
//		});
	}
));

app.get("/", function(req, res) {
	var connectionString = "postgres://postgres:root@localhost/postgres";
	//var connectionString = "postgres://lqhwwuagklpoin:AQ_wXUpcw3s6eJXQDdW__CWOj8@ec2-54-197-237-120.compute-1.amazonaws.com:5432/d51f19hl0iptdt";
	pg.connect(connectionString, function(err, client) {
		if (err) {
			res.end("ERR");
			console.dir(err);
		}
		else {
//			client.query('INSERT INTO "Users" (name) VALUES($1)',
//            ["calm_reviewer"]);
			//client.query('CREATE TABLE Users (name VARCHAR(40) NOT NULL, email VARCHAR(40) NOT NULL, username VARCHAR(40) NOT NULL, provider VARCHAR(40) NOT NULL, facebook VARCHAR(40)) NOT NULL');
			//client.query('INSERT INTO "Users" (name, email, username, provider, facebook) VALUES (a, b, c, d, e)');
/* 			client.query('SELECT name FROM "Users"', function (err, result) {
 				for (var i = 0; i < result.rows.length; i++) {
					var row = result.rows[i];
					console.log(row.name);
				}
            }); */
			client.query('SELECT name FROM "Users" WHERE name=$1', ["1calm_reviewer"], function (err, result) {
				if (err) console.log (err);
				else {
					if (result.rows[0]) console.log(result.rows[0]); 
					else console.log("nope");
				}
			});
			res.write("NO ERR");
			res.end();
		}
	});
});



app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {});
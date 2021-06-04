const db = require('./database');
const mail = require('./mail');
const files = require('./storage');
const bcrypt = require("bcryptjs");
const pages = require('../routes/pages');
const admin = require('../src/admin');
const teacher = require('../src/teacher');
const student = require('../src/student');


let userid = null;


exports.get_started = async (req, res) => {

    try {
        const { first_name, last_name, email, phone, username, password, institution_name, institution_code, description, address, country, zip, state, plan_name, plan_duration, start_date, end_date, amount } = req.body;

        if (!first_name || !last_name || !email || !phone || !username || !password || !institution_name || !institution_code || !description || !address || !country || !zip || !state || !plan_name || !plan_duration || !start_date || !end_date || !amount) {
            return res.status(400).render('Home_pages/get_started', {
                message: 'Please Fill all the details',
                messageClass: 'alert-danger'
            });
        }
        else {
            db.query(`Select username from Admin where username = ?`, [username], async (error, results) => {
                if (error) {
                    console.log(error);
                }
                else {
                    if (results.length > 0) {
                        return res.status(401).render('Home_Pages/get_started', {
                            message: 'This username is already taken.',
                            messageClass: 'alert-danger'
                        });
                    }
                    else {
                        db.query(`Select inst_name from Institution where inst_code = ?`, [institution_code], async (error, results) => {
                            if (error) {
                                console.log(error);
                            }
                            else {
                                if (results.length > 0) {
                                    return res.status(401).render('Home_Pages/get_started', {
                                        message: 'This institution code is already taken.',
                                        messageClass: 'alert-danger'
                                    });
                                }
                                else {
                                    let hashedpassword = await bcrypt.hash(password, 10);
                                    db.query(`insert into Institution set ?`, {
                                        inst_name: institution_name,
                                        inst_code: institution_code,
                                        description: description,
                                        address: address,
                                        country: country,
                                        zip_code: zip,
                                        state: state
                                    }, (err, result) => {
                                        if (err) {
                                            console.log(err);
                                        }
                                        else {
                                            db.query(`insert into Admin set ?`, {
                                                username: username,
                                                password: hashedpassword,
                                                fname: first_name,
                                                lname: last_name,
                                                contact: phone,
                                                email: email,
                                                inst_code: institution_code
                                            }, (err, result) => {
                                                if (err) {
                                                    console.log(err);
                                                }
                                                else {

                                                    db.query(`insert into Plans set ?`, {
                                                        plan_name: plan_name,
                                                        plan_duration: plan_duration,
                                                        start_date: start_date,
                                                        end_date: end_date,
                                                        amount: amount,
                                                        inst_code: institution_code
                                                    }, (err, result) => {
                                                        if (err) {
                                                            console.log(err);
                                                        }
                                                        else {
                                                            mail(email, 'Welocme to scholarSpace', `<body style="background-color:#F0DFDE;">

                                                                        <h1><center style="font-size: 50px; font-family: 'Josefin Sans', sans-serif;
                                                                        font-family: 'PT Sans Caption', sans-serif;">
                                                                        WELCOME TO <h2 style="color:#169179; font-family: 'Josefin Sans', sans-serif;
                                                                        font-family: 'PT Sans Caption', sans-serif;">"scholarSPACE"</h2></center></h1>
                                                                        
                                                                        <hr>
                                                                        
                                                                        <center><img src="https://images.pexels.com/photos/3999538/pexels-photo-3999538.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" ></center>
                                                                        
                                                                        <h3><center style = "font-family:'PT Sans Caption', sans-serif;font-size: 30px;">
                                                                        We're glad you're here, ${username} </center></h3>
                                                                        
                                                                        <p><center style="font-family: 'Josefin Sans', sans-serif;
                                                                        font-family: 'PT Sans Caption', sans-serif;">
                                                                          We're confident that scholarSpace will help you in managing your college work. We aim to provide you a user-friendly responsive system, where you can manage your projects, events and professional information. 
                                                                          <br>
                                                                          Thank you for subscribing to our ${plan_name} plan, you can update your plans in future.
                                                                          <br>
                                                                          Here is your unique code for registered institution: ${institution_code}. Your login credentials for ${institution_name} are as folllows.
                                                                        </center></p>
                                                                        
                                                                        <p><center style="font-family: 'Comfortaa', cursive;
                                                                        font-family: 'Josefin Sans', sans-serif;
                                                                        font-family: 'PT Sans Caption', sans-serif;
                                                                        font-family: 'Rajdhani', sans-serif;">
                                                                        <b>Username:</b> ${username}<br>
                                                                        <b>Password:</b> ${password}
                                                                        </center></p>
                                                                        
                                                                        <p><center style="font-family: 'Josefin Sans', sans-serif;
                                                                        font-family: 'PT Sans Caption', sans-serif;">
                                                                          We'd love to know why you signed up for. Your feedback helps us to make sure that we're elivering exactly what customers want. Just hit reply and let us know.
                                                                          <br>
                                                                          Reply to this email if you have any questions. We're here to help.
                                                                        </center></p>
                                                                        
                                                                        <br>
                                                                        
                                                                        <h3><center><button type="button" style="background-color:#169179; color:#fff; font-family:'PT Sans Caption', sans-serif;font-size: 20px;"><a href = "http://127.0.0.1:5000/login" style=" color:#fff" >LogIn to your account</a></button></center>
                                                                        </h3>
                                                                        
                                                                        <br>
                                                                        
                                                                        <h6><center style="font-family: 'Josefin Sans', sans-serif;
                                                                        font-family: 'PT Sans Caption', sans-serif;
                                                                        font-family: 'Rajdhani', sans-serif;">Made with love by Nitant Gupta, Saumya Patel, Prakhar Saxena for a better college organisation.</center></h6>
                                                                                      
                                                                        </body>              `);

                                                            return res.status(401).render('Home_Pages/get_started', {
                                                                message: 'Successfully regsitered with your institution',
                                                                messageClass: 'alert-success'
                                                            });

                                                        }
                                                    }
                                                    );
                                                }
                                            }
                                            );
                                        }
                                    }

                                    );
                                }
                            }

                        });
                    }
                }
            });
        }
    }
    catch (error) {
        console.log(error);
    }
}


exports.signUp = async (req, res) => {

    try {
        const { institution_code, title, first_name, last_name, username, password, dob, gender, address, country, zip, state, phone, email } = req.body;

        if (!title) {
            return res.status(400).render('Home_Pages/signUp', {
                message: 'Select your title first',
                messageClass: 'alert-danger'
            });
        } else if (!institution_code || !first_name || !last_name || !username || !password || !dob || !gender || !address || !country || !zip || !state || !phone || !email) {
            return res.status(400).render('Home_Pages/signUp', {
                message: 'Please Fill all the details',
                messageClass: 'alert-danger'
            });
        }
        else {
            db.query(`Select inst_code from institution where inst_code = ?`, [institution_code], async (error, results) => {
                if (error) {
                    console.log(error);
                }
                if (results.length == 0) {
                    return res.status(401).render('Home_pages/signUp', {
                        message: "Institution isn't registered.",
                        messageClass: 'alert-danger'
                    });
                }
                else {
                    db.query(`Select username from ${title} where username = ?`, [username], async (error, results) => {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            if (results.length > 0) {
                                return res.status(401).render('Home_Pages/signUp', {
                                    message: 'This username is already taken.',
                                    messageClass: 'alert-danger'
                                });
                            }
                            else {
                                let hashedpassword = await bcrypt.hash(password, 10);

                                db.query(`Select email from admin where inst_code = ?`, [institution_code], async (error, results) => {
                                    if (error) {
                                        console.log(error);
                                    }
                                    else {
                                        var e_Admin = results[0].email;
                                        console.log(e_Admin);

                                        db.query(`insert into ${title} set ?`, {
                                            inst_code: institution_code,
                                            fname: first_name,
                                            lname: last_name,
                                            username: username,
                                            password: hashedpassword,
                                            dob: dob,
                                            gender: gender,
                                            address: address,
                                            country: country,
                                            zip_code: zip,
                                            state: state,
                                            contact: phone,
                                            email: email,
                                        }, (err, result) => {
                                            if (err) {
                                                console.log(err);
                                            }
                                            else {
                                                mail(e_Admin, 'Confirmation mail for members registration', `<body style="background-color:#F0DFDE;">
        
                                                    <h1><center style="font-size: 50px; font-family: 'Josefin Sans', sans-serif;
                                                    font-family: 'PT Sans Caption', sans-serif;">
                                                    WELCOME TO <h2 style="color:#169179; font-family: 'Josefin Sans', sans-serif;
                                                    font-family: 'PT Sans Caption', sans-serif;">"scholarSPACE"</h2></center></h1>
                                                    
                                                    <hr>
                                                    
                                                    <center><img src="https://images.pexels.com/photos/3999538/pexels-photo-3999538.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" ></center>
                                                    
                                                    
                                                    <h2><center style = "font-family:'PT Sans Caption', sans-serif;font-size: 30px;">
                                                    Someone registered in on our website under your institution </center></h2>
                                                    
                                                    
                                                    <p><center style="font-family: 'Josefin Sans', sans-serif;
                                                    font-family: 'PT Sans Caption', sans-serif;">
                                                      We're here to inform you, that someone signed up in the institution, you registered on "scholarSPACE". 
                                                      <br>
                                                      The login credentials for ${first_name} ${last_name} registered as ${title} are as folllows.
                                                    </center></p>
                                                    
                                                    <p><center style="font-family: 'Comfortaa', cursive;
                                                    font-family: 'Josefin Sans', sans-serif;
                                                    font-family: 'PT Sans Caption', sans-serif;
                                                    font-family: 'Rajdhani', sans-serif;">
                                                    <b>Username:</b> ${username}<br>
                                                    
                                                    </center></p>
                                                    
                                                    <p><center style="font-family: 'Josefin Sans', sans-serif;
                                                    font-family: 'PT Sans Caption', sans-serif;">
                                                        If ${first_name} ${last_name} is not a ${title} of your institution, you can reply back to this email or contact us to suspend the given account and its registration under your institution. If not, kindly ignore.<br>
                                                        <br>
                                                     Your feedback helps us to make sure that we're elivering exactly what customers want. Just hit reply and let us know.
                                                      <br>
                                                      Reply to this email if you have any questions. We're here to help.
                                                    </center></p>
                                                    
                                                    <br>
                                                    
                                                    <h3><center><button type="button" style="background-color:#169179; color:#fff; font-family:'PT Sans Caption', sans-serif;font-size: 20px;"><a href = "http://127.0.0.1:5000/login" style=" color:#fff" >LogIn to your account</a></button></center>
                                                    </h3>
                                                    
                                                    <br>
                                                    
                                                    <h6><center style="font-family: 'Josefin Sans', sans-serif;
                                                    font-family: 'PT Sans Caption', sans-serif;
                                                    font-family: 'Rajdhani', sans-serif;">Made with love by Nitant Gupta, Saumya Patel, Prakhar Saxena for a better college organisation.</center></h6>
                                                                  
                                                    </body>            `);

                                                if (result.affectedRows == 1) {
                                                    console.log("Inserted successfully in dataset.")
                                                    res.redirect("/login");
                                                    return;
                                                }
                                                else {
                                                    console.log(err)
                                                }
                                            }
                                        }
                                        );
                                    }
                                });
                            }
                        }

                    });
                }
            });
        }
    }
    catch (error) {
        console.log(error);
    }
}


exports.login = async (req, res) => {

    try {
        const { type, username, password, Home, Home2 } = req.body;

        if (!username) {
            return res.status(400).render('Home_pages/logIn', {
                message: 'Please Fill all the details',
                messageClass: 'alert-danger'
            });
        }
        else {
            db.query(`select * from ${type} where username=?`, [username], (error, results) => {
                if (error) {
                    console.log(error);
                }
                if (results.length == 0) {
                    return res.status(401).render('Home_pages/logIn', {
                        message: "User Doesn't exist",
                        messageClass: 'alert-danger'
                    });
                }
                else {

                    bcrypt.compare(password, results[0].password, (err, re) => {
                        if (err) {
                            console.log(err);
                        }
                        if (!re) {
                            return res.status(401).render('Home_pages/logIn', {
                                message: "Password is Incorrect",
                                messageClass: 'alert-danger'
                            });
                        }
                        else {
                            userid = results[0].username;
                            // var src = null;
                            pages.setUser(userid);
                            admin.setUser(userid);
                            student.setUser(userid);
                            teacher.setUser(userid);
                            console.log("Login successfully.")
                            if (type == "admin") {
                                res.redirect("/admin_home");
                            }
                            else if (type == "teacher") {
                                res.redirect("/teacher_home");
                            }
                            else {
                                res.redirect("/student_home");
                            }
                        }
                    });
                }
            });
        }
    }
    catch (error) {
        console.log(error);
    }

}


exports.contact = async (req, res) => {

    const { fname, lname, email, msg } = req.body;

    db.query(`insert into contact_form set ?`, {
        fname: fname,
        lname: lname,
        email: email,
        message: msg
    }, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            if (result.affectedRows == 1) {
                console.log("Inserted successfully in dataset.")
                res.redirect("/");
                return;
            }
            else {
                console.log(err)
            }
        }
    }
    );
}



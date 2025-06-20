const User=require("../models/user");

module.exports.renderSignUpPage=(req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.signUp=async (req,res)=>{
    try{
        let{ username,email,password}=req.body;
        const newUser=new User({email,username});
        const registeredUser= await User.register(newUser,password);
        console.log(registeredUser);

        req.login(registeredUser,(err)=>{
            if(err){
                next(err);
            }
            req.flash("success","Welcome to Wanderlust");
            res.redirect("/listings");
        });
        }catch(err){
            req.flash("error",err.message);
            res.redirect("/signup");
    }

};

module.exports.renderLoginPage=(req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login=async (req,res)=>{
    req.flash("success","Welcome back to Wanderlust!");
    let redirectUrl=res.locals.redirectUrl;
    if(!redirectUrl){
        res.redirect("/listings");
    }else{
        res.redirect(redirectUrl);
    }
};

module.exports.logout=async (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Logged you out");
        res.redirect("/listings");
    });
}
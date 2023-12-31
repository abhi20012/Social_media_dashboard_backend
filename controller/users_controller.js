const User = require('../models/user');

module.exports.profile = function(req, res){
	return res.render('user_profile', {
		title:"Profile"
	})
}

module.exports.signUp = function(req, res){
	if(req.isAuthenticated()){
		return res.redirect('/users/profile')
	}
	return res.render('user_sign_up', {
		title:"Signup"
	})
}

module.exports.signIn = function(req, res){
	if(req.isAuthenticated()){
		return res.redirect('/users/profile')
	}
	return res.render('user_sign_in', {
		title:"SignIn"
	})
}

module.exports.create = async function(req, res){
	if(req.body.password != req.body.confirm_password){
		return res.redirect('back')
	}

	try {
		const user = await User.findOne({email: req.body.email});

		if(!user){
			User.create(req.body);
			return res.redirect('/users/sign-in');
		}else {
			return res.redirect('back');
		}
	} catch (error) {
		console.log("Error in finding user", error);
	}


}

module.exports.createSession = function(req, res){
	console.log("User is signed in")
	return res.redirect('/');
}

module.exports.destroySession = function(req, res){
	req.logout(function(err){
		if(err){
			return next(err);
		}

		return res.redirect('/users/sign-in');
	});
}
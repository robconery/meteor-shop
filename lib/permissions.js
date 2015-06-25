isAdmin = function(){
  var loggedInUser = Meteor.user();
  var result = false;
  if(loggedInUser){
    if (Roles.userIsInRole(loggedInUser, ['Administrator'])){
      result = true;
    }
  }
  return result;
};
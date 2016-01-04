angular.module('epic', [])
  .controller('searchCtrl', function($scope, $http){
    $http({method: 'GET', url: '../data/search.json',
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
            }}).success(function(data){
          $scope.items = data;
          console.log($scope.items);
       });
  })
  .controller('HomeCtrl', function($scope, $http){
    $scope.title = "Next Ready Patient";
    $scope.name = "Schrute, Dwight";
    $scope.pulse = "72";
    $scope.bloodp = "123 / 89";
    $scope.rov = "Pain in Left Ankle";
    $scope.color = "#8EE336";
    $scope.gender = "Male,";
    $scope.age = "32";
    $scope.image = "http://www.eonline.com/eol_images/Entire_Site/20080508/300.willson.office.050808.jpg";
    $http({method: 'GET', url: 'data/patients.json',
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
            }}).success(function(data){
          $scope.patients = data;
          //console.log($scope.patients);
    });
    $scope.hoverIn = function(index){
      $scope.title = $scope.patients[index].title;
      $scope.image = $scope.patients[index].image;
      $scope.bloodp = $scope.patients[index].bloodp;
      $scope.pulse = $scope.patients[index].pulse;
      $scope.rov = $scope.patients[index].rov;
      $scope.name = $scope.patients[index].name;
      $scope.color = $scope.patients[index].color;
      $scope.gender = $scope.patients[index].gender;
      $scope.age = $scope.patients[index].age;
    };
    $scope.hoverOut = function(){
      $scope.title = "Next Ready Patient";
      $scope.name = "Schrute, Dwight";
      $scope.pulse = "72";
      $scope.bloodp = "123 / 89";
      $scope.rov = "Pain in Left Ankle";
      $scope.color = "#8EE336";
      $scope.gender = "Male,";
      $scope.age = "32";
      $scope.image = "http://www.eonline.com/eol_images/Entire_Site/20080508/300.willson.office.050808.jpg";
    };
    $scope.patmsg = {
      'name' : 'Sean Kravitz',
      'sexage' : 'Male, 33 year old',
      'dx' : 'Sinusitis',
      'medication' :'No Medications',
      'msg' : 'Sean called about a rash on his left leg. He is going on a trip this weekend.',
      'image' : 'http://www.oliveoilsource.com/sites/default/files/stories/Tom-Mueller.a_0.jpg'
    };
    $scope.patmsgs = [
      {
        'name' : 'Ron Libowitz',
        'sexage' : 'Male, 47 year old',
        'dx' : 'GERD',
        'medication' :'Zegetin',
        'msg' : "Ron called saying his acid reflux isn't getting better. He is asking to see you again",
        'image' : 'http://4.bp.blogspot.com/-a8ndvOIJn0M/UVI5Edq3-aI/AAAAAAACru8/LEeetksUqiU/s1600/Chris+Passport.jpg'
      },
      {
        'name' : 'Steph Tull',
        'sexage' : 'Female, 51 year old',
        'dx' : 'Diabetes',
        'medication' :'Insulin Injections',
        'msg' : 'Asking if she could switch to a new cheaper injection',
        'image' : 'http://consciouswealthinstitute.com/wp-content/uploads/2015/04/Justine-Musk.jpg'
      },
      {
        'name' : 'Marc Anderson',
        'sexage' : 'Male, 35 year old',
        'dx' : 'Eye Infection',
        'medication' :'Eyetone',
        'msg' : 'Wants to know if the infection is contagious?',
        'image' : 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/1/000/034/180/2fca843.jpg'
      }
    ]
    $http({method: 'GET', url: 'data/medrefill.json',
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
            }}).success(function(data){
          $scope.refills = data;
          console.log($scope.refills);
    });
    $scope.reject = function(){
      console.log("Medication has been rejected");
      $scope.refills.pop();
    };
    $scope.newpatmsg = function(){
      $scope.patmsg = $scope.patmsgs[Math.floor(Math.random() * (2 + 1)) + 0];
    }
  })
  .filter('searchFor', function(){
	// All filters must return a function. The first parameter
	// is the data that is to be filtered, and the second is an
	// argument that may be passed with a colon (searchFor:searchString)
	return function(arr, searchString){
		if(!searchString){
			return [];
		}
		var result = [];
		searchString = searchString.toLowerCase();
		// Using the forEach helper method to loop through the array
		angular.forEach(arr, function(item){
			if(item.title.toLowerCase().indexOf(searchString) !== -1){
				result.push(item);
			}
    console.log("Found something");
		});

		return result;
    };
  })
  .config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/', {
      templateUrl : 'login.html',
      controller : ''
    }).when('/home', {
      templateUrl :'home.html',
      controller : 'HomeCtrl'
    });
  }])

(function () {
    'use strict';

    angular
        .module('app')
        .controller('booking_controller', function booking_controller($scope,$q,$log,$http,$compile,uiCalendarConfig,$mdDialog) {
   
    
    getBookings();
    $scope.SelectedEvent =null;

    var isFirstTime = true;
    
    $scope.events = [];
    $scope.eventSources = [$scope.events];

      function getBookings(){
        $http.get('/api/booking/',{
      cache:true, 
      params:{}
    }).then(function(data){
      console.log("inside of get request");
      $scope.events.slice(0,$scope.events.length);

      angular.forEach(data.data, function(x){
        console.log(JSON.stringify(x))
        var today = new Date();
        var start = new Date(x.StartDate);
        var end = new Date(x.EndDate);

        $scope.events.push({
            title: x.bookingSubmitter,
            description:x.Description,
            start: new Date(start),
            end: new Date(end),
            time: x.Time,
            allday:true,
            stick:true,
            approved: x.Approved,
            approvedBy: x.ApprovedBy,
            email: x.Email,
            className: ['openSesame'],
            submittedDate:x.submittedDate,
            id:x._id,
            phone:x.Phone
        })
        console.log(JSON.stringify($scope.events));

      })
     
    
  })
      }



    $scope.uiCalendarConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'title',
          center: '',
          right: 'today prev,next'
        },
        eventClick: function(e){ $scope.showAdvanced(e)},
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        eventRender: $scope.eventRender 
      }
    };
         
   	$scope.showAdvanced = function(e) {
			console.log(e);
			var time;
			if(e.time.includes('pm')){
			  time=e.time.parseint();
			}
			
			var startime = new Date(e.start,time);
			
			
    		$mdDialog.show({
     		controller: ['$scope', 'e','$mdDialog', function($scope,e,$mdDialog) {
     		    console.log(e);
            $scope.Name = e.title;
            $scope.Description = e.description;
            $scope.Start= new Date(e.start);
            $scope.Time = e.time;
            $scope.End=new Date(e.end);
            $scope.Email=e.email;
            $scope.id = e.id;
            $scope.approved = e.approved;
            $scope.bool = [true,false];
            $scope.Phone = e.phone;

          $scope.delete= function(id){
				$http.delete('/api/booking/'+id)
					.success(function(res){
						console.log("Successfully deleted!")
						getBookings();
					});
					$mdDialog.hide()
			};


           $scope.update = function(id){
            	var url ='/api/booking/'+id;
              console.log(id);
            	var data = {
            		bookingSubmitter:$scope.Name,
            		Email:$scope.Email,
            		Approved:$scope.approved,
            		Phone:$scope.Phone,
            		Time:$scope.Time,
            		StartDate:$scope.Start,
            		EndDate:$scope.End,
            		Description:$scope.Description
            	}

            	$http.put(url,data).success(function(){
            		getBookings();
            	})
            	.then(function(){
            		console.log("Succesfully updated a Booking");
            	})
            	
            	$mdDialog.hide();
            	

            }





          $scope.cancel = function() {
      		$mdDialog.hide();
      		console.log("closed");
   		 };
            
          }],
      		templateUrl: 'event-popup.partial.html',
      		parent: angular.element(document.body),
      		targetEvent: e,
      		locals:{
      			e:e,
      		},
      		clickOutsideToClose:true,
      		fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    
  };
  $scope.eventRender = function( event, element, view ) { 
        element.attr({'tooltip': event.title,
                     'tooltip-append-to-body': true});
        $compile(element)($scope);
    };
    



    $scope.alertOnEventClick = function( date, jsEvent, view){
        $scope.alertMessage = (date.title + ' was clicked ');
    };

    
   

    /* config object */
   

    

    


     		}


/* EOF */);
})();

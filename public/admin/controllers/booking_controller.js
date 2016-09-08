(function () {
    'use strict';

    angular
        .module('app')
        .controller('booking_controller', function booking_controller($scope,$q,$log,$http,$compile,uiCalendarConfig,$mdDialog) {
   
    
    $scope.SelectedEvent =null;

    var isFirstTime = true;

    $scope.events = [];
    $scope.eventSources = [$scope.events];

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
            description:x.bookingSubmitter,
            start: new Date(start),
            end: new Date(end),
            time: x.Time,
            allday:true,
            stick:true,
            approved: x.Approved,
            approvedBy: x.ApprovedBy,
            email: x.Email,
            className: ['openSesame'],
            submittedDate:x.submittedDate
        })
        console.log(JSON.stringify($scope.events));

      })
     
    
  })



    $scope.uiCalendarConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'title',
          center: '',
          right: 'today prev,next'
        },
        eventClick: function(event){
          $scope.SelectedEvent = event;
        },
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        eventRender: $scope.eventRender 
      }
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

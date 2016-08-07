angular.module('app')
	.directive('currentBooking', function() {
		return {
			restrict: 'E',
			template: '<div>These are the Current Bookings.</div>'
  		};
	});
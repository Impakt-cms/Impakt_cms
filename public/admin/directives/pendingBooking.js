angular.module('app')
	.directive('pendingBooking', function() {
		return {
			restrict: 'E',
			template: '<div>These are the Pending Bookings.</div>'
  		};
	});
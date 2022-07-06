$(document).ready(function () {

    // Initialize select2
    $("#searchTopSelect").select2();
    // $("#searchTopSelect").select2("val", "4");
    // $('#searchTopSelect option:selected').text('Vizag');
    // Read selected option
    // $('#but_read').click(function () {
    //     var username = $('#searchTopSelect option:selected').text();
    //     var userid = $('#searchTopSelect').val();

    //     $('#result').text("id : " + userid + ", name : " + username);
    // });
    $(document).mouseup(function (e) {
        var container = $(".input-inner");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            $('#searchTopSelect').select2('close');
        }
    });





});
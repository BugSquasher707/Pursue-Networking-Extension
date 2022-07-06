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
        let container = $(".input-inner");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            $('#searchTopSelect').select2('close');
        }
    });




    // hide modal on click outside dive 
    // $(document).mouseup(function (e) {
    //     let containerClick = $(".filter-item-1");
    //     let containerHide = $(".date-filter-list");
    //     if (!containerClick.is(e.target) && containerClick.has(e.target).length === 0) {
    //         containerHide.css("max-height", "0px")
    //         containerHide.css("visibility", "hidden")
    //     }
    // });
});
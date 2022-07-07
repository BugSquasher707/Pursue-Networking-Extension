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

    // slider script 
    $('.slider-canban').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: false,
        focusOnSelect: true
    });
    // set dynamic height box 
    let userBoxHeight = $(".user-box").height();
    $(".item-slider-inner").height(userBoxHeight + userBoxHeight / 2);

    // pie donut percentage chart 
    $(function () {

        // Create the chart
        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'circle-chart',
                type: 'pie'
            },
            plotOptions: {
                pie: {
                    shadow: false,
                    point: {
                        events: {
                            mouseOver: function (e) {
                                this.originalRadius = this.graphic.r;
                                this.graphic.animate({
                                    r: this.originalRadius * 1.07
                                }, 200);
                            },
                            mouseOut: function (e) {
                                this.graphic.animate({
                                    r: this.originalRadius
                                }, 200);
                            }
                        }
                    }
                }
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.point.name + '</b>: ' + this.y + ' %';
                }
            },
            series: [{
                name: 'Data',
                data: [
                    ["New Job - Congrats", 18],
                    ["Work Anniversary - Congrats", 9],
                    ["Birthday - Congrats", 7],
                    ["Recently Viewed Profile", 17],
                    ["Message Sequence - Connection Request", 27],
                    ["Message Sequence - Welcome Message", 45],
                    ["Message Sequence - Follow Up", 27],
                    ["Organic Outreach - Comments & Likes", 12],
                    ["Inbound", 17],
                    ["Direct Outreach", 7]
                ],
                size: '100%',
                innerSize: '60%',
                showInLegend: true,
                dataLabels: {
                    enabled: false
                },
                states: {
                    hover: {
                        halo: false
                    }
                },
            }]
        });
        // Render the circle
        chart.renderer.circle('50%', '50%', 130).attr({
            fill: '#fff',
        }).add();
        $(".highcharts-exporting-group").hide();
        $(".highcharts-title").hide();
        $(".highcharts-credits").hide();

    });
});
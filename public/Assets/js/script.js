$(document).ready(function () {
    // Initialize select2
    $("#searchTopSelect").select2();
    $(".select-listing").select2({ minimumResultsForSearch: Infinity });
    // $("#searchTopSelect").select2("val", "4");}
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
        infinite: true,
        dots: false,
        focusOnSelect: false
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

    // calander script 
    $('#calendarMain').evoCalendar({
        sidebarToggler: true,
        sidebarDisplayDefault: false,
        eventListToggler: true,
        eventDisplayDefault: false,
        calendarEvents: [
            {
                id: 'bHay68s', // Event's ID (required)
                name: "New Year", // Event name (required)
                date: "January/1/2022", // Event date (required)
                type: "holiday", // Event type (required)
                everyYear: true // Same event every year (optional)
            },
            {
                name: "Vacation Leave",
                badge: "02/13 - 02/15", // Event badge (optional)
                date: ["February/13/2022", "February/15/2022"], // Date range
                description: "Vacation leave for 3 days.", // Event description (optional)
                type: "event",
            }
        ]
    })
    // second tabs calnader event 
    $('#calanderTab').evoCalendar({
        calendarEvents: [
            {
                id: 'bHay68s', // Event's ID (required)
                name: "New Year", // Event name (required)
                date: "January/1/2022", // Event date (required)
                type: "holiday", // Event type (required)
                everyYear: true // Same event every year (optional)
            },
            {
                id: 'bHay68s', // Event's ID (required)
                name: "New Year Test", // Event name (required)
                date: "January/2/2022", // Event date (required)
                type: "holiday", // Event type (required)
                everyYear: true // Same event every year (optional)
            },
            {
                id: 'bHay68s', // Event's ID (required)
                name: "Event", // Event name (required)
                date: "January/2/2022", // Event date (required)
                type: "event", // Event type (required)
                everyYear: true // Same event every year (optional)
            },
            {
                name: "Vacation Leave",
                badge: "02/13 - 02/15", // Event badge (optional)
                date: ["February/13/2022", "February/15/2022"], // Date range
                description: "Vacation leave for 3 days.", // Event description (optional)
                type: "event",
                color: "#63d867" // Event custom color (optional)
            }
        ]
    })
});

// text editor
const toolbar = document.querySelector("#toolbar");
const content = document.querySelector("#content");
const actions = Object.freeze([
    {
        id: "bold",
        icon: "format_bold",
        title: "Bold"
    },
    {
        id: "italic",
        icon: "format_italic",
        title: "Italic"
    },
    {
        id: "underline",
        icon: "format_underlined",
        title: "Underline"
    },
    {
        id: "strikeThrough",
        icon: "strikethrough_s",
        title: "Strike throught"
    },
    {
        id: "removeFormat",
        icon: "format_clear",
        title: "Clear format"
    },
    {
        id: "alignment",
        icon: "subject",
        title: "Set content alignment",
        submenu: [
            {
                id: "justifyLeft",
                icon: "format_align_left",
                style: "textAlign:left",
                title: "Align left"
            },
            {
                id: "justifyCenter",
                icon: "format_align_center",
                style: "textAlign:center",
                title: "Align center"
            },
            {
                id: "justifyRight",
                icon: "format_align_right",
                style: "textAlign:right",
                title: "Align right"
            }
        ]
    },
    {
        id: "outdent",
        icon: "format_indent_decrease",
        title: "Outdent"
    },
    {
        id: "indent",
        icon: "format_indent_increase",
        title: "Indent"
    },
    {
        id: "insertOrderedList",
        icon: "format_list_numbered",
        title: "Add numbered list",
        tag: "ol"
    },
    {
        id: "insertUnorderedList",
        icon: "format_list_bulleted",
        title: "Add unordered list",
        tag: "ul"
    },
    {
        id: "insertHorizontalRule",
        icon: "horizontal_rule",
        title: "Add horizontal rule"
    },
    {
        id: "insertImage",
        icon: "insert_photo",
        title: "Add image",
        submenu: [
            {
                id: "insertImageByUrl",
                icon: "insert_link",
                title: "Add image by URL"
            },
            {
                id: "insertImageByFile",
                icon: "file_upload",
                title: "Upload new image"
            }
        ]
    },
    {
        id: "createLink",
        icon: "link",
        title: "Add link"
    },
    {
        id: "unlink",
        icon: "link_off",
        title: "Remove link"
    },
    {
        id: "undo",
        icon: "undo",
        title: "Undo"
    },
    {
        id: "redo",
        icon: "redo",
        title: "Redo"
    }
]);

/**
 * Add toolbar buttons
 */
function setActionButton(action) {
    const button = document.createElement("button");
    const i = document.createElement("i");

    // 	Base props
    button.classList.add("action");
    button.title = action.title;
    button.dataset.action = action.id;

    if (action.style) button.dataset.style = action.style;
    if (action.tag) button.dataset.style = action.tag;

    // 	Action
    button.addEventListener("click", executeAction);

    // 	Icon
    i.classList.add("material-icons");
    i.innerText = action.icon;
    button.append(i);

    return button;
}

/**
 * Executes actions on the editable content wrapper
 * @param e - The mouse event
 * @see {@link https://developer.mozilla.org/es/docs/Web/API/Document/execCommand}
 * @see {@link https://developer.mozilla.org/es/docs/Web/HTML/Global_attributes/contenteditable}
 */
function executeAction(e) {
    const target = e.currentTarget;
    const action = target.dataset.action;

    content.focus();

    switch (action) {
        case "createLink":
            const anchorUrl = prompt("Insert the anchor URL");

            if (anchorUrl) document.execCommand(action, false, anchorUrl);

            break;
        case "insertImageByUrl":
            const imageUrl = prompt("Insert the image URL");

            if (imageUrl) {
                document.execCommand("insertImage", false, imageUrl);
            }

            break;
        case "insertImageByFile":
            const fileUploadInput = document.querySelector("#image-upload-input");

            fileUploadInput.click();

            fileUploadInput.onchange = () => {
                const [file] = fileUploadInput.files;

                if (file)
                    document.execCommand("insertImage", false, URL.createObjectURL(file));
            };

            break;
        default:
            document.execCommand(action, false);
            break;
    }
}

for (const action of actions) {
    const actionButton = setActionButton(action);

    if (action.submenu) {
        const submenu = document.createElement("div");
        let submenuVisible = false;

        submenu.classList.add("submenu");

        for (const subaction of action.submenu) {
            const subActionButton = setActionButton(subaction);
            submenu.append(subActionButton);
        }

        actionButton.addEventListener("click", (e) => {
            e.preventDefault();
            submenu.classList.toggle("visible");
        });

        actionButton.classList.add("has-submenu");
        actionButton.append(submenu);
    }

    toolbar.append(actionButton);
}

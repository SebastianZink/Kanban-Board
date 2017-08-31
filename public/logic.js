function createKanban() {
    setTimeout(function () {
        var time = document.getElementById('time').innerHTML;
        document.getElementById('kanban').remove();
        var kanban = document.createElement("div");
        kanban.setAttribute('id', 'kanban');
        document.body.appendChild(kanban);
        var users = JSON.parse(document.getElementById('users').innerHTML);
        var backlogs = JSON.parse(document.getElementById('backlogs').innerHTML);
        var tasks = JSON.parse(document.getElementById('tasks').innerHTML);
        var fields = [{
                name: "id",
                type: "string"
            },
            {
                name: "status",
                map: "state",
                type: "string"
            },
            {
                name: "text",
                map: "label",
                type: "string"
            },
            {
                name: "tags",
                type: "string"
            },
            {
                name: "color",
                map: "hex",
                type: "string"
            },
            {
                name: "resourceId",
                type: "number"
            }
        ];

        var source = {
            localData: [],
            dataType: "array",
            dataFields: fields
        };

        for (var i = 0; i < backlogs.length; i++) {
            var newObj = {
                id: backlogs[i]._id,
                state: "backlog",
                label: backlogs[i].label,
                tags: backlogs[i].tags,
                hex: "#0052f7",
                resourceId: backlogs[i].user
            };
            source.localData.push(newObj);
        }

        for (var i = 0; i < tasks.length; i++) {
            var newObj = {
                id: tasks[i]._id,
                state: "new",
                label: tasks[i].label,
                resourceId: tasks[i].user,
                hex: "#0052f7"
            };
            source.localData.push(newObj);
        }

        var dataAdapter = new $.jqx.dataAdapter(source);
        var resourcesAdapterFunc = function () {
            var resourcesSource = {
                localData: [],
                dataType: "array",
                dataFields: [{
                        name: "id",
                        type: "number"
                    },
                    {
                        name: "name",
                        type: "string"
                    },
                    {
                        name: "image",
                        type: "string"
                    },
                    {
                        name: "common",
                        type: "boolean"
                    }
                ]
            };

            for (var i = 0; i < users.length; i++) {
                var newObj = {
                    id: users[i].id,
                    name: users[i].name,
                    image: "../../images/Anne.png"
                };
                resourcesSource.localData.push(newObj);
            };

            var resourcesDataAdapter = new $.jqx.dataAdapter(resourcesSource);
            return resourcesDataAdapter;
        }
        $('#kanban').jqxKanban({
            resources: resourcesAdapterFunc(),
            source: dataAdapter,
            columns: [{
                    text: "Backlog",
                    dataField: "backlog"
                },
                {
                    text: "New",
                    dataField: "new"
                },
                {
                    text: "In Progress",
                    dataField: "work"
                },
                {
                    text: "Done",
                    dataField: "done"
                }
            ]
        });
        $("#kanban-column-0").append("<button type='button'id='secondbutton'class='btn btn-info btn-lg' data-toggle='modal' data-target='#exampleModalLabel'>New task</button>");
    }, Number(document.getElementById('time').innerHTML) + 700);
}
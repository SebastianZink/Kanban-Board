function createKanban() {
    
    document.getElementById('container').remove();
    var users = JSON.parse(document.getElementById('users').innerHTML);
    var backlogs = JSON.parse(document.getElementById('backlogs').innerHTML);
    var tasks = JSON.parse(document.getElementById('tasks').innerHTML);
    var container = document.createElement("div");
    container.setAttribute('id', 'container');
    document.body.appendChild(container);
    for (var i = 0; i < backlogs.length; i++) {
        var kanban = document.createElement("div");
        kanban.setAttribute('id', 'kanban_' + backlogs[i]._id);
        document.getElementById('container').appendChild(kanban);
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

        var newObj = {
            id: backlogs[i]._id,
            state: "backlog",
            label: backlogs[i].label,
            tags: backlogs[i].tags,
            hex: "#0052f7",
            resourceId: backlogs[i].user
        };
        source.localData.push(newObj);

        for (var k = 0; k < tasks.length; k++) {
            var newObj = {
                id: tasks[k]._id,
                state: "new",
                label: tasks[k].label,
                resourceId: tasks[k].user,
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

            for (var p = 0; p < users.length; p++) {
                var newObj = {
                    id: users[p].id,
                    name: users[p].name,
                    image: "../../images/Anne.png"
                };
                resourcesSource.localData.push(newObj);
            };

            var resourcesDataAdapter = new $.jqx.dataAdapter(resourcesSource);
            return resourcesDataAdapter;
        }
        $('#kanban_' + backlogs[i]._id).jqxKanban({
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

        var btn = document.createElement("button");
        btn.setAttribute('id', 'addTask_' + backlogs[i]._id);
        var t = document.createTextNode('+');
        btn.appendChild(t);
        btn.style.height = "50px";
        btn.style.width = "50px";
        btn.setAttribute('class', 'btn btn-info btn-lg');
        btn.setAttribute('data-toggle', 'modal');
        btn.setAttribute('data-target', '#exampleModalLabelTask');
        document.getElementById('kanban_' + backlogs[i]._id + '-column-1').appendChild(btn);
    }
}
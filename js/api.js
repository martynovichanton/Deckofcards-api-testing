
$(document).ready(function(){
    $("#tableLog").hide();
    var deck_id;

    $("#shuffle").click(function(){
        var ts = new Date();
        var time = ts.toISOString();
        $("button").prop("disabled",true);
        $('#actionlog').append($(this).prop("id") + " - " + time + "\n");

        $("#tableLog").hide();
        $('#tableLog tbody').empty();
        $('#log').empty();

        $.ajax({
            url: "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=10"
        }).then(function(data) {
            var x = document.getElementById("pass").value;
            console.log(x);
            $('#log').append(JSON.stringify(data, null, 4));
            $('#log').append("\n");

            deck_id = data.deck_id;
            $("button").prop("disabled",false);
        });
    });


    $("#draw").click(function(){
        var ts = new Date();
        var time = ts.toISOString();
        $("button").prop("disabled",true);
        $('#actionlog').append($(this).prop("id") + " - " + time + "\n");

        $.ajax({
            url: "https://deckofcardsapi.com/api/deck/" + deck_id + "/draw/?count=20"
        }).then(function(data) {
            var x = document.getElementById("pass").value;
            console.log(x);

            $('#log').append(JSON.stringify(data, null, 4));
            $('#log').append("\n");
            
            for (i = 0; i < data.cards.length; i++) {
                var value = data.cards[i].value;
                var suit = data.cards[i].suit;
                var code = data.cards[i].code;
                var row = "<tr><td>" + value + "</td><td>" + suit + "</td><td>" + code + "</td></tr>";
                $('#tableLog tbody').append(row);
            }

            addColor();

            $("#tableLog").show();
            $("button").prop("disabled",false);
        });
    });

    $("#test").click(function(){
        $.when(
            $.ajax({url: "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"}), 
            $.ajax({url: "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=10"})
        ).then(function (resp1, resp2) {
            $('#log').empty();
            $('#log').append(JSON.stringify(resp1));
            $('#log').append("\n\n\n\n\n\n\n");
            $('#log').append(JSON.stringify(resp2));
        });
    });

    $('#tableLog').on('click', 'td', function() {
        var tablelog = document.getElementById('tableLog');
        var cells = tablelog.getElementsByTagName('td');
        var rowId = this.parentNode.rowIndex;
        var rowsNotSelected = tablelog.getElementsByTagName('tr');
        for (var row = 0; row < rowsNotSelected.length; row++) {
            rowsNotSelected[row].classList.remove("rowSelected");
        }
        var rowSelected = tablelog.getElementsByTagName('tr')[rowId];
        rowSelected.className = "rowSelected";
        msg = 'values: ' + rowSelected.cells[0].innerHTML;
        msg += '\nsuit: ' + rowSelected.cells[1].innerHTML;
        msg += '\ncode: ' + rowSelected.cells[2].innerHTML;
        msg += '\nclicked: ' + this.innerHTML;
        console.log(msg);
    });

   
    function addColor(){
        $("#tableLog tr td:nth-child(2)").each(function(){
            var cellValue = $(this).text();
            if(cellValue == "HEARTS" || cellValue == "DIAMONDS"){ 
                $(this).addClass("red");
            }
            if(cellValue == "SPADES" || cellValue == "CLUBS"){ 
                $(this).addClass("gray");
            }
        });
    }

    //highlight_row();
    // function highlight_row() {
    //     var table = document.getElementById('display-table');
    //     var cells = table.getElementsByTagName('td');
    //     for (var i = 0; i < cells.length; i++) {
    //         var cell = cells[i];
    //         cell.onclick = function () {
    //             var rowId = this.parentNode.rowIndex;
    //             var rowsNotSelected = table.getElementsByTagName('tr');
    //             for (var row = 0; row < rowsNotSelected.length; row++) {
    //                 rowsNotSelected[row].classList.remove("rowSelected");
    //                 rowsNotSelected[row].classList.remove('selected');
    //             }
    //             var rowSelected = table.getElementsByTagName('tr')[rowId];
    //             rowSelected.className = "rowSelected";
    //             rowSelected.className += " selected";
    //             msg = 'ID: ' + rowSelected.cells[0].innerHTML;
    //             msg += '\nName: ' + rowSelected.cells[1].innerHTML;
    //             msg += '\nClicked: ' + this.innerHTML;
    //             console.log(msg);
    //         }
    //     }
    // }
    //static table example
    // <table id="display-table" class="table">
    //     <thead>
    //         <th>ID</th>
    //         <th>Company</th>
    //     </thead>
    //     <tbody>
    //         <tr>
    //             <td>100</td>
    //             <td>Abc</td>
    //         </tr>
    //         <tr>
    //             <td>101</td>
    //             <td>Def</td>
    //         </tr>
    //         <tr>
    //             <td>102</td>
    //             <td>Ghi</td>
    //         </tr>
    //     </tbody>
    // </table>


});


function autoInicioCategoria() {
    console.log("se esta ejecutando")
    $.ajax({
        url: "http://129.151.109.117:8080/api/Category/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            let $select = $("#select-category");
            $.each(respuesta, function (id, name) {
                $select.append('<option value=' + name.id + '>' + name.name + '</option>');
                console.log("select " + name.id);
            });
        }

    })
}

function traerInformacionComputer(){
    $.ajax({
        url:"http://129.151.109.117:8080/api/Computer/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaComputer(respuesta.items)
        }
    });
}
function pintarRespuestaComputer(items){
    let myTable="<table>";
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>" +items[i].name+"</td>";
        myTable+="<td>" +items[i].model+"</td>";
        myTable+="<td>" +items[i].year+"</td>";
        myTable+="<td>" +items[i].description+"</td>";
        myTable+="<td> <button onclick='borrarElementoComputer("+items[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoComputer").html(myTable);
    

}
function guardarInformacionComputer(){
    let myData={
        name:$("#name").val(),
        brand:$("#brand").val(),
        year:$("#year").val(),
        description:$("#description").val(),
        category:{id: +$("#select-category").val()},
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.109.117:8080/api/Computer/save",
        type:"POST",
        data:myData,
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoComputer").empty();
            $("#name").val("");
            $("#brand").val("");
            $("#year").val("");
            $("#description").val("");                      
            traerInformacionComputer();
            alert("Se ha guardado el registro con exito")
            
        }
    });
}
function editarInformacionComputer(){
    let myData={
        
        id: idElemento,
        name:$("#idcomputer").val(),
        brand:$("#brand").val(),
        year:$("#model").val(),
        description:$("#description").val(),
        category:{id: +$("#select-category").val()},
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.109.117:8080/api/Computer/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoComputer").empty();
            $("#idcomputer").val("");            
            $("#name").val("");
            $("#brand").val("");
            $("#year").val("");
            $("#description").val("");
            traerInformacionComputer();
            alert("Se ha Actualizado con exito")
            
        }
    });
}
function borrarElementoComputer(idElemento){
    let myData={
        id:idElemento
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.109.117:8080/api/Computer/" + idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoComputer").empty();
            traerInformacionComputer();         
            alert("Se ha Eliminado con Exito.")
            
        }
    });
}

// Tabla Categorias

function traerInformacionCategorias(){
    console.log("test");
    $.ajax({
        url:"http://129.151.109.117:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);            
            pintarRespuestaCategorias(respuesta.items)
        }
    });
}
function pintarRespuestaCategorias(items){
    let myTable="<table>";
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>" +items[i].name+"</td>";
        myTable+="<td>" +items[i].description+"</td>";
        myTable+="<td> <button onclick='borrarElementoCategoria("+items[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";    
    $("#resultadoCategoria").html(myTable);    
}

function guardarInformacionCategorias(){
    let myData={
        name:$("#name").val(),
        description:$("#description").val(),
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url: "http://129.151.109.117:8080/api/Category/save",
        type:"POST",
        data:myData,
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoCategoria").empty();
            $("#name").val("");
            $("#description").val("");
            traerInformacionCategorias();           
            alert("Se ha guardado la Categoria con exito")
           
        }
    });
}
function editarInformacionCategorias(){
    let myData={
        idCategoria:idElemento,
        name:$("#name").val(),
        description:$("#description").val(),
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.109.117:8080/api/Category/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
            success:function(respuesta){                      
            $("#resultadoCategoria").empty();
            $("#idCategoria").val("");
            $("#name").val("");
            $("#description").val("");
            traerInformacionCategorias();
            alert("Se ha Actualizado la Categoria con exito")
           
        }
    });
}
function borrarElementoCategorias(idElemento){
    let myData={
        idCategoria:idElemento
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.109.117:8080/api/Category/" + idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){            
            $("#resultadoCategoria").empty();                       
            traerInformacionCategorias();                        
            alert("Se ha eliminado la Categoria con exito")
            
        }
    });
}


//Tabla Clientes

function traerInformacionClient(){
    $.ajax({
        url:"http://129.151.109.117:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaClient(respuesta.items)
        }
    });
}
function pintarRespuestaClient(items){
    let myTable="<table>";
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>" +items[i].email+"</td>";
        myTable+="<td>" +items[i].password+"</td>";
        myTable+="<td>" +items[i].name+"</td>";
        myTable+="<td>" +items[i].age+"</td>";
        
        myTable+="<td> <button onclick='borrarElementoClient("+items[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoClient").html(myTable);
    

}
function guardarInformacionClient(){
    let myData={
        email:$("#email").val(),
        password:$("#password").val(),
        name:$("#nameClient").val(),
        age:$("#age").val(),
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.109.117:8080/api/Client/save",
        type:"POST",
        data:myData,
        datatype:"JSON",
        success:function(respuesta){
            $("#email").empty();
            $("#password").val("");
            $("#nameClient").val("");          
            $("#age").val("");
            traerInformacionClient();            
            alert("Se ha guardado el Cliente con exito")
          
        }
    });
}
function editarInformacionClient(){
    let myData={
        id:$("#idClient").val(),
        email:$("#email").val(),
        password:$("#password").val(),
        name:$("#nameClient").val(),
        age:$("#age").val(),
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.109.117:8080/api/Client/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoClient").empty();
            $("#idClient").val("");
            $("#email").val("");
            $("#password").val("");
            $("#nameClient").val("");
            $("#age").val("");
            traerInformacionClient();         
            alert("Se ha Actualizado el Cliente con exito")
           
        }
    });
}
function borrarElementoClient(idElemento){
    let myData={
        id:idElemento
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.109.117:8080/api/Client/" + idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoClient").empty();
            traerInformacionClient();           
            alert("Se ha Eliminado el Cliente con exito.")
            
        }
    });
}

// Tabla Mensajes

function traerInformacionMessage(){
    $.ajax({
        url:"http://129.151.109.117:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);            
            pintarRespuestaMessage(respuesta.items)
        }
    });
}
function pintarRespuestaMessage(items){
    let myTable="<table>";
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>" +items[i].messagetext+"</td>";
        myTable+="<td> <button onclick='borrarElementoMessage("+items[i].idMessage+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";    
    $("#resultado").html(myTable);    
}

function guardarInformacionMessage(){
    let myData={
        messagetext:$("#messagetext").val(),
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.109.117:8080/api/Message/save",
        type:"POST",
        data:myData,
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#messagetext").val("");
            traerInformacionMessage();           
            alert("Se ha guardado el Mensaje con exito")
           
        }
    });
}
function editarInformacionMessage(){
    let myData={
        id:$("#idMessage").val(),
        messagetext:$("#messagetext").val(),
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.109.117:8080/api/Message/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
            success:function(respuesta){                      
            $("#resultado").empty();
            $("#idMessage").val("");
            $("#messagetext").val("");
            traerInformacionMessage();
            alert("Se ha Actualizado el Mensaje con exito")
           
        }
    });
}
function borrarElementoMessage(idElemento){
    let myData={
        id:idElemento
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.109.117:8080/api/Message/" + idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){            
            $("#resultado").empty();                       
            traerInformacionMessage();                        
            alert("Se ha eliminado el Mensaje con exito")
            
        }
    });
}

// Tabla Reservaciones

function traerInformacionReservacion(){
    $.ajax({
        url:"http://129.151.109.117:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);            
            pintarRespuestaReservacion(respuesta.items)
        }
    });
}
function pintarRespuestaReservacion(items){
    let myTable="<table>";
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>" +items[i].startDate+"</td>";
        myTable+="<td>" +items[i].devolutionDate+"</td>";
        myTable+="<td>" +items[i].status+"</td>";
        myTable+="<td> <button onclick='borrarElementoReservacion("+items[i].idReservation+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";    
    $("#resultadoReservacion").html(myTable);    
}

function guardarInformacionReservacion(){
    let myData={
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val(),
        status:$("#status").val(),
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.109.117:8080/api/Reservation/save",
        type:"POST",
        data:myData,
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoReservacion").empty();
            $("#startDate").val("");
            $("#devolutionDate").val("");
            $("#status").val("");
            traerInformacionReservacion();           
            alert("Se ha guardado la Reservacion con exito")
           
        }
    });
}
function editarInformacionReservacion(){
    let myData={
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val(),
        status:$("#status").val(),
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.109.117:8080/api/Reservation/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
            success:function(respuesta){                      
            $("#resultadoReservacion").empty();
            $("#startDate").val("");
            $("#devolutionDate").val("");
            $("#status").val("");
            traerInformacionReservacion();
            alert("Se ha Actualizado la Reservacion con exito")
           
        }
    });
}
function borrarElementoReservacion(idElemento){
    let myData={
        id:idElemento
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.109.117:8080/api/Reservation/" + idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){            
            $("#resultadoReservacion").empty();                       
            traerInformacionReservacion();                        
            alert("Se ha eliminado la Reservacion con exito")
            
        }
    });
}

// Tabla Reportes

function traerReporteStatus() {
    console.log("test");
    $.ajax({
        url: "http://129.151.109.117:8080/api/Reservation/report-status",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}
function pintarRespuesta(respuesta) {

    let myTable = "<table>";
    myTable += "<tr>";
    myTable += "<th>completadas</th>";
    myTable += "<td>" + respuesta.completed + "</td>";
    myTable += "<th>canceladas</th>";
    myTable += "<td>" + respuesta.cancelled + "</td>";
    myTable += "</tr>";
    myTable += "</table>";
    $("#resultadoStatus").html(myTable);
}
function traerReporteDate() {

    var fechaInicio = document.getElementById("RstarDate").value;
    var fechaCierre = document.getElementById("RdevolutionDate").value;
    console.log(fechaInicio);
    console.log(fechaCierre);

    $.ajax({
        url: "http://129.151.109.117:8080/api/Reservation/report-clients" + fechaInicio + "/" + fechaCierre,
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuestaDate(respuesta);
        }
    });
}
function pintarRespuestaDate(respuesta) {

    let myTable = "<table>";
    myTable += "<tr>";

    for (i = 0; i < respuesta.length; i++) {
        myTable += "<th>total</th>";
        myTable += "<td>" + respuesta[i].devolutionDate + "</td>";
        myTable += "<td>" + respuesta[i].startDate + "</td>";
        myTable += "<td>" + respuesta[i].status + "</td>";


        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultadoDate").html(myTable);
}

function traerReporteClientes() {
    $.ajax({
        url: "http://129.151.109.117:8080/api/Reservation/report-clients",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuestaClientes(respuesta);
        }
    });
}
function pintarRespuestaClientes(respuesta) {

    let myTable = "<table>";
    myTable += "<tr>";

    for (i = 0; i < respuesta.length; i++) {
        myTable += "<th>total</th>";
        myTable += "<td>" + respuesta[i].total + "</td>";
        myTable += "<td>" + respuesta[i].client.name + "</td>";
        myTable += "<td>" + respuesta[i].client.email + "</td>";
        myTable += "<td>" + respuesta[i].client.age + "</td>";

        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultadoClientes").html(myTable);
}


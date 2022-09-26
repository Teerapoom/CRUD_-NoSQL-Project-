google.charts.load("current", {
    packages: ["corechart", "bar"],
});
google.charts.setOnLoadCallback(loadTable);

function loadTable() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/Dataset");
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var trHTML = "";
            var num = 1;
            const objects = JSON.parse(this.responseText);
            console.log(objects);
            for (let object of objects) {
                // console.log(objects);
                trHTML += "<tr>";
                trHTML += "<td>" + num + "</td>";
                trHTML += "<td>" + object["Invoice ID"] + "</td>";
                trHTML += "<td>" + object["Branch"] + "</td>";
                trHTML += "<td>" + object["City"] + "</td>";
                trHTML += "<td>" + object["Customer type"] + "</td>";
                trHTML += "<td>" + object["Gender"] + "</td>";
                trHTML += "<td>" + object["Product line"] + "</td>";
                trHTML += "<td>" + object["Unit price"] + "</td>";
                trHTML += "<td>" + object["Quantity"] + "</td>";
                trHTML += "<td>" + object["Tax 5%"] + "</td>";
                trHTML += "<td>" + object["Total"] + "</td>";
                trHTML += "<td>" + object["Date"] + "</td>";
                trHTML += "<td>" + object["Time"] + "</td>";
                trHTML += "<td>" + object["Payment"] + "</td>";
                trHTML += "<td>";
                trHTML += '<a type="button" class="btn btn-outline-secondary" onclick="showCompliantEditBox(\'' +object["_id"] +'\')"><i class="fas fa-edit"></i></a>';
                trHTML += '<a type="button" class="btn btn-outline-danger" onclick="compliantDelete(\'' +object["_id"] +'\')"><i class="fas fa-trash"></i></a></td>';
                trHTML += "</tr>";
                num++;
            }
            document.getElementById("mytable").innerHTML = trHTML;

            loadGraph();
        }
    };
}

function loadQueryTable() {
    document.getElementById("mytable").innerHTML =
        '<tr><th scope="row" colspan="5">Loading...</th></tr>';
    const searchText = document.getElementById("searchTextBox").value;

    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/Dataset/issue/" + searchText);

    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var trHTML = "";
            var num = 1;
            const objects = JSON.parse(this.responseText).Complaint;
            for (let object of objects) {
                trHTML += "<tr>";
                trHTML += "<td>" + num + "</td>";
                trHTML += "<td>" + object["Invoice ID"] + "</td>";
                trHTML += "<td>" + object["Branch"] + "</td>";
                trHTML += "<td>" + object["City"] + "</td>";
                trHTML += "<td>" + object["Customer type"] + "</td>";
                trHTML += "<td>" + object["Gender"] + "</td>";
                trHTML += "<td>" + object["Product line"] + "</td>";
                trHTML += "<td>" + object["Unit price"] + "</td>";
                trHTML += "<td>" + object["Quantity"] + "</td>";
                trHTML += "<td>" + object["Tax 5%"] + "</td>";
                trHTML += "<td>" + object["Total"] + "</td>";
                trHTML += "<td>" + object["Date"] + "</td>";
                trHTML += "<td>" + object["Time"] + "</td>";
                trHTML += "<td>" + object["Payment"] + "</td>";
                trHTML += "<td>";
                trHTML += '<a type="button" class="btn btn-outline-secondary" onclick="showCompliantEditBox(\'' + object["_id"] + '\')"><i class="fas fa-edit"></i></a>';
                trHTML += '<a type="button" class="btn btn-outline-danger" onclick="compliantDelete(\'' + object["_id"] + '\')"><i class="fas fa-trash"></i></a></td>';
                trHTML += "</tr>";

                num++;
            }
            console.log(trHTML);
            document.getElementById("mytable").innerHTML = trHTML;
        }
    };
}

function loadGraph() {
    var yangon = 0;
    var naypyitaw = 0;
    var mandalay = 0;

    var fashion = 0;
    var food = 0;
    var electronic = 0;
    var sports = 0;
    var home = 0;
    var health = 0;
    var others = 0;

    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/Dataset");
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const objects = JSON.parse(this.responseText);
            for (let object of objects) {
                if (object["City"] == "Yangon") {
                    yangon++;
                } else if (object["City"] == "Naypyitaw") {
                    naypyitaw++;
                } else if (object["City"] == "Mandalay") {
                    mandalay++;
                } 
                
                if (object["Product line"] == "Fashion accessories") {
                    fashion++;
                } else if (object["Product line"] == "Food and beverages") {
                    food++;
                } else if (object["Product line"] == "Electronic accessories") {
                    electronic++;
                } else if (object["Product line"] == "Sports and travel") {  
                    sports++;
                } else if (object["Product line"] == "Home and lifestyle") {
                    home++;
                } else if  (object["Product line"] == "Health and beauty") {
                    health++;
                } else {
                    console.log('error')
                }
                
            }
            drawChart(yangon, naypyitaw, mandalay);
            function drawChart(yangon, naypyitaw, mandalay) {
                var data = google.visualization.arrayToDataTable([
                    ["Branch", "Count"],
                    ["Yangon", yangon],
                    ["Naypyitaw", naypyitaw],
                    ["Mandalay", mandalay],
                ]);
                
                var chart = new google.visualization.PieChart(document.getElementById("chart1"));
                chart.draw(data);
            }

            drawChart2(fashion, food, electronic, sports, home, health, others);

            function drawChart2(fashion, food, electronic, sports, home, health, others) {
                var data = google.visualization.arrayToDataTable([
                    ["Product Type", 'จำนวน', { role: "style" }, {role: "annotation"}, {role: "annotationText"}],
                    ["Fashion accessories", fashion, "red", fashion, "Fashion accessories"],
                    ["Food and beverages", food, "green", food , "Food and beverages"],
                    ["Electronic accessories", electronic, "blue", electronic , "Electronic accessories"],
                    ["Sports and travel", sports, "yellow", sports , "Sports and travel"],
                    ["Home and lifestyle", home, "pink", home , "Home and lifestyle"],
                    ["Health and beauty", health, "orange", health , "Health and beauty"],
                ]);

                var options = {
                    title: 'Product',
                    legend: { position: 'none' },
                };
                
                var chart = new google.visualization.BarChart(document.getElementById("chart2"));
                chart.draw(data, options);
            }
            
        }
    }
}

function showCompliantCreateBox() {
    Swal.fire({
        title: 'new Data',
        html:
                    '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">รหัสลิป</span></div>' +
                    '<input id="Invoice_ID" type="text" class="form-control" placeholder="รหัสลิป" aria-label="Invoice ID" aria-describedby="Invoice ID"></div>' +
                    
                    '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">สาขา</span></div>' +
                    '<input id="Branch" type="text" class="form-control" placeholder="สาขา" aria-label="exObjID" aria-describedby="exObjID" ></div>' +
                            
                    '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">เมือง</span></div>' +
                    '<input id="City" type="text" class="form-control" placeholder="เมือง" aria-label="exObjID" aria-describedby="exObjID" ></div>' +

                    '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">ประเภทลูกค้า</span></div>' +
                    '<input id="Customer_type" type="text" class="form-control" placeholder="ประเภทลูกค้า" aria-label="exObjID" aria-describedby="exObjID" ></div>' +

                    '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">เพศ</span></div>' +
                    '<input id="Gender" type="text" class="form-control" placeholder="เพศ" aria-label="exObjID" aria-describedby="exObjID" ></div>' +

                    '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">ประเภทสินค้า</span></div>' +
                    '<input id="Product_line" type="text" class="form-control" placeholder="ประเภทสินค้า" aria-label="exObjID" aria-describedby="exObjID"></div>' +

                    '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">ราคาสินค้า</span></div>' +
                    '<input id="Unit_price" type="text" class="form-control" placeholder="ราคาสินค้า" aria-label="exObjID" aria-describedby="exObjID"></div>' +

                    '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">จำนวนสินค้า</span></div>' +
                    '<input id="Quantity" type="text" class="form-control" placeholder="จำนวนสินค้า" aria-label="exObjID" aria-describedby="exObjID"></div>' +

                    '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">ภาษี 5 %</span></div>' +
                    '<input id="Tax" type="text" class="form-control" placeholder="ภาษี 5 %" aria-label="exObjID" aria-describedby="exObjID"></div>' +

                    '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">ราคารวมทั้งหมด</span></div>' +
                    '<input id="Total" type="text" class="form-control" placeholder="ราคารวมทั้งหมด" aria-label="exObjID" aria-describedby="exObjID"></div>' +

                    '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">วันที่</span></div>' +
                    '<input id="date" type="text" class="form-control" placeholder="วันที่" aria-label="exObjID" aria-describedby="exObjID"></div>' +

                    '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">เวลา</span></div>' +
                    '<input id="Time" type="text" class="form-control" placeholder="เวลา" aria-label="exObjID" aria-describedby="exObjID"></div>' +

                    '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">ช่องทางชำระเงิน</span></div>' +
                    '<input id="Payment" type="text" class="form-control" placeholder="ช่องทางชำระเงิน" aria-label="exObjID" aria-describedby="exObjID"></div>',

        showCancelButton: true,
        focusConfirm: false,
        preConfirm: () => {
            DataInsertCreate();
        }
    })
}

function DataInsertCreate(){ 
    var Invoice_ID = document.getElementById('Invoice_ID').value;
    var Branch = document.getElementById('Branch').value;
    var City = document.getElementById('City').value;
    var Customer_type = document.getElementById('Customer_type').value;
    var Gender = document.getElementById('Gender').value;
    var Product_line = document.getElementById('Product_line').value;
    var Unit_price = document.getElementById('Unit_price').value;
    var Quantity = document.getElementById('Quantity').value;
    var Tax = document.getElementById('Tax').value;
    var Total = document.getElementById('Total').value;
    var date = document.getElementById('date').value;
    var Time = document.getElementById('Time').value;
    var Payment = document.getElementById('Payment').value;

    console.log(JSON.stringify({
        "Invoice ID": Invoice_ID,
        "Branch": Branch,
        "City": City,
        "Customer type": Customer_type,
        "Gender": Gender,
        "Product line": Product_line,
        "Unit price": Unit_price,
        "Quantity":Quantity,
        "Tax 5%": Tax,
        "Total": Total,
        "Date": date,
        "Time": Time,
        "Payment": Payment
    }));

    const xhttp = new XMLHttpRequest();
    xhttp.open('POST', 'http://localhost:3000/Dataset/create');
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify({
        "Invoice ID": Invoice_ID,
        "Branch": Branch,
        "City": City,
        "Customer type": Customer_type,
        "Gender": Gender,
        "Product line": Product_line,
        "Unit price": Unit_price,
        "Quantity":Quantity,
        "Tax 5%": Tax,
        "Total": Total,
        "Date": date,
        "Time": Time,
        "Payment": Payment
    }));

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                html: 'Page will reload in <b></b> milliseconds.',
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                    const b = Swal.getHtmlContainer().querySelector('b')
                    timerInterval = setInterval(() => {
                        b.textContent = Swal.getTimerLeft()
                    }, 100)
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    location.reload();
                }
            })
        }
    }
}



function compliantDelete(id){
    console.log(id);
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons:true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
    }).then((result) => {
        if (result.isConfirmed) {
            const xhttp = new XMLHttpRequest();
            xhttp.open("DELETE", "http://localhost:3000/Dataset/delete");
            xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhttp.send(JSON.stringify({
                "_id": id
            }));
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted Successfully',
                        html: 'Page will reload in <b></b> milliseconds.',
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading()
                            const b = Swal.getHtmlContainer().querySelector('b')
                            timerInterval = setInterval(() => {
                                b.textContent = Swal.getTimerLeft()
                            }, 100)
                        },
                        willClose: () => {
                            clearInterval(timerInterval)
                        }
                    }).then((result) => {
                        if (result.dismiss === Swal.DismissReason.timer) {
                            location.reload();
                        }
                    })
                }
            }
        }
    })
}


function showCompliantEditBox(id){
    // console.log(id)
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/Dataset/" + id);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText);
            console.log(obj);
            Swal.fire({
                title: 'edit Data !',
                html:
                    '<div class="input-group mb-3 invisible"><div class="input-group-prepend"><span class="input-group-text">รหัส NoSQL</span></div>' +
                    '<input id="exObjID" type="hidden" class="form-control" placeholder="รหัส NoSQL" aria-label="exObjID" aria-describedby="exObjID" readonly value="' + obj['_id'] + '"></div>' +

                    '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">รหัสลิป</span></div>' +
                    '<input id="exInvoice_ID" type="text" class="form-control" placeholder="รหัสลิป" aria-label="Invoice ID" aria-describedby="Invoice ID" readonly value="' + obj['Invoice ID'] + '"></div>' +
                    
                    '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">สาขา</span></div>' +
                    '<input id="exBranch" type="text" class="form-control" placeholder="สาขา" aria-label="exObjID" aria-describedby="exObjID" value="' + obj['Branch'] + '"></div>' +

                    '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">เมือง</span></div>' +
                    '<input id="exCity" type="text" class="form-control" placeholder="เมือง" aria-label="exObjID" aria-describedby="exObjID" value="' + obj['City'] + '"></div>' +

                    '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">ประเภทลูกค้า</span></div>' +
                    '<input id="exCustomer_type" type="text" class="form-control" placeholder="ประเภทลูกค้า" aria-label="exObjID" aria-describedby="exObjID" value="' + obj['Customer type'] + '"></div>' +

                    '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">เพศ</span></div>' +
                    '<input id="exGender" type="text" class="form-control" placeholder="เพศ" aria-label="exObjID" aria-describedby="exObjID" value="' + obj['Gender'] + '"></div>' +

                    '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">ประเภทสินค้า</span></div>' +
                    '<input id="exProduct_line" type="text" class="form-control" placeholder="ประเภทสินค้า" aria-label="exObjID" aria-describedby="exObjID" value="' + obj['Product line'] + '"></div>' +

                    '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">ราคาสินค้า</span></div>' +
                    '<input id="exUnit_price" type="text" class="form-control" placeholder="ราคาสินค้า" aria-label="exObjID" aria-describedby="exObjID" value="' + obj['Unit price'] + '"></div>' +

                    '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">จำนวนสินค้า</span></div>' +
                    '<input id="exQuantity" type="text" class="form-control" placeholder="จำนวนสินค้า" aria-label="exObjID" aria-describedby="exObjID" value="' + obj['Quantity'] + '"></div>' +

                    '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">ภาษี 5 %</span></div>' +
                    '<input id="exTax" type="text" class="form-control" placeholder="ภาษี 5 %" aria-label="exObjID" aria-describedby="exObjID" value="' + obj['Tax 5%'] + '"></div>' +

                    '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">ราคารวมทั้งหมด</span></div>' +
                    '<input id="exTotal" type="text" class="form-control" placeholder="ราคารวมทั้งหมด" aria-label="exObjID" aria-describedby="exObjID" value="' + obj['Total'] + '"></div>' +

                    '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">วันที่</span></div>' +
                    '<input id="exDate" type="text" class="form-control" placeholder="วันที่" aria-label="exObjID" aria-describedby="exObjID" value="' + obj['Date'] + '"></div>' +

                    '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">เวลา</span></div>' +
                    '<input id="exTime" type="text" class="form-control" placeholder="เวลา" aria-label="exObjID" aria-describedby="exObjID" value="' + obj['Time'] + '"></div>' +

                    '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">ช่องทางชำระเงิน</span></div>' +
                    '<input id="exPayment" type="text" class="form-control" placeholder="ช่องทางชำระเงิน" aria-label="exObjID" aria-describedby="exObjID" value="' + obj['Payment'] + '"></div>',
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: 'Edit',
                preConfirm: () => {
                    UpdateData();
                }
            })
        }
    }
}

function UpdateData() {
    var exObjID = document.getElementById('exObjID').value;
    var exInvoice_ID = document.getElementById('exInvoice_ID').value;
    var exBranch = document.getElementById('exBranch').value;
    var exCity = document.getElementById('exCity').value;
    var exCustomer_type = document.getElementById('exCustomer_type').value;
    var exGender = document.getElementById('exGender').value;
    var exProduct_line = document.getElementById('exProduct_line').value;
    var exUnit_price = document.getElementById('exUnit_price').value;
    var exQuantity = document.getElementById('exQuantity').value;
    var exTax = document.getElementById('exTax').value;
    var exTotal = document.getElementById('exTotal').value;
    var exDate = document.getElementById('exDate').value;
    var exTime = document.getElementById('exTime').value;
    var exPayment = document.getElementById('exPayment').value;

        console.log(JSON.stringify({
            "_id": exObjID,
            "Invoice ID": exInvoice_ID,
            "Branch": exBranch,
            "City": exCity,
            "Customer type": exCustomer_type,
            "Gender": exGender,
            "Product line": exProduct_line,
            "Unit price": exUnit_price,
            "Quantity": exQuantity,
            "Tax 5%": exTax,
            "Total": exTotal,
            "Date": exDate,
            "Time": exTime,
            "Payment": exPayment
        }));
    
    const xhttp = new XMLHttpRequest();
    xhttp.open('PUT', 'http://localhost:3000/Dataset/update/');
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify({
        "_id": exObjID,
        "Invoice ID": exInvoice_ID,
        "Branch": exBranch,
        "City": exCity,
        "Customer type": exCustomer_type,
        "Gender": exGender,
        "Product line": exProduct_line,
        "Unit price": exUnit_price,
        "Quantity": exQuantity,
        "Tax 5%": exTax,
        "Total": exTotal,
        "Date": exDate,
        "Time": exTime,
        "Payment": exPayment
    }));
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            Swal.fire({
                icon: 'success',
                title: 'Updated Successfully',
                html: 'Page will reload in <b></b> milliseconds.',
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                    const b = Swal.getHtmlContainer().querySelector('b')
                    timerInterval = setInterval(() => {
                        b.textContent = Swal.getTimerLeft()
                    }, 100)
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    location.reload();
                }
            })
    }
}
}


function loadQueryTable() {
    document.getElementById("mytable").innerHTML = "<tr><th scope=\"row\" colspan=\"5\">Loading...</th></tr>";
    var search = document.getElementById("searchTextBox").value;
    const xhttp = new XMLHttpRequest();
    if (search == "") {
        window.location.reload();
    } else {
        xhttp.open("GET", "http://localhost:3000/Dataset/issue/" + search);
        xhttp.send();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var objects = JSON.parse(this.responseText);
                var table = document.getElementById("mytable");
                var num = 1;
                var trHTML = '';
                table.innerHTML = "";
                console.log(object);
                for (var object of objects) {
                    trHTML += "<tr>";
                    trHTML += "<td>" + num + "</td>";
                    trHTML += "<td>" + object["Invoice ID"] + "</td>";
                    trHTML += "<td>" + object["Branch"] + "</td>";
                    trHTML += "<td>" + object["City"] + "</td>";
                    trHTML += "<td>" + object["Customer type"] + "</td>";
                    trHTML += "<td>" + object["Gender"] + "</td>";
                    trHTML += "<td>" + object["Product line"] + "</td>";
                    trHTML += "<td>" + object["Unit price"] + "</td>";
                    trHTML += "<td>" + object["Quantity"] + "</td>";
                    trHTML += "<td>" + object["Tax 5%"] + "</td>";
                    trHTML += "<td>" + object["Total"] + "</td>";
                    trHTML += "<td>" + object["Date"] + "</td>";
                    trHTML += "<td>" + object["Time"] + "</td>";
                    trHTML += "<td>" + object["Payment"] + "</td>";
                    trHTML += "<td>";
                    trHTML += '<a type="button" class="btn btn-outline-secondary" onclick="showCompliantEditBox(\'' +object["_id"] +'\')"><i class="fas fa-edit"></i></a>';
                    trHTML += '<a type="button" class="btn btn-outline-danger" onclick="compliantDelete(\'' +object["_id"] +'\')"><i class="fas fa-trash"></i></a></td>';
                    trHTML += "</tr>";
                    num++;
                }
                console.log(trHTML);
                document.getElementById("mytable").innerHTML = trHTML;
            }
        }
    }
}



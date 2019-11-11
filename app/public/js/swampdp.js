
        
            var dateRange="";
               $(function() {
                $('input[name="datetimes"]').daterangepicker({
            "showDropdowns": true,
            "timePicker": true,
                "timePicker24Hour": true,
            
                "startDate": moment().startOf('hour'),
    "endDate": moment().startOf('hour').add(0, 'hour')
        }, function(start, end, label) {
            dateRange="fromDate="+start.format("YYYY-MM-DD")+"T"+start.format("HH:mm:SS")+"&toDate="+end.format("YYYY-MM-DD")+"T"+end.format("HH:mm:SS");
         // console.log('New date range selected: ' + start.format('YYYY-MM-DD-HH-mm-SS') + ' to ' + end.format('YYYY-MM-DD-HH-mm-SS') + ' (predefined range: ' + label + ')');
          //console.log("Daterange:"+ dateRange);
        });
        });


        
function getDate(){
getOrionData(dateRange);
    
}
                
         var arr;
window.onload = function () {
            //Mask.setOnlyNumbers(Selector.$('tempo'));
            dateRange=null;
            getOrionData(dateRange);
        }

        function getOrionData(dateRange) {
    console.log(dateRange);
    var req2 = new XMLHttpRequest();
            
            var url = 'http://177.104.61.17:1026/v2/entities?type=Probe';
           
            req2.open("GET", url, true);
            
            req2.setRequestHeader("fiware-service", "openiot");
            req2.setRequestHeader("fiware-servicepath", "/");
            
            req2.onreadystatechange = function(){
                if (this.readyState ==4 && this.status ==200){
                    var myArr = JSON.parse(this.responseText);
                    var arr = JSON.parse(this.responseText);
                   
                   numberOfElements=myArr.length;
                   for(i=0;i<numberOfElements;i++){
                 
                    getHystoryData(myArr[i].id,dateRange);
                    
                   }
                   
                 
                  
                }else{
                  //console.log("Error: "+this.responseText);
                }
            }
            req2.send();
            
           
}


               
function getHystoryData(id,dateRange) {
    if(id!= null)
    {
    
    var req2 = new XMLHttpRequest();
    if(dateRange==null){
        var url = 'https://cors-anywhere.herokuapp.com/http://177.104.61.17:8668/v2/entities/'+id+'?&lastN=50';

    }else{
        var url = 'https://cors-anywhere.herokuapp.com/http://177.104.61.17:8668/v2/entities/'+id+'?&limit=999999&'+dateRange;
    }
    
    
           console.log(url);
            req2.open("GET", url, true);
            req2.setRequestHeader("content-type", "application/json");
            req2.setRequestHeader("fiware-service", "openiot");
            req2.setRequestHeader("fiware-servicepath", "/");
            req2.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            req2.onreadystatechange = function(){
                if (this.readyState ==4 && this.status ==200){
                    var myArr = JSON.parse(this.responseText);
                    createChartDiv(myArr.entityId);
                   

                    converter2(myArr);
                  //console.log(myArr);
                   
                }else{
                  //console.log("Error: "+this.responseText);
                }
            }
            req2.send();
            
}
                }

function createChartDiv(entityId){

var block_to_insert ;
var container_block ;
 
block_to_insert = document.createElement( 'div' );
block_to_insert.innerHTML = '<div id="'+entityId+'" class="divwhite">Probe:'+entityId+'<div id="'+entityId+'moisture" class="chart-div"></div><div id="'+entityId+'temp" class="chart-div"></div><div id="'+entityId+'battery" class="chart-div"></div></div></br>' ;
 
container_block = document.getElementById( 'charts' );
container_block.appendChild( block_to_insert );

}

google.charts.load('current', {'packages':['corechart']});
google.setOnLoadCallback(getHystoryData); 

function converter2(myArr){

    var battery = new google.visualization.DataTable();
    var temperature = new google.visualization.DataTable();
    var moisture = new google.visualization.DataTable();
    battery.addColumn('date', 'time_index' );
    battery.addColumn('number', '%' );
    temperature.addColumn('date', 'time_index' );
    temperature.addColumn('number', 'temperature1' );
    moisture.addColumn('date', 'time_index' );
    moisture.addColumn('number', 'moisture1' );
    moisture.addColumn('number', 'moisture2' );
    moisture.addColumn('number', 'moisture3' )
    //console.log(myArr);
    numberOfValues = myArr.index.length;
    numberOfAttributes = myArr.attributes.length;
for (i=0; i < numberOfValues; i++){
    
    for(j=0;j<numberOfAttributes;j++){
       
        time_index=myArr.index[i].split("T");
        date=time_index[0].split("-");
        hour=time_index[1].split(':');
      
      //new Date(Year, Month, Day, Hours, Minutes, Seconds, Milliseconds);
      date[1]=date[1] -1;
      hora_atual = new Date(date[0],date[1],date[2],hour[0],hour[1],hour[2]);
     
        if(myArr.attributes[j].attrName=='moisture1'){
            var row='';
            row=myArr.index[i]+',';
            row=row+myArr.attributes[j].values[i]+',';
            row=row+myArr.attributes[j+1].values[i]+',';
            row=row+myArr.attributes[j+2].values[i];
            newRow=row.split(",");
          
           for(k=1;k<newRow.length;k++){
               
              newRow[k]=parseFloat(newRow[k]);
               
           }
           newRow[0]=hora_atual;
          
            moisture.addRow(newRow);
        }
       
        if(myArr.attributes[j].attrName=='battery'){
            var row='';
            row=myArr.index[i]+',';
            row=row+myArr.attributes[j].values[i];
            newRow=row.split(",");
          
           for(k=1;k<newRow.length;k++){
               
              newRow[k]=parseFloat(newRow[k]);
               
           }
           newRow[0]=hora_atual;
            battery.addRow(newRow);
        }
        if(myArr.attributes[j].attrName=='temperature1'){
            var row='';
            row=myArr.index[i]+',';
            row=row+myArr.attributes[j].values[i];
            newRow=row.split(",");
          
           for(k=1;k<newRow.length;k++){
               
              newRow[k]=parseFloat(newRow[k]);
               
           }
           newRow[0]=hora_atual;
            temperature.addRow(newRow);
        }
      

    }
    
}

   //Aqui         
   var optionsMoisture = {
      title: 'Moisture',
      curveType: 'function',
      legend: { position: 'bottom' },
      pointSize: 2,
      

      
    };
  
  
    chartname= myArr.entityId+'moisture';
    var chart = new google.visualization.LineChart(document.getElementById(chartname));

    chart.draw(moisture, optionsMoisture);


    var optionsBattery = {
      title: 'Battery',
      curveType: 'function',
      legend: { position: 'bottom' }
    };
  
  
    chartname= myArr.entityId+'battery';
    var chart = new google.visualization.LineChart(document.getElementById(chartname));

    chart.draw(battery, optionsBattery);
            

    var optionsTemp = {
      title: 'Temperature',
      curveType: 'function',
      legend: { position: 'bottom' }
    };
  
  
    chartname= myArr.entityId+'temp';
    var chart = new google.visualization.LineChart(document.getElementById(chartname));

    chart.draw(temperature, optionsTemp);
            
}



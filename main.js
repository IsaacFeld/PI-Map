let map;
async function initMap(){
    
    const { Map } = await google.maps.importLibrary("maps");
    
    const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
        "marker",
      );
    const companygreen = "#aebd10"
    const companygreenlight ="#c4d317"
    const companygreen2 = "#00b050"
    const companydarkerblue = "#00405b"
    const companydblue2 = "#005679"
    const copmanydblue = "#005d81"
    const companyblue = "#0066cc"
    const companylightblue = "#16bbff"
    const black = "#363639"
    const companygray = "#a6a6a6"
    const companywhite = "#fdfdfd"
    const folderNames = [{
        austria: 'Kunden Österreich ( Tobias)',

    }]
    const circles = [];
    const markers = [{
        locationName:'Process Insights GmbH',
        lat: 52.46299841368375,
        lng: 13.469191454349874,
        address: 'Neuköllnische Allee 134, <br> 12057 Berlin',
        folder: ''
      

    },
    {
        locationName:'EVN Dampfkraftwerk',
        lng:15.9240147,
        lat:48.3302128,
        address:'Kraftwerkstr. 1 - 3435 Zwentendorf - AT',
        folder: folderNames[0]['austria']
    
    },
    {
        locationName:'OMV Raffinerie Schwechat',
        lng:16.4947953,
        lat:48.1480748,
        address:'a',
        folder: folderNames[0]['austria']

    },
    {
        locationName:'OMV Tanklager Lobau',
        lng:16.4949543,
        lat:48.1785818,
        address:'b',
        folder: folderNames[0]['austria']

   
    }
    /**
     * Add all markers!
     */
    
    
];

    const piMarker = 'icon2.png'
    const centerMap = {
        lat: 52.46299841368375, 
        lng:13.469191454349874}

    const mapOptions = {
        disableDefaultUI: true,
        center: centerMap,
        zoom: 10,
        mapId: "a7dc72361825dcaa",
        
    }
    const closeOptions = {
        zIndex: 3,
        fillOpacity: 0.05,
        strokeColor: companygreen,
        fillColor: companygreen,
    };
    const middleOptions = {
        zIndex: 2,
        fillOpacity: 0.05,
        strokeColor: companyblue,
        fillColor: companyblue,
    };
    const farOptions = {
        zIndex: 1,
        fillOpacity: 0.10,
        strokeColor: "#FF5252",
        fillColor: "#FF5252"
    }
    const infoWindow = new google.maps.InfoWindow({
        minWidth: 200,
        maxWidth: 200
    })
    const bounds = new google.maps.LatLngBounds();
    
    
    const map = new google.maps.Map(document.getElementById('google-map'), mapOptions);
    for(let i = 0; i < markers.length; i++){
        const marker = new google.maps.Marker({
            position: {lat: markers[i]['lat'], lng: markers[i]['lng']},
            map: map,
            icon: piMarker,
            id: i
        })
      /*  const marker2= new AdvancedMarkerElement({
            position: {lat: markers[i]['lat'], lng: markers[i]['lng']},
            map: map,
            id: i
            
        })*/
        function createInfoWindows() {
            const infoWindowContent = `
            <div class="info-window">
                <h3>Name: ${markers[i]['locationName']}</h3>
                <address>
                    <p> Address: ${markers[i]['address']}</p>
                    <p> Latitude: ${markers[i]['lat']}</p>
                    <p> Longitude: ${markers[i]['lng']}</p>
                </address>
                <folder>
                    <p> Region: ${markers[i]['folder']}</p>
                </folder>
            </div>
            `;

            google.maps.event.addListener(marker, 'click', function(){
                createCircles(marker);
                infoWindow.setContent(infoWindowContent);
                infoWindow.open(map, marker)
               

            });



        
        }
    //createCircles();
    createInfoWindows();
    infoWindow.addListener('closeclick', function() {
        clearCircles();
        map.fitBounds(bounds);
    });
    bounds.extend(new google.maps.LatLng(markers[i]['lat'], markers[i]['lng']));
    map.fitBounds(bounds);
    

    }
    function clearCircles(){
        for(let i = 0; i < circles.length; i++){
            circles[i].setMap(null);
        }
    }
    
    function createCircles(m){
        clearCircles();
        i = m['id']
        circles.push(new google.maps.Circle({
            radius: 400000,
            center: {lat: markers[i]['lat'], lng: markers[i]['lng']},
            strokeColor: farOptions['strokeColor'],
            strokeOpacity: 0.6,
            strokeWeight: 6,
            fillColor: farOptions['fillColor'],
            fillOpacity: farOptions['fillOpacity'],
            map,
        }))
        circles.push(new google.maps.Circle({
            center: {lat: markers[i]['lat'], lng: markers[i]['lng']},
            radius: 200000,
            strokeColor: middleOptions['strokeColor'],
            strokeOpacity: 0.6,
            strokeWeight: 4,
            fillColor: middleOptions['fillColor'],
            fillOpacity: middleOptions['fillOpacity'],
            map,
        }))
        circles.push(new google.maps.Circle({
            center: {lat: markers[i]['lat'], lng: markers[i]['lng']},
            strokeColor: closeOptions['strokeColor'],
            strokeOpacity: 0.6,
            strokeWeight: 2,
            fillColor: closeOptions['fillColor'],
            fillOpacity: closeOptions['fillOpacity'],
            map,
            radius: 100000,
        }))
            
    }


    
    
        
}
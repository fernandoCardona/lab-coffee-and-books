//5. Instrucciones: Creado el initMap para pintar el mapa

function initMap() {

    const ironhackMAD = {
      lat: 40.39279917456607,
      lng: -3.698590505452073
    };
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: ironhackMAD
    });
  
    getPlaces(map)
      .then(places => {
        // 7. Instrucciones: Llamar a placePlaces pasandoles la info
        const markers = placePlaces(map, places)
        console.log(markers)
      })
      .catch(error => console.log(error))
  }
  
  // 6. Instrucciones: Creado y llamado a getPlaces para recuperar
  //    esa info de la BD
  function getPlaces() {
    return axios.get("/places/api")
      .then(response => response.data.places)
  }
  
  
  
  function placePlaces(map, places) {
    const markers = []
    
    // 8. Instrucciones: Por cada restaurante creo un nuevo Marker
    places.forEach((place) => {
      const center = {
        lat: restaurant.location.coordinates[1],
        lng: restaurant.location.coordinates[0]
      };
      const newMarker = new google.maps.Marker({
        position: center,
        map: map,
        title: place.name
      });
      markers.push(newMarker);
    });
  
    // 9. Instrucciones: Finalmente retorno los markers por si los necesitase a futuro
    return markers
  }
  
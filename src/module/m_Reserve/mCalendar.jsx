import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const BarberBooking = () => {
  const [selectedService, setSelectedService] = useState('Haircut');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [manualMapLink, setManualMapLink] = useState(''); // State for manual Google Maps link

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const timeSlots = [
    "10:00", "11:00", "12:00", "13:00",
    "14:00", "15:00", "16:00", "17:00",   
    "18:00", "19:00", "20:00", "21:00"
  ];

  const mapStyles = {
    height: "300px",
    width: "100%"
  };

  const defaultCenter = {
    lat: 16.244884, 
    lng: 103.249101
    


  };

  const handleMapClick = (event) => {
    setSelectedLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    });
    setManualMapLink(''); // Clear manual link when a location is selected on the map
  };

  const generateGoogleMapsLink = () => {
    if (!selectedLocation) return '';
    const { lat, lng } = selectedLocation;
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  };

  return (
    <div className="ml-4">
      <div className="bg-white p-4 rounded-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            <a href="https://www.blackbox.ai/?q=Barber+A">Barber A</a>
          </h2>
        </div>
        <div className="mb-4">
          <label htmlFor="service" className="block text-left font-medium text-gray-900">บริการ</label>
          <select
            id="service"
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
          >
            <option value="Haircut">ตัดผม + โกนหนวด</option>
            <option value="">ตัดผม</option>
            <option value="Shave">Shave</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-left font-medium text-gray-900">วันที่</label>
          <input
            type="date"
            id="date"
            className="mt-1 block rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        {selectedTime && (
          <div className="mt-4">
            <h3 className="text-left font-medium text-gray-900">เวลา</h3>
            <div className="mt-1 block w-[10%] rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              {selectedTime}
            </div>
          </div>
        )}

        <ul className="grid w-full border grid-cols-3 gap-4">
          {timeSlots.map((slot, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`slot-${index}`}
                value={slot}
                className="hidden peer"
                checked={selectedTime === slot}
                onChange={() => handleTimeChange(slot)}
              />
              <label
                htmlFor={`slot-${index}`}
                className={`inline-flex items-center rounded-md border justify-center w-full p-6 text-sm font-medium text-center border cursor-pointer ${selectedTime === slot ? "bg-white text-black" : "bg-gray-900 text-white"} hover:bg-orange-500/90 hover:text-black`}
              >
                {slot}
              </label>
            </div>
          ))}
        </ul>

        {/* Google Map Component */}
        <div className="mt-4">
          <label htmlFor="location" className="block text-left font-medium text-gray-900">สถานที่</label>
          <LoadScript googleMapsApiKey="AIzaSyCRpO7cFdZjC-6qV4W38qJDHw5BqAo75wc">
            <GoogleMap
              mapContainerStyle={mapStyles}
              zoom={13}
              center={defaultCenter}
              onClick={handleMapClick}
            >
              {selectedLocation && <Marker position={selectedLocation} />}
            </GoogleMap>
          </LoadScript>
        </div>

       
        {/* Display Selected Location Link */}
        {selectedLocation && (
          <div className="mt-4">
            <h3 className="text-left font-medium text-gray-900">Selected Location</h3>
            <a
              href={generateGoogleMapsLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              View on Google Maps
            </a>
          </div>
        )}

         {/* Input Field for Manual Google Maps Link */}
         <div className="mt-4">
          <label htmlFor="mapLink" className="block text-left font-medium text-gray-900">Paste Google Maps Link</label>
          <input
            type="url"
            id="mapLink"
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="https://www.google.com/maps/..."
            value={manualMapLink}
            onChange={(e) => {
              setManualMapLink(e.target.value);
              setSelectedLocation(null); // Clear selected location when a manual link is entered
            }}
          />
        </div>

      </div>
    </div>
  );
};

export default BarberBooking;

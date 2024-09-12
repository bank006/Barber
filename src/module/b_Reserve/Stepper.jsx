import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import BarberBooking from './Calendar';
import Payment from './Payment';
import axios from "axios";

import Realtime from '../Realtime/Realtime'

// คอมโพเนนต์หลักสำหรับ Stepper
const Stepper = ({ data }) => {

  const navigate = useNavigate()
  console.log(data)
  const [currentStep, setCurrentStep] = useState(1);

  const [bookingData, setBookingData] = useState({});
  const [handleclick, sethandleclick] = useState(false)

  const handleBookingChange = (data) => {
    setBookingData(data);
    sethandleclick(true)
  }


  // console.log(bookingData)
  // คอมโพเนนต์เนื้อหาของแต่ละขั้นตอน
  const StepContent = ({ step }) => {
    switch (step) {
      case 1:
        return (
          <div className="">
            <h3 className="text-gray-500 dark:text-neutral-400"><BarberBooking onBooking={handleBookingChange} showbooking={handleclick} bookingData={bookingData} /></h3>
          </div>
        );
      case 2:
        return (
          <div className="">
            <h3 className="text-gray-500 dark:text-neutral-400"><Realtime /></h3>
          </div>
        );

      default:
        return null;
    }
  };

  // ใช้ useEffect เพื่อส่งคำขอเมื่อ currentStep เปลี่ยนเป็น 2
  useEffect(() => {
    if (currentStep === 2) {

      console.log({
        iduser: data.user.user._id,
        idBarber: data.data._id,
        namembarber: data.mbarber.title,
        imgmbarber: data.mbarber.img,
        time: bookingData.time,
        date: bookingData.date,
        nameservice: bookingData.service.name,
        price: bookingData.service.price,
      });

      axios.post('http://localhost:3000/api/createbooking', {
        iduser: data.user.user._id,
        idBarber: data.data._id,
        namembarber: data.mbarber.title,
        imgmbarber: data.mbarber.img,
        time: bookingData.time,
        date: bookingData.date,
        nameservice: bookingData.service.name,
        price: bookingData.service.price,
      })
        .then((response) => {
          navigate('/Bookinghis' );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [currentStep, bookingData]);

  StepContent.propTypes = {
    step: PropTypes.number.isRequired,
  };



  const goToNextStep = () => {
    setCurrentStep(prevStep => (prevStep < 4 ? prevStep + 1 : prevStep));
  };

  const goToPreviousStep = () => {
    setCurrentStep(prevStep => (prevStep > 1 ? prevStep - 1 : prevStep));
  };

  return (
    <section className="bg-white sm:py-16">
      <div className="mx-auto lg:px-8 max-w-[90rem]">
        <div className="flex justify-center">
          <ul className="relative flex gap-x-4 w-full max-w-xl justify-center">
            {[1, 2].map((step, index) => (
              <li
                key={step}
                className={`flex items-center gap-x-2 ${currentStep === step ? 'hs-stepper-active' : ''}`}
                aria-current={currentStep === step ? 'step' : undefined}
              >
                <span className="min-w-7 min-h-7 group inline-flex items-center text-xs align-middle">
                  <span className={`size-7 flex justify-center items-center shrink-0 rounded-full ${currentStep >= step ? 'bg-orange-500/90 text-white' : 'bg-gray-100 text-gray-800'} font-medium`}>
                    {step}
                  </span>
                  <span className="ms-2 text-sm font-medium text-gray-800 dark:text-white">
                    Step
                  </span>
                </span>
                {index < 1 && (
                  <div className={`w-80 h-px ${currentStep > step ? 'bg-orange-500/90' : 'bg-gray-200'}`}></div>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5">
          <StepContent step={currentStep} />
          {handleclick &&
            <div className="mt-5 flex justify-between items-center gap-x-2">

              <button
                type="button"
                aria-label="Go to previous step"
                className="relative inline-flex items-center cursor-pointer rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-slate-900 hover:text-white"
                onClick={goToPreviousStep}
                disabled={currentStep === 1}
              >
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6"></path>
                </svg>
                Back
              </button>

              <button
                type="button"
                aria-label="Next step"
                className="relative inline-flex items-center cursor-pointer rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-slate-900 hover:text-white"
                onClick={goToNextStep}
                disabled={currentStep === 2}
              >
                {currentStep === 2 ? 'Finish' : 'Next'}
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </button>

            </div>
          }
        </div>
      </div>
    </section>
  );
};

export default Stepper;

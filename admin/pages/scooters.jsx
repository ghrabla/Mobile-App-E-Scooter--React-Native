import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import { config } from "@/getToken";
import Datatable from "@/components/datatable/Datatable";
import axios from "axios";
import Spinner from "@/components/Spinner";
import { errorMessage, successMessage } from "@/alert";

const scooters = () => {
  const [loading, setLoading] = useState(false);
  const [scooters, setScooters] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [company, setCompany] = useState();
  const [model, setModel] = useState();
  const [price, setPrice] = useState();

  useEffect(() => {
    return async () => {
      try {
        const res = await axios.get("/api/admin/scooters", config);
        console.log(res.data);
        setLoading(true);
        if (res) {
          setScooters(res.data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
  }, []);

  useEffect(() => {
    // return {
    function handleClickOutside(event) {
      const form = document.getElementById("form");
      if (form && !form.contains(event.target)) {
        setShowForm(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // }
  }, []);

  const formData = {
    latitude,
    longitude,
    company,
    model,
    price,
  };

  const addScooter = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/admin/scooter", formData, config);
      console.log(res.data);
      setScooters(prevScooters => [...prevScooters, res.data]);
      setShowForm(false);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="bg-gray-100 min-h-screen">
      <Header page="Scooters" />
      <div className="pt-6 px-5">
        <button
          onClick={() => {
            setShowForm(true);
          }}
          className="bg-purple-600 text-white px-3 py-2 rounded-lg"
        >
          Add Scooter
        </button>
      </div>
      {showForm && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-20 ">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%]">
            <form id="form">
              <div className="grid gap-6 mb-6 md:grid-cols-2 py-5">
                <div>
                  <label
                    htmlFor="latitude"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Latitude
                  </label>
                  <input
                    type="text"
                    id="latitude"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="32.293605782650346"
                    required
                    onChange={(e) => {
                      setLatitude(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="longitude"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Longitude
                  </label>
                  <input
                    type="text"
                    id="longitude"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=", -9.236224067765122"
                    required
                    onChange={(e) => {
                      setLongitude(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="company"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Xiaomi"
                    required
                    onChange={(e) => {
                      setCompany(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="model"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Model
                  </label>
                  <input
                    type="text"
                    id="model"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="S9plus"
                    required
                    onChange={(e) => {
                      setModel(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="199 DH"
                    required
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={addScooter}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="p-4">
        {!scooters ? (
          <div className="flex justify-center items-center h-[70vh]">
            <Spinner />
          </div>
        ) : (
          <Datatable data={scooters} title="All Scooters" />
        )}
      </div>
    </div>
  );
};

export default scooters;

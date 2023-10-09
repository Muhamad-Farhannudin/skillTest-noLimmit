"use client"

import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import axios from "axios";

// import DateRangePicker dari component rsuitejs
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';


// ...
const LineChartAPP = () => {
  const [line, setLine] = useState(null);
  const [dateRange, setDateRange] = useState({
    //Menggunakan tanggal default, agar tampilan lineChart muncul dari tahun 2013 sesuai API
    startDate: new Date('2013-01-01'),
    endDate: new Date() 
  });


  // mengambil data API menggunakan axios dengan method GET
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://datausa.io/api/data?drilldowns=Nation&measures=Population');
        const data = await res.data;
        // karena kita akan mengambil data untuk lineChart jadi buat variable bebas contohnya lines
        const lines = data.data;

        // Ubah data API agar berurutan dari 2013 sampai 2020
        setLine(lines.reverse())
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // buat variable agar dapat di deklarasikan ke kondisi if(line != null)
  let labels;
  let populates;

  if (line != null && dateRange.startDate && dateRange.endDate) {
    // Filter date range menurut tahun
    const filteredData = line.filter(item => {
      const year = new Date(item.Year).getFullYear();
      return year >= dateRange.startDate.getFullYear() && year <= dateRange.endDate.getFullYear();
    });

    //Map data tahun dari API yang disimpan dalam variable labels dan data Population disimpan dalam variable populates
    labels = filteredData.map(i => i.Year);
    populates = filteredData.map(j => j.Population);
  }

  // membuat fungsi handleChange untuk Date Range
  const handleDateRangeChange = (value) => {
    if (value) {
      setDateRange({
        startDate: value[0],
        endDate: value[1]
      });
    }
  };

  // fungsi dari plugin react chartJs
  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.5)",
        data: populates
      },
    ],
  };

  return (
    <div className="w-1/2">
      <h3 className="text-blueDark text-4xl font-semibold mb-5">Line Chart</h3>
      <DateRangePicker placeholder="Select Date Range" onChange={handleDateRangeChange} />
      <Line data={data} />
    </div>
  );
};

export default LineChartAPP;

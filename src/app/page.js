"use client"

import LineChart from '@/components/lineChart';
import PieChart from '@/components/pieChart';
import SkeletonLoading from '@/components/skeletonLoading';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function Organizers() {
  // membuat state organizer
  const [organizer, setOrganizer] = useState(null);
  const [loading, setLoading] = useState(true)

  // mengambil data API menggunakan axios dengan method GET
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://datausa.io/api/data?drilldowns=Nation&measures=Population');
        const data = await res.data;

        // membuat variable source untuk menyimpan data API
        const source = data.source[0];

        setOrganizer(source);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <SkeletonLoading />
      ) : (
        <div className='max-w-screen-2xl mx-auto p-20 bg-blueDark text-white antialiased'>
          <h1 className='text-4xl font-bold'>{organizer.annotations.source_name}</h1>
          <h3 className='text-lg font-medium leading-relaxed mt-3 tracking-tight whitespace-normal w-1/3'>
            {organizer.annotations.source_description}</h3>
          <div className='w-full bg-white flex flex-col gap-20 mt-20 p-5'>
            <LineChart />
            <PieChart />
          </div>
        </div>
      )}
    </div>
  );
}
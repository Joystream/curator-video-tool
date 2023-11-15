// import './home.css';

import React, { useState,useEffect } from 'react';
import { Divider, DatePicker } from 'antd';
import type { DatePickerProps } from 'antd';
import dayjs from 'dayjs';
import { useVideos } from '@/hooks';
import { Videos } from '@/components';
import api from '../../utils/api'

const today = new Date(); 

const year = String(today.getFullYear()).slice(-2);
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0'); 

const TODAY = `20${year}-${month}-${day}`; 

const Home = () => {
  const [date, setDate] = useState<string>(TODAY);

  const onDatePickerChange: DatePickerProps['onChange'] = (date, dateString) => {
    setDate(dateString);
  };
  
  
  const { data, loading, error } = useVideos(date);

    if (loading) {
      return <div className="sub_panel loading">loading...</div>;
    }
  
    if (error) {
      return <div className="sub_panel loading">error</div>;
    }

  return (
    <section className="container">
      <h1 className="large text-primary">Upload List</h1>
      <DatePicker onChange={onDatePickerChange} defaultValue={dayjs()} />
      {data === undefined || data.length < 1 ? (
        <div>opps!</div>
      ) : (
        
      <Videos results={data} />
      )}
    </section>
  );
};
export default Home
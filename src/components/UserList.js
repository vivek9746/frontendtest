import React, { useEffect, useState } from 'react';
import ModalView from './Modal';
import './UserList.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


function UserList() {

  // const [val,setVal]=useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [employeeName, setEmployeeName] = useState('');
  const [employeeCountry, setEmployeeCountry] = useState('');
  let [employeeTimeArray, setEmployeeTimeArray] = useState([]);
  const [value, setValue] = useState(new Date());
  let [inputArray, setInputArray] = useState([]);
  const [startTime, setStartTime] = useState('Data not avalailable');
  const [endTime, setendTime] = useState('Data not avalailable');
  // let inputArray = [];


  const transformDate = (date) => {
    console.log(date);
    let tempdate = date.split(' ')
    const newTempDate = tempdate[0] + ' ' + tempdate[1] + ' ' + tempdate[2]
    // console.log('temp date',newTempDate);
    return newTempDate
  }

  const onChange = (v, e) => {
    console.log('called', v);
    setValue(v);

    const formattedDate = v.toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    }).replace(/ /g, ' ').replace(',', '');


    console.log(formattedDate);

    console.log(employeeTimeArray);
    let findResult = [];
    findResult = employeeTimeArray.filter(employeeTimeArray => transformDate(employeeTimeArray.start_time) === formattedDate);
    console.log(findResult);
    if (findResult.length > 0) {
      setStartTime(findResult[0].start_time.split(' ')[4]);
      setendTime(findResult[0].end_time.split(' ')[3])
    }
    else {
      setStartTime('Data not available');
      setendTime('Data not available')
    }

  }

  useEffect(() => {

    fetch('Test JSON.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }

    }).then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.members);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  const openModal = (emp) => {
    // console.log('clicked');

    // setEmployeeTimeArray((employeeTimeArray)=>{
    //   console.log('insideState',emp.activity_periods);
    //   emp.activity_periods.forEach((ele)=>{
    //     employeeTimeArray.push(ele.start_time)
    //   })
    //   return employeeTimeArray;
    // });


    setEmployeeTimeArray(emp.activity_periods);
    console.log('new time arrayis', employeeTimeArray);

    console.log('employeeeis', emp);
    setModalIsOpen(true);
    setEmployeeName(emp.real_name)
    setEmployeeCountry(emp.tz)
    // setEmployeeTimeArray(emp.activity_periods);

    // console.log('after update',employeeTimeArray);

    setInputArray([]);
    let temp = [];
    console.log("after setting employeetime array", employeeTimeArray);
    employeeTimeArray.forEach((ele) => {
      temp.push(ele.start_time);
      console.log(temp);
    })
    setInputArray(temp);

    console.log('input array is now', inputArray);
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  }
  else {
    return (
      <div>
        <div className="ulDiv">
        <ul>
          {
            items.map((element) => (
              <div key={element.id} onClick={() => { openModal(element); }}>
                {/* <span>{element.id}</span> */}
                <span>{element.real_name}</span>

              </div>
            ))
          }
        </ul>
        </div>
        <ModalView isOpen={modalIsOpen} onRequestClose={() => { setModalIsOpen(false) }}>
          <h2>{employeeName}</h2>
          <h4>{employeeCountry}</h4>
          {/* {
          employeeTimeArray.map((times)=>(
            <h3>{times.start_time}</h3>
          ))
          
        } */}
        <div className="timeContainerDiv">
        <span className="startEndTimesLabel">
            <h3>Start Time</h3>
            <h3>End Time</h3>
          </span>
          <span className="startEndTimes">
            <h3>{startTime}</h3>
            <h3>{endTime}</h3>
          </span>
        </div>
          <div className="calendarDiv">
          <Calendar
            onChange={(value, event) => { onChange(value, event) }}
            value={value}
          />
          </div>
          {

          }
        </ModalView>
      </div>
    )
  }
}

export default UserList;

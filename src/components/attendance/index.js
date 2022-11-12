import "./index.scss";
import { invokeApi, HTTP_METHODS } from "../../utils/http-service";
import { useEffect, useState } from "react";
import { HOSTNAME, REST_URLS } from "../../utils/endpoints";

const Attendance = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const getEmployeeAttendance = (employeeData) => {
    const curDate = new Date();
    const firstDay = new Date();
    firstDay.setDate(curDate.getDate() - curDate.getDay() + 3);
    firstDay.setHours(0, 0, 0, 0);
    const lastDay = new Date();
    lastDay.setDate(firstDay.getDate() + 6);
    lastDay.setHours(0, 0, 0, 0);

    invokeApi(
      HTTP_METHODS.GET,
      `${HOSTNAME}${REST_URLS.GET_ATTENDANCE}`,
      null,
      {
        startDate: firstDay.toISOString(),
        endDate: lastDay.toISOString(),
      }
    )
      .then((res) => {
        
          const employeeIdToIndexMap = {};
          employeeData.forEach((item, index) => {
            employeeIdToIndexMap[item.id] = index;
          });
          const finalData = [...employeeData]
          res.forEach((item) => {
            const {attendanceDate, employee, isPresent, hoursWorked} = item
            const index = employeeIdToIndexMap[employee]
            
          })
  
          console.log(employeeData, "SDDDDDDDD");
          console.log(res, " this is the res");
        
       
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    invokeApi(
      HTTP_METHODS.GET,
      `${HOSTNAME}${REST_URLS.GET_ALL_EMPLOYEE_NAMES}`
    )
      .then((res) => {
        if (!res.message) {
          const curDate = new Date();
          const firstDay = new Date();
          firstDay.setDate(curDate.getDate() - curDate.getDay() + 3);
          firstDay.setHours(0, 0, 0, 0);
          let dateMap = {};
          for (let day = 0; day < 7; day++) {
            const curDate = new Date(firstDay);
            curDate.setDate(firstDay.getDate() + day);
            dateMap[day] = { date: curDate, value: null };
          }

          const finalData = res.map((item) => {
            return { ...item, ...dateMap };
          });
          getEmployeeAttendance(finalData);
          //   setEmployeeList(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <></>;
};

export default Attendance;

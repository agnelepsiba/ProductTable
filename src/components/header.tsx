import React from 'react'
import styles from "./header.module.scss"
import { AntInput } from '../shared/widgets/antinput'
import { useNavigate } from 'react-router-dom';


export default function HeaderMain(props: any) {
  const navigate = useNavigate();

  const searchData: any =(e: any)=>{ 
    props.onDataSend(e.target.value)
  }
  

  const handleLogout = () => {
    
    localStorage.removeItem('authToken');
    
    navigate('/');
  };
  return (
    <div className={styles.headmenu}>
      <div className={styles.left}>
        
        <div className={styles.searchRow}>
          <AntInput className="intopHeader" placeHolder="Search Product" id="mytext" 
           onChange={(e: any) =>(searchData(e))}/>
        </div>
      </div>
      <div className={styles.right1} >
        <ul className={styles.menuLink}>
          <li onClick={handleLogout}>LogOut</li>
        </ul>
      </div>
    </div>
    
  )
}

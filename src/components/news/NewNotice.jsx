import React from 'react';
import SideBar from '../SideBar'
import AddNews from './AddNews';
import OpcNews from './OpcNews';

const NewNotice = () => {

  return (
    <SideBar>
      <div className='row' style={{ margin: 0}}>
        <AddNews />
        <OpcNews />
      </div>
    </SideBar>
  )
}

export default NewNotice
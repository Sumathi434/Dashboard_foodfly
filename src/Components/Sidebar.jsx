import React from 'react'

function Sidebar({AddfirmHandler, AddProductHandler, AllproductsHandler, showaddFirmtitle}) {
  return (
    <>
    <div className='sidebar-section'>
        <ul>
          {showaddFirmtitle ?  <li onClick={AddfirmHandler}>Add Firm</li> : ""}
           
            <li onClick={AddProductHandler}>Add Product</li>
            <li onClick={AllproductsHandler}>All Products</li>
            <li>User Details</li>
        </ul>


    </div>
    
    </>
  )
}

export default Sidebar
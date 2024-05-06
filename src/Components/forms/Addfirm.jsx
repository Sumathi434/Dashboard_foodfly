import React, {useState} from 'react';
import {API_URL} from '../data/apiPath';

function Addfirm() {
  const[firmName, setFirmName] = useState("")
  const[area, setArea] = useState("")
  const[category, setCategory] = useState([])
  const[region, setRegion] =useState([])
  const[offer, setOffer] = useState("")
  const[file, setFile] = useState(null)


  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const handleRegionChange = (event)=>{
    const value = event.target.value;
    if(region.includes(value)){
      setRegion(region.filter((item)=> item !== value));
    }else{
      setRegion([...region, value])
    }
  }

  const handlefirmSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem('loginToken');
      if (!loginToken) {
        console.error("User not Authenticated");
        return;
      }
      
      const formData = new FormData();
      formData.append("firmName", firmName);
      formData.append("area", area);
      formData.append("offer", offer);
  
      category.forEach((value) => {
        formData.append("category", value);
      });
  
      region.forEach((value) => {
        formData.append("region", value);
      });
  
      if (file) {
        formData.append("image", file);
      }
  
      const response = await fetch(`${API_URL}/firm/add-firm`, {
        method: 'POST',
        headers: {
          'token': loginToken 
        },
        body: formData
      });
  
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        setFirmName("");
        setArea("");
        setCategory([]);
        setRegion([]);
        setOffer("");
        setFile(null);
        localStorage.setItem("firmId", data.firmId); 
        alert("Firm added successfully");
      } else if(data.message === "Vendor can only have one firm"){
        alert("Firm exists 🥗. only one firm can be added")
      }else{
        alert("Failed to add firm")
      }
      
    } catch (error) {
      console.error("Failed to add firm:", error);
      alert("Failed to add firm: " + error.message);
    }
  };
  

const handleImageUpload = (event)=>{
  const selectedImage = event.target.files[0]
  setFile(selectedImage)
}

  return (
   <>
   
   <div className='addfirmSection'>
    <h3>Addfirm</h3>
    <form className='firmauthForm' onSubmit={handlefirmSubmit}>
        <label>FirmName:</label><br/>
        <input type='text' name="firmName" value={firmName} placeholder='Enter' onChange={(e)=>setFirmName(e.target.value)}/> <br/>
        <label>Area:</label><br/>
        <input type ="text" name="area" value={area} placeholder='Enter' onChange={(e)=>setArea(e.target.value)}/><br/><br/>

  <div className='CheckIn'>
    <div className = 'CheckIn-labels'>
            
       <label className='rclabel'>Category:</label>

       <div className='labels'>
          <label>Veg</label>
         <input type='checkbox' checked={category.includes('Veg')}  value= 'Veg' onChange={handleCategoryChange}/>
       </div>

      <div className='labels'>
        <label>Non-veg</label>
        <input type='checkbox' checked={category.includes('Non-veg')} value='Non-veg' onChange={handleCategoryChange}/>
      </div>
            
     </div>

  </div><br/>

  <div className='CheckIn'>
    <div className = 'CheckIn-labels'>
            
       <label className='rclabel'>Region:</label>

       <div className='regionlabels'>
       <label>South-Indian</label>
       <input type='checkbox' checked={region.includes('south-indian')} value='south-indian' onChange={handleRegionChange} />
       </div>

      <div className='regionlabels'>
      <label>North-Indian</label>
        <input type='checkbox' checked={region.includes('north-indian')} value='north-indian' onChange={handleRegionChange} />
      </div>

      <div className='regionlabels'>
      <label>Chinese</label>
        <input type='checkbox' checked={region.includes('chinese')} value='chinese' onChange={handleRegionChange} />
      </div>

      <div className='regionlabels'>
      <label>Bakery</label>
        <input type='checkbox' checked={region.includes('bakery')} value='bakery' onChange={handleRegionChange} />
      </div>
            
     </div>

  </div> 

        <label>Offer:</label><br/>
        <input type ="text" name="offer" value={offer} placeholder='Enter' onChange={(e)=>setOffer(e.target.value)}/><br/>

        <label>Upload Image:</label><br/>
        <input type ="file" onChange={handleImageUpload}/><br/><br/>

        
        <button className='submit-btn' type='submit'>Submit</button>
    </form>
    </div>
   
   </>
  )
}

export default Addfirm
import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import Avatar from "../assests/images/Avatar.png"
import { useDispatch, useSelector } from 'react-redux'
import { logout } from "../redux/userSlice";
import { Button } from '@mui/material'
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const DropDown = styled.div`
 position: absolute;
    top: 60px;
    z-index:10;
    padding:  10px 0;
    box-sizing: border-box;
    right: 20px;
    border-radius:8px;
    background-color: #202020;
    color: ${({ theme }) => theme.text}; //var(--text-main);
    font-family: 'Roboto';
`

const DropDownItem = styled.div`
 display: flex;
    align-items: center;
    padding: 7px 20px;
    cursor: pointer;
    transition: .2s;

&:hover{
     background-color: ${({ theme }) => theme.secondary_light_color}
}

span{
    font-size: 30px;
}

 p{
    margin: 0;
    font-size: 15px;
    margin-left: 15px;
}

`

const EditProfile = styled(DropDownItem)`
  padding: 4px 10px;
    display: flex;
    img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
}
`
const Line = styled.div`
 width: 100%;
    background-color: ${({ theme }) => theme.hover_text_color};
    height: 1px;
    margin: 8px 0;
    position: relative;
    border-radius: 4px;
`

const Model = () => {

    const navigate = useNavigate()
     const { currentUser } = useSelector(state => state.user)
     const dispatch = useDispatch();

     const handleLogout = async (e) => {
        e.preventDefault();
        try {
          dispatch(logout());
          localStorage.clear();
          navigate("/");
        } catch (error) {
          console.log(error);
        }
      };


  return (
       <DropDown >
                    <EditProfile onClick={()=>navigate('/profile')}>
                        <img src={currentUser.img} alt="Your Avatar" title='Avatar' />
                        <p>Edit Profile</p>
                    </EditProfile>
                    <Line/>
                    <>
                        
                        
                        <DropDownItem>
                        <Button className="btn1" onClick={handleLogout}>
                                <ExitToAppIcon />
                                Log Out
                        </Button>
                        </DropDownItem>
                    </>
                 
                   
                    
                    
                </DropDown>
  )
}

export default Model


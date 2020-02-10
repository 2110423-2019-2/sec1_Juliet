import React from 'react';
import Grid from '@material-ui/core/Grid';
import profile from '../profile.jpg';
import PersonIcon from '@material-ui/icons/Person';
import MailIcon from '@material-ui/icons/Mail';
import PhoneIcon from '@material-ui/icons/Phone';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import LockIcon from '@material-ui/icons/Lock';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { Box } from '@material-ui/core';
import { Input } from '@material-ui/core';
import { MyFullWidthButton,MyDisabledFullWidthButton } from '../component/MyButton';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import UploadIcon from '../component/UploadIcon';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {change: false};
  }
  render() {
     return(
    <Grid container direction="column" justify="flex-start" style={{width:"100%"}}>
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '20vh'}}>
    <h1> My Profile </h1>
    </div>
     <Grid container direction="row" justify="center" >
	<img
            src={profile}
            height={100}
	    width={100}
	    style={{ alignSelf: 'center',borderRadius: 400/ 2,marginBottom:50 }}
          />
	<UploadIcon />	
	<h2  style={{ marginLeft:10 }} > Name Name </h2>
	</Grid>
	<Box style={{ backgroundColor:'#F8F8F8',marginBottom: '40px' ,alignSelf: 'center',height:'35vh',width:'90%'}}>
         <h2 style={{ marginLeft: 10}} > Personal Info</h2>
	<div style={{border:'1px',solid:'#DDD'}}>
    	<PersonIcon style={{ marginLeft: 10}}/>
	<Input style={{ marginLeft: '3%', width:'80%'}}  fullWidth placeholder="First Name" onChange={() => {
              this.setState({change:true});
            }}/>		
	</div>
	<div style={{border:'1px',solid:'#DDD'}}>
    	<PersonIcon style={{ marginLeft: 10}}/>
	<Input style={{ marginLeft: '3%', width:'80%'}}  fullWidth placeholder="Last Name" onChange={() => {
              this.setState({change:true});
            }}/>		
	</div>
	<div style={{border:'1px',solid:'#DDD'}}>
    	<MailIcon style={{ marginLeft: 10}}/>
	<Input style={{ marginLeft: '3%', width:'80%'}}  fullWidth placeholder="Email" onChange={() => {
              this.setState({change:true});
            }}/>		
	</div>
	<div style={{border:'1px',solid:'#DDD'}}>
    	<PhoneIcon style={{ marginLeft: 10}} />
	<Input style={{ marginLeft: '3%', width:'80%'}}  fullWidth placeholder="Telephone No." onChange={() => {
              this.setState({change:true});
            }}/>		
	</div>
        </Box>
	<Box style={{ backgroundColor:'#F8F8F8',marginBottom: '40px' ,alignSelf: 'center',height:'35vh',width:'90%'}}>
         <h2 style={{ marginLeft: 10}} > Credit Card Info</h2>
	<div style={{border:'1px',solid:'#DDD'}}>
    	<PersonIcon style={{ marginLeft: 10}}/>
	<Input style={{ marginLeft: '3%', width:'80%'}}  fullWidth placeholder="Cardholder Name" onChange={() => {
              this.setState({change:true});
            }}/>		
	</div>
	<div style={{border:'1px',solid:'#DDD'}}>
    	<CreditCardIcon style={{ marginLeft: 10}}/>
	<Input style={{ marginLeft:'3%', width:'80%'}}  fullWidth placeholder="Card Number" onChange={() => {
              this.setState({change:true});
            }}/>		
	</div>	
	<div style={{border:'1px',solid:'#DDD'}}>
    	<CalendarTodayIcon style={{ marginLeft: 10}}/>
	<Input style={{ marginLeft: '3%', width:'80%'}}  fullWidth placeholder="Expiry date" onChange={() => {
              this.setState({change:true});
            }}/>		
	</div>	
	<div style={{border:'1px',solid:'#DDD'}}>
    	<LockIcon style={{ marginLeft: 10}}/>
	<Input style={{ marginLeft: '3%', width:'80%'}}  fullWidth placeholder="Security Code" onChange={() => {
              this.setState({change:true});
            }}/>		
	</div>	
        </Box>
	 <Switch>
	 {!this.state.change && (
		<MyDisabledFullWidthButton style={{ marginTop: 10,marginButtom: 10,width:'80%',alignSelf: 'center' }} disabled={true}>Save</MyDisabledFullWidthButton>
            )}
	 {this.state.change && (
		<MyFullWidthButton style={{ marginTop: 10,marginButtom: 10,width:'80%',alignSelf: 'center' }} onClick={() => {
              this.setState({change:false});
            }}>Save</MyFullWidthButton>
            )}
	 </Switch>
     </Grid>
	)  
}
}

export default Profile;

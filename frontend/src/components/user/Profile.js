import React,{ useState, useEffect }  from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';


export default function Profile(props) {
    const [userprofile, setUserProfile] = useState(null);
    const [editing, setEditing] = useState(false);
    //    contact backend to get the information for props.user 
    //     Compare if it's the current logged in user, display edit profile option. 
    useEffect(() => {
        async function fetchData() {
           // const res = await axios.get(location.pathname);
            // if(!res.data.error){
            //     setUserProfile(res.data.user);
            // }  
        };
        fetchData();
    }, []);
    return (

        <React.Fragment>

            <Grid container spacing={3}>
                <Grid item xs>
                    <Avatar alt="Remy Sharp" src="https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/p120x120/64438855_773875386339706_2482325925530697728_o.jpg?_nc_cat=104&_nc_ohc=VNZ7gGyjMw8AX86V-X2&_nc_ht=scontent-lga3-1.xx&_nc_tp=6&oh=45386d713cf814b1e68f70e636dd10cf&oe=5ECDBA76" />
                </Grid>
                <Grid item xs>
                    <Typography variant="body1">
                        {props.user}
                    </Typography>
                </Grid>
                
            </Grid>
        </React.Fragment >

    );
}

import React from "react";
import Header from '../Header/Header'
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from "@mui/material/Tab";
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

import { styled } from '@mui/material/styles';
import TabContext from '@mui/lab/TabContext';
import Container from "react-bootstrap/esm/Container";
import CarReceive from "./CarReceive/CarReive";
import ApplianceReive from "./ApplianceReceive/ApplianceReive";
import CarRepair from "./CarRepair/CarRepair";
import CarCheckout from "./CarCheckout/CarSearch";
import CarSearch from "./CarSearch/CarSearch";
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  const StyledTabs = styled((props) => (
    <Tabs
      {...props}
      TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
  ))({
    '& .MuiTabs-indicator': {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: '#635ee7',
    },
  });
  
  const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
      textTransform: 'none',
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.pxToRem(15),
      marginRight: theme.spacing(1),
      color: '#141414',
      fontWeight:'400',
      '&.Mui-selected': {
        color: '#0c828f',
      },
      '&.Mui-focusVisible': {
        backgroundColor: '#30c1d1',
      },
    }),
  );
  


const Task=()=>{
    const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
        <Header/>
    <Container>
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <StyledTabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <StyledTab label="Tiếp nhận xe" {...a11yProps(0)} />
          <StyledTab label="Lập phiếu sửa chữa" {...a11yProps(1)} />
          <StyledTab label="Lập phiếu thu tiền" {...a11yProps(2)} />
          <StyledTab label="Lập phiếu nhập VTPT" {...a11yProps(3)} />
          <StyledTab label="Tra cứu" {...a11yProps(4)} />
        </StyledTabs>
      </Box>
      <TabPanel value={value} index={0}>
        <CarReceive/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CarRepair/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CarCheckout/>
      </TabPanel>
      <TabPanel value={value} index={3}>
      <ApplianceReive/>

      </TabPanel>
      <TabPanel value={value} index={4}>
        <CarSearch/>
      </TabPanel>
    </Box>
    
    </Container>
    </div>
    
  );  
}
export default Task;
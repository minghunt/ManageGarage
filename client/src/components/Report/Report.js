import React, { useEffect } from "react";
import Header from '../Header/Header'
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from "@mui/material/Tab";
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Container from "react-bootstrap/esm/Container";
import InventoryReport from "./InventoryReport/InventoryReport";
import RevenueReport from "./RevenueReport/RevenueReport";
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
        fontWeight: '500',
        '&.Mui-selected': {
            color: '#0c828f',
            fontWeight:'600'
        },
        '&.Mui-focusVisible': {
            backgroundColor: '#30c1d1',
        },
    }),
);

const Report = () => {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
        localStorage.setItem('selectedTabReport', newValue)

    };
    useEffect(() => {
        const storedValue = localStorage.getItem('selectedTabReport');
        if (storedValue) {
            setValue(parseInt(storedValue));
            console.log(storedValue)
        }
    }, [])
    return (
        <div>
            <Header />
            <Container>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <StyledTabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <StyledTab label="Báo cáo doanh thu" {...a11yProps(0)} />
                            <StyledTab label="Báo cáo tồn" {...a11yProps(1)} />
                        </StyledTabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <RevenueReport />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <InventoryReport />
                    </TabPanel>
                </Box>
            </Container>
        </div>
    );
}
export default Report;
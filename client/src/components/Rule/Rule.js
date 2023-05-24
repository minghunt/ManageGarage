import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Header from '../Header/Header';
import Container from 'react-bootstrap/esm/Container';
import { styled } from '@mui/material/styles';
import CarBrandList from './CarBrandList/CarBrandList';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import MaxCar from './MaxCar/MaxCar';
import WageList from './WageList/WageList';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div style={{ width: '60%' }}
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
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
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
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
    maxWidth: 280,
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
    margin: "auto",
    '&.Mui-selected': {
      color: '#0c828f',
      fontWeight: '600',
    },
    '&.Mui-focusVisible': {
      backgroundColor: '#30c1d1',
    },
  }),
);

export default function Rule() {
  const [value, setValue] = React.useState(0);
  const [Hxe, setHxe] = React.useState([
    { _id: '1', TenHieuXe: 'Honda', TienCong: 500000 }, { _id: '2', TenHieuXe: 'Suzuki', TienCong: 500000 }, { _id: '3', TenHieuXe: 'Yamaha', TienCong: 500000 },
    { _id: '4', TenHieuXe: 'Suzuki', TienCong: 500000 }, { _id: '5', TenHieuXe: 'Yamaha', TienCong: 500000 }, { _id: '1', TenHieuXe: 'Honda', TienCong: 500000 }, { _id: '2', TenHieuXe: 'Suzuki', TienCong: 500000 }, { _id: '3', TenHieuXe: 'Yamaha', TienCong: 500000 },
    { _id: '4', TenHieuXe: 'Suzuki', TienCong: 500000 }, { _id: '5', TenHieuXe: 'Yamaha', TienCong: 500000 }, { _id: '1', TenHieuXe: 'Honda', TienCong: 500000 }, { _id: '2', TenHieuXe: 'Suzuki', TienCong: 500000 }, { _id: '3', TenHieuXe: 'Yamaha', TienCong: 500000 },
    { _id: '4', TenHieuXe: 'Suzuki', TienCong: 500000 }, { _id: '5', TenHieuXe: 'Yamaha', TienCong: 500000 }, { _id: '1', TenHieuXe: 'Honda', TienCong: 500000 }, { _id: '2', TenHieuXe: 'Suzuki', TienCong: 500000 }, { _id: '3', TenHieuXe: 'Yamaha', TienCong: 500000 },
    { _id: '4', TenHieuXe: 'Suzuki', TienCong: 500000 }, { _id: '5', TenHieuXe: 'Yamaha', TienCong: 500000 }, { _id: '1', TenHieuXe: 'Honda', TienCong: 500000 }, { _id: '2', TenHieuXe: 'Suzuki', TienCong: 500000 }, { _id: '3', TenHieuXe: 'Yamaha', TienCong: 500000 },
    { _id: '4', TenHieuXe: 'Suzuki', TienCong: 500000 }, { _id: '5', TenHieuXe: 'Yamaha', TienCong: 500000 },
  ])
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Header />
      <Container>
        <h2 style={{ margin: '25px 0 20px 30px' }}>Thay đổi quy định</h2>
        <Box
          sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 500, margin: 'auto', width: '100%', justifyContent: 'center' }}
        >
          <StyledTabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider' }}
          >
            <StyledTab label="Danh sách hiệu xe" {...a11yProps(0)} />
            <StyledTab label="Số lượng xe sửa tối đa trong ngày" {...a11yProps(1)} />
            <StyledTab label="Danh sách tiền công" {...a11yProps(2)} />
            <StyledTab label="Danh sách vật tư, phụ tùng" {...a11yProps(3)} />
          </StyledTabs>
          <TabPanel value={value} index={0}>
            <CarBrandList />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <MaxCar />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <WageList Hxe={Hxe} />
          </TabPanel>
          <TabPanel value={value} index={3}>
            Item Four
          </TabPanel>
        </Box>
      </Container>
    </div>

  );
}
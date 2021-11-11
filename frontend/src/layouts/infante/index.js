import { useState } from "react";
import Card from "@material-ui/core/Card";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Footer from "examples/Footer";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import styles from "layouts/tables/styles";
import Table from "examples/Table";
import { func } from "prop-types";
import SuiButton from "components/SuiButton";
import Icon from "@material-ui/core/Icon";
import typography from "assets/theme/base/typography";
import { Confirm,} from 'react-st-modal';
import { useHistory } from "react-router-dom";
import SuiInput from "components/SuiInput";
import Grid from "@material-ui/core/Grid";
/*npm install @mui/material @emotion/react @emotion/styled*/
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
        <SuiBox p={3}>
          <SuiTypography>{children}</SuiTypography>
        </SuiBox>
      )}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function Check({boleano}){
  const { size } = typography;
  if(boleano){
    return(
      <SuiBox fontSize={size.regular} color="text" mb={-0.5} mx={0.25}>
        <Icon className="material-icons-round" color="inherit" fontSize="inherit">
          done
        </Icon>
      </SuiBox>
    )
  }else{
    return(
      <SuiBox fontSize={size.regular} color="text" mb={-0.5} mx={0.25}>
        <Icon className="material-icons-round" color="inherit" fontSize="inherit">
          clear
        </Icon>
      </SuiBox>

    )

  }
}

export default function Infantes() {
  const hist = useHistory();
  const classes = styles();
  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (event, newValue) => setTabValue(newValue);
  const [Listo, setListo] = useState(0);
  const [RutInfante, setRutInfante] = useState('');
  const columns = [
    { name: "nombre", align: "left" },
    { name: "rut", align: "left" },
    { name: "fecha_nacimiento", align: "center" },
    { name: "telefono_apoderado", align: "center" },
    {name: "acciones", align:"center" }
  ];

  const [rows] = useState([]);
  function Colocao(rut){
      setRutInfante(rut)
      setListo(2)
  }
  function Boton({rut}){
    return(
      <>
      <SuiButton buttonColor="info" iconOnly onClick = { async() => Colocao(rut)}>
            <Icon classsName="material-icons-round">visibility</Icon>
        </SuiButton>
      </>  
    );
  }
  function VisualizarDatos(rut_infante){
      if(Listo === 2){
        while(rows.length > 0) {
            rows.pop();
            }
        fetch('/infante/ver_infante/'+rut_infante.toString(),{
            method:'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              }
        })

        .then(res => {
            return res.json()
        })
        .then(users => {
            for(let i=0; i < 2;i++){
                let aux = true;
                for(let e=0;e < rows.length;e++){
                  if(users[i].rut == rows[e].rut){
                    aux=false;
                  }
                }

            if (aux == true){        
            rows.push({nombre: users.nombre});
            }
            setListo(3);
        }});

  }}
  function ActualizarInfantes(){
    if (Listo == 0){
      while(rows.length > 0) {
      rows.pop();
      }

      fetch('/infante/ver_infantes')
        .then(res => {
            return res.json()
        })
        .then(users => {
          for(let i=0; i < users.length;i++){
            let aux = true;
            for(let e=0;e < rows.length;e++){
              if(users[i].rut == rows[e].rut){
                aux=false;
              }
            }
            let fecha_nacimiento = users[i].fecha_nacimiento;

            fecha_nacimiento = fecha_nacimiento.toString();
            fecha_nacimiento = fecha_nacimiento.slice(0,9);

            if(aux == true){
              rows.push({nombre:users[i].nombre,
                rut: users[i].rut,
                fecha_nacimiento: fecha_nacimiento,
                telefono_apoderado: users[i].telefono,
                acciones: <Boton rut={users[i].rut}/>
              })
              


            }
          }

          setListo(1);

        });
    }
  }






  if(Listo === 1){

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={6}>
        <SuiBox mb={6}>

          <Card>

            <SuiBox customClass={classes.tables_table}>
              <Table columns={columns} rows={rows} />
            </SuiBox>
     
          </Card>
        </SuiBox>
        <Card>
        </Card>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
  }else if (Listo === 0){
    ActualizarInfantes();
    return(
      <DashboardLayout>
        <DashboardNavbar />
        <SuiBox py={3}>
          <SuiBox mb={3}>

            <Card>
              Cargando...

            </Card>
          </SuiBox>
          <Card>
          </Card>
        </SuiBox>
        <Footer />
      </DashboardLayout>
    );
  }
  else if (Listo === 2){
      if(Listo === 2){
    VisualizarDatos(RutInfante)}
    return(
        <DashboardLayout>
          <DashboardNavbar />
          <SuiBox py={3}>
            <SuiBox mb={3}>
  
              <Card>
                Cargando...
  
              </Card>
            </SuiBox>
            <Card>
            </Card>
          </SuiBox>
          <Footer />
        </DashboardLayout>
      );
  }
  else if (Listo === 3){
    return(
        
    <DashboardLayout>
    <DashboardNavbar />
    <SuiBox py={3}>
      <SuiBox mb={3}>

        <Card>
          {rows[0]}

        </Card>
      </SuiBox>
      <Card>
      </Card>
    </SuiBox>
    <Footer />
  </DashboardLayout>
);
  }
}